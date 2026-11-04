# Painted services desk and project notes

November 4, 2026. Continues `c46b15f822e5ee14386cc37c7eeb50ef408ba80a` on `design/living-backyard-cutaway`, draft PR #14. Main and the existing Cloudflare production site remain unchanged.

## What changed

- The services desk now uses the same original day/evening backyard plates as the homepage and feature entrances. The prior flat study is no longer used in that view. Pool, kitchen, pergola and fireplace controls align with the painting; the named Swim/Cook/Shade/Stay controls remain accessible without the image.
- Each selection leads directly to its real-photo collection or adds the idea to the existing project-note flow. The selected desk interest survives refresh in this tab. Adding a service avoids duplicate phrases and preserves a full-length existing note.
- The project note explains its three steps: write, review, then open in Messages. Phone and text links remain direct options. Valid preparation focuses the review below the sticky header; nothing is submitted automatically.
- A versioned browser session draft retains the existing name, phone, town, interest and idea fields in this tab. Clear this note offers Undo clear. Clearing also removes the prepared message link/review and resets stale validation. Editing invalidates an outdated prepared review.
- If browser storage is unavailable, the form stays usable and accurately says the draft remains on this page. No server receiver, email collection, analytics submission or remote draft storage was added.
- Service and album-shelf/review scroll offsets account for the sticky header without applying its height twice. Illustration descriptions no longer describe the older fence/set.

## Verification performed

Desktop Chrome; responsive browser frames at 390×844 portrait and 844×390 landscape. These are not physical-device tests.

- Kitchen object selection → real Kitchen collection → browser Back → matching project note. Shade selected with Enter in the portrait frame; its real-example route and 44×44px painting controls were verified. The two right-side controls do not overlap at the tested portrait size. No horizontal document overflow.
- Short phone number produced a custom validation failure. A valid fictional test note prepared a review with focus and a correctly encoded `sms:+14695007713?body=…` destination. The Messages link was not opened; no call or text was sent.
- Changing the idea hid the stale review. Refresh restored the draft and kept the review closed. Clear removed draft fields and the old message URI; Undo restored the draft. Phone validation did not remain stale after reset.
- A 3,000-character idea was kept intact through a service-selection request and refresh. This checks that adding a suggested service cannot cause a full existing note to disappear on restore.
- Portrait preparation, review focus, clear/undo and the Messages destination worked. Review began at approximately 146px below the viewport top with a 118px header. Landscape contact fields fit, the prepare control exceeds 44px, and there is no horizontal overflow. Fictional QA drafts were cleared afterward.
- A dist-only storage fixture threw on all draft-storage operations. The form still prepared its review and stated that the draft stayed on the current page. A separate dist-only missing-drawing fixture hid unavailable picture controls; the named Cook choice still opened the two real Kitchen albums.
- All runtime JS parses; HTML IDs are unique and local references resolve. All 94 original photographs decode and match checkpoint bytes; projects.json is byte-unchanged. Git whitespace and Wrangler packaging dry-run pass. Static build prepares dist/ from public/. QA fixtures are excluded from public/ and Git.

## Captures

- [Services desk, desktop](services-desktop.jpg)
- [Project-note introduction, portrait frame](project-phone.jpg)

## Review boundary

Branding, public contact number, factual services, all albums/photographs, noindex and the existing GitHub/Cloudflare route are retained. No landscaping or invented project claims. The website cannot confirm whether a visitor sent a message from their own app. No physical-device, OS reduced-motion emulation, screen-reader audit or performance benchmark is claimed. Review/release authorization is still required before production changes.
