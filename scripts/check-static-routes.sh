#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

FAILURES=0

require_in_vercel() {
  local needle="$1"
  if ! grep -Fq "$needle" vercel.json; then
    echo "[FAIL] Missing vercel.json entry: $needle"
    FAILURES=1
  fi
}

require_in_sitemap() {
  local route="$1"
  local loc="<loc>https://cabanacollections.com.au${route}</loc>"
  if ! grep -Fq "$loc" sitemap.xml; then
    echo "[FAIL] Missing sitemap URL: $loc"
    FAILURES=1
  fi
}

canonical_routes=(
  "/about"
  "/impact"
  "/contact"
  "/faq"
  "/cart"
  "/size-guide"
  "/care-instructions"
  "/privacy-policy"
  "/terms-of-service"
  "/shipping-policy"
  "/return-policy"
  "/legal"
  "/products"
  "/products/mens-boxer-brief-black"
  "/products/womens-set"
  "/products/signature-starter-set"
)

# In the new Next.js architecture, we use canonical routes.
# vercel.json should bridge legacy URLs to these canonical routes.
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
)

for route in "${canonical_routes[@]}"; do
  require_in_sitemap "$route"
done

for mapping in "${legacy_redirects[@]}"; do
  source_route="${mapping%%|*}"
  dest_route="${mapping##*|}"
  require_in_vercel "\"source\": \"${source_route}\""
  require_in_vercel "\"destination\": \"${dest_route}\""
done

if grep -Fq '.html</loc>' sitemap.xml; then
  echo "[FAIL] sitemap.xml contains .html URLs; expected clean canonical routes."
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
    if [[ "$code" != "301" && "$code" != "308" ]]; then
      echo "[FAIL] Expected redirect (301/308) for ${source_route}, got ${code}"
      FAILURES=1
    fi
  done
fi

if [[ "$FAILURES" -ne 0 ]]; then
  echo "Static route checks failed."
  exit 1
fi

echo "Static route checks passed."
