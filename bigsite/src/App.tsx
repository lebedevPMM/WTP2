import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home"; // eager: it's the LCP-critical landing route
import { themed } from "./theme/ThemedRoute";
import { LangProvider } from "./i18n/lang";

// Every non-home route is code-split. The themed v1/v2 redesigns and the /v* design-round
// pages are dev-gate only (unreachable under the promoted v3 theme), so lazy() removes
// them from the initial bundle entirely; router navigations use startTransition, which
// keeps the current page on screen while a chunk loads (fallback effectively never shows).
const ServiceTemplate = lazy(() => import("./templates/ServiceTemplate"));
const ProductTemplate = lazy(() => import("./templates/ProductTemplate"));
const CaseTemplate = lazy(() => import("./templates/CaseTemplate"));
const ArticleTemplate = lazy(() => import("./templates/ArticleTemplate"));
const JurisdictionComparator = lazy(() => import("./templates/JurisdictionComparator"));
const Contact = lazy(() => import("./pages/Contact"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const Legal = lazy(() => import("./pages/Legal"));
const Team = lazy(() => import("./pages/Team"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BankingFirst = lazy(() => import("./pages/BankingFirst"));
const PreScreen = lazy(() => import("./pages/PreScreen"));
const ServicesOverview = lazy(() => import("./pages/ServicesOverview"));
const PackagesPage = lazy(() => import("./pages/PackagesPage"));
const JurisdictionsHub = lazy(() => import("./pages/JurisdictionsHub"));
const UAE = lazy(() => import("./pages/UAE"));
const CasesHub = lazy(() => import("./pages/CasesHub"));
const InsightsHub = lazy(() => import("./pages/InsightsHub"));
const InsightsCategory = lazy(() => import("./pages/InsightsCategory"));
const About = lazy(() => import("./pages/About"));
const Partners = lazy(() => import("./pages/Partners"));
const VariantsIndex = lazy(() => import("./variants/VariantsIndex"));
const V1Page = lazy(() => import("./variants/v1/V1Page"));
const V2Page = lazy(() => import("./variants/v2/V2Page"));
const V3Page = lazy(() => import("./variants/v3/V3Page"));
const V1Home = lazy(() => import("./themed/v1/V1Home"));
const V1BankingFirst = lazy(() => import("./themed/v1/V1BankingFirst"));
const V1ServicesOverview = lazy(() => import("./themed/v1/V1ServicesOverview"));
const V1Service = lazy(() => import("./themed/v1/V1Service"));
const V1Contact = lazy(() => import("./themed/v1/V1Contact"));
const V2Home = lazy(() => import("./themed/v2/V2Home"));
const V2BankingFirst = lazy(() => import("./themed/v2/V2BankingFirst"));
const V2ServicesOverview = lazy(() => import("./themed/v2/V2ServicesOverview"));
const V2Service = lazy(() => import("./themed/v2/V2Service"));
const V2Contact = lazy(() => import("./themed/v2/V2Contact"));

// Radical per-theme page redesigns: under theme v1/v2 these routes render
// structurally different implementations; base look is unchanged.
const ThemedHome = themed(Home, { v1: V1Home, v2: V2Home });
const ThemedBankingFirst = themed(BankingFirst, { v1: V1BankingFirst, v2: V2BankingFirst });
const ThemedServicesOverview = themed(ServicesOverview, { v1: V1ServicesOverview, v2: V2ServicesOverview });
const ThemedService = themed(ServiceTemplate, { v1: V1Service, v2: V2Service });
const ThemedContact = themed(Contact, { v1: V1Contact, v2: V2Contact });

// The full localized route tree, rendered once per language. Child paths are RELATIVE:
// React Router resolves them against the parent splat match ("/" for EN, "/ru" for RU),
// so a single definition serves both languages — no route duplication.
function LocalizedRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ThemedHome />} />
        <Route path="banking-first" element={<ThemedBankingFirst />} />
        <Route path="banking-first/pre-screen" element={<PreScreen />} />
        <Route path="services" element={<ThemedServicesOverview />} />
        <Route path="services/:line" element={<ThemedService />} />
        <Route path="services/:line/:product" element={<ProductTemplate />} />
        <Route path="packages" element={<PackagesPage />} />
        <Route path="jurisdictions" element={<JurisdictionsHub />} />
        <Route path="jurisdictions/uae" element={<UAE />} />
        <Route path="jurisdictions/:slug" element={<JurisdictionComparator />} />
        <Route path="cases" element={<CasesHub />} />
        <Route path="cases/:slug" element={<CaseTemplate />} />
        <Route path="insights" element={<InsightsHub />} />
        <Route path="insights/:category" element={<InsightsCategory />} />
        <Route path="insights/:category/:slug" element={<ArticleTemplate />} />
        <Route path="about" element={<About />} />
        <Route path="about/team" element={<Team />} />
        <Route path="partners" element={<Partners />} />
        <Route path="contact" element={<ThemedContact />} />
        <Route path="thank-you" element={<ThankYou />} />
        <Route path="legal/:doc" element={<Legal />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        {/* Design-round variants — standalone, EN-only, outside i18n + Layout (own nav/footer) */}
        <Route path="/variants" element={<VariantsIndex />} />
        <Route path="/v1" element={<V1Page />} />
        <Route path="/v2" element={<V2Page />} />
        <Route path="/v3" element={<V3Page />} />
        {/* Russian subtree first (more specific), then the English default. Same tree, prefix-scoped. */}
        <Route path="/ru/*" element={<LangProvider lang="ru"><LocalizedRoutes /></LangProvider>} />
        <Route path="/*" element={<LangProvider lang="en"><LocalizedRoutes /></LangProvider>} />
      </Routes>
    </Suspense>
  );
}
