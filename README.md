# Collins Custom Pools & Backyards

The site presents Collins’ pool and backyard portfolio, services, family introduction, and call/text contact information. The homepage opens with typography and a CSS emblem. Repository: `finechina4004/collins-website`. Worker: `collins-website`.

## Saved full website

The full creative website is preserved on **`archive/full-art-website-2026-11-06`**, at commit **`eba401005ee971ae149d6b58edcd8757e20db096`** (main before this change). It includes the villa interiors, feature collections, project-note form, owner studio, prior artwork and creative history. Do not resume that version over production unless Chase asks to bring it back. Start future creative work there while keeping this simple page live for customers.

Current browser audit: `docs/BROWSER_LAUNCH_AUDIT_2026-11-06.md`. Earlier launch handoff: `docs/FINAL_LAUNCH_AUDIT_2026-11-06.md`. Art-direction notes: `docs/POOL_CLUB_ART_DIRECTION_2026-11-06.md`. The simpler landing-page release is preserved on `archive/simple-landing-2026-11-06` at `6be0e775551caf37d7745d50c06e4ad738b095cf`.

## Customer experience

- The homepage introduces Collins, features three projects, and links to Work, Services, About, and Contact.
- Work lists all eight albums. Each album has an individually selected lead photo, project features, and a photo sequence. Additional photos open in a native disclosure.
- Browser Back closes the photo viewer. Forward and shared `#photo-N` links reopen the selected photograph. Existing photo numbers still point to the original image.
- Old `#work/<slug>` links open the corresponding album. Other old homepage section links still lead to the relevant section.
- Pages and photo links work without JavaScript. The viewer, old hashtag redirects, and copy-number button use JavaScript.

## Contact

Confirmed call/text number: **469-500-7713**, from `public/site-config.js`. Direct `tel:` and `sms:` links, no form or automatic inquiry endpoint. No new paid software, CRM, automation or hosting registration.

## Editing and publishing

`public/content/projects.json` remains the album source. Edit page structure and copy in `scripts/render-landing.mjs`, album descriptions and photo selections in `scripts/project-editorial.mjs`, and styles in `public/hill-country.css`. Historical artwork and runtime files remain available in source.

1. Install missing dependencies with `npm ci --ignore-scripts`.
2. Run `npm run build:assets`. It fingerprints `public/site.css` and regenerates the homepage, supporting pages, eight albums, 404, and sitemap. Commit generated output alongside source.
3. Run `npm run check:deploy` for output freshness and Wrangler packaging checks. `npm run build:site` prepares `dist/` if needed.
4. Use the existing GitHub main → Cloudflare integration, deploying committed `public/` with `npx wrangler deploy`.
5. Confirm the successful build and live `version.json` marker `collins-hill-country-01`; check public home, an album and contact.

## Public domain

Primary URL: https://collinscustompools.com/ . Both it and www.collinscustompools.com were attached to the existing production Worker and opened successfully in Chrome. Wrangler retains these two custom-domain attachments. Canonical/share metadata, image URLs, robots.txt and the sitemap use the primary .com address. IONOS remains the registrar and email provider; authoritative DNS uses Cloudflare with the preserved mail records.

The www-to-root permanent redirect uses a Cloudflare zone Redirect Rule, separately from this static repository. Configure it to match only www.collinscustompools.com, preserve path/query, and return HTTPS on collinscustompools.com. Its deployment requires dashboard access and must be verified independently; attaching both domains alone does not create the redirect. Worker static _redirects does not support hostname-based source rules. No Worker script or extra request billing is needed for this zone rule.

Do not publish temporary QA frames or checkout-local preview configuration.

Album jacket design and validation: `docs/ALBUM_JACKETS_2026-11-06.md`.
