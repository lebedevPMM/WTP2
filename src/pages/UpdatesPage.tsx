import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../lib/LanguageContext'

const UpdatesPage: React.FC = () => {
    const { t } = useLanguage()

    return (
        <div className="container" style={{ paddingBottom: '120px' }}>
            <section className="hero-section" style={{ minHeight: 'auto', marginBottom: '80px' }}>
                <div className="label" style={{ marginBottom: '32px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>{t('updates.back')}</Link>
                </div>
                <h1>{t('updates.title')}</h1>
                <div className="label" style={{ marginBottom: '16px' }}>{t('updates.label')}</div>
                <p className="subtitle" style={{ marginBottom: 0 }}>
                    {t('updates.subtitle')}
                </p>
            </section>

            <section style={{ marginTop: '40px' }}>
                <p className="text-body">{t('updates.empty')}</p>
                <Link to="/" className="btn btn-outline" style={{ marginTop: '24px' }}>{t('updates.backHome')}</Link>
            </section>
        </div>
    )
}

export default UpdatesPage
