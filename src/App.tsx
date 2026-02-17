import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import ProcessPage from './pages/ProcessPage'
import ProductPage from './pages/ProductPage'
import PartnersPage from './pages/PartnersPage'
import RiskPage from './pages/RiskPage'
import ContactPage from './pages/ContactPage'
import SubmitCasePage from './pages/SubmitCasePage'
import EngagementPage from './pages/EngagementPage'
import PartnerKitPage from './pages/PartnerKitPage'
import UpdatesPage from './pages/UpdatesPage'
import TermsPage from './pages/TermsPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<LandingPage />} />

                {/* Dynamic Routes */}
                <Route path="privacy" element={<PrivacyPolicyPage />} />
                <Route path="process/terms" element={<TermsPage />} />
                <Route path="process/:slug" element={<ProcessPage />} />
                <Route path="products/:slug" element={<ProductPage />} />

                {/* Static / Placeholder Pages */}
                {/* Note: process, partners, risk are now valid anchors on home, but keeping routes as fallbacks or for direct link capability if needed, though Navbar uses anchors now. */}
                <Route path="process" element={<ProcessPage />} />
                <Route path="partners" element={<PartnersPage />} />
                <Route path="risk" element={<RiskPage />} />
                <Route path="contact" element={<ContactPage />} />

                <Route path="partner-kit" element={<PartnerKitPage />} />
                <Route path="submit-case" element={<SubmitCasePage />} />
                <Route path="engagement" element={<EngagementPage />} />
                <Route path="updates" element={<UpdatesPage />} />
            </Route>
        </Routes>
    )
}

export default App
