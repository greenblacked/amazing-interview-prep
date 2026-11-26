#!/usr/bin/env bash
set -euo pipefail
url=${1:?site URL required}
revision=${2:?Git revision required}
for attempt in {1..30}; do
  if live=$(curl -fsS --max-time 8 "$url/revision.txt?sha=$revision") &&
     [[ "$live" == "$revision" ]] &&
     curl -fsS --max-time 8 "$url/" | grep -Fi 'Amazing Interview Prep' >/dev/null; then
    echo "Verified $url at $revision"
    exit 0
  fi
  sleep 10
done
echo "Live smoke check failed for $url at $revision" >&2
exit 1
