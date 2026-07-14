import { L as Link } from "../i18n/lang";
import { useLang } from "../i18n/lang";
import { LangSwitch } from "../i18n/LangSwitch";
import { Button } from "./ui";
import { openConsentSettings } from "./ConsentBanner";
import { useContent } from "../content/i18n";
import { site } from "../lib/site";
import { TRACKERS_CONFIGURED } from "../lib/analytics";

type Col = { title: string; links: { label: string; href: string }[] };

// Footer nav — hrefs identical across languages; labels localized. Voice per src/i18n/GLOSSARY.md.
const COLS_EN: Col[] = [
  {
    title: "Services",
    links: [
      { label: "Banking & Capital", href: "/services/banking" },
      { label: "Business Setup", href: "/services/business-setup" },
      { label: "Residency & Mobility", href: "/services/residency-visa" },
      { label: "Wealth Structuring", href: "/services/assets-wealth" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Banking-First Methodology", href: "/banking-first" },
      { label: "Jurisdictions", href: "/jurisdictions" },
      { label: "Insights / Guides", href: "/insights" },
      { label: "Cases & Results", href: "/cases" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team & Experts", href: "/about/team" },
      { label: "For partners", href: "/partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const COLS_RU: Col[] = [
  {
    title: "Услуги",
    links: [
      { label: "Банкинг и капитал", href: "/services/banking" },
      { label: "Компания и бизнес", href: "/services/business-setup" },
      { label: "Резидентство и мобильность", href: "/services/residency-visa" },
      { label: "Структурирование капитала", href: "/services/assets-wealth" },
    ],
  },
  {
    title: "Разделы",
    links: [
      { label: "Методология Banking-First", href: "/banking-first" },
      { label: "Юрисдикции", href: "/jurisdictions" },
      { label: "Аналитика / гайды", href: "/insights" },
      { label: "Кейсы и результаты", href: "/cases" },
    ],
  },
  {
    title: "Компания",
    links: [
      { label: "О нас", href: "/about" },
      { label: "Команда и эксперты", href: "/about/team" },
      { label: "Партнёрам", href: "/partners" },
      { label: "Контакты", href: "/contact" },
    ],
  },
];

export function Footer() {
  const c = useContent();
  const lang = useLang();
  const ru = lang === "ru";
  const cols = ru ? COLS_RU : COLS_EN;
  const t = ru
    ? {
        experts: "Эксперты",
        getStarted: "С чего начать",
        preScreen: "Записаться на пре-скрининг",
        tagline: "Banking-first бэк-офис для частного капитала. Мы даём банкабельные структуры, а не регистрацию компаний.",
        privacy: "Конфиденциальность",
        terms: "Условия",
        cookies: "Cookies",
        cookieSettings: "Настройки cookies",
        disclaimer: "Дисклеймер",
        regulatory: "Регулирование",
        // ВЫЧИТКА ОЛЕ: facilitation / regulatory framing — legal-sensitive, confirm wording before prod
        legalNote:
          "WTP оказывает консультационные и фасилитационные услуги; это не регулируемые инвестиционные, налоговые или юридические консультации, если прямо не указано иное.",
      }
    : {
        experts: "Experts",
        getStarted: "Get started",
        preScreen: "Request a pre-screen",
        tagline: "Banking-first back office for private wealth. We deliver bankable structures, not company setups.",
        privacy: "Privacy",
        terms: "Terms",
        cookies: "Cookies",
        cookieSettings: "Cookie settings",
        disclaimer: "Disclaimer",
        regulatory: "Regulatory",
        legalNote:
          "WTP provides advisory and facilitation services; not regulated investment, tax, or legal advice unless explicitly stated.",
      };

  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "var(--deep-2)", paddingTop: 64 }}>
      <div className="wrap">
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 32, paddingBottom: 48 }}>
          {cols.map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: 16, fontWeight: 700 }}>
                {col.title}
              </div>
              {col.links.map((l) => (
                <Link key={l.href} to={l.href} style={{ display: "block", marginBottom: 11, fontSize: 14, color: "var(--ink-70)" }}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}

          <div>
            <div style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: 16, fontWeight: 700 }}>
              {t.experts}
            </div>
            {c.expertList.map((e) => (
              <Link key={e.id} to="/about/team" style={{ display: "block", marginBottom: 11, fontSize: 14, color: "var(--ink-70)" }}>
                {e.name} — {e.title}
              </Link>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: 16, fontWeight: 700 }}>
              {t.getStarted}
            </div>
            <Link to="/contact" style={{ display: "block", marginBottom: 11, fontSize: 14, color: "var(--gold)", fontWeight: 600 }}>
              {t.preScreen}
            </Link>
            <a href={`mailto:${site.email}`} style={{ display: "block", marginBottom: 11, fontSize: 14, color: "var(--ink-70)" }}>{site.email}</a>
            <a href={site.phoneHref} style={{ display: "block", marginBottom: 11, fontSize: 14, color: "var(--ink-70)" }}>{site.phone}</a>
            <div style={{ display: "flex", gap: 14, marginBottom: 11 }}>
              <a href={site.telegram} target="_blank" rel="noreferrer" style={{ fontSize: 14, color: "var(--ink-70)" }}>Telegram</a>
              <a href={site.whatsapp} target="_blank" rel="noreferrer" style={{ fontSize: 14, color: "var(--ink-70)" }}>WhatsApp</a>
            </div>
            <div style={{ fontSize: 13.5, color: "var(--ink-55)" }}>{site.office}</div>
          </div>
        </div>

        <div className="footer-cta" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, padding: "28px 0", borderTop: "1px solid var(--line)" }}>
          <div>
            <img src="/logo-white.svg" alt="WTP" style={{ height: 40, marginBottom: 12, display: "block" }} />
            <p style={{ fontSize: 13.5, color: "var(--ink-55)", maxWidth: 380 }}>
              {t.tagline}
            </p>
          </div>
          <Button to="/contact">{t.preScreen}</Button>
        </div>

        <div style={{ padding: "22px 0 14px", borderTop: "1px solid var(--line)", display: "flex", flexWrap: "wrap", gap: "10px 22px", alignItems: "center", fontSize: 12.5, color: "var(--ink-40)" }}>
          <span>© {new Date().getFullYear()} WTP</span>
          <Link to="/legal/privacy">{t.privacy}</Link>
          <Link to="/legal/terms">{t.terms}</Link>
          <Link to="/legal/cookies">{t.cookies}</Link>
          {/* Consent withdrawal (Cookie Policy promise) — hidden while no tracker IDs are configured */}
          {TRACKERS_CONFIGURED && (
            <button
              type="button"
              onClick={openConsentSettings}
              style={{ background: "none", border: 0, padding: 0, font: "inherit", color: "inherit", cursor: "pointer" }}
            >
              {t.cookieSettings}
            </button>
          )}
          <Link to="/legal/disclaimer">{t.disclaimer}</Link>
          <Link to="/legal/regulatory">{t.regulatory}</Link>
          <span style={{ maxWidth: 620, lineHeight: 1.5 }}>
            {t.legalNote}
          </span>
          <LangSwitch style={{ marginLeft: "auto" }} />
        </div>

        {/* ВЫЧИТКА ОЛЕ: legal entity + licence identity — kept verbatim (entity names/licence/ORN/address are legal identifiers, not translated) */}
        <div style={{ padding: "0 0 38px", fontSize: 11, color: "var(--ink-40)", lineHeight: 1.6, maxWidth: 820 }}>
          {ru ? (
            <>
              WTP — бренд компаний ILEGAL CONSULTANCY CO. L.L.C (управленческий консалтинг · лицензия 1162594) и Wellcome to
              Paradise Real Estate Brokers L.L.C (ORN 35551 · лицензия 1181286) — Dubai Media City, Arenco Tower, Office 1207.
            </>
          ) : (
            <>
              WTP is a brand of ILEGAL CONSULTANCY CO. L.L.C (management consultancy · licence 1162594) and Wellcome to
              Paradise Real Estate Brokers L.L.C (ORN 35551 · licence 1181286) — Dubai Media City, Arenco Tower, Office 1207.
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
