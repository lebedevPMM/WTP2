import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import ServiceTemplate from "./templates/ServiceTemplate";
import ProductTemplate from "./templates/ProductTemplate";
import CaseTemplate from "./templates/CaseTemplate";
import ArticleTemplate from "./templates/ArticleTemplate";
import JurisdictionComparator from "./templates/JurisdictionComparator";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";
import Legal from "./pages/Legal";
import Team from "./pages/Team";
import NotFound from "./pages/NotFound";
import BankingFirst from "./pages/BankingFirst";
import PreScreen from "./pages/PreScreen";
import ServicesOverview from "./pages/ServicesOverview";
import PackagesPage from "./pages/PackagesPage";
import JurisdictionsHub from "./pages/JurisdictionsHub";
import UAE from "./pages/UAE";
import CasesHub from "./pages/CasesHub";
import InsightsHub from "./pages/InsightsHub";
import InsightsCategory from "./pages/InsightsCategory";
import About from "./pages/About";
import Partners from "./pages/Partners";
import VariantsIndex from "./variants/VariantsIndex";
import V1Page from "./variants/v1/V1Page";
import V2Page from "./variants/v2/V2Page";
import V3Page from "./variants/v3/V3Page";
import { themed } from "./theme/ThemedRoute";
import V1Home from "./themed/v1/V1Home";
import V1BankingFirst from "./themed/v1/V1BankingFirst";
import V1ServicesOverview from "./themed/v1/V1ServicesOverview";
import V1Service from "./themed/v1/V1Service";
import V1Contact from "./themed/v1/V1Contact";
import V2Home from "./themed/v2/V2Home";
import V2BankingFirst from "./themed/v2/V2BankingFirst";
import V2ServicesOverview from "./themed/v2/V2ServicesOverview";
import V2Service from "./themed/v2/V2Service";
import V2Contact from "./themed/v2/V2Contact";

// Radical per-theme page redesigns: under theme v1/v2 these routes render
// structurally different implementations; base look is unchanged.
const ThemedHome = themed(Home, { v1: V1Home, v2: V2Home });
const ThemedBankingFirst = themed(BankingFirst, { v1: V1BankingFirst, v2: V2BankingFirst });
const ThemedServicesOverview = themed(ServicesOverview, { v1: V1ServicesOverview, v2: V2ServicesOverview });
const ThemedService = themed(ServiceTemplate, { v1: V1Service, v2: V2Service });
const ThemedContact = themed(Contact, { v1: V1Contact, v2: V2Contact });

export default function App() {
  return (
    <Routes>
      {/* Design-round variants — standalone, outside Layout (own nav/footer) */}
      <Route path="/variants" element={<VariantsIndex />} />
      <Route path="/v1" element={<V1Page />} />
      <Route path="/v2" element={<V2Page />} />
      <Route path="/v3" element={<V3Page />} />
      <Route element={<Layout />}>
        <Route path="/" element={<ThemedHome />} />
        <Route path="/banking-first" element={<ThemedBankingFirst />} />
        <Route path="/banking-first/pre-screen" element={<PreScreen />} />
        <Route path="/services" element={<ThemedServicesOverview />} />
        <Route path="/services/:line" element={<ThemedService />} />
        <Route path="/services/:line/:product" element={<ProductTemplate />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/jurisdictions" element={<JurisdictionsHub />} />
        <Route path="/jurisdictions/uae" element={<UAE />} />
        <Route path="/jurisdictions/:slug" element={<JurisdictionComparator />} />
        <Route path="/cases" element={<CasesHub />} />
        <Route path="/cases/:slug" element={<CaseTemplate />} />
        <Route path="/insights" element={<InsightsHub />} />
        <Route path="/insights/:category" element={<InsightsCategory />} />
        <Route path="/insights/:category/:slug" element={<ArticleTemplate />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/team" element={<Team />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/contact" element={<ThemedContact />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/legal/:doc" element={<Legal />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
