import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './lib/LanguageContext'
import App from './App'
import './index.css'

// On subdomains (banking.wtpref.com), routes are at root — basename should be '/'.
// On path-based routing (wtpref.com/banking/), basename stays '/banking/' from BASE_URL.
const landing = import.meta.env.VITE_LANDING || 'main'
const isSubdomain = landing !== 'main' && window.location.hostname.startsWith(`${landing}.`)
const basename = isSubdomain ? '/' : import.meta.env.BASE_URL

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter basename={basename}>
            <LanguageProvider>
                <App />
            </LanguageProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
