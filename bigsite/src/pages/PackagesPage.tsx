import { L as Link, useLang } from "../i18n/lang";
import { ArrowRight } from "lucide-react";
import { Section, Eyebrow, Button, Chip } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { useContent } from "../content/i18n";
import { Seo } from "../components/Seo";

export default function PackagesPage() {
  const c = useContent();
  const lang = useLang();
  const t =
    lang === "ru"
      ? {
          seoTitle: "Пакеты — WTP",
          seoDescription:
            "Четыре уровня работы — от диагностики вашей ситуации до долгосрочного управления всей структурой. Каждый уровень готовит следующий.",
          breadcrumbHome: "Главная",
          breadcrumbPackages: "Пакеты",
          eyebrowPackages: "Пакеты",
          h1a: "Четыре уровня, ",
          h1b: "один бэк-офис",
          lead:
            "Отдельные продукты складываются в четыре уровня работы — от диагностики вашей ситуации до долгосрочного управления всей структурой. Каждый уровень готовит следующий.",
          ctaPrimary: "Начните с пре-скрининга",
          eyebrowJourney: "Путь",
          h2Ladder: "Консультация → Вход → Настройка → Контроль",
          forWhom: "Для кого",
          includedProducts: "Что входит",
          youWalkAwayWith: "Что вы получаете",
          eyebrowConnect: "Как связаны уровни",
          connectBody:
            "Уровни — это последовательность, а не меню. Большинство клиентов начинают с диагностики, проходят банковский этап, а потом добавляют компанию, активы и управление по мере роста структуры — именно в таком порядке.",
        }
      : {
          seoTitle: "Packages — WTP",
          seoDescription:
            "Four engagement levels — from a diagnostic read of your situation to long-term governance of the whole structure. Each level sets up the next.",
          breadcrumbHome: "Home",
          breadcrumbPackages: "Packages",
          eyebrowPackages: "Packages",
          h1a: "Four levels, ",
          h1b: "one back office",
          lead:
            "Individual products combine into four engagement levels — from a diagnostic read of your situation to long-term governance of the whole structure. Each level sets up the next.",
          ctaPrimary: "Start with a pre-screen",
          eyebrowJourney: "The journey",
          h2Ladder: "Advisory → Entry → Setup → Control",
          forWhom: "For whom",
          includedProducts: "Included products",
          youWalkAwayWith: "You walk away with",
          eyebrowConnect: "How the levels connect",
          connectBody:
            "The levels are a sequence, not a menu. Most clients start with a diagnostic, clear the banking gate, then add company, assets and governance as the structure grows — in that order.",
        };
  return (
    <>
      <Seo
        title={t.seoTitle}
        description={t.seoDescription}
        canonical="/packages"
      />
      {/* Hero */}
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: t.breadcrumbHome, href: "/" }, { label: t.breadcrumbPackages }]} />
        <Eyebrow>{t.eyebrowPackages}</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          {t.h1a}<span className="g">{t.h1b}</span>
        </h1>
        <p className="lead">{t.lead}</p>
        <div style={{ marginTop: 28 }}>
          <Button to="/banking-first/pre-screen" large>{t.ctaPrimary}</Button>
        </div>
      </Section>

      {/* The ladder */}
      <Section>
        <Eyebrow>{t.eyebrowJourney}</Eyebrow>
        <h2 style={{ fontSize: "clamp(24px,3.2vw,36px)", margin: "16px 0 28px" }} className="h-grad">
          {t.h2Ladder}
        </h2>
        <div className="grid-4">
          {c.packages.map((pkg) => (
            <div key={pkg.level} className="card" style={{ padding: 26, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <Chip>{pkg.level}</Chip>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22 }}>{pkg.name}</span>
              </div>
              <p style={{ fontSize: 15.5, color: "var(--ink)", fontFamily: "var(--font-display)", fontWeight: 600, lineHeight: 1.45, marginBottom: 16 }}>
                {pkg.tagline}
              </p>

              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--ink-55)", marginBottom: 6 }}>{t.forWhom}</div>
                <p style={{ fontSize: 14, color: "var(--ink-70)", lineHeight: 1.55 }}>{pkg.forWhom}</p>
              </div>

              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--ink-55)", marginBottom: 8 }}>{t.includedProducts}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {pkg.includedProducts.map((slug) => {
                    const prod = c.getProduct(slug);
                    if (!prod) return null;
                    return (
                      <Link key={slug} to={prod.href} className="chip" style={{ fontSize: 13 }}>
                        {prod.displayName}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {pkg.alsoIncludes.length > 0 && (
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
                  {pkg.alsoIncludes.map((a, i) => (
                    <li key={i} style={{ fontSize: 13.5, color: "var(--ink-55)", padding: "4px 0", display: "flex", gap: 8 }}>
                      <span style={{ color: "var(--gold)" }}>+</span> {a}
                    </li>
                  ))}
                </ul>
              )}

              <div style={{ marginTop: "auto", paddingTop: 14, borderTop: "1px solid var(--line)" }}>
                <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--ink-55)", marginBottom: 8 }}>{t.youWalkAwayWith}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {pkg.results.map((r, i) => (
                    <li key={i} style={{ fontSize: 13.5, color: "var(--ink-70)", padding: "5px 0", display: "flex", gap: 8 }}>
                      <span style={{ color: "var(--gold)" }}>✓</span> {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* How they connect */}
      <Section>
        <div style={{ padding: "40px", borderRadius: 20, background: "var(--deep-2)", border: "1px solid var(--line)" }}>
          <Eyebrow>{t.eyebrowConnect}</Eyebrow>
          <p className="muted" style={{ fontSize: 17, maxWidth: 640, marginTop: 14 }}>{t.connectBody}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22, alignItems: "center" }}>
            {c.packages.map((pkg, i) => (
              <span key={pkg.level} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                <span className="chip" style={{ padding: "8px 16px" }}>{pkg.level} · {pkg.name}</span>
                {i < c.packages.length - 1 && <ArrowRight size={16} style={{ color: "var(--gold)" }} />}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <PreScreenCTABlock expert="olya" />
    </>
  );
}
