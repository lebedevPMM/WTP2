import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { roadmapFormSchema, type RoadmapFormData } from '../lib/validations'
import { CLIENT_COUNTRIES } from '../lib/constants'
import FormInput from '../components/FormInput'
import FormTextarea from '../components/FormTextarea'
import FormCheckbox from '../components/FormCheckbox'
import { submitRoadmapToBitrix } from '../lib/bitrix'
import { useLanguage } from '../lib/LanguageContext'
import { trackFormSubmit } from '../lib/analytics'

const RoadmapPage: React.FC = () => {
    const { t } = useLanguage()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<RoadmapFormData>({
        resolver: zodResolver(roadmapFormSchema)
    })

    const onSubmit = async (data: RoadmapFormData) => {
        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            await submitRoadmapToBitrix(data)

            setSubmitStatus('success')
            trackFormSubmit('roadmap_request')
            reset()

            setTimeout(() => setSubmitStatus('idle'), 5000)
        } catch (error) {
            console.error('Form submission error:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="form-page">
            <span className="label">{t('cl.roadmap.label')}</span>
            <h1>{t('cl.roadmap.title')}</h1>
            <p className="subtitle">{t('cl.roadmap.subtitle')}</p>

            <div className="contact-grid">
                {/* Form */}
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-section">
                            <div className="form-grid">
                                <FormInput
                                    label={t('cl.roadmap.nameLabel')}
                                    name="name"
                                    placeholder={t('cl.roadmap.namePlaceholder')}
                                    required
                                    register={register('name')}
                                    error={errors.name?.message}
                                />
                                <FormInput
                                    label={t('cl.roadmap.emailLabel')}
                                    name="email"
                                    type="email"
                                    placeholder={t('cl.roadmap.emailPlaceholder')}
                                    required
                                    register={register('email')}
                                    error={errors.email?.message}
                                />

                                {/* Country select — no FormSelect component exists, using native select */}
                                <div className="form-field">
                                    <label htmlFor="country" className="form-label">
                                        {t('cl.roadmap.countryLabel')} <span className="required" aria-hidden="true">*</span>
                                    </label>
                                    <select
                                        id="country"
                                        aria-required={true}
                                        aria-invalid={errors.country ? true : undefined}
                                        aria-describedby={errors.country ? 'country-error' : undefined}
                                        {...register('country')}
                                        className={`form-input ${errors.country ? 'error' : ''}`}
                                    >
                                        <option value="">{t('cl.roadmap.countryPlaceholder')}</option>
                                        {CLIENT_COUNTRIES.map((c) => (
                                            <option key={c.value} value={c.label}>{c.label}</option>
                                        ))}
                                    </select>
                                    {errors.country && (
                                        <span id="country-error" className="form-error" role="alert">
                                            {errors.country.message}
                                        </span>
                                    )}
                                </div>

                                <FormTextarea
                                    label={t('cl.roadmap.situationLabel')}
                                    name="situation"
                                    placeholder={t('cl.roadmap.situationPlaceholder')}
                                    required
                                    rows={5}
                                    register={register('situation')}
                                    error={errors.situation?.message}
                                />
                            </div>
                        </div>

                        {/* Privacy Consent */}
                        <div className="form-section">
                            <FormCheckbox
                                name="consentPrivacy"
                                register={register('consentPrivacy')}
                                error={errors.consentPrivacy?.message}
                                label={
                                    <>
                                        {t('cl.roadmap.consent')}{' '}
                                        <Link to="/privacy">{t('cl.roadmap.consentLink')}</Link>
                                    </>
                                }
                            />
                        </div>

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                            <div className="form-alert success" role="status" aria-live="polite">
                                {t('cl.roadmap.success')}
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="form-alert error" role="alert" aria-live="assertive">
                                {t('cl.roadmap.error')}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="form-actions">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn"
                                style={isSubmitting ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                            >
                                {isSubmitting ? t('cl.roadmap.submitting') : t('cl.roadmap.submit')}
                            </button>
                            <Link to="/" className="btn btn-outline">
                                {t('cl.nav.home')}
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Right column: What you'll receive */}
                <div>
                    <div className="form-section">
                        <h3>{t('cl.roadmap.what.title')}</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <li
                                    key={i}
                                    style={{
                                        padding: '10px 0',
                                        borderBottom: '1px solid var(--border-subtle)',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '10px',
                                        fontSize: '14px',
                                        lineHeight: '1.5',
                                    }}
                                >
                                    <span style={{ color: '#C5A572', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>
                                        &#10003;
                                    </span>
                                    <span>{t(`cl.roadmap.what.item${i}`)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="response-card" style={{ marginTop: '24px' }}>
                        <h4>{t('cl.cta.sub')}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoadmapPage
