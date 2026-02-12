import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Card from '../components/Card'

interface ProductDetail {
    title: string
    subtitle: string
    intro: string
    services: { name: string; desc: string }[]
    redFlags?: string[]
    result: string
}

const productData: Record<string, ProductDetail> = {
    'banking': {
        title: 'Banking',
        subtitle: 'PRODUCT LINE',
        intro:
            'Personal and corporate banking is the foundation of every case. We work through the bank\'s compliance lens to ensure accounts are opened, maintained, and protected.',
        services: [
            { name: 'Personal Account Opening', desc: 'KYC-first approach, pre-cleared with banker before submission' },
            { name: 'Corporate Account Opening', desc: 'Structured around business profile, transaction logic, and bank requirements' },
            { name: 'Payment Infrastructure', desc: 'International transfers, payment routing, multi-currency setup' },
            { name: 'Compliance Support', desc: 'Ongoing bank relationship management, EDD responses, document updates' },
        ],
        redFlags: [
            'No source of funds documentation',
            'High-risk industries: crypto, forex, gambling, defense',
            'Cash-intensive businesses without clear audit trail',
            'Russian Federation passport holders require extended processing',
        ],
        result: 'Bank account accepted by compliance, with transparent transaction logic and no future surprises.',
    },
    'business-setup': {
        title: 'Business Setup',
        subtitle: 'PRODUCT LINE',
        intro:
            'Company registration is not the goal — it\'s a step in the process. We structure the company to serve the banking strategy, not the other way around.',
        services: [
            { name: 'Free Zone Registration', desc: 'Optimized for banking acceptance, tax efficiency, and operational simplicity' },
            { name: 'Mainland Registration', desc: 'Required for local market operations, government contracts, or specific activities' },
            { name: 'Trade License', desc: 'Activity selection aligned with banking and compliance requirements' },
            { name: 'Tax Registration', desc: 'Corporate tax, VAT registration, and substance requirements' },
        ],
        result: 'Company structure designed for the bank. License, activity, and zone chosen to maximize bankability.',
    },
    'residency': {
        title: 'Residency',
        subtitle: 'PRODUCT LINE',
        intro:
            'Visa and residency processing integrated into the overall case. We handle employment visas, investor visas, and Golden Visa applications.',
        services: [
            { name: 'Employment Visa', desc: 'Standard employee or self-sponsored visa linked to company' },
            { name: 'Investor / Partner Visa', desc: 'For company shareholders and beneficial owners' },
            { name: 'Golden Visa', desc: 'Based on real estate investment, business ownership, or professional qualification' },
            { name: 'Family Visa & Dependents', desc: 'Spouse, children — requires legalized documents (birth, marriage certificates)' },
            { name: 'Emirates ID', desc: 'Biometric registration and ID issuance' },
        ],
        result: 'Legal residency in the UAE with all documentation aligned for banking, tax, and compliance requirements.',
    },
    'assets-wealth': {
        title: 'Assets & Wealth',
        subtitle: 'PRODUCT LINE',
        intro:
            'Real estate, wills, foundations, and capital management — structured to reinforce the client\'s overall UAE position rather than create new risks.',
        services: [
            { name: 'Real Estate Advisory', desc: 'Investment vs. living vs. visa — purpose determines strategy. Liquidity and resale considered.' },
            { name: 'Wills & Succession', desc: 'Registered wills for UAE assets. Prevents default Sharia inheritance distribution.' },
            { name: 'Capital Flow & Transfers', desc: 'Legal, controlled, and predictable movement of capital between jurisdictions.' },
            { name: 'Investment Products', desc: 'Access to solid investment vehicles with clear risk/return profile.' },
        ],
        redFlags: [
            'Anonymous purchases expected',
            'No proof of source of funds for real estate',
            'Mismatched budget and stated goal (e.g. Golden Visa budget vs. actual requirements)',
        ],
        result: 'Assets integrated into overall strategy: ownership, tax, residency, and succession aligned.',
    },
}

const ProductPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>()
    const data = slug ? productData[slug] : null

    if (!data) {
        return (
            <div className="container" style={{ paddingTop: '80px' }}>
                <Link to="/" className="label" style={{ textDecoration: 'none', cursor: 'pointer' }}>← Back to Overview</Link>
                <h1>Product Not Found</h1>
                <p className="text-body">The requested product line does not exist.</p>
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
                    <h2>Services</h2>
                    <span className="label">Scope</span>
                </div>
                <div className="grid-2">
                    {data.services.map((svc) => (
                        <Card key={svc.name} style={{ minHeight: '160px' }}>
                            <h4 style={{ fontSize: '18px' }}>{svc.name}</h4>
                            <p className="text-body" style={{ fontSize: '13px' }}>{svc.desc}</p>
                        </Card>
                    ))}
                </div>
            </section>

            {data.redFlags && (
                <section>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
                        <h2>Red Flags</h2>
                        <span className="label">Attention</span>
                    </div>
                    <div className="grid-2">
                        {/* Using Card for red flags for consistency */}
                        {data.redFlags.map((flag, i) => (
                            <div key={i} className="list-item" style={{ borderTop: i < 2 ? '1px solid var(--border-subtle)' : 'none' }}>
                                {/* Simple list item style since we don't have a dedicated RedFlagRow component yet, or could use RiskRow */}
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <div style={{ background: '#cd3e30', color: '#fff', fontSize: '12px', padding: '2px 8px', borderRadius: '4px', height: '20px', display: 'flex', alignItems: 'center' }}>!</div>
                                    <p className="text-body" style={{ width: '100%', color: 'var(--text-primary)' }}>{flag}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
                    <h2>Expected Result</h2>
                    <span className="label">Outcome</span>
                </div>
                <Card style={{ borderColor: 'var(--border-focus)', background: 'transparent' }}>
                    <p className="text-body" style={{ fontSize: '16px', color: 'var(--text-primary)' }}>{data.result}</p>
                </Card>
            </section>
        </div>
    )
}

export default ProductPage
