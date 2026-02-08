#!/usr/bin/env bash
set -euo pipefail

PRESET="${1:-mobile}"
MAX_RETRIES="${2:-4}"
LOCK_DIR="${TMPDIR:-/tmp}/cabana-lhci.lock"

if [[ "${PRESET}" != "mobile" && "${PRESET}" != "desktop" ]]; then
  echo "Usage: bash scripts/lhci-stable.sh <mobile|desktop> [max_retries]" >&2
  exit 1
fi

cleanup_port_3000() {
  if lsof -nP -iTCP:3000 -sTCP:LISTEN >/dev/null 2>&1; then
    local pids
    pids="$(lsof -t -nP -iTCP:3000 -sTCP:LISTEN | tr '\n' ' ')"
    if [[ -n "${pids}" ]]; then
      kill ${pids} >/dev/null 2>&1 || true
    fi
  fi
}

cleanup_lhci_dir() {
  if [[ -d ".lighthouseci" ]]; then
    # Ignore transient unlink races from prior interrupted runs.
    find ".lighthouseci" -mindepth 1 -delete 2>/dev/null || true
  fi
}

acquire_lock() {
  local attempts=0
  until mkdir "${LOCK_DIR}" >/dev/null 2>&1; do
    attempts=$((attempts + 1))
    if [[ ${attempts} -ge 60 ]]; then
      echo "Unable to acquire LHCI lock at ${LOCK_DIR}" >&2
      exit 1
    fi
    sleep 1
  done
}

release_lock() {
  rmdir "${LOCK_DIR}" >/dev/null 2>&1 || true
}

acquire_lock
trap release_lock EXIT INT TERM

cleanup_port_3000
cleanup_lhci_dir

attempt=1
while [[ ${attempt} -le ${MAX_RETRIES} ]]; do
  echo "lhci preset=${PRESET} attempt=${attempt}/${MAX_RETRIES}"
  if CABANA_LHCI_PRESET="${PRESET}" NODE_OPTIONS="--require ./scripts/lhci-unlink-fix.cjs" pnpm exec lhci autorun --config=./lighthouserc.cjs; then
    exit 0
  fi

  echo "lhci preset=${PRESET} attempt=${attempt} failed, retrying..." >&2
  cleanup_port_3000
  cleanup_lhci_dir
  sleep 2
  attempt=$((attempt + 1))
done

echo "lhci preset=${PRESET} failed after ${MAX_RETRIES} attempts" >&2
exit 1
