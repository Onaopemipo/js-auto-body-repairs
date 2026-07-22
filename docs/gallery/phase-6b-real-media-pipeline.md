# Phase 6B — Real Gallery Media Pipeline

## Purpose

The pipeline transforms authentic JS Auto Body Repairs project photographs
into production-ready gallery media.

## Private input

Original files are stored under:

```text
.gallery-source/projects/<project-slug>/

---

## 15. Format the implementation

```bash
cd "$HOME/Workspace/js-auto-body-repairs"

npx prettier --write \
  src/types/gallery.ts \
  src/content/gallery.ts \
  src/content/generated/gallery-projects.ts \
  src/components/gallery/gallery-card.tsx \
  scripts/gallery/processGalleryMedia.mjs \
  scripts/validateGalleryMedia.mjs \
  docs/gallery/phase-6b-real-media-pipeline.md \
  package.json
