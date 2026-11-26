#!/usr/bin/env bash
set -euo pipefail

case "$BASE" in
  dev) exit 0 ;;
  stage) source_branch=dev ;;
  main) source_branch=stage ;;
  *) exit 0 ;;
esac
if [[ "$HEAD" != "$source_branch" || "$SAME_REPO" != true ]]; then
  echo "::error::Promote $source_branch from this repository into $BASE."
  exit 1
fi

# On a fresh install previews only exist after the first production deployment.
releases=$(gh api --paginate --slurp "repos/$GITHUB_REPOSITORY/releases?per_page=100")
initialized=$(jq -r 'any(.[][]; .tag_name == "v1.0.0" and .draft == false)' <<<"$releases")
if [[ "$initialized" == false ]]; then
  echo 'Initial rollout pending. Bootstrap verifies the previews on main.'
  exit 0
fi
scripts/verify-site.sh "https://$source_branch-amazing-interview-prep.zolotov.workers.dev" "$SOURCE_SHA"
