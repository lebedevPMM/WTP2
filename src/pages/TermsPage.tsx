import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'

const TermsPage: React.FC = () => {
    return (
        <div className="container" style={{ paddingBottom: '120px' }}>
            <section className="hero-section" style={{ minHeight: 'auto', marginBottom: '80px' }}>
                <div className="label" style={{ marginBottom: '32px' }}>
                    <Link to="/#process" style={{ textDecoration: 'none', color: 'inherit' }}>← Back to Process</Link>
                </div>
                <h1>Delivery Terms</h1>
                <div className="label" style={{ marginBottom: '16px' }}>DELIVERY PROCESS</div>
                <p className="subtitle" style={{ marginBottom: 0 }}>
                    Our delivery principles, risk framework, and operating rules that govern every engagement.
                </p>
            </section>

            {/* Core Principles */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
                    <h2>Core Principles</h2>
                    <span className="label">Foundation</span>
                </div>
                <div className="grid-2">
                    <Card style={{ minHeight: '160px' }}>
                        <h4>Banking First</h4>
                        <p className="text-body">We assess every case through the bank's lens before any registration. Structure is chosen to serve the bank, not the other way around.</p>
                    </Card>
                    <Card style={{ minHeight: '160px' }}>
                        <h4>Compliance Over Speed</h4>
                        <p className="text-body">We never cut corners. Quality of compliance documentation matters more than delivery speed.</p>
                    </Card>
                    <Card style={{ minHeight: '160px' }}>
                        <h4>Scope Before Promises</h4>
                        <p className="text-body">No scope — no promises. Services, timelines, and pricing are fixed before work begins.</p>
                    </Card>
                    <Card style={{ minHeight: '160px' }}>
                        <h4>Written Changes Only</h4>
                        <p className="text-body">All scope changes, additional services, and modifications must be confirmed in writing.</p>
                    </Card>
                </div>
            </section>

            {/* Risk Verdict */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
                    <h2>Risk Verdict Framework</h2>
                    <span className="label">Gatekeeping</span>
                </div>
                <div className="grid-3">
                    <Card style={{ height: '100%' }}>
                        <div className="label" style={{ color: '#4CAF50', marginBottom: '16px' }}>✅ We Accept</div>
                        <ul className="text-body" style={{ paddingLeft: '20px', margin: 0 }}>
                            <li>Multi-service potential clients</li>
                            <li>Partners and repeat clients</li>
                            <li>Transparent business logic</li>
                            <li>Long-term orientation</li>
                        </ul>
                    </Card>
                    <Card style={{ height: '100%' }}>
                        <div className="label" style={{ color: '#FFC107', marginBottom: '16px' }}>⚠ Conditions Apply</div>
                        <ul className="text-body" style={{ paddingLeft: '20px', margin: 0, marginBottom: '16px' }}>
                            <li>Complex banking cases</li>
                            <li>No guarantee of result</li>
                            <li>Complex structures or jurisdictions</li>
                        </ul>
                        <p className="text-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                            → Higher pricing, fixed scope, no result guarantee
                        </p>
                    </Card>
                    <Card style={{ height: '100%' }}>
                        <div className="label" style={{ color: '#F44336', marginBottom: '16px' }}>❌ We Decline</div>
                        <ul className="text-body" style={{ paddingLeft: '20px', margin: 0 }}>
                            <li>Sanctioned persons</li>
                            <li>"Do it without documents" requests</li>
                            <li>No prepayment readiness</li>
                            <li>One-off tasks without continuation</li>
                            <li>Concierge requests outside partnership</li>
                        </ul>
                    </Card>
                </div>
            </section>

            {/* What We Never Do */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
                    <h2>What We Never Do</h2>
                    <span className="label">Red Lines</span>
                </div>
                <div className="grid-2">
                    {[
                        'Promise impossible outcomes',
                        'Minimize or hide compliance risks',
                        'Improvise in gray areas',
                        'Bypass partner in client communication',
                        'Share client data with third parties',
                        'Make undocumented agreements',
                    ].map((rule, i) => (
                        <div key={i} className="list-item" style={{ borderTop: i < 2 ? '1px solid var(--border-subtle)' : 'none' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <span style={{ color: '#F44336' }}>✕</span>
                                <p className="text-body" style={{ width: '100%', color: 'var(--text-primary)' }}>{rule}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default TermsPage
