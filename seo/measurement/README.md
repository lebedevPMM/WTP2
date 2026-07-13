# SEO before/after tester — WTP G1

Measures whether the G1 SEO change (branch `seo-test/g1-2026-06`, deployed ~2026-06-08)
improved Google Search performance. It compares two **Google Search Console** snapshots:

- **Baseline** — the ~month BEFORE the SEO went live (how the main/old site performed).
- **Treatment** — the ~month AFTER it went live.

and reports deltas in clicks / impressions / CTR / average position, overall + per landing.

---

## Do this NOW (capture the baseline before it ages out of the window)

You don't need to wait — GSC already has the pre-deploy history. Capture it today so the
baseline is locked:

1. Open **Google Search Console** → property `wtp.ae` (use the **Domain** property so it
   covers `banking.`, `client.`, etc. subdomains).
2. **Performance → Search results.**
3. Date range → **Custom → last 28 days ending the day BEFORE deploy** (e.g. 2026-05-11 →
   2026-06-07). 28 days, not "last month", so baseline and treatment are equal-length.
4. Top → **Export → CSV**. You get a ZIP. Unzip → keep `Pages.csv` (and `Queries.csv`).
5. Save as `baseline/Pages.csv` next to this README.

In ~28 days (≈ 2026-07-06), repeat steps 2-4 for the post-deploy window
(2026-06-08 → 2026-07-05) → save as `treatment/Pages.csv`.

> Use the **same number of days** for both windows. GSC data lags ~2-3 days, so end the
> treatment window a few days before you export.

---

## Run the comparison

No dependencies for CSV mode (Python 3 stdlib only):

```bash
cd "seo/measurement"
python3 gsc_perf_tester.py compare \
    --baseline baseline/Pages.csv \
    --treatment treatment/Pages.csv \
    --baseline-label "2026-05-11..06-07 (pre-SEO)" \
    --treatment-label "2026-06-08..07-05 (post-SEO)" \
    --out report-2026-07.md
```

Open `report-2026-07.md`. It has:
1. **Overall** — clicks/impressions/CTR/avg-position delta (📈/📉 + ✅/⚠️).
2. **Per G1 landing** — the 5 changed hosts, isolated (Pages export only).
3. **Top movers** — biggest impression swings, page or query level.
4. **Confounder checklist** — rule out algo updates / seasonality before trusting it.

Run it on `Queries.csv` too (same command) to see which **search queries** moved.

---

## Optional: automated API snapshots (instead of manual CSV)

Needs a Google service account with the GSC property shared to it:

```bash
pip install google-api-python-client google-auth
python3 gsc_perf_tester.py snapshot --site sc-domain:wtp.ae --creds creds.json \
    --start 2026-05-11 --end 2026-06-07 --out baseline.json
# ...in a month:
python3 gsc_perf_tester.py snapshot --site sc-domain:wtp.ae --creds creds.json \
    --start 2026-06-08 --end 2026-07-05 --out treatment.json
python3 gsc_perf_tester.py compare --baseline baseline.json --treatment treatment.json --out report.md
```

Service account setup: GCP console → create service account → enable **Search Console
API** → in GSC → Settings → Users and permissions → add the service-account email as a
Full/Restricted user → download its JSON key as `creds.json`.

---

## How to read it honestly

This is **before/after on one site**, not a controlled A/B — the whole site changed at
once, so the numbers also move with Google updates, seasonality, backlinks, and ad spend.
Treat deltas as **directional evidence**, and work the confounder checklist in the report.

What the G1 change should move, and roughly when:
- **Impressions / position** on the 5 landings — first signal, ~2-4 weeks (canonical
  consolidation + better titles + internal links let Google rank the right URL).
- **CTR** — title/meta rewrites; visible once the new titles are indexed (~1-3 weeks).
- **Rich results / AEO** — JSON-LD (Org/Service/Breadcrumb/FAQ). Confirm pickup directly
  with Google's **Rich Results Test** (https://search.google.com/test/rich-results) on
  each landing — don't wait for it to show in Performance.

A clean win = impressions up + average position down (better) on the 5 G1 hosts, with no
overlapping algo update to explain it. A null/negative result after 4+ weeks with no
confounder → revert (point CF production branch back to `feat/b2c-client-landing`).
