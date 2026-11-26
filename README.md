# Amazing Interview Prep

A two-hour mock interview studio for engineering management, coding, SQL, system design, low-level design, and AI coding. Choose Junior, Mid-level, or Senior. Each prompt includes space for an answer and an interviewer rubric. The timer and notes live in the current browser profile. Clearing site data removes them.

The five technical formats follow the [Tech OA & Interview Questions collection](https://github.com/perixtar/Tech-OA-Interview-Questions). Scenarios and rubrics are written for this studio. Selected exercises link to related upstream practice material. Engineering Management adds people, delivery, and organizational decisions.

## Run locally

Use Node 24 and npm.

```sh
npm ci
npm run check
npm run dev
```

Open the local URL printed by Wrangler. Only the static files under `public/` are served. The app has no runtime package dependencies, backend, analytics, or AI API billing.

## First deployment

The production hostname is **interview.szolotov.com**. With the source on GitHub and the main, stage, and dev branches present, add **CLOUDFLARE_API_TOKEN** under repository Settings → Secrets and variables → Actions → Repository secrets. Use a Workers deployment token scoped to your Cloudflare account and the szolotov.com zone. It needs product-level Workers Admin to create the three Workers, Workers Routes Write for domain binding, and Zone Read for account discovery. Optionally set CLOUDFLARE_ACCOUNT_ID if using a token without zone listing. The zone must be active and the three hostnames below must be available for Worker custom domains.

After credentials are added, the scheduled Deploy workflow on main attempts first deployment every two hours at minute 23 UTC. GitHub controls the actual start time. For immediate execution, run **Actions → Deploy → Run workflow** on main. It deploys the current dev and stage revisions first, then the selected main revision. Each deploy must serve its matching Git SHA and the app homepage before the next environment starts. A successful bootstrap publishes the v1.0.0 GitHub release and tag. Subsequent scheduled checks exit after finding the initial release.

| Environment | Source | Hostname |
| --- | --- | --- |
| Development | dev | interview-dev.szolotov.com |
| Staging | stage | interview-stage.szolotov.com |
| Production | initial main bootstrap, then vMAJOR.MINOR.PATCH tags on main history | interview.szolotov.com |

## Changes and releases

Open feature PRs against dev. Promote dev to stage, then stage to main. CI checks promotion source, runs session tests and packages a Wrangler dry run. Deployment jobs rerun validation on the exact revision before using credentials. GitHub branch protection is an external repository setting. Set the CI validate check as required if branch rules are available for the repository.

After merging to main, tag the tested commit with the next semantic version. The tagged deploy verifies the live Worker before publishing the GitHub release.

```sh
git fetch origin main --tags
git tag -a v1.0.1 origin/main -m 'Release v1.0.1'
git push origin refs/tags/v1.0.1
```

Use the next unused tag on later releases. To restore service, use the production Worker's Deployments page in Cloudflare to roll back to the previous healthy version. Verify its revision and homepage, then revert the faulty change through dev, stage, and main and cut a new patch release. The bootstrap scheduler idles after v1.0.0 is recorded.

```sh
curl -fsS https://interview.szolotov.com/revision.txt
curl -fsS https://interview.szolotov.com/ | head
```

If activation fails, inspect the failed job for the environment and revision. A zone lookup error means the token cannot see the active zone. A domain binding error may indicate a conflicting DNS record. A smoke failure means the expected revision or homepage did not reach the public hostname within the retry window. Check DNS and certificate status before rerunning Deploy.
