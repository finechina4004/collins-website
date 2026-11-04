# Collins Custom Pools & Backyards

The Collins pool expedition and homeowner website. Canonical repository: finechina4004/collins-website. Existing Cloudflare Worker: collins-website.

## Development and deployment

Buildless HTML, CSS and JavaScript live in public/. Cloudflare serves that directory using wrangler.json. The GitHub integration deploys main with npx wrangler deploy; the build command remains empty. Run npm ci --ignore-scripts and npm run check:deploy for a local packaging check. npm run build:site copies public/ into dist/ for local preview.

The submarine guides visitors between five native-scroll chapters. The main website continues the world with a day/evening miniature, an interactive backyard study (Swim, Cook, Shade, Stay), cloth-style project albums, and a project-note form. Choices from the study carry into the locally prepared brief. The entrance can be skipped. Direct links include #home, #work, #work/a-minor-key, #build, #project and #studio.

## Current content and editing

Eight named project records are in public/content/projects.json. All eight photographic collections are open: a Minor Key (9), Black Tie, Barefoot (13), Dallas, With Feeling (15), Lower Form of Leisure (13), Mr. Bears, Residence (4), Strictly Striped Affair (14), The Sun Stayed for Supper (15), and Umpire Strikes Back (11). The catalog now contains 94 photographs. Location, dates, construction scope and builder attribution remain omitted where not supplied. Confirmed phone: 469-500-7713, configured in public/site-config.js. Call/text links and visitor-reviewed Messages notes are available; no automatic receiver or authenticated online album publishing is connected.

The album studio at #studio saves drafts and images in this browser using IndexedDB, with JSON export/import and local preview. Cloudflare album publishing is disabled: no admin API or durable media storage has been connected. Do not describe local saving as a website update. The inquiry form prepares a reviewable note, encodes it for native Messages, and offers copy/download fallbacks. The visitor must review and press Send in their messaging app; website code cannot confirm delivery.

Original illustrative assets are separate from completed-project photography. Outlined brand graphics were recovered from the supplied checkpoint; font-license paperwork still needs confirmation. noindex remains enabled while content is being prepared.

## Continuity

Recovered checkpoint d9becda38117af01be1e5028499ef14543f8c576, branch design/collins-cloudflare-review. The portable backup retains the original Git bundle and detailed private handoff. Only runtime website assets, build configuration and relevant documentation belong in the publishing repository. The legacy ChatGPT Site identity is excluded.

See docs/RECOVERY_REVIEW.md for current verification and limits. Older QA reports are historical. For rollback, revert this recovery PR while retaining all eight production albums; do not restore the old holding page. Cloudflare also retains deployment versions.


## Creative review

The November 3 refinement and its before/after captures are documented in docs/CREATIVE_REVIEW.md. The GitHub/Cloudflare publishing integration remains the deployment route.

Black Tie, Barefoot implementation and verification: docs/black-tie-barefoot/REVIEW.md. Photographs retain their original dimensions; no generated imagery or retouching was applied.

## Continuous-world recovery

Recovered from design/continuous-collins-world-handoff at 4ce724b. Five distinct scenes use the continuous illustrative panorama, retained physical vessel, native scroll and still-scene controls. Poolside, periscope and boarding share day/evening state. Real photographs remain separate and byte-unchanged. The logo returns to boarding; each album offers an explicit return to exploration. Version marker: collins-continuous-world-recovery-01. Public workers.dev hosting remains noindex until domain/search readiness is confirmed.

## Underwater stories

The miniature journey includes a dog/tennis-ball arrival and a dropped-phone/search-party moment. Events begin after the chapter docks, play once, and have replay and still-scene alternatives. The phone lands on the floor; the dog shares the surface’s water/lighting treatment. See docs/POOL_STORIES.md for the asset provenance, geometry and current review record. Build marker: collins-pool-stories-02.

## Illustrated homepage review

The current review branch adds `#backyard` as the first illustrated scene, with pool/fire/kitchen/shade entrances, restrained independent motion and direct routes to authentic photographs. The existing boarding and underwater journey remain. See [the locked illustration standard](docs/VISUAL_STANDARD.md) and [review evidence and limits](docs/living-backyard/REVIEW.md) before expanding the artwork or releasing this draft. Exact art acceptance awaits the second intended reference image; the retained underwater art still needs a later illustration pass.
