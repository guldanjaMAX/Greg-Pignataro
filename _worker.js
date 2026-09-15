const privatePage = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex">
  <title>Site currently private</title>
  <style>
    :root {
      color-scheme: light;
      font-family: ui-serif, Georgia, Cambria, "Times New Roman", serif;
      background: #f5f0e8;
      color: #27231f;
    }

    body {
      min-height: 100vh;
      margin: 0;
      display: grid;
      place-items: center;
    }

    main {
      width: min(34rem, calc(100% - 3rem));
      text-align: center;
    }

    h1 {
      margin: 0;
      font-size: clamp(2rem, 7vw, 4rem);
      font-weight: 400;
      letter-spacing: -0.035em;
    }

    p {
      margin: 1.25rem 0 0;
      font-family: ui-sans-serif, system-ui, sans-serif;
      font-size: 0.95rem;
      line-height: 1.6;
      letter-spacing: 0.03em;
      color: #625b52;
    }
  </style>
</head>
<body>
  <main>
    <h1>This site is currently private.</h1>
    <p>Please check back another time.</p>
  </main>
</body>
</html>`;

const privateHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  "Content-Type": "text/html; charset=utf-8",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet, noimageindex",
};

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Crawlers must be allowed to revisit the site so they can receive the
    // noindex response and remove previously indexed URLs.
    if (url.pathname === "/robots.txt") {
      return new Response("User-agent: *\nAllow: /\n", {
        headers: {
          ...privateHeaders,
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    }

    return new Response(request.method === "HEAD" ? null : privatePage, {
      headers: privateHeaders,
    });
  },
};
