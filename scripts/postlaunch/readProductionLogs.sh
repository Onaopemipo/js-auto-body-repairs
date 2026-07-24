#!/usr/bin/env bash

set -euo pipefail

SSH_HOST="${POST_LAUNCH_SSH_HOST:-184.94.213.232}"
SSH_PORT="${POST_LAUNCH_SSH_PORT:-21098}"
SSH_USER="${POST_LAUNCH_SSH_USER:-jsauukri}"
SSH_KEY="${POST_LAUNCH_SSH_KEY:-$HOME/Downloads/id_rsa}"
APP_ROOT="${POST_LAUNCH_APP_ROOT:-/home/jsauukri/js-auto-body-production}"
LINES="${POST_LAUNCH_LOG_LINES:-160}"

if [[ ! -f "$SSH_KEY" ]]; then
  printf 'SSH key not found: %s\n' "$SSH_KEY" >&2
  exit 1
fi

ssh \
  -i "$SSH_KEY" \
  -p "$SSH_PORT" \
  "${SSH_USER}@${SSH_HOST}" \
  bash -s -- \
  "$APP_ROOT" \
  "$LINES" <<'REMOTE'
set -euo pipefail

APP_ROOT="$1"
LINES="$2"

cd "$APP_ROOT"

printf '\n--- Application root ---\n'
pwd

printf '\n--- Runtime build ---\n'

if [[ -f .next/BUILD_ID ]]; then
  printf 'BUILD_ID: '
  cat .next/BUILD_ID
  printf '\n'
else
  echo 'MISSING .next/BUILD_ID'
fi

printf '\n--- Health-related files ---\n'
ls -lah \
  server.js \
  package.json \
  .next/BUILD_ID \
  2>/dev/null || true

printf '\n--- Recent stderr ---\n'

if [[ -f stderr.log ]]; then
  tail -n "$LINES" stderr.log
else
  echo 'No stderr.log found.'
fi

printf '\n--- Recent log files ---\n'

find . \
  -maxdepth 2 \
  -type f \
  \( \
    -name '*.log' -o \
    -name 'error_log' \
  \) \
  -print \
  | sort

printf '\n--- Recent application errors ---\n'

find . \
  -maxdepth 2 \
  -type f \
  \( \
    -name '*.log' -o \
    -name 'error_log' \
  \) \
  -exec grep -Ein \
    'error|exception|fatal|unhandled|failed|ENOMEM|killed|503' \
    {} + \
  2>/dev/null \
  | tail -n "$LINES" \
  || true
REMOTE
