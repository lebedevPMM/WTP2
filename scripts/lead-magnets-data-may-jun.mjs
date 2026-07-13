// 17 WTP lead-magnet doc definitions for May-Jun 2026 LinkedIn campaign (SHIP v4)
// PDPL-compliant: every cited regulation is public; no internal datasets, no client cases.
// Voice rules: 0 exclamations, 0 banned buzzwords, "what we check / common mistake / how to prepare" structure.

export const docs = [
  // ─────────────────────────────────────────────────────────────
  // POST 1 — OFFPLAN (wtpbrokers, W1.Mon)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'OFFPLAN',
    accent: '#8b6f47',
    title: 'Off-Plan vs Ready: The Bank-File Reading',
    subtitle: 'Four axes the bank reviews when the property is off-plan, not ready.',
    items: [
      {
        num: '01',
        title: 'Source of Funds Across the Payment Schedule',
        check: 'Whether SoF documentation covers the full off-plan payment schedule, often 3 to 5 years out. Banks read the schedule, not just the deposit.',
        mistake: 'Submitting SoF only for the deposit and the next two milestones. Compliance returns the file for the remaining payments.',
        prepare: 'Map every staged payment against documented funds. If a future payment depends on a planned liquidity event, document the basis in the file before submission.',
      },
      {
        num: '02',
        title: 'Mortgage Availability on Off-Plan',
        check: 'Whether the buyer expects mortgage financing on the off-plan. Most non-resident mortgage products do not cover off-plan; the file is treated as cash until handover.',
        mistake: 'Assuming a non-resident mortgage will be available at handover under the same LTV that applies to ready property today.',
        prepare: 'Confirm mortgage availability with the target bank for the actual handover window, not the current quarter. LTV ceilings sit at 50-65% for non-residents on ready stock; off-plan rules vary per bank.',
      },
      {
        num: '03',
        title: 'Post-Dated Cheque Acceptance Window',
        check: 'Whether the payment plan assumes post-dated cheques and the issuing bank still accepts them past the 24-month window. Many UAE banks no longer post-date cheques beyond 24 months.',
        mistake: 'Signing a 36-60 month payment plan against an account where the bank cuts cheque acceptance at month 24, breaking the schedule mid-cycle.',
        prepare: 'Confirm the bank\'s current post-dated cheque acceptance window before signing the SPA. If the cheque path closes mid-schedule, plan the funding route before commitment.',
      },
      {
        num: '04',
        title: 'Substance Clock and Handover Delays',
        check: 'Whether the buyer relies on the property as substance evidence and when the substance clock starts. Year-2 substance counts from title transfer, not SPA signing.',
        mistake: 'Counting off-plan ownership as substance from the SPA date. Handover delays push the clock and undermine the substance file at FTA review.',
        prepare: 'Identify the substance role of the property before purchase. If substance depends on title, factor handover risk into the operational plan and document an interim substance position.',
      },
    ],
    cta: 'If a current off-plan file is at the bank-readiness stage, message us back and we will review the four axes in 48 hours.',
  },

  // ─────────────────────────────────────────────────────────────
  // POST 2 — TAXRES (CEO, W1.Tue)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'TAXRES',
    accent: '#b8860b',
    title: '2026 Tax Domicile Certificate: Eligibility Paths',
    subtitle: 'Two FTA-published paths to UAE tax residency and the documentation gates each one runs against.',
    items: [
      {
        num: '01',
        title: 'Path A — 183-Day Physical Presence',
        check: 'Whether the applicant has spent 183 days or more inside the UAE during a 12-month period. Day count is calendar-day based and verifiable from entry-exit records.',
        mistake: 'Counting partial days inconsistently or relying on an estimate. The FTA crosschecks against ICA entry-exit data.',
        prepare: 'Pull the official entry-exit report from the ICA app. Confirm 183 days are documented inside the financial year claimed. If days fall short, Path B may qualify earlier.',
      },
      {
        num: '02',
        title: 'Path B — 90 Days Plus Economic Tie',
        check: 'Whether the applicant has spent 90 days or more in the UAE in the financial year, plus an economic tie: employment, business ownership, or a permanent home in the UAE.',
        mistake: 'Treating Path B as a soft fallback. The FTA requires evidence of the economic tie — employment contract, trade licence with substance, or a leased permanent residence.',
        prepare: 'Document the economic tie before applying: Emirates ID, lease of at least 6 months, payroll or business income evidence. The TDC is processed against the strongest documented path.',
      },
      {
        num: '03',
        title: 'Documentation Pack for FTA Submission',
        check: 'Whether the documentation pack is complete: passport, Emirates ID, lease, salary or business income evidence, UAE bank statements showing local economic activity, and entry-exit report.',
        mistake: 'Submitting with a UAE bank statement that shows no operating flow, only inbound capital. Compliance flags the file as residency without substance.',
        prepare: 'Ensure UAE bank statements show local outflows: rent, utilities, payroll, daily spending. Inbound-only statements weaken Path B claims.',
      },
      {
        num: '04',
        title: 'Personal TDC vs Corporate Tax Residency',
        check: 'Whether the applicant understands that a personal TDC does not carry corporate-tax residency for a UAE operating company. The OpCo files its own position under Corporate Tax 2026 rules.',
        mistake: 'Assuming a personal TDC shields the OpCo from CT2026 filing or treaty exposure. The two regimes read separately.',
        prepare: 'Map the personal TDC against the OpCo CT2026 position. If the OpCo claims QFZP or Small Business Relief, document the corporate position independently of the personal TDC.',
      },
      {
        num: '05',
        title: 'Processing Window and Validity',
        check: 'Whether the FTA processing window (approximately 30 days from a clean file) aligns with the home-jurisdiction filing deadline that needs the TDC.',
        mistake: 'Applying for the TDC after the home-jurisdiction filing deadline has passed. Processing time and a documentation request can push the issuance window past 60 days.',
        prepare: 'Submit at least 60 days before the home-jurisdiction deadline. Renewal is annual; calendar the next renewal at issuance to avoid lapses.',
      },
    ],
    cta: 'Reference: FTA Tax Domicile Certificate published guidance. Send the file outline back and we will mark the strongest path in 48 hours.',
  },

  // ─────────────────────────────────────────────────────────────
  // POST 3 — MATRIX (CEO carousel, W1.Wed)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'MATRIX',
    accent: '#1a3a5c',
    title: '4-Jurisdiction Tax Residency Reset Matrix',
    subtitle: 'The exit-tail map for HNWI relocators leaving UK, Germany, the Netherlands, and Russia for the UAE.',
    items: [
      {
        num: '01',
        title: 'United Kingdom — Post-Non-Dom Residence-Based Regime',
        check: 'Whether the leaver is inside the new residence-based regime that replaced Non-Dom on 6 April 2025. The 4-year FIG (Foreign Income and Gains) window runs from the start of UK residence, and the long-term residence inheritance tax framework applies on the separate clock.',
        mistake: 'Planning the UAE move as if Non-Dom protection still applies. The replacement regime has different timing gates.',
        prepare: 'Confirm UK residence start and end dates against the statutory residence test. Map the FIG election window. Coordinate with UK counsel on the IHT residence clock before the move.',
      },
      {
        num: '02',
        title: 'Germany — Wegzugsteuer on Substantial Shareholdings',
        check: 'Whether the leaver holds 1% or more of a corporation anywhere in the world. Under §6 Außensteuergesetz, exit triggers a deemed realisation on the unrealised gain. A 7-year temporary-absence rule may unwind the tax if the move is documented as non-permanent.',
        mistake: 'Treating the UAE move as outside Wegzugsteuer scope because UAE is non-EU. The 2022 reform tightened the rules for non-EU moves.',
        prepare: 'Inventory shareholdings at 1% and above. Document the move type (permanent vs temporary) and the planned return window if relevant. Coordinate with German tax counsel before exit.',
      },
      {
        num: '03',
        title: 'Netherlands — Box 3 Transitional Plus 10-Year IHT Tail',
        check: 'Whether the leaver is exposed to Box 3 transitional-regime mechanics on exit and to the 10-year Dutch inheritance tax tail for citizens. Both run independently of UAE residency.',
        mistake: 'Moving assets before the Dutch filing reset. The Belastingdienst taxes the transfer; the UAE taxes nothing yet; the client pays twice.',
        prepare: 'Document the residency-break date for social security and KvK. File the exit-year Dutch position cleanly before restructuring investment vehicles.',
      },
      {
        num: '04',
        title: 'Russia — 183-Day Rule and Currency Control',
        check: 'Whether the leaver maintains under 183 days of physical presence in Russia in the calendar year to break tax residency. Outbound flows remain subject to the active currency control regime regardless of residency.',
        mistake: 'Resetting residency without sequencing outbound transfers correctly. Currency control violations carry separate exposure from tax residency status.',
        prepare: 'Document day-count by calendar year. Sequence outbound flows before residency reset where the regime allows. Coordinate with Russian counsel on currency-control reporting.',
      },
      {
        num: '05',
        title: 'UAE Entry — TDC and Substance Sequence',
        check: 'Whether the UAE entry sequence supports the home-jurisdiction exit position. The UAE TDC issues approximately 30 days from a clean file and requires Emirates ID, lease, and economic activity evidence.',
        mistake: 'Booking the UAE TDC before the home-jurisdiction reset is documented. The TDC then sits in the file without the corresponding exit position to anchor it.',
        prepare: 'Sequence the exit reset first, then the UAE TDC application. The structuring work that decides the outcome happens before the client lands.',
      },
    ],
    cta: 'Send the origin jurisdiction and the planned UAE entry date — we will return the sequence map in 48 hours.',
  },

  // ─────────────────────────────────────────────────────────────
  // POST 4 — UKFIG (CEO, W1.Thu)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'UKFIG',
    accent: '#3a5f7d',
    title: 'UK FIG Regime → UAE: Sequencing Brief',
    subtitle: 'The 4-year Foreign Income and Gains window, the Year-5 cliff, and the residence-based IHT clock.',
    items: [
      {
        num: '01',
        title: 'FIG Window Eligibility and Election',
        check: 'Whether the client qualifies for the FIG regime introduced from April 2025. Eligibility runs from the start of UK residence, with the 4-year window opt-in per tax year and per category (income, gains).',
        mistake: 'Treating FIG as automatic. The election is per year and per category, and missing the election forfeits the year.',
        prepare: 'Calendar the election deadline for each FIG year. Document the income and gains by category, with the election made or declined recorded in the file.',
      },
      {
        num: '02',
        title: 'Year-5 Cliff and Worldwide Income',
        check: 'Whether the client has a structuring plan for the year after the FIG window closes. From Year 5, the same client is taxed on worldwide income at standard UK rates with no separate shelter.',
        mistake: 'Planning the UAE move only after the FIG window closes. The structuring window is the period before the cliff, not after.',
        prepare: 'Map the cliff date for each client by tax year. If a UAE move is in scope, plan the residency break before Year 5, not as a reaction to the Year-5 filing.',
      },
      {
        num: '03',
        title: 'Residence-Based Inheritance Tax Clock',
        check: 'Whether the client tracks the parallel inheritance tax clock under the long-term residence framework. UK exposure on worldwide assets applies once the long-term residence threshold is met, with a tail period after departure.',
        mistake: 'Treating UAE residency as the cut-off for UK IHT. The IHT clock runs on the residence framework, not on UAE entry alone.',
        prepare: 'Document the long-term residence date for the client. If the threshold has been crossed, plan the post-departure tail in coordination with UK estate counsel.',
      },
      {
        num: '04',
        title: 'UAE Entry Sequence Before Year 5',
        check: 'Whether the UAE side is ready to receive the client before the FIG window closes. UAE TDC and substance can be built inside the FIG window; doing so after the cliff complicates the position.',
        mistake: 'Waiting until the Year-5 filing to begin UAE setup. Substance, TDC, and banking lines take months to build, and the home-jurisdiction position locks faster than the UAE side opens.',
        prepare: 'Map the UAE setup timeline against the FIG cliff date. Sequence Emirates ID, lease, business setup, and TDC inside the FIG window where the timeline allows.',
      },
    ],
    cta: 'Reference: HMRC FIG regime guidance and Finance Act 2025. Send the UK residence start date and we will return the cliff calendar in 48 hours.',
  },

  // ─────────────────────────────────────────────────────────────
  // POST 5 — QFZP (WtP, W1.Fri)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'QFZP',
    accent: '#2c4a3f',
    title: 'QFZP Qualifying Income: Decision Tree',
    subtitle: 'What "qualifying income" actually covers under FTA Cabinet Decision 100/2023 and Ministerial Decision 265/2023.',
    items: [
      {
        num: '01',
        title: 'Free Zone Status and Adequate Substance',
        check: 'Whether the entity holds a valid free zone licence and maintains adequate substance — core income-generating activities, qualified staff, premises, and expenditure proportionate to the activity.',
        mistake: 'Maintaining a free zone licence without operational substance behind it. Substance failure disqualifies QFZP status regardless of income mix.',
        prepare: 'Document substance per activity: headcount, premises, operating expenditure. Substance must be in place during the relevant tax period, not built retrospectively.',
      },
      {
        num: '02',
        title: 'Qualifying Income Categories',
        check: 'Whether each revenue stream falls within the published qualifying activities list. Transactions with other free zone persons, qualifying activities defined in the Ministerial Decision, and ownership income from beneficial recipients are the typical qualifying categories.',
        mistake: 'Assuming any income earned by a free zone licensee is automatically qualifying. The qualifying activities list is narrower than the licence wording.',
        prepare: 'Map every revenue stream against the qualifying activities list. Document the category for each stream in the file before year-end.',
      },
      {
        num: '03',
        title: 'Non-Qualifying Income and De Minimis',
        check: 'Whether non-qualifying income (income from a permanent establishment outside the free zone, immovable property outside the free zone, certain IP without substantive R&D in the free zone) stays under the de minimis threshold — the lesser of 5% of total revenue or AED 5 million.',
        mistake: 'Treating the 9% rate as applying only to non-qualifying income. Crossing the de minimis threshold disqualifies the entire entity from QFZP for the period — 9% applies to all income.',
        prepare: 'Track non-qualifying income each quarter. If the year-end forecast approaches de minimis, plan restructuring before period close, not after.',
      },
      {
        num: '04',
        title: 'Permanent Establishment and Immovable Property',
        check: 'Whether the entity has a permanent establishment outside the free zone or earns from immovable property outside the free zone. Both categories are non-qualifying regardless of structure.',
        mistake: 'Booking mainland or outside-FZ revenue through the free zone entity without recognising the PE or immovable-property flag.',
        prepare: 'Identify any mainland sales activity, outside-FZ employee, or non-FZ property income. Route through a separate mainland or holding entity where the structure allows.',
      },
      {
        num: '05',
        title: 'Annual Election and Transfer Pricing',
        check: 'Whether the QFZP election is made annually and supported by transfer pricing documentation for related-party flows. The election is not permanent and must be made each year on the basis of that year\'s activity.',
        mistake: 'Treating QFZP status as a multi-year default. The election must be evaluated each year, and related-party flows need contemporaneous arm\'s length documentation.',
        prepare: 'Calendar the annual election. Maintain transfer pricing documentation for all material related-party transactions within the same period as the election.',
      },
    ],
    cta: 'Reference: FTA Cabinet Decision No. 100 of 2023 + Ministerial Decision No. 265 of 2023. Send the revenue mix and we will return the qualifying income breakdown in 48 hours.',
  },

  // ─────────────────────────────────────────────────────────────
  // POST 6 — DACH (CEO, W2.Mon)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'DACH',
    accent: '#5d4037',
    title: 'German Wegzugsteuer → UAE: Sequencing Brief',
    subtitle: 'The §6 AStG exit-tax mechanics, the 2022 reform tightening, and the 7-year temporary-absence rule.',
    items: [
      {
        num: '01',
        title: 'Shareholding Threshold and Trigger',
        check: 'Whether the leaver holds 1% or more of a corporation anywhere in the world at any point in the five years before exit. The §6 AStG trigger applies on permanent move regardless of jurisdiction of the corporation.',
        mistake: 'Assuming the threshold applies only to German corporations. The rule covers worldwide shareholdings.',
        prepare: 'Inventory all corporate shareholdings at 1% or above across all jurisdictions. Confirm the 5-year look-back period for each holding before exit.',
      },
      {
        num: '02',
        title: 'Permanent Move vs Temporary Absence',
        check: 'Whether the move is documented as permanent (full Wegzugsteuer trigger) or as temporary with intent to return (7-year Rückkehrregelung may unwind the tax). Documentation is decisive.',
        mistake: 'Treating the move as informally temporary. The 7-year rule requires documented intent and an actual return within the window.',
        prepare: 'If a return is plausible, document intent at the time of exit. If the move is permanent, plan the full Wegzugsteuer liability into the exit position.',
      },
      {
        num: '03',
        title: 'Post-2022 Reform — Non-EU Moves',
        check: 'Whether the move falls under the post-2022 stricter regime for non-EU/EEA destinations. UAE moves do not benefit from the indefinite interest-free deferral that previously applied.',
        mistake: 'Planning the UAE move under pre-2022 deferral assumptions. Current rules require either payment or installment treatment on much tighter terms.',
        prepare: 'Confirm the current deferral, installment, and security requirements with German tax counsel. Plan the funding for the Wegzugsteuer liability into the exit cash flow.',
      },
      {
        num: '04',
        title: 'Pre-Exit Restructuring Windows',
        check: 'Whether the structure can be reorganised before exit to change the exit position. Share-class composition, German Family Office wrappers, and gift-or-sale events have different exit consequences.',
        mistake: 'Restructuring after the move. Once exit is filed, most pre-exit options close.',
        prepare: 'Run two scenarios with German counsel: clean exit as-is, and exit after pre-exit restructure. Compare the liability profiles before the exit date is set.',
      },
      {
        num: '05',
        title: 'UAE Coordination Window',
        check: 'Whether the UAE side (TDC, substance, banking) is ready to receive the family before the German exit is filed. UAE residency evidence supports the move documentation on both sides.',
        mistake: 'Filing the German exit before UAE residency is documented. The home-jurisdiction position then sits without corresponding UAE evidence.',
        prepare: 'Sequence Emirates ID, lease, and economic activity evidence to be in place at or before the German exit date. Coordinate with both sides on the calendar.',
      },
    ],
    cta: 'Reference: §6 Außensteuergesetz (AStG) + BMF Anwendungsschreiben. Send the shareholding inventory and we will return the sequencing matrix in 48 hours.',
  },

  // ─────────────────────────────────────────────────────────────
  // POST 7 — DECLINE (CEO, W2.Tue)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'DECLINE',
    accent: '#7d3c3c',
    title: 'Pre-Screen Decision Criteria (Redacted)',
    subtitle: 'Five criteria that turn a file into a Decline at hour 48, not a failure at week 12.',
    items: [
      {
        num: '01',
        title: 'Source of Funds Gap or Cash-Only Narrative',
        check: 'Whether the SoF narrative has a gap greater than 24 months between liquidity events and current funds, or a cash-only history with no banking trail.',
        mistake: 'Building a SoF file around a single event without continuous banking documentation across the gap period.',
        prepare: 'Document continuous SoF coverage. If a gap exists, plan a Fix-First remediation cycle (60-120 days) before opening the mandate.',
      },
      {
        num: '02',
        title: 'Sanctions Adjacency in the Beneficial Chain',
        check: 'Whether any party in the beneficial ownership chain, including counterparties of material transactions, sits within the sanctions adjacency space.',
        mistake: 'Reviewing principals only. Counterparties to material transactions surface in compliance and trigger the same flags.',
        prepare: 'Screen the full beneficial chain and material counterparties before submission. Document the screening result in the file.',
      },
      {
        num: '03',
        title: 'Active Regulator Action or Court Case',
        check: 'Whether the principal or any controlled entity is the subject of active regulator action or a live court case in any jurisdiction.',
        mistake: 'Treating in-progress disputes as resolvable inside the onboarding window. Banks require closure or a documented settlement before the file moves.',
        prepare: 'Disclose active actions at intake. Plan the resolution timeline against the onboarding window or defer the file until closure is documented.',
      },
      {
        num: '04',
        title: 'Prior UAE Bank Rejection Without Remediation',
        check: 'Whether the file has been rejected by a UAE bank previously and arrives at WTP without a remediation plan.',
        mistake: 'Resubmitting the same file to the same banks. The rejection trace stays in the compliance record.',
        prepare: 'Document the rejection cause and the remediation steps taken since. If remediation is incomplete, plan a Fix-First cycle first.',
      },
      {
        num: '05',
        title: 'Sub-30-Day Timeline Expectation',
        check: 'Whether the client expects a sub-30-day onboarding timeline on a structure that requires 8 to 12 weeks of compliance work.',
        mistake: 'Accepting unrealistic timeline expectations to win the file. The mandate then breaks at week 4 when the compliance reality lands.',
        prepare: 'Reset timeline expectations at intake. The Pre-Screen output establishes the realistic window before any mandate is opened.',
      },
    ],
    cta: 'A Decline at hour 48 protects the client from wasted weeks and protects the bank relationship that the next client will need. Send the file outline and we will return the Pre-Screen result in 48 hours.',
  },

  // ─────────────────────────────────────────────────────────────
  // POST 8 — FOUNDATION (WtP, W2.Wed)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'FOUNDATION',
    accent: '#4a5d4f',
    title: 'ADGM Foundation: Bank-Reading Checklist',
    subtitle: 'What the relationship review opens with after the registration certificate is in place.',
    items: [
      {
        num: '01',
        title: 'Account History or Brand-New File',
        check: 'Whether the Foundation has an active account history with inbound flows matching the charter, or arrives at the relationship review with a registration certificate only.',
        mistake: 'Treating ADGM registration as sufficient for institutional banking treatment. Banks expect operational evidence of the Foundation behaving as an institution.',
        prepare: 'Plan the first 6-12 months of Foundation activity before the relationship review. Document inbound flows, distributions, and governance actions in the period.',
      },
      {
        num: '02',
        title: 'Registered Agent Response Discipline',
        check: 'Whether the registered agent answers calls inside the business day, every business day. Banks test this directly during the relationship review window.',
        mistake: 'Selecting a registered agent on cost alone. Response latency is a substance signal for the bank.',
        prepare: 'Confirm the registered agent\'s service-level commitment before mandate. Test response within the first month of registration to surface any latency issues early.',
      },
      {
        num: '03',
        title: 'Charter Alignment with Asset Flow',
        check: 'Whether the asset flow into the Foundation matches what the charter said the Foundation would hold. Banks compare incoming asset classes against the founder\'s stated intent.',
        mistake: 'Drafting the charter as a generic template, then routing assets that do not align. The mismatch flags at relationship review.',
        prepare: 'Draft the charter against the actual asset plan. If asset plans shift, amend the charter before the inflow rather than after.',
      },
      {
        num: '04',
        title: 'Distinction Between Foundation and Personal Wallet',
        check: 'Whether the Foundation runs distinct from the founder\'s personal accounts — separate signatories, separate operating cycles, separate expense categories.',
        mistake: 'Routing personal expenses through the Foundation account. The bank reads this and downgrades the relationship back to private client.',
        prepare: 'Establish operating rules at setup: no personal expenses, distinct signatories, scheduled governance actions. Document the operating rules in the file.',
      },
      {
        num: '05',
        title: 'Year-2 Relationship Review Preparation',
        check: 'Whether the Foundation is positioned to pass the year-2 relationship review at institutional tier, or whether it will quietly downgrade to private client.',
        mistake: 'Treating year 1 as the gate. Year 1 passes most files; year 2 is where institutional tier is earned or lost.',
        prepare: 'Run an internal year-2 review against the bank\'s expected criteria before the bank does. Address gaps before the relationship review window opens.',
      },
    ],
    cta: 'Send the Foundation charter and the first year of activity outline — we will return the bank-readiness review in 48 hours.',
  },

  // ─────────────────────────────────────────────────────────────
  // POST 9 — GOLDEN (RE, W2.Wed)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'GOLDEN',
    accent: '#a8843c',
    title: 'Golden Visa vs Banking: Sequence Checklist',
    subtitle: 'The AED 2M property threshold, the three qualifying conditions, and the separate bank file that follows.',
    items: [
      {
        num: '01',
        title: 'Property Value and Payment Status',
        check: 'Whether the property meets the AED 2M minimum qualifying value and whether it is fully paid, or the mortgage on it is at least AED 2M with an approved bank.',
        mistake: 'Treating any AED 2M+ property as qualifying. Partly-paid property below the mortgage threshold does not qualify.',
        prepare: 'Confirm property value at the date of application. If mortgaged, confirm the outstanding mortgage amount is at least AED 2M and the lender is on the approved list.',
      },
      {
        num: '02',
        title: 'Off-Plan and Approved Developer List',
        check: 'Whether the property is ready or off-plan, and if off-plan, whether the developer sits on the approved list for Golden Visa eligibility.',
        mistake: 'Assuming any off-plan project qualifies. Only projects from approved developers are eligible.',
        prepare: 'Confirm developer status before signing the SPA. Off-plan from non-approved developers does not qualify until handover with a separate value confirmation.',
      },
      {
        num: '03',
        title: 'Joint Ownership and Threshold Split',
        check: 'Whether the property is jointly owned, and if so, whether each owner\'s share exceeds the AED 2M threshold on a value-share basis.',
        mistake: 'Treating a joint AED 2M property as qualifying both owners. The threshold splits by ownership share, not by property value.',
        prepare: 'For joint ownership, confirm each owner\'s share value against the AED 2M threshold. If split below threshold, only the primary applicant qualifies on this property.',
      },
      {
        num: '04',
        title: 'Visa Cycle Timeline',
        check: 'Whether the client expects a 30-day visa cycle. With medical and biometric queues, the realistic window runs 4 to 8 weeks once the application is complete.',
        mistake: 'Planning the post-visa banking application against a 30-day visa window. The bank file opens after the visa is issued, not in parallel.',
        prepare: 'Plan a 4-8 week visa window and a separate 8-12 week banking window after visa issuance. Total relocation timeline runs 12-20 weeks from intake.',
      },
      {
        num: '05',
        title: 'Bank File Reads Differently from Visa File',
        check: 'Whether the client understands that the visa file (title deed, value, passport, dependents) and the bank file (SoF, transactional history, substance) read different things even when documents overlap.',
        mistake: 'Submitting the same documents to the bank that satisfied ICA and expecting the same outcome. SoF disclosure is the typical gate.',
        prepare: 'Plan SoF documentation for the AED 2M independently of the visa documentation. Inbound funds need a documented banking trail before the bank application.',
      },
    ],
    cta: 'Reference: ICA / GDRFA published Golden Visa guidance. Send the property and applicant outline and we will return the sequence map in 48 hours.',
  },

  // ─────────────────────────────────────────────────────────────
  // POST 10 — NL (CEO, W2.Thu)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'NL',
    accent: '#1e4d6b',
    title: 'NL → UAE: Sequencing Brief',
    subtitle: 'The two Dutch tails that follow a leaver out, and the order of operations that decides the outcome.',
    items: [
      {
        num: '01',
        title: 'Exit-Year Valuation Lock',
        check: 'Whether the exit-year valuation for substantial holdings is documented at the date of departure. The locked valuation becomes the reference point for any future disposal review.',
        mistake: 'Leaving without a documented exit valuation. The Belastingdienst then sets the reference point retrospectively, often unfavourably.',
        prepare: 'Obtain a valuation report for substantial holdings at the date of departure. File the exit position with the documented valuation referenced.',
      },
      {
        num: '02',
        title: 'Ten-Year Inheritance Tax Tail',
        check: 'Whether the client recognises that the 10-year IHT tail attaches to the person, not to where the person lives. UAE residency does not detach the Dutch IHT exposure.',
        mistake: 'Planning the UAE move as a clean break for IHT purposes. The Dutch claim on the estate continues for a decade after departure.',
        prepare: 'Coordinate estate planning with Dutch counsel for the full 10-year tail period. Restructuring through trusts or foundations must address the Dutch IHT position.',
      },
      {
        num: '03',
        title: 'Residency Reset Documentation',
        check: 'Whether the residency break is documented in the right registers: social security, KvK (Chamber of Commerce), and personal records.',
        mistake: 'Moving physically without updating the social security and KvK registrations. The Belastingdienst then disputes the break date.',
        prepare: 'Update social security and KvK on or before the departure date. Document the chain of evidence — flight records, lease termination, new UAE lease, Emirates ID — in the file.',
      },
      {
        num: '04',
        title: 'Final Tax Year Filing Sequence',
        check: 'Whether the final Dutch tax year is filed correctly under the regime that applies at exit, with the exit position documented before any investment-vehicle restructuring.',
        mistake: 'Moving assets before the Dutch filing reset. The Belastingdienst taxes the transfer; the UAE taxes nothing yet; the client pays twice.',
        prepare: 'File the final Dutch tax year first. Restructure investment vehicles after the residency picture is settled.',
      },
      {
        num: '05',
        title: 'UAE TDC Coordination',
        check: 'Whether the UAE TDC application aligns with the Dutch exit timeline. UAE substance and Emirates ID need to be in place before the TDC issues.',
        mistake: 'Applying for the UAE TDC before substance is built. The TDC then sits with weak documentation behind it.',
        prepare: 'Build UAE substance (Emirates ID, lease, business or employment evidence, UAE banking flow) before the TDC application. Issue the TDC against a documented file.',
      },
    ],
    cta: 'Reference: Belastingdienst published guidance on emigration and inheritance tax. Send the residency timeline and asset outline and we will return the sequencing map in 48 hours.',
  },

  // ─────────────────────────────────────────────────────────────
  // POST 11 — PRESCREEN (CEO, W2.Fri)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'PRESCREEN',
    accent: '#4a4a4a',
    title: 'Pre-Screen Sample',
    subtitle: 'A redacted sample of the 48-hour Pre-Screen output we return to a prospective client.',
    items: [
      {
        num: '01',
        title: 'Intake Summary',
        body: '[Client name and contact redacted] · Jurisdiction of origin · Current entities and shareholdings · Source of funds outline · Structuring goal · Timeline expectation · Banking history with UAE institutions.',
      },
      {
        num: '02',
        title: 'Pre-Screen Result',
        body: 'Result: Go / Fix-First / Decline. Issued within 48 hours of intake form completion.<br><br><strong>Go</strong> — File passes compliance lens and matches the live appetite of one or more banking lines.<br><strong>Fix-First</strong> — File requires remediation (typical window 60-120 days) before a mandate opens.<br><strong>Decline</strong> — File does not become a Fix-First by spending more on it; reasoning documented in writing.',
      },
      {
        num: '03',
        title: 'Compliance Lens Applied',
        body: 'Five Pre-Screen criteria reviewed: SoF gap and continuity · Sanctions adjacency in beneficial chain · Active regulator action or court case · Prior UAE bank rejection without remediation · Timeline realism.',
      },
      {
        num: '04',
        title: 'Banking Line Appetite Snapshot',
        body: 'Live appetite check across the institutions WTP runs lines with in Dubai and Abu Dhabi. The snapshot reflects the current quarter; appetite shifts and the Pre-Screen result is anchored to the date of issue.',
      },
      {
        num: '05',
        title: 'Process Boundaries',
        body: 'No fee. No contract. No follow-up sequence afterwards. The Pre-Screen does not auto-enrol the prospect into a nurture campaign. If the result is Go, the next conversation starts from a clean baseline. If Decline, the reasoning is in writing.',
      },
    ],
    cta: 'Submit the intake outline and we will return the Pre-Screen result within 48 hours. No commitment.',
  },

  // ─────────────────────────────────────────────────────────────
  // POST 12 — HOLDING (CEO, W3.Mon)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'HOLDING',
    accent: '#5c4033',
    title: 'Holding-OpCo Decision Tree',
    subtitle: 'Three signals that a single-entity setup has run out of road, and the structure that holds up at scale.',
    items: [
      {
        num: '01',
        title: 'Signal One — Mixed Flows on One Balance Sheet',
        check: 'Whether operating revenue and passive holdings sit on the same balance sheet, so the bank can no longer read which is which.',
        mistake: 'Treating a single trading entity as scalable. The bank reads the mixed activity as a substance question, not a structuring question.',
        prepare: 'Separate flows by entity type: trading on OpCo, passive on Holding. If the current entity already mixes, plan the split before the next bank review.',
      },
      {
        num: '02',
        title: 'Signal Two — Second Jurisdiction in the Picture',
        check: 'Whether a second jurisdiction has entered the picture: inheritance, a child\'s tuition account, a property abroad, a personal investment in a non-UAE vehicle.',
        mistake: 'Adding non-UAE positions to the same UAE entity. The entity then carries exposure it was not designed for.',
        prepare: 'Map the second-jurisdiction position separately. If structural, route through the Holding rather than the OpCo.',
      },
      {
        num: '03',
        title: 'Signal Three — Relationship Manager Asking "What Does This Entity Do"',
        check: 'Whether the bank relationship manager has started asking activity questions on calls that used to be transactional. This is the bank reading the file as confusing rather than complex.',
        mistake: 'Treating the question as routine. The question is a flag that the activity story is no longer legible.',
        prepare: 'Restructure to make the activity legible before the next relationship review. Clear separation of Holding (passive) and OpCo (trading) restores the file.',
      },
      {
        num: '04',
        title: 'Holding Entity Composition',
        check: 'Whether the Holding entity is structured to own shares and IP, receive dividends, and not trade. The Holding is a readability layer for the bank and a coordination layer for tax.',
        mistake: 'Routing trading revenue through the Holding to centralise cash management. The Holding then loses its passive character and the structuring case.',
        prepare: 'Keep Holding as passive. Trading runs through OpCo. Dividends and IP flows route to Holding under documented intercompany agreements.',
      },
      {
        num: '05',
        title: 'SPV Per Real-Estate Asset',
        check: 'Whether each real-estate asset sits in its own SPV. The SPV layer isolates financing, supports substance, and simplifies eventual exit.',
        mistake: 'Pooling real-estate assets in the Holding directly. Financing complications, substance questions, and exit friction compound.',
        prepare: 'Spin off each asset into a separate SPV at acquisition. If existing assets pool in the Holding, plan the transfer cost against the structuring benefit.',
      },
    ],
    cta: 'Send the current structure outline and the activity mix and we will return the Holding-OpCo decision tree in 48 hours.',
  },

  // ─────────────────────────────────────────────────────────────
  // POST 13 — RETITLE (RE, W3.Mon)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'RETITLE',
    accent: '#7a5230',
    title: 'Title Conversion Decision Brief',
    subtitle: 'Three costs that hit when title moves from personal name into a Holding, and four cases where the math earns it.',
    items: [
      {
        num: '01',
        title: 'SoF Bridging Across Two Readings',
        check: 'Whether the SoF narrative bridges two readings cleanly: the personal purchase first, then the intercompany transfer into the Holding.',
        mistake: 'Treating the transfer as administrative. The bank reads the transfer as a new transaction requiring its own SoF support.',
        prepare: 'Document the chain from original SoF through to the transfer. The Holding side of the transfer needs its own funding story even when no cash moves.',
      },
      {
        num: '02',
        title: 'Mortgage Refinancing on Transfer',
        check: 'Whether the property carries a mortgage and the lender will refinance into the Holding name. The lender re-prices the loan at the new structure.',
        mistake: 'Assuming the existing mortgage transfers in-place. Most lenders treat the transfer as a new application with current pricing.',
        prepare: 'Confirm refinancing terms with the lender before initiating the transfer. Compare the new rate against the original; the spread is a real cost of conversion.',
      },
      {
        num: '03',
        title: 'DLD 4% Transfer Fee on Appraised Value',
        check: 'Whether the client has budgeted the DLD transfer fee at 4% of property value (or appraised intercompany value). The fee applies even when no cash consideration changes hands.',
        mistake: 'Treating the intercompany transfer as zero-fee because no sale occurs. DLD assesses the fee on appraised value.',
        prepare: 'Confirm the appraised value and budget 4% plus admin costs into the conversion plan.',
      },
      {
        num: '04',
        title: 'When the Conversion Earns Its Cost',
        check: 'Whether the conversion is supported by one or more of: substance file upgrade for CT2026 review, second or third unit incoming, cross-border inheritance picture, portfolio refinance opening.',
        mistake: 'Converting without one of the supporting triggers. The conversion cost then sits against no structural benefit.',
        prepare: 'Map the conversion against the supporting trigger. If the trigger is not yet in place, defer the conversion until it is.',
      },
      {
        num: '05',
        title: 'When the Conversion Does Not',
        check: 'Whether the property is a single unit with no cross-border picture and no plan for a second unit. The conversion math does not pencil out below 24 months of holding either.',
        mistake: 'Converting on advisor recommendation without the operational case. Conversion costs are real; benefits accrue against scale.',
        prepare: 'Hold the property in personal name until a supporting trigger emerges. Convert when the trigger arrives, not in anticipation.',
      },
    ],
    cta: 'Reference: DLD published transfer fee schedule. Send the property details and current ownership and we will return the conversion economics in 48 hours.',
  },

  // ─────────────────────────────────────────────────────────────
  // POST 14 — LADDER (CEO carousel, W3.Tue)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'LADDER',
    accent: '#3d5a5f',
    title: '7-Tier Substance Ladder + Bank-Reading Map',
    subtitle: 'Seven rungs of UAE substance and the bank profile each rung opens.',
    items: [
      {
        num: '01',
        title: 'Rung 1 — Virtual Office',
        check: 'Address only. Legal registration passes; banking ceiling is low. The bank will ask one more question.',
        mistake: 'Relying on virtual office past the residency-only use case. Substance evidence is weakest at this rung.',
        prepare: 'Use virtual office only for residency-only setups with no banking demand beyond a basic retail account.',
      },
      {
        num: '02',
        title: 'Rung 2 — Flex Desk',
        check: 'Shared flex desk in a free zone or shared workspace. Files open at most retail banks. The conversation stays product-driven, not relationship-driven.',
        mistake: 'Treating flex desk as adequate substance for institutional banking. Retail banking is the ceiling.',
        prepare: 'Plan flex desk as a transition rung, not a permanent state. The bank reads it as early-stage substance.',
      },
      {
        num: '03',
        title: 'Rung 3 — Dedicated Desk Plus One Local Hire',
        check: 'A dedicated desk and one local hire (admin, marketing, or operations). Tier-2 banks become workable.',
        mistake: 'Maintaining the dedicated desk without the local hire. The substance signal is weaker without the hire than with one.',
        prepare: 'Confirm WPS-registered local payroll for at least one local hire. Document the function the hire performs in the file.',
      },
      {
        num: '04',
        title: 'Rung 4 — Operational Office',
        check: 'Operational office with running payroll. The corporate banking conversation starts here. Substance becomes legible across multiple data points.',
        mistake: 'Stopping at operational office without documenting decision-making evidence. The file reads as headcount without governance.',
        prepare: 'Document board minutes that reference operating decisions, signatory location, and director travel. Substance is operational discipline, not just headcount.',
      },
      {
        num: '05',
        title: 'Rung 5 — Substantive Presence',
        check: 'Multiple hires, real revenue, multi-function team. Private banking opens at this rung. The relationship manager begins to call.',
        mistake: 'Treating substantive presence as the final rung. Family Office tier requires more than substantive presence alone.',
        prepare: 'Plan the substantive presence with a 12-24 month operating discipline behind it before the private banking conversation matures.',
      },
      {
        num: '06',
        title: 'Rung 6 — Fully Resident Principal',
        check: 'Principal is fully UAE-resident, directing the entity from UAE soil. The file becomes institutional. CT2026 substance is fully supported.',
        mistake: 'Documenting full residency without supporting the operational story. Residency without operational anchor reads as personal, not corporate.',
        prepare: 'Tie principal residency to documented operational decision-making in the UAE. The two reinforce; either alone weakens.',
      },
      {
        num: '07',
        title: 'Rung 7 — Family Office',
        check: 'Family Office tier: governance plus people plus capital deployment evidence. Institutional banking, capital deployment lines, and bespoke compliance treatment open at this rung.',
        mistake: 'Claiming Family Office status without the governance discipline. Banks read absent governance as private client with extra paperwork.',
        prepare: 'Document governance (council meetings, minute trail), people (qualified staff with relevant credentials), and capital deployment (actual investment activity with reporting). All three are required.',
      },
    ],
    cta: 'Send the current substance position and the bank profile being targeted — we will return the rung-vs-profile map in 48 hours.',
  },

  // ─────────────────────────────────────────────────────────────
  // POST 15 — SBR (WtP, W3.Wed)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'SBR',
    accent: '#6b4a2b',
    title: 'Small Business Relief Eligibility Check',
    subtitle: 'Revenue thresholds and Year-2 mechanics under FTA Ministerial Decision 73/2023.',
    items: [
      {
        num: '01',
        title: 'AED 3M Revenue Threshold for the Period',
        check: 'Whether revenue for the relevant tax period stays at or below AED 3 million. The threshold is revenue, not profit.',
        mistake: 'Calculating against profit. A consulting firm at AED 3.2M revenue with AED 800K profit loses SBR for the period.',
        prepare: 'Track gross revenue monthly. Forecast Q4 against the AED 3M ceiling and plan the restructuring conversation if the forecast approaches the threshold.',
      },
      {
        num: '02',
        title: 'All Prior Periods Test',
        check: 'Whether all prior tax periods of the entity also stayed at or below AED 3 million. "All prior periods" includes the year of incorporation.',
        mistake: 'Electing SBR in Year 2 after Year 1 crossed AED 3M. The election is barred even if Year 2 revenue drops back below threshold.',
        prepare: 'Review the full revenue history of the entity before the election. If any prior period crossed AED 3M, SBR is not available for any subsequent period.',
      },
      {
        num: '03',
        title: 'Tax Period Ending Before 31 December 2026',
        check: 'Whether the tax period for which SBR is elected ends on or before 31 December 2026. The relief regime closes at that date.',
        mistake: 'Planning SBR as a multi-year default. The regime is time-limited under current rules.',
        prepare: 'Calendar the regime close date. Plan the post-SBR position (full CT at 9% on taxable income above AED 375K) before the regime closes.',
      },
      {
        num: '04',
        title: 'Election Mechanics',
        check: 'Whether the SBR election is made through the FTA portal on time and supported by the entity\'s revenue documentation.',
        mistake: 'Missing the election window. The relief is not automatic; the election must be filed.',
        prepare: 'Calendar the election window for each relevant tax period. File the election with supporting revenue documentation on or before the deadline.',
      },
      {
        num: '05',
        title: 'Threshold-Crossing Restructuring Window',
        check: 'Whether the entity is approaching the AED 3M threshold and the restructuring conversation has been opened in Q3, not at year-end filing.',
        mistake: 'Waiting until year-end to address the crossing. Restructuring late in the period limits the options available.',
        prepare: 'Open the restructuring conversation in Q3 if the forecast approaches the threshold. Options narrow as the period closes.',
      },
    ],
    cta: 'Reference: FTA Ministerial Decision No. 73 of 2023. Send the entity revenue history and we will return the SBR eligibility check in 48 hours.',
  },

  // ─────────────────────────────────────────────────────────────
  // POST 16 — SERVICECHG (RE, W3.Thu)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'SERVICECHG',
    accent: '#5a3a2a',
    title: 'Portfolio Substance Checklist',
    subtitle: 'The service-charge ledger and three things the bank reads on portfolio refinance.',
    items: [
      {
        num: '01',
        title: 'Service Charge Payment Continuity',
        check: 'Whether service charges have been paid on time, every quarter, on every unit in the Holding. The ledger continuity is what the bank reads.',
        mistake: 'Paying service charges on the main units and lapsing on the smaller ones. The lapse on any unit weakens the portfolio file.',
        prepare: 'Set up automated payment for service charges across all units. Track payment status quarterly and document any disputes in the file with resolution timeline.',
      },
      {
        num: '02',
        title: 'Reserve Fund Top-Up Discipline',
        check: 'Whether reserve-fund top-ups match the building\'s capital plan, not just the minimum quarterly invoice. The capital plan is published by the OA (owners association) annually.',
        mistake: 'Paying only the minimum invoice when the capital plan calls for additional reserve contributions. The shortfall surfaces at major maintenance events.',
        prepare: 'Review the OA capital plan annually. Top up against the planned schedule, not the minimum invoice. Document the basis for any deviation.',
      },
      {
        num: '03',
        title: 'OA Dispute Disclosure',
        check: 'Whether disputes with the OA (owners association) are documented in the file with current status, or whether they stay hidden until they block an NOC at sale or refinance.',
        mistake: 'Treating OA disputes as private operational matters. The dispute history surfaces at any NOC request and at portfolio refinance.',
        prepare: 'Document active and historical OA disputes with current status. Resolve open disputes before they block NOC issuance. Disclosure at the bank file is better than discovery.',
      },
      {
        num: '04',
        title: 'Deferred Maintenance Signal',
        check: 'Whether unpaid service charges or unresolved OA disputes reflect deferred maintenance and cash-flow stress across the wider holding. The bank reads the pattern.',
        mistake: 'Treating service-charge arrears as isolated. The bank reads the portfolio as a whole and the substance signal compounds.',
        prepare: 'Address service-charge arrears across the portfolio as a portfolio question, not unit by unit. The bank reads the pattern; the file should reflect resolution at the portfolio level.',
      },
    ],
    cta: 'Send the portfolio outline and current service-charge status — we will return the portfolio substance review in 48 hours.',
  },

  // ─────────────────────────────────────────────────────────────
  // POST 17 — SUBYEAR (CEO, W3.Fri)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'SUBYEAR',
    accent: '#3d5040',
    title: 'Year-2 Substance Audit Framework',
    subtitle: 'The forensic year-2 checks that decide whether the file passes at CT2026 enforcement.',
    items: [
      {
        num: '01',
        title: 'Payroll Continuity Across All 12 Months',
        check: 'Whether payroll runs continuously across all 12 months with no gaps. The typical failure: a contractor swap in month 11 or a forgotten WPS file that breaks the continuity.',
        mistake: 'Letting month-11 payroll lapse during a transition. The audit reads the gap as substance failure.',
        prepare: 'Calendar payroll continuity reviews quarterly. Document any contractor swap or WPS issue with the resolution timeline. No month without payroll evidence.',
      },
      {
        num: '02',
        title: 'Board Minutes Referencing Operating Decisions',
        check: 'Whether board minutes reference actual operating decisions made in the period, not boilerplate language. The audit reads the substance of the minutes, not the count.',
        mistake: 'Filing boilerplate minutes quarterly. The audit reads boilerplate as governance gap.',
        prepare: 'Hold real board meetings on operating decisions. Document the decisions in the minutes with reference to the underlying matter. Substance is in the content, not the cadence.',
      },
      {
        num: '03',
        title: 'Lease Utilisation Evidence',
        check: 'Whether lease utilisation is evidenced by utility bills, internet contract, badge access logs, or similar operational data. The lease alone does not evidence utilisation.',
        mistake: 'Holding a lease without operational evidence of use. The audit reads the lease as paper substance.',
        prepare: 'Maintain utility bills, internet contracts, and access logs that demonstrate operational use of the leased premises. Cross-check against the entity\'s declared operating hours.',
      },
      {
        num: '04',
        title: 'Bank Statements Showing Local Operating Flow',
        check: 'Whether UAE bank statements show local operating flow — rent paid, utilities paid, payroll outflows, supplier payments — not only inbound capital.',
        mistake: 'Maintaining UAE bank accounts that show only inbound funding from the parent or principal. The audit reads inbound-only flow as residency without operations.',
        prepare: 'Route operating expenses through the UAE bank account. Document the rationale for any expenses paid from outside the UAE.',
      },
      {
        num: '05',
        title: 'Economic Substance Return vs CT Return Reconciliation',
        check: 'Whether the Economic Substance Return reconciles with the Corporate Tax return — same numbers, same activity, same story.',
        mistake: 'Filing each return separately without cross-checking. The audit reads the divergence as inconsistency.',
        prepare: 'Cross-check ESR and CT figures before filing each. Reconcile any divergence in the file with documented basis.',
      },
    ],
    cta: 'Send the year-1 substance evidence pack and we will return the year-2 audit framework against the file in 48 hours.',
  },
];
