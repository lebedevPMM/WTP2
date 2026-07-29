import { Section, Eyebrow, Button, Chip } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { Seo } from "../components/Seo";
import { useLang, L as Link } from "../i18n/lang";

// Published fees for WTP's productized services. This page exists so the priced services described
// in ads (UAE will / Golden Visa / company setup / bank account) are visible on the site with their
// fees — required for Stripe's site-vs-application review. Bespoke advisory mandates stay unpriced
// ("quoted per engagement"), preserving the "no prices" stance on the marketing pages.
//
// Prices are the public prices Konstantin approved (2026-07). Fees cover WTP's professional work;
// government / third-party charges are billed separately at cost (see note) — [ПОДТВЕРДИТЬ с Олей,
// включены ли какие-либо гос-сборы в озвученную цену перед прод-деплоем].

type Item = {
  name: string;
  price: string;
  tag: string;
  desc: string;
};

export default function Pricing() {
  const lang = useLang();
  const ru = lang === "ru";

  const t = ru
    ? {
        seoTitle: "Стоимость услуг — WTP",
        seoDesc:
          "Публичные цены на продуктизированные услуги WTP: регистрация завещания в ОАЭ, Golden Visa, регистрация компании, открытие банковского счёта. Индивидуальные мандаты — по запросу.",
        bcHome: "Главная",
        bcPricing: "Стоимость услуг",
        eyebrow: "Стоимость",
        h1: "Стоимость услуг",
        lead:
          "Публичные фиксированные цены на наши продуктизированные услуги. Комплексные консультационные мандаты — банковские мандаты, структурирование — оцениваются индивидуально по каждому проекту.",
        feeNote:
          "Указанные цены покрывают профессиональную работу WTP. Государственные пошлины ОАЭ, судебные, нотариальные, фризонные и банковские сборы оплачиваются отдельно по себестоимости и подтверждаются по вашему делу до старта.",
        guaranteeNote:
          "Мы оказываем сопровождение и обработку, а не гарантированный результат: одобрения банков, решения судов и выдача виз — на усмотрение соответствующих органов.",
        bespokeTitle: "Индивидуальные мандаты",
        bespokeBody:
          "Банковские мандаты, структурирование капитала и полный бэк-офис оцениваются по объёму — начните с пре-скрининга, и мы дадим точную смету.",
        cta: "Записаться на пре-скрининг",
        legalNote: "Порядок возврата — см.",
        refund: "Политику возврата",
        terms: "Условия использования",
        tagFixed: "фикс",
        tagFrom: "от",
        tagSeparate: "отдельный трек",
      }
    : {
        seoTitle: "Service pricing — WTP",
        seoDesc:
          "Published fees for WTP's productized services: UAE will registration, Golden Visa processing, company formation, and UAE bank account opening. Bespoke mandates quoted per engagement.",
        bcHome: "Home",
        bcPricing: "Service pricing",
        eyebrow: "Fees",
        h1: "Service pricing",
        lead:
          "Published fixed fees for our productized services. Full advisory mandates — banking mandates, wealth structuring — are scoped and quoted per engagement.",
        feeNote:
          "Fees shown cover WTP's professional work. UAE government, court, notary, free-zone and bank charges are billed separately at cost and confirmed for your case before you commit.",
        guaranteeNote:
          "We provide assistance and processing, not a guaranteed result: bank approvals, court decisions and visa issuance are at the discretion of the relevant authorities.",
        bespokeTitle: "Bespoke mandates",
        bespokeBody:
          "Banking mandates, wealth structuring and full back-office work are scoped to the engagement — start with a pre-screen and we'll give you an exact quote.",
        cta: "Request a pre-screen",
        legalNote: "For refunds, see our",
        refund: "Refund Policy",
        terms: "Terms of Service",
        tagFixed: "fixed",
        tagFrom: "from",
        tagSeparate: "separate track",
      };

  const items: Item[] = ru
    ? [
        { name: "Регистрация завещания в ОАЭ", price: "AED 10,000", tag: t.tagFixed, desc: "Драфт завещания → верификация в суде и у нотариуса. Удалённо, без вашего присутствия в ОАЭ." },
        { name: "Оформление Golden Visa", price: "AED 18,000", tag: t.tagFixed, desc: "Дактилоскопия, медосмотр, сбор документов — полное сопровождение подачи заявки на Golden Visa. Выдача — на усмотрение госоргана." },
        { name: "Регистрация компании", price: "AED 18,000", tag: t.tagFrom, desc: "Скоуп-опрос, подготовка документов, подача в зону. Итоговая цена зависит от юрисдикции и лицензии." },
        { name: "Открытие банковского счёта", price: "$8,000–10,000", tag: t.tagSeparate, desc: "Сопровождение открытия счёта в ОАЭ, включая знакомство с персональным менеджером банка, если банк его предоставляет. Отдельный трек от регистрации компании." },
      ]
    : [
        { name: "UAE will registration", price: "AED 10,000", tag: t.tagFixed, desc: "Will drafted → verified with the court and notary. Handled remotely, without you being in the UAE." },
        { name: "Golden Visa processing", price: "AED 18,000", tag: t.tagFixed, desc: "Biometrics, medical, document collection — full processing support toward your Golden Visa application. Issuance is at the authority's discretion." },
        { name: "Company formation", price: "AED 18,000", tag: t.tagFrom, desc: "Scoping, document preparation, filing with the zone. Final fee depends on the jurisdiction and licence." },
        { name: "UAE bank account opening", price: "$8,000–10,000", tag: t.tagSeparate, desc: "Account-opening support in the UAE, including an introduction to a relationship manager at the bank where one is offered. A separate track from company formation." },
      ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "WTP service pricing",
    itemListElement: [
      { "@type": "Offer", name: "UAE will registration", price: "10000", priceCurrency: "AED" },
      { "@type": "Offer", name: "Golden Visa processing", price: "18000", priceCurrency: "AED" },
      { "@type": "Offer", name: "Company formation", priceCurrency: "AED", priceSpecification: { "@type": "PriceSpecification", minPrice: "18000", priceCurrency: "AED" } },
      { "@type": "Offer", name: "UAE bank account opening", priceCurrency: "USD", priceSpecification: { "@type": "PriceSpecification", minPrice: "8000", maxPrice: "10000", priceCurrency: "USD" } },
    ],
  };

  return (
    <>
      <Seo title={t.seoTitle} description={t.seoDesc} canonical="/pricing" jsonLd={jsonLd} />
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: t.bcHome, href: "/" }, { label: t.bcPricing }]} />
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>{t.h1}</h1>
        <p className="lead" style={{ maxWidth: 720 }}>{t.lead}</p>
      </Section>

      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }} className="grid-2">
          {items.map((it) => (
            <div key={it.name} className="card" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19 }}>{it.name}</div>
                <Chip>{it.tag}</Chip>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 30, color: "var(--gold)" }}>{it.price}</div>
              <p style={{ fontSize: 14.5, color: "var(--ink-70)", lineHeight: 1.55, margin: 0 }}>{it.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ fontSize: 13.5, color: "var(--ink-55)", lineHeight: 1.55, margin: 0 }}>{t.feeNote}</p>
          <p style={{ fontSize: 13.5, color: "var(--ink-55)", lineHeight: 1.55, margin: 0 }}>{t.guaranteeNote}</p>
        </div>
      </Section>

      <Section>
        <div className="card" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 14 }}>
          <Eyebrow>{t.bespokeTitle}</Eyebrow>
          <p style={{ fontSize: 15.5, color: "var(--ink-70)", lineHeight: 1.6, margin: 0, maxWidth: 680 }}>{t.bespokeBody}</p>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", marginTop: 4 }}>
            <Button to="/contact">{t.cta}</Button>
            <span style={{ fontSize: 13, color: "var(--ink-40)" }}>
              {t.legalNote}{" "}
              <Link to="/legal/refund-policy" style={{ color: "var(--gold)" }}>{t.refund}</Link>
              {" · "}
              <Link to="/legal/terms" style={{ color: "var(--gold)" }}>{t.terms}</Link>
            </span>
          </div>
        </div>
      </Section>
    </>
  );
}
