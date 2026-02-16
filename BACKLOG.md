# WTP — Бэклог задач

> **Последнее обновление:** 2026-02-16
> Все задачи, обсуждённые в сессиях. Сверяться при каждом "что дальше?"

---

## Обозначения

- `NEW` — обсудили, ещё не начинали
- `IN PROGRESS` — в работе
- `BLOCKED` — ждёт input/документы от Кости
- `DONE` — завершено

---

## 1. Маркетинг и контент

| # | Задача | Статус | Контекст | Источник |
|---|--------|--------|----------|----------|
| M1 | **Product Marketing Context** — фундаментальный документ позиционирования | DONE | `.claude/product-marketing-context.md` создан, утверждён | Сессия 5 |
| M2 | **Content Strategy** — 6-месячный контент-календарь для LinkedIn | NEW | Скилл `content-strategy`. Входные данные: PMC + 5 DOCX документов + артефакты минимум. 3 поста/нед, 5 контент-столпов | Сессия 5 |
| M3 | **Social Content** — конкретные LinkedIn-посты | NEW | Скилл `social-content`. 2 pinned + 4/мес по плану из "Артефакты минимум.docx" | Сессия 5 |
| M4 | **Copywriting** — тексты для клиентского лендинга | NEW | Скилл `copywriting`. Отдельный посыл для end-клиентов (HNWI, бизнес-владельцы) | Сессия 5 |
| M5 | **Copywriting** — тексты для RE лендинга | NEW | Скилл `copywriting`. Недвижимость + Golden Visa + интегрированный сервис | Сессия 5 |
| M6 | **Email Sequence** — цепочки для партнёров | NEW | Скилл `email-sequence`. First touch → follow-up → pilot request (docs уже есть в `docs/partner/`) | Сессия 5 |

---

## 2. Лендинги

| # | Задача | Статус | Контекст | Источник |
|---|--------|--------|----------|----------|
| L1 | **WTP2 Partner Base** — текущий лендинг | DONE | Задеплоен на GitHub Pages: `lebedevpmm.github.io/WTP2/` | Сессия 4 |
| L2 | **Partner Variant 1-3** — 2-3 лендинга с разным посылом для разных сегментов партнёров | BLOCKED | Костя пришлёт документы с описанием посылов. Структура = копия WTP2, другой контент | Сессия 5 |
| L3 | **Client Landing** — лендинг для конечных клиентов (HNWI, бизнес) | NEW | "Bankable Structure", risk reduction, peace of mind. Зависит от M4 (copywriting) | Сессия 5 |
| L4 | **RE Landing** — лендинг для недвижимости | NEW | Property + structure + visa + tax + bank. Зависит от M5 (copywriting) + RE модель из DOCX | Сессия 5 |

---

## 3. Техническое (WTP2)

| # | Задача | Статус | Контекст | Источник |
|---|--------|--------|----------|----------|
| T1 | **KYC Light multi-step wizard** — расширение формы Submit Case | NEW | Текущая форма базовая (8 полей). В Excel — 8 секций KYC Light. Сделать multi-step wizard | Сессия 3 |
| T2 | **Email-уведомления** — при отправке формы | NEW | Сейчас только Битрикс24 webhook. Добавить email notification | Сессия 3 |
| T3 | **Performance** — lazy loading, code splitting | NEW | Bundle 411 KB JS. Route-based code splitting, lazy load страниц | Сессия 4 |
| T4 | **Stub-страницы** — наполнить контентом | NEW | `EngagementPage`, `PartnersPage`, `RiskPage`, `ProcessPage`, `UpdatesPage` — сейчас stubs | Сессия 4 |

---

## 4. Документы и Notion

| # | Задача | Статус | Контекст | Источник |
|---|--------|--------|----------|----------|
| D1 | **19 документов EN+RU** — все Markdown + PDF | DONE | `docs/` + `docs/ru/` + `public/docs/` | Сессия 3-4 |
| D2 | **Notion** — все документы загружены | DONE | Через `scripts/upload-to-notion.mjs` | Сессия 4 |
| D3 | **Case Study** — первый кейс (flagship) | NEW | Черновик есть в `docs/linkedin/04-flagship-case.md`. Нужен реальный кейс от Кости для финализации | Сессия 3 |

---

## 5. Стратегическое (из DOCX)

| # | Задача | Статус | Контекст | Источник |
|---|--------|--------|----------|----------|
| S1 | **CRM структура** — настройка воронок в Битрикс24 | NEW | Описано в "Месяц 1.docx": Referral Pipeline, Direct Pipeline, RE Pipeline | Месяц 1 |
| S2 | **Partner Pack** — физический/цифровой комплект для партнёров | DONE (digital) | Partner Kit на сайте. Физический формат — вне скоупа Claude | Месяц 1 |
| S3 | **Sanctions competency** — документация по санкционной экспертизе | NEW | Описано в Неделе 3 Excel. Compliance-трек, sanctions memo | Месяц 1 |
| S4 | **Real Estate модель** — полная стратегия бутикового агентства | NEW | Детально описано в "Модель развития бутикового агентства.docx". Рекрутинг, лид-ген, tech stack | DOCX |
| S5 | **Месяцы 2-6 roadmap** — пошаговый план развития | NEW | "2-6 месяцы черновик.docx": partner start → evidence → expansion → positioning | DOCX |

---

## Приоритеты (предложение)

### Высокий приоритет (следующие шаги)
1. **M2** Content Strategy — даёт план на полгода
2. **M3** Social Content — конкретные посты для немедленной публикации
3. **L2** Partner Variants — ждёт документы от Кости

### Средний приоритет
4. **M4 + L3** Copywriting + Client Landing
5. **M5 + L4** Copywriting + RE Landing
6. **T1** KYC wizard
7. **M6** Email sequences

### Низкий приоритет (когда будет время)
8. **T3** Performance
9. **T4** Stub-страницы
10. **T2** Email-уведомления
11. **S1** CRM воронки

---

## Лог изменений бэклога

| Дата | Что изменилось |
|------|---------------|
| 2026-02-16 | Бэклог создан. M1, L1, D1, D2, S2 — DONE. Остальное — NEW/BLOCKED |
