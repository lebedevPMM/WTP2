import React, { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { useLanguage } from '../lib/LanguageContext'

const Navbar: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const isHome = location.pathname === '/'
    const { t } = useLanguage()
    const [menuOpen, setMenuOpen] = useState(false)

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false)
    }, [location.pathname])

    // Close menu on Escape key
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape' && menuOpen) {
            setMenuOpen(false)
        }
    }, [menuOpen])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

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
        <nav className="nav" aria-label={t('a11y.mainNavigation')}>
            <Link to="/" className="brand" aria-label={t('a11y.homeLink')} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false) }}>
                <Logo variant="black" height={48} />
            </Link>

            <button
                className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
                aria-expanded={menuOpen}
                aria-controls="nav-links"
            >
                <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
            </button>

            <div id="nav-links" className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`} role="navigation">
                <a href="#process" className="nav-link" onClick={(e) => handleNavClick(e, 'process')}>{t('nav.process')}</a>
                <a href="#partners" className="nav-link" onClick={(e) => handleNavClick(e, 'partners')}>{t('nav.partners')}</a>
                <a href="#risk" className="nav-link" onClick={(e) => handleNavClick(e, 'risk')}>{t('nav.risk')}</a>
                <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>{t('nav.contact')}</Link>
            </div>
        </nav>
    )
}

export default Navbar
