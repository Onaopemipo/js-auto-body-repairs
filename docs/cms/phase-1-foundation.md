# Sanity CMS Phase 1 — Foundation

## Scope

Phase 1 establishes the CMS architecture without replacing current
production content.

## Studio

Local:

```text
http://localhost:3000/studio

---

# Step 21 — Format the implementation

```bash
cd "$HOME/Workspace/js-auto-body-repairs"

npx prettier --write \
  sanity.config.ts \
  sanity.cli.ts \
  src/sanity \
  "src/app/studio/[[...tool]]/page.tsx" \
  scripts/cms \
  docs/cms/phase-1-foundation.md \
  package.json \
  .env.example \
  .gitignore
