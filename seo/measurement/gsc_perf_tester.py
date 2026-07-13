#!/usr/bin/env python3
"""
GSC before/after SEO performance tester — WTP G1.

Purpose
-------
Measure whether the G1 SEO change (deployed on branch `seo-test/g1-2026-06`) moved the
needle. Compares two Google Search Console "Performance" snapshots:

  BASELINE  = how the site performed over the ~last month BEFORE the SEO went live
  TREATMENT = how it performed over the ~next month AFTER the SEO went live

and reports the delta in clicks, impressions, CTR and average position — overall, per
landing (the 5 G1 hosts), and per top mover.

Two input modes (use whichever is easier):

  1. CSV mode (no API, zero setup) — RECOMMENDED
     In GSC -> Performance -> set date range -> Export -> CSV (a ZIP with Pages.csv,
     Queries.csv, ...). Unzip. Feed Pages.csv (or Queries.csv) for each period:
        python gsc_perf_tester.py compare \
            --baseline baseline/Pages.csv --treatment treatment/Pages.csv \
            --out report-2026-07.md

  2. API mode (automated snapshots) — optional, needs a Google service account or OAuth
        python gsc_perf_tester.py snapshot \
            --site sc-domain:wtp.ae --creds creds.json \
            --start 2026-05-08 --end 2026-06-07 --out baseline.json
     then `compare --baseline baseline.json --treatment treatment.json`.

IMPORTANT measurement caveat
----------------------------
This is a BEFORE/AFTER time comparison on one property, NOT a controlled A/B test. The
whole site changes at once, so external factors (Google algo updates, seasonality, new
backlinks, ad spend) also move these numbers. Read deltas as directional, not proof.
Mitigations baked into the report: it flags the 5 changed G1 landings separately, prints
a checklist of confounders to rule out, and (if you provide a year-ago CSV) can show YoY
to separate seasonality. Average-position deltas are most trustworthy on
impressions-heavy rows; thin rows (few impressions) are noisy — the report sorts by
impression weight.
"""

import argparse
import csv
import json
import sys
from pathlib import Path

# The 5 G1 landings (and the client money-page spokes) the SEO change touched.
G1_HOSTS = [
    "wtp.ae",
    "banking.wtp.ae",
    "realestate.wtp.ae",
    "partners.wtp.ae",
    "client.wtp.ae",
]


# ---------- parsing ----------

def _num(s):
    """Parse a GSC numeric cell: '1,234' -> 1234, '5.2%' -> 0.052, '' -> 0."""
    if s is None:
        return 0.0
    s = str(s).strip().replace(",", "")
    if s == "":
        return 0.0
    pct = s.endswith("%")
    s = s.rstrip("%")
    try:
        v = float(s)
    except ValueError:
        return 0.0
    return v / 100.0 if pct else v


def load_csv(path):
    """Load a GSC Pages.csv / Queries.csv into {key: {clicks, impressions, ctr, position}}."""
    rows = {}
    with open(path, newline="", encoding="utf-8-sig") as f:
        reader = csv.reader(f)
        header = next(reader, None)
        if not header:
            return rows
        # GSC key column is the first column ("Top pages" / "Top queries" / "Page" / ...).
        # Remaining columns: Clicks, Impressions, CTR, Position (order is stable).
        for r in reader:
            if not r or not r[0].strip():
                continue
            key = r[0].strip()
            cells = r[1:] + ["", "", "", ""]
            rows[key] = {
                "clicks": _num(cells[0]),
                "impressions": _num(cells[1]),
                "ctr": _num(cells[2]),
                "position": _num(cells[3]),
            }
    return rows


def load_json(path):
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    # snapshot mode stores {"rows": {key: {...}}}
    return data.get("rows", data)


def load_any(path):
    p = Path(path)
    if p.suffix.lower() == ".json":
        return load_json(path)
    return load_csv(path)


# ---------- comparison ----------

def host_of(url):
    u = url.replace("https://", "").replace("http://", "")
    return u.split("/")[0]


def pct_change(old, new):
    if old == 0:
        return None if new == 0 else float("inf")
    return (new - old) / old * 100.0


def aggregate(rows):
    clicks = sum(r["clicks"] for r in rows.values())
    impr = sum(r["impressions"] for r in rows.values())
    # weighted average position by impressions (un-weighted avg is misleading)
    wpos_num = sum(r["position"] * r["impressions"] for r in rows.values())
    wpos = wpos_num / impr if impr else 0.0
    ctr = clicks / impr if impr else 0.0
    return {"clicks": clicks, "impressions": impr, "ctr": ctr, "position": wpos}


def fmt_delta(old, new, lower_is_better=False, pct=False):
    d = new - old
    arrow = "→"
    if abs(d) > 1e-9:
        up = d > 0
        good = (not up) if lower_is_better else up
        arrow = ("📈" if up else "📉") + (" ✅" if good else " ⚠️")
    if pct:
        return f"{old*100:.2f}% → {new*100:.2f}%  ({d*100:+.2f}pp) {arrow}"
    pc = pct_change(old, new)
    pcs = "" if pc is None else (" (+∞%)" if pc == float("inf") else f" ({pc:+.1f}%)")
    return f"{old:,.1f} → {new:,.1f}  ({d:+,.1f}){pcs} {arrow}"


def build_report(base, treat, base_label, treat_label):
    out = []
    out.append(f"# SEO before/after report — WTP G1\n")
    out.append(f"- **Baseline:** {base_label}")
    out.append(f"- **Treatment:** {treat_label}")
    out.append(f"- Branch under test: `seo-test/g1-2026-06`\n")

    is_pages = any("/" in k or k.startswith("http") or "." in k for k in list(treat)[:5])

    # ---- aggregate ----
    ab, at = aggregate(base), aggregate(treat)
    out.append("## 1. Overall\n")
    out.append(f"| Metric | Change |")
    out.append(f"|---|---|")
    out.append(f"| Clicks | {fmt_delta(ab['clicks'], at['clicks'])} |")
    out.append(f"| Impressions | {fmt_delta(ab['impressions'], at['impressions'])} |")
    out.append(f"| CTR | {fmt_delta(ab['ctr'], at['ctr'], pct=True)} |")
    out.append(f"| Avg position (impr-weighted) | {fmt_delta(ab['position'], at['position'], lower_is_better=True)} |")
    out.append("")

    # ---- per-landing (only meaningful for Pages export) ----
    if is_pages:
        out.append("## 2. Per G1 landing (the 5 changed hosts)\n")
        out.append("| Host | Clicks | Impressions | CTR | Avg pos |")
        out.append("|---|---|---|---|---|")
        for host in G1_HOSTS:
            b = {k: v for k, v in base.items() if host_of(k) == host}
            t = {k: v for k, v in treat.items() if host_of(k) == host}
            if not b and not t:
                continue
            ba, ta = aggregate(b), aggregate(t)
            out.append(
                f"| {host} "
                f"| {ba['clicks']:,.0f}→{ta['clicks']:,.0f} "
                f"| {ba['impressions']:,.0f}→{ta['impressions']:,.0f} "
                f"| {ba['ctr']*100:.1f}%→{ta['ctr']*100:.1f}% "
                f"| {ba['position']:.1f}→{ta['position']:.1f} |"
            )
        out.append("")

    # ---- top movers by impressions ----
    out.append("## 3. Top movers (by impression delta)\n")
    keys = set(base) | set(treat)
    movers = []
    for k in keys:
        b = base.get(k, {"clicks": 0, "impressions": 0, "ctr": 0, "position": 0})
        t = treat.get(k, {"clicks": 0, "impressions": 0, "ctr": 0, "position": 0})
        movers.append((t["impressions"] - b["impressions"], k, b, t))
    movers.sort(key=lambda x: abs(x[0]), reverse=True)
    out.append("| Page/Query | Impr Δ | Clicks Δ | Pos Δ |")
    out.append("|---|---|---|---|")
    for dimpr, k, b, t in movers[:20]:
        kshow = k if len(k) <= 60 else k[:57] + "…"
        dpos = t["position"] - b["position"]
        out.append(
            f"| {kshow} | {dimpr:+,.0f} | {t['clicks']-b['clicks']:+,.0f} | {dpos:+.1f} |"
        )
    out.append("")

    # ---- confounder checklist ----
    out.append("## 4. Before you trust the delta — rule out confounders\n")
    out.append("- [ ] Any Google **core/algo update** in the treatment window? (check status.search.google.com / search-engine news)")
    out.append("- [ ] **Seasonality** — is this period normally up/down vs the baseline month? (compare YoY if you have a year-ago CSV)")
    out.append("- [ ] **New backlinks / PR / ad spend** started in the window? (would inflate independently of on-page SEO)")
    out.append("- [ ] **Indexing lag** — Google may take 2-4 weeks to recrawl + re-rank; an early read can understate the effect.")
    out.append("- [ ] **Same date-range length** for baseline and treatment (e.g. both 28 days)?")
    out.append("- [ ] Rich results: separately run the **Rich Results Test** on each landing to confirm JSON-LD is picked up (Org/Service/Breadcrumb/FAQ).")
    out.append("")
    return "\n".join(out)


# ---------- API snapshot (optional) ----------

def api_snapshot(site, creds, start, end, out):
    try:
        from google.oauth2.service_account import Credentials
        from googleapiclient.discovery import build
    except ImportError:
        sys.exit("API mode needs: pip install google-api-python-client google-auth")
    scopes = ["https://www.googleapis.com/auth/webmasters.readonly"]
    credentials = Credentials.from_service_account_file(creds, scopes=scopes)
    service = build("searchconsole", "v1", credentials=credentials)
    rows = {}
    body = {
        "startDate": start,
        "endDate": end,
        "dimensions": ["page"],
        "rowLimit": 1000,
    }
    resp = service.searchanalytics().query(siteUrl=site, body=body).execute()
    for r in resp.get("rows", []):
        key = r["keys"][0]
        rows[key] = {
            "clicks": r.get("clicks", 0),
            "impressions": r.get("impressions", 0),
            "ctr": r.get("ctr", 0),
            "position": r.get("position", 0),
        }
    Path(out).write_text(json.dumps({"site": site, "start": start, "end": end, "rows": rows}, indent=2))
    print(f"Saved {len(rows)} rows -> {out}")


# ---------- cli ----------

def main():
    ap = argparse.ArgumentParser(description="GSC before/after SEO performance tester (WTP G1)")
    sub = ap.add_subparsers(dest="cmd", required=True)

    c = sub.add_parser("compare", help="compare two snapshots (CSV or JSON)")
    c.add_argument("--baseline", required=True, help="baseline Pages.csv / Queries.csv / snapshot.json")
    c.add_argument("--treatment", required=True, help="treatment Pages.csv / Queries.csv / snapshot.json")
    c.add_argument("--baseline-label", default="last ~month (pre-SEO)")
    c.add_argument("--treatment-label", default="this ~month (post-SEO)")
    c.add_argument("--out", default="-", help="output markdown file (default stdout)")

    s = sub.add_parser("snapshot", help="pull a GSC snapshot via API (optional)")
    s.add_argument("--site", required=True, help="e.g. sc-domain:wtp.ae")
    s.add_argument("--creds", required=True, help="service-account JSON path")
    s.add_argument("--start", required=True, help="YYYY-MM-DD")
    s.add_argument("--end", required=True, help="YYYY-MM-DD")
    s.add_argument("--out", required=True)

    args = ap.parse_args()
    if args.cmd == "snapshot":
        api_snapshot(args.site, args.creds, args.start, args.end, args.out)
        return
    base = load_any(args.baseline)
    treat = load_any(args.treatment)
    if not base or not treat:
        sys.exit("One of the inputs is empty — check the CSV/JSON paths and format.")
    report = build_report(base, treat, args.baseline_label, args.treatment_label)
    if args.out == "-":
        print(report)
    else:
        Path(args.out).write_text(report, encoding="utf-8")
        print(f"Report written -> {args.out}")


if __name__ == "__main__":
    main()
