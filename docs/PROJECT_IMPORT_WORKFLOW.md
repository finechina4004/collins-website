# Batch project imports

The first album mixed template design, photo preparation, review and individual GitHub uploads. Future imports reuse the photographic layout and use one reviewed batch.

## Preparation

Run `scripts/prepare-project-photos.py` with all supplied project ZIPs and a new staging directory outside the checkout. It matches archive names to the existing exact project titles, groups repeated archives, removes byte-identical duplicate images per project, applies EXIF orientation, prepares WebP files without upscaling, and creates a contact sheet per project. It reports unsupported files instead of silently presenting an incomplete import as complete. It refuses to replace populated albums unless explicitly instructed. It never changes the live catalog.

Example:

```bash
python scripts/prepare-project-photos.py \
  '/path/Project One.zip' '/path/Project Two.zip' \
  --output /path/new-import-staging
```

Review the contact sheets together. Choose each cover, fill factual captions/alt text and add only known project details. Put each album's story and photo selections into `editorial.chapters` in project data. The renderer supports `wide`, `pair`, `pair-offset` and `feature` blocks; each block lists `photoIds`. Optional margin notes are data too. Albums without curated chapters still show their hero and all photographs. No shared JavaScript changes are required for another project.

## Transfer and publication

- Read the staging manifest once and reuse computed Git blob hashes. Avoid re-encoding and resending assets that are already in the repository.
- Through the connected GitHub tools, upload independent immutable blobs in bounded parallel batches (start at three), inspect every result, and retain successful hashes for retries. Ref updates, catalog merges and commits stay sequential. The first measured batch used three asset workers for 24 project photographs and one review capture: 346 seconds including file reads, transfer and checkpoints. This is not an end-to-end timing or a controlled comparison.
- Publish website assets and source. A single batch review capture is sufficient; do not upload duplicate project originals or a screenshot set per album into the publishing repository.
- Merge all reviewed project records into the current catalog together; preserve existing albums, routes and unknown facts. Use one branch, one PR and one Cloudflare deployment for the batch.
- Check source/image integrity across every album. Run shared viewer/keyboard checks once; inspect each cover, photo order and a portrait layout. Repeat checks for changes or observed failures, rather than rebuilding the whole site for each archive.

## Audit validation

The revised renderer produced an identical structural element tree for the existing Black Tie, Barefoot page compared with the prior renderer. A synthetic album with different photo IDs rendered all configured chapters. The importer was exercised with the Black Tie ZIP supplied twice: it produced one project with 13 images and reported 13 duplicates. Every output asset's Git blob hash was checked. This staging exercise did not alter the published photographs or catalog.

The importer and data refactor were used for the a Minor Key / Dallas, With Feeling batch. Each future batch still needs content review and browser verification before publication. No time-saving percentage or upload duration is promised.
