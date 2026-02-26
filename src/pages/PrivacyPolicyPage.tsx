import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../lib/LanguageContext'

const PrivacyPolicyPage: React.FC = () => {
    const { t } = useLanguage()

    return (
        <div className="privacy-page">
            <Link to="/" className="privacy-back">
                {t('privacy.back')}
            </Link>

            <h1>{t('privacy.title')}</h1>
            <p className="last-updated">{t('privacy.lastUpdated')}</p>

            {/* 1. Data Controller */}
            <section className="privacy-section">
                <h2>{t('privacy.controller.title')}</h2>
                <p>{t('privacy.controller.text')}</p>
            </section>

            {/* 2. Data We Collect */}
            <section className="privacy-section">
                <h2>{t('privacy.dataCollected.title')}</h2>
                <p>{t('privacy.dataCollected.formsIntro')}</p>
                <ul>
                    <li>{t('privacy.dataCollected.name')}</li>
                    <li>{t('privacy.dataCollected.email')}</li>
                    <li>{t('privacy.dataCollected.telegram')}</li>
                    <li>{t('privacy.dataCollected.nationality')}</li>
                    <li>{t('privacy.dataCollected.residency')}</li>
                    <li>{t('privacy.dataCollected.business')}</li>
                    <li>{t('privacy.dataCollected.banking')}</li>
                    <li>{t('privacy.dataCollected.funds')}</li>
                </ul>
                <p>{t('privacy.dataCollected.autoIntro')}</p>
                <ul>
                    <li>{t('privacy.dataCollected.ip')}</li>
                    <li>{t('privacy.dataCollected.browser')}</li>
                    <li>{t('privacy.dataCollected.pages')}</li>
                </ul>
            </section>

            {/* 3. Purpose of Processing */}
            <section className="privacy-section">
                <h2>{t('privacy.purpose.title')}</h2>
                <ul>
                    <li>{t('privacy.purpose.crm')}</li>
                    <li>{t('privacy.purpose.communication')}</li>
                    <li>{t('privacy.purpose.analytics')}</li>
                    <li>{t('privacy.purpose.legal')}</li>
                </ul>
            </section>

            {/* 4. Legal Basis */}
            <section className="privacy-section">
                <h2>{t('privacy.legalBasis.title')}</h2>
                <ul>
                    <li>{t('privacy.legalBasis.consent')}</li>
                    <li>{t('privacy.legalBasis.contract')}</li>
                    <li>{t('privacy.legalBasis.legitimate')}</li>
                </ul>
            </section>

            {/* 5. Third Parties */}
            <section className="privacy-section">
                <h2>{t('privacy.thirdParties.title')}</h2>
                <ul>
                    <li>{t('privacy.thirdParties.bitrix')}</li>
                    <li>{t('privacy.thirdParties.google')}</li>
                    <li>{t('privacy.thirdParties.hosting')}</li>
                </ul>
                <p>{t('privacy.thirdParties.note')}</p>
            </section>

            {/* 6. Data Retention */}
            <section className="privacy-section">
                <h2>{t('privacy.retention.title')}</h2>
                <p>{t('privacy.retention.text')}</p>
            </section>

            {/* 7. Your Rights */}
            <section className="privacy-section">
                <h2>{t('privacy.rights.title')}</h2>
                <p>{t('privacy.rights.intro')}</p>
                <ul>
                    <li>{t('privacy.rights.access')}</li>
                    <li>{t('privacy.rights.rectification')}</li>
                    <li>{t('privacy.rights.erasure')}</li>
                    <li>{t('privacy.rights.restriction')}</li>
                    <li>{t('privacy.rights.portability')}</li>
                    <li>{t('privacy.rights.objection')}</li>
                    <li>{t('privacy.rights.withdraw')}</li>
                </ul>
                <p>{t('privacy.rights.contact')}</p>
            </section>

            {/* 8. Cookies */}
            <section className="privacy-section">
                <h2>{t('privacy.cookies.title')}</h2>
                <p>{t('privacy.cookies.text')}</p>
                <ul>
                    <li>{t('privacy.cookies.ga')}</li>
                    <li>{t('privacy.cookies.session')}</li>
                </ul>
                <p>{t('privacy.cookies.control')}</p>
            </section>

            {/* 9. Cross-Border Data Transfer */}
            <section className="privacy-section">
                <h2>{t('privacy.crossBorder.title')}</h2>
                <p>{t('privacy.crossBorder.text')}</p>
            </section>

            {/* 10. Right to Lodge a Complaint */}
            <section className="privacy-section">
                <h2>{t('privacy.complaint.title')}</h2>
                <p>{t('privacy.complaint.text')}</p>
            </section>

            {/* 11. Changes */}
            <section className="privacy-section">
                <h2>{t('privacy.changes.title')}</h2>
                <p>{t('privacy.changes.text')}</p>
            </section>

            {/* 12. Contact */}
            <section className="privacy-section">
                <h2>{t('privacy.contact.title')}</h2>
                <p>{t('privacy.contact.text')}</p>
            </section>
        </div>
    )
}

export default PrivacyPolicyPage
