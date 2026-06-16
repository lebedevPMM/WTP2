import { Section, Eyebrow } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { ExpertBioCard } from "../components/ExpertBioCard";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { expertList } from "../content/experts";

export default function Team() {
  return (
    <>
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Team & Experts" }]} />
        <Eyebrow>Real people, named, accountable</Eyebrow>
        <h1 className="h-grad">The experts behind every mandate</h1>
        <p className="lead">No anonymous "our team." Each line of work has a named expert who signs off and runs your pre-screen.</p>
      </Section>

      <Section>
        <div className="grid-3">
          {expertList.map((e) => (
            <ExpertBioCard key={e.id} expert={e} />
          ))}
        </div>
      </Section>

      <PreScreenCTABlock />
    </>
  );
}
