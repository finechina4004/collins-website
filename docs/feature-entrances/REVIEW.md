# Illustrated collection entrances — continuation

November 4, 2026. Continues saved review commit `b5a620f077296fdf26c373e1bde7953560c3ad21` on `design/living-backyard-cutaway`, draft PR #14. Existing GitHub/Cloudflare setup retained. No main or production update.

## What changed

- Pool, Fire, Kitchen and Shade now open beside a closer view of the same painted backyard, rather than jumping immediately to a large photograph list. These are deliberate crops of the supplied original illustrations, not new commissioned interior scenes or construction evidence.
- The pool entrance carries its illustrated guide, with a direct submarine-resume link. Home's day/evening selection carries into the backyard close views; the pool painting and vessel receive the corresponding evening grade.
- Each entrance has a direct button to its real photographs and a simple four-corner navigation. The pool shelf presents eight albums for comparison; Fire retains five relevant albums, Kitchen two and Shade three.
- Photograph mounts show the complete supplied image using contain sizing. Original files and the full albums are unchanged. Album titles, captions and counts remain factual and drawn from the existing catalog.
- Returning to a collection restores the selected album link, keyboard focus and prior collection scroll position. A jump to photographs focuses the shelf heading below the sticky header.
- Feature-specific project-note links select the matching existing inquiry category and prefill an empty idea field. Existing visitor writing is preserved. They do not submit a message or open a receiver; the normal visitor-reviewed Messages flow remains.
- The homepage object entrance now moves the whole composition together, including the separate painted vessel. In still/reduced-motion modes, it remains immediate. Feature vessel/fire loops pause when inactive or hidden.
- An unavailable feature illustration shows a readable message while the real albums and route controls remain usable.

## Verification performed

Desktop Chrome; 390×844 portrait and 844×390 landscape browser frames, not physical devices.

- All four collection routes: 8/5/2/3 album links, matching corner navigation state and correct illustration source.
- Normal home fireplace entrance and shared evening plate; still-mode entrance and keyboard document navigation.
- Direct album-shelf jump; desktop Dallas, With Feeling → browser Back restored that selected card/focus/scroll; portrait Black Tie, Barefoot → collection restored that selected card/focus/scroll.
- Pool and Shade portrait compositions and the Shade landscape layout inspected. Landscape navigation targets measure 44px high, image loads, and document has no horizontal overflow. Portrait also has no horizontal document overflow; its album shelf and complete-album return work.
- Kitchen note link selected Outdoor living project and prepared the kitchen idea without opening/submitting the brief. A subsequent Kitchen request kept an already populated fire-feature note verbatim. No call, text or inquiry was sent.
- A dist-only fixture failed the pool-entrance plate. Its message appeared and the complete Mr. Bears, Residence album remained accessible with four contact-sheet photographs.
- All runtime JavaScript parses; all 94 photographs decode and match checkpoint bytes; catalog is byte-unchanged; Git whitespace and Wrangler packaging dry-run pass. Build prepares dist/ from public/. Test fixtures stay out of public/ and Git.

## Captures

- [Desktop fireplace entrance](fire-desktop.jpg)
- [Portrait shade entrance in the responsive frame](shade-phone.jpg)

## Boundaries

This pass develops the existing website; it does not replace its architecture, photographs, branding, business facts or contact details. No landscaping service was added. The source remains noindex. The earlier submarine journey remains in place. Physical-device, OS-level reduced-motion emulation, screen-reader and performance benchmarks are not claimed. Production awaits the owner's review and release authorization.
