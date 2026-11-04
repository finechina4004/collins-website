# Illustrated pool journey — ready for review

November 4, 2026. Repository `finechina4004/collins-website`; branch `design/living-backyard-cutaway`; draft PR #14. Restored the remote checkpoint `ef45aa9f8da14c1e84a8f6e8f39f3a992941b261`, then overlaid the supplied pack's public/ and docs/ directories. No restart, main update, production deployment, new Site identity or hosting destination.

## Complete route

`#backyard` → `#launch` → `#pool` → `#experience/pools` → `#work/<album>` → `#backyard`.

The illustrated pool chapter and a persistent shortcut open all eight real pool/backyard albums. Both the collection and every photographic album offer **Resume the submarine** and **Illustrated backyard** routes. The final expedition chapter leads to the real pool collection or the artwork. Native document scrolling and normal route history remain; the router manages scroll restoration to avoid conflicting browser restoration.

## What changed

- Clean day/evening plates replace the baked-vessel homepage. One separate gouache vessel drifts in its pool; the motion pauses when inactive, hidden or in still mode.
- The same painted yard, vessel and Collins hull nameplate carry through boarding, cockpit waterline, animated reveal, underwater guide and return. The reveal's final position is measured from the actual guide pose, including phone/short-landscape sizing.
- The 3:1 illustrated pool panorama uses cover/cropping at its natural proportions. Solid tiled steps replace the old physical underwater artwork; old lighting overrides cannot restore that artwork.
- The supplied painted dog replaces both air/wet layers. The retained ball/splash and dropped-phone stories have replay, timer cancellation and still-scene states. Phone styling is matte and restrained.
- Afternoon/evening state persists for the session and is shared by home, launch, cockpit, pool, periscope and surface return. The underwater panorama receives an evening grade; the matching evening plate appears above water.
- Mobile compositions place the vessel clear of steps, photo invitations and controls. The guide fades while the periscope is raised. The evening chapter uses its own light switch instead of a duplicate floating control.
- Real photograph bytes/catalog, Collins wordmark, navigation, services, contact number and manual Messages behavior are preserved. No landscaping service, invented construction claims, new inquiry backend, remote album publishing or font change.

## Browser verification performed

Desktop Chrome at approximately 1365×936; responsive iframe viewports 390×844 portrait and 844×390 short landscape. These are browser frame tests, not physical phones.

- Home → boarding/descent → first chapter completed in normal motion on desktop and portrait. Final desktop run also exercised the new nameplate/reveal wrapper. Boarding cancellation returned to home without a delayed route change.
- All five chapters, dog and phone states, manual still scenes, replay controls, lighting and periscope were inspected. Phone pan controls moved the homepage composition. Portrait and landscape control/crop overlaps found during review were corrected and revisited.
- Desktop collection → complete album → viewer next → Escape restored focus; browser Back returned to the collection. Album resume restored the selected chapter in an explicit chapter-3 round trip; session lighting stayed consistent. Portrait collection → Black Tie, Barefoot → illustrated home completed with evening state retained.
- All eight album routes rendered expected contact-sheet counts: 9, 13, 15, 13, 4, 14, 15, 11. Album return links were present on each.
- A dist-only fixture deliberately failed the homepage plate. A readable failure message and direct navigation remained; its album fallback opened the project shelf. This is a bounded missing-art test, not a full network-failure audit.
- Browser errors inspected during the real routes were extension metadata errors; no application exception was observed.

## Source/package checks

All 94 source photographs decode and match their checkpoint bytes; projects.json is byte-unchanged. All runtime JavaScript parses. HTML IDs are unique and local HTML references resolve. Git whitespace check and `npm run check:deploy` (Wrangler packaging dry-run) pass. `npm run build:site` prepares dist/ from public/; QA fixtures exist only in dist/ and are excluded from Git/Cloudflare's public/ assets.

## Captures

- [Desktop artwork, evening](home-desktop.jpg)
- [Desktop pool chapter](pool-desktop.jpg)
- [Portrait evening/periscope](phone-evening.jpg)

## Review boundary

Implementation is complete for this pool journey and ready for the owner's visual review. No final artistic acceptance or release approval is inferred. Production is not changed. No physical-device, OS-level reduced-motion emulation, screen-reader audit or measured performance benchmark is claimed. Manual still scenes and the existing prefers-reduced-motion code paths are preserved; OS emulation was unavailable in this browser interface. Fire/kitchen/shade remain functional real-photo collections, not newly illustrated close-up worlds.

The supplied STOPPING_POINT_2026-11-04.md records the earlier transfer; this review supersedes its statement that the five images are not integrated. Use this review and the actual branch source for current state.
