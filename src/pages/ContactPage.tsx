import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormData } from '../lib/validations'
import FormInput from '../components/FormInput'
import FormTextarea from '../components/FormTextarea'
import FormCheckbox from '../components/FormCheckbox'
import { submitContactToBitrix } from '../lib/bitrix'
import { useLanguage } from '../lib/LanguageContext'

const ContactPage: React.FC = () => {
    const { t } = useLanguage()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema)
    })

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            await submitContactToBitrix(data)

            setSubmitStatus('success')
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
            <span className="label">{t('contact.label')}</span>
            <h1>{t('contact.title')}</h1>
            <p className="subtitle">
                {t('contact.subtitle')}
            </p>

            <div className="contact-grid">
                {/* Contact Form */}
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-section">
                            <h3>{t('contact.formTitle')}</h3>
                            <div className="form-grid">
                                <FormInput
                                    label={t('contact.name')}
                                    name="name"
                                    placeholder={t('contact.namePlaceholder')}
                                    required
                                    register={register('name')}
                                    error={errors.name?.message}
                                />
                                <FormInput
                                    label={t('contact.email')}
                                    name="email"
                                    type="email"
                                    placeholder={t('contact.emailPlaceholder')}
                                    required
                                    register={register('email')}
                                    error={errors.email?.message}
                                />
                                <FormInput
                                    label={t('contact.telegram')}
                                    name="telegram"
                                    placeholder={t('contact.telegramPlaceholder')}
                                    register={register('telegram')}
                                    error={errors.telegram?.message}
                                />
                                <FormTextarea
                                    label={t('contact.message')}
                                    name="message"
                                    placeholder={t('contact.messagePlaceholder')}
                                    required
                                    rows={5}
                                    register={register('message')}
                                    error={errors.message?.message}
                                />
                            </div>
                        </div>

                        {/* Privacy Consent */}
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

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                            <div className="form-alert success">
                                {t('contact.success')}
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="form-alert error">
                                {t('contact.error')}
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
                                {isSubmitting ? t('contact.submitting') : t('contact.submit')}
                            </button>
                            <Link to="/" className="btn btn-outline">
                                {t('contact.backHome')}
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Contact Information */}
                <div>
                    <div className="form-section">
                        <h3>{t('contact.info')}</h3>

                        <div className="contact-info-block">
                            <h4>{t('contact.emailLabel')}</h4>
                            <a href="mailto:hello@wtpbrokers.com">hello@wtpbrokers.com</a>
                        </div>

                        <div className="contact-info-block">
                            <h4>{t('contact.phoneLabel')}</h4>
                            <a href="tel:+971600575294">+971 600 575-294</a>
                        </div>

                        <div className="contact-info-block">
                            <h4>{t('contact.officeLabel')}</h4>
                            <p>
                                Office 1207, Arenco Tower<br />
                                Media City, Dubai, UAE
                            </p>
                        </div>
                    </div>

                    <div className="response-card">
                        <h4>{t('contact.responseTime')}</h4>
                        <p>
                            {t('contact.responseText')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage
