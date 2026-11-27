# Vintage DFW review branch — not for production

Source changes for seven photographic entrances and consistent navigation. The existing homepage image and purchased local font files are unchanged; the existing work, services, about, contact and album content is preserved. Empty new content pages are noindex until developed.

The six uploaded images have not been committed to this public repository because commercial-use rights have not been established for all of them. Place the six reviewed WebP files in public/assets/dfw only after rights are established: big-tex, stockyards, stadium, bridge, reunion, six-flags. A build guard rejects missing wallpapers. The private review package contains the files for local review.

After rights are cleared, run npm run build:assets and npm run check:deploy, inspect all pages at desktop and phone widths with the original assets, commit generated files, and review before merging to main. Do not deploy this branch directly or remove the missing-asset check. No live production update has been made.
