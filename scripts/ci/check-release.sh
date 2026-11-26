#!/usr/bin/env bash
set -euo pipefail
repo="repos/${GITHUB_REPOSITORY:?}"
sha=${GITHUB_SHA:?}
current=$(gh api "$repo/git/ref/heads/main" --jq .object.sha)
[[ "$current" == "$sha" ]] || { echo "::error::Release tag must point to current main"; exit 1; }
prs=$(gh api --paginate --slurp "$repo/commits/$sha/pulls?per_page=100")
stage=$(jq -er --arg sha "$sha" --arg repo "$GITHUB_REPOSITORY" '
  [.[][] | select(.merged_at != null and .merge_commit_sha == $sha and
    .base.ref == "main" and .head.ref == "stage" and
    .head.repo.full_name == $repo and .base.repo.full_name == $repo)]
  | select(length == 1) | .[0].head.sha' <<<"$prs")
stage_tree=$(gh api "$repo/git/commits/$stage" --jq .tree.sha)
main_tree=$(gh api "$repo/git/commits/$sha" --jq .tree.sha)
[[ "$stage_tree" == "$main_tree" ]] || { echo "::error::Release content differs from promoted stage"; exit 1; }
