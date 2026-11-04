# Collins recovery handoff — November 4, 2026

## Read this before doing anything

The owner asked to pause for a portable transfer because only 15% of session usage remained. Preserve the work and resume with the same creative spirit. This is a **draft checkpoint, not a release**. Do not confuse source presence with a successful visitor experience. Inspect production, inspect this draft, compare them, refine, then publish through the existing GitHub → Cloudflare integration.

Canonical repository: **finechina4004/collins-website**. Existing Worker: **collins-website**. Production: https://collins-website.chasehess-hq.workers.dev/ . GitHub main was reverified at **30e838acce6136399ac6988d8027229226e3b0ff** when this handoff was prepared. No recovery changes had been merged or deployed. The last known Worker deployment was `2134616c-23f6-4237-87d0-32aa6e405eef`; verify current state rather than assuming it is still current.

## The north star, in the owner's words

Someone lands and thinks: **“Holy fuck. This is a pool company's website?”** A familiar North Texas backyard becomes extraordinary at the scale of a pool toy. A little physical mustard submarine guides visitors through an immersive Life Aquatic–inspired Collins world. Boarding, descending through the waterline, understanding the tiny scale, discovering distinct places, and surfacing into the **same backyard** should form one memorable sequence.

The influence must appear through vessel, architecture, props, composition, lettering, timing, movement and small stories. Cinematic framing; tactile materials; expressive lettering; beautiful light; dry humor; objects worth inspecting; little imperfections and signs of life. It must belong to Collins, not become a movie pastiche or a generic nautical theme. Hiring Collins must remain straightforward. The final test: would someone remember it tomorrow, send it to a friend, and still understand who can build their backyard?

### Explicit owner requirements and decisions

- Keep the existing GitHub repository and Cloudflare Worker. Do not create a replacement ChatGPT Site.
- Preserve established branding, all eight exact album names and all 94 real photographs.
- Keep illustrative art distinct from authentic project photography. Never generate/retouch project evidence or invent locations, scope, builder attribution, testimonials or company history.
- Collins builds custom pools and complete backyards in Denton County and surrounding North Texas communities. **No landscaping service.**
- The submarine guides and docks at discoveries; it does not chase the cursor. Normal scrolling, keyboard access, phone controls, motion options and a clear skip/contact route matter.
- Use historical versions for comparison; do not blindly roll production back.
- Owner authorized the recovery implementation and publishing with “do it all,” then redirected the active task to this transfer checkpoint.
- Owner expressly confirmed **469-500-7713** in this session. Use `tel:+14695007713` and `sms:+14695007713`. No receiving email address or form backend was confirmed.

The new panorama, five chapter names, shortened boarding timings, archival shelf treatment and Messages project-note handoff are **assistant proposals implemented in a local draft**, not separately approved creative decisions. Do not recast them as the owner's direction.

## What the audit established

The submarine was not deleted by the photo imports. A plain fresh root URL still opened boarding. `#home` opened the editorial site, and `#work`/album links bypassed boarding. The header logo had used `#home`, creating two meanings of home, and albums lacked an obvious expedition return. Routing explains the perception better than an unsupported caching story.

The more substantial loss was creative continuity: five stops largely reused one tiled environment; isolated props changed without building a strong story; the above-water stop relied on shadows and a placard; surfacing led into an editorial website that felt detached from the expedition. Real albums were valuable progress, but their presence did not repair that gap. This is a critique based on observed screens/source; it does not establish why every design decision happened. No evidence proves the owner requested that loss of identity.

### Meaningful historical checkpoints

| Commit | What it establishes |
| --- | --- |
| `d9becda` | Original recovered migration/native-scroll work; execution brief makes guide-and-dock movement explicit. |
| `5fa2a8f` / `d74093e` | Recovered submarine experience verified and published to the existing Worker. |
| `a08ae18` | Intermediate immersive refinement checkpoint. |
| `56bd91c` / `afa7596` | Backyard desk, day/evening home, cloth albums and project stationery implemented/published. `CREATIVE_REVIEW.md` explicitly admits underwater scene compositions largely inherited. |
| `1025c68` / `beaea40` | First real photographic album, Black Tie, Barefoot, implemented/published. |
| `0c6e2ea` | Reusable photographic layout/import workflow. |
| `7c9d6c7` through `b451e1c` | Remaining real album imports. |
| `30e838a` | Current verified main: final Umpire import published; eight albums, 94 photographs. |

Read actual Git diffs and briefs to substantiate more detailed claims. Commit messages alone do not prove a feature was creatively successful, live, or owner-approved. Existing older review documents describe their dates, not the current state; their old “photos/phone missing” statements have been superseded.

## Current content: preserve exactly

| Exact title | Photographs | Route |
| --- | ---: | --- |
| a Minor Key | 9 | `#work/a-minor-key` |
| Black Tie, Barefoot | 13 | `#work/black-tie-barefoot` |
| Dallas, With Feeling | 15 | `#work/dallas-with-feeling` |
| Lower Form of Leisure | 13 | `#work/lower-form-of-leisure` |
| Mr. Bears, Residence | 4 | `#work/mr-bears-residence` |
| Strictly Striped Affair | 14 | `#work/strictly-striped-affair` |
| The Sun Stayed for Supper | 15 | `#work/the-sun-stayed-for-supper` |
| Umpire Strikes Back | 11 | `#work/umpire-strikes-back` |

Authoritative catalog: `public/content/projects.json`. Photos: `public/assets/projects/`. All 94 decode, and both catalog and photo assets are byte-unchanged by this recovery draft. Some records retain draft/approved:false metadata; do not silently turn that into verified builder attribution or add unsupplied facts.

## Recovery direction and local draft

**One continuous Collins backyard, discovered at two scales.** Keep the existing vessel, launch sequence, native scrolling, real photography, backyard service study and familiar contact path. Build distinct places around the same vessel. Surfacing should reveal the architecture/props already glimpsed below, and the same physical tone should carry into albums and hiring.

### Draft source changes (not yet visually accepted)

- `public/index.html`: launch “A whole backyard. A smaller point of view”; explicit business/geography; five chapter plaques; found-property note; periscope view; home “Back on the coping”; same vessel docked at home; poolside manifest; “The real backyards” archive; project note and truthful manual Messages actions.
- `public/recovery.css` **new**: scene backgrounds/positioning, tactile plaques, distinct underwater bays, periscope, shared poolside/service/album/contact styling, phone layout and reduced-motion overrides. This is a large override layer and needs real visual review; source parsing is not acceptance.
- `public/recovery.js` **new**: route-aware Explore/Poolside header, global day/evening continuity, narrative discoveries instead of collectible count, clipboard fallback and honest Messages status.
- `public/assets/pool-survey-panorama.webp` **new illustrative artwork**, 2172×724: continuous miniature underwater set with limestone step cavity, brass pool-light alcove and coral conduit, far skimmer/ladder, sage fence and pink awning above. Generated using the existing pool-day and vessel art as visual references; no real project photos used as invented project evidence. No vessel in panorama because the existing animated vessel sits over it. Optimized WebP quality88; original generated PNG is unnecessary for runtime.
- `public/expedition.js`: new chapter labels, clear pending transition timer on routing, periscope toggle, SMS note encoding, confirmed call/text configuration.
- `public/launch.js`: preserve cockpit/descent/scale reveal and skip; modestly shorten timing (~5.2 seconds for complete sequence). Verify the reveal remains legible.
- `public/world.js`: remove four-item collectible counter handlers; preserve services and brief carryover.
- `public/catalog.js`: real cover-photo windows inside existing cloth album covers.
- `public/photography.js`: poolside archive language, adjacent-album navigation and return to miniature world.
- `public/site-config.js`: confirmed +14695007713 / 469-500-7713.

Draft chapter names: **Below the Steps → The Lost Property Office → The Light Alcove → At the Far Skimmer → The Next Chapter.** Labels still need alignment: the five stop buttons' `aria-label`s and initial hidden discovery status in index.html retain old names. Fix before release.

### What is actually verified in this draft

- All `public/*.js` pass `node --check`.
- Static preview build `node scripts/prepare-static.mjs` succeeded.
- Catalog: eight albums / 94 photos; all photo files decode; catalog and real-photo tree unchanged from main.
- New panorama decodes at 2172×724.
- Preview entrance AX showed correct new launch/header text. A Step aboard click was attempted at the context boundary; the returned tool output was truncated. **Do not count that as completed journey verification.**

### What is NOT verified / next work

1. Inspect draft desktop and 390×844 phone views. Verify each scene, panorama crop, plaque, vessel/prop overlap, long text, evening palette and periscope. There are no accepted new-scene screenshots yet.
2. Fix labels above, then test native wheel/touch/keyboard chapter navigation, previous/next, route history, boarding skip/replay and quick navigation during surface transition. Verify pending transition cancellation works.
3. Test global light from pool fixture, pool evening switch and home switch. Verify consistent state after routing. Consider a live announcement for global lighting.
4. Review the same-world surfacing/home dock and services at desktop/phone/landscape; make sure nothing is decorative clutter or repeated filler.
5. Open all eight albums, verify new photo windows, full viewer/Escape/focus, prev/next and return-to-dive. Preserve count/titles/ordering/94 asset bytes.
6. Fill a test project note using reserved example data. Verify review, encoded sms destination/body, edit invalidation, copy success/failure and download. **Do not send a test text/call or report delivery.** Native Messages requires visitor review and Send; browser cannot prove reception. No automatic inquiry endpoint is connected.
7. Run Wrangler dry-run and asset/ID/reference checks. Update current version marker and README accurately. `public/version.json` is stale from an earlier album; not evidence of current code.
8. SEO remains pending: noindex in HTML/headers. Do not remove it or invent a canonical custom domain blindly. Verify domain/readiness; there is no confirmed custom-domain/DNS connection here. Phone can work without an email backend, but native SMS is not equivalent to automated lead delivery.
9. Commit/publish only after review. Use existing main → Cloudflare pipeline; check the main-commit Workers Build and then actual production root, not just a preview or #work route. Do not roll back photo imports to recover an old scene.

The owner paused specifically to transfer. A checkpoint branch is a preservation action, not authorization to skip this review gate.

## Development, restore and publishing

Buildless HTML/CSS/JS, no framework migration needed. Runtime is `public/`; `wrangler.json` points there. `npm ci --ignore-scripts`; `npm run build:site` copies public into dist for preview. `npm run check:deploy` runs Wrangler dry-run. Cloudflare deploy command is `npx wrangler deploy`, existing GitHub integration. Preserve Worker name/config.

The active prior workspace was `/workspace/scratch/14a6e04518f1/collins-lower-form`, branch `design/continuous-collins-world`. Paths and local browser handles are ephemeral: restore from the checkpoint branch or supplied package in a new session. Preview was http://terminal.local:4173/ . `.openai/hosting.json`, dist and node_modules are local-only, not publishing source.

Routes: root / `#launch` boarding; `#pool` submerged; `#home` poolside site; `#build` services; `#work` shelf; `#work/<slug>` album; `#about` company; `#project` note/contact; `#studio` local browser album editor. Studio uses IndexedDB/export/import; remote authenticated publishing stays disabled. Local saving is not a production update.

Historical original docs are supplied alongside the source in the transfer package. Read `EXECUTION_BRIEF.md`, `DESIGN_PLAN.md`, `MIGRATION_QA.md`, `CREATIVE_REVIEW.md`, album reviews and this handoff. When sources conflict, distinguish their date and explicit owner evidence. Do not treat assistant-written docs as proof of approval.

Browser lessons: direct offscreen locator clicks in transformed scene/iframe layouts can miss after scrolling; use screenshot-grounded pointer positions or Enter on a focused control, and wait for visible state to settle. An immediate stale AX tree after smooth scrolling is not proof of broken routing. Never mutate app internals in browser evaluation to make a test pass. Phone-sized frames are responsive checks, not physical-device testing.

## Recovery priorities and acceptance

| Order | Focus | Acceptance |
| --- | --- | --- |
| 1 | Entrance and boarding | Clear Collins business identity, same vessel, waterline and memorable tiny-scale reveal; skip always available. |
| 2 | Distinct underwater places | Each chapter has its own composition/discovery; no five versions of the same empty tile wall. Controls reveal meaningful changes. |
| 3 | Same backyard at surface | Shared architecture, light, vessel and small stories connect landing, services and photography. |
| 4 | Real projects and hiring | Exact eight/94, authentic photos; clear services/area; call/text/note path truthful and comfortable. |
| 5 | Finish and release | Desktop/phone/keyboard/motion checks, no broken routes or overlap, deployment success and live verification. |

Take a position and improve the current work. Do not restart everything, substitute generic nautical decoration, mistake deployment for creative success, or stop at another audit. Preserve a direct hiring path throughout. Spend effort on the few moments people will remember.
