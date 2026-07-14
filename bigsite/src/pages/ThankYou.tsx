import { Section, Eyebrow, Button } from "../components/ui";
import { ArticleCard } from "../components/ArticleCard";
import { Seo } from "../components/Seo";
import { useContent } from "../content/i18n";
import { useLang } from "../i18n/lang";

export default function ThankYou() {
  const c = useContent();
  const lang = useLang();
  const t = lang === "ru"
    ? {
        seoTitle: "Заявка на пре-скрининг получена — WTP",
        seoDesc: "Мы получили вашу заявку. Конкретный эксперт WTP изучит вашу ситуацию и ответит в течение одного рабочего дня.",
        eyebrow: "Заявка на пре-скрининг получена",
        h1: "Спасибо — заявка у нас.",
        lead: "Конкретный эксперт изучит вашу ситуацию и в течение одного рабочего дня вернётся с дальнейшими шагами.",
        cta: "А пока почитайте аналитику",
        eyebrow2: "Пока вы ждёте",
      }
    : {
        seoTitle: "Pre-screen received — WTP",
        seoDesc: "We've received your request. A named WTP expert will review your situation and reply within one business day.",
        eyebrow: "Pre-screen received",
        h1: "Thank you — we've got it.",
        lead: "A named expert will review your situation and reply within one business day with next steps.",
        cta: "Read an insight meanwhile",
        eyebrow2: "While you wait",
      };
  return (
    <>
      <Seo
        title={t.seoTitle}
        description={t.seoDesc}
        canonical="/thank-you"
      />
      <Section className="page-hero" style={{ textAlign: "center", paddingTop: 130 }}>
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1 className="h-grad" style={{ margin: "18px 0" }}>{t.h1}</h1>
        <p className="lead" style={{ margin: "0 auto" }}>
          {t.lead}
        </p>
        <div style={{ marginTop: 28 }}>
          <Button to="/insights" ghost>{t.cta}</Button>
        </div>
      </Section>

      <Section>
        <Eyebrow>{t.eyebrow2}</Eyebrow>
        <div className="grid-3" style={{ marginTop: 24 }}>
          {c.latestArticles(3).map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </Section>
    </>
  );
}
