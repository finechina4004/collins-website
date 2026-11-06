# Customer journey polish — November 6, 2026

Published from public-domain baseline af5326c. Release marker: collins-customer-polish-01.

- Added a visible custom pools / complete backyards message under the original wordmark.
- Changed action navigation to readable 16px sans-serif (14px on phones), preserving purchased fonts in artwork, headings and album jackets.
- Supplied originals checked for a Minor Key and Black Tie, Barefoot: the 720px sources are genuinely 720px. No invented detail or artificial enlargement. Album mats respect catalog width, and full-screen viewers scale down without enlarging pixels. All 94 photo files remain unchanged.
- Added Copy number, selectable phone text, an accessible success message, and a manual-copy fallback when clipboard access is unavailable. Kept the verified call/text number. No email address is verified in site configuration; none was invented or published.

Browser QA: desktop home and 720px enlarged photograph inspected. Responsive Chrome layout frames at nominal 320x740, 390x844 and 844x390 fit without horizontal overflow (content widths 305, 375 and 829). Phone contact and manual clipboard fallback verified. All eight albums traversed at 375px content width, with expected 9/13/15/13/4/14/15/11 photo counts and no horizontal overflow. Phone viewer Next and Close checked. These are browser layout frames, not physical devices or Safari/touch emulation. Final HTTPS clipboard success is checked on production after deployment. No call or text sent.

Source checks: all 94 image files decode and match catalog dimensions; all ten generated HTML pages have unique IDs and valid local targets. Runtime JS syntax, generated-output freshness, whitespace and Wrangler deployment dry run pass. Temporary QA frames and preview configuration removed before publication. No DNS, redirect or email record changes.
