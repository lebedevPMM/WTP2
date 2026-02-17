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
                    <p className="text-body" style={{ marginBottom: '8px' }}>email@wtp.uae</p>
                    <p className="text-body">Telegram: @wtp_uae</p>
                </div>
                <div>
                    <span className="label">{t('footer.legal')}</span>
                    <Link to="/process/terms" className="text-body" style={{ display: 'block', marginBottom: '8px', textDecoration: 'none' }}>{t('footer.terms')}</Link>
                    <Link to="/privacy" className="text-body" style={{ display: 'block', textDecoration: 'none' }}>{t('footer.privacy')}</Link>
                </div>
                <div>
                    <span className="label">{t('footer.office')}</span>
                    <p className="text-body">
                        Dubai International Financial Centre<br />
                        Dubai, UAE
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
