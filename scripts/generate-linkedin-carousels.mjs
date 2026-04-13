#!/usr/bin/env node
/**
 * WTP2 LinkedIn Carousel Generator v2 — MOBILE-FIRST
 * 4 carousel PDFs (6 slides each) for RE LinkedIn posts
 * Format: 1080×1080px square
 * Design: large fonts, vertically centered, readable at 350px preview
 * Brand: #1A2332 dark bg, #C5A572 gold, Playfair Display + Inter
 */

import puppeteer from 'puppeteer';
import { mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist', 'linkedin-carousels');
const SIZE = 1080;

const b = {
  bg: '#1A2332',
  bgCard: '#253245',
  gold: '#C5A572',
  goldLight: '#D4B98A',
  white: '#FFFFFF',
  ws: 'rgba(255,255,255,0.8)',
  wd: 'rgba(255,255,255,0.45)',
  border: 'rgba(255,255,255,0.1)',
  green: '#5CB85C',
  red: '#E74C3C',
};

// ─── MOBILE-FIRST CSS ───
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}

.s {
  width:${SIZE}px; height:${SIZE}px;
  background:${b.bg};
  color:${b.white};
  font-family:'Inter',sans-serif;
  padding:80px 76px;
  display:flex; flex-direction:column;
  justify-content:center;
  position:relative;
  page-break-after:always;
  overflow:hidden;
}
.s:last-child{page-break-after:auto}

/* Slide variants */
.s-hero {
  background:linear-gradient(160deg, ${b.bg} 0%, #0F1620 60%, #162030 100%);
}
.s-cta {
  background:linear-gradient(160deg, #162030 0%, ${b.bg} 50%, #0F1620 100%);
  align-items:center;
  text-align:center;
}

/* ── Typography — all mobile-readable ── */
h1 {
  font-family:'Playfair Display',serif;
  font-size:76px; font-weight:600;
  line-height:1.08; letter-spacing:-0.02em;
}
h2 {
  font-family:'Playfair Display',serif;
  font-size:56px; font-weight:500;
  line-height:1.12; letter-spacing:-0.01em;
}
.sub {
  font-size:26px; line-height:1.45;
  color:${b.ws}; margin-top:20px;
}
.sm {
  font-size:20px; color:${b.wd}; line-height:1.4;
}

/* ── Tag (compact) ── */
.tag {
  display:inline-block;
  font-size:14px; font-weight:600;
  letter-spacing:0.16em;
  text-transform:uppercase;
  color:${b.gold};
  border:1.5px solid rgba(197,165,114,0.4);
  border-radius:100px;
  padding:8px 22px;
  margin-bottom:28px;
  align-self:flex-start;
}
.s-cta .tag { align-self:center; }

/* ── Gold line ── */
.gl {
  width:56px; height:4px;
  background:${b.gold}; border-radius:2px;
  margin:24px 0;
}
.gl-c { width:56px; height:4px; background:${b.gold}; border-radius:2px; margin:24px auto; }

/* ── Stat ── */
.st {
  font-family:'Playfair Display',serif;
  font-size:96px; font-weight:700;
  color:${b.gold}; line-height:1;
}
.st-l {
  font-size:20px; color:${b.wd}; margin-top:8px;
}

/* ── Data rows ── */
.dr {
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:20px 0;
  border-bottom:1px solid ${b.border};
}
.dr:last-child{border-bottom:none}
.dr .n { font-size:24px; font-weight:400; }
.dr .v {
  font-family:'Playfair Display',serif;
  font-size:34px; font-weight:600; color:${b.gold};
}
.dr .v.gn { color:${b.green}; }

/* ── Bar chart ── */
.br {
  display:flex; align-items:center;
  gap:16px; margin-bottom:18px;
}
.br .bl {
  width:180px; font-size:22px;
  text-align:right; flex-shrink:0;
  color:${b.ws};
}
.br .bt {
  flex:1; height:44px;
  background:${b.bgCard};
  border-radius:8px; overflow:hidden;
}
.br .bf {
  height:100%;
  background:linear-gradient(90deg,${b.gold},${b.goldLight});
  border-radius:8px;
  display:flex; align-items:center;
  justify-content:flex-end;
  padding-right:14px;
  font-size:18px; font-weight:700;
  color:${b.bg};
}

/* ── Cards ── */
.cg {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px; margin-top:24px;
}
.cd {
  background:${b.bgCard};
  border:1px solid ${b.border};
  border-radius:16px;
  padding:28px;
}
.cd-a { border-top:3px solid ${b.gold}; }
.cd h3 { font-size:24px; font-weight:600; margin-bottom:10px; }
.cd p { font-size:20px; color:${b.ws}; line-height:1.4; }

/* ── Numbered list ── */
.nl { list-style:none; }
.nl li {
  display:flex; align-items:flex-start;
  gap:20px; margin-bottom:24px;
}
.nd {
  flex-shrink:0; width:44px; height:44px;
  border-radius:50%; background:${b.gold};
  color:${b.bg}; font-weight:700; font-size:20px;
  display:flex; align-items:center; justify-content:center;
}
.nt h4 { font-size:24px; font-weight:600; margin-bottom:4px; }
.nt p { font-size:20px; color:${b.ws}; line-height:1.35; }

/* ── Alert block ── */
.ab {
  background:${b.bgCard};
  border-radius:0 16px 16px 0;
  padding:32px 36px;
  margin-bottom:20px;
}
.ab h3 { font-size:24px; margin-bottom:10px; }
.ab p { font-size:22px; color:${b.ws}; line-height:1.4; }

/* ── Two-col ── */
.tc { display:grid; grid-template-columns:1fr 1fr; gap:36px; }
.ci {
  display:flex; align-items:flex-start;
  gap:12px; margin-bottom:14px;
  font-size:20px; line-height:1.35; color:${b.ws};
}
.ip { color:${b.green}; font-weight:700; font-size:22px; flex-shrink:0; }
.ic { color:${b.red}; font-weight:700; font-size:22px; flex-shrink:0; }

/* ── CTA button ── */
.cta {
  display:inline-block;
  padding:20px 52px;
  border:2px solid ${b.gold};
  border-radius:100px;
  color:${b.gold};
  font-size:22px; font-weight:600;
  letter-spacing:0.04em;
  margin-top:28px;
}

/* ── Footer ── */
.ft {
  position:absolute; bottom:0; left:0; right:0;
  padding:22px 76px;
  display:flex; justify-content:space-between;
  align-items:center;
  font-size:16px; color:${b.wd};
  border-top:1px solid ${b.border};
}
.fb {
  font-family:'Playfair Display',serif;
  font-weight:600; font-size:18px;
  color:${b.gold}; letter-spacing:0.05em;
}

/* ── Country row ── */
.cr {
  padding:22px 0;
  border-bottom:1px solid ${b.border};
}
.cr:last-child{border-bottom:none}
.cr .flag { font-size:26px; font-weight:600; margin-bottom:6px; }
.cr p { font-size:21px; color:${b.ws}; line-height:1.35; }

/* ── Verdict row ── */
.vr {
  padding:22px 0;
  border-bottom:1px solid ${b.border};
}
.vr:last-child{border-bottom:none}
.vr h3 { font-size:26px; color:${b.gold}; font-weight:600; margin-bottom:4px; }
.vr p { font-size:21px; color:${b.wd}; }

/* ── Best-for box ── */
.bf-box {
  background:${b.bgCard}; border-radius:12px;
  padding:20px 24px; margin-top:20px;
}
.bf-box p { font-size:20px; color:${b.gold}; }
`;

// ─── Carousel 1.2: RAK Growth Story ───
const C1 = `
<div class="s s-hero">
  <span class="tag">Market Data</span>
  <h1>RAK Property:<br>+47% YoY</h1>
  <div class="gl"></div>
  <p class="sub">Wynn Casino is only the beginning.<br>Dubai Marina investors are paying attention.</p>
  <div style="display:flex;gap:48px;margin-top:48px;">
    <div><div class="st">+47%</div><div class="st-l">Price Growth YoY</div></div>
    <div><div class="st" style="font-size:72px;">8-12%</div><div class="st-l">Rental Yield</div></div>
  </div>
  <div class="ft"><span class="fb">WTP</span><span>realestate.wtp.ae</span></div>
</div>

<div class="s">
  <span class="tag">Price History</span>
  <h2>Al Marjan Island<br>AED per sqft</h2>
  <div class="gl"></div>
  <div style="margin-top:24px;">
    <div class="br"><div class="bl">2023</div><div class="bt"><div class="bf" style="width:53%">850</div></div></div>
    <div class="br"><div class="bl">2024</div><div class="bt"><div class="bf" style="width:69%">1,100</div></div></div>
    <div class="br"><div class="bl">2025</div><div class="bt"><div class="bf" style="width:78%">1,250</div></div></div>
    <div class="br"><div class="bl">2026 (est.)</div><div class="bt"><div class="bf" style="width:100%">1,600</div></div></div>
  </div>
  <div class="ft"><span class="fb">WTP</span><span>realestate.wtp.ae</span></div>
</div>

<div class="s">
  <span class="tag">Catalyst</span>
  <h2>The Wynn Effect</h2>
  <div class="gl"></div>
  <p class="sub" style="margin-bottom:32px;">$3.9B casino resort opening 2027</p>
  <ul class="nl">
    <li><div class="nd">1</div><div class="nt"><h4>+30-40% Price Growth</h4><p>In adjacent zones before and after opening</p></div></li>
    <li><div class="nd">2</div><div class="nt"><h4>Tourism Boom</h4><p>Holiday rental surge. Airbnb occupancy at 78%</p></div></li>
    <li><div class="nd">3</div><div class="nt"><h4>Infrastructure Upgrade</h4><p>Roads, retail, dining — government-backed</p></div></li>
  </ul>
  <div class="ft"><span class="fb">WTP</span><span>realestate.wtp.ae</span></div>
</div>

<div class="s">
  <span class="tag">Comparison</span>
  <h2>Rental Yields:<br>RAK vs Dubai</h2>
  <div class="gl"></div>
  <div>
    <div class="dr"><span class="n">RAK Holiday Homes</span><span class="v">8-12%</span></div>
    <div class="dr"><span class="n">Expo City</span><span class="v" style="color:${b.ws}">6.8%</span></div>
    <div class="dr"><span class="n">JVC</span><span class="v" style="color:${b.ws}">6.5%</span></div>
    <div class="dr"><span class="n">Business Bay</span><span class="v" style="color:${b.ws}">5.5%</span></div>
    <div class="dr"><span class="n">Dubai Marina</span><span class="v" style="color:${b.ws}">5.1%</span></div>
  </div>
  <div class="ft"><span class="fb">WTP</span><span>realestate.wtp.ae</span></div>
</div>

<div class="s">
  <span class="tag">Why RAK Now</span>
  <h2>The Window<br>Is Closing</h2>
  <div class="gl"></div>
  <div class="cg">
    <div class="cd cd-a"><h3>Under-Radar</h3><p>90% of investors still focus on Dubai only</p></div>
    <div class="cd cd-a"><h3>Entry Price</h3><p>600K-1.2M AED vs 1.5M+ in Dubai</p></div>
    <div class="cd cd-a"><h3>Pre-Wynn</h3><p>+30-40% jump when casino opens 2027</p></div>
    <div class="cd cd-a"><h3>Banking-First</h3><p>We pre-screen eligibility before you commit</p></div>
  </div>
  <div class="ft"><span class="fb">WTP</span><span>realestate.wtp.ae</span></div>
</div>

<div class="s s-cta">
  <span class="tag">Free Report</span>
  <h2>Want the Full RAK<br>Investment Report?</h2>
  <div class="gl-c"></div>
  <p class="sub" style="text-align:center">Data, developer analysis, risk assessment,<br>and banking pre-screen.</p>
  <div class="cta">Get the Report &rarr;</div>
  <p class="sm" style="margin-top:24px">DM me or visit realestate.wtp.ae</p>
  <div class="ft" style="justify-content:center;gap:28px"><span class="fb">WTP</span><span>#BankingFirstMethod</span></div>
</div>
`;

// ─── Carousel 2.3: Banking Problems ───
const C2 = `
<div class="s s-hero">
  <span class="tag">The Hidden Risk</span>
  <div style="margin-bottom:40px;">
    <div class="st" style="font-size:120px;">40%</div>
    <div class="st-l" style="font-size:24px;margin-top:12px;">of foreign buyers face banking<br>problems AFTER purchase</div>
  </div>
  <div class="gl"></div>
  <p class="sub">You sign, transfer the deposit — then<br>discover you can't open a bank account.</p>
  <div class="ft"><span class="fb">WTP</span><span>realestate.wtp.ae</span></div>
</div>

<div class="s">
  <span class="tag">Problem 1</span>
  <h2>Source of Funds<br>Rejected</h2>
  <div class="gl"></div>
  <div class="ab" style="border-left:4px solid ${b.red};">
    <h3 style="color:${b.red}">What Happens</h3>
    <p>Your wealth is legitimate. But documentation isn't formatted for UAE compliance. Bank rejects.</p>
  </div>
  <div class="ab" style="border-left:4px solid ${b.gold};">
    <h3 style="color:${b.gold}">Result</h3>
    <p>Deposit locked. Seller impatient. You scramble to reformat while the clock ticks.</p>
  </div>
  <div class="ft"><span class="fb">WTP</span><span>realestate.wtp.ae</span></div>
</div>

<div class="s">
  <span class="tag">Problem 2</span>
  <h2>Jurisdictional<br>Risk Flag</h2>
  <div class="gl"></div>
  <div class="ab" style="border-left:4px solid ${b.red};">
    <h3 style="color:${b.red}">What Happens</h3>
    <p>You're from a jurisdiction banks consider higher risk — even if fully compliant. No agent warned you.</p>
  </div>
  <div class="ab" style="border-left:4px solid ${b.gold};">
    <h3 style="color:${b.gold}">Result</h3>
    <p>Bank declines. Property can't be funded. Deposit at risk. Legal costs pile up.</p>
  </div>
  <div class="ft"><span class="fb">WTP</span><span>realestate.wtp.ae</span></div>
</div>

<div class="s">
  <span class="tag">Problem 3</span>
  <h2>Business Activity<br>Mismatch</h2>
  <div class="gl"></div>
  <div class="ab" style="border-left:4px solid ${b.red};">
    <h3 style="color:${b.red}">What Happens</h3>
    <p>Income from crypto, forex, or consulting — industries UAE banks scrutinize heavily.</p>
  </div>
  <div class="ab" style="border-left:4px solid ${b.gold};">
    <h3 style="color:${b.gold}">Result</h3>
    <p>You didn't know to structure around it. Application denied. Deal collapses.</p>
  </div>
  <div class="ft"><span class="fb">WTP</span><span>realestate.wtp.ae</span></div>
</div>

<div class="s">
  <span class="tag">The Solution</span>
  <h2>Banking Pre-Screen<br>Before You Sign</h2>
  <div class="gl"></div>
  <ul class="nl">
    <li><div class="nd">1</div><div class="nt"><h4>SOF Review</h4><p>Format documentation for UAE standards</p></div></li>
    <li><div class="nd">2</div><div class="nt"><h4>Risk Check</h4><p>Identify red flags, structure around them</p></div></li>
    <li><div class="nd">3</div><div class="nt"><h4>Bank Matching</h4><p>Match your profile to the right UAE bank</p></div></li>
    <li><div class="nd">4</div><div class="nt"><h4>Structure First</h4><p>Optimize ownership before proceeding</p></div></li>
  </ul>
  <div class="ft"><span class="fb">WTP</span><span>realestate.wtp.ae</span></div>
</div>

<div class="s s-cta">
  <span class="tag">Free Pre-Screen</span>
  <h2>Get Your Banking<br>Risk Verdict</h2>
  <div class="gl-c"></div>
  <p class="sub" style="text-align:center">5 questions. 48 hours. No cost.</p>
  <div class="cta">Start Pre-Screen &rarr;</div>
  <p class="sm" style="margin-top:24px">DM me or visit realestate.wtp.ae</p>
  <div class="ft" style="justify-content:center;gap:28px"><span class="fb">WTP</span><span>#BankingFirstMethod</span></div>
</div>
`;

// ─── Carousel 3.3: ROI Reality Check ───
const C3 = `
<div class="s s-hero">
  <span class="tag">ROI Reality</span>
  <h1>Dubai Property:<br>The Real ROI</h1>
  <div class="gl"></div>
  <div style="margin-top:40px;display:flex;gap:56px;">
    <div>
      <div class="st" style="font-size:80px;text-decoration:line-through;color:${b.red};">8-10%</div>
      <div class="st-l" style="font-size:22px;">Advertised</div>
    </div>
    <div>
      <div class="st" style="font-size:80px;">4-6%</div>
      <div class="st-l" style="font-size:22px;">Actual (typical)</div>
    </div>
  </div>
  <div class="ft"><span class="fb">WTP</span><span>realestate.wtp.ae</span></div>
</div>

<div class="s">
  <span class="tag">Rental Yield</span>
  <h2>Where the Yield<br>Actually Is</h2>
  <div class="gl"></div>
  <div style="margin-top:20px;">
    <div class="br"><div class="bl">RAK</div><div class="bt"><div class="bf" style="width:82%">8.2%</div></div></div>
    <div class="br"><div class="bl">Expo City</div><div class="bt"><div class="bf" style="width:68%">6.8%</div></div></div>
    <div class="br"><div class="bl">JVC</div><div class="bt"><div class="bf" style="width:65%">6.5%</div></div></div>
    <div class="br"><div class="bl">Business Bay</div><div class="bt"><div class="bf" style="width:55%">5.5%</div></div></div>
    <div class="br"><div class="bl">Marina</div><div class="bt"><div class="bf" style="width:51%">5.1%</div></div></div>
    <div class="br"><div class="bl">Downtown</div><div class="bt"><div class="bf" style="width:48%">4.8%</div></div></div>
  </div>
  <div class="ft"><span class="fb">WTP</span><span>realestate.wtp.ae</span></div>
</div>

<div class="s">
  <span class="tag">3-Year Growth</span>
  <h2>Capital Appreciation<br>2022-2025</h2>
  <div class="gl"></div>
  <div>
    <div class="dr"><span class="n">RAK</span><span class="v gn">+47%</span></div>
    <div class="dr"><span class="n">Expo City</span><span class="v gn">+28%</span></div>
    <div class="dr"><span class="n">JVC</span><span class="v gn">+22%</span></div>
    <div class="dr"><span class="n">Business Bay</span><span class="v gn">+18%</span></div>
    <div class="dr"><span class="n">Downtown</span><span class="v gn">+15%</span></div>
    <div class="dr"><span class="n">Marina</span><span class="v gn">+12%</span></div>
  </div>
  <div class="ft"><span class="fb">WTP</span><span>realestate.wtp.ae</span></div>
</div>

<div class="s">
  <span class="tag">Hidden Costs</span>
  <h2>What Eats<br>Your ROI</h2>
  <div class="gl"></div>
  <div class="cg">
    <div class="cd"><h3 style="color:${b.gold}">Service Charges</h3><p>8-15 AED/sqft/year</p></div>
    <div class="cd"><h3 style="color:${b.gold}">Maintenance</h3><p>2-4% of value over 5 years</p></div>
    <div class="cd"><h3 style="color:${b.gold}">Vacancy</h3><p>1-2 months/year empty</p></div>
    <div class="cd"><h3 style="color:${b.gold}">Management</h3><p>5-8% of rental income</p></div>
  </div>
  <div class="ft"><span class="fb">WTP</span><span>realestate.wtp.ae</span></div>
</div>

<div class="s">
  <span class="tag">WTP Verdict</span>
  <h2>What the Data<br>Tells Us</h2>
  <div class="gl"></div>
  <div>
    <div class="vr"><h3>Highest Yield: RAK</h3><p>Holiday home model. Higher risk, higher reward.</p></div>
    <div class="vr"><h3>Best Growth: RAK + JVC</h3><p>Wynn effect + affordable entry.</p></div>
    <div class="vr"><h3>Safest: Expo City</h3><p>Government-backed. Stable. Predictable.</p></div>
    <div class="vr"><h3>Overhyped: Marina</h3><p>Good, but fully priced in.</p></div>
  </div>
  <div class="ft"><span class="fb">WTP</span><span>realestate.wtp.ae</span></div>
</div>

<div class="s s-cta">
  <span class="tag">Full Report</span>
  <h2>ROI Models for<br>Your Risk Profile</h2>
  <div class="gl-c"></div>
  <div style="display:flex;gap:40px;margin-top:16px;">
    <div style="text-align:center"><p style="font-size:26px;color:${b.gold};font-weight:600;">Conservative</p><p class="sm">Expo City, 6-7%</p></div>
    <div style="text-align:center"><p style="font-size:26px;color:${b.gold};font-weight:600;">Balanced</p><p class="sm">JVC, growth</p></div>
    <div style="text-align:center"><p style="font-size:26px;color:${b.gold};font-weight:600;">Aggressive</p><p class="sm">RAK, 8%+</p></div>
  </div>
  <div class="cta">Get ROI Report &rarr;</div>
  <p class="sm" style="margin-top:24px">6 areas. 10-year projections. Link in comments.</p>
  <div class="ft" style="justify-content:center;gap:28px"><span class="fb">WTP</span><span>#BankingFirstMethod</span></div>
</div>
`;

// ─── Carousel 4.3: LLC vs Personal ───
const C4 = `
<div class="s s-hero">
  <span class="tag">Structure Guide</span>
  <h1>LLC vs Personal<br>Ownership</h1>
  <div class="gl"></div>
  <p class="sub">Most buyers default to personal name.<br>Sometimes right. Often costly.</p>
  <div style="display:flex;gap:48px;margin-top:48px;align-items:center;">
    <div><div class="st" style="font-size:56px">Personal</div><div class="st-l">Simpler</div></div>
    <div style="font-family:'Playfair Display',serif;font-size:56px;color:${b.wd};opacity:0.5;">vs</div>
    <div><div class="st" style="font-size:56px">LLC</div><div class="st-l">Optimal</div></div>
  </div>
  <div class="ft"><span class="fb">WTP</span><span>realestate.wtp.ae</span></div>
</div>

<div class="s">
  <span class="tag">Personal Name</span>
  <h2>Option A:<br>Personal Ownership</h2>
  <div class="gl"></div>
  <div class="tc">
    <div>
      <h3 style="color:${b.green};font-size:26px;margin-bottom:18px;">Pros</h3>
      <div class="ci"><span class="ip">+</span><span>No company setup needed</span></div>
      <div class="ci"><span class="ip">+</span><span>Golden Visa eligible (2M+ AED)</span></div>
      <div class="ci"><span class="ip">+</span><span>Lower upfront cost</span></div>
      <div class="ci"><span class="ip">+</span><span>Faster transaction</span></div>
    </div>
    <div>
      <h3 style="color:${b.red};font-size:26px;margin-bottom:18px;">Cons</h3>
      <div class="ci"><span class="ic">&minus;</span><span>May trigger exit tax</span></div>
      <div class="ci"><span class="ic">&minus;</span><span>Probate complications</span></div>
      <div class="ci"><span class="ic">&minus;</span><span>No corporate banking</span></div>
      <div class="ci"><span class="ic">&minus;</span><span>Hard to scale</span></div>
    </div>
  </div>
  <div class="bf-box"><p>Best for: UK investors, Golden Visa priority</p></div>
  <div class="ft"><span class="fb">WTP</span><span>realestate.wtp.ae</span></div>
</div>

<div class="s">
  <span class="tag">UAE LLC</span>
  <h2>Option B:<br>LLC Ownership</h2>
  <div class="gl"></div>
  <div class="tc">
    <div>
      <h3 style="color:${b.green};font-size:26px;margin-bottom:18px;">Pros</h3>
      <div class="ci"><span class="ip">+</span><span>Reduce/defer exit tax</span></div>
      <div class="ci"><span class="ip">+</span><span>Easy estate transfer</span></div>
      <div class="ci"><span class="ip">+</span><span>Corporate banking</span></div>
      <div class="ci"><span class="ip">+</span><span>Multi-property entity</span></div>
    </div>
    <div>
      <h3 style="color:${b.red};font-size:26px;margin-bottom:18px;">Cons</h3>
      <div class="ci"><span class="ic">&minus;</span><span>Setup: 15-25K AED</span></div>
      <div class="ci"><span class="ic">&minus;</span><span>Renewals: 8-12K/year</span></div>
      <div class="ci"><span class="ic">&minus;</span><span>Complex corporate KYC</span></div>
      <div class="ci"><span class="ic">&minus;</span><span>Ongoing maintenance</span></div>
    </div>
  </div>
  <div class="bf-box"><p>Best for: German investors, multi-property, estate planning</p></div>
  <div class="ft"><span class="fb">WTP</span><span>realestate.wtp.ae</span></div>
</div>

<div class="s">
  <span class="tag">By Country</span>
  <h2>Tax Impact by<br>Jurisdiction</h2>
  <div class="gl"></div>
  <div>
    <div class="cr"><div class="flag">UK</div><p>Personal name fine. No exit tax. Non-dom regime ended — UAE now more attractive.</p></div>
    <div class="cr"><div class="flag">Germany</div><p>LLC can defer Wegzugsteuer. Personal may trigger exit tax. Get tax advice.</p></div>
    <div class="cr"><div class="flag">Netherlands</div><p>Box 3 tax either way. LLC offers flexibility. Full relocation needed.</p></div>
    <div class="cr"><div class="flag">United States</div><p>Worldwide income tax. LLC often better. FATCA applies to both.</p></div>
  </div>
  <div class="ft"><span class="fb">WTP</span><span>realestate.wtp.ae</span></div>
</div>

<div class="s">
  <span class="tag">WTP Process</span>
  <h2>We Model Both<br>Before You Sign</h2>
  <div class="gl"></div>
  <ul class="nl">
    <li><div class="nd">1</div><div class="nt"><h4>Your Tax Rules</h4><p>Home country implications for each structure</p></div></li>
    <li><div class="nd">2</div><div class="nt"><h4>Side-by-Side Model</h4><p>Personal vs LLC with your real numbers</p></div></li>
    <li><div class="nd">3</div><div class="nt"><h4>10-Year Cost</h4><p>Setup, renewals, tax delta — full picture</p></div></li>
    <li><div class="nd">4</div><div class="nt"><h4>Decide, Then Sign</h4><p>Structure locked before SPA, not after</p></div></li>
  </ul>
  <div class="ft"><span class="fb">WTP</span><span>realestate.wtp.ae</span></div>
</div>

<div class="s s-cta">
  <span class="tag">Free Consultation</span>
  <h2>Get a Structure<br>Consultation</h2>
  <div class="gl-c"></div>
  <p class="sub" style="text-align:center">We model both options for your<br>jurisdiction, property, and goals.</p>
  <div class="cta">Book a Call &rarr;</div>
  <p class="sm" style="margin-top:24px">DM me or visit realestate.wtp.ae</p>
  <div class="ft" style="justify-content:center;gap:28px"><span class="fb">WTP</span><span>#BankingFirstMethod</span></div>
</div>
`;

// ─── Generate ───
async function gen(name, slides, browser) {
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>${CSS}</style></head><body>${slides}</body></html>`;

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: join(DIST, `${name}.pdf`),
    width: `${SIZE}px`, height: `${SIZE}px`,
    printBackground: true, preferCSSPageSize: true,
  });

  await page.setViewport({ width: SIZE, height: SIZE });
  await page.screenshot({
    path: join(DIST, `${name}_preview.png`),
    clip: { x: 0, y: 0, width: SIZE, height: SIZE },
  });

  const n = (slides.match(/class="s[\s"]/g) || []).length;
  console.log(`  ✓ ${name}: ${n} slides`);
  await page.close();
}

async function main() {
  if (!existsSync(DIST)) mkdirSync(DIST, { recursive: true });
  console.log('WTP LinkedIn Carousel Generator v2 (mobile-first)\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const [name, html] of [
    ['carousel_1.2_RAK_Growth', C1],
    ['carousel_2.3_Banking_Problems', C2],
    ['carousel_3.3_ROI_Reality', C3],
    ['carousel_4.3_LLC_vs_Personal', C4],
  ]) await gen(name, html, browser);

  await browser.close();
  console.log('\nDone!');
}

main().catch(e => { console.error(e); process.exit(1); });
