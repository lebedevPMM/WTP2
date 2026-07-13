import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'dist', 'product-onepagers');

// ─── Product Content (RU) ───────────────────────────────────────────

const products = [

  // ═══════════════════════════════════════════════════════════════════
  // 1. X-RAY — Комплексная консультация
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'xray',
    accent: '#e74c3c',
    tag: 'Для новых клиентов и партнёров',
    headline: 'X-ray.<br>Прежде чем действовать\u00a0— разобраться.',
    sub: 'Комплексная диагностика вашей ситуации: банковские риски, налоговая стратегия, структура активов. Честный вердикт до начала любой работы.',
    cta: 'Записаться на X-ray',

    what: {
      title: 'Что такое X-ray',
      label: 'Суть',
      text: 'X-ray\u00a0— это полный аудит вашей ситуации глазами банка и регулятора. Мы не продаём услуги на входе. Мы сначала разбираемся: кто вы, что за бизнес, какие риски, какие варианты. По итогам\u00a0— карта рисков и конкретный план действий. Если кейс «красный»\u00a0— мы скажем прямо.',
    },

    benefits: {
      title: 'Что вы получаете',
      label: 'Результат',
      items: [
        { title: 'Карта рисков', text: 'KYC/AML предскрининг, проверка санкционных списков, анализ структуры владения и источника средств.' },
        { title: 'Банковская стратегия', text: 'Оценка bankability: какие банки реально откроют счёт под ваш профиль и бизнес-модель.' },
        { title: 'Налоговый анализ', text: 'Оценка текущего резидентства, рисков двойного налогообложения, стратегия налогового перехода.' },
        { title: 'Roadmap', text: 'Документ с конкретным планом: что делать, в каком порядке, какие документы подготовить, сколько это стоит.' },
      ],
    },

    process: {
      title: 'Как это работает',
      label: 'Процесс',
      steps: [
        { num: '01', title: 'Запрос', text: 'Вы описываете ситуацию и цели. Мы отправляем список документов для анализа.' },
        { num: '02', title: 'Анализ', text: 'Офлайн-анализ: KYC-скрининг, банковская стратегия, налоговая карта. 5\u20137 рабочих дней.' },
        { num: '03', title: 'Вердикт', text: 'Встреча или видеозвонок с результатами. Карта рисков + roadmap + рекомендации.' },
        { num: '04', title: 'Решение', text: 'Вы решаете: двигаемся дальше (Entry / Setup) или останавливаемся. Без давления.' },
      ],
    },

    includes: {
      title: 'Что входит',
      label: 'Состав',
      items: [
        'KYC/AML предскрининг',
        'Проверка банковской приемлемости',
        'Анализ налоговой стратегии',
        'Анализ структуры владения',
        'Карта рисков (документ)',
        'Roadmap с рекомендациями',
        'Консультация 60 минут',
        'Вердикт: GO / NO-GO / условия',
      ],
    },

    why: {
      title: 'Почему WTP',
      label: 'Подход',
      items: [
        { title: 'Без навязывания', text: 'Вы платите за диагностику, а не за пакет услуг. Решение принимаете вы.' },
        { title: 'Banking-First', text: 'Мы проверяем bankability до регистрации. Компания без счёта\u00a0— пустая трата денег.' },
        { title: 'Честный вердикт', text: 'Если кейс не проходимый\u00a0— мы говорим об этом. ~30% кейсов получают отказ.' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 2. GOLDEN VISA
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'golden-visa',
    accent: '#b8860b',
    tag: 'Для инвесторов и предпринимателей',
    headline: 'Golden Visa ОАЭ.<br>10-летнее резидентство под ключ.',
    sub: 'Визы инвестора, владельца компании, специалиста. Подбор оптимального маршрута, подготовка документов, сопровождение до выдачи Emirates ID.',
    cta: 'Узнать свой маршрут',

    what: {
      title: 'Что такое Golden Visa',
      label: 'Суть',
      text: 'Golden Visa\u00a0— это долгосрочное резидентство ОАЭ (5 или 10 лет) без необходимости национального спонсора. Для инвесторов, предпринимателей, специалистов и их семей. Мы подбираем оптимальный маршрут получения визы под ваш профиль, готовим документы и ведём процесс от первого шага до Emirates ID.',
    },

    benefits: {
      title: 'Что вы получаете',
      label: 'Результат',
      items: [
        { title: 'Стратегия визы', text: 'Анализ: какой тип визы оптимален\u00a0— инвестор (недвижимость AED 2M), владелец компании, специалист.' },
        { title: 'Документы', text: 'Полная подготовка пакета: легализация, перевод, нотариальное заверение, аттестация.' },
        { title: 'Emirates ID', text: 'Биометрия, медкомиссия, получение Emirates ID\u00a0— полное сопровождение на месте.' },
        { title: 'Семейные визы', text: 'Визы супруге/супругу и детям. Легализация документов: свидетельства о рождении и браке.' },
      ],
    },

    process: {
      title: 'Как это работает',
      label: 'Процесс',
      steps: [
        { num: '01', title: 'Оценка', text: 'Определяем оптимальный тип визы под ваши цели: banking, tax residency, семья.' },
        { num: '02', title: 'Подготовка', text: 'Сбор и проверка документов, легализация, запись на медкомиссию и биометрию.' },
        { num: '03', title: 'Подача', text: 'Подача заявления, сопровождение на месте при визите в ОАЭ. 1\u20135 дней.' },
        { num: '04', title: 'Получение', text: 'Выдача визы и Emirates ID. При необходимости\u00a0— семейные визы параллельно.' },
      ],
    },

    includes: {
      title: 'Что входит',
      label: 'Состав',
      items: [
        'Выбор типа визы под профиль',
        'Подготовка и проверка документов',
        'Легализация и перевод',
        'Медкомиссия (запись + сопровождение)',
        'Биометрия и Emirates ID',
        'Подача и отслеживание статуса',
        'Семейные визы (опционально)',
        'Tax residency стратегия (опционально)',
      ],
    },

    why: {
      title: 'Почему WTP',
      label: 'Подход',
      items: [
        { title: 'Не только виза', text: 'Мы связываем визу с банковской стратегией и налоговым резидентством\u00a0— единый план.' },
        { title: 'Полное сопровождение', text: 'От первого документа до Emirates ID. Не «подготовим и бросим»\u00a0— ведём до результата.' },
        { title: 'Прозрачные сроки', text: 'Вы знаете, когда прилетать, что брать с собой, когда будет результат.' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 3. LAST WILL — Завещание
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'last-will',
    accent: '#8e2de2',
    tag: 'Для резидентов ОАЭ с активами',
    headline: 'Завещание в ОАЭ.<br>Защитите семью от шариатского суда.',
    sub: 'Без завещания активы в ОАЭ распределяются по шариату. DIFC Will или ADJD Will фиксируют вашу волю и защищают наследников по вашим правилам.',
    cta: 'Оформить завещание',

    what: {
      title: 'Зачем нужно завещание в ОАЭ',
      label: 'Контекст',
      text: 'По умолчанию активы нерезидентов и резидентов в ОАЭ наследуются по шариату: фиксированные доли, суд может заморозить счета и недвижимость. DIFC Wills Service Centre или ADJD позволяют зарегистрировать завещание по вашему национальному праву. Это единственный надёжный способ защитить семью.',
    },

    benefits: {
      title: 'Что вы получаете',
      label: 'Результат',
      items: [
        { title: 'Юридическая защита', text: 'Завещание, зарегистрированное в DIFC или ADJD, имеет приоритет над шариатским распределением.' },
        { title: 'Контроль над активами', text: 'Вы определяете, кто получает недвижимость, счета, доли в компаниях и другие активы.' },
        { title: 'Защита несовершеннолетних', text: 'Опекунство (guardianship) зафиксировано в завещании. Дети защищены.' },
        { title: 'Скорость исполнения', text: 'Завещание ускоряет процесс передачи активов. Без него\u00a0— месяцы судебных разбирательств.' },
      ],
    },

    process: {
      title: 'Как это работает',
      label: 'Процесс',
      steps: [
        { num: '01', title: 'Анализ', text: 'Анализ активов: счета, недвижимость, доли в компаниях. Определение формата завещания.' },
        { num: '02', title: 'Структурирование', text: 'Определение наследников, долей, опекунства. Выбор: DIFC Will или ADJD.' },
        { num: '03', title: 'Оформление', text: 'Подготовка текста, согласование, запись на регистрацию в DIFC/ADJD.' },
        { num: '04', title: 'Регистрация', text: 'Визит (15\u201330 минут), подписание, регистрация. Документ вступает в силу немедленно.' },
      ],
    },

    includes: {
      title: 'Что входит',
      label: 'Состав',
      items: [
        'Анализ активов в ОАЭ',
        'Выбор формата (DIFC / ADJD)',
        'Определение наследников и долей',
        'Guardianship (опекунство)',
        'Подготовка текста завещания',
        'Сопровождение регистрации',
        'Оригинал зарегистрированного документа',
        'Рекомендации по обновлению',
      ],
    },

    why: {
      title: 'Почему WTP',
      label: 'Подход',
      items: [
        { title: 'Комплексный взгляд', text: 'Мы видим полную картину: счета, компании, недвижимость. Завещание покрывает всё.' },
        { title: 'Связка с другими услугами', text: 'Завещание\u00a0— часть стратегии защиты. Foundation, custody, banking\u00a0— один процесс.' },
        { title: 'Без промедлений', text: 'Готовим документ за 5\u20137 дней. Регистрация\u00a0— за один визит.' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 4. FOUNDATION — Структурирование активов
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'foundation',
    accent: '#004e92',
    tag: 'Для владельцев активов и семей',
    headline: 'Foundation в ОАЭ.<br>Контроль и защита\u00a0— без потери владения.',
    sub: 'Юридическая структура для защиты активов, планирования наследования и конфиденциального управления. Альтернатива трасту для HNWI клиентов.',
    cta: 'Обсудить структуру',

    what: {
      title: 'Что такое Foundation',
      label: 'Контекст',
      text: 'Foundation (фонд) в ОАЭ\u00a0— юридическое лицо, которое владеет активами от имени бенефициаров. В отличие от траста, учредитель сохраняет контроль. Используется для: защиты активов от претензий, планирования наследования, управления недвижимостью и инвестициями, конфиденциальности структуры владения.',
    },

    benefits: {
      title: 'Что вы получаете',
      label: 'Результат',
      items: [
        { title: 'Защита активов', text: 'Активы принадлежат фонду, а не физическому лицу. Защита от претензий, судебных исков, кредиторов.' },
        { title: 'Контроль учредителя', text: 'В отличие от траста, учредитель остаётся в управлении. Можно менять бенефициаров и правила.' },
        { title: 'Планирование наследования', text: 'Автоматическая передача активов по правилам фонда. Без суда, без шариата, без задержек.' },
        { title: 'Конфиденциальность', text: 'Структура владения не раскрывается публично. Фонд\u00a0— отдельное юрлицо.' },
      ],
    },

    process: {
      title: 'Как это работает',
      label: 'Процесс',
      steps: [
        { num: '01', title: 'Анализ', text: 'Оценка активов и целей. Сравнение: foundation vs прямое владение vs траст.' },
        { num: '02', title: 'Архитектура', text: 'Проектирование структуры: учредитель, бенефициары, правила управления, succession plan.' },
        { num: '03', title: 'Регистрация', text: 'Подготовка учредительных документов. Регистрация в DIFC, ADGM или RAK ICC.' },
        { num: '04', title: 'Интеграция', text: 'Перевод активов на фонд. Настройка банковских счетов, custody, отчётности.' },
      ],
    },

    includes: {
      title: 'Что входит',
      label: 'Состав',
      items: [
        'Анализ применимости foundation',
        'Выбор юрисдикции (DIFC / ADGM / RAK)',
        'Проектирование структуры',
        'Подготовка устава и правил',
        'Регистрация фонда',
        'Назначение совета',
        'Перевод активов',
        'Связка с банкингом и custody',
      ],
    },

    why: {
      title: 'Почему WTP',
      label: 'Подход',
      items: [
        { title: 'Не только документы', text: 'Мы проектируем структуру под реальные цели: защита, наследование, конфиденциальность.' },
        { title: 'Банковская связка', text: 'Foundation без счёта бесполезен. Мы открываем счета параллельно с регистрацией.' },
        { title: 'Долгосрочное сопровождение', text: 'Отчётность, обновление правил, корпоративное управление\u00a0— ongoing support.' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 5. OPEN COMPANY — Регистрация компании
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'open-company',
    accent: '#e74c3c',
    tag: 'Для предпринимателей и инвесторов',
    headline: 'Компания в ОАЭ.<br>Регистрация, которая проходит банк.',
    sub: 'Не просто лицензия\u00a0— рабочая бизнес-структура, принятая банком. Мы подбираем зону, лицензию и банк под вашу бизнес-модель.',
    cta: 'Начать регистрацию',

    what: {
      title: 'В чём разница',
      label: 'Banking-First',
      text: 'Большинство агентов регистрируют компанию, а потом клиент не может открыть счёт. Мы работаем наоборот: сначала проверяем, примет ли банк вашу структуру (Pre-screen), и только потом регистрируем. Выбор зоны, типа лицензии, юрисдикции\u00a0— всё определяется банковскими требованиями.',
    },

    benefits: {
      title: 'Что вы получаете',
      label: 'Результат',
      items: [
        { title: 'Bankable структура', text: 'Компания зарегистрирована под конкретный банк. Не «в надежде, что откроют»\u00a0— а с подтверждением.' },
        { title: 'Правильная зона', text: 'Mainland или Freezone\u00a0— выбор на основе бизнес-модели, клиентов, банковских требований и бюджета.' },
        { title: 'Лицензия под деятельность', text: 'Подбор типа лицензии, который банк примет и регулятор одобрит. Без лишних activity codes.' },
        { title: 'Полный пакет', text: 'Регистрация, lease agreement, establishment card, все government documents.' },
      ],
    },

    process: {
      title: 'Как это работает',
      label: 'Процесс',
      steps: [
        { num: '01', title: 'Pre-screen', text: 'Анализ бизнес-модели, KYC-профиля, выбор банковского сценария. 5\u20137 дней.' },
        { num: '02', title: 'Архитектура', text: 'Выбор зоны, типа лицензии, структуры владения\u00a0— под банковские требования.' },
        { num: '03', title: 'Регистрация', text: 'Подача документов, получение лицензии, lease, establishment card. 2\u20134 недели.' },
        { num: '04', title: 'Банк', text: 'Подача в банк, сопровождение compliance вопросов, открытие корпоративного счёта.' },
      ],
    },

    includes: {
      title: 'Что входит',
      label: 'Состав',
      items: [
        'Pre-screen и банковская стратегия',
        'Выбор юрисдикции и типа лицензии',
        'Регистрация компании',
        'Trade License',
        'Lease / виртуальный офис',
        'Establishment Card',
        'Подача в банк',
        'ESR compliance (при необходимости)',
      ],
    },

    why: {
      title: 'Почему WTP',
      label: 'Подход',
      items: [
        { title: 'Banking-First', text: 'Банковская готовность проверяется ДО регистрации. Компания без счёта\u00a0— пустая трата.' },
        { title: 'Единый процесс', text: 'Компания + счёт + виза\u00a0— один проект, один менеджер, один таймлайн.' },
        { title: 'Без скрытых платежей', text: 'Госпошлины по себестоимости. Наше вознаграждение\u00a0— отдельно и прозрачно.' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 6. OPEN BANK ACCOUNT — Банковский счёт
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'open-bank-account',
    accent: '#004e92',
    tag: 'Для физических лиц и компаний',
    headline: 'Банковский счёт в ОАЭ.<br>Включая сложные профили.',
    sub: 'Личные и корпоративные счета. Подбор банка под ваш профиль, подготовка SOF, сопровождение compliance\u00a0— даже для сложных юрисдикций.',
    cta: 'Проверить bankability',

    what: {
      title: 'В чём сложность',
      label: 'Контекст',
      text: 'Банки ОАЭ ужесточили проверки: отказы без объяснений, заморозки счетов, запросы SOF через месяцы после открытия. Особенно сложно клиентам с РФ-паспортом, криптодоходами, множественными юрисдикциями. Мы знаем, какие банки работают с какими профилями, и готовим клиента так, чтобы он прошёл compliance с первого раза.',
    },

    benefits: {
      title: 'Что вы получаете',
      label: 'Результат',
      items: [
        { title: 'Подбор банка', text: 'Анализ вашего профиля → подбор банка, который реально откроет счёт. Не «попробуем везде».' },
        { title: 'Подготовка SOF', text: 'Source of Funds\u00a0— главная причина отказов. Мы готовим пакет под требования конкретного банка.' },
        { title: 'Сопровождение', text: 'Ведём процесс от подачи до активации. Отвечаем на вопросы compliance, дорабатываем пакет.' },
        { title: 'Сложные профили', text: 'Работаем с High Risk профилями: РФ паспорт + ВНЖ, крипто-SOF, множественные юрисдикции.' },
      ],
    },

    process: {
      title: 'Как это работает',
      label: 'Процесс',
      steps: [
        { num: '01', title: 'Профилирование', text: 'Анализ: гражданство, резидентство, доходы, бизнес-модель, ожидаемые обороты.' },
        { num: '02', title: 'Стратегия', text: 'Подбор банка, подготовка SOF-пакета, business cycle описание. 3\u20135 дней.' },
        { num: '03', title: 'Подача', text: 'Подача документов, запись на визит, сопровождение при встрече в банке.' },
        { num: '04', title: 'Активация', text: 'Получение реквизитов, настройка online banking, тестовая транзакция.' },
      ],
    },

    includes: {
      title: 'Что входит',
      label: 'Состав',
      items: [
        'Анализ банковского профиля',
        'Подбор банка под профиль',
        'Подготовка SOF документации',
        'Business cycle описание',
        'Подача и отслеживание заявки',
        'Сопровождение при визите в банк',
        'Разблокировка (при проблемах)',
        'Premium / Private banking (опц.)',
      ],
    },

    why: {
      title: 'Почему WTP',
      label: 'Подход',
      items: [
        { title: 'Знаем банки изнутри', text: 'Понимаем критерии каждого банка. Не подаём «в надежде»\u00a0— подаём точечно.' },
        { title: 'Сложные кейсы', text: 'РФ паспорт, крипто, сложная структура\u00a0— не отказываем, а находим маршрут.' },
        { title: 'До результата', text: 'Если банк запросил дополнительные документы\u00a0— мы дорабатываем пакет, а не бросаем.' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 7. ФАКТОРИНГ — Авансирование брокеров
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'factoring',
    accent: '#b8860b',
    tag: 'Для агентов по недвижимости',
    headline: 'Факторинг комиссий.<br>Ваши деньги\u00a0— до закрытия сделки.',
    sub: 'Авансирование брокерских комиссий по сделкам с недвижимостью. Получите оплату сразу, не дожидаясь расчёта от застройщика.',
    cta: 'Получить аванс',

    what: {
      title: 'Как это работает',
      label: 'Механика',
      text: 'Агент закрывает сделку, но комиссия приходит через 30\u201390 дней (иногда дольше). Факторинг решает эту проблему: мы авансируем вашу комиссию сразу после подтверждения сделки. Вы получаете деньги, мы получаем комиссию, когда застройщик рассчитается. Никаких кредитов, залогов или сложных документов.',
    },

    benefits: {
      title: 'Что вы получаете',
      label: 'Результат',
      items: [
        { title: 'Деньги сразу', text: 'Авансирование до 80% комиссии в течение 3\u20135 рабочих дней после подтверждения сделки.' },
        { title: 'Без кредитов', text: 'Это не займ. Мы покупаем право требования\u00a0— ваша кредитная история не при чём.' },
        { title: 'Простая механика', text: 'Подтверждение сделки → документы → деньги на счёт. Минимум бюрократии.' },
        { title: 'Масштабирование', text: 'Больше сделок\u00a0— больше авансов. Факторинг растёт вместе с вашим бизнесом.' },
      ],
    },

    process: {
      title: 'Процесс',
      label: 'Этапы',
      steps: [
        { num: '01', title: 'Сделка', text: 'Вы закрываете сделку и получаете подтверждение от застройщика / продавца.' },
        { num: '02', title: 'Заявка', text: 'Отправляете нам подтверждение сделки и комиссионное соглашение.' },
        { num: '03', title: 'Оценка', text: 'Мы проверяем сделку и застройщика. Решение — в течение 1\u20132 рабочих дней.' },
        { num: '04', title: 'Выплата', text: 'Аванс на ваш счёт. Остаток\u00a0— после расчёта застройщика за вычетом комиссии.' },
      ],
    },

    includes: {
      title: 'Что входит',
      label: 'Состав',
      items: [
        'Оценка сделки и контрагента',
        'Авансирование до 80% комиссии',
        'Юридическое оформление',
        'Сбор с застройщика',
        'Отчётность по каждой сделке',
        'Персональный менеджер',
        'Без залогов и поручительств',
        'Без влияния на кредитную историю',
      ],
    },

    why: {
      title: 'Почему WTP',
      label: 'Подход',
      items: [
        { title: 'Понимаем рынок', text: 'Мы работаем с недвижимостью ОАЭ\u00a0— знаем застройщиков, сроки, риски.' },
        { title: 'Скорость', text: 'Решение за 1\u20132 дня, деньги\u00a0— за 3\u20135. Не месяцы банковского согласования.' },
        { title: 'Партнёрство', text: 'Мы не кредитор. Мы партнёр, который помогает вашему cashflow.' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 8. ESCROW — Регистрация сделок с недвижимостью
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'escrow',
    accent: '#8e2de2',
    tag: 'Для покупателей и продавцов недвижимости',
    headline: 'Escrow и регистрация сделок.<br>Безопасная покупка без счёта в\u00a0ОАЭ.',
    sub: 'Escrow-счёт, проверка объекта, юридическое закрытие сделки\u00a0— для тех, кто покупает или продаёт недвижимость в ОАЭ без локального банковского счёта.',
    cta: 'Обсудить сделку',

    what: {
      title: 'Зачем нужен escrow',
      label: 'Контекст',
      text: 'Покупка недвижимости в ОАЭ без локального счёта\u00a0— стандартная ситуация для нерезидентов. Escrow-счёт решает проблему: деньги хранятся на защищённом счёте до завершения сделки. Мы берём на себя юридическую проверку, подготовку документов и регистрацию в DLD (Dubai Land Department).',
    },

    benefits: {
      title: 'Что вы получаете',
      label: 'Результат',
      items: [
        { title: 'Безопасность средств', text: 'Escrow-счёт: деньги переводятся продавцу только после регистрации права собственности.' },
        { title: 'Без локального счёта', text: 'Не нужен банковский счёт в ОАЭ для совершения сделки. Escrow\u00a0— альтернативный маршрут.' },
        { title: 'Юридическая проверка', text: 'Проверка объекта, продавца, обременений, статуса застройщика. Due diligence до сделки.' },
        { title: 'Регистрация в DLD', text: 'Полное сопровождение регистрации права собственности в Dubai Land Department.' },
      ],
    },

    process: {
      title: 'Как это работает',
      label: 'Процесс',
      steps: [
        { num: '01', title: 'Проверка', text: 'Due diligence объекта и продавца. Проверка обременений, статуса в DLD.' },
        { num: '02', title: 'Escrow', text: 'Открытие escrow-счёта. Перевод средств покупателя на защищённый счёт.' },
        { num: '03', title: 'Оформление', text: 'Подготовка SPA (Sale Purchase Agreement), NOC от застройщика, документы в DLD.' },
        { num: '04', title: 'Регистрация', text: 'Трансфер в DLD, выпуск Title Deed, перевод средств продавцу.' },
      ],
    },

    includes: {
      title: 'Что входит',
      label: 'Состав',
      items: [
        'Due diligence объекта',
        'Открытие escrow-счёта',
        'Подготовка SPA',
        'Получение NOC от застройщика',
        'Сопровождение в DLD',
        'Регистрация Title Deed',
        'Перевод средств по escrow',
        'Координация с агентом / юристом',
      ],
    },

    why: {
      title: 'Почему WTP',
      label: 'Подход',
      items: [
        { title: 'Без банковского счёта', text: 'Escrow позволяет провести сделку без открытия локального счёта.' },
        { title: 'Полный цикл', text: 'От проверки объекта до Title Deed\u00a0— один подрядчик, один процесс.' },
        { title: 'Прозрачность', text: 'Все платежи через escrow. Вы видите, куда уходят деньги и когда.' },
      ],
    },
  },

];


// ─── Shared CSS (WTP Design System) ────────────────────────────────

const sharedCSS = `
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }

  :root {
    --bg: #FAFAFA; --bg-card: #FFFFFF; --border: #E0E0E0;
    --text: #0A0A0A; --text2: #666666; --meta: #767676;
    --font: "Inter", sans-serif; --serif: "Playfair Display", serif;
  }

  body {
    background: var(--bg); color: var(--text); font-family: var(--font);
    width: 210mm; min-height: 297mm; padding: 11mm 15mm 10mm;
    font-size: 10px; line-height: 1.4;
    display: flex; flex-direction: column;
  }

  .header {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid var(--border);
  }
  .header-left h1 {
    font-size: 24px; font-family: var(--serif); font-weight: 400;
    letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 5px; max-width: 430px;
  }
  .header-left p { font-size: 10.5px; color: var(--text2); max-width: 400px; line-height: 1.4; }
  .tag {
    font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--meta); margin-bottom: 6px; display: block;
  }
  .cta {
    display: inline-block; background: var(--text); color: var(--bg);
    font-size: 10px; font-weight: 500; padding: 6px 16px; border-radius: 100px;
    text-decoration: none; white-space: nowrap;
  }

  .section { margin-bottom: 12px; }
  .section-head {
    display: flex; justify-content: space-between; align-items: baseline;
    margin-bottom: 6px;
  }
  .section-head h2 { font-size: 14px; font-family: var(--serif); font-weight: 400; }
  .section-head .label { font-size: 8.5px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--meta); }

  .what-block {
    background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px;
    padding: 10px 12px; font-size: 10px; color: var(--text2); line-height: 1.45;
  }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .card {
    background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px;
    padding: 9px; overflow: hidden;
  }
  .card h4 { font-family: var(--serif); font-size: 11.5px; margin-bottom: 2px; font-weight: 400; }
  .card p { font-size: 9px; color: var(--text2); line-height: 1.35; }

  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
  .process-step { padding-left: 8px; border-left: 1px solid var(--border); position: relative; }
  .process-step::before {
    content: ''; position: absolute; left: -2.5px; top: 5px;
    width: 4px; height: 4px; background: var(--meta); border-radius: 50%;
  }
  .process-step .pill {
    display: inline-block; padding: 1px 5px; border-radius: 100px;
    font-size: 8px; border: 1px solid var(--border); margin-bottom: 3px; color: var(--text2);
  }
  .process-step h3 { font-size: 11px; font-weight: 500; margin-bottom: 1px; }
  .process-step p { font-size: 8.5px; color: var(--text2); line-height: 1.3; }

  .includes-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 3px 16px;
  }
  .includes-item {
    display: flex; align-items: center; gap: 6px; padding: 3px 0;
  }
  .includes-check {
    width: 12px; height: 12px; border: 1px solid var(--border); border-radius: 3px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    font-size: 8.5px; color: var(--meta);
  }
  .includes-item span { font-size: 9.5px; color: var(--text); }

  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .why-item { display: flex; gap: 6px; align-items: flex-start; }
  .why-dot { width: 5px; height: 5px; border-radius: 50%; margin-top: 3px; flex-shrink: 0; }
  .why-item strong { font-size: 11px; font-family: var(--serif); font-weight: 400; display: block; margin-bottom: 1px; }
  .why-item p { font-size: 8.5px; color: var(--text2); line-height: 1.3; }

  .footer {
    margin-top: auto; padding-top: 8px; border-top: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: flex-end;
  }
  .footer-col { flex: 1; }
  .footer-label { font-size: 8px; color: var(--meta); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1px; }
  .footer-value { font-size: 9.5px; }
`;


// ─── HTML Builder ───────────────────────────────────────────────────

function buildProductHTML(p) {
  const accentColors = ['#e74c3c', '#b8860b', '#004e92', '#8e2de2'];

  const benefitsHTML = p.benefits.items.map((b, i) =>
    `<div class="card" style="border-top: 2px solid ${accentColors[i % 4]}"><h4>${b.title}</h4><p>${b.text}</p></div>`
  ).join('\n');

  const processHTML = p.process.steps.map(s =>
    `<div class="process-step"><span class="pill">${s.num}</span><h3>${s.title}</h3><p>${s.text}</p></div>`
  ).join('\n');

  const includesHTML = p.includes.items.map(item =>
    `<div class="includes-item"><div class="includes-check">\u2713</div><span>${item}</span></div>`
  ).join('\n');

  const whyHTML = p.why.items.map((w, i) =>
    `<div class="why-item">
      <div class="why-dot" style="background:${accentColors[i % 4]}"></div>
      <div><strong>${w.title}</strong><p>${w.text}</p></div>
    </div>`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
<style>${sharedCSS}
  .accent-bar { width: 40px; height: 3px; background: ${p.accent}; border-radius: 2px; margin-bottom: 8px; }
</style>
</head>
<body>

<div class="header">
  <div class="header-left">
    <span class="tag">${p.tag}</span>
    <h1>${p.headline}</h1>
    <p style="margin-top:5px">${p.sub}</p>
  </div>
  <div class="header-right" style="text-align:right;padding-top:16px">
    <a class="cta">${p.cta}</a>
  </div>
</div>

<div class="section">
  <div class="section-head"><h2>${p.what.title}</h2><span class="label">${p.what.label}</span></div>
  <div class="what-block">${p.what.text}</div>
</div>

<div class="section">
  <div class="section-head"><h2>${p.benefits.title}</h2><span class="label">${p.benefits.label}</span></div>
  <div class="grid-2">${benefitsHTML}</div>
</div>

<div class="section">
  <div class="section-head"><h2>${p.process.title}</h2><span class="label">${p.process.label}</span></div>
  <div class="grid-4">${processHTML}</div>
</div>

<div class="section">
  <div class="section-head"><h2>${p.includes.title}</h2><span class="label">${p.includes.label}</span></div>
  <div class="includes-grid">${includesHTML}</div>
</div>

<div class="section">
  <div class="section-head"><h2>${p.why.title}</h2><span class="label">${p.why.label}</span></div>
  <div class="grid-3">${whyHTML}</div>
</div>

<div style="text-align:center;font-size:8px;color:var(--meta);margin-bottom:6px;letter-spacing:0.05em">С 2019 года · 350+ клиентов · Banking-First подход</div>
<div class="footer">
  <div class="footer-col">
    <div class="footer-label">WTP</div>
    <div class="footer-value">WTP Brokers</div>
  </div>
  <div class="footer-col">
    <div class="footer-label">\u041a\u043e\u043d\u0442\u0430\u043a\u0442</div>
    <div class="footer-value">hello@wtpbrokers.com</div>
  </div>
  <div class="footer-col" style="text-align:right">
    <div class="footer-label">\u041e\u0444\u0438\u0441</div>
    <div class="footer-value">\u0414\u0443\u0431\u0430\u0439, \u041e\u0410\u042d</div>
  </div>
</div>

</body>
</html>`;
}


// ─── PDF Generator ──────────────────────────────────────────────────

async function generateProductPDF(product, browser) {
  const html = buildProductHTML(product);
  const pdfPath = path.join(outDir, `WTP_${product.id}_RU.pdf`);
  const pngPath = path.join(outDir, `WTP_${product.id}_RU_preview.png`);

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, preferCSSPageSize: true });

  await page.setViewport({ width: 794, height: 1123 });
  await page.screenshot({ path: pngPath, fullPage: true });

  const diagnostics = await page.evaluate(() => {
    const bodyRect = document.body.getBoundingClientRect();
    const mmPerPx = 25.4 / 96;
    const contentHeightMM = bodyRect.height * mmPerPx;
    return { contentHeightMM: Math.round(contentHeightMM), fitsOnOnePage: contentHeightMM <= 297 };
  });

  await page.close();

  const status = diagnostics.fitsOnOnePage ? '\u2705' : '\u26a0\ufe0f';
  console.log(`  ${status} ${product.id}: ${diagnostics.contentHeightMM}mm (${diagnostics.fitsOnOnePage ? 'OK' : 'OVERFLOW'})`);
  console.log(`     PDF: ${pdfPath}`);
  console.log(`     PNG: ${pngPath}`);

  return { id: product.id, ...diagnostics };
}


// ─── Main ───────────────────────────────────────────────────────────

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  console.log(`\nGenerating ${products.length} product one-pagers...\n`);
  console.log(`Output: ${outDir}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = [];
  for (const product of products) {
    const result = await generateProductPDF(product, browser);
    results.push(result);
  }

  await browser.close();

  console.log('\n─── Summary ───');
  const ok = results.filter(r => r.fitsOnOnePage).length;
  const overflow = results.filter(r => !r.fitsOnOnePage).length;
  console.log(`\u2705 OK: ${ok}  \u26a0\ufe0f Overflow: ${overflow}  Total: ${results.length}`);
  console.log('\nDone!');
})();
