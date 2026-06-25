import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  try {
    const { path } = await params;
    const subpath = path ? path.join("/") : "";
    const targetUrl = `https://codechef-pacman.vercel.app/${subpath}`;

    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      return new NextResponse(`Failed to fetch from ${targetUrl}`, { status: response.status });
    }

    let html = await response.text();

    // Inject base tag and custom CSS in the head
    // Note: <base> ensures all relative resources (scripts, images, chunks) resolve from codechef-pacman.vercel.app
    const injectedContent = `
      <base href="https://codechef-pacman.vercel.app/" />
      <style>
        /* Hide the fullscreen warning container completely */
        div[class*="fullscreenWarning"] {
          display: none !important;
        }
        .Home_fullscreenWarning__5Bsva {
          display: none !important;
        }
        /* Ensure layout displays correctly */
        body, html {
          overflow: hidden !important;
        }
      </style>
      <script>
        (function() {
          const proxyPath = '/api/proxy-pacman';
          const originalPushState = window.history.pushState;
          const originalReplaceState = window.history.replaceState;

          // Normalize the URL path on initial load so React Router matches the correct route
          const currentPath = window.location.pathname;
          if (currentPath.startsWith(proxyPath)) {
            let targetPath = currentPath.substring(proxyPath.length);
            if (!targetPath.startsWith('/')) {
              targetPath = '/' + targetPath;
            }
            const fullTargetPath = targetPath + window.location.search + window.location.hash;
            const absoluteSameOriginUrl = new URL(fullTargetPath, window.location.origin).toString();
            originalReplaceState.apply(window.history, [window.history.state, '', absoluteSameOriginUrl]);
          }

          function getProxyUrl(url) {
            if (!url) return url;
            try {
              const resolved = new URL(url, window.location.href);
              if (resolved.origin === window.location.origin) {
                let pathname = resolved.pathname;
                if (!pathname.startsWith(proxyPath)) {
                  if (pathname === '/') {
                    pathname = proxyPath;
                  } else {
                    pathname = proxyPath + (pathname.startsWith('/') ? '' : '/') + pathname;
                  }
                  resolved.pathname = pathname;
                }
              }
              return resolved.toString();
            } catch (e) {
              return url;
            }
          }

          window.history.pushState = function(state, title, url) {
            const proxied = getProxyUrl(url);
            const targetResolved = new URL(proxied, window.location.href);
            let targetNormalizedPath = targetResolved.pathname.substring(proxyPath.length);
            if (!targetNormalizedPath.startsWith('/')) {
              targetNormalizedPath = '/' + targetNormalizedPath;
            }
            const targetFullPath = targetNormalizedPath + targetResolved.search + targetResolved.hash;
            const absoluteSameOriginUrl = new URL(targetFullPath, window.location.origin).toString();
            return originalPushState.apply(this, [state, title, absoluteSameOriginUrl]);
          };

          window.history.replaceState = function(state, title, url) {
            const proxied = getProxyUrl(url);
            const targetResolved = new URL(proxied, window.location.href);
            let targetNormalizedPath = targetResolved.pathname.substring(proxyPath.length);
            if (!targetNormalizedPath.startsWith('/')) {
              targetNormalizedPath = '/' + targetNormalizedPath;
            }
            const targetFullPath = targetNormalizedPath + targetResolved.search + targetResolved.hash;
            const absoluteSameOriginUrl = new URL(targetFullPath, window.location.origin).toString();
            return originalReplaceState.apply(this, [state, title, absoluteSameOriginUrl]);
          };
        })();
      </script>
    `;
    
    html = html.replace(/<head\s*>/i, `<head>${injectedContent}`);

    // Rewrite relative links to go through our proxy instead of going direct
    // Replace href="/game" with href="/api/proxy-pacman/game"
    html = html.replace(/href="\/game"/g, 'href="/api/proxy-pacman/game"');
    // Replace href="/leaderboard" with href="/api/proxy-pacman/leaderboard"
    html = html.replace(/href="\/leaderboard"/g, 'href="/api/proxy-pacman/leaderboard"');
    // Replace href="/" with href="/api/proxy-pacman"
    html = html.replace(/href="\/\"/g, 'href="/api/proxy-pacman"');
    html = html.replace(/href="\/([\" >])/g, 'href="/api/proxy-pacman$1');

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    console.error("Proxy failed:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
