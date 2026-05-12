import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { trcFormSchema, type TrcFormData } from '../lib/validations'
import { submitTrcLeadToBitrix } from '../lib/bitrix'
import { trackFormSubmit } from '../lib/analytics'
import './TrcLandingPage.css'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const

function readUtmFromUrl(): Record<string, string> {
    if (typeof window === 'undefined') return {}
    const params = new URLSearchParams(window.location.search)
    const out: Record<string, string> = {}
    for (const key of UTM_KEYS) {
        const value = params.get(key)
        if (value) out[key] = value
    }
    return out
}

const TrcLandingPage: React.FC = () => {
    const utm = useMemo(readUtmFromUrl, [])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TrcFormData>({
        resolver: zodResolver(trcFormSchema),
        defaultValues: { messenger: 'telegram', website: '' },
    })

    useEffect(() => {
        document.documentElement.lang = 'ru'
    }, [])

    const onSubmit = async (data: TrcFormData) => {
        if (data.website && data.website.length > 0) {
            // honeypot trip — pretend success, drop silently
            setSubmitStatus('success')
            reset({ messenger: 'telegram', website: '' })
            return
        }

        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            await submitTrcLeadToBitrix({
                name: data.name,
                phone: data.phone,
                messenger: data.messenger,
                utm,
            })
            setSubmitStatus('success')
            trackFormSubmit('trc_lead')
            reset({ messenger: 'telegram', website: '' })
        } catch (error) {
            console.error('TRC form submission error:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const scrollToForm = () => {
        const el = document.getElementById('trc-form')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <div className="trc-page">
            {/* HERO */}
            <section className="trc-hero">
                <div className="trc-container">
                    <div className="trc-hero-grid">
                        <div className="trc-hero-copy">
                            <span className="trc-eyebrow">WTP × Налоговое резидентство ОАЭ</span>
                            <h1 className="trc-h1">
                                Налоговый сертификат резидента ОАЭ (TRC).
                                <br />
                                <em>Под новое СИДН Россия–ОАЭ 2026.</em>
                            </h1>
                            <p className="trc-subhead">
                                С 1 января 2026 года ставка налога у источника в России на дивиденды, проценты и роялти
                                для резидента ОАЭ — <strong>10% вместо 15%+</strong>. Льгота работает только при
                                действующем TRC. Подаём через EmaraTax, средний срок — 5 рабочих дней.
                                Для соглашения с Россией сертификат не требует апостиля и легализации.
                            </p>
                            <ul className="trc-hero-bullets">
                                <li>Снижение ставки на дивиденды/проценты/роялти из России — 10%</li>
                                <li>Освобождение от российского налога на доход от продажи акций РФ-компаний (кроме «недвижимостных»)</li>
                                <li>Зеркальное подтверждение для ФНС, если вы провели в РФ меньше 183 дней</li>
                                <li>Льготы по 130+ соглашениям ОАЭ об избежании двойного налогообложения</li>
                            </ul>
                        </div>
                        <aside className="trc-hero-form-wrap" id="trc-form">
                            <div className="trc-form-card">
                                <h2 className="trc-form-title">Разберём вашу ситуацию</h2>
                                <p className="trc-form-sub">
                                    Имя, телефон и удобный мессенджер — остальное обсудим в разговоре.
                                </p>
                                <form onSubmit={handleSubmit(onSubmit)} className="trc-form" noValidate>
                                    <input
                                        type="text"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        aria-hidden="true"
                                        className="trc-honeypot"
                                        {...register('website')}
                                    />

                                    <div className="trc-form-field">
                                        <label htmlFor="trc-name" className="form-label">Имя <span className="required">*</span></label>
                                        <input
                                            id="trc-name"
                                            type="text"
                                            autoComplete="given-name"
                                            placeholder="Как к вам обращаться"
                                            aria-invalid={errors.name ? true : undefined}
                                            aria-describedby={errors.name ? 'trc-name-error' : undefined}
                                            className={`form-input ${errors.name ? 'error' : ''}`}
                                            {...register('name')}
                                        />
                                        {errors.name && <span id="trc-name-error" className="form-error" role="alert">{errors.name.message}</span>}
                                    </div>

                                    <div className="trc-form-field">
                                        <label htmlFor="trc-phone" className="form-label">Телефон <span className="required">*</span></label>
                                        <input
                                            id="trc-phone"
                                            type="tel"
                                            inputMode="tel"
                                            autoComplete="tel"
                                            placeholder="+971 …"
                                            aria-invalid={errors.phone ? true : undefined}
                                            aria-describedby={errors.phone ? 'trc-phone-error' : undefined}
                                            className={`form-input ${errors.phone ? 'error' : ''}`}
                                            {...register('phone')}
                                        />
                                        {errors.phone && <span id="trc-phone-error" className="form-error" role="alert">{errors.phone.message}</span>}
                                    </div>

                                    <div className="trc-form-field">
                                        <span className="form-label">Удобный способ связи <span className="required">*</span></span>
                                        <div className="trc-messenger-group" role="radiogroup" aria-label="Способ связи">
                                            {(['telegram', 'whatsapp', 'phone'] as const).map((value) => (
                                                <label key={value} className="trc-messenger-option">
                                                    <input
                                                        type="radio"
                                                        value={value}
                                                        {...register('messenger')}
                                                    />
                                                    <span>{value === 'telegram' ? 'Telegram' : value === 'whatsapp' ? 'WhatsApp' : 'Звонок'}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.messenger && <span className="form-error" role="alert">{errors.messenger.message}</span>}
                                    </div>

                                    <label className="trc-consent">
                                        <input type="checkbox" {...register('consentPrivacy')} />
                                        <span>
                                            Согласен с обработкой персональных данных по{' '}
                                            <Link to="/privacy">Политике конфиденциальности</Link>
                                        </span>
                                    </label>
                                    {errors.consentPrivacy && <span className="form-error" role="alert">{errors.consentPrivacy.message}</span>}

                                    {submitStatus === 'success' && (
                                        <div className="trc-alert trc-alert--success" role="status" aria-live="polite">
                                            Заявка получена. Свяжемся с вами в ближайшее рабочее время.
                                        </div>
                                    )}
                                    {submitStatus === 'error' && (
                                        <div className="trc-alert trc-alert--error" role="alert" aria-live="assertive">
                                            Не удалось отправить заявку. Напишите нам напрямую в Telegram <a href="https://t.me/ivanborodach">@ivanborodach</a>.
                                        </div>
                                    )}

                                    <button type="submit" className="btn trc-submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Отправляем…' : 'Получить консультацию по TRC'}
                                    </button>
                                    <p className="trc-form-footnote">
                                        Ответим в течение рабочего дня. Без рассылок — только по существу вашей ситуации.
                                    </p>
                                </form>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* WHY NOW */}
            <section className="trc-section">
                <div className="trc-container">
                    <h2 className="trc-h2">Зачем TRC именно сейчас</h2>
                    <div className="trc-reasons">
                        <article className="trc-reason">
                            <div className="trc-reason-num">01</div>
                            <h3>Снизить налог на доходы из России</h3>
                            <p>
                                По новому СИДН ставка налога у источника для резидента ОАЭ — 10% против 15%+.
                                Доход от продажи акций российских компаний (кроме «недвижимостных») освобождается
                                от российского налога. Льгота применяется при наличии действующего TRC.
                            </p>
                        </article>
                        <article className="trc-reason">
                            <div className="trc-reason-num">02</div>
                            <h3>Закрыть вопрос с российским резидентством</h3>
                            <p>
                                Если вы провели в РФ меньше 183 дней — TRC становится зеркальным подтверждением
                                вашего статуса для ФНС. Без него любые споры с налоговой превращаются
                                в долгую переписку.
                            </p>
                        </article>
                        <article className="trc-reason">
                            <div className="trc-reason-num">03</div>
                            <h3>Спокойствие с банками</h3>
                            <p>
                                Эмиратские, европейские и азиатские банки всё жёстче спрашивают
                                о налоговом резидентстве по CRS. TRC снимает половину вопросов при открытии
                                счетов и при работе с private banking.
                            </p>
                        </article>
                        <article className="trc-reason">
                            <div className="trc-reason-num">04</div>
                            <h3>Льготы по 130+ СИДН ОАЭ</h3>
                            <p>
                                У ОАЭ более 130 соглашений об избежании двойного налогообложения с другими
                                странами. Без сертификата прописанные в них льготы остаются на бумаге.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            {/* WHO CAN GET */}
            <section className="trc-section trc-section--alt">
                <div className="trc-container">
                    <h2 className="trc-h2">Кто может получить TRC (для физлица)</h2>
                    <div className="trc-paths">
                        <article className="trc-path">
                            <div className="trc-path-stat">183+ дней</div>
                            <p>Самый простой путь: 183 и более дней в ОАЭ за последние 12 месяцев.</p>
                        </article>
                        <article className="trc-path">
                            <div className="trc-path-stat">90+ дней</div>
                            <p>90+ дней в ОАЭ <em>плюс</em> виза резидента, жильё (собственное или аренда), работа или бизнес в стране.</p>
                        </article>
                        <article className="trc-path">
                            <div className="trc-path-stat">&lt;90 дней</div>
                            <p>Только если ОАЭ — ваш центр жизненных интересов: семья, бизнес, основные активы.</p>
                        </article>
                    </div>
                    <p className="trc-note">
                        Для соглашения с Россией надёжнее всего тест 183 дней — он не вызывает споров
                        ни у FTA, ни у ФНС.
                    </p>
                </div>
            </section>

            {/* WHAT'S NEEDED */}
            <section className="trc-section">
                <div className="trc-container">
                    <div className="trc-twocol">
                        <div>
                            <h2 className="trc-h2">Что понадобится</h2>
                            <ul className="trc-doclist">
                                <li>Виза резидента ОАЭ</li>
                                <li>Emirates ID</li>
                                <li>Миграционный отчёт GDRFA</li>
                                <li>Ejari (договор аренды) или подтверждение собственности</li>
                                <li>Банковские выписки за 6 месяцев</li>
                                <li>Подтверждение источника дохода</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="trc-h2">Срок и формат</h2>
                            <ul className="trc-process">
                                <li><strong>Подача:</strong> онлайн через EmaraTax</li>
                                <li><strong>Срок:</strong> ~5 рабочих дней после подачи полного пакета</li>
                                <li><strong>Действие:</strong> на конкретный год и под конкретную страну-партнёра</li>
                                <li><strong>Для соглашения с Россией:</strong> апостиль и легализация не требуются</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHO SHOULD ACT FIRST */}
            <section className="trc-section trc-section--alt">
                <div className="trc-container">
                    <h2 className="trc-h2">Кому стоит подумать первым</h2>
                    <p className="trc-section-lede">
                        TRC оформляется заранее — <em>до</em> того, как возникнет налоговое событие.
                        Если хотя бы один пункт ниже про вас — заявка имеет смысл уже сейчас.
                    </p>
                    <ul className="trc-profiles">
                        <li>Получаете дивиденды из российских компаний</li>
                        <li>Планируете продажу российских активов</li>
                        <li>Инвестируете через зарубежных брокеров</li>
                        <li>Строите семейный холдинг или личный фонд</li>
                        <li>Официально закрываете российский налоговый статус</li>
                        <li>Открываете или ведёте счета в private banking за пределами РФ</li>
                    </ul>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="trc-section trc-cta-section">
                <div className="trc-container">
                    <div className="trc-cta-card">
                        <h2 className="trc-h2">Разберём вашу ситуацию и подскажем, успеваете ли в этом году</h2>
                        <p className="trc-cta-lede">
                            Без обязательств. По итогам разговора — карта шагов под вашу ситуацию:
                            по какому пути подавать (183 / 90+ / интересы), что собрать из документов,
                            реалистичный срок и стоимость.
                        </p>
                        <button type="button" className="btn trc-submit trc-cta-btn" onClick={scrollToForm}>
                            Оставить заявку
                        </button>
                        <p className="trc-cta-footnote">
                            Команда WTP в Дубае работает напрямую с FTA. Ваши данные используем только
                            для подготовки ответа.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TrcLandingPage
