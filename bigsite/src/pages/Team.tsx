import { Section, Eyebrow } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { Seo } from "../components/Seo";
import { ExpertBioCard } from "../components/ExpertBioCard";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { useContent } from "../content/i18n";
import { useLang } from "../i18n/lang";

export default function Team() {
  const c = useContent();
  const lang = useLang();
  const t =
    lang === "ru"
      ? {
          seoTitle: "Команда и эксперты — WTP",
          seoDesc:
            "Конкретные эксперты за каждым мандатом WTP — банкинг, структуры, резидентство и активы: каждое направление подписывает тот, кто за него отвечает.",
          bcHome: "Главная",
          bcAbout: "О нас",
          bcTeam: "Команда и эксперты",
          eyebrow: "Реальные люди — с именами и ответственностью",
          h1: "Эксперты за каждым мандатом",
          lead:
            "Никакой анонимной «нашей команды». За каждым направлением стоит конкретный эксперт, который подписывает работу и проводит ваш пре-скрининг.",
        }
      : {
          seoTitle: "Team & experts — WTP",
          seoDesc:
            "The named experts behind every WTP mandate — banking, structures, residency and assets, each signed by the person accountable for it.",
          bcHome: "Home",
          bcAbout: "About",
          bcTeam: "Team & Experts",
          eyebrow: "Real people, named, accountable",
          h1: "The experts behind every mandate",
          lead:
            'No anonymous "our team." Each line of work has a named expert who signs off and runs your pre-screen.',
        };
  return (
    <>
      <Seo
        title={t.seoTitle}
        description={t.seoDesc}
        canonical="/about/team"
      />
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: t.bcHome, href: "/" }, { label: t.bcAbout, href: "/about" }, { label: t.bcTeam }]} />
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1 className="h-grad">{t.h1}</h1>
        <p className="lead">{t.lead}</p>
      </Section>

      <Section>
        <div className="grid-3">
          {c.expertList.map((e) => (
            <ExpertBioCard key={e.id} expert={e} />
          ))}
        </div>
      </Section>

      <PreScreenCTABlock />
    </>
  );
}
