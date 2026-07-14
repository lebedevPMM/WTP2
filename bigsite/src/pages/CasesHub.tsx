import { useState } from "react";
import { useLang } from "../i18n/lang";
import { Section, Eyebrow } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { Seo } from "../components/Seo";
import { StatBar } from "../components/StatBar";
import { CaseCard } from "../components/CaseCard";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { useContent } from "../content/i18n";

type Filter = "all" | "banking" | "business-setup" | "residency-visa" | "assets-wealth";

export default function CasesHub() {
  const c = useContent();
  const lang = useLang();
  const [active, setActive] = useState<Filter>("all");

  const t = lang === "ru"
    ? {
        seoTitle: "Кейсы и результаты — WTP",
        seoDescription:
          "Реальные анонимизированные мандаты WTP — ситуация, ограничение, действие, результат. За каждым стоит конкретный эксперт, который отвечает за результат.",
        crumbHome: "Главная",
        crumbCases: "Кейсы и результаты",
        eyebrowProof: "Доказательства",
        h1a: "Закрытые ",
        h1b: "мандаты",
        lead:
          "Реальные проекты — по схеме ситуация → ограничение → действие → результат. За каждым стоит конкретный эксперт, который отвечает за результат, — а не безликий отдел.",
        muted:
          "Реальные мандаты WTP, анонимизированы — без имён клиентов. Цифры (сроки, банки) взяты из самих проектов.",
        filterAll: "Все",
        filterBanking: "Банкинг и капитал",
        filterBusiness: "Регистрация бизнеса",
        filterResidency: "Резидентство и мобильность",
        filterAssets: "Структурирование капитала",
        emptyState:
          "В этом направлении мандатов пока нет — запишитесь на пре-скрининг, и ваш может стать первым.",
        // ВЫЧИТКА ОЛЕ: банковская статистика успеха — доля взятых в работу дел, доходящих до рабочего счёта
        stat1Label: "проектов, которые мы берём в работу, доходят до рабочего счёта",
        // ВЫЧИТКА ОЛЕ: количественный track-record — «100+ HNWI выполненных мандатов»
        stat2Label: "выполненных мандатов",
      }
    : {
        seoTitle: "Cases & results — WTP",
        seoDescription:
          "Real, anonymized WTP mandates — situation, constraint, action, outcome. Each one led by a named expert who owns the result.",
        crumbHome: "Home",
        crumbCases: "Cases & Results",
        eyebrowProof: "Proof",
        h1a: "Closed ",
        h1b: "mandates",
        lead:
          "Real engagements, told as situation → constraint → action → outcome. Each one is led by a named expert who owns the result — not a faceless desk.",
        muted:
          "Real WTP mandates, anonymized — no client names. Figures (timelines, banks) are from the engagements themselves.",
        filterAll: "All",
        filterBanking: "Banking & Capital",
        filterBusiness: "Business Setup",
        filterResidency: "Residency & Mobility",
        filterAssets: "Wealth Structuring",
        emptyState:
          "No mandates in this line yet — request a pre-screen and yours could be the first.",
        stat1Label: "of the cases we take on reach a working account",
        stat2Label: "mandates delivered",
      };

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t.filterAll },
    { id: "banking", label: t.filterBanking },
    { id: "business-setup", label: t.filterBusiness },
    { id: "residency-visa", label: t.filterResidency },
    { id: "assets-wealth", label: t.filterAssets },
  ];

  const shown =
    active === "all" ? c.cases : c.cases.filter((c) => c.services.includes(active));

  return (
    <>
      <Seo
        title={t.seoTitle}
        description={t.seoDescription}
        canonical="/cases"
      />
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: t.crumbHome, href: "/" }, { label: t.crumbCases }]} />
        <Eyebrow>{t.eyebrowProof}</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          {t.h1a}<span className="g">{t.h1b}</span>
        </h1>
        <p className="lead">
          {t.lead}
        </p>
        <p className="muted" style={{ fontSize: 14, marginTop: 16, maxWidth: 720 }}>
          {t.muted}
        </p>
      </Section>

      {/* Filterable case grid */}
      <Section>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
          {filters.map((f) => {
            const on = active === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(f.id)}
                className="chip"
                style={{
                  padding: "10px 18px",
                  fontSize: 14,
                  cursor: "pointer",
                  ...(on
                    ? {
                        border: "1px solid var(--gold)",
                        background: "rgba(227,181,100,0.12)",
                        color: "var(--gold)",
                      }
                    : {}),
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {shown.length > 0 ? (
          <div className="grid-3">
            {shown.map((c) => (
              <CaseCard key={c.slug} case={c} />
            ))}
          </div>
        ) : (
          <p className="muted" style={{ fontSize: 16 }}>
            {t.emptyState}
          </p>
        )}
      </Section>

      {/* Honest aggregate stats — provenance on every number (SPEC law #5). Confirmed figures. */}
      <Section>
        <StatBar
          stats={[
            {
              value: "90%+",
              label: t.stat1Label,
              source: "WTP pre-screen data",
            },
            { value: "100+ HNWI", label: t.stat2Label, source: "WTP client base" },
          ]}
        />
      </Section>

      <PreScreenCTABlock expert="olya" />
    </>
  );
}
