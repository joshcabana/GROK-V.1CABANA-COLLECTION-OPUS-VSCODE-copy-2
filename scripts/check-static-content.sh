#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

HTML_GLOB=(
  "*.html"
  "products/*.html"
  "legal/*.html"
)

FAILURES=0

check_absent() {
  local pattern="$1"
  local message="$2"
  if grep -RIn -E "$pattern" ${HTML_GLOB[*]} >/tmp/cabana-check-match.txt 2>/dev/null; then
    echo "[FAIL] ${message}"
    cat /tmp/cabana-check-match.txt
    echo
    FAILURES=1
  fi
}

check_absent 'returns@cabana\.com|support@cabana\.com|Cabana\.Collections2025@gmail\.com|cabana\.collections2025@gmail\.com' 'Legacy email addresses detected in static content.'
check_absent 'Tailwind v4 is working' 'Debug marker is present in production content.'
check_absent '\[COUNTRY\]' 'Unresolved country placeholder found in content.'
check_absent '15%' 'Found 15% impact copy; canonical value is 10%.'

tracked_env_files="$(git ls-files | grep -E '(^|/)\.env($|\.)' | grep -Ev '\.example$' || true)"
if [[ -n "${tracked_env_files}" ]]; then
  echo "[FAIL] Tracked .env files detected:"
  echo "${tracked_env_files}"
  echo
  FAILURES=1
fi

if [[ "$FAILURES" -ne 0 ]]; then
  echo "Static content checks failed."
  exit 1
fi

echo "Static content checks passed."
