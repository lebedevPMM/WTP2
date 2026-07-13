#!/usr/bin/env python3
"""Generate Week 5 Report + Week 6 Plan as a DOCX file for Google Docs upload."""

from docx import Document
from docx.shared import Pt, Inches, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
import os

doc = Document()

# -- Styles --
style = doc.styles['Normal']
style.font.name = 'Calibri'
style.font.size = Pt(10.5)
style.paragraph_format.space_after = Pt(4)
style.paragraph_format.line_spacing = 1.15

for level in range(1, 4):
    hs = doc.styles[f'Heading {level}']
    hs.font.name = 'Calibri'
    hs.font.color.rgb = RGBColor(0x1A, 0x1A, 0x2E)

doc.styles['Heading 1'].font.size = Pt(18)
doc.styles['Heading 2'].font.size = Pt(14)
doc.styles['Heading 3'].font.size = Pt(12)


def add_table(headers, rows, col_widths=None):
    table = doc.add_table(rows=1 + len(rows), cols=len(headers))
    table.style = 'Light Grid Accent 1'
    table.alignment = WD_TABLE_ALIGNMENT.LEFT
    # Header
    for i, h in enumerate(headers):
        cell = table.rows[0].cells[i]
        cell.text = h
        for p in cell.paragraphs:
            for r in p.runs:
                r.bold = True
                r.font.size = Pt(9.5)
    # Data
    for ri, row in enumerate(rows):
        for ci, val in enumerate(row):
            cell = table.rows[ri + 1].cells[ci]
            cell.text = str(val)
            for p in cell.paragraphs:
                for r in p.runs:
                    r.font.size = Pt(9.5)
    doc.add_paragraph()


def add_check(text, done=True):
    p = doc.add_paragraph()
    mark = '\u2705' if done else '\u2B1C'
    run = p.add_run(f'{mark}  {text}')
    run.font.size = Pt(10.5)


def add_bullet(text, bold_prefix=None):
    p = doc.add_paragraph(style='List Bullet')
    if bold_prefix:
        r = p.add_run(bold_prefix)
        r.bold = True
        p.add_run(f' {text}')
    else:
        p.add_run(text)


def add_quote(text):
    p = doc.add_paragraph()
    p.paragraph_format.left_indent = Cm(1.2)
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(6)
    run = p.add_run(text)
    run.italic = True
    run.font.size = Pt(10)
    run.font.color.rgb = RGBColor(0x44, 0x44, 0x44)


# ========== TITLE ==========
title = doc.add_heading('WTP — Неделя 5: Отчёт + План Недели 6', level=0)
title.alignment = WD_ALIGN_PARAGRAPH.CENTER
p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
p.add_run('Дата: 2 марта 2026  |  Период: Неделя 5 (24 фев — 2 мар)').font.size = Pt(11)
doc.add_paragraph()

# ========== PART 1 ==========
doc.add_heading('ЧАСТЬ 1: НЕДЕЛЯ 5 — ЧТО СДЕЛАНО', level=1)

# -- 1. One-Pager --
doc.add_heading('1. Partner One-Pager v3.0 (EN + RU) \u2705', level=2)
doc.add_paragraph('Обновлённый одностраничник на основе реальной обратной связи.')
add_bullet('ICP обновлён: tax advisors, corporate lawyers, family offices, wealth managers')
add_bullet('Tagline: «We execute — you advise»')
add_bullet('Добавлена секция «What partners ask» — 5 Q&A с ответами на реальные возражения')
add_bullet('SLA таблица: 5 обязательств с конкретными сроками')
add_bullet('Модели партнёрства: referral + white-label')
add_bullet('Уровни услуг L0–L3')

# -- 2. How We Work --
doc.add_heading('2. How We Work: Process and Boundaries (EN + RU) \u2705', level=2)
doc.add_paragraph('Документ на 2 страницы. Выдерживает «forward test» — понятен без контекста.')
doc.add_paragraph('10 секций: Who WTP Is \u2192 Our Process (4 фазы) \u2192 What We Handle \u2192 What We Don\'t Handle \u2192 Boundaries \u2192 SLA \u2192 Communication \u2192 What We Need From Partners \u2192 Escalation \u2192 Contact')

# -- 3. What We Need Upfront --
doc.add_heading('3. What We Need Upfront (EN + RU) \u2705', level=2)
doc.add_paragraph('Документ на 2 страницы. Инструктивный формат для подготовки клиента.')
doc.add_paragraph('6 секций: минимальный пакет документов \u2192 Source of Funds (Green/Yellow/Red) \u2192 частые ошибки партнёров \u2192 talking point для клиента \u2192 процесс после подачи \u2192 контакт')

# -- 4. Partner Kit --
doc.add_heading('4. Partner Kit на сайте — обновлён \u2705', level=2)
add_bullet('Добавлены карточки «How We Work» и «What We Need Upfront»')
add_bullet('Добавлена секция «Download Full Kit» с ZIP-архивом')
add_bullet('i18n ключи EN + RU')
add_bullet('ZIP: WTP_Partner_Kit_EN.zip (1.0 MB), WTP_Partner_Kit_RU.zip (1.2 MB)')
add_bullet('Состав: One-Pager, How We Work, What We Need Upfront, Service Packages, Process Map, Risk Policy, Intake Checklist')

# -- 5. Flagship Case --
doc.add_heading('5. Flagship Case Study \u2705', level=2)
doc.add_paragraph('Первый реальный кейс WTP. Ювелирный бренд, Meydan Free Zone, DNFBP.')
add_bullet('Закупка золота/камней в ОАЭ \u2192 производство в Армении \u2192 импорт обратно \u2192 онлайн-продажи worldwide')
add_bullet('DNFBP pre-approval + SIRA inspection')
add_bullet('Корпоративный счёт в top-tier банке ОАЭ (high-risk DNFBP профиль)')
add_bullet('Легальный приём крипто (BTC/ETH/USDT) через licensed processors')
add_bullet('8 недель от первого контакта до запуска')
add_bullet('Полный case study + LinkedIn пост (анонимизирован)')

# -- 6. LinkedIn --
doc.add_heading('6. LinkedIn — 3 поста подготовлены \u2705', level=2)
doc.add_paragraph('Запланированные Editorial + Expert Insight заменены на Crisis Debut Posts.')
add_bullet('Пост 1 (дебют): Представление WTP + операционный статус во время кризиса')
add_bullet('Пост 2 (фреймворк): ACKNOWLEDGE \u2192 SEPARATE \u2192 INFORM \u2192 REFRAME \u2192 OFFER')
add_bullet('Пост 3 (flagship case): Ювелирный бренд, Meydan Free Zone — реальный кейс')

# -- 7. Emails --
doc.add_heading('7. Email-шаблоны для re-engagement \u2705', level=2)
doc.add_paragraph('4 касания для re-engagement партнёров, привязанные к текущей ситуации:')
add_table(
    ['Касание', 'День', 'Тема', 'Цель'],
    [
        ['1', 'Сегодня', 'Operational update — ситуация в UAE', 'Восстановить контакт'],
        ['2', 'День 2-3', 'Framework для разговора с клиентами', 'Позиционировать как эксперта'],
        ['3', 'День 7', 'Новые материалы + предложение пилота', 'Поделиться документами'],
        ['4', 'День 14', 'Check-in — есть ли UAE-кейсы?', 'Мягкое закрытие'],
    ]
)

# -- Summary table --
doc.add_heading('Сводка по критериям недели 5', level=2)
add_table(
    ['Критерий', 'Статус'],
    [
        ['Partner One-Pager v3.0 (EN + RU)', '\u2705 DONE'],
        ['«How We Work» (EN + RU)', '\u2705 DONE'],
        ['«What We Need Upfront» (EN + RU)', '\u2705 DONE'],
        ['4 касания по базе', '\u2705 Шаблоны готовы'],
        ['2+ LinkedIn-поста', '\u2705 3 поста подготовлены'],
        ['Partner Kit на сайте', '\u2705 Код обновлён'],
        ['Flagship Case Study', '\u2705 DONE (сверх плана)'],
        ['Crisis email sequence', '\u2705 DONE (сверх плана)'],
    ]
)

doc.add_page_break()

# ========== PART 2 ==========
doc.add_heading('ЧАСТЬ 2: ПЛАН НЕДЕЛИ 6 — НОВЫЙ OUTREACH', level=1)

doc.add_heading('Стратегия', level=2)
doc.add_paragraph('Начинаем таргетированный outreach на новых кандидатов. Контактов из месяца 1 нет — всё с нуля.')
doc.add_paragraph('Подход: «Спросить мнение о memo» — не продажа, а запрос экспертного мнения. Снижает барьер, создаёт reciprocity.')

# -- WAVE 1 --
doc.add_heading('ВОЛНА 1 — Tier 1 (3-5 марта): 10 кандидатов', level=2)
doc.add_paragraph('Уже в теме UAE или максимально релевантны.')

candidates_t1 = [
    ['1', 'Churchill Tax Advisers', 'Jamal Khan, Senior Tax Partner', 'London', 'UK', 'Отдельная страница "Business set up in UAE". Уже консультируют по UAE.'],
    ['2', 'Alliotts LLP', 'Sarah Messruther (Dubai specialist)', 'London, Guildford', 'UK', 'Страница "Moving to Dubai". Alliott Global Alliance (220+ фирм).'],
    ['3', 'Tax Advisory Partnership', 'Jamie Favell, Head of Private Clients', 'London', 'UK', 'Non-dom specialist. eprivateclient Top Firm 2025. LinkedIn-активен.'],
    ['4', 'GoldHouse Accounting', '"Zee" (основатель)', 'Harpenden', 'UK', 'Premium HNWI accounting, Dubai-релокация. Boutique.'],
    ['5', 'DELTAKAP', 'Ralf Lobker (основатель)', 'München + Dubai/RAK', 'DE', 'Cross-border DE\u2194UAE с 2014. Офисы в Dubai/RAK.'],
    ['6', 'KENDRIS', 'Christian Lyk (CEO)', 'Zürich + DIFC Dubai', 'CH', 'Family office, 210 спец. Офис в DIFC Dubai.'],
    ['7', 'Caputo & Partners', 'Enzo Caputo (ex-UBS)', 'Zürich', 'CH', 'Banking/tax law для UHNWI. Подкаст "Swiss Banking Lawyers".'],
    ['8', 'BFI Infinity', 'Jan Lubbe, Partner', 'Zürich', 'CH', 'Cross-border UHNWI. FINMA + SEC. LinkedIn-активен.'],
    ['9', 'OrangeTax', 'Arnold Waal (основатель)', 'Amsterdam', 'NL', 'Налоги для экспатов. Публикуют контент про Dubai/UAE.'],
    ['10', 'Artvera Private Wealth', 'Artur Bounegra, CEO', 'London (Mayfair)', 'UK', 'Boutique FCA-regulated HNWI/UHNWI. CIS/EE клиенты.'],
]

add_table(
    ['#', 'Фирма', 'Контакт', 'Город', 'Страна', 'Почему Tier 1'],
    candidates_t1
)

# -- WAVE 2 --
doc.add_heading('ВОЛНА 2 — Tier 2 (10-12 марта): 10 кандидатов', level=2)
doc.add_paragraph('Сильная cross-border практика.')

candidates_t2 = [
    ['11', 'Harbottle & Lewis', 'Chris Moorcroft', 'London', 'UK', 'Boutique wealth planning. Chambers-ranked. LinkedIn-активен.'],
    ['12', 'Edwin Coe LLP', 'Sean Bannister, Head of Tax', 'London', 'UK', 'Non-dom exit planning. Кейсы "UK exit to Monaco".'],
    ['13', 'Mercer & Hole', 'Liz Cuthbertson', 'London, St Albans', 'UK', 'Top 40. eprivateclient Boutique finalist.'],
    ['14', 'Patronus Partners', 'James Barton', 'London', 'UK', 'Spear\'s "Top 10 Wealth Managers UK".'],
    ['15', 'Conrad Family Office', 'John Clifford, Founder', 'London (Bond St)', 'UK', 'Discreet MFO для UHNW families.'],
    ['16', 'WinHeller', 'Stefan Winheller', 'Frankfurt', 'DE', '"German Tax Law Firm of the Year". LinkedIn-активен.'],
    ['17', 'Vermögensschutz / Gierhake', 'Prof. Dr. Olaf Gierhake', 'Liechtenstein', 'LI', '100+ проектов. Пишет про Auswanderung.'],
    ['18', 'Hamelink & Van den Tooren', 'Wouter Vosse, Partner', 'Amsterdam', 'NL', 'Независимый бутик (с 1997). Chambers-ranked.'],
    ['19', 'Providence Capital', '—', 'Bussum', 'NL', 'EUR 3B+ AUM. 100+ family clients.'],
    ['20', 'Tax Partner AG', 'Peter Vogt', 'Zürich', 'CH', 'Крупнейший независимый налоговый бутик CH. Taxand.'],
]

add_table(
    ['#', 'Фирма', 'Контакт', 'Город', 'Страна', 'Профиль'],
    candidates_t2
)

# -- WAVE 3 --
doc.add_heading('ВОЛНА 3 — Tier 3 (17-19 марта): 10 кандидатов', level=2)
doc.add_paragraph('Качественные бутики.')

candidates_t3 = [
    ['21', 'Blick Rothenberg', 'Roger Holman', 'London', 'UK', 'Top-10 eprivateclient. Non-dom, IHT.'],
    ['22', 'Saffery', '—', 'London + Geneva', 'UK/CH', 'eprivateclient Top Firm 2025. Nexia International.'],
    ['23', 'Mosaic Chambers', '—', 'London + Dubai', 'UK/UAE', 'Relocation UK-UAE. Партнёр или конкурент.'],
    ['24', 'Haggards Crowther', '—', 'London', 'UK', 'Family-owned, non-dom advisory.'],
    ['25', 'MFFA', 'Folkert Mijlof', 'Amsterdam', 'NL', 'Emigration, cross-border. 30+ лет.'],
    ['26', 'KDPS', 'Hans Keijzer', '—', 'NL', 'International tax counsel (с 1995).'],
    ['27', 'UMA Wealth', '—', 'Zürich', 'CH', 'Trustee + corporate. WealthBriefing Award 2026.'],
    ['28', 'Alpen Partners', '—', 'Zürich', 'CH', '$1B AUM. 30+ стран. SEC-registered.'],
    ['29', 'Skybound Wealth', '—', 'UK/Dubai', 'UK/UAE', '10,000 клиентов. $1B+. Expat advisory.'],
    ['30', 'Expat Pension Holland', 'Patrick Donders', '—', 'NL', 'HNWI (7-8 figure estates).'],
]

add_table(
    ['#', 'Фирма', 'Контакт', 'Город', 'Страна', 'Профиль'],
    candidates_t3
)

# -- Qualification --
doc.add_heading('Критерии отбора кандидатов', level=2)
add_table(
    ['Критерий', 'Обязательный'],
    [
        ['Практика: международное структурирование', 'Да'],
        ['Клиенты: HNWI / business owners', 'Да'],
        ['География: UK, DE, NL, CH, Скандинавия', 'Да'],
        ['Размер: 2-50 человек (бутик)', 'Да'],
        ['LinkedIn-активность', 'Желательно'],
        ['Упоминали UAE в публикациях', 'Бонус'],
    ]
)

# -- Approach --
doc.add_heading('Подход: «Спросить мнение о memo»', level=2)
doc.add_paragraph('Вместо cold sell — запрос экспертного мнения:')
add_quote('"Подготовили короткий memo о последствиях отмены UK non-dom статуса для UAE-структурирования. Учитывая вашу практику, было бы ценно узнать ваше мнение."')
add_bullet('Flattery — просим мнение = признаём экспертизу', bold_prefix='Почему работает:')
add_bullet('Reciprocity — даём ценный контент бесплатно')
add_bullet('Низкий барьер — не просим ни купить, ни звонить')
add_bullet('Контент-якорь — memo + partner page = пассивная продажа')

# -- Touch sequence --
doc.add_heading('Последовательность касаний', level=2)
add_table(
    ['#', 'День', 'Канал', 'Действие'],
    [
        ['1', 'День 0', 'Email', '«Спросить мнение о memo» + ссылка на partner page'],
        ['2', 'День 1-2', 'LinkedIn', 'Connection request с персонализированной нотой'],
        ['3', 'День 5-7', 'Email', 'Follow-up: "Отправлял memo. Если актуально — рад обсудить"'],
        ['4', 'День 7-10', 'LinkedIn DM', 'Поделиться свежим постом WTP'],
        ['5', 'День 14', 'Email', 'Финальное: "Если будет актуально — вот контакт"'],
    ]
)
doc.add_paragraph('Максимум 3 email без ответа \u2192 перевод в Nurture (revisit через 3 месяца).')

# -- KPI --
doc.add_heading('KPI недели 6', level=2)
add_table(
    ['Метрика', 'Цель'],
    [
        ['Волна 1 отправлена', '10 кандидатов'],
        ['LinkedIn connections', '+10-15'],
        ['Ответы', '2-3 из 10 (20-30%)'],
        ['Звонки назначены', '1-2'],
        ['LinkedIn-посты опубликованы', '2'],
    ]
)

doc.add_page_break()

# ========== PART 3 ==========
doc.add_heading('ЧАСТЬ 3: LINKEDIN — ПОСТЫ ПО ПРОФИЛЯМ', level=1)

doc.add_heading('Архитектура профилей', level=2)
add_table(
    ['Профиль', 'Роль', 'Частота', 'Тип контента'],
    [
        ['Company page (WTP)', 'Brand hub', '3-4/нед', 'Репосты, PDF-анонсы, partner kit'],
        ['CEO profile', 'Thought leader', '1-2/нед', 'Editorial posts (вторник)'],
        ['Specialist profile(s)', 'Practitioner voice', '1/нед', 'Expert Insight (четверг)'],
        ['Team profiles', 'Усиление', 'ежедневно', 'Comments, reshares, 1-2 поста/мес'],
    ]
)

doc.add_heading('Cross-engagement протокол', level=2)
add_table(
    ['Время', 'Действие', 'Кто'],
    [
        ['9-11 AM GST', 'Публикация', 'CEO (вт) или Specialist (чт)'],
        ['+15-45 мин', '2-3 substantive comments', 'Team'],
        ['+1-2 часа', 'Repost с коротким add-on', 'Company page'],
        ['В течение дня', 'CEO \u2194 Specialist взаимные комментарии', 'Взаимно'],
    ]
)

doc.add_heading('Ритм: Вторник, Четверг', level=3)
add_bullet('Вторник, 9-11 AM GST: Editorial post \u2192 CEO profile')
add_bullet('Четверг, 9-11 AM GST: Expert Insight \u2192 Specialist profile')
add_bullet('Каждый день: Company page — репост + оригинальный контент')

doc.add_page_break()

# ========== PART 4 ==========
doc.add_heading('ЧАСТЬ 4: КАЛЕНДАРЬ ПОСТОВ С ТЕКСТАМИ', level=1)

doc.add_heading('Неделя 5 — Crisis Debut', level=2)

add_table(
    ['#', 'Дата', 'Профиль', 'Тип', 'Статус'],
    [
        ['P1', '2 мар (утро)', 'CEO', 'Crisis Debut', 'READY'],
        ['P2', '2-3 мар (вечер)', 'CEO', 'Framework', 'READY'],
        ['P3', '5-7 мар', 'Company page', 'Flagship Case', 'READY'],
    ]
)

# P1
doc.add_heading('P1: WTP Debut + Operational Status', level=3)
p = doc.add_paragraph()
p.add_run('Профиль: ').bold = True
p.add_run('CEO  |  ')
r = p.add_run('Апрув: ')
r.bold = True
p.add_run('ожидает CEO')

post1 = """Two days ago, a coalition strike hit Iran. Flights over the Gulf suspended. Dubai airport partially damaged. Social media filled with "is UAE safe?" posts.

Here's what we're seeing on the ground — as a company that handles UAE structuring for European clients daily.

WHAT'S AFFECTED (temporarily):
— In-person banking appointments: some branches operated reduced hours Sat-Sun, returning to normal Monday
— Document notarization requiring physical presence: delayed 1-2 business days
— Visa stamping at immigration centers: backlog expected, clearing within the week
— Flights: disrupted 28 Feb — 1 Mar, major airlines resuming Sunday evening

WHAT'S NOT AFFECTED:
— All registered companies, bank accounts, visas, tax residency certificates: fully intact
— Banking compliance processes: running normally (these are largely digital)
— Free zone registrations and renewals: processing continues
— Corporate tax filings (FTA): online system uninterrupted
— Legal frameworks, regulations, UAE corporate tax regime: unchanged

WHAT THIS MEANS FOR ADVISORS:
The regulatory pressure driving your clients toward UAE — UK non-dom abolition, German exit tax, Dutch Box 3 — hasn't paused. The tax calendar continues regardless of geopolitical events.

If you have clients with ongoing or planned UAE processes, we're providing status assessments this week — no charge, no pitch. Just clarity.

We're WTP. UAE execution partner for European advisors.
Banking-first. Compliance-first. Structure-first."""

add_quote(post1)

# P2
doc.add_heading('P2: Framework for Advisors', level=3)
p = doc.add_paragraph()
p.add_run('Профиль: ').bold = True
p.add_run('CEO  |  ')
r = p.add_run('Апрув: ')
r.bold = True
p.add_run('ожидает CEO')

post2 = """If you advise international clients, someone has asked you about UAE this weekend.

Here's a framework for that conversation — whether the client is panicking, pausing, or reconsidering entirely.

THE CONVERSATION FRAMEWORK:

1. ACKNOWLEDGE — Yes, this is serious. Military strikes in the Gulf are not routine. Don't minimize. Your client needs to feel heard, not managed.

2. SEPARATE — A security event is not a structural event. Airspace closure \u2260 company law change. Flight suspension \u2260 banking system failure. These are different categories of risk.

3. INFORM — Be specific. "Banking is fine" is vague. "Corporate banking compliance processes continued through the weekend; in-person appointments resume Monday" is useful.

4. REFRAME — The deadline your client is restructuring against hasn't changed. UK non-dom abolition didn't pause. German Wegzugsbesteuerung didn't get extended. The tax calendar is indifferent to geopolitics.

5. OFFER — Don't leave them with analysis. Offer a concrete next step: "I can get you a status update on your specific process by Tuesday."

The advisors who provide clarity during uncertainty earn trust that lasts far beyond this event.

If you'd like a specific status assessment for any client's UAE process — DM me. No charge, no obligation."""

add_quote(post2)

# P3
doc.add_heading('P3: Flagship Case — Jewelry Brand', level=3)
p = doc.add_paragraph()
p.add_run('Профиль: ').bold = True
p.add_run('Company page  |  ')
r = p.add_run('Апрув: ')
r.bold = True
p.add_run('ожидает CEO')
doc.add_paragraph('Полный текст в файле docs/linkedin/13-flagship-case-jewelry.md')
add_quote('"We want to trade gold, produce jewelry in Armenia, sell worldwide online, and accept crypto. In Dubai." — That was the brief. Here\'s what it actually took...')

# Week 6
doc.add_heading('Неделя 6 (3-9 марта)', level=2)
add_table(
    ['#', 'Дата', 'Профиль', 'Тип', 'Тема', 'Статус'],
    [
        ['P4', '4 мар (вт)', 'CEO', 'Editorial', '"The system restarted"', 'DRAFT'],
        ['P5', '6 мар (чт)', 'Specialist', 'Expert Insight', 'SOF Reality Check', 'BLOCKED (интервью)'],
    ]
)

doc.add_heading('P4: "The System Restarted"', level=3)
p = doc.add_paragraph()
p.add_run('Профиль: ').bold = True
p.add_run('CEO  |  ')
r = p.add_run('Апрув: ')
r.bold = True
p.add_run('ожидает CEO')

post4 = """72 hours after coalition strikes hit Iran, here's where UAE stands:

— Dubai International: full flight schedule restored
— Banking: all branches operational, no compliance backlogs
— Free zones: processing times returned to pre-event levels
— Government services: visa stamping, notarization — normal

This wasn't luck. It was infrastructure.

UAE spent the last decade building institutional resilience — not just towers. The FATF grey list exit (Feb 2024) required rebuilding entire compliance systems. Corporate tax implementation (June 2023) meant real regulatory infrastructure. Emirates ID, ICP, FTA — all digital-first.

The result: a system that bends under pressure but doesn't break.

For advisors: the clients who paused last week are calling back this week. The question isn't "is UAE safe?" — it's "how quickly can we proceed?"

The tax calendar hasn't changed. The opportunity window hasn't closed. If anything, it just got clearer who's prepared and who isn't."""

add_quote(post4)

# P5
doc.add_heading('P5: SOF Reality Check — BLOCKED', level=3)
doc.add_paragraph('Нужно интервью с banking specialist (15-20 мин).')
add_bullet('Что вы видите чаще всего как проблему в SOF?')
add_bullet('Какой документ банк открывает первым?')
add_bullet('Самая частая ошибка клиентов/advisors?')

# Weeks 7-8
doc.add_heading('Недели 7-8 (план)', level=2)
add_table(
    ['#', 'Дата', 'Профиль', 'Тема', 'Статус'],
    [
        ['P6', '11 мар', 'CEO', 'UK Non-Dom Abolished', 'DRAFT READY'],
        ['P7', '13 мар', 'Specialist', '"Too Late" Client', 'BLOCKED'],
        ['P8', '18 мар', 'CEO', 'First 48 Hours', 'DRAFT READY'],
        ['P9', '20 мар', 'Specialist', 'Free Zones \u2260 Equal', 'BLOCKED'],
        ['P10', '25 мар', 'CEO', 'Substance Myth', 'DRAFT READY'],
        ['P11', '27 мар', 'Specialist', 'Account Closed', 'BLOCKED'],
    ]
)

# Approval process
doc.add_heading('Процесс апрува', level=2)
doc.add_paragraph('Editorial: Claude создаёт драфт \u2192 Костя ревью \u2192 CEO финальный апрув \u2192 Публикация')
doc.add_paragraph('Expert Insight: Костя назначает интервью \u2192 Specialist 15-20 мин \u2192 Claude пишет пост \u2192 Specialist ревью \u2192 CEO ок \u2192 Публикация')
add_bullet('Драфт готов: минимум за 2 дня до публикации')
add_bullet('CEO ревью: 24 часа')
add_bullet('Финальный ок: утро дня публикации')

doc.add_page_break()

# ========== PART 5 ==========
doc.add_heading('ЧАСТЬ 5: ОСОЗНАННЫЕ КОММЕНТАРИИ — PLAYBOOK', level=1)

doc.add_heading('Зачем', level=2)
doc.add_paragraph('15-20 substantive comments в день от разных профилей WTP = главный канал organic reach. Создают присутствие в ленте целевой аудитории без прямой рекламы.')

doc.add_heading('Триггеры: на что реагировать', level=2)

doc.add_heading('Tier 1: Обязательная реакция (в течение 2 часов)', level=3)
add_table(
    ['Триггер', 'Пример', 'Почему'],
    [
        ['Партнёр из outreach-листа постит', 'Jamie Favell написал про non-dom', 'Direct target'],
        ['Упоминание UAE/Dubai + relocation', '"Clients asking about Dubai"', 'Прямой ICP'],
        ['UK non-dom / German exit tax / Dutch Box 3', 'Пост о налоговых изменениях', 'Наша тема'],
        ['Banking compliance / due diligence', '"Bank rejected my client"', 'Core expertise'],
        ['Кто-то отметил WTP или CEO', 'Mention, tag, quote', 'Engagement signal'],
    ]
)

doc.add_heading('Tier 2: Желательная реакция (в течение дня)', level=3)
add_table(
    ['Триггер', 'Пример'],
    [
        ['Free zone comparison / selection', '"Which free zone is best for..."'],
        ['Substance requirements / ESR', 'Posts about UAE substance rules'],
        ['International structuring', 'Cross-border holding, trust structures'],
        ['Wealth migration data', 'Henley report, Knight Frank, etc.'],
        ['Competitor post', 'Other setup companies posting about UAE'],
    ]
)

doc.add_heading('Tier 3: Мониторинг', level=3)
add_bullet('Family office / wealth management general — industry trends')
add_bullet('Legal tech / compliance tech — interesting tools')
add_bullet('Geopolitical analysis (Gulf region) — macro context')

doc.add_heading('Чеклист верификации (5 секунд перед комментарием)', level=2)
add_bullet('Автор = ICP? Tax advisor, lawyer, family office, wealth manager из UK/DE/NL/CH?', bold_prefix='1.')
add_bullet('Контент релевантен? Связан с нашими 5 pillars?', bold_prefix='2.')
add_bullet('Можем добавить ценность? Есть что сказать кроме "Great post"?', bold_prefix='3.')
add_bullet('Тон подходит? Пост серьёзный?', bold_prefix='4.')
add_bullet('Нет конфликта? Автор не конкурент? Не критикует UAE?', bold_prefix='5.')

doc.add_heading('5 форматов комментариев', level=2)

p = doc.add_paragraph()
p.add_run('1. Добавить факт / контекст').bold = True
add_quote('"One thing worth adding — from what we see on the ground, [specific observation]. This aligns with [data point]."')

p = doc.add_paragraph()
p.add_run('2. Подтвердить из практики').bold = True
add_quote('"This matches what we\'re seeing with [segment]. In the last [period], [specific pattern]."')

p = doc.add_paragraph()
p.add_run('3. Уточняющий вопрос').bold = True
add_quote('"Curious — in your experience, how does [specific aspect] play out? We\'ve noticed [observation] but wondering if it\'s different from the advisory side."')

p = doc.add_paragraph()
p.add_run('4. Мягкое несогласие / нюанс').bold = True
add_quote('"Thoughtful analysis. One nuance I\'d add — [specific point] often works differently in practice because [reason]."')

p = doc.add_paragraph()
p.add_run('5. Краткое подтверждение + инсайт').bold = True
add_quote('"[Their point] is underappreciated. Most [segment] overlook this because [reason]."')

doc.add_heading('Запрещено', level=2)
add_table(
    ['Нельзя', 'Почему'],
    [
        ['"Great post!" / "Well said!"', 'Ноль ценности, выглядит как бот'],
        ['Ссылка на сайт WTP', 'Прямая реклама = спам'],
        ['"DM me" / "Let\'s connect"', 'Слишком прямолинейно'],
        ['Критика конкурентов', 'Непрофессионально'],
        ['"Guaranteed" / "100% success" / сроки', 'Compliance risk'],
        ['Одинаковый текст с разных профилей', 'Coordinated campaign'],
        ['Комментарий > 5 предложений', 'Слишком длинно'],
        ['Восклицательные знаки', 'Не наш тон'],
    ]
)

doc.add_heading('Эскалация сложных кейсов', level=2)
doc.add_paragraph('Когда НЕ комментировать самостоятельно:')
add_table(
    ['Ситуация', 'Действие'],
    [
        ['Автор критикует UAE / "tax haven"', 'НЕ спорить. Переслать CEO'],
        ['Автор = конкурент', 'НЕ комментировать. Отметить в CRM'],
        ['Юридический/налоговый вопрос', 'НЕ отвечать. Переслать CEO'],
        ['Sanctions / sanctioned clients', 'НЕ комментировать. Никогда.'],
        ['Крупный influencer (10K+)', 'Переслать CEO для coordination'],
        ['Неточная информация о UAE', 'Переслать CEO: стоит ли корректировать?'],
        ['Провокация / trolling', 'Игнорировать'],
    ]
)

doc.add_paragraph('Процесс: Assistant видит пост \u2192 "эскалация"? \u2192 Скриншот + ссылка + контекст \u2192 CEO в Telegram \u2192 CEO решает: игнорировать / ответить / ответить лично')
doc.add_paragraph('Время реакции: 4 часа (если CEO доступен) или следующий рабочий день.')

doc.add_heading('Ежедневные метрики', level=2)
add_table(
    ['Метрика', 'Цель'],
    [
        ['Outbound comments (CEO)', '5-7/день'],
        ['Outbound comments (Company)', '3-5/день'],
        ['Outbound comments (Specialist)', '2-3/день'],
        ['Connection requests', '5-10/день'],
        ['Comments на Tier 1 targets', 'мин. 2/день'],
        ['Replies received', 'цель 20-30%'],
    ]
)

# -- Macro data --
doc.add_page_break()
doc.add_heading('Macro-данные для контекста', level=1)
add_bullet('UAE = wealth magnet #1 в мире: +9,800 миллионеров в 2025 (Henley & Partners)')
add_bullet('UK: рекордный отток HNWI, +183% рост заявок на релокацию (Q1 2025 vs Q1 2024)')
add_bullet('Германия, Франция: впервые в истории net negative HNWI flows')
add_bullet('134,000 HNWI переехали глобально в 2024 году')
add_bullet('UK non-dom отменён с апреля 2025 \u2192 массовый запрос на restructuring')

# -- Footer --
doc.add_paragraph()
p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run('WTP — UAE Execution Partner')
run.bold = True
run.font.size = Pt(11)
p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
p.add_run('Banking-first. Compliance-first. Structure-first.').font.color.rgb = RGBColor(0x66, 0x66, 0x66)

# ========== SAVE ==========
out_dir = os.path.dirname(os.path.abspath(__file__))
out_path = os.path.join(os.path.dirname(out_dir), 'docs', 'reports', 'WTP_Week5_Report_Week6_Plan.docx')
doc.save(out_path)
print(f'Saved to: {out_path}')
