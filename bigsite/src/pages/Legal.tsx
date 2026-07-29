import type { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { Section, Eyebrow } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { Seo } from "../components/Seo";
import { NotFound } from "./NotFound";
import { site } from "../lib/site";
import { useLang, type Lang } from "../i18n/lang";

type LegalDoc = { title: string; body: ReactNode };

// First-draft legal copy authored in-house. Have counsel review before relying on it
// for regulated activity — especially the Disclaimer (financial-services vertical).
const docsEn: Record<string, LegalDoc> = {
  disclaimer: {
    title: "Disclaimer",
    body: (
      <>
        <p>
          WTP ("we") provides advisory and facilitation
          services: company formation, banking facilitation, residency and visa support, and related
          structuring assistance in the United Arab Emirates.
        </p>
        <h3>Not regulated advice</h3>
        <p>
          Nothing on this website constitutes — and should not be relied upon as — regulated
          investment advice, tax advice, legal advice, or a personal recommendation, unless it is set
          out in a signed engagement letter that expressly says so. We are an advisory and
          facilitation provider, not a licensed bank, law firm, audit firm, or financial adviser.
        </p>
        <h3>Figures are illustrative</h3>
        <p>
          Tax rates, government fees, thresholds, timelines and other figures shown here are general,
          jurisdiction-dependent, and subject to change as laws and regulator policy evolve. Examples
          and case outcomes are anonymized and specific to the facts of each engagement; they are not
          a promise of a similar result for you. Banking approval is always at the discretion of the
          relevant bank and its compliance process — no outcome is guaranteed.
        </p>
        <h3>Do your own diligence</h3>
        <p>
          Before acting on anything you read here, verify it against current law and take advice from
          a qualified professional licensed in the relevant jurisdiction. WTP accepts no liability for
          decisions made solely on the basis of this website.
        </p>
        <h3>Anti-money-laundering</h3>
        <p>
          WTP operates a know-your-client and source-of-funds process and does not assist with the
          concealment of assets, tax evasion, or any unlawful activity. We may decline or discontinue
          an engagement where compliance requirements cannot be met.
        </p>
        <p style={{ color: "var(--ink-40)", fontSize: 14 }}>
          Questions about this disclaimer: <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a>.
        </p>
      </>
    ),
  },
  privacy: {
    title: "Privacy Policy",
    body: (
      <>
        <p>
          This policy explains how WTP handles personal data you provide through this website (for
          example, when you request a pre-screen or contact us) and through our advertising on
          Facebook and Instagram.
        </p>
        <h3>What we collect</h3>
        <p>
          The details you submit — typically your name, email, phone number, country of origin, and a
          description of your situation — plus basic technical data your browser sends. We do not
          knowingly collect special-category data.
        </p>
        <h3>Leads from our ads</h3>
        <p>
          When you respond to a WTP ad on Facebook or Instagram and submit one of Meta's lead forms
          (Instant Forms), Meta passes us the details you entered — typically your name, email, phone
          number, and answers to a few short qualifying questions. We use them only to contact you
          about the request you made and related WTP services, exactly as set out below. We receive
          your data only if you submit the form yourself, and we are joint controllers with Meta only
          for that lead-form step; Meta's own handling of your data is governed by its privacy policy.
        </p>
        <h3>Why we use it</h3>
        <p>
          Solely to respond to your enquiry, assess bankability, deliver the services you ask for, and
          meet our legal and compliance obligations. We do not sell your data. Enquiries are processed
          in our CRM (Bitrix24) and, where you book a call, via our scheduling provider.
        </p>
        <h3>Sharing</h3>
        <p>
          We share data only with service providers that help us operate (CRM, scheduling, email) and
          with banks, free zones, or authorities strictly where needed to carry out an engagement you
          have asked us to perform, or where required by law.
        </p>
        <h3>Retention &amp; your rights</h3>
        <p>
          We keep enquiry and lead data only as long as needed for the purpose above — typically no
          longer than 24 months after our last contact with you — unless a longer period is required
          by applicable record-keeping or anti-money-laundering rules. Our lawful basis is your
          consent and our legitimate interest in responding to your enquiry. You can ask us to access,
          correct, delete, port, or object to the processing of your data — including asking us to
          delete your lead — at{" "}
          <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a>. If you
          are covered by the EU/UK GDPR or a similar regime, you may also lodge a complaint with your
          local data-protection supervisory authority.
        </p>
      </>
    ),
  },
  terms: {
    title: "Terms of Service",
    body: (
      <>
        <p>
          These terms govern your use of the WTP website and any services you engage us to provide.
          By using the site you accept them.
        </p>
        {/* [НА УТВЕРЖДЕНИЕ ЮРИСТОМ] — contracting entity confirmed by Konstantin (Q2): ILEGAL CONSULTANCY CO. L.L.C, licence 1162594. Verify this is the Stripe merchant of record before prod. */}
        <h3>Who you are contracting with</h3>
        <p>
          Paid services described on this site — will registration assistance, residency and Golden
          Visa processing, and company formation — are provided by <strong>ILEGAL CONSULTANCY CO.
          L.L.C</strong>, a UAE management consultancy (licence 1162594), registered at Dubai Media
          City, Arenco Tower, Office 1207, Dubai, United Arab Emirates ("WTP", "we"). Real-estate
          services are provided by an affiliated licensed broker; see our{" "}
          <a href="/legal/regulatory" style={{ color: "var(--gold)" }}>Regulatory Status</a> page.
          You can reach us at{" "}
          <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a>.
        </p>
        <h3>The website</h3>
        <p>
          The site itself is informational. Browsing it does not create a client relationship; an
          engagement begins only when both parties agree a written offer or engagement letter that
          sets out scope, fees and responsibilities. Content may be updated or removed at any time.
        </p>
        <h3>Services, fees and payment</h3>
        <p>
          Published fees for our productized services are shown on our{" "}
          <a href="/pricing" style={{ color: "var(--gold)" }}>Service pricing</a> page. A fee covers
          our professional work on that service; UAE government charges, court, notary and other
          third-party costs are separate and are confirmed for your case before you commit. We
          confirm the exact scope and price for you in a written offer, and payment is taken via the
          payment link or invoice referenced in that offer. Bespoke advisory mandates are scoped and
          quoted per engagement.
        </p>
        <h3>Refunds</h3>
        <p>
          Deposits and fees are handled under our{" "}
          <a href="/legal/refund-policy" style={{ color: "var(--gold)" }}>Refund Policy</a>, which
          forms part of these terms.
        </p>
        <h3>No guarantee of outcome</h3>
        <p>
          We provide assistance, processing and facilitation — not a guaranteed result. Third-party
          outcomes — bank approvals, regulator and court decisions, visa issuance — are determined by
          those parties under their own rules and discretion, not by WTP, and are never guaranteed.
          Timelines are estimates that depend on the relevant authority.
        </p>
        <h3>Your responsibilities</h3>
        <p>
          You agree to provide accurate information and genuine documents, and to complete our
          know-your-client and source-of-funds checks. We may decline or discontinue an engagement
          where compliance requirements cannot be met, or where a matter falls outside what we are
          licensed to do.
        </p>
        <h3>Intellectual property</h3>
        <p>
          The site content, brand and materials are owned by WTP unless stated otherwise. Don't
          reproduce them commercially without permission.
        </p>
        <h3>Governing law</h3>
        <p>
          These terms and any engagement are governed by the laws of the United Arab Emirates as
          applied in the Emirate of Dubai, and are subject to the jurisdiction of the Dubai courts.
        </p>
        <h3>Contact</h3>
        <p>
          Questions: <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a> · {site.office}.
        </p>
      </>
    ),
  },

  // [НА УТВЕРЖДЕНИЕ ЮРИСТОМ] — refund terms are a first draft on the default Konstantin approved
  // (deposit refundable before work starts, non-refundable after, government/third-party fees never
  // refundable). Counsel to confirm the refundable window and the pro-rata wording before prod.
  "refund-policy": {
    title: "Refund Policy",
    body: (
      <>
        <p>
          This policy explains how deposits and fees for WTP services — will registration assistance,
          residency and Golden Visa processing, and company formation — are refunded. It forms part of
          our <a href="/legal/terms" style={{ color: "var(--gold)" }}>Terms of Service</a>. The exact
          refundable amount for your matter is set out in the written offer you sign before payment.
        </p>
        <h3>Before we start work</h3>
        <p>
          If you cancel before we begin working on your matter, your deposit is refundable, less any
          non-recoverable payment-processing fees charged by the card network or payment provider.
          "Starting work" means we have begun drafting, filing, KYC review, or otherwise acting on
          your instructions.
        </p>
        <h3>Once work has started</h3>
        <p>
          Fees covering work already performed are non-refundable, because that work cannot be
          returned. Where part of the engagement has not yet begun, we may refund that portion at our
          discretion, calculated pro-rata against the scope in your offer.
        </p>
        <h3>Government and third-party charges</h3>
        <p>
          UAE government fees, court and notary fees, immigration, free-zone and bank charges, and
          other third-party costs are non-refundable once paid to the relevant authority or provider.
          These are outside our control — we pass them through at cost and cannot recover them on your
          behalf.
        </p>
        <h3>How the products differ</h3>
        <p>
          The same principle applies to every service, whether fixed-fee (for example UAE will
          registration or Golden Visa processing) or from-priced (for example company formation): our
          professional fee is refundable only for work not yet started, and third-party charges are
          never refundable once paid out.
        </p>
        <h3>How to request a refund</h3>
        <p>
          Email <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a> with
          your name and the service concerned. We review the request against the stage your matter has
          reached and, where a refund is due, return it to your original payment method within a
          reasonable period, typically 10 business days.
        </p>
      </>
    ),
  },

  cookies: {
    title: "Cookie Policy",
    body: (
      <>
        <p>
          This policy explains how this WTP website uses cookies and similar
          technologies, and the choices you have. We ask for your consent before setting any cookie
          that is not strictly necessary — nothing optional loads until you agree.
        </p>
        <h3>Strictly necessary — always on</h3>
        <p>
          These make the site work: navigation, security, remembering your progress through a form,
          and remembering the cookie choice you make here. They do not track you across other sites
          and cannot be switched off.
        </p>
        <h3>Analytics — Google Analytics 4 (only with your consent)</h3>
        <p>
          When enabled, we use Google Analytics 4 to understand how the site is used — pages viewed,
          document downloads, form submissions — so we can improve it. It sets cookies such as{" "}
          <code>_ga</code>. It loads only after you choose "Accept all" in the cookie banner, never
          before.
        </p>
        <h3>Marketing — Meta Pixel (only with your consent)</h3>
        <p>
          When enabled, we use the Meta (Facebook) Pixel to measure how well our campaigns work. It
          sets cookies such as <code>_fbp</code>. Like analytics, it loads only after your consent.
          While these tools are switched off on our side, no analytics or marketing cookies are set
          at all and no consent banner is shown.
        </p>
        <h3>Your choices &amp; withdrawing consent</h3>
        <p>
          When analytics or marketing cookies are in use, a consent banner appears on your first
          visit. You can change your mind at any time via the "Cookie settings" link in the footer —
          it reopens the banner, and choosing "Necessary only" also removes the tracking cookies we
          set. You can also refuse or delete cookies in your browser settings; blocking strictly
          necessary cookies may stop parts of the site from working.
        </p>
        <h3>More</h3>
        <p>
          Cookies that handle personal data are also covered by our{" "}
          <a href="/legal/privacy" style={{ color: "var(--gold)" }}>Privacy Policy</a>. Questions:{" "}
          <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a>.
        </p>
      </>
    ),
  },

  regulatory: {
    title: "Regulatory Status",
    body: (
      <>
        <p>
          WTP is a brand used by two UAE-licensed companies that share one Dubai office. The service
          on this website is provided by whichever company is licensed for that activity.
        </p>
        <h3>Who provides what</h3>
        <p>
          Advisory and facilitation — banking, company formation, residency and structuring — is
          provided by ILEGAL CONSULTANCY CO. L.L.C, a UAE management consultancy (licence 1162594).
          Real-estate brokerage is provided by an affiliated licensed broker, Wellcome to Paradise
          Real Estate Brokers L.L.C (ORN 35551, licence 1181286). Both are registered at Dubai Media
          City, Arenco Tower, Office 1207.
        </p>
        <h3>What WTP is not</h3>
        <p>
          WTP is not a bank, law firm, audit firm, tax adviser, or licensed financial-services firm,
          and it is not licensed or regulated by the Central Bank of the UAE, the Dubai Financial
          Services Authority (DIFC), the Financial Services Regulatory Authority (ADGM), the Securities
          and Commodities Authority, or the Virtual Assets Regulatory Authority. Nothing on this site
          is an offer of regulated financial services or regulated advice.
        </p>
        <h3>Third-party decisions</h3>
        <p>
          Bank accounts, licences, visas and audited structures are granted by the relevant banks,
          free zones, authorities and licensed professionals under their own rules and at their own
          discretion. WTP prepares and coordinates the file and introduces you to licensed providers;
          it does not approve, guarantee, or control those outcomes. Any engagement is governed by a
          signed letter that sets out scope, fees and responsibilities. Questions:{" "}
          <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a>.
        </p>
      </>
    ),
  },
};

// ⚠️ ВЫЧИТКА ОЛЕ — ВСЯ русскоязычная секция ниже юридически чувствительна (дисклеймер финвертикали,
// AML/KYC, регуляторный статус, лицензии, «facilitation»-рамка, GDPR). Faithful-перевод, ничего не
// смягчено и не добавлено. НЕ публиковать в прод до юридической вычитки Оли/юрконсультанта.
const docsRu: Record<string, LegalDoc> = {
  disclaimer: {
    title: "Отказ от ответственности",
    body: (
      <>
        <p>
          WTP («мы») оказывает консультационные и фасилитационные услуги: регистрация компаний,
          сопровождение открытия банковских счетов, поддержка по резидентству и визам, а также
          сопутствующая помощь в структурировании в Объединённых Арабских Эмиратах.
        </p>
        <h3>Не регулируемая консультация</h3>
        <p>
          Ничто на этом сайте не является — и не должно рассматриваться как — регулируемая
          инвестиционная, налоговая или юридическая консультация либо персональная рекомендация, если
          это прямо не закреплено в подписанном соглашении об оказании услуг. Мы — поставщик
          консультационных и фасилитационных услуг, а не лицензированный банк, юридическая фирма,
          аудиторская компания или финансовый советник.
        </p>
        <h3>Цифры носят иллюстративный характер</h3>
        <p>
          Ставки налогов, государственные пошлины, пороги, сроки и прочие приведённые здесь цифры
          являются общими, зависят от юрисдикции и могут изменяться по мере развития законодательства
          и политики регуляторов. Примеры и результаты кейсов анонимизированы и относятся к
          конкретным обстоятельствам каждого проекта; они не являются обещанием аналогичного
          результата для вас. Одобрение банковского счёта всегда остаётся на усмотрение
          соответствующего банка и его комплаенс-процедуры — ни один результат не гарантирован.
        </p>
        <h3>Проводите собственную проверку</h3>
        <p>
          Прежде чем действовать на основании прочитанного здесь, сверьте это с действующим
          законодательством и получите консультацию квалифицированного специалиста, лицензированного в
          соответствующей юрисдикции. WTP не несёт ответственности за решения, принятые исключительно
          на основании этого сайта.
        </p>
        <h3>Противодействие отмыванию средств</h3>
        <p>
          WTP применяет процедуры «знай своего клиента» и проверки происхождения средств и не
          содействует сокрытию активов, уклонению от уплаты налогов или любой незаконной деятельности.
          Мы вправе отказать в проекте или прекратить его, если требования комплаенса не могут быть
          выполнены.
        </p>
        <p style={{ color: "var(--ink-40)", fontSize: 14 }}>
          Вопросы по этому отказу от ответственности: <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a>.
        </p>
      </>
    ),
  },
  privacy: {
    title: "Политика конфиденциальности",
    body: (
      <>
        <p>
          Эта политика объясняет, как WTP обрабатывает персональные данные, которые вы предоставляете
          через этот сайт (например, когда запрашиваете пре-скрининг или связываетесь с нами) и через
          нашу рекламу в Facebook и Instagram.
        </p>
        <h3>Что мы собираем</h3>
        <p>
          Сведения, которые вы отправляете, — как правило, имя, email, номер телефона, страну
          происхождения и описание вашей ситуации, — а также базовые технические данные, которые
          передаёт ваш браузер. Мы сознательно не собираем данные особых категорий.
        </p>
        <h3>Лиды из нашей рекламы</h3>
        <p>
          Когда вы откликаетесь на рекламу WTP в Facebook или Instagram и отправляете одну из лид-форм
          Meta (Instant Forms), Meta передаёт нам введённые вами данные — как правило, имя, email,
          номер телефона и ответы на несколько коротких уточняющих вопросов. Мы используем их только
          чтобы связаться с вами по вашему запросу и по сопутствующим услугам WTP, ровно как описано
          ниже. Мы получаем ваши данные только если вы сами отправили форму, и являемся совместными
          контролёрами с Meta только на этом шаге лид-формы; собственная обработка ваших данных со
          стороны Meta регулируется её политикой конфиденциальности.
        </p>
        <h3>Зачем мы их используем</h3>
        <p>
          Исключительно чтобы ответить на ваш запрос, оценить банкабельность, оказать запрошенные вами
          услуги и выполнить наши юридические и комплаенс-обязательства. Мы не продаём ваши данные.
          Запросы обрабатываются в нашей CRM (Bitrix24), а при записи на звонок — через наш сервис
          планирования.
        </p>
        <h3>Передача данных</h3>
        <p>
          Мы передаём данные только поставщикам услуг, помогающим нам работать (CRM, планирование,
          email), и банкам, фризонам или государственным органам строго в объёме, необходимом для
          выполнения проекта, о котором вы нас попросили, либо когда это требуется по закону.
        </p>
        <h3>Хранение &amp; ваши права</h3>
        <p>
          Мы храним данные запроса и лидов только столько, сколько необходимо для указанной выше цели
          — как правило, не дольше 24 месяцев с момента последнего контакта с вами, — если более
          длительный срок не требуется применимыми правилами документооборота или противодействия
          отмыванию средств. Нашим законным основанием является ваше согласие и наш законный интерес в
          ответе на ваш запрос. Вы можете запросить доступ, исправление, удаление, перенос данных или
          возражать против их обработки — в том числе попросить удалить ваш лид — по адресу{" "}
          <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a>. Если на вас
          распространяется GDPR ЕС/Великобритании или аналогичный режим, вы также вправе подать жалобу
          в местный надзорный орган по защите данных.
        </p>
      </>
    ),
  },
  terms: {
    title: "Условия использования",
    body: (
      <>
        <p>
          Эти условия регулируют использование вами сайта WTP и любые услуги, которые вы нам
          поручаете. Пользуясь сайтом, вы принимаете их.
        </p>
        {/* [НА УТВЕРЖДЕНИЕ ЮРИСТОМ] — юрлицо-исполнитель подтверждено Костей (Q2): ILEGAL CONSULTANCY CO. L.L.C, лицензия 1162594. Убедиться, что это merchant of record для Stripe, до прод-деплоя. */}
        <h3>С кем вы заключаете договор</h3>
        <p>
          Платные услуги, описанные на этом сайте, — сопровождение регистрации завещания, оформление
          резидентства и Golden Visa, регистрация компаний — оказывает <strong>ILEGAL CONSULTANCY
          CO. L.L.C</strong>, управленческий консалтинг в ОАЭ (лицензия 1162594), зарегистрированный
          по адресу Dubai Media City, Arenco Tower, Office 1207, Дубай, ОАЭ («WTP», «мы»). Услуги по
          недвижимости оказывает аффилированный лицензированный брокер — см. страницу{" "}
          <a href="/ru/legal/regulatory" style={{ color: "var(--gold)" }}>Регуляторный статус</a>.
          Связаться с нами: <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a>.
        </p>
        <h3>О сайте</h3>
        <p>
          Сам сайт носит информационный характер. Его просмотр не создаёт клиентских отношений;
          проект начинается только тогда, когда обе стороны согласуют письменную оферту или
          соглашение, определяющее объём, стоимость и ответственность. Содержимое может обновляться
          или удаляться в любое время.
        </p>
        <h3>Услуги, стоимость и оплата</h3>
        <p>
          Публичные цены на наши продуктизированные услуги указаны на странице{" "}
          <a href="/ru/pricing" style={{ color: "var(--gold)" }}>Стоимость услуг</a>. Стоимость покрывает
          нашу профессиональную работу по услуге; государственные пошлины ОАЭ, судебные, нотариальные
          и иные сборы третьих сторон оплачиваются отдельно и подтверждаются по вашему делу до старта.
          Точный объём и цену мы фиксируем в письменной оферте, оплата производится по платёжной
          ссылке или счёту из этой оферты. Индивидуальные консультационные мандаты оцениваются
          отдельно по каждому проекту.
        </p>
        <h3>Возвраты</h3>
        <p>
          Депозиты и оплаты регулируются нашей{" "}
          <a href="/ru/legal/refund-policy" style={{ color: "var(--gold)" }}>Политикой возврата</a>,
          которая является частью этих условий.
        </p>
        <h3>Отсутствие гарантии результата</h3>
        <p>
          Мы оказываем содействие, обработку и фасилитацию — а не гарантированный результат.
          Результаты, зависящие от третьих сторон, — одобрения банков, решения регуляторов и судов,
          выдача виз — определяются этими сторонами по их собственным правилам и на их усмотрение, а
          не WTP, и никогда не гарантируются. Сроки являются оценочными и зависят от соответствующего
          органа.
        </p>
        <h3>Ваши обязанности</h3>
        <p>
          Вы обязуетесь предоставлять достоверную информацию и подлинные документы и проходить наши
          процедуры «знай своего клиента» и проверки происхождения средств. Мы вправе отказать в
          проекте или прекратить его, если требования комплаенса не могут быть выполнены либо вопрос
          выходит за рамки того, на что мы лицензированы.
        </p>
        <h3>Интеллектуальная собственность</h3>
        <p>
          Содержимое сайта, бренд и материалы принадлежат WTP, если не указано иное. Не воспроизводите
          их в коммерческих целях без разрешения.
        </p>
        <h3>Применимое право</h3>
        <p>
          Эти условия и любой проект регулируются законодательством Объединённых Арабских Эмиратов в
          применении эмирата Дубай и подпадают под юрисдикцию судов Дубая.
        </p>
        <h3>Контакты</h3>
        <p>
          Вопросы: <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a> · {site.office}.
        </p>
      </>
    ),
  },

  // [НА УТВЕРЖДЕНИЕ ЮРИСТОМ] — условия возврата = первый черновик на дефолте, утверждённом Костей.
  "refund-policy": {
    title: "Политика возврата",
    body: (
      <>
        <p>
          Эта политика объясняет, как возвращаются депозиты и оплаты за услуги WTP — сопровождение
          регистрации завещания, оформление резидентства и Golden Visa, регистрацию компаний. Она
          является частью наших <a href="/ru/legal/terms" style={{ color: "var(--gold)" }}>Условий
          использования</a>. Точная возвращаемая сумма по вашему делу указана в письменной оферте,
          которую вы подписываете до оплаты.
        </p>
        <h3>До начала работ</h3>
        <p>
          Если вы отменяете до того, как мы приступили к работе по вашему делу, депозит возвращается
          за вычетом невозвратных комиссий за обработку платежа, удержанных платёжной системой или
          провайдером. «Начало работ» означает, что мы начали подготовку документов, подачу,
          KYC-проверку или иным образом действуем по вашим инструкциям.
        </p>
        <h3>После начала работ</h3>
        <p>
          Оплата за уже выполненную работу возврату не подлежит, поскольку эту работу нельзя вернуть.
          Если часть проекта ещё не начата, мы можем вернуть эту часть по нашему усмотрению, рассчитав
          её пропорционально объёму в вашей оферте.
        </p>
        <h3>Государственные сборы и платежи третьим сторонам</h3>
        <p>
          Государственные пошлины ОАЭ, судебные и нотариальные сборы, иммиграционные, фризонные и
          банковские платежи и иные расходы третьих сторон не возвращаются после уплаты
          соответствующему органу или провайдеру. Они вне нашего контроля — мы передаём их по
          себестоимости и не можем вернуть их за вас.
        </p>
        <h3>Чем различаются продукты</h3>
        <p>
          Тот же принцип применяется к каждой услуге — как с фиксированной ценой (например,
          регистрация завещания в ОАЭ или оформление Golden Visa), так и с ценой «от» (например,
          регистрация компании): наша профессиональная оплата возвращается только за ещё не начатую
          работу, а сборы третьих сторон не возвращаются после их уплаты.
        </p>
        <h3>Как запросить возврат</h3>
        <p>
          Напишите на <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a> с
          указанием имени и услуги. Мы сверяем запрос со стадией, которой достигло ваше дело, и, если
          возврат причитается, возвращаем средства на исходный способ оплаты в разумный срок, обычно в
          течение 10 рабочих дней.
        </p>
      </>
    ),
  },

  cookies: {
    title: "Политика в отношении cookies",
    body: (
      <>
        <p>
          Эта политика объясняет, как сайт WTP использует cookies и аналогичные технологии и какой
          выбор у вас есть. Мы запрашиваем ваше согласие до установки любых cookies, кроме строго
          необходимых, — ничего опционального не загружается, пока вы не согласитесь.
        </p>
        <h3>Строго необходимые — всегда включены</h3>
        <p>
          Они обеспечивают работу сайта: навигацию, безопасность, запоминание вашего прогресса в
          форме и запоминание выбора по cookies, который вы делаете здесь. Они не отслеживают вас на
          других сайтах и не могут быть отключены.
        </p>
        <h3>Аналитика — Google Analytics 4 (только с вашего согласия)</h3>
        <p>
          При включении мы используем Google Analytics 4, чтобы понимать, как используется сайт, —
          просмотренные страницы, загрузки документов, отправки форм, — чтобы улучшать его. Он
          устанавливает cookies, например{" "}
          <code>_ga</code>. Он загружается только после того, как вы выберете «Принять все» в баннере
          cookies, и никогда раньше.
        </p>
        <h3>Маркетинг — Meta Pixel (только с вашего согласия)</h3>
        <p>
          При включении мы используем Meta (Facebook) Pixel, чтобы измерять эффективность наших
          кампаний. Он устанавливает cookies, например <code>_fbp</code>. Как и аналитика, он
          загружается только после вашего согласия. Пока эти инструменты отключены на нашей стороне,
          никакие аналитические или маркетинговые cookies не устанавливаются и баннер согласия не
          показывается.
        </p>
        <h3>Ваш выбор &amp; отзыв согласия</h3>
        <p>
          Когда аналитические или маркетинговые cookies используются, при первом визите появляется
          баннер согласия. Вы можете изменить решение в любой момент по ссылке «Настройки cookies» в
          подвале — она снова открывает баннер, а выбор «Только необходимые» также удаляет
          установленные нами отслеживающие cookies. Вы также можете отклонить или удалить cookies в
          настройках браузера; блокировка строго необходимых cookies может нарушить работу частей
          сайта.
        </p>
        <h3>Подробнее</h3>
        <p>
          Cookies, обрабатывающие персональные данные, также покрываются нашей{" "}
          <a href="/legal/privacy" style={{ color: "var(--gold)" }}>Политикой конфиденциальности</a>. Вопросы:{" "}
          <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a>.
        </p>
      </>
    ),
  },

  regulatory: {
    title: "Регуляторный статус",
    body: (
      <>
        <p>
          WTP — бренд, используемый двумя лицензированными в ОАЭ компаниями, которые делят один офис в
          Дубае. Услуга на этом сайте оказывается той компанией, которая лицензирована на
          соответствующую деятельность.
        </p>
        <h3>Кто что оказывает</h3>
        <p>
          Консультационные и фасилитационные услуги — банкинг, регистрация компаний, резидентство и
          структурирование — оказывает ILEGAL CONSULTANCY CO. L.L.C, управленческий консалтинг в ОАЭ
          (лицензия 1162594). Услуги по недвижимости оказывает аффилированный лицензированный брокер
          Wellcome to Paradise Real Estate Brokers L.L.C (ORN 35551, лицензия 1181286). Обе
          зарегистрированы по адресу Dubai Media City, Arenco Tower, Office 1207.
        </p>
        <h3>Чем WTP не является</h3>
        <p>
          WTP не является банком, юридической фирмой, аудиторской компанией, налоговым советником или
          лицензированной финансовой организацией и не лицензируется и не регулируется Центральным
          банком ОАЭ, Dubai Financial Services Authority (DIFC), Financial Services Regulatory
          Authority (ADGM), Securities and Commodities Authority или Virtual Assets Regulatory
          Authority. Ничто на этом сайте не является предложением регулируемых финансовых услуг или
          регулируемой консультации.
        </p>
        <h3>Решения третьих сторон</h3>
        <p>
          Банковские счета, лицензии, визы и аудированные структуры предоставляются соответствующими
          банками, фризонами, государственными органами и лицензированными специалистами по их
          собственным правилам и на их усмотрение. WTP готовит и координирует пакет документов и
          знакомит вас с лицензированными провайдерами; она не одобряет, не гарантирует и не
          контролирует эти результаты. Любой проект регулируется подписанным соглашением, определяющим
          объём, стоимость и ответственность. Вопросы:{" "}
          <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a>.
        </p>
      </>
    ),
  },
};

const LEGAL_DOCS: Record<Lang, Record<string, LegalDoc>> = { en: docsEn, ru: docsRu };

export default function Legal() {
  const lang = useLang();
  const { doc } = useParams();
  const d = LEGAL_DOCS[lang][doc || ""];
  if (!d) return <NotFound />;
  const t =
    lang === "ru"
      ? {
          seoDesc: `${d.title} — WTP, бэк-офис для частного капитала.`,
          home: "Главная",
          eyebrow: "Правовая информация",
          updated: "Обновлено 14 июля 2026 · Черновик на вычитку — ещё не согласован юристом.",
        }
      : {
          seoDesc: `${d.title} for WTP — the back office for private wealth.`,
          home: "Home",
          eyebrow: "Legal",
          updated: "Last updated 14 July 2026 · Draft for review — not yet counsel-approved.",
        };
  return (
    <>
      <Seo title={`${d.title} — WTP`} description={t.seoDesc} canonical={`/legal/${doc}`} />
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: t.home, href: "/" }, { label: d.title }]} />
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1 className="h-grad" style={{ marginBottom: 22 }}>{d.title}</h1>
        <div className="prose">{d.body}</div>
        <p style={{ marginTop: 32, fontSize: 13, color: "var(--ink-40)" }}>{t.updated}</p>
      </Section>
    </>
  );
}
