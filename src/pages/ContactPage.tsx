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
            <span className="label">Get in Touch</span>
            <h1>Contact Us</h1>
            <p className="subtitle">
                Get in touch with our team. We'll get back to you within 24 hours.
            </p>

            <div className="contact-grid">
                {/* Contact Form */}
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-section">
                            <h3>Send us a message</h3>
                            <div className="form-grid">
                                <FormInput
                                    label="Name"
                                    name="name"
                                    placeholder="John Doe"
                                    required
                                    register={register('name')}
                                    error={errors.name?.message}
                                />
                                <FormInput
                                    label="Email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    required
                                    register={register('email')}
                                    error={errors.email?.message}
                                />
                                <FormInput
                                    label="Telegram"
                                    name="telegram"
                                    placeholder="@username"
                                    register={register('telegram')}
                                    error={errors.telegram?.message}
                                />
                                <FormTextarea
                                    label="Message"
                                    name="message"
                                    placeholder="Tell us about your inquiry..."
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
                                Your message has been sent successfully! We'll get back to you soon.
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="form-alert error">
                                Something went wrong. Please try again or reach out via email directly.
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
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                            <Link to="/" className="btn btn-outline">
                                Back to Home
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Contact Information */}
                <div>
                    <div className="form-section">
                        <h3>Get in Touch</h3>

                        <div className="contact-info-block">
                            <h4>Email</h4>
                            <a href="mailto:hello@wtpbrokers.com">hello@wtpbrokers.com</a>
                        </div>

                        <div className="contact-info-block">
                            <h4>Phone</h4>
                            <a href="tel:+971600575294">+971 600 575-294</a>
                        </div>

                        <div className="contact-info-block">
                            <h4>Office</h4>
                            <p>
                                Office 1207, Arenco Tower<br />
                                Media City, Dubai, UAE
                            </p>
                        </div>
                    </div>

                    <div className="response-card">
                        <h4>Response Time</h4>
                        <p>
                            We typically respond within 24 hours during business days. For urgent matters, please reach out via Telegram.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage
