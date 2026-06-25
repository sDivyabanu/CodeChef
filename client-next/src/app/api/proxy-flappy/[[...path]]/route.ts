import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  try {
    const { path } = await params;
    const subpath = path ? path.join("/") : "";
    const targetUrl = `https://flappychef.poseidon0z.com/${subpath}`;

    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      return new NextResponse(`Failed to fetch from ${targetUrl}`, { status: response.status });
    }

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("text/html") || !subpath) {
      let html = await response.text();

      // Inject custom styling and mocks in the head
      const injectedContent = `
        <style>
          div[class*="fullscreenWarning"], 
          div[class*="orientationWarning"],
          .fullscreen-warning,
          .orientation-warning {
            display: none !important;
          }
          body, html {
            overflow: hidden !important;
          }
        </style>
        <script>
          (function() {
            // Intercept and mock flappy-api.poseidon0z.com calls (since the upstream API backend is dead and hangs requests)
            const originalFetch = window.fetch;
            window.fetch = async function(input, init) {
              let url = typeof input === 'string' ? input : (input && input.url ? input.url : '');
              if (url.includes('flappy-api.poseidon0z.com/api/gameusers')) {
                console.log("[MOCK API] Intercepted:", url);
                
                let scores = [];
                try {
                  const raw = localStorage.getItem("LocalLeaderboard");
                  scores = JSON.parse(raw);
                  if (!Array.isArray(scores)) {
                    scores = [];
                  }
                } catch(e) {
                  scores = [];
                }

                // Handle GET (Fetch leaderboard)
                if (!init || !init.method || init.method.toUpperCase() === 'GET') {
                  scores.sort((a, b) => b.score - a.score);
                  return new Response(JSON.stringify(scores), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                  });
                }

                // Handle POST (Submit score)
                if (init && init.method && init.method.toUpperCase() === 'POST') {
                  try {
                    const body = JSON.parse(init.body);
                    if (body && body.username) {
                      scores.push({ username: body.username, score: Number(body.score) || 0 });
                      scores.sort((a, b) => b.score - a.score);
                      scores = scores.slice(0, 10);
                      localStorage.setItem("LocalLeaderboard", JSON.stringify(scores));
                    }
                  } catch(e) {}
                  return new Response(JSON.stringify({ message: "Score submitted successfully" }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                  });
                }
              }
              return originalFetch.apply(this, arguments);
            };
          })();
        </script>
      `;

      html = html.replace(/<head\s*>/i, `<head>${injectedContent}`);

      // Rewrite the main script to go through our proxy for on-the-fly patching
      html = html.replace(
        /src="\/assets\/(index-[a-zA-Z0-9_\-]+\.js)"/g,
        'src="/api/proxy-flappy/assets/$1"'
      );

      // Rewrite relative links to go through our proxy instead of going direct
      html = html.replace(/href="\/game"/g, 'href="/api/proxy-flappy/game"');
      html = html.replace(/href="\/leaderboard"/g, 'href="/api/proxy-flappy/leaderboard"');
      html = html.replace(/href="\/\"/g, 'href="/api/proxy-flappy"');
      html = html.replace(/href="\/([\" >])/g, 'href="/api/proxy-flappy$1');

      return new NextResponse(html, {
        headers: {
          "Content-Type": "text/html",
        },
      });

    } else if (contentType.includes("javascript") || contentType.includes("css") || subpath.endsWith(".js") || subpath.endsWith(".css")) {
      let text = await response.text();

      // If it is the main JS bundle, perform replacements to change the leaderboard click behavior and hide/redirect sign-in
      if (subpath.includes("assets/index-") && subpath.endsWith(".js")) {
        console.log("[PROXY JS] Intercepting and patching main JS bundle:", subpath);

        // 1. Patch the leaderboard click handler on gameover screen (Vv component)
        const targetClick = `onClick:async()=>localStorage.getItem("isLoggedIn")==="true"?await o(n,t).then(i("/Leaderboard")):i("/SignIn")`;
        const replacementClick = `onClick:async()=>{let u=localStorage.getItem("UserInfo");if(localStorage.getItem("isLoggedIn")!=="true"||!u){const s=localStorage.getItem("UserInfo")||"";const l=prompt("Enter your name for the leaderboard:",s);if(l===null){i("/Leaderboard");return}u=l.trim()||"Anonymous";localStorage.setItem("UserInfo",u);localStorage.setItem("isLoggedIn","true")}await o(u,t);i("/Leaderboard")}`;

        text = text.replace(targetClick, replacementClick);

        // 2. Patch the SignIn route so it renders the Leaderboard (Wv) component instead of O1
        const targetRoute = `g.jsx(cr,{path:"/SignIn",element:g.jsx(O1,{})})`;
        const replacementRoute = `g.jsx(cr,{path:"/SignIn",element:g.jsx(Wv,{})})`;

        text = text.replace(targetRoute, replacementRoute);

        // 3. Inject basename to BrowserRouter (Ev component)
        const targetRouter = `g.jsx(Ev,{children:g.jsxs(_v,{children:[g.jsx(cr,{path:"/",element:g.jsx(Cv,{})})`;
        const replacementRouter = `g.jsx(Ev,{basename:"/api/proxy-flappy",children:g.jsxs(_v,{children:[g.jsx(cr,{path:"/",element:g.jsx(Cv,{})})`;

        text = text.replace(targetRouter, replacementRouter);
      }

      return new NextResponse(text, {
        headers: {
          "Content-Type": contentType || (subpath.endsWith(".css") ? "text/css" : "application/javascript"),
        },
      });

    } else {
      // Binary data (images, fonts, etc.)
      const data = await response.arrayBuffer();
      return new NextResponse(data, {
        headers: {
          "Content-Type": contentType,
        },
      });
    }

  } catch (error) {
    console.error("Proxy failed:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
