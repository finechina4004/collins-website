# Collins Custom Pools & Backyards

Italian villa and vineyard artwork, real project albums, and direct homeowner contact. Canonical repository: `finechina4004/collins-website`. Existing Cloudflare Worker: `collins-website`.

## Current experience

The illustrated homepage is the front door. Services (`#build`), all projects (`#work`), four feature collections (`#experience/pools`, `/fire`, `/kitchen`, `/shade`), albums (`#work/<slug>`), company/area information (`#about`), and contact (`#project`) are directly reachable. The submarine is only a draggable, keyboard-movable homepage toy. There are no boarding screens, dive sequence, slides or separate submarine journey. Old `#launch`, `#pool` and `#home` links recover to the homepage.

Preserve the master artwork, outlined original brand lettering, eight real albums and 94 original project photos. Do not replace the photos with illustrations or invent project locations, dates or construction claims. Prioritize new custom pools and complete backyards; no landscaping service.

## Contact is visitor-sent

Confirmed call/text number: **469-500-7713**, configured in `public/site-config.js`. The project-note form prepares a reviewable SMS, with copy/download fallbacks. It does not submit an inquiry, store a lead on a server, or confirm delivery. The visitor must open Messages, review, and press Send. Drafts stay in the current browser tab. No paid tools, CRM or automation are required.

## Build and publish

HTML, CSS, JavaScript and assets live in `public/`. Run `npm ci --ignore-scripts` when dependencies are missing. Run `npm run build:assets` after CSS edits; it combines the exact ordered sources in `scripts/style-sources.json` into `public/site.css` and fingerprints its HTML link. Commit both the source changes and generated bundle. `npm run check:deploy` validates the bundle and performs a Wrangler dry run. `npm run deploy` rebuilds styles before Wrangler deployment; `npm run build:site` rebuilds and copies the static site to `dist/`.

Production continues through the existing GitHub main → Cloudflare integration, which deploys the committed `public/` directory with `npx wrangler deploy`. No new hosting registration is needed. Verify both the Cloudflare build and the live `version.json` marker after a merge.

## Owner drafts

`#studio` is an existing local album utility, deliberately absent from customer navigation. It uses IndexedDB only when opened. Save/export affects local drafts, not the live website. Authenticated online album publishing is not connected; do not treat it as a launch dependency or describe local saving as publishing.

## Handoff

`docs/LAUNCH_AUDIT_2026-11-05.md` records this simplification and verification limits. Earlier creative reviews and submarine journey documents are historical and are superseded by the current homepage-only toy decision. Keep the eight production albums when rolling back; do not restore the old holding page.
