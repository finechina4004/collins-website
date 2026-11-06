# Collins: simple navigation, art throughout — November 6, 2026

Chase approved a vintage Collins pool-club brochure direction across the entire website. Keep one simple scrolling home and ordinary album links. Carry the artwork, real photographs, typography and palette through every section instead of returning to the old multi-screen journey.

## Restore points

- Full creative website: `archive/full-art-website-2026-11-06`, commit `eba401005ee971ae149d6b58edcd8757e20db096`.
- Published simple landing page before this art pass: `archive/simple-landing-2026-11-06`, commit `6be0e775551caf37d7745d50c06e4ad738b095cf`.

## Scope

- Retained the exact villa cover, logo outlines and optional toy submarine.
- Original Canyon Rim and Parkly Soft are now used throughout headings, menus, album titles, captions and printed details. WOFF subsets are generated from Chase's supplied font archives; no external font CDN. Font archives remain private inputs, not public assets.
- Projects become photographic postcards with sage, blush, pale blue and butter mats, subtle framing, album numbers and real photos.
- Every album carries its cover palette into its title spread and individually mounted photographs. The full-size viewer shares the same olive/cream typography and treatment.
- Services use an illustrated spread: a crop of the existing master painting, three readable service descriptions, quiet checker detail and a direct contact link.
- Contact is a correspondence card on baby blue, with a small vector pool-float mark and obvious call/text buttons. Footer, menu and 404 share the same visual language.
- No forced transitions, scene navigation, new form, sound, lighting controls, invented business facts or additional services. The confirmed call/text number remains `+14695007713`.
- All 94 photo files, their catalog and the master artwork remain unchanged.

## Source and repeatable output

Shared generator: `scripts/render-landing.mjs`. Styles: `public/landing.css` plus `public/art-direction.css`, ordered in `scripts/style-sources.json`. Run `npm run build:assets` to regenerate the fingerprinted CSS, home, eight albums, 404 and sitemap. `npm run check:deploy` checks freshness and Wrangler packaging.

Font source files supplied by Chase: Canyon Rim archive `libfile_4a36450a6864819195c678edeffe53ac`; Parkly archive `libfile_90b0d598a84881918d673f91373d8f99`, specifically `Parkly-Soft.otf`. Public WOFF files retain family names and contain Latin and used punctuation. A WOFF2 attempt was discarded when the local encoder lacked Brotli; WOFF requires no new runtime dependency.

## Validation

- Browser visited all eight album URLs explicitly; exact counts 9/13/15/13/4/14/15/11, no horizontal overflow on desktop.
- Browser frames at 390×844 and 320×740 checked menu, complete cover, postcard layout, services and correspondence contact. Long album titles fit the narrow layout. These are layout tests, not physical-device tests.
- Full-size viewer Next/Escape/opener focus, album return and section anchors remain working.
- Every generated local link/asset resolves to a source file; IDs are unique. Fonts decode as valid WOFF. Master artwork, catalog and photo bytes are unchanged.
- JavaScript syntax, CSS/generated output freshness, whitespace and Wrangler dry-run packaging pass. The 404 omits homepage toy scripts so it does not dereference a missing toy.
- Physical phone SMS/dialer delivery, actual touch swiping, Safari-specific behavior and measured Core Web Vitals remain unverified. No calls or texts sent.

## Release

Marker: `collins-pool-club-art-01`. Use the existing GitHub main → Cloudflare Worker integration. Verify the build, marker and customer paths on the live URL after merging. Keep both restore branches and the real project catalog.

## Delivery checkpoint

The complete implementation is saved in PR **#24**: https://github.com/finechina4004/collins-website/pull/24. The new design is **not live**. Automatic approval review rejected the production merge because this new design pass needs explicit publishing approval. Ask Chase to approve publication of this new version; after approval, merge the latest PR head and verify the existing Cloudflare build, live marker and customer pages. Do not use another publishing route to bypass the rejection.
