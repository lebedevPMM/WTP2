import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { submitCaseSchema, type SubmitCaseFormData } from '../lib/validations'
import FormInput from '../components/FormInput'
import FormTextarea from '../components/FormTextarea'
import FormCheckbox from '../components/FormCheckbox'
import { submitCaseToBitrix } from '../lib/bitrix'
import { useLanguage } from '../lib/LanguageContext'
import { trackFormSubmit } from '../lib/analytics'

const SubmitCasePage: React.FC = () => {
    const { t } = useLanguage()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<SubmitCaseFormData>({
        resolver: zodResolver(submitCaseSchema)
    })

    const onSubmit = async (data: SubmitCaseFormData) => {
        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            await submitCaseToBitrix(data)

            setSubmitStatus('success')
            trackFormSubmit('submit_case')
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
            <span className="label">{t('submitCase.label')}</span>
            <h1>{t('submitCase.title')}</h1>
            <p className="subtitle">
                {t('submitCase.subtitle')}
            </p>

            <div className="contact-grid">
                {/* Form — 3 simple fields */}
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-section">
                            <h3>{t('submitCase.formTitle')}</h3>
                            <div className="form-grid">
                                <FormInput
                                    label={t('submitCase.whoLabel')}
                                    name="whoAreYou"
                                    placeholder={t('submitCase.whoPlaceholder')}
                                    required
                                    register={register('whoAreYou')}
                                    error={errors.whoAreYou?.message}
                                />
                                <FormInput
                                    label={t('submitCase.contactLabel')}
                                    name="howToContact"
                                    placeholder={t('submitCase.contactPlaceholder')}
                                    required
                                    register={register('howToContact')}
                                    error={errors.howToContact?.message}
                                />
                                <FormTextarea
                                    label={t('submitCase.helpLabel')}
                                    name="howCanWeHelp"
                                    placeholder={t('submitCase.helpPlaceholder')}
                                    required
                                    rows={5}
                                    register={register('howCanWeHelp')}
                                    error={errors.howCanWeHelp?.message}
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
                                        {t('form.consent.prefix')}{' '}
                                        <Link to="/privacy">{t('form.consent.link')}</Link>
                                    </>
                                }
                            />
                        </div>

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                            <div className="form-alert success" role="status" aria-live="polite">
                                {t('submitCase.success')}
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="form-alert error" role="alert" aria-live="assertive">
                                {t('submitCase.error')}
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
                                {isSubmitting ? t('submitCase.submitting') : t('submitCase.submit')}
                            </button>
                            <Link to="/" className="btn btn-outline">
                                {t('submitCase.backHome')}
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Right column: Contact channels + Booking */}
                <div>
                    {/* Contact channels */}
                    <div className="form-section">
                        <h3>{t('submitCase.channels')}</h3>

                        <div className="contact-info-block">
                            <h4>WhatsApp</h4>
                            <a href="https://wa.me/971600575294" target="_blank" rel="noopener noreferrer">+971 600 575-294</a>
                        </div>

                        <div className="contact-info-block">
                            <h4>Telegram</h4>
                            <a href="https://t.me/wtpbrokers" target="_blank" rel="noopener noreferrer">@wtpbrokers</a>
                        </div>

                        <div className="contact-info-block">
                            <h4>Email</h4>
                            <a href="mailto:hello@wtpbrokers.com">hello@wtpbrokers.com</a>
                        </div>

                        <div className="contact-info-block">
                            <h4>{t('submitCase.phoneLabel')}</h4>
                            <a href="tel:+971600575294">+971 600 575-294</a>
                        </div>

                        <div className="contact-info-block">
                            <h4>{t('submitCase.officeLabel')}</h4>
                            <p>
                                Office 1207, Arenco Tower<br />
                                Media City, Dubai, UAE
                            </p>
                        </div>
                    </div>

                    {/* Online booking */}
                    <div className="response-card">
                        <h4>{t('submitCase.bookingTitle')}</h4>
                        <p>{t('submitCase.bookingText')}</p>
                        {/* TODO: Костя — добавить ссылку на онлайн-запись (Bitrix24 CRM Calendar / Calendly / Cal.com) */}
                        <a
                            href="https://wa.me/971600575294"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                            style={{ marginTop: '16px', display: 'inline-block', textAlign: 'center' }}
                        >
                            {t('submitCase.bookingCta')}
                        </a>
                    </div>

                    <div className="response-card" style={{ marginTop: '16px' }}>
                        <h4>{t('submitCase.responseTime')}</h4>
                        <p>{t('submitCase.responseText')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubmitCasePage
