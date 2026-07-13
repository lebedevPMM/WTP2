#!/usr/bin/env bash
# Deploy bigsite to the STAGING project (wtp-test → test.wtp.ae).
# Injects X-Robots-Tag: noindex into the dist AFTER build so staging never gets
# indexed, while the committed public/ stays clean for the future prod deploy.
set -euo pipefail
cd "$(dirname "$0")/.."
npm run build
printf '/*\n  X-Robots-Tag: noindex\n' > dist/_headers
npx wrangler pages deploy dist --project-name wtp-test --commit-dirty=true
