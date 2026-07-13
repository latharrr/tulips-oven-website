# Tulip's Oven — Website

Website for Tulip's Oven, a home bakery in New Delhi. Static site, no build step, no framework, no dependencies — just HTML, CSS and a small vanilla JS file.

## Structure

```
index.html      Homepage — hero, menu, signature bake, gallery, about, ordering, testimonials, footer
blog/           Blog: index.html (listing) + 3 posts targeting bakery/cookie search queries
styles.css      All site styles
fontfaces.css   Self-hosted @font-face declarations (Caveat, Cormorant Garamond, Instrument Sans)
fonts/          Font files referenced by fontfaces.css
main.js         Mobile nav + header hide-on-scroll behaviour
images/         Logo assets (in use) + product photo slots (placeholders — see images/README.txt)
robots.txt      Allows all crawlers, including AI bots (GPTBot, ClaudeBot, PerplexityBot, etc.)
sitemap.xml     Homepage + blog pages
```

## Running locally

Any static file server works, e.g.:

```
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Before going live

- **Domain**: meta tags, canonical links, JSON-LD, and `sitemap.xml` currently use the placeholder domain `https://tulipsoven.com` — replace with the real domain once one is registered.
- **Photos**: all product/hero/gallery images are placeholder slots. Drop real photos into `images/` using the filenames listed in `images/README.txt`.
- **WhatsApp ordering number** is already set to the real number (9560709231) across all order buttons and the JSON-LD contact field.

## Deployment

Static output — deploy the folder as-is to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, etc.). No build command needed.
