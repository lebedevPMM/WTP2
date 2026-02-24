import React from 'react'
import Logo from './Logo'
import { useLanguage } from '../lib/LanguageContext'

const NavbarMinimal: React.FC = () => {
    const { t } = useLanguage()

    return (
        <nav className="navbar" role="navigation" aria-label="Main navigation">
            <div className="container nav-container">
                <a href="/" aria-label="Home">
                    <Logo variant="black" height={32} />
                </a>
                <a href="/submit-case" className="btn btn-primary btn-sm">
                    {t('nav.submitCase')}
                </a>
            </div>
        </nav>
    )
}

export default NavbarMinimal
