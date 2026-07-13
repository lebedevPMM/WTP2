# Audience-Spotter Audit

## Conversion-mode leakage scan

### V1A
**Lines / phrases that drift into end-client conversion mode:**
- S3-02 outcome: «Счета открываются за 4–8 недель и **работают без блокировок в долгую** — потому что структура подбирается под банк изначально, **а не подгоняется после первого отказа**.» — second half implies the end-client fear «банк заблокирует / откажет». Capability fact slips into «чтобы вас не отказали».
- S3-03 outcome: «Резидентство, которое банк и налоговая **признают как substance**, — не формальный штамп для перевыпуска карты.» — frames against a fear (банк/налоговая не признает). Mild leakage; «штамп для перевыпуска карты» also reads like a B2C jab.
- S3-04 outcome: «Лицензия не истекает молча, отчётность сдаётся в срок, compliance **не дёргает клиента раз в неделю** запросами на повторный pack документов.» — three negations of client-fears in one line. Pure §3.X right column violation.
- S3-05 outcome: «...не отдельным проектом полгода спустя, **когда уже куплены апартаменты и закрыто наследство в России**.» — vivid end-client scenario, almost vignette. Pushes pathos.
- Hero CTA pair `[Связаться] [Посмотреть кейсы]` — fine for catalog; «Связаться» soft, OK.

**Verdict for V1A:** Minor leakage — S3 outcome-lines repeatedly invert into «чтобы не…» frames. Hero, S2, S4, S6, S7 clean.

### V1B
**Lines / phrases that drift into end-client conversion mode:**
- S3-04 lede: «направление, на котором клиенты, выбравшие сабконтрактных setup-агентов, **обычно теряют структуру в течение 12-24 месяцев**. ...клиент **узнаёт о просроченной лицензии от банка, который заблокировал счёт**.» — classic fear-led opener, competitor-bash. A senior lawyer will read this as «вы продаёте мне FOMO про конкурентов».
- S3-02 mid: «направление, где для бизнеса из СНГ обычно концентрируется **наибольший риск отказа и наибольшая операционная боль** после регистрации» — «боль» = B2C marketing diction.
- S3-04 outcome: «...compliance не дёргает клиента раз в неделю, **банк видит структуру как стабильную и предсказуемую**.» — same fear-inversion pattern as V1A.
- S3-03 outcome: «Резидентство, которое банк и налоговая признают как substance — **не формальный штамп для путешествий**...» — same B2C jab as V1A.
- S4 method: «**проверяем bankability на этапе идеи, не после четырёх отказов**.» — sales-pitch cadence, end-client fear.
- Case 5 headline: «**Открыли счёт после 4 месяцев отказов**» — outcome-as-rescue, conversion-style. OK in case body, but as headline it sells.

**Verdict for V1B:** Minor-to-moderate leakage — S3-04 lede is the worst offender (full fear-narrative paragraph). S3-02, S4 carry sales cadence. Hero, S2, team, contacts clean.

## Outcome-language framing audit

| Direction | V1A frame | V1B frame |
|---|---|---|
| 01 Регистрация | ✅ Capability — «оформляются под конкретный банк и операционную задачу» | ✅ Capability — «не вслепую, не по принципу "сначала открываем, потом разбираемся"» (mild jab but capability-led) |
| 02 Банк | ❌/✅ mixed — «работают без блокировок» (fear) + «структура подбирается под банк» (capability) | ❌ mixed — «наибольший риск отказа и операционная боль» (fear-led) |
| 03 Резидентство | ❌ «не формальный штамп для перевыпуска карты» (anti-fear) | ❌ «не формальный штамп для путешествий» (anti-fear) |
| 04 Операционка | ❌ triple-negation fear-list | ❌ full fear-paragraph + «банк видит как стабильную» |
| 05 Частные | ❌ «не отдельным проектом полгода спустя, когда уже куплены апартаменты» | ✅ «не отдельным проектом полгода спустя, когда юристы заново разбираются» (capability-leaning) |

## CTA mechanics audit
- **V1A:** Primary «Связаться», secondary «Посмотреть кейсы», form button «Отправить запрос», subtext «Ответим в течение рабочего дня». ✅ Aligned with §6. No urgency, no Pre-Screen.
- **V1B:** Identical CTA mechanics. ✅ §6-compliant. Form spec matches §7 (3 fields, soft label). Both clean.

## Case page audit (case-v1a / case-v1b)
- **case-v1a (`case-v1a.md`):** Catalog-style capability proof. Sections: Контекст → Что сложно → Что мы сделали → Результат → Что бы сделали по-другому. Anonymized correctly («предприниматель из ЕС»). CTA bottom «Если у вас клиент с многоуровневой структурой...» = peer-to-peer, not end-client sell. ✅ Clean.
- **case-v1b (`case-v1b.md`):** Same template, deeper. CTA «Похожая ситуация — DIFC, мульти-юрисдикционный setup, расширенный комплаенс?» speaks TO a colleague who has a client. ✅ Clean. One yellow flag in §3: «обоснованное недоверие» characterising the client emotionally — minor, acceptable.

## For synthesizer
**MUST rewrite (verbatim → suggested):**
- V1A S3-02 outcome → «Счета открываются за 4-8 недель. Структура согласована с банком до подачи, поэтому повторный KYC и переоформление не входят в стандартный путь.»
- V1A S3-04 outcome → «Продления, отчётность и compliance ведутся по календарю команды; клиент получает квартальный summary, а не реактивные запросы.»
- V1A S3-03 outcome → «Резидентство оформляется как часть substance-аргументации — с документальной базой под банковский и налоговый review.»
- V1B S3-04 lede → drop fear-narrative; open with: «Ongoing-сопровождение — продления, бухгалтерия, налоги, compliance. Календарь ведёт команда WTP; клиент получает summary, не запросы.»
- V1B S3-02 «наибольший риск отказа и наибольшая операционная боль» → «направление, где у бизнеса из СНГ концентрируется основной объём подготовки KYC и согласований»
- V1B S4 «не после четырёх отказов» → drop entirely or → «банковский маршрут фиксируется в начале, не по итогу подачи»
- V1B Case 5 headline «Открыли счёт после 4 месяцев отказов» → «Перерегистрация активностей + согласованный KYC → счёт открыт»

**Sections that are clean and should be preserved:**
- V1A: hero, S2 about, S4 method (kept tight), S6 team, S7 contacts, S8 footer
- V1B: hero (all three H1 variants), S2 about, S6 team, S7 contacts, S8 footer
- Both case pages (anonymization, CTA, narrative arc)

## One-line verdict
Both versions hold catalog tone in hero/team/contacts/method/cases, but slip into Сергеев-end-client outcome diction inside S3 direction-blocks — fixable surgically (~10 line rewrites) without touching architecture.
