# Simple Collins landing page — November 6, 2026

Chase requested a saved full website for later and a simpler customer-facing landing page now: established artwork, portfolios and easy navigation.

## Restore point

Before editing, created remote branch **`archive/full-art-website-2026-11-06`** at main **`eba401005ee971ae149d6b58edcd8757e20db096`**. All earlier branches remain. This is the exact pre-simplification website, including villa interiors, feature collections, form, owner studio and creative history. Resume future creative work there while keeping the simple public site live until requested otherwise.

## Implementation

- One scrolling homepage: original villa painting and outlined Collins wordmark, real photo portfolios, services and call/text contact. Sticky Projects / Services / Contact menu and artwork quick links.
- Eight ordinary album pages: 9 / 13 / 15 / 13 / 4 / 14 / 15 / 11 original photos. HTML links, browser Back, all-project return and next-album links.
- Native full-size viewer with previous/next, keyboard arrows, Escape and opener focus return; touch swipe is implemented. Without JavaScript, albums remain readable and photo links open original images.
- Phone cover fits the complete artwork at once, with readable branding above it. No sideways panning. Optional toy submarine retained.
- Confirmed contact remains `+14695007713`. Direct call/text; no form, lead capture, new service, subscription, or unverified email address.
- Old `#work/<slug>` redirects to the real album; `#project` and `#about` to contact; `#home`, `#launch`, `#pool` to home; `#experience/*` to projects. Unknown/malformed hashes recover home.
- Artwork, wordmarks, catalog and all 94 photo files are byte-identical. Historical scripts/styles are retained but not loaded. CSS bundle reduced from roughly 236 KB to 12 KB; this is a bundle-size observation, not a measured speed score.
- Shared generator `scripts/render-landing.mjs`, `public/landing.css`, `public/landing.js`, `public/gallery.js`; generated output is committed for the existing Cloudflare integration.

## Validation before publication

- Desktop browser visited all eight albums, checked exact photo counts, and found no horizontal page overflow.
- Browser frames at 390×844 and 320×640: cover, menu, anchors, project navigation, services and contact; measured content fits both frames. These are browser layout tests, not physical devices.
- Album → full-size photo → Next → Escape → opener focus return; album → all projects; legacy album/contact and malformed-hash recovery.
- Generated local asset/link targets exist; unique HTML IDs; photo counts match; all 94 photo files decode; artwork/catalog/photo bytes unchanged.
- Syntax, output freshness, whitespace and Wrangler dry-run packaging checks pass.
- Call/text destinations inspected. No customer call/text sent. Actual dialer/SMS handoff, carrier delivery, physical touch/swipe, Safari-specific rendering and measured Core Web Vitals remain unverified.

## Publication

Release marker **`collins-simple-landing-01`**. Publish via existing GitHub main → Cloudflare Worker. Confirm the Cloudflare build, live version marker, public home and album after merge. No new hosting project/domain.
