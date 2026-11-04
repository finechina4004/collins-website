# Collins rendered-site audit and first repair pass

November 4, 2026. Continues `design/living-backyard-cutaway` at `b406ba194f4b129050c16ce0fafdc07efdd8ae89`, draft PR #14. Main at `44a759fadb5ac6253a19c6cdd012ea4450d7e135` and production were not modified. Do not merge or deploy without the owner's approval.

## What was actually inspected

**Production:** https://collins-website.chasehess-hq.workers.dev/ . The actual browser-rendered root still opens the older physical miniature/vessel launch. Boarding reached the underwater journey. Dog and dropped-phone chapters, evening light, periscope and poolside exit were exercised; still scenes worked. All eight live album routes rendered their expected contact-sheet counts. Photo viewer next, keyboard Escape, focus return, project-note preparation and copy worked. Call/text destinations point to the confirmed +14695007713. Fictional test notes were cleared; no call or message was sent.

The live `version.json` response says `collins-pool-stories-02`, referencing `b2e431f`. This marker is not an authoritative deployed commit. No exact production commit identity is claimed. Production album headers only offer the project shelf; their explicit submarine link is at the end. The review already improves this with submarine/artwork links at the top and bottom.

**Current review:** restored from the latest remote working branch, then rendered locally with all real assets. Desktop around 1365×936, portrait 390×844 browser iframe, and 844×390 landscape iframe. These are responsive browser viewports, not physical-device tests. The existing legacy ChatGPT Site was not changed and is not the current review.

## Findings in plain English

| Area | What works | Remaining issue / priority |
| --- | --- | --- |
| Arrival and creative direction | The painted architecture, ordinary people, shared vessel and small stories form a more consistent Collins world in the review. | Production still shows the older physical-render direction. The review awaits artistic/release approval. |
| Navigation | Direct access to artwork, services, work and inquiry; keyboard entry and browser history. | Fixed in this pass: changing header meanings, wrong footer home destination and dead-end holding page. |
| Submarine | Boarding/descent, five chapters, dog/phone stories, still mode, evening/periscope and chapter-preserving album return. | Review visual finish still needs owner assessment; not a complete real-device or assistive-technology audit. |
| Real projects | Eight albums, 94 original photographs, complete-album links, viewer controls and focus return. | No photo files/catalog changed. Every live photo was not independently verified. |
| Fire / Kitchen / Shade | Working photo collections with closer crops of the shared painting; 5 / 2 / 3 albums. | These are not bespoke illustrated interior worlds. Build one such scene at a time after the pool direction is accepted. |
| Project notes | Honest write → review → native Messages flow, direct phone/text links; review adds session draft and clear/undo. | No automatic inquiry receiver or delivery confirmation. Real iOS/Android Messages handoff was not tested. |
| Speed | Supplied WebP artwork is roughly 180–288 KB per new illustration; photo files are already optimized. | No reliable production performance benchmark, throttled-network test or Core Web Vitals result. Measure before claiming speed improvements or undertaking CSS consolidation. |
| Owner tools | Studio opens, albums/fields present, publishing visibly disabled with local-only explanation. | Upload/import/export/edit/publish controls were not exhaustively tested this pass. Saving here is not remote publication. |

## First completed section: navigation and entry recovery

- Header destinations remain **The backyard / Services / Our work / Start a project** on the artwork, expedition, feature pages, albums and ordinary site sections. Services enters the actual services desk at `#build`.
- Removed competing label/href writers from the expedition and backyard scripts; recovery.js owns primary current-page state. Album routes mark Our work active; services/about routes mark Services active.
- Header and footer wordmarks both return to `#backyard`.
- Phone header links meet a 44px minimum target height. The inspected short-landscape links were 46px high. Neither inspected document overflows horizontally; the homepage panorama intentionally scrolls within its own container.
- The old holding page now uses the existing Collins wordmark and offers the artwork, real projects, inquiry and confirmed call link. Its obsolete coming-soon claim is removed. It remains noindex.

## Verification of the review

- Desktop: all five stops; manual still mode; periscope open; four feature routes (8/5/2/3 cards); all eight album routes (9/13/15/13/4/14/15/11 photographs); viewer next/keyboard Escape/focus; Services via keyboard; footer home; browser Back from artwork to Services; repaired holding entry; direct 404 page and its homepage link; owner studio opened read-only.
- Portrait: normal boarding/descent; all five still chapters and their headings with no horizontal document overflow; pool collection → Black Tie, Barefoot (13) → resume chapter 3 → artwork; all eight album routes, viewer next/Escape; Fire/Kitchen/Shade collections (5/2/3), shade document without overflow; artwork panning; stable header link dimensions. Two asynchronous album reads were initially stale; revisiting and waiting for the correct title verified Supper=15 and Umpire=11.
- Portrait project note: short phone rejected, valid fictional note prepared with an encoded SMS URI; clear hid the old review and emptied the name; Undo restored the fictional name; the test draft was cleared afterward. No native Messages link was opened.
- Landscape: homepage rendered at 844×390; no horizontal document overflow; all header links 46px high. Full landscape journey was not repeated this pass.
- Source: all 94 real WebP images decode and are byte-identical to main; projects.json is byte-identical; runtime/inline JavaScript parses; HTML IDs unique; local index references exist; Git whitespace check and Wrangler packaging dry-run passed. New navigation touches no catalog or photograph files.

## Explicit verification limits

Production refuses the cross-origin phone iframe (consistent with its SAMEORIGIN/frame-ancestors headers). Browser viewport-resizing/device-emulation is unavailable here, so the actual production phone layout was not verified. All phone checks above are of the current review build.

A direct executor bulk HTTP check was blocked with 403 responses; do not interpret those as broken images or infer a bot block. A browser attempt to cycle all live photographs timed out after partial progress. This pass verifies live album routes and viewer behavior, plus all 94 source files, not every live image decode. The browser connection briefly dropped and recovered. There is no completed physical-phone, OS reduced-motion, screen-reader, network-failure, real SMS-delivery or production speed audit. Some rapid automation clicks during navigation required a fresh observation and repeat; no reproducible end-user failure was established.

## Continue in manageable sections

1. Keep this navigation repair saved in PR #14, separate from production.
2. Measure the current review's loading/interaction behavior on a real phone and obtain production mobile performance evidence when supported.
3. Refine the phone panorama/discovery readability from those observations.
4. Develop one Fire/Kitchen/Shade illustrated close-up at a time, preserving immediate access to the real albums.

Preview for this running session: `http://terminal.local:4173/`. It is a session-local preview, not a durable public deployment. The actual live website remains the workers.dev URL above. A desktop capture is retained locally for the chat review, not uploaded to the public repository. Keep QA iframe files in ignored dist/ only; do not publish them or commit the temporary local preview manifest.
