import { NextResponse, type NextRequest } from 'next/server';

// Temporary site pause. Remove this file and redeploy to restore the site.
const unavailablePage = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Website Unavailable</title>
</head>
<body>
  <h1>Website Unavailable</h1>
  <p>This website has been temporarily taken offline.</p>
</body>
</html>`;

export function middleware(request: NextRequest) {
  // Keep robots.txt accessible during a temporary pause.
  if (request.nextUrl.pathname === '/robots.txt') return NextResponse.next();

  const headers = {
    'Cache-Control': 'no-store, max-age=0, must-revalidate',
    'Retry-After': '3600',
    'X-Content-Type-Options': 'nosniff',
  };

  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Website unavailable.' }, { status: 503, headers });
  }

  return new NextResponse(request.method === 'HEAD' ? null : unavailablePage, {
    status: 503,
    headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export const config = {
  matcher: '/:path*',
};
