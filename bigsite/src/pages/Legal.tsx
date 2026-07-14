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
          This policy explains how WTP handles personal data you provide through
          this website (for example, when you request a pre-screen or contact us).
        </p>
        <h3>What we collect</h3>
        <p>
          The details you submit — typically your name, email, country of origin, and a description of
          your situation — plus basic technical data your browser sends. We do not knowingly collect
          special-category data through this site.
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
          We keep enquiry data only as long as needed for the purpose above and applicable record-
          keeping rules. Our lawful basis is your consent and our legitimate interest in responding
          to your enquiry. You can ask us to access, correct, delete, port, or object to the
          processing of your data at{" "}
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
          These terms govern your use of the WTP website. By using the site you
          accept them.
        </p>
        <h3>The website</h3>
        <p>
          This site is informational. It does not create a client relationship; an engagement begins
          only when both parties sign a written engagement letter that sets out scope, fees and
          responsibilities. Content may be updated or removed at any time.
        </p>
        <h3>No guarantee of outcome</h3>
        <p>
          Service tiers, timelines and prices indicated here are guidance and are confirmed per
          engagement. Third-party outcomes — bank approvals, regulator decisions, visa issuance — are
          determined by those parties, not by WTP, and are never guaranteed.
        </p>
        <h3>Intellectual property</h3>
        <p>
          The site content, brand and materials are owned by WTP unless stated otherwise. Don't
          reproduce them commercially without permission.
        </p>
        <h3>Contact</h3>
        <p>
          Questions: <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a> · {site.office}.
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
          через этот сайт (например, когда запрашиваете пре-скрининг или связываетесь с нами).
        </p>
        <h3>Что мы собираем</h3>
        <p>
          Сведения, которые вы отправляете, — как правило, имя, email, страну происхождения и описание
          вашей ситуации, — а также базовые технические данные, которые передаёт ваш браузер. Мы
          сознательно не собираем через этот сайт данные особых категорий.
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
          Мы храним данные запроса только столько, сколько необходимо для указанной выше цели и в
          соответствии с применимыми правилами документооборота. Нашим законным основанием является
          ваше согласие и наш законный интерес в ответе на ваш запрос. Вы можете запросить доступ,
          исправление, удаление, перенос данных или возражать против их обработки по адресу{" "}
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
          Эти условия регулируют использование вами сайта WTP. Пользуясь сайтом, вы принимаете их.
        </p>
        <h3>О сайте</h3>
        <p>
          Этот сайт носит информационный характер. Он не создаёт клиентских отношений; проект
          начинается только тогда, когда обе стороны подписывают письменное соглашение об оказании
          услуг, определяющее объём, стоимость и ответственность. Содержимое может обновляться или
          удаляться в любое время.
        </p>
        <h3>Отсутствие гарантии результата</h3>
        <p>
          Указанные здесь уровни услуг, сроки и цены являются ориентиром и подтверждаются по каждому
          проекту. Результаты, зависящие от третьих сторон, — одобрения банков, решения регуляторов,
          выдача виз — определяются этими сторонами, а не WTP, и никогда не гарантируются.
        </p>
        <h3>Интеллектуальная собственность</h3>
        <p>
          Содержимое сайта, бренд и материалы принадлежат WTP, если не указано иное. Не воспроизводите
          их в коммерческих целях без разрешения.
        </p>
        <h3>Контакты</h3>
        <p>
          Вопросы: <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a> · {site.office}.
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
