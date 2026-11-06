# Collins Custom Pools & Backyards

The site keeps a simple scrolling page and ordinary photo albums, with the original villa artwork, Collins typography, individual photographic album jackets, a painted services spread, and correspondence-style contact. Repository: `finechina4004/collins-website`. Worker: `collins-website`.

## Saved full website

The full creative website is preserved on **`archive/full-art-website-2026-11-06`**, at commit **`eba401005ee971ae149d6b58edcd8757e20db096`** (main before this change). It includes the villa interiors, feature collections, project-note form, owner studio, prior artwork and creative history. Do not resume that version over production unless Chase asks to bring it back. Start future creative work there while keeping this simple page live for customers.

Current browser audit: `docs/BROWSER_LAUNCH_AUDIT_2026-11-06.md`. Earlier launch handoff: `docs/FINAL_LAUNCH_AUDIT_2026-11-06.md`. Art-direction notes: `docs/POOL_CLUB_ART_DIRECTION_2026-11-06.md`. The simpler landing-page release is preserved on `archive/simple-landing-2026-11-06` at `6be0e775551caf37d7745d50c06e4ad738b095cf`.

## Customer experience

- One scrolling homepage: artwork → projects (`#work`) → services (`#build`) → contact (`#contact`). Artwork quick links and a sticky menu.
- Eight ordinary HTML album pages in `public/albums/`, with every original photo, optional full-size viewer, next-album links and all-project return links. Home and albums work without JavaScript.
- Browser Back closes an enlarged photograph before leaving its album. Forward and shared `#photo-N` links reopen the selected photograph; Close and Escape restore thumbnail focus. Canonical album URLs match Cloudflare's extensionless public URLs.
- Original artwork, outlined purchased brand lettering, catalog and 94 photo files unchanged. No landscaping service or invented project facts.
- Optional homepage submarine toy. No automatic scene changes, sound, lighting controls or separate journey.
- Old `#work/<slug>` links redirect to real album pages. `#project` and `#about` lead to contact. Old journey hashes lead home; feature routes lead to the projects. Unknown hashes safely recover home.

## Contact

Confirmed call/text number: **469-500-7713**, from `public/site-config.js`. Direct `tel:` and `sms:` links, no form or automatic inquiry endpoint. No new paid software, CRM, automation or hosting registration.

## Editing and publishing

`public/content/projects.json` remains the album source. Edit shared structure/copy in `scripts/render-landing.mjs`, and styles in `public/landing.css` plus `public/art-direction.css`. Original Canyon Rim and Parkly Soft web-font subsets live in `public/assets/fonts/`. Historical runtime files stay in source but are not loaded by the landing page.

1. Install missing dependencies with `npm ci --ignore-scripts`.
2. Run `npm run build:assets`. It fingerprints `public/site.css` and regenerates home, eight albums, 404 and sitemap. Commit generated output alongside source.
3. Run `npm run check:deploy` for output freshness and Wrangler packaging checks. `npm run build:site` prepares `dist/` if needed.
4. Use the existing GitHub main → Cloudflare integration, deploying committed `public/` with `npx wrangler deploy`.
5. Confirm the successful build and live `version.json` marker `collins-browser-audit-01`; check public home, an album and contact.

Do not publish temporary QA frames or checkout-local preview configuration.

Album jacket design and validation: `docs/ALBUM_JACKETS_2026-11-06.md`.
