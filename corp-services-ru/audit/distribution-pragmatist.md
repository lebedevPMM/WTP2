# Distribution-Pragmatist Audit

## Reading time fit
- **V1A:** ~1 240 слов (по footer-метке) → ~5 мин при vдумчивом чтении, ~2:30 при scan. Target был 2-3 мин / 1100-1500 слов. Длина — ОК, но плотность бuллетов поднимает effective scan-time. Для коллеги в WhatsApp — fits.
- **V1B:** ~2 650 слов → ~10-11 мин при чтении подряд, 6-7 мин при scan headlines + outcome-lines. Target 5-7 мин / 2200-2800 слов. **На верхней границе.** При первом open в чате коллега не прочитает целиком — но это и не цель; cap target hit.

## Mobile / scannable
- **V1A:** иерархия чистая — H1 → H2 секции → 01-05 тэги + H3 + bullets + outcome. Bullet density высокая (6 bullets / направление), на mobile это comfortable list. Прозы мало — для compact angle правильно.
- **V1B:** H2/H3 hierarchy ОК, но **направления 02 и 04 содержат прозовые блоки по 100+ слов без визуального разрыва** — на mobile это серая стена. Решение: добавить bold-lead-in каждые 60-80 слов ИЛИ разбить на 2 короче параграфа. Кейс-карточки 6 штук друг под другом без grid — на mobile длинный скролл.

## Preview-card test
- **V1A og:title (H1):** «Работающая международная инфраструктура бизнеса в ОАЭ» — РАБОТАЕТ как preview-tease: смысл понятен с lock-screen, не sales, не cringe. ОК.
- **V1A og:description (sub, 150 chars):** «WTP — operator-фирма в ОАЭ. С 2019 года ведём корпоративные структуры клиентов из СНГ: регистрация компаний, банковские счета, резидентство…» — РАБОТАЕТ. Год + география + capabilities в первой строке = идеально для WhatsApp preview.
- **V1B og:title:** «Корпоративные услуги в ОАЭ — регистрация, банковская инфраструктура, операционное сопровождение» — descriptive, но **17 слов = обрежется на mobile preview** (~60 chars max). Реально покажется «Корпоративные услуги в ОАЭ — регистрация, банковская…» — теряется операционка. **Switch на вариант B или C из его альтернатив**, либо примите V1A H1.
- **V1B og:description:** «WTP помогает бизнесу из СНГ работать через ОАЭ: регистрация компаний, открытие счетов, резидентство, бухгалтерия и частные вопросы…» — РАБОТАЕТ.

## Forward-readiness (copy-pasteability)
- **V1A:** outcome-lines каждого направления — самостоятельные предложения, лифтуемые. Примеры: «Счета открываются за 4–8 недель и работают без блокировок в долгую — потому что структура подбирается под банк изначально.» + «Резидентство, которое банк и налоговая признают как substance, — не формальный штамп.» + «Лицензия не истекает молча, отчётность сдаётся в срок…» — все три forward-friendly.
- **V1B:** prose-плотность снижает copy-paste утилитарность. НО лучшие куски: «корпоративная структура в ОАЭ оценивается не по факту регистрации, а по тому, проходит ли она банковский комплаенс через год, через три, через пять» — это **самая forward-friendly строка во всём документе**. Также: timeline-параграф S4 — readable как самостоятельный mini-explainer.

## CTA mechanics
- **V1A:** контакты Сергея видны блоком, Telegram/WhatsApp/Email + Иван fallback. Форма опциональная, 3 поля. Mobile-friendly. **Только проблема:** в V1A нет mid-page contact-block (CONSTITUTION §6 требует «1 contact-block в середине»). Только S7. Sergey forwarded link → читатель видит контакты только после полного скролла.
- **V1B:** аналогично — единый contact-block в S7. То же замечание.

## Cases — distribution scan
- **V1A 3 карточки:** каждая 60-80 слов, **читается в 20-25 секунд** — ОК. Headlines descriptive. ИСКЛЮЧЕНИЕ: третья карточка headline 9 слов с тремя запятыми — на mobile перенесётся в 3 строки, читается тяжелее. Сокращение до «Полный цикл: продажа, Golden Visa, реинвест» решает.
- **V1B 6 карточек:** каждая ~80-100 слов, **30-35 секунд каждая, итого 3 мин на cases-секцию** — превышает scan-budget. Карточка 6 (IFZA европейский производитель) — самая длинная и абстрактная, слабее остальных. Drop до 5 карточек.
- **/cases/case-v1a.md (difc-holding-mining):** ~450 слов / 2 мин — идеальная длина для forwarded /cases/{slug}.
- **/cases/case-v1b.md (difc-mining-holding):** ~1 050 слов / 5 мин — на верхней границе. Section 3 «Что мы сделали» — 3 длинных параграфа, можно подрезать средний на 30%.

## Recommended length verdict
- **V1A:** shipping length OK. Не trim — это попадание в genre.
- **V1B:** **trim 200-300 слов.** Кандидаты: drop карточка 6, сократить S2 paragraph 2 на 30%, разбить S3.02 banking-параграф на 2.

## For synthesizer
- **Most distribution-friendly from V1A:** все 5 outcome-lines направлений (особенно 02, 03, 04); hero H1+sub; S4 метод-параграф (компактный, термин bankable structure введён без пафоса); 3 cases headlines.
- **Most distribution-friendly from V1B:** S4 параграф 1 («корпоративная структура оценивается не по факту регистрации, а по тому, проходит ли она через год, через три, через пять»); S4 timeline-параграф; S2 paragraph 1 (institutional intro с цифрами); карточки 4 (mortgage-to-mortgage) и 5 (general trading recovery) — конкретные, scan-friendly.
- **Sections to compress:** V1B S3.02 banking-prose; V1B S2 paragraph 2; V1B карточка 6 (drop).
- **Sections to keep as-is:** V1A целиком; V1B S4; V1B S1 hero sub; V1B карточки 1, 2, 4, 5.

## One-line verdict
V1A — distribution-ready as-is, **только добавить mid-page contact-block**; V1B — отличный для linked-to depth read, но H1 обрежется в WhatsApp preview и нужен trim на 200-300 слов + один mid-CTA.
