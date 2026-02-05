#!/usr/bin/env bash
set -euo pipefail

mkdir -p docs/checkpoints

TS="$(date +%Y-%m-%d_%H-%M-%S)"
OUT="docs/checkpoints/${TS}.md"

{
  echo "# Checkpoint ${TS}"
  echo
  echo "- Branch: $(git branch --show-current)"
  echo "- Commit: $(git log -1 --oneline)"
  echo "- Timestamp: $(date '+%Y-%m-%d %H:%M:%S %Z')"
  echo
  echo "## Git Status"
  echo '
```text'
  git status --short
  echo '```'
} > "$OUT"

echo "Saved checkpoint: $OUT"
