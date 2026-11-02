# Collins Custom Pools & Backyards

A small static holding page for testing the GitHub → Cloudflare Workers publishing connection. This is infrastructure preparation; the complete website and final art direction are still to be built.

## Files

- `public/index.html`: responsive holding page; no external fonts, images, or scripts.
- `public/404.html`: missing-page response.
- `public/_headers`: preview indexing and response headers.
- `wrangler.json`: Cloudflare Workers Static Assets configuration.
- `package.json` and `package-lock.json`: deployment tooling.

Only `public/` is served to visitors. Keep credentials, customer inquiries, and account exports outside this repository. Repository visibility is managed separately in GitHub settings.

## Cloudflare dashboard setup

Use **Workers & Pages → Create application → Connect GitHub** (wording can vary), authorize access to this repository, and select `finechina4004/collins-website`.

| Setting | Value |
| --- | --- |
| Project / Worker name | `collins-website` |
| Production branch | `main` |
| Root directory | Repository root |
| Build command | Leave empty |
| Deploy command | `npx wrangler deploy` |

Cloudflare should install the locked npm development dependencies automatically. No framework build, database, paid add-on, or custom domain is needed for this test.

After deploying, open the returned `workers.dev` address while signed out. Then change the preview number in `public/index.html`, commit it, and verify that the update appears at that same address. That second deployment proves automatic updates; a repository commit alone does not.

## Current scope and status

- Source files are ready for a hosting connection test.
- Cloudflare account, repository authorization, and build settings must be checked in the owner's dashboard.
- Public deployment and automatic updates are not yet verified.
- No inquiry form or notification delivery has been configured.
- The IONOS domain is not configured by these files. Audit existing website and email records before changing DNS.
- This preview requests `noindex` using HTML metadata and response headers. It is not access protection. Remove both restrictions when the finished business website is ready for search engines.
- The previous “Five more minutes” concept is retired. The new visual exploration draws from aquatic and cinematic references and uses original work and licensed assets, rather than copied movie branding.

## Local checks

Use a supported Node.js version, run `npm ci`, then `npm run check:deploy`. This packages the static assets without publishing and does not prove account authentication or a live deployment.

## Updates and recovery

Once Cloudflare is connected, commits to `main` can automatically update the test website. Review changes before committing. Use a separate preview branch for the full website design when branch previews are configured.

To restore a prior website, use Cloudflare's deployment rollback and revert the corresponding source change in GitHub so the next deploy preserves the restored version. Customer inquiry records, when configured later, have a separate lifecycle.
