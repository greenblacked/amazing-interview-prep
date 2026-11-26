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
host=$(jq -er --arg env "$environment" '.env[$env].routes[0].pattern' wrangler.json)
revision=$(git rev-parse HEAD)
echo "$revision" >public/revision.txt
./node_modules/.bin/wrangler deploy --env "$environment"

# New certificates, DNS and Worker assets can take time to propagate.
for attempt in {1..30}; do
  if live=$(curl -fsS --max-time 8 "https://$host/revision.txt?sha=$revision") &&
     [[ "$live" == "$revision" ]] &&
     curl -fsS --max-time 8 "https://$host/" | grep -i 'Amazing Interview Prep' >/dev/null; then
    echo "Verified $host at $revision"
    exit 0
  fi
  sleep 10
done
echo "Live smoke check failed for $host at $revision" >&2
exit 1
