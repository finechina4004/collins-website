# Collins final launch audit — November 6, 2026

## Scope and authorization

Chase explicitly requested audit, essential fixes, retesting and publication using the existing GitHub / Cloudflare setup. Keep the Italian villa/vineyard artwork, fonts, real photographs and business details. No new paid tools, forms backend, CRM or automation project. This authorization includes reviewing and finishing unpublished source; it resolves the previous PR #24 publishing hold.

## Starting state

Production main was `6be0e775551caf37d7745d50c06e4ad738b095cf`, the simplified landing page. Open PR #24 at `fbd04f4329496041f7271fdcdc57e9c3350dae59` carried the purchased fonts and coherent album/services/contact treatment. Reviewed the deployed page, source and this unfinished update; carried the update forward instead of redesigning again. Both existing archive branches remain intact.

## Finished behavior

- One scrolling home, ordinary project albums, direct Services and Contact links. The submarine is only an optional draggable / keyboard-controlled homepage toy. No boarding, slides, dive or forced journey is loaded.
- Preserved the villa artwork and all eight albums / 94 original photographs. Headings and details use the supplied Canyon Rim / Parkly Soft webfonts. Album, viewer, services and contact share the approved palette and printed treatment.
- Fixed observed tablet overlap between opening links and the villa roof. Readable introduction now identifies Aubrey and service across North Texas. Added Services to the opening quick links. Phone and tablet cover uses the complete painting under the introduction.
- Content-hashed script URLs prevent the browser from retaining obsolete interaction code after a release. Toy script safely exits on pages without a toy.
- Shared old album hashes open ordinary albums; old project/contact links recover to contact; former experience links recover to projects. Unknown hashes recover home. Custom 404 provides a working project return path and does not load toy/journey scripts.

## Inquiry truth

There is no form, submission request, automatic lead capture or delivery confirmation in the active site. Visitors call or open their own messaging application using the confirmed public number **469-500-7713** (`+14695007713`). A visitor must send their text in that application. The number is visible for manual use on devices without a configured handler. No call/text was sent during testing.

## Prepublication verification

- Actual desktop browser visited every album: counts 9 / 13 / 15 / 13 / 4 / 14 / 15 / 11. All first photos loaded, titles fit, and no horizontal document overflow was found.
- Phone-sized browser frame visited all eight albums and checked counts / overflow. Additional home layout frames at nominal 320, 390, 768 and 1024 widths checked navigation hit areas and introductory links. These are browser layout tests, not physical phones.
- Full-size viewer: next, previous via ArrowLeft, Escape, opener focus restoration, close button and phone-sized next / close. All-project return and services/contact anchors tested.
- Submarine: pointer drag changed position without changing route; ArrowRight moved it; Home reset it.
- Legacy album, contact and experience links tested in browser. Generated local asset/link targets and anchor IDs checked across all 10 HTML pages: no missing references or duplicate IDs. All 94 photograph files decode and are byte-identical to production main.
- Only `landing.js` and `toy.js` load on home; only `gallery.js` loads on albums. No active form. JavaScript syntax, generated output freshness, whitespace and Wrangler deployment dry run pass.

## Verification limits

Native phone dialer / Messages launch and carrier delivery, physical touch swiping, Safari, screen-reader operation and measured Core Web Vitals were not tested. No claim of automatic inquiry delivery. These do not block a launch with the clearly presented direct call/text contact path.

## Release

Release marker: `collins-launch-finished-01`. Publish the completed PR through the existing main → Cloudflare Worker integration. Publication is complete only after the build succeeds and the release marker / customer paths are verified on the public URL. Live verification will be recorded after release.
