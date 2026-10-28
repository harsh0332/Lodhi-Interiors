import { NextResponse, type NextRequest } from 'next/server';

// Temporary site pause. Remove this file and redeploy to restore the site.
// A 503 tells crawlers that the page is temporarily unavailable.
const maintenancePage = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#251c21">
  <title>Temporarily unavailable | Lodhi Interiors</title>
  <style>
    :root{color-scheme:dark}
    *{box-sizing:border-box}
    html,body{margin:0;min-height:100%}
    body{min-height:100svh;background:#251c21;color:#f7f1e9;font-family:Arial,Helvetica,sans-serif}
    .shell{min-height:100svh;max-width:1680px;margin:auto;padding:clamp(24px,4vw,64px);display:flex;flex-direction:column}
    header{display:flex;align-items:center;gap:16px;padding-bottom:28px;border-bottom:1px solid #6e585c}
    .mark{width:34px;height:34px;border:1px solid #cba985;display:grid;place-items:center;color:#e5c4a1;font:24px Georgia,serif}
    .brand{font:clamp(18px,2vw,23px) Georgia,serif;letter-spacing:.14em;text-transform:uppercase}
    main{flex:1;display:flex;align-items:center;justify-content:center;text-align:center;padding:72px 0}
    .content{max-width:780px}
    .rule{width:42px;height:1px;background:#cba985;margin:0 auto 38px}
    .eyebrow{margin:0 0 28px;color:#d9b99b;font-size:12px;letter-spacing:.26em;text-transform:uppercase}
    h1{font:normal clamp(46px,8vw,108px)/1.04 Georgia,'Times New Roman',serif;letter-spacing:-.045em;margin:0}
    p{font-size:clamp(16px,2vw,19px);line-height:1.6;color:#dbcfc9;margin:30px 0 0}
    footer{padding-top:28px;border-top:1px solid #6e585c;color:#b9a4a0;font-size:11px;letter-spacing:.18em;text-transform:uppercase}
    @media(max-width:600px){main{padding:60px 0}.brand{letter-spacing:.08em}}
  </style>
</head>
<body>
  <div class="shell">
    <header><span class="mark" aria-hidden="true">L</span><span class="brand">Lodhi Interiors</span></header>
    <main><div class="content"><div class="rule" aria-hidden="true"></div><p class="eyebrow">Site notice</p><h1>Website temporarily unavailable.</h1><p>Please try again later.</p></div></main>
    <footer>Lodhi Interiors</footer>
  </div>
</body>
</html>`;

export function middleware(request: NextRequest) {
  // Google recommends keeping robots.txt accessible during a temporary pause.
  if (request.nextUrl.pathname === '/robots.txt') return NextResponse.next();

  const headers = {
    'Cache-Control': 'no-store, max-age=0, must-revalidate',
    'Retry-After': '3600',
    'X-Content-Type-Options': 'nosniff',
  };

  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Website temporarily unavailable.' }, { status: 503, headers });
  }

  return new NextResponse(request.method === 'HEAD' ? null : maintenancePage, {
    status: 503,
    headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export const config = {
  matcher: '/:path*',
};
