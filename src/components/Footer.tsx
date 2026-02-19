import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { useLanguage } from '../lib/LanguageContext'

const Footer: React.FC = () => {
    const { t } = useLanguage()

    return (
        <footer id="contact">
            <div className="container grid-4">
                <div>
                    <div style={{ marginBottom: '24px' }}>
                        <Logo variant="white" height={40} />
                    </div>
                    <p className="text-body" style={{ fontSize: '13px' }}>{t('footer.tagline')}</p>
                </div>
                <div>
                    <span className="label">{t('footer.contact')}</span>
                    <p className="text-body" style={{ marginBottom: '8px' }}>
                        <a href="mailto:hello@wtpbrokers.com" style={{ color: 'inherit', textDecoration: 'none' }}>hello@wtpbrokers.com</a>
                    </p>
                    <p className="text-body">
                        <a href="tel:+971600575294" style={{ color: 'inherit', textDecoration: 'none' }}>+971 600 575-294</a>
                    </p>
                </div>
                <div>
                    <span className="label">{t('footer.legal')}</span>
                    <Link to="/process/terms" className="text-body" style={{ display: 'block', marginBottom: '8px', textDecoration: 'none' }}>{t('footer.terms')}</Link>
                    <Link to="/privacy" className="text-body" style={{ display: 'block', textDecoration: 'none' }}>{t('footer.privacy')}</Link>
                </div>
                <div>
                    <span className="label">{t('footer.office')}</span>
                    <p className="text-body" style={{ whiteSpace: 'pre-line' }}>
                        {t('footer.address')}
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
