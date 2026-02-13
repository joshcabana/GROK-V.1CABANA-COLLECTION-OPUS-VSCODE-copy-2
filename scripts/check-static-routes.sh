#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

FAILURES=0

require_in_next_config() {
  local needle="$1"
  if ! grep -Fq "$needle" next.config.js; then
    echo "[FAIL] Missing next.config.js entry: $needle"
    FAILURES=1
  fi
}

require_in_sitemap() {
  local route="$1"
  local loc="<loc>https://cabanacollections.com.au${route}</loc>"
  if ! grep -Fq "$loc" public/sitemap.xml; then
    echo "[FAIL] Missing public/sitemap.xml URL: $loc"
    FAILURES=1
  fi
}

canonical_routes=(
  "/"
  "/products"
  "/products/mens-boxer-brief-black"
  "/products/womens-set"
  "/products/signature-starter-set"
  "/about"
  "/impact"
  "/contact"
  "/faq"
  "/cart"
  "/size-guide"
  "/care-instructions"
  "/legal"
  "/privacy-policy"
  "/terms-of-service"
  "/return-policy"
  "/shipping-policy"
)

legacy_redirects=(
  "/index.html|/"
  "/about.html|/about"
  "/impact.html|/impact"
  "/contact.html|/contact"
  "/faq.html|/faq"
  "/cart.html|/cart"
  "/size-guide.html|/size-guide"
  "/care-instructions.html|/care-instructions"
  "/privacy-policy.html|/privacy-policy"
  "/terms-of-service.html|/terms-of-service"
  "/shipping-policy.html|/shipping-policy"
  "/return-policy.html|/return-policy"
  "/legal/index.html|/legal"
  "/products/mens-underwear.html|/products/mens-boxer-brief-black"
  "/products/mens-underwear|/products/mens-boxer-brief-black"
  "/products/mens-boxer-brief-black.html|/products/mens-boxer-brief-black"
  "/products/womens-set.html|/products/womens-set"
  "/products/womens-modal-set.html|/products/womens-set"
  "/products/womens-modal-set|/products/womens-set"
  "/privacy|/privacy-policy"
  "/terms|/terms-of-service"
  "/shipping|/shipping-policy"
  "/returns|/return-policy"
  "/care|/care-instructions"
)

for route in "${canonical_routes[@]}"; do
  require_in_sitemap "$route"
done

for mapping in "${legacy_redirects[@]}"; do
  source_route="${mapping%%|*}"
  dest_route="${mapping##*|}"
  require_in_next_config "source: '${source_route}'"
  require_in_next_config "destination: '${dest_route}'"
done

if grep -Fq '.html</loc>' public/sitemap.xml; then
  echo "[FAIL] public/sitemap.xml contains .html URLs; expected canonical routes."
  FAILURES=1
fi

if [[ -n "${BASE_URL:-}" ]]; then
  echo "Running live route checks against ${BASE_URL}"

  for route in "${canonical_routes[@]}"; do
    code="$(curl -s -o /dev/null -w '%{http_code}' "${BASE_URL}${route}")"
    if [[ "$code" != "200" ]]; then
      echo "[FAIL] Expected 200 for ${route}, got ${code}"
      FAILURES=1
    fi
  done

  for mapping in "${legacy_redirects[@]}"; do
    source_route="${mapping%%|*}"
    code="$(curl -s -o /dev/null -w '%{http_code}' "${BASE_URL}${source_route}")"
    if [[ "$code" != "307" && "$code" != "308" && "$code" != "301" ]]; then
      echo "[FAIL] Expected redirect (301/307/308) for ${source_route}, got ${code}"
      FAILURES=1
    fi
  done
fi

if [[ "$FAILURES" -ne 0 ]]; then
  echo "Static route checks failed."
  exit 1
fi

echo "Static route checks passed."
