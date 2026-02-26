# chrisbutler.dev

Personal portfolio site. Static HTML/CSS/JS deployed on Cloudflare Pages.

## Stack

- Vanilla HTML, CSS, JavaScript — no build step
- [Newsreader](https://fonts.google.com/specimen/Newsreader) + [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3) via Google Fonts
- Hosted on [Cloudflare Pages](https://pages.cloudflare.com/)

## Local Development

```bash
# Serve locally
python3 -m http.server 8080

# Open in browser
open http://localhost:8080
```

No dependencies, no build tools, no package manager.

## Project Structure

```
cb.dev/
├── index.html           # Single-page portfolio
├── css/
│   └── styles.css       # All styling (warm editorial theme)
├── js/
│   └── easter-egg.js    # Hidden snake game (5x click profile photo)
├── images/
│   ├── profile.jpg      # Profile photo
│   ├── favicon.ico      # Favicon
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── android-chrome-192x192.png
│   └── android-chrome-512x512.png
├── site.webmanifest     # PWA manifest
├── robots.txt           # Crawl rules
├── sitemap.xml          # Sitemap for search engines
└── llms.txt             # LLM-friendly site index
```

## Deployment

Push to `main`. Cloudflare Pages deploys automatically.

| Setting | Value |
|---------|-------|
| Build command | *(none)* |
| Build output directory | `/` |
| Root directory | `/` |

## SEO

- Open Graph and Twitter Card meta tags
- JSON-LD structured data (Person schema)
- Canonical URL
- `robots.txt` with sitemap reference
- `sitemap.xml`
- `llms.txt` following the [llmstxt.org](https://llmstxt.org) spec

## Easter Egg

Click the profile photo 5 times within 2 seconds to play Snake.

## License

All rights reserved.
