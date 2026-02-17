import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { submitCaseSchema, type SubmitCaseFormData } from '../lib/validations'
import { NATIONALITIES, RESIDENCIES, BANKING_JURISDICTIONS } from '../lib/constants'
import FormInput from '../components/FormInput'
import FormTextarea from '../components/FormTextarea'
import FormSelect from '../components/FormSelect'
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

            <div style={{ maxWidth: '720px' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Contact Information */}
                    <div className="form-section">
                        <h3>{t('submitCase.contact')}</h3>
                        <div className="form-grid">
                            <FormInput
                                label={t('submitCase.name')}
                                name="name"
                                placeholder="John Doe"
                                required
                                register={register('name')}
                                error={errors.name?.message}
                            />
                            <FormInput
                                label={t('submitCase.email')}
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                required
                                register={register('email')}
                                error={errors.email?.message}
                            />
                            <FormInput
                                label={t('submitCase.telegram')}
                                name="telegram"
                                placeholder="@username"
                                register={register('telegram')}
                                error={errors.telegram?.message}
                            />
                        </div>
                    </div>

                    {/* Client Details */}
                    <div className="form-section">
                        <h3>{t('submitCase.client')}</h3>
                        <div className="form-grid">
                            <FormSelect
                                label={t('submitCase.nationality')}
                                name="nationality"
                                options={NATIONALITIES}
                                placeholder="Select nationality"
                                required
                                register={register('nationality')}
                                error={errors.nationality?.message}
                            />
                            <FormSelect
                                label={t('submitCase.residency')}
                                name="residency"
                                options={RESIDENCIES}
                                placeholder="Select residency"
                                required
                                register={register('residency')}
                                error={errors.residency?.message}
                            />
                            <FormTextarea
                                label={t('submitCase.activity')}
                                name="businessActivity"
                                placeholder={t('submitCase.activityPlaceholder')}
                                required
                                rows={4}
                                register={register('businessActivity')}
                                error={errors.businessActivity?.message}
                            />
                        </div>
                    </div>

                    {/* Banking & Compliance */}
                    <div className="form-section">
                        <h3>{t('submitCase.banking')}</h3>
                        <div className="form-grid">
                            <FormSelect
                                label={t('submitCase.jurisdiction')}
                                name="bankingJurisdiction"
                                options={BANKING_JURISDICTIONS}
                                placeholder="Select jurisdiction"
                                required
                                register={register('bankingJurisdiction')}
                                error={errors.bankingJurisdiction?.message}
                            />
                            <FormTextarea
                                label={t('submitCase.funds')}
                                name="sourceOfFunds"
                                placeholder={t('submitCase.fundsPlaceholder')}
                                required
                                rows={4}
                                register={register('sourceOfFunds')}
                                error={errors.sourceOfFunds?.message}
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
                        <div className="form-alert success">
                            {t('submitCase.success')}
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="form-alert error">
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
        </div>
    )
}

export default SubmitCasePage
