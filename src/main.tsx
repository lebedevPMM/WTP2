import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './lib/LanguageContext'
import App from './App'
import './index.css'

// On subdomains (banking.wtp.ae), routes are at root — basename should be '/'.
// On path-based routing (wtp.ae/banking/), basename stays '/banking/' from BASE_URL.
const landing = import.meta.env.VITE_LANDING || 'main'
const isSubdomain = landing !== 'main' && window.location.hostname.startsWith(`${landing}.`)
// A non-English build is served under a language path even on its own subdomain
// (client.wtp.ae/ru/), so the router has to keep that segment as its basename —
// otherwise every route resolves one level too high and the page 404s on reload.
const buildLang = import.meta.env.VITE_LANG || 'en'
const langPrefix = buildLang === 'en' ? '' : `/${buildLang}`
// Strip trailing slash from BASE_URL so React Router matches both /banking and /banking/
const rawBase = import.meta.env.BASE_URL
const basename = isSubdomain ? langPrefix || '/' : rawBase.replace(/\/+$/, '') || '/'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter basename={basename}>
            <LanguageProvider>
                <App />
            </LanguageProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
