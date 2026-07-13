#!/usr/bin/env bash
# Deploy bigsite to the PRODUCTION project (wtp-main → wtp.ae).
# Unlike deploy-test.sh this ships NO noindex header — this build is meant to be indexed.
set -euo pipefail
cd "$(dirname "$0")/.."
npm run build
node scripts/prerender.mjs
rm -f dist/_headers
npx wrangler pages deploy dist --project-name wtp-main --branch main --commit-dirty=true
