import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../lib/LanguageContext'

const TermsOfServicePage: React.FC = () => {
    const { t } = useLanguage()

    return (
        <div className="privacy-page">
            <Link to="/" className="privacy-back">
                {t('tos.back')}
            </Link>

            <h1>{t('tos.title')}</h1>
            <p className="last-updated">{t('tos.lastUpdated')}</p>

            {/* 1. Introduction & Acceptance */}
            <section className="privacy-section">
                <h2>{t('tos.intro.title')}</h2>
                <p>{t('tos.intro.text1')}</p>
                <p>{t('tos.intro.text2')}</p>
            </section>

            {/* 2. Definitions */}
            <section className="privacy-section">
                <h2>{t('tos.definitions.title')}</h2>
                <ul>
                    <li>{t('tos.definitions.company')}</li>
                    <li>{t('tos.definitions.services')}</li>
                    <li>{t('tos.definitions.client')}</li>
                    <li>{t('tos.definitions.partner')}</li>
                    <li>{t('tos.definitions.website')}</li>
                    <li>{t('tos.definitions.user')}</li>
                </ul>
            </section>

            {/* 3. Services Description */}
            <section className="privacy-section">
                <h2>{t('tos.services.title')}</h2>
                <p>{t('tos.services.text1')}</p>
                <ul>
                    <li>{t('tos.services.banking')}</li>
                    <li>{t('tos.services.formation')}</li>
                    <li>{t('tos.services.visa')}</li>
                    <li>{t('tos.services.tax')}</li>
                    <li>{t('tos.services.accounting')}</li>
                    <li>{t('tos.services.realestate')}</li>
                    <li>{t('tos.services.wealth')}</li>
                </ul>
                <p>{t('tos.services.text2')}</p>
            </section>

            {/* 4. User Obligations */}
            <section className="privacy-section">
                <h2>{t('tos.obligations.title')}</h2>
                <p>{t('tos.obligations.intro')}</p>
                <ul>
                    <li>{t('tos.obligations.accuracy')}</li>
                    <li>{t('tos.obligations.compliance')}</li>
                    <li>{t('tos.obligations.update')}</li>
                    <li>{t('tos.obligations.lawful')}</li>
                    <li>{t('tos.obligations.cooperation')}</li>
                </ul>
            </section>

            {/* 5. Intellectual Property */}
            <section className="privacy-section">
                <h2>{t('tos.ip.title')}</h2>
                <p>{t('tos.ip.text1')}</p>
                <p>{t('tos.ip.text2')}</p>
            </section>

            {/* 6. Limitation of Liability */}
            <section className="privacy-section">
                <h2>{t('tos.liability.title')}</h2>
                <p>{t('tos.liability.intro')}</p>
                <ul>
                    <li>{t('tos.liability.banking')}</li>
                    <li>{t('tos.liability.visa')}</li>
                    <li>{t('tos.liability.regulatory')}</li>
                    <li>{t('tos.liability.thirdparty')}</li>
                    <li>{t('tos.liability.indirect')}</li>
                </ul>
                <p>{t('tos.liability.cap')}</p>
            </section>

            {/* 7. Disclaimers */}
            <section className="privacy-section">
                <h2>{t('tos.disclaimers.title')}</h2>
                <p>{t('tos.disclaimers.intro')}</p>
                <ul>
                    <li>{t('tos.disclaimers.legal')}</li>
                    <li>{t('tos.disclaimers.tax')}</li>
                    <li>{t('tos.disclaimers.financial')}</li>
                    <li>{t('tos.disclaimers.outcome')}</li>
                </ul>
                <p>{t('tos.disclaimers.note')}</p>
            </section>

            {/* 8. Confidentiality */}
            <section className="privacy-section">
                <h2>{t('tos.confidentiality.title')}</h2>
                <p>{t('tos.confidentiality.text1')}</p>
                <p>{t('tos.confidentiality.text2')}</p>
            </section>

            {/* 9. Data Protection */}
            <section className="privacy-section">
                <h2>{t('tos.dataProtection.title')}</h2>
                <p>{t('tos.dataProtection.text')}</p>
            </section>

            {/* 10. Governing Law & Jurisdiction */}
            <section className="privacy-section">
                <h2>{t('tos.governing.title')}</h2>
                <p>{t('tos.governing.text1')}</p>
                <p>{t('tos.governing.text2')}</p>
            </section>

            {/* 11. Amendments */}
            <section className="privacy-section">
                <h2>{t('tos.amendments.title')}</h2>
                <p>{t('tos.amendments.text')}</p>
            </section>

            {/* 12. Severability */}
            <section className="privacy-section">
                <h2>{t('tos.severability.title')}</h2>
                <p>{t('tos.severability.text')}</p>
            </section>

            {/* 13. Contact Information */}
            <section className="privacy-section">
                <h2>{t('tos.contact.title')}</h2>
                <p>{t('tos.contact.text')}</p>
            </section>
        </div>
    )
}

export default TermsOfServicePage
