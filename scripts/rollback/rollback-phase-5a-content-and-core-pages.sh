#!/usr/bin/env zsh
set -Eeuo pipefail

PROJECT_ROOT="${PROJECT_ROOT:-$HOME/Workspace/js-auto-body-repairs}"
BACKUP_ROOT="$HOME/.js-auto-body-external-backups"

cd "$PROJECT_ROOT"

LATEST_BACKUP="$(find "$BACKUP_ROOT" -maxdepth 1 -type d -name 'phase-5a-content-pages-*' -print 2>/dev/null | sort | tail -n 1)"

if [[ -z "$LATEST_BACKUP" ]]; then
  echo "ERROR: No Phase 5A backup found."
  exit 1
fi

rsync -a --delete --exclude=node_modules --exclude=.next --exclude=.git "$LATEST_BACKUP/" "$PROJECT_ROOT/"
npm install
rm -rf .next
npm run validate

echo "Phase 5A rollback complete."
