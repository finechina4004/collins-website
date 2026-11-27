# Vintage DFW review branch — not for production

Source changes for seven photographic entrances and consistent navigation. The existing homepage image and purchased local font files are unchanged; the existing work, services, about, contact and album content is preserved. Empty new content pages are noindex until developed.

The site owner confirmed commercial-use clearance for all six photographs on November 27, 2026. The images are prepared locally but not committed because this session cannot transfer the local binary files through the repository connection. Place the six reviewed WebP files in public/assets/dfw using the exact six approved images: big-tex, stockyards, stadium, bridge, reunion, six-flags. A build guard rejects missing wallpapers. The update package contains the six optimized WebP files and installer. Preserve the stadium attribution mark and existing home image.

After the six assets are uploaded, run npm run build:assets and npm run check:deploy, inspect all pages at desktop and phone widths with the original assets, commit generated files, and review before merging to main. Do not deploy this branch directly or remove the missing-asset check. No live production update has been made.
