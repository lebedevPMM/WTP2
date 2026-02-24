import { lazy, Suspense, type ReactNode } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { LANDING_ID } from './config/landing'

// Shared pages (always included in every landing)
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'))
const SubmitCasePage = lazy(() => import('./pages/SubmitCasePage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

// Landing-specific imports — only loaded for the matching VITE_LANDING.
// Vite replaces LANDING_ID at build time, dead branches are tree-shaken.
const MainPages = LANDING_ID === 'main' ? {
    LandingPage: lazy(() => import('./pages/LandingPage')),
    ProcessPage: lazy(() => import('./pages/ProcessPage')),
    ProductPage: lazy(() => import('./pages/ProductPage')),
    PartnersPage: lazy(() => import('./pages/PartnersPage')),
    RiskPage: lazy(() => import('./pages/RiskPage')),
    EngagementPage: lazy(() => import('./pages/EngagementPage')),
    PartnerKitPage: lazy(() => import('./pages/PartnerKitPage')),
    UpdatesPage: lazy(() => import('./pages/UpdatesPage')),
    TermsPage: lazy(() => import('./pages/TermsPage')),
} : null

const BankingPage = LANDING_ID === 'banking'
    ? lazy(() => import('./pages/BankingFirstLandingPage')) : null

const RealEstatePage = LANDING_ID === 'realestate'
    ? lazy(() => import('./pages/PostDealLandingPage')) : null

const PartnersLandingPage = LANDING_ID === 'partners'
    ? lazy(() => import('./pages/MonetizationLandingPage')) : null

// Shared loading fallback for lazy-loaded pages
const PageFallback = (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        Loading...
    </div>
)

// Wraps a lazy component in Suspense with the shared fallback
function Lazy({ children }: { children: ReactNode }) {
    return <Suspense fallback={PageFallback}>{children}</Suspense>
}

function MainRoutes() {
    if (!MainPages) return null
    const P = MainPages
    return (
        <>
            <Route index element={<Lazy><P.LandingPage /></Lazy>} />
            <Route path="process/terms" element={<Lazy><P.TermsPage /></Lazy>} />
            <Route path="process/:slug" element={<Lazy><P.ProcessPage /></Lazy>} />
            <Route path="process" element={<Lazy><P.ProcessPage /></Lazy>} />
            <Route path="products/:slug" element={<Lazy><P.ProductPage /></Lazy>} />
            <Route path="partners" element={<Lazy><P.PartnersPage /></Lazy>} />
            <Route path="risk" element={<Lazy><P.RiskPage /></Lazy>} />
            <Route path="partner-kit" element={<Lazy><P.PartnerKitPage /></Lazy>} />
            <Route path="engagement" element={<Lazy><P.EngagementPage /></Lazy>} />
            <Route path="updates" element={<Lazy><P.UpdatesPage /></Lazy>} />
        </>
    )
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Landing-specific index route */}
                {LANDING_ID === 'main' && MainRoutes()}
                {BankingPage && <Route index element={<Lazy><BankingPage /></Lazy>} />}
                {RealEstatePage && <Route index element={<Lazy><RealEstatePage /></Lazy>} />}
                {PartnersLandingPage && <Route index element={<Lazy><PartnersLandingPage /></Lazy>} />}

                {/* Shared routes (all landings) */}
                <Route path="privacy" element={<Lazy><PrivacyPolicyPage /></Lazy>} />
                <Route path="terms-of-service" element={<Lazy><TermsOfServicePage /></Lazy>} />
                <Route path="submit-case" element={<Lazy><SubmitCasePage /></Lazy>} />
                <Route path="contact" element={<Lazy><ContactPage /></Lazy>} />
            </Route>
        </Routes>
    )
}

export default App
