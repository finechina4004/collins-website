# Browser launch audit — November 6, 2026

## Verified starting point

GitHub main was `4016ed446c8bec1c30adf51eba8b415bc230333d`. Its Cloudflare Workers Builds check succeeded, and the public site showed the current Italian villa, photographic album jackets, eight ordinary albums, services and direct call/text contact. Read the current README, final launch audit, quiet-gallery notes and album-jacket notes before editing. Older handoffs describe a superseded immersive draft; this release preserves the current composition and archives.

## Problems reproduced and fixed

- Browser Back from an enlarged photo left its album. The viewer now uses one photo history entry: Back closes it, Forward reopens it, and Previous/Next replace the photo in that entry. Close and Escape return to the album and restore thumbnail focus. Shared `#photo-N` links and refreshes reopen the selected photo.
- The narrow-screen navigation Call target measured only 23–28px wide. It now has a 44px minimum width; retested at 44px with the rest of the menu fitting.
- Cloudflare redirects `.html` album requests to extensionless public URLs. Canonical/share metadata and sitemap entries now use those actual destinations.
- Enlarged photos now retain the original descriptive alt text instead of substituting their shorter captions.

No artwork, album names, catalog, photo bytes, services or confirmed phone details changed. Public contact remains `tel:+14695007713` and `sms:+14695007713`. There is no form or automatic delivery confirmation, and no call or message was sent.

## Actual browser verification

- Desktop: traversed all eight albums through their Next backyard links; opened every photograph in the viewer. Loaded counts were 9/13/15/13/4/14/15/11, totaling 94. Previous/Next and end-to-start wrapping worked; no horizontal page overflow.
- Browser layout frames nominally 320×740 and 390×844: traversed all eight albums in each frame; titles, counts and first images matched, with no horizontal overflow. Scrollbars left actual content widths of 305px and 375px. Home navigation also fit nominal 768px tablet and 844px landscape frames. These are Chrome layout tests, not physical phones or touch-device emulation.
- Narrow viewer: checked long album title, photo, caption and controls. Close was 46px high; Previous/Next were at least 44px high, and the footer fit within the frame.
- History: opened a photo, advanced, used Back, used Forward, then Escape; selected photo and thumbnail focus were correct. Reload at `#photo-3` retained the selected photo; Close returned to its album.
- Failure case: an isolated temporary fixture intentionally used a missing first-photo URL. The viewer displayed its error message, then Next loaded a real photo and cleared the error. Fixture removed before packaging.
- Home: Services → Talk with Collins → Contact, top return and submarine ArrowRight/Home movement passed. Call/text URL destinations and contact button dimensions were inspected without placing calls or sending texts.
- Legacy album link, old project/contact route, old feature route, invalid album and unknown hash all recovered to the expected destination.
- No site application exception observed in the inspected logs; extension metadata errors came from the browser extension. No physical-device, Safari, screen-reader, network-throttling, carrier-delivery or measured Core Web Vitals result is claimed.

## Source and packaging checks

All 10 generated HTML pages have valid local asset/link targets and unique IDs. All 94 catalog photo files decode and match their Git baseline blob hashes; total photo payload is 10.26MB spread across lazy-loaded albums. Home loads only landing.js/toy.js, albums only gallery.js, and no active form exists. Generated-output freshness, JavaScript syntax, whitespace and Wrangler deployment dry run pass. Temporary QA pages and preview configuration are excluded from publication.

## Publication and domain

Release marker: `collins-browser-audit-01`. Publish through the existing GitHub main → Cloudflare `collins-website` integration. Confirm the exact merged commit's successful Workers Build, public marker, viewer history, album navigation, contact destinations and 404 recovery after release; merge alone is not deployment evidence. The release PR and final delivery record the resulting live checks.

The preferred `https://collinscustompools.com/` returned an upstream connection failure in this browser. The existing Worker remains the verified public destination. The correct Cloudflare account/Worker URL was obtained from the successful GitHub check; its dashboard currently requires sign-in. Domain/DNS changes require that access. Do not change canonicals to an unverified domain.
