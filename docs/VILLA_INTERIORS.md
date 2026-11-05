# Inside the Collins villa — November 4, 2026

The owner asked for a stronger interior experience after approving the outside and printed home title. This pass changes the actual inner-page structure and behavior, keeping the established illustration, wordmarks, original project photos and factual business details.

## What changed

- Every photographic album now opens as an interactive folio: a large uncropped photo, previous/next controls, a thumbnail index, original chapter shortcuts, keyboard arrows, current photo count, and the existing full-screen viewer. An expandable complete contact sheet keeps every photo accessible. The current position is retained when returning through the app's album shelf. A direct Resume the submarine link preserves that journey.
- The project shelf uses mounted book covers, numbered folios and sage/terracotta bindings. Titles and counts come from the existing catalog.
- Services use real selected project photographs instead of repeating the exterior drawing. Pools, Kitchens, Shade and Fire each show a credited example, existing service copy and links to the corresponding collection or project note. Request sequencing prevents stale async selections. The initial image is also a real photo; catalog failure leaves ordinary links usable.
- All four feature collections open with a corresponding crop of the exact original illustration, labelled as illustrative, alongside a concise introduction and two useful actions. Real project photographs follow, with a lead project treatment where a larger collection supports it.
- Contact is a correspondence sheet beside an arched view of the villa office. Phones have a Write a note shortcut that focuses and scrolls directly to the form. Percentage row gaps causing About to spill into Contact were replaced with fixed phone gaps. Form review/SMS behavior is unchanged; nothing is sent on submission.

No new raster art was generated, no project photo or catalog data was changed, and no new business claims or landscaping services were added. `interiors.css` is the final inner-page presentation layer. Homepage scene/title styles and geometry are unchanged.

## Verification

All eight albums loaded through browser navigation with matching photo counts (9/13/15/13/4/14/15/11) and no desktop horizontal overflow. Catalog validation retained all 94 photographs and verified every cover/chapter photo ID. Album previous/next, endpoint disabled states, thumbnail selection, original chapter order, keyboard arrows, full-screen open/next/close, complete index expansion, in-app position restoration, and Resume the submarine were exercised. Each of four service selectors loaded the correct credited real photo. All four feature rooms loaded with expected counts (5 fire, 2 kitchen, 3 shade, 8 pool albums).

390px browser frames covered album, feature collection and contact. Checked local thumbnail scroll tracking, chapter keyboard activation, direct project-photo jump, contact note prepare/review/clear, and the phone Write a note shortcut. No phone-frame horizontal overflow on tested routes. No call or SMS was sent. Browser frames are layout checks, not physical devices. No screen-reader or measured performance claim.

JavaScript syntax, whitespace check and Wrangler deployment dry-run completed before publication. Temporary browser-review HTML was removed. Existing generated gallery-wall and original backyard image are reused; only site source and this handoff belong in the commit.
