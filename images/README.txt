Photo slots on the site. Filenames matter: the HTML links directly to these.

DONE (already in this folder, used on the live site):
  hero-cookie-stack.webp   - hero photo, cookie stack
  menu-thicc.webp          - Thicc Cookies category photo
  signature-brookie.webp   - The Brookie, signature bake
  menu-brownies.webp       - Brownies / brookies category photo
  menu-muffin.webp         - Lava Muffin category photo

STILL NEEDED (currently show a plain placeholder tile, not a broken image):
  menu-crumbl.webp   - Crumbl-style cookies (square)
  menu-sips.webp     - Iced Sips / cold coffee (square)
  about-kitchen.webp - kitchen or storefront photo (landscape ~4:3)
  gallery-1.webp     - fresh out of the oven (large tile)
  gallery-2.webp     - Sunday batch of Brookies
  gallery-3.webp     - cooling rack
  gallery-4.webp     - boxing up an order
  gallery-5.webp     - iced sips ready to go
  gallery-6.webp     - packed for delivery

Since these 9 slots have no src attribute yet (to avoid 404s), adding a photo
means both dropping the file here AND adding back `src="images/<name>.webp"`
on the matching <img> tag in index.html.

Use WebP, not JPEG or PNG: 25-30% smaller at the same visual quality, and
every current browser supports it. Any photo editor or squoosh.app can export
WebP. Keep each file under ~200KB (export at "web quality", not full camera
resolution) to keep the site fast.
