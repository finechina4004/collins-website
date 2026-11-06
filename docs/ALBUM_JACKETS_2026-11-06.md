# Collins album jackets — November 6, 2026

Chase requested more creativity and individual character for each named album. The eight covers now form a series of photographic book jackets: a printed binding edge, a two-part title using Canyon Rim and existing serif italics, a cream-mounted full aerial photograph, and a small printed signature derived from the name. Ordinary album links and the existing full-size viewer remain.

| Album | Jacket direction |
| --- | --- |
| a Minor Key | Lilac/plum, piano keys, quiet record-sleeve typography |
| Black Tie, Barefoot | Charcoal/ivory, formal rule and a small bow tie |
| Dallas, With Feeling | Blush/oxblood, a small city silhouette and warm edge stripes |
| Lower Form of Leisure | Sage/olive, stepped architectural rules and a deeper mount |
| Mr. Bears, Residence | Honey/tobacco, linen-like binding and an arched doorway mark |
| Strictly Striped Affair | Aqua/slate, striped binding and print mark |
| The Sun Stayed for Supper | Butter/apricot, warm spine and a setting-sun mark |
| Umpire Strikes Back | Scorecard cream, field green, red-clay grid/rule |

The existing full aerial cover choices, original photographs, all album titles, brand fonts and call/text details remain. No new raster imagery, services, marketing claims or dependencies. All decorations are CSS and hidden from assistive technology. The same signature and matching paper tint carry into each album heading.

Sources: `public/album-covers.css`; `scripts/render-landing.mjs`; ordered bundling in `scripts/style-sources.json`. These values are keyed to album slugs, not position.

Validation: actual browser reviewed all eight jacket designs; all titles fit nominal 320px, 390px and 768px browser frames without horizontal overflow. Desktop visited every album with counts 9/13/15/13/4/14/15/11. Viewer Next, Escape and opener focus return passed. All 10 generated HTML files have unique IDs and valid local asset/link targets; 94 photo entries remain. All eight small-text color pairs exceed 4.5:1 contrast. Generated output, whitespace and Wrangler dry-run packaging passed. Physical phones, Safari, message delivery and measured Core Web Vitals are not newly claimed.

Release marker: `collins-album-jackets-01`. Use the existing GitHub main → Cloudflare Worker publishing integration and verify the live marker / jacket designs after publication.
