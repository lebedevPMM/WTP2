import React from 'react'
import Logo from './Logo'
import { useLanguage } from '../lib/LanguageContext'

const NavbarMinimal: React.FC = () => {
    const { t } = useLanguage()

    return (
        <nav className="nav" role="navigation" aria-label="Main navigation">
            <a href="/" className="brand" aria-label="Home">
                <Logo variant="black" height={32} />
            </a>
            <div className="nav-links">
                <a href="/submit-case" className="btn btn-primary btn-sm">
                    {t('nav.submitCase')}
                </a>
            </div>
        </nav>
    )
}

export default NavbarMinimal
