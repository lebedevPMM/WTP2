import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Card from '../components/Card'

interface StepDetail {
    title: string
    subtitle: string
    intro: string
    actions: string[]
    result: string
    nextStep?: string
    nextHref?: string
}

const processData: Record<string, StepDetail> = {
    'pre-screen': {
        title: 'Pre-screen',
        subtitle: 'D: PRE-ACTION',
        intro:
            'Banking First — we assess every case through the bank\'s lens before any registration. Documents go to the banker for preliminary review. Only after a positive signal do we proceed.',
        actions: [
            'Collect KYC Light documents (passport, proof of address, source of funds)',
            'Assess the case from the bank\'s perspective: red flags, business logic, potential issues',
            'Send documents to banker for preliminary identity verification',
            'Issue verdict: ✅ proceed / ⚠ proceed with conditions / ❌ decline',
        ],
        result:
            'Clear understanding of bankability before any commitments are made. No wasted time, no false promises.',
        nextStep: 'Banking Scenario',
        nextHref: '/process/banking-scenario',
    },
    'banking-scenario': {
        title: 'Banking Scenario',
        subtitle: 'D: STRATEGY',
        intro:
            'Once the case is cleared, we design the banking strategy: which banks have a real chance, what are their requirements, and how to structure the approach.',
        actions: [
            'Determine target banks based on client profile and risk appetite',
            'Map bank-specific requirements and documentation needs',
            'Choose optimal jurisdiction and company structure (if applicable)',
            'Define the full scope and announce pricing',
        ],
        result:
            'A concrete banking strategy with realistic targets. Structure is chosen to serve the bank, not the other way around.',
        nextStep: 'Delivery',
        nextHref: '/process/delivery',
    },
    'delivery': {
        title: 'Delivery',
        subtitle: 'D: EXECUTION',
        intro:
            'Execution phase: company registration, bank account submission, visa processing — all aligned with the banking strategy from the previous step.',
        actions: [
            'Register company in the chosen zone (Free Zone / Mainland)',
            'Submit bank application with pre-approved document package',
            'Process visas and Emirates ID',
            'Respond to bank compliance questions and iterate on documentation',
            'Finalize until structure is accepted by bank and regulators',
        ],
        result:
            'Working business structure accepted by the bank, with correct compliance, tax logic, and legal foundation.',
        nextStep: 'Ongoing Support',
        nextHref: '/process/ongoing-support',
    },
    'ongoing-support': {
        title: 'Ongoing Support',
        subtitle: 'D: MAINTENANCE',
        intro:
            'Post-delivery retainer: operational stability, compliance monitoring, and long-term value creation for partner and client.',
        actions: [
            'License renewals and corporate maintenance',
            'Bank relationship management and compliance updates',
            'Visa renewals and status changes',
            'Additional services: wills, real estate, capital flows',
            'Partner referral management and commission tracking',
        ],
        result:
            'Client becomes a long-term relationship. Repeat business generates predictable revenue for the partner.',
    },
}

const ProcessPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>()
    const data = slug ? processData[slug] : null

    if (!data) {
        return (
            <div className="container" style={{ paddingTop: '80px' }}>
                <Link to="/" className="label" style={{ textDecoration: 'none', cursor: 'pointer' }}>← Back to Overview</Link>
                <h1>Process Step Not Found</h1>
                <p className="text-body">The requested process step does not exist.</p>
            </div>
        )
    }

    return (
        <div className="container" style={{ paddingBottom: '120px' }}>
            <section className="hero-section" style={{ minHeight: 'auto', marginBottom: '80px' }}>
                <div className="label" style={{ marginBottom: '32px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>← Back to Overview</Link>
                </div>
                <span className="label">{data.subtitle}</span>
                <h1 style={{ fontSize: '48px' }}>{data.title}</h1>
                <p className="subtitle" style={{ marginBottom: 0 }}>{data.intro}</p>
            </section>

            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
                    <h2>What Happens</h2>
                    <span className="label">Actions</span>
                </div>
                <div className="grid-2">
                    {data.actions.map((action, i) => (
                        <div key={i} className="list-item" style={{ borderTop: i < 2 ? '1px solid var(--border-subtle)' : 'none' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'baseline' }}>
                                <span className="label" style={{ marginBottom: 0 }}>0{i + 1}</span>
                                <p className="text-body" style={{ width: '100%', color: 'var(--text-primary)' }}>{action}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
                    <h2>Result</h2>
                    <span className="label">Outcome</span>
                </div>
                <Card style={{ borderColor: 'var(--border-focus)', background: 'transparent' }}>
                    <p className="text-body" style={{ fontSize: '16px', color: 'var(--text-primary)' }}>{data.result}</p>
                </Card>
            </section>

            {data.nextStep && data.nextHref && (
                <section style={{ textAlign: 'center', marginTop: '80px' }}>
                    <Link to={data.nextHref} className="card" style={{ display: 'inline-flex', flexDirection: 'row', alignItems: 'center', gap: '24px', textDecoration: 'none', padding: '24px 48px', minHeight: 'auto' }}>
                        <div style={{ textAlign: 'left' }}>
                            <div className="label" style={{ marginBottom: '4px' }}>Next Step</div>
                            <h4 style={{ margin: 0, fontSize: '24px' }}>{data.nextStep}</h4>
                        </div>
                        <span className="label" style={{ marginBottom: 0 }}>Continue →</span>
                    </Link>
                </section>
            )}
        </div>
    )
}

export default ProcessPage
