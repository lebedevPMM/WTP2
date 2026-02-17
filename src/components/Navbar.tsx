import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { useLanguage } from '../lib/LanguageContext'

const Navbar: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const isHome = location.pathname === '/'
    const { lang, setLang, t } = useLanguage()
    const [menuOpen, setMenuOpen] = useState(false)

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false)
    }, [location.pathname])

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
        e.preventDefault()
        setMenuOpen(false)

        if (isHome) {
            const el = document.getElementById(anchor)
            if (el) {
                const offset = 80
                const bodyRect = document.body.getBoundingClientRect().top
                const elementRect = el.getBoundingClientRect().top
                const elementPosition = elementRect - bodyRect
                const offsetPosition = elementPosition - offset

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                })
            }
        } else {
            navigate('/')
            setTimeout(() => {
                const el = document.getElementById(anchor)
                if (el) {
                    const offset = 80
                    const bodyRect = document.body.getBoundingClientRect().top
                    const elementRect = el.getBoundingClientRect().top
                    const elementPosition = elementRect - bodyRect
                    const offsetPosition = elementPosition - offset

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    })
                }
            }, 100)
        }
    }

    return (
        <nav className="nav">
            <Link to="/" className="brand" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false) }}>
                <Logo variant="black" height={48} />
            </Link>

            <button
                className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
                aria-expanded={menuOpen}
            >
                <span /><span /><span />
            </button>

            <div className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`}>
                <a href="#process" className="nav-link" onClick={(e) => handleNavClick(e, 'process')}>{t('nav.process')}</a>
                <a href="#partners" className="nav-link" onClick={(e) => handleNavClick(e, 'partners')}>{t('nav.partners')}</a>
                <a href="#risk" className="nav-link" onClick={(e) => handleNavClick(e, 'risk')}>{t('nav.risk')}</a>
                <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>{t('nav.contact')}</Link>
                <button
                    className="lang-toggle"
                    onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
                >
                    {lang === 'en' ? 'RU' : 'EN'}
                </button>
            </div>
        </nav>
    )
}

export default Navbar
