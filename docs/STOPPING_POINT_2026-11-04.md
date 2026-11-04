# Start here — Collins workspace transfer, November 4, 2026

This is the newest stopping point. It supersedes older descriptions of missing photos/phone, instructions to restore d9becda, and the previous missing-reference pause. The owner asked to stop because workspace usage was low and continue elsewhere. Freeze implementation here; this is a preservation checkpoint, not a release.

## Restore the right work

- Repository: https://github.com/finechina4004/collins-website
- Working branch: `design/living-backyard-cutaway` (use its newest transfer checkpoint, not main).
- Draft review: https://github.com/finechina4004/collins-website/pull/14
- Existing production: https://collins-website.chasehess-hq.workers.dev/
- Main was verified at `44a759fadb5ac6253a19c6cdd012ea4450d7e135`. The implemented homepage review was `ef45aa9f8da14c1e84a8f6e8f39f3a992941b261`. This transfer commit adds five new artwork assets and handoff documentation on top of that review.
- Nothing from this review branch has been merged or deployed. Existing main → Cloudflare is the publishing route. Do not create another Site or hosting destination. Do not silently roll back to an old checkpoint.

Read this file, `docs/VISUAL_STANDARD.md`, `docs/living-backyard/REVIEW.md`, `docs/pool-illustration/ASSET_NOTES.md`, and `README.md` before editing. Other historical handoffs explain their dates, not this current state.

## What the owner wants

The home screen is art. The art moves. The art is the navigation.

The chosen illustration language is a vintage storybook architectural cutaway, painted like a miniature theatrical set: front-facing dollhouse compositions, rooms and terraces at different levels, painterly gouache surfaces, subtle paper grain, weathered materials, softly shaded forms, believable simplified architecture, small distinctive people doing ordinary things with restrained expressions and dry humor. Cream, terracotta, muted green, mustard and deep turquoise. Carefully drawn tiles, reflections, brick, timber, fabric, metal and little mechanisms. The submarine must belong to this same illustrated production.

This is a drawing standard, not merely a palette or mood. The owner repeatedly rejected photorealistic miniature renders, generic glossy 3D, flat vector graphics, arbitrary clutter and weak approximations. Do not revert to those. The scenery can be invented; North Texas is the service area, not a restriction on architecture or imagination. No copied film characters/sets.

The owner chose the cream two-story poolhouse scene with left brick fireplace, right striped pergola/kitchen, dog and cutaway pool as the favorite starting point. Runtime art `collins-illustrated-backyard.webp` is its working refinement. The main interactive reference is https://wesandersoncollection.abrams.link/ ; both its original illustrated landscape and hotel transition were actually inspected. Supporting https://www.youtube.com/watch?v=Tw-B3O_F4AI could not be retrieved; do not claim to have watched it.

Latest continuation exchange: assistant proposed one complete journey — homepage artwork → illustrated dive → real pool album → back home — and the owner said **“Go.”** Work then began on matching art assets. The owner subsequently paused specifically for this transfer. Resume that authorized pool pass; do not spend the next session rewriting the brief or producing only another plan. A second image mentioned in earlier wording did not arrive here; do not claim a two-attachment acceptance comparison, but do not use that older caveat to stall the now-authorized implementation.

## Implemented and previously verified

At ef45aa9, root / `#backyard` shows a clickable illustrated home scene. Objects enter fire, kitchen, shade, the full album shelf or existing submarine boarding. Water/fire/bubble loops are independent of navigation, with motion-off and inactive/hidden-tab pausing. Phone view has a horizontally explorable panorama, visible pan controls and direct navigation equivalents.

`#experience/pools`, `#experience/fire`, `#experience/kitchen` and `#experience/shade` show selected REAL photographs and link to COMPLETE existing albums. These are functional photo collections, not finished illustrated close-up worlds. Root navigation, real-photo collections, feature return links and contextual album links are wired.

Existing `#launch` boarding → `#pool` native-scroll expedition works, including a dog arrival, dropped-phone story, evening/periscope, replay and still scenes. **It still uses older, more physical miniature art.** That visual discontinuity is the next task. At the time of transfer no runtime source has been changed since ef45aa9; the new art below is NOT wired into it.

Prior browser checks: desktop and 390×844 responsive frame; object entrances; phone panning/keyboard entry; manual motion off; complete boarding/descent; pool-photo shortcut; browser Back from album to feature collection; viewer next/Escape/focus; all eight album routes with correct counts; direct contact destinations; a dist-only missing-home-art fixture. Source parse, unique IDs, local references, 94 photo decodes/byte integrity, whitespace and Wrangler dry-run passed at the implemented review. Captures: `docs/living-backyard/homepage-desktop.jpg` and `homepage-phone.jpg`.

Do not describe responsive frames as physical-device tests. OS reduced-motion emulation, screen-reader audit, performance benchmarks and a full network-failure audit were not performed. Exact production commit was not independently established; main SHA and the actually viewed live entrance are separate evidence.

## Five NEW assets — generated, saved, NOT integrated

All are in `public/assets/` and included in this checkpoint:

| Asset | Dimensions | Role |
| --- | --- | --- |
| `backyard-day-illustrated.webp` | 1672×941 | Same homepage composition with baked submarine removed, so one separate vessel can move. |
| `backyard-evening-illustrated.webp` | 1672×941 | Matching painted blue-hour plate; warm windows, fire, lamps and water reflections. |
| `pool-panorama-illustrated.webp` | 2172×724 | Same illustrated pool viewed closer: solid tiled steps left, open teal water, flush light and ladder right, same yard above. |
| `dog-illustrated.webp` | 1774×887 RGBA | White/brown dog matching the homepage, leaping right; true transparency. |
| `vessel-illustrated.webp` | 1536×1024 RGBA | Mustard/cream/coral vessel matching the homepage illustration, with front observation window and 01. |

These were visually inspected and decoded. The vessel was checked composited on cream: its transparent silhouette is clean. Some image previews show dark/colored RGB outside the silhouette even where alpha is zero; do not mistake that for a baked background. New assets were exported at WebP quality 88 with alpha retained. SHA-256, exact sizes and provenance are in `docs/pool-illustration/ASSET_MANIFEST.json` and notes alongside it.

**No browser test of these new art assets inside the website has occurred.** Asset presence is not implementation. No new CSS or journey integration was written before the owner paused.

## Next finishable pass

1. Inspect the current rendered homepage and these five assets together. Keep the owner's preferred composition; refine discrepancies deliberately rather than starting over.
2. Layer the clean day/evening home plates with ONE separate illustrated vessel. Keep established Collins branding/hull nameplate. A subtle vessel drift can be independent of navigation. Preserve existing motion-off and hidden-scene pausing.
3. Replace old physical imagery throughout this ONE pool journey: launch backdrop/vessel, cockpit's view, underwater scenes, dog layers, periscope, evening view and surface return. Use the new pool panorama without stretching its 3:1 proportions. Keep credible solid steps; no underwater shelves/brackets/caves. The earlier owner disliked implausible pool construction.
4. Connect shared afternoon/evening state across home, launch, dive and return. New illustrated evening plate is ready. Do not let recovery.js switch new views back to old `pool-day.webp` / `pool-night.webp` assets.
5. Keep the dog and phone stories independent, once-per-entry/replay behavior, timer cancellation, native scroll, keyboard/touch and still mode. Match the painted props/water treatment. Avoid a giant photorealistic dog or glossy phone breaking the art.
6. Bring real work close: a first-chapter photo/observation invitation may open a complete real pool album; keep the direct pool-photo shortcut. From photo collections and albums, provide clear return to submarine AND main artwork. Final pool chapter should lead to real pools or the illustrated backyard, rather than forcing the older detached editorial home.
7. Verify the full chain: artwork → boarding/descent → each story/lighting/periscope → real pool collection → full album/viewer → Back/submarine/artwork. Inspect desktop, 390×844 portrait and short landscape; check crop, overlap, focus, history, scrolling, asset fallbacks and reduced/still motion. Only claim checks actually performed.
8. Update PR #14 and the current review evidence after the coherent pass. Keep production unchanged until the work is reviewable and release is authorized. Then extend fire/kitchen/shade with equal craft; do not scatter new unfinished illustrated interiors before this pool journey is complete.

## Files to work in

- `public/index.html`: route bootstrap, home composition, launch/cockpit, five pool scenes, shortcut, albums/services/contact.
- `public/backyard.css` / `backyard.js`: illustrated home, object entrances, phone panorama, feature photo collections, category return handling.
- `public/launch.js` / `launch.css`: boarding, cockpit, waterline/reveal, skip and cancellation. New vessel keeps 1536×1024 dimensions; align final reveal to the actual guide pose to avoid a jump.
- `public/expedition.js`: native document-scroll camera, chapter poses/state, routing/history, motion mode, return/skip, direct inquiry flow. Do not add wheel capture or cursor steering.
- `public/stories.js` / `stories.css`: dog/phone story timing, two dog layers, water effects and responsive layouts.
- `public/recovery.js` / `recovery.css`: shared lighting and older scene overrides; its image URLs currently restore old art. Inspect this cascade carefully.
- `public/photography.js`, `catalog.js`, `content/projects.json`: full photographic albums and viewer. Preserve catalog/photographs exactly.

## Real content and business facts

Eight exact albums / 94 real photographs: a Minor Key (9); Black Tie, Barefoot (13); Dallas, With Feeling (15); Lower Form of Leisure (13); Mr. Bears, Residence (4); Strictly Striped Affair (14); The Sun Stayed for Supper (15); Umpire Strikes Back (11).

Family-owned Collins Custom Pools & Backyards serves Denton County and surrounding North Texas communities. Priorities: new custom pools and complete backyards. Also spas, pool remodels, patios, outdoor kitchens, pergolas/shade structures, turf and fire features. NO landscaping. Do not invent project locations, scope, attribution, testimonials, credentials or prices. Keep illustration clearly separate from real project photography.

Confirmed public phone: 469-500-7713 / +14695007713. Existing call/text links and prepared Messages note are manual: visitors review and send in their own app. No automatic inquiry receiver/email backend is connected; never claim delivery. Album studio is browser-local IndexedDB/export/import, not remote publishing. Existing noindex remains; custom-domain readiness and font licensing paperwork remain unconfirmed.

## Run and preserve

Buildless HTML/CSS/JS in `public/`; existing `wrangler.json` serves that directory. If dependencies are absent: `npm ci --ignore-scripts`. Parse runtime JS; `npm run build:site`; `npm run check:deploy` is a packaging dry-run, not deployment.

Managed preview: `sites-preview start <checkout>` and use its returned URL. The previous URL `http://terminal.local:4173/` was local and does not transfer. The build script deletes/recreates dist; stop/restart managed preview after a build if it serves an empty directory. Do not change working app code to repair that preview issue. Test frames/fixtures must stay dist-only.

The terminal could read public GitHub but `git push` had no credentials. The connected GitHub tools successfully wrote the source: create blobs → tree based on existing tree → commit with previous branch head as parent → update ONLY the review branch with expected SHA. No token should be requested or printed. Do not interpret terminal push failure as lack of repository access. Never force-update main.
