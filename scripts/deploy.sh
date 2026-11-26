#!/usr/bin/env bash
set -euo pipefail

environment=${1:?deployment environment required}
case "$environment" in
  dev|stage|production) ;;
  *) echo 'Unknown deployment environment' >&2; exit 1 ;;
esac
if [[ -z "${CLOUDFLARE_ACCOUNT_ID:-}" ]]; then
  zone=$(curl --fail --silent --show-error --retry 2 \
    --header "Authorization: Bearer ${CLOUDFLARE_API_TOKEN:?token required}" \
    'https://api.cloudflare.com/client/v4/zones?name=szolotov.com&status=active')
  CLOUDFLARE_ACCOUNT_ID=$(jq -er 'select(.success and (.result | length == 1)) | .result[0].account.id | strings | select(length > 0)' <<<"$zone")
  export CLOUDFLARE_ACCOUNT_ID
fi
revision=$(git rev-parse HEAD)
echo "$revision" >public/revision.txt
wrangler=./node_modules/.bin/wrangler
if [[ "$environment" == production ]]; then
  "$wrangler" deploy
  if [[ "${GITHUB_REF_TYPE:-}" == tag ]]; then
    scripts/verify-site.sh "https://amazing-interview-prep.zolotov.workers.dev" "$revision"
  fi
  exit 0
fi
output=$(mktemp)
trap 'rm -f "$output"' EXIT
printf '\n/*\n  X-Robots-Tag: noindex, nofollow\n' >>public/_headers
WRANGLER_OUTPUT_FILE_PATH="$output" "$wrangler" preview --name "$environment" --tag "$revision"
worker=$(jq -er '.name' wrangler.json)
url=$(jq -ser --arg prefix "https://$environment-$worker." '
  [.[] | select(.type == "preview")] | last | .preview_urls[]
  | select(startswith($prefix)) | select(test("^https://[a-z0-9-]+\\.[a-z0-9-]+\\.workers\\.dev$"))
' "$output")
scripts/verify-site.sh "$url" "$revision"
