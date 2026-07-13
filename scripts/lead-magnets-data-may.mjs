// 18 WTP lead-magnet doc definitions for May 2026 LinkedIn campaign
// Drops into generate-linkedin-dm-materials-may.mjs renderer
// All voice rules verified; banned words = 0; exclamations = 0.

export const docs = [
  {
    id: 'CT2026',
    accent: '#b8860b',
    title: 'CT 2026 Readiness Checklist',
    subtitle: 'Five questions that flag whether a 2023-2024 setup is ready for the first filing season.',
    headerTag: 'Confidential',
    items: [
      {
        num: '01',
        title: 'FTA Registration and TRN Status',
        check: 'Whether the entity is registered with the Federal Tax Authority and a Tax Registration Number has been issued. Registration deadline alignment with the financial year is reviewed against the FTA-published timetable.',
        mistake: 'Assuming a trade licence is sufficient. Companies set up in 2023-2024 often delayed FTA registration and now sit outside the timetable they were supposed to follow.',
        prepare: 'Confirm TRN issuance, registration date, and assigned tax period. Reconcile against the financial year on the audited accounts. If misaligned, document the basis before the first filing.',
      },
      {
        num: '02',
        title: 'QFZP Eligibility Tested Against Actual Revenue',
        check: 'Whether the Free Zone entity meets every Qualifying Free Zone Person condition — qualifying income mix, adequate substance, audited financials, transfer pricing where related parties exist. Assessment is on the revenue actually earned, not the licence wording.',
        mistake: 'Treating the Free Zone licence as automatic 0% qualification. Mainland-sourced income, services to UAE customers, and excluded activities are the breaking points we see most.',
        prepare: 'Map every revenue stream to the qualifying or excluded list. Document the substance position — staff, premises, expenditure — for the same period. Lock the position before filing, not after.',
      },
      {
        num: '03',
        title: 'Transfer Pricing Documentation for Related Parties',
        check: 'Whether contemporaneous transfer pricing documentation exists for any related-party transaction — management fees, IP royalties, intra-group financing. The arm\'s length basis must be on file before the return is submitted.',
        mistake: 'Group recharges and management fees booked through year-end with no underlying agreement, no benchmarking, and no contemporaneous file.',
        prepare: 'Identify every related-party flow above the materiality threshold. Build the local file before filing — agreement, benchmarking, functional analysis. If counsel input is needed, schedule it now.',
      },
      {
        num: '04',
        title: 'Audited Financials Matched to Declared Activity',
        check: 'Whether audited statements reconcile to the activity on the trade licence and the revenue picture submitted to banks. Auditor appointment must be in place where required.',
        mistake: 'Filing audited accounts that show revenue from activities the licence does not cover, or volumes that do not match the bank account history.',
        prepare: 'Cross-check audit against licence, bank statements, and the SoF narrative used at onboarding. Inconsistencies surface in compliance review — fix at the audit stage, not after the return is filed.',
      },
      {
        num: '05',
        title: 'Permanent Establishment Risk in the Home Jurisdiction',
        check: 'Whether the UBO operating from another country creates a Permanent Establishment exposure under the home-jurisdiction tax code. The risk increases where decisions, contracts, and management are physically performed abroad.',
        mistake: 'Assuming UAE incorporation alone shifts taxing rights. PE rules in the UBO\'s home country apply regardless of UAE registration.',
        prepare: 'Coordinate with tax counsel in the home jurisdiction. Document board location, signatory location, and director travel. The PE position is a coordination question — assess viability before the filing season locks the answer.',
      },
    ],
    cta: 'Send answers back — we will review and respond within 48 hours.',
  },

  {
    id: 'MAY',
    accent: '#1a1a3e',
    title: 'WTP Advisory · May 2026 Publishing Schedule',
    subtitle: 'What is publishing across the four WTP accounts this month, by week.',
    headerTag: 'Confidential',
    items: [
      {
        num: '01',
        title: 'Week 1 — Corporate Tax and Source of Funds',
        body: 'CEO account: CT 2026 first filing readiness — the five checks before a position is locked, with focus on 2023-2024 setups. CEO account: Source of Funds — the document advisors most often hand to the client and lose the file on. Both posts target advisor partners with files in active review.',
      },
      {
        num: '02',
        title: 'Week 2 — UBO and Estate Structuring',
        body: 'CEO account: UBO disclosure — who counts as a beneficial owner under current bank practice, and where files break on settlors, nominees, and family-office control. WTP RE company page: Will and property — the risk that buying through a structure does not solve on its own.',
      },
      {
        num: '03',
        title: 'Week 3 — Pre-Screen and Banking-First Sequence',
        body: 'CEO account: Pre-Screen explained — the 48-hour banking viability assessment we run before accepting a file, with sample anonymised output. CEO account: Banking-First as math, not slogan — four UAE relocation sequences mapped against cost-of-failure.',
      },
      {
        num: '04',
        title: 'Week 4 — Family Office, Treasury, Crypto Layered',
        body: 'CEO account: DIFC vs ADGM Foundation — five points of divergence, coordination notes for tax counsel. CEO account: multi-currency setup matrix — which bank tier supports which currencies. WTP Advisory company page: VARA, bank, holding, flow — four crypto layers, sequenced.',
      },
      {
        num: '05',
        title: 'Week 5 — Transaction Holds and Property Substance',
        body: 'CEO account: account opened, transactions blocked — the 8-week silent failure pattern, mechanism, and what unfreezes it. WTP RE company page: when property stops being substance — what strips a unit of evidence value under the UAE Economic Substance Regulations.',
      },
    ],
    cta: 'Reply with the topic that matches a current file — we will send the deliverable for that week first.',
  },

  {
    id: 'SOF',
    accent: '#004f4f',
    title: 'Annotated Source of Funds Template',
    subtitle: 'The structure compliance teams actually read on the second pass.',
    headerTag: 'Confidential',
    items: [
      {
        num: '01',
        title: 'Bank Statements Covering Primary Income Flows',
        check: '12 to 24 months of statements from the accounts where income lands. Compliance reads them as a continuity test — does the cash arrive when the narrative says it does, in the volumes declared.',
        mistake: 'Selective months submitted to mask gaps, or statements from a secondary account that does not show the actual income source.',
        prepare: 'Pull the full 24-month set from every account that touches primary income. Highlight the salary, dividend, or business cycle. Annotate any gap before it becomes a question.',
      },
      {
        num: '02',
        title: 'Audited Financials or Tax Returns',
        check: 'Whether declared earnings reconcile against audited accounts or filed tax returns from the home jurisdiction. The numbers must match within reasonable variance.',
        mistake: 'Submitting management accounts in place of audited statements, or tax returns from one jurisdiction when income arose in another.',
        prepare: 'Use the most recent two years of audited accounts or tax filings. If the UBO is in a non-filing regime, document the basis. Reconcile to the bank statements before submission.',
      },
      {
        num: '03',
        title: 'Written Explanation for Single Transactions Above USD 50,000',
        check: 'A short narrative for each material credit — what it was, who paid, against which contract or asset disposal. Compliance pulls these line items first.',
        mistake: 'Omitting the narrative and relying on the transaction memo. Bank memos are rarely sufficient for funds above the materiality threshold.',
        prepare: 'List every credit above USD 50,000 in the relevant period. Attach the contract, invoice, or completion document for each. One file per line item.',
      },
      {
        num: '04',
        title: 'Origin-Specific Supporting Documents',
        check: 'Documents that match the specific origin claimed — gift deed for gifted funds, SPA and completion accounts for business sale, probate for inheritance, exchange records and on-chain provenance for crypto.',
        mistake: 'Generic bank letters submitted in place of origin-specific evidence. A confirmation that funds passed through an account is not evidence of where they came from.',
        prepare: 'Map each origin claim to its specific document chain. Where the origin is gifted or inherited, document the donor or deceased\'s source as well. The trail must reach a verifiable starting point.',
      },
      {
        num: '05',
        title: 'Narrative Paragraph Connecting Income, Assets, and UAE Activity',
        check: 'A single paragraph that reconciles the income story to the assets held, the residence pattern, and the intended UAE activity. Compliance reads this as the lens for everything else in the file.',
        mistake: 'Narrative drafted by the client without coordination, missing the link between income source, accumulated wealth, and reason for UAE banking.',
        prepare: 'Draft the narrative last, after every supporting document is in place. Each sentence should map to a document already in the file. No claim without evidence.',
      },
    ],
    cta: 'If any section is thin, message us back and we will review the full file in 48 hours.',
  },

  {
    id: 'WILL',
    accent: '#7a1f3d',
    title: 'Pre-SPA Will and Property Checklist',
    subtitle: 'Seven items to review before the client signs the SPA.',
    headerTag: 'Confidential',
    items: [
      {
        num: '01',
        title: 'Default Succession Position Documented',
        body: 'For non-Muslim owners, UAE assets default to Sharia rules in the absence of a registered Will. Confirm in writing what the default outcome would be on the specific property, in the specific name, before the SPA is signed. The default position is the baseline against which the Will decision is made.',
      },
      {
        num: '02',
        title: 'Ownership Vehicle Decision',
        body: 'Personal name, UAE LLC, or offshore holding. Each route has different succession consequences. Property held via a UAE company means the company shares fall under default succession when no Will exists. The vehicle decision is upstream of the Will registration.',
      },
      {
        num: '03',
        title: 'Non-Muslim Dubai Courts Will Eligibility',
        body: 'Confirm the client qualifies for the DIFC Wills Service or Dubai Courts Non-Muslim Will. Registration of the Dubai Courts Will runs around AED 7,500 with completion in roughly 15 minutes when the file is clean. DIFC Wills Service runs on a separate fee schedule.',
      },
      {
        num: '04',
        title: 'Asset Schedule Coordinated with the Will Draft',
        body: 'The Will must list the property by title deed or by the holding entity\'s shares. A Will that names assets generically without title deed reference creates execution friction. Pull the deed or the share register before drafting.',
      },
      {
        num: '05',
        title: 'Coordination with Home-Jurisdiction Estate Planning',
        body: 'A UAE Will sits alongside any estate plan in the home jurisdiction. Conflicts between the two — competing executors, conflicting bequests, undisclosed jurisdiction — surface at probate. Coordinate with home-country counsel before the UAE Will is registered.',
      },
      {
        num: '06',
        title: 'Beneficiary Identity and Documentation',
        body: 'Each named beneficiary must be identifiable on the registration application — full legal name, passport, relationship to the testator. Beneficiaries who are minors require a guardian appointment that is consistent with home-jurisdiction law.',
      },
      {
        num: '07',
        title: 'SPA Signature Sequenced After Will Registration',
        body: 'In our practice, the cleanest sequence registers the Will before the SPA is signed where the client can absorb the timing. The reverse sequence works but leaves a gap where the property is held without a current Will. The cost of fixing the gap later is higher than the cost of sequencing now.',
      },
    ],
    cta: 'If any item is unresolved before SPA, message us back and we will review the case within 48 hours.',
  },

  {
    id: 'SEQUENCE',
    accent: '#0f5132',
    title: 'Banking-First Decision Tree',
    subtitle: 'Four UAE relocation sequences, mapped against cost-of-failure.',
    headerTag: 'Confidential',
    items: [
      {
        num: '01',
        title: 'Banking → Company → Visa → Assets',
        body: 'The only sequence where the irreversible spend follows the irreversible decision. Pre-Screen confirms banking viability before the licence is paid. Cost exposure before the bank decision is limited to advisory time. → Rationale: banking is the single step that can decline the file. Clearing it first removes the failure mode that turns every line below into sunk cost.',
      },
      {
        num: '02',
        title: 'Company → Banking → Visa → Assets',
        body: 'The most common sequence we inherit from clients who arrived without an advisor. Licence is paid, sometimes substance is built, then banking is approached and the file does not match the appetite of any Tier-1 institution. → Cost: AED 15 to 25 thousand on the licence, plus any substance spend, becomes sunk cost when rework is required. In our practice, roughly 30% of these files need structural rework before any Tier-1 bank engages.',
      },
      {
        num: '03',
        title: 'Visa → Company → Banking → Assets',
        body: 'Golden Visa first, banking discovered late. The visa qualifies the residency claim but does not address whether the operating banking will open. → Cost: visa fees, qualifying-asset commitment, and any structure built around the visa become sunk cost if banking is declined. Personal banking via the visa route does not substitute for entity banking when an operating company is needed.',
      },
      {
        num: '04',
        title: 'Company → Visa → Banking → Assets',
        body: 'Residency-driven sequence where banking is treated as administrative. Substance is sometimes built before the bank file is even drafted. → Cost: licence, visa, and substance — physical office, signage, utility evidence at AED 30 to 100 thousand per year — accumulate before the only step that can decline the file. The greatest cost-of-failure of the four sequences.',
      },
    ],
    cta: 'If a current file is on a sequence other than the first one, message us back and we will assess the rework path in 48 hours.',
  },

  {
    id: 'UBO',
    accent: '#3730a3',
    title: 'UBO Disclosure Checklist',
    subtitle: 'What counts as a beneficial owner under current UAE bank practice.',
    headerTag: 'Confidential',
    items: [
      {
        num: '01',
        title: 'Direct and Indirect Ownership at 25% or Above',
        check: 'Every natural person holding 25% or more of the entity, directly or through any chain of holding companies. Banks trace ownership through every layer to the natural person at the end.',
        mistake: 'Declaring only the immediate parent entity and not following the chain to the natural person. Layered structures hide the UBO from the form, not from the bank.',
        prepare: 'Build a full ownership tree, layer by layer, terminating in natural persons. Calculate effective economic ownership at each step. Document the full chain in the disclosure pack.',
      },
      {
        num: '02',
        title: 'Control via Voting Rights',
        check: 'Persons who control the entity by voting rights, board appointment power, or veto rights, even where economic ownership is below 25%. Control is a separate test from ownership.',
        mistake: 'Omitting a director or voting trustee because they hold no shares. Bank compliance reads control rights as UBO indicators regardless of the share register.',
        prepare: 'Review the articles, shareholder agreements, and any side letters. Identify who can appoint or remove directors, who has veto rights, and who chairs the board. Disclose all such persons.',
      },
      {
        num: '03',
        title: 'Control via Contract',
        check: 'Persons who control the entity through management agreements, shareholder agreements, side letters, or undisclosed nominee arrangements. Contractual control is a UBO trigger under current bank practice.',
        mistake: 'Treating private contractual arrangements as private. A bank that finds a management agreement during a transaction review will re-run the full onboarding.',
        prepare: 'List every agreement that allocates control or economic benefit. Where a nominee is involved, disclose the nominee and the underlying principal. Private does not mean undisclosed.',
      },
      {
        num: '04',
        title: 'Trust Settlors, Protectors, and Underlying Beneficiaries',
        check: 'Where a trust holds the company shares, the settlor, the protector, and the natural-person beneficiaries are all UBO candidates. Banks look past the trustee to the natural persons.',
        mistake: 'Naming only the trustee on the basis that "the trustee is the legal owner". Bank compliance does not accept that framing for UBO disclosure.',
        prepare: 'Disclose the settlor, the protector, the named beneficiaries, and any letter of wishes. If the trust is discretionary, document the class of beneficiaries and the typical distribution pattern.',
      },
      {
        num: '05',
        title: 'Family-Office and Patriarch Control',
        check: 'Family structures where the patriarch or family head controls without holding shares. Control may be through a council, a foundation, a constitution document, or established practice.',
        mistake: 'Treating the family-office vehicle as the UBO and stopping there. The patriarch who controls the council is the natural person bank compliance is looking for.',
        prepare: 'Document the governance of the family vehicle — council, foundation council, constitution — and identify who appoints, removes, and instructs. Disclose the controlling natural person regardless of share register.',
      },
    ],
    cta: 'If any UBO category is unclear on a current file, message us back and we will review the disclosure pack in 48 hours.',
  },

  {
    id: 'VARA',
    accent: '#5b21b6',
    title: 'Crypto Layered Checklist · VARA, Bank, Holding, Flow',
    subtitle: 'Four layers, sequenced not parallel.',
    headerTag: 'Confidential',
    items: [
      {
        num: '01',
        title: 'VARA Licence — Right to Operate the Regulated Activity',
        body: 'Confirm the activity in scope under the Virtual Assets Regulatory Authority framework, the licence category required, and the capital and personnel conditions that follow. The licence is the right to operate, not the right to bank. → Sequence note: licence application is the first layer. Bank conversation does not start until the licence path is clear.',
      },
      {
        num: '02',
        title: 'Bank Account — The Settlement Layer',
        body: 'UAE banks treat VARA-licensed entities differently from unlicensed crypto operators, and the difference is documentary, not philosophical. Tier-1 banks engage with licensed entities under a defined onboarding pack. Free Zone digital banks have a different appetite. → Sequence note: the bank conversation needs the VARA position resolved, the holding entity defined, and the SoF chain ready. Approaching banking before these are in place results in a stalled file.',
      },
      {
        num: '03',
        title: 'Holding Entity — Where the Asset Sits',
        body: 'The vehicle that holds the digital asset, in which jurisdiction, under which structuring law. DIFC, ADGM, and offshore options behave differently for tax, succession, and bank acceptance. → Sequence note: the holding entity is the lens through which the bank reads the file. Choosing the holding before VARA is filed creates rework. Choosing it after the bank refuses creates more.',
      },
      {
        num: '04',
        title: 'Proof-of-Funds — The Evidence File for the Fiat Off-Ramp',
        body: 'For any conversion from digital to fiat, a documented chain — exchange records, on-chain provenance, counterparty diligence — must exist before the first off-ramp transaction. Banks ask for it on the second pass, not the first. → Sequence note: the proof-of-funds file is built before conversion, not after. Reactive evidence is rarely sufficient for the volume the client actually intends to move.',
      },
    ],
    cta: 'If any layer is undefined on a current file, message us back and we will assess the sequencing path in 48 hours.',
  },

  {
    id: 'FOUNDATION',
    accent: '#9a7b16',
    title: 'DIFC vs ADGM Foundation Comparison',
    subtitle: 'Five points of divergence between the two regimes, with notes for tax counsel coordination.',
    headerTag: 'Confidential',
    items: [
      {
        num: '01',
        title: 'Governing Law and Court',
        body: '→ DIFC: governed by the DIFC Foundations Law 2018, with DIFC Courts as the supervisory court. The statute is English-derived but DIFC-drafted. → ADGM: governed by the ADGM Foundations Regulations 2017, with ADGM Courts and direct application of the laws of England and Wales by reference. Foreign-court recognition flows from these choices and is the question that drives the regime selection in our practice.',
      },
      {
        num: '02',
        title: 'Document Tolerance at Edge Cases',
        body: '→ DIFC: standard document set with defined tolerance at registration. Beneficial-ownership disclosure, council-member CVs, and source-of-wealth pack expected. → ADGM: comparable document set with differences in how edge cases are handled — particularly where source-of-wealth narratives need to coordinate with home-country audit. In our practice the timelines are similar, the friction lives in the edge cases.',
      },
      {
        num: '03',
        title: 'Confidentiality Regime',
        body: '→ DIFC: private register with carve-outs for regulator and law-enforcement access. → ADGM: private register with its own carve-outs and disclosure triggers. Both regimes are private. The carve-outs are not identical, and the difference is the question for families with sensitivity around future disclosure events.',
      },
      {
        num: '04',
        title: 'Recognition by Foreign Courts',
        body: '→ DIFC: recognition of DIFC Court orders is jurisdiction-by-jurisdiction in the country where the family has assets, succession exposure, or tax filings. → ADGM: ADGM Court orders carry separate recognition routes, often shaped by the direct England-Wales reference in ADGM law. The right answer is the one tax counsel in the home country must give before the structure is built.',
      },
      {
        num: '05',
        title: 'Cost-to-Maintain',
        body: '→ DIFC: registered office, council fees, registered agent fees, audit where required by the activity profile. → ADGM: comparable stack with different fee schedules at the registry and agent level. The cost difference rarely drives the choice on its own, but is the line item that families compare against the foreign-court recognition answer.',
      },
    ],
    cta: 'If a current family-office file needs the regime decision sequenced with home-country tax counsel, message us back and we will scope the coordination in 48 hours.',
  },

  {
    id: 'SUBSTANCE-RE',
    accent: '#556b2f',
    title: 'Property-as-Substance Maintenance Checklist',
    subtitle: 'Four items that strip a property of substance value when missing.',
    headerTag: 'Confidential',
    items: [
      {
        num: '01',
        title: 'Utility Consumption Evidence',
        body: 'Under the UAE Economic Substance Regulations, an address used as substance must show evidence of activity. → DEWA records or equivalent utility consumption profile that reads as occupied, not empty. → A unit with no utility draw signals no presence. The title deed alone does not satisfy substance — current evidence does.',
      },
      {
        num: '02',
        title: 'Maintenance and Service Contracts on File',
        body: 'Contemporary maintenance evidence — AC service, cleaning, building service charges paid against an active occupation. → Active service contracts dated to the period under review. → Absence of maintenance records is read as absence of use. Substance is a continuous test, not a one-time purchase.',
      },
      {
        num: '03',
        title: 'Tenancy Position Consistent with Substance Claim',
        body: 'Where the property is tenanted to a third party, the UBO cannot simultaneously claim operational use of the same address. → Tenancy contract must be consistent with the activity declared in substance filings. → Where the property is used by a related entity, the lease, payment trail, and shared occupancy arrangement must be documented and defensible.',
      },
      {
        num: '04',
        title: 'UBO Physical Presence Records',
        body: 'Substance is supported by evidence of the UBO actually using the address. → Entry logs from the building, signed correspondence dated to the address, board resolutions executed at the location. → No presence record means no substance. The property did not change — the evidence around it did.',
      },
    ],
    cta: 'If a current substance file is thin on any of these items, message us back and we will review within 48 hours.',
  },

  {
    id: 'UNFREEZE',
    accent: '#c2410c',
    title: 'Transaction-Hold Diagnostic',
    subtitle: 'Six questions we run when a client account stalls mid-onboarding.',
    headerTag: 'Confidential',
    items: [
      {
        num: '01',
        title: 'Account Classification at Onboarding',
        check: 'The expected monthly volume, geographies, counterparty types, and currency mix declared when the account opened. This classification feeds the bank\'s transaction monitoring engine and defines what triggers a hold.',
        mistake: 'Treating the onboarding form as a formality. The numbers entered at opening are the rails the account runs on for the relationship.',
        prepare: 'Pull the original onboarding declaration. Compare it against the activity now flowing through the account. Where activity has drifted, a re-classification is the first move.',
      },
      {
        num: '02',
        title: 'Inbound Wire Geography',
        check: 'Whether incoming funds originate in jurisdictions declared at onboarding. Wires from undeclared countries — including second-home jurisdictions the client did not think to mention — are the most common trigger we see.',
        mistake: 'Assuming the client\'s personal travel and asset map matches the account declaration. Often it does not.',
        prepare: 'List every country from which inbound funds have arrived in the last 12 months. Cross-check against the onboarding declaration. Disclose the gap before the next inbound wire lands.',
      },
      {
        num: '03',
        title: 'Single-Transaction Volume vs Declared Range',
        check: 'Whether any single transaction exceeded the declared monthly volume. One-off dividends, sale proceeds, or large vendor settlements are common single-transaction triggers.',
        mistake: 'Declaring a steady-state monthly figure without a band for occasional spikes. The bank holds the spike for documentation.',
        prepare: 'Document the basis for any single transaction outside the declared range — contract, completion, dividend resolution. Submit the file before the wire arrives, not after the hold.',
      },
      {
        num: '04',
        title: 'Counterparty Industry Profile',
        check: 'Whether counterparties operate in higher-risk industries that were not flagged at onboarding — gaming, money-service businesses, digital-asset exchanges, certain commodities.',
        mistake: 'Listing counterparties by name without surfacing the industry profile. Bank compliance reads the industry, not just the entity.',
        prepare: 'Map every active counterparty to its industry. Flag any in higher-risk categories. Provide enhanced documentation for those flows ahead of the next transaction.',
      },
      {
        num: '05',
        title: 'Crypto and Digital-Asset Exchange Flows',
        check: 'Whether digital-asset exchange activity was disclosed at onboarding. Exchange flows that were not pre-disclosed are a frequent hold trigger, even where the activity is fully licensed at the source.',
        mistake: 'Routing exchange proceeds through a UAE personal or corporate account that was opened on a non-crypto activity profile.',
        prepare: 'Re-classify the account if crypto activity is intended. Where re-classification is not viable, sequence a separate banking relationship for the digital-asset flow.',
      },
      {
        num: '06',
        title: 'Re-Classification vs Tier Change',
        check: 'Whether the right move is a re-classification at the current bank or a tier change to an institution whose monitoring posture matches the actual flow.',
        mistake: 'Pushing re-classification at a bank that will never fully accept the flow profile, when a different institution would have onboarded the same activity cleanly.',
        prepare: 'Assess both routes side by side. In our practice, proactive re-classification adds days; reactive supplementary KYC adds four to six weeks; a tier change can be faster than either when the mismatch is structural.',
      },
    ],
    cta: 'If a current account is in transaction hold, message us back and we will run the diagnostic on the file in 48 hours.',
  },

  {
    id: 'PRESCREEN',
    accent: '#004e92',
    title: 'Sample Pre-Screen Output (Anonymized)',
    subtitle: 'What a Pre-Screen returns — input pack, assessment, routing decision.',
    headerTag: 'Confidential',
    items: [
      {
        num: '01',
        title: 'Input Pack Requested from the Referring Advisor',
        body: 'The pack we ask for before the 48-hour clock starts. → UBO list with control routes, not only shareholding → Source of Funds narrative with supporting document index → Business activity description matched to the intended UAE licence → Jurisdiction map — where the money is, where it has been, where it goes → Sanctions and adverse media check on every UBO and connected party. Files arrive without these are routed back before assessment, not declined.',
      },
      {
        num: '02',
        title: 'Sanctions and Adverse Media Run',
        body: 'Every UBO, controller, and connected party is screened against current sanctions lists and adverse media. The output is a finding, not a clearance. → A clean run is the floor, not the ceiling. → Adverse media without a sanctions hit still informs routing — the file may go to a different bank tier, or be declined for the activity profile rather than the person.',
      },
      {
        num: '03',
        title: 'Activity-to-Licence Reconciliation',
        body: 'The intended UAE business activity is mapped against the licence the client plans to apply for. → Mismatch between operating reality and licence wording is the most common rework trigger we see. → If the licence does not cover the activity, the bank will not engage. The Pre-Screen surfaces this before the licence is paid.',
      },
      {
        num: '04',
        title: 'Routing Decision — Tier 1, Tier 2, or Free Zone Bank',
        body: 'A written file directed to the bank tier most likely to onboard the case. → Tier 1: full-service banking for HNWI and operating companies with clean files → Tier 2: route for files with one or two complexities a Tier 1 will not absorb → Free Zone digital banks: AED-USD operating layer, faster onboarding, narrower currency stack. The decision is documented with the basis, not just the destination.',
      },
      {
        num: '05',
        title: 'Decline Output — Specific Reason and What Would Need to Change',
        body: 'Where the file is declined at Pre-Screen, the output is specific. → The reason — UBO chain, sanctions exposure, activity profile, jurisdiction overlap — and what would need to change for the file to become bankable. → A decline at Pre-Screen costs the advisor an email. A decline after the licence is paid costs the client AED 30 to 50 thousand and the advisor a referral relationship.',
      },
    ],
    cta: 'If a current file is ready for Pre-Screen, send the input pack back and we will return the assessment within 48 hours.',
  },

  {
    id: 'TREASURY',
    accent: '#1e40af',
    title: 'Multi-Currency Setup Matrix',
    subtitle: 'UAE bank tier by currency support, with notes on correspondent screening.',
    headerTag: 'Confidential',
    items: [
      {
        num: '01',
        title: 'AED — Local Settlement Layer',
        body: '→ Tier 1 UAE banks: full AED service, standard for any operating company. → Tier 2: AED service standard, with narrower acceptance on the file profile. → Free Zone digital banks: AED native, often the fastest onboarding. AED is the easiest currency to open and the smallest decision in the treasury setup. The map starts here, not ends here.',
      },
      {
        num: '02',
        title: 'USD — Settled via New York Correspondents',
        body: '→ Tier 1: USD supported, with correspondent banking through New York for inbound and outbound wires. → Tier 2: USD supported, with stricter screening on inbound flows from US LPs and entities. → Free Zone digital banks: USD typically supported alongside AED. Note: every USD wire passes through a US correspondent and inherits its compliance posture. Brief the client on this before the first inbound from a US source.',
      },
      {
        num: '03',
        title: 'EUR and GBP — European Footprint',
        body: '→ Tier 1: EUR and GBP supported in one client relationship with AED and USD. → Tier 2: EUR and GBP available, with thinner liquidity that can show as cost-of-funding penalty on transfers. → Free Zone digital banks: typically AED-USD only, EUR and GBP not supported. Where the family keeps a European residency footprint, the chosen bank must support both currencies natively.',
      },
      {
        num: '04',
        title: 'CHF — Swiss Custody Coordination',
        body: '→ Tier 1: CHF supported where the bank holds a Swiss correspondent line. → Tier 2: CHF support varies; absence of a correspondent relationship results in declined or routed-at-worse-rate transactions. → Free Zone digital banks: not supported. CHF accounts requested at a UAE bank with no Swiss correspondent are a common failure pattern in our practice.',
      },
      {
        num: '05',
        title: 'Currency Map Drives the Bank Choice, Not the Reverse',
        body: 'The treasury setup is a sequencing decision. → Map the currencies the client actually settles in — salary, dividend, trade, lifestyle, custody. → Match against the bank tier that supports all of them in one client relationship. → Avoid the AED-first reflex that opens the easiest account and discovers the EUR or CHF gap six months later.',
      },
    ],
    cta: 'If a current treasury setup needs the currency map matched to a bank tier, message us back and we will assess in 48 hours.',
  },

  {
    id: 'INTAKE',
    accent: '#14532d',
    title: '5-Question Intake Form',
    subtitle: 'The same five questions we run on every advisor referral.',
    headerTag: 'Confidential',
    items: [
      {
        num: '01',
        title: 'UBO Tax Residency — Today and on Bank Onboarding Day',
        body: 'Where is the UBO tax-resident at the date of referral, and where will they be tax-resident on the day of UAE bank onboarding. → What we look for: a clean answer for both dates, with documentation of the change in train where residency is shifting. → Where files break: residency assumed to be UAE because the visa is in process, while the bank reads the home-country tax position the day the account is opened.',
      },
      {
        num: '02',
        title: 'Source-of-Wealth Narrative — Written by the Client',
        body: 'A one-paragraph source-of-wealth narrative drafted by the client, not paraphrased by the advisor. → What we look for: a coherent story that links income, assets, and intended UAE activity, in the client\'s own words. → Where files break: advisor-written summaries that read clean but lose the specificity bank compliance asks about on the second pass.',
      },
      {
        num: '03',
        title: 'Prior Decline or Off-Boarding History',
        body: 'Which jurisdictions has the client been declined or off-boarded from in the last 5 years. → What we look for: a full list, including the jurisdiction, the institution category, and the year. → Where files break: prior off-boarding from a UK or EU institution that surfaces in the screening run after the file has been opened. Undisclosed history is a disqualifying flag.',
      },
      {
        num: '04',
        title: 'Intended UAE Business Activity in Operating Terms',
        body: 'What the company will actually do — operating description, not licence wording. → What we look for: a description that matches the activity bank compliance will read, not the marketing version. → Where files break: licence chosen for speed, activity described in branded language, the gap surfaces when the bank asks how revenue is generated.',
      },
      {
        num: '05',
        title: 'Timeline Pressure and Source',
        body: 'What is the timeline pressure, and where is it coming from. → What we look for: a realistic window, with the driver named — relocation date, transaction completion, year-end deadline. → Where files break: timelines under 14 days for setups that need three jurisdictions to coordinate. The intake filter declines these before the advisor commits to the file.',
      },
    ],
    cta: 'Send answers back — we will return a yes-or-no on the file within 15 minutes.',
  },

  {
    id: 'HOLD',
    accent: '#92400e',
    title: 'Property Holding Decision Framework',
    subtitle: 'Three structures (personal / UAE LLC / offshore), four decision axes.',
    headerTag: 'Confidential',
    items: [
      {
        num: '01',
        title: 'Personal Name',
        check: 'Direct ownership in the UBO\'s personal name. Title deed registered with Dubai Land Department, DLD 4% transfer fee paid at acquisition. Succession defaults to UAE rules in the absence of a registered Will.',
        mistake: 'Treating personal-name ownership as the simplest option without testing it against home-country tax exposure, succession outcome, and intended use of the property.',
        prepare: 'Confirm the home-country position on personal foreign property holdings. Register the Non-Muslim Will at around AED 7,500 if applicable. Document the substance position if the property will be used as such.',
      },
      {
        num: '02',
        title: 'UAE LLC',
        check: 'Property held by a UAE Limited Liability Company. Shares of the LLC fall under default succession when no Will exists. Useful where multiple owners share the property or where the asset is part of a UAE operating structure.',
        mistake: 'Choosing the UAE LLC route without resolving the share-succession question. The shares need a Will or shareholder agreement that addresses transfer on death.',
        prepare: 'Draft the LLC structure with a clear shareholder agreement. Address share succession explicitly. Confirm the activity scope of the LLC supports holding investment property.',
      },
      {
        num: '03',
        title: 'Offshore Holding',
        check: 'Property held by an offshore entity — typical jurisdictions include BVI, Cayman, or a DIFC/ADGM SPV. Used where succession, tax, or confidentiality position requires it.',
        mistake: 'Assuming offshore holding clears every question. Some UAE banks read offshore property holdings as a complexity flag, and home-country tax counsel must address controlled-foreign-company exposure.',
        prepare: 'Coordinate with home-country tax counsel before the structure is built. Confirm bank acceptance of the offshore vehicle as the registered owner. Document the basis for the choice in the file.',
      },
    ],
    cta: 'If a current property file is at the holding-decision stage, message us back and we will review the four axes in 48 hours.',
  },

  {
    id: 'MORTGAGE-UAE',
    accent: '#334155',
    title: 'Non-Resident Mortgage Matrix',
    subtitle: 'UAE banks lending to non-residents, with LTV, deposit, conditions.',
    headerTag: 'Confidential',
    items: [
      {
        num: '01',
        title: 'Tier 1 Banks — Established Non-Resident Lending',
        check: 'Typical LTV in our practice runs at 50% to 60% for non-resident applicants, against a 40% to 50% deposit. Income documentation from the home jurisdiction, two-year audited or tax-filed earnings, and source-of-funds for the deposit are standard.',
        mistake: 'Submitting income documentation that does not reconcile to the home-country tax filings, or a deposit source that cannot be traced through bank statements.',
        prepare: 'Pull two years of income evidence and bank statements covering the deposit. Confirm the home-country tax filings match the declared income. Build the SoF chain for the deposit before approaching the bank.',
      },
      {
        num: '02',
        title: 'Tier 1 Banks — Premium Programs for HNWI',
        check: 'For HNWI applicants with assets-under-management at the bank or its private banking arm, LTV can reach 60% to 70% with relationship-based conditions. The qualifying threshold is the AUM, not the income.',
        mistake: 'Approaching the premium program without the AUM in place. The relationship condition is structural, not promotional.',
        prepare: 'Confirm the AUM position before the application. Coordinate the wealth-management onboarding with the mortgage application as one engagement, not two.',
      },
      {
        num: '03',
        title: 'Tier 2 Banks — Selective Non-Resident Acceptance',
        check: 'LTV typically 40% to 55% for non-resident applicants. Income and SoF requirements similar to Tier 1, with stricter screening on jurisdiction and counterparty profile.',
        mistake: 'Using a Tier 2 bank as a fallback after a Tier 1 decline without addressing the reason for the Tier 1 outcome. The same factors usually drive the Tier 2 decision.',
        prepare: 'Where Tier 1 has declined, document the basis and address it before the Tier 2 application. Banks talk to each other less than expected; files do not, in practice, transfer cleanly without rework.',
      },
      {
        num: '04',
        title: 'Specialist Mortgage Providers — Higher LTV at Higher Cost',
        check: 'Some specialist providers offer 65% to 70% LTV to non-residents at higher rates and tighter pre-payment terms. Used where Tier 1 and Tier 2 are not viable on the file profile.',
        mistake: 'Defaulting to the specialist route without testing Tier 1 and Tier 2 first. The rate differential is material over a 25-year term.',
        prepare: 'Sequence the application by tier. Move to specialist only after Tier 1 and Tier 2 have been assessed against the actual file. Document the reason for each tier outcome.',
      },
      {
        num: '05',
        title: 'Common Decline Reasons Across Tiers',
        check: 'The reasons we see most often in our practice. Income volatility from self-employed sources without two years of audited evidence. Deposit source that cannot be traced to a documented origin. Jurisdiction or counterparty exposure flagged at screening. Activity profile of the source business that is excluded from the bank\'s appetite.',
        mistake: 'Treating mortgage decline as a property issue when it is usually a banking-relationship issue. The mortgage sits on top of the bank\'s general risk view of the applicant.',
        prepare: 'Run the same Pre-Screen logic that applies to operating banking — income, SoF, jurisdiction, activity. The mortgage application is downstream of the banking-relationship file.',
      },
    ],
    cta: 'If a current mortgage application is stalled or pre-application, message us back and we will assess the tier match in 48 hours.',
  },

  {
    id: 'GOLDEN-RE',
    accent: '#a16207',
    title: 'Golden Visa Qualifying-Value Worksheet',
    subtitle: 'What counts toward AED 2M, ICP versus GDRFA Dubai.',
    headerTag: 'Confidential',
    items: [
      {
        num: '01',
        title: 'Property Value Threshold — AED 2 Million',
        body: 'The current Golden Visa qualifying threshold for property investment is AED 2 million in property value. → The threshold is a floor, not a target; valuations close to AED 2 million are reviewed more carefully. → Both ICP (Federal Authority for Identity, Citizenship, Customs and Port Security) and GDRFA Dubai (General Directorate of Residency and Foreigners Affairs) administer the route, with practice differences on documentation and timelines.',
      },
      {
        num: '02',
        title: 'Single Property vs Multiple Properties',
        body: 'A single property at or above AED 2 million qualifies. → Multiple properties combining to AED 2 million can qualify under current practice, with documentation of each title deed and aggregate valuation. → Off-plan property under construction is treated separately — the qualifying basis depends on completion status, payment percentage, and jurisdiction practice. Confirm the position before relying on it.',
      },
      {
        num: '03',
        title: 'Mortgaged Property — Net or Gross Value',
        body: 'Where the property is mortgaged, qualifying value is generally assessed on the equity portion held by the applicant, not the gross property value. → A property valued at AED 3 million with an AED 2 million mortgage may not qualify on the equity test. → The position varies between ICP and GDRFA Dubai practice; coordinate with the route administrator before assuming qualification.',
      },
      {
        num: '04',
        title: 'Joint Ownership and Co-Applicants',
        body: 'Joint ownership splits the qualifying value between owners. → Each co-applicant must individually meet the threshold against their share. → A jointly held AED 2 million property does not qualify two applicants on its own; each owner needs AED 2 million in their own qualifying value. Family applications follow the dependant-sponsorship route, not co-qualification.',
      },
      {
        num: '05',
        title: 'ICP vs GDRFA Dubai — Practice Differences',
        body: 'The Golden Visa is a federal route administered through both ICP at federal level and GDRFA Dubai at emirate level for Dubai-located applicants. → Documentation expectations and processing timelines differ between the two channels in our practice. → The right channel depends on residency intent, property location, and family composition. Confirm the channel before the application is built.',
      },
    ],
    cta: 'If a current Golden Visa file needs the qualifying-value position checked against the property holding, message us back and we will review in 48 hours.',
  },

  {
    id: 'EXIT',
    accent: '#7f1d1d',
    title: 'Property Exit Checklist',
    subtitle: 'Banking, capital flow, and tax sequencing before listing.',
    headerTag: 'Confidential',
    items: [
      {
        num: '01',
        title: 'Banking Relationship for Sale Proceeds',
        body: 'The account that will receive the sale proceeds needs to be defined and ready before the property is listed. → A sale that closes into an account with a thin classification triggers a transaction hold. → Re-classify the receiving account ahead of completion, or open a separate account sized for the proceeds. The DLD 4% transfer fee, agent fees, and any mortgage settlement come out of the proceeds at completion.',
      },
      {
        num: '02',
        title: 'Source-of-Funds Documentation for the Buyer',
        body: 'The buyer\'s SoF documentation is the buyer\'s problem until the bank reads it on the inbound wire. → A clean buyer SoF clears the wire. A thin buyer SoF stalls the proceeds in the seller\'s account. → Where the deal allows, coordinate with the buyer\'s side on SoF readiness before completion. The seller bears the timing cost when the buyer\'s file is thin.',
      },
      {
        num: '03',
        title: 'Capital Flow Plan to Onward Destination',
        body: 'The proceeds rarely stay in the receiving account. → Define the onward destination — home-country account, investment custody, structured holding — and the documentation each leg requires. → Outbound wires from the UAE inherit the receiving bank\'s correspondent screening. A USD wire to a US custodian, a EUR wire to a European bank, a CHF wire to Swiss custody — each route has its own compliance posture.',
      },
      {
        num: '04',
        title: 'Home-Country Tax Coordination',
        body: 'The sale event creates a tax position in the home jurisdiction in many cases. → Capital gains, income, or remittance treatment depends on the home-country regime. → Coordinate with home-country tax counsel before the listing date, not after the proceeds arrive. The tax position is upstream of the banking sequence.',
      },
      {
        num: '05',
        title: 'Structure Unwind if Held via Entity',
        body: 'Where the property is held via a UAE LLC or offshore entity, the unwind has its own steps. → Share transfer, entity dissolution, or share sale to the buyer — each has a different tax and banking footprint. → The structure decision at acquisition becomes the structure decision at exit. Sequence the unwind with the proceeds plan, not after.',
      },
    ],
    cta: 'If a current property is heading to listing, message us back and we will sequence the banking and tax position in 48 hours.',
  },

  {
    id: 'POA-RE',
    accent: '#262626',
    title: 'Remote-Purchase POA Framework',
    subtitle: 'Drafting, legalisation chain, DLD acceptance, lender templates.',
    headerTag: 'Confidential',
    items: [
      {
        num: '01',
        title: 'POA Drafting — Scope and Specific Authority',
        body: 'The Power of Attorney must grant specific authority for the transaction — execute SPA, pay deposits, sign at DLD, register title. → Generic POA wording is rejected at DLD acceptance in our practice. → Draft the POA with the property address, the parties, and the specific acts authorised. Include explicit authority to sign mortgage documents if a lender is involved.',
      },
      {
        num: '02',
        title: 'Legalisation Chain — Notary, Apostille, MOFA',
        body: 'A POA executed outside the UAE must be legalised through a chain. → Home-country notary → Apostille or Foreign Office authentication → UAE Embassy attestation in the home country → MOFA (Ministry of Foreign Affairs) attestation in the UAE. → Each step takes time and creates a failure mode. Skip a step and DLD will reject the document at registration. Sequence the legalisation before the SPA signature date.',
      },
      {
        num: '03',
        title: 'DLD Acceptance — Format and Translation',
        body: 'Dubai Land Department accepts POAs in Arabic or with certified Arabic translation alongside the source language. → A POA in English alone, even properly legalised, is not registrable at DLD without translation. → Engage a sworn translator after legalisation completes. The translated copy travels with the original through the registration step.',
      },
      {
        num: '04',
        title: 'Lender Template Requirements',
        body: 'Where the purchase involves a UAE mortgage, the lender often requires its own POA template, not the generic transaction POA. → Lenders specify the wording for borrower authority on mortgage execution, settlement, and post-completion variations. → Pull the lender template at the mortgage offer stage, not after. Where two POAs are needed — transaction and lender — sequence both through the same legalisation chain to avoid duplicating timelines.',
      },
      {
        num: '05',
        title: 'Attorney-in-Fact Selection and Limitation',
        body: 'The attorney-in-fact named in the POA bears legal authority on behalf of the principal until revocation. → Select an attorney with no conflict — not the seller, not the agent, not an interested counterparty. → Limit the POA in time and scope where possible. A POA that survives the transaction creates ongoing exposure. Revoke and lodge the revocation at DLD after completion.',
      },
    ],
    cta: 'If a current remote purchase is at the POA-drafting stage, message us back and we will review the chain in 48 hours.',
  },
];
