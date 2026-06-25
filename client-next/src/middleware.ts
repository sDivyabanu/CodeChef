import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const referer = request.headers.get('referer') || '';

  // Check if this is a request from or for the Flappy Chef game
  const isAssets = pathname.startsWith('/assets/');
  const isClient = pathname.startsWith('/Client/');
  const hasExtension = /\.[a-zA-Z0-9]+$/.test(pathname);
  const isNextInternal = pathname.startsWith('/_next/') || pathname.startsWith('/api/');

  // We proxy if it is directly in /assets/ or /Client/ or if it is a file requested by the flappy chef page
  if (isAssets || isClient || (hasExtension && !isNextInternal && (referer.includes('proxy-flappy') || referer.includes('flappy-chef')))) {
    const targetUrl = new URL(pathname + url.search, 'https://flappychef.poseidon0z.com');
    console.log(`[PROXY] Proxying: ${pathname} -> ${targetUrl.toString()}`);
    
    try {
      const response = await fetch(targetUrl.toString(), {
        headers: {
          'User-Agent': request.headers.get('user-agent') || '',
        },
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type') || '';
        const body = await response.arrayBuffer();
        return new NextResponse(body, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
    } catch (e) {
      console.error('[PROXY] Failed:', e);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths except internal Next.js paths
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
