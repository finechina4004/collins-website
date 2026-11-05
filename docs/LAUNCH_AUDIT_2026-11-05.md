# Collins launch audit — November 5, 2026

Scope: finish the existing site, preserve the Italian villa/vineyard direction, remove the submarine journey, retain a homepage toy, and publish through the existing GitHub/Cloudflare setup. Source baseline: main `4d474a68832ec58e8abd1cfaa33663239aa47c17` (PR21), including the previously unfinished walkthrough fixes. Release marker: `collins-launch-ready-02`.

## Findings and repairs

- Removed boarding, cockpit, rig, pool session, replay/dive story scripts, and the obsolete duplicate homepage. No automatic submarine journey remains.
- Homepage toy supports pointer dragging, arrow keys and Home reset. Its position is clamped to the illustrated pool; it does not change routes or interrupt normal artwork panning.
- Pool entrances now go directly to real pool projects. Removed journey links from feature rooms, album navigation and footer. Old `#launch`, `#pool` and `#home` recover to `#backyard`.
- Malformed hashes formerly reached `querySelector` and could throw a SyntaxError. Route validation now recovers to Services with a useful notice, using safe ID lookup.
- Phone artwork has swipe instructions and left/right controls. Removed an unused inline SVG that caused 18 pixels of extra home scrolling. Repaired narrow-phone inner navigation overflow.
- Night logo and navigation now use legible cream ink. Retained daylight lettering, illustrations, real service-study photos, gallery framing, and native photo viewer.
- Removed stale draft-album loading copy. Catalog failures show a clear recovery message and reload control; contact remains available. Owner IndexedDB is opened lazily, not on every homeowner visit.
- Required name/town values are trimmed and validated. Call/text destination remains the confirmed number. Added footer phone access and an original-letterform SVG favicon.
- Preserved stylesheet ordering while combining it into one fingerprinted request, removed the boarding stylesheet from the bundle, and deferred non-home images. No new runtime dependency, paid tool, CRM, automation or lead endpoint.

## Checks completed before publication

| Area | Evidence |
| --- | --- |
| Source / packaging | JavaScript syntax checks; no duplicate HTML IDs; entrypoint scripts/styles/images exist; generated CSS check; Wrangler dry-run packaging passed. |
| Photos | All 94 original photo files decoded with Pillow; catalog and original photo bytes unchanged. Eight cover IDs checked. |
| Desktop | Home, direct Services/Our work/Start a project routes; all eight album routes/counts; four feature collections with 8/5/2/3 albums; no observed page-width overflow. |
| Phone layouts | Browser frames at 320×640 and 390×844. Home pan controls; narrow Services/contact navigation; all eight albums at 390 width (9/13/15/13/4/14/15/11 photos), all four feature collections; no observed page overflow after narrow menu fix. These are browser layout checks, not physical devices. |
| Photo interaction | Reader next, full-screen next, Escape close and focus return exercised. Existing original-order chapters, thumbnails, contact sheets and in-app place retention retained from PR21. |
| Toy | Desktop pointer drag visibly changed position without navigation. Arrow keys changed coordinates. Pool bounds enforced in source. |
| Recovery | `#launch` and `#pool` visibly recovered home; malformed `#[` visibly recovered Services. Simulated missing catalog displayed failure/retry; restoring catalog triggered preview reload and recovered all eight albums. |
| Contact | Dummy data only. Whitespace/invalid values rejected; valid data produced reviewed SMS with encoded fields and confirmed destination; Copy produced success status; Download completed; clear/undo exercised. No messages sent. |
| Scene controls | Day/evening and pause state toggles verified. Audio remains explicit opt-in; actual audible playback not confirmed. |

## Delivery boundary and remaining limits

The contact form is **not an automatic inquiry receiver**. It prepares a note for the visitor's own messaging app. The page explicitly says nothing is sent, and the visitor must tap Send. The call and text links target `+14695007713`. Carrier delivery, whether that phone is answered/monitored, iOS/Android Messages behavior and native dialer handoff cannot be proven from this cloud browser. A physical-phone call/text is the useful owner check; no new software is needed.

No measured Core Web Vitals, throttled mobile network score, physical-device touch test, cross-browser Safari/Firefox pass or assistive-technology certification is claimed. The existing workers.dev address is a usable public destination; custom-domain work and automatic lead capture are separate future choices. The local owner studio is not online publishing.

## Publication verification

After merging this release, confirm the existing `Workers Builds: collins-website` check succeeds, the live version marker is `collins-launch-ready-02`, root serves the simplified homepage, direct album/contact routes work, old hashes redirect home, and referenced live assets respond. Keep temporary QA frames and browser screenshots out of the published files. Historical journey documents do not override this release.
