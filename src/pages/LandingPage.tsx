import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import Card from '../components/Card'
import ProcessStep from '../components/ProcessStep'
import ProductCard from '../components/ProductCard'
import RiskRow from '../components/RiskRow'

const LandingPage: React.FC = () => {
    return (
        <>
            <Navbar />

            <div className="container">
                {/* Hero */}
                <section className="hero-section">
                    <div className="hero-bg-effect" />
                    <span className="label">For Brokers &amp; Advisors</span>
                    <h1>A reliable UAE execution partner built for bankability and compliance.</h1>
                    <p className="subtitle">
                        WTP is an on-the-ground operator taking clients from intent to outcome safely, without reputational risk.
                    </p>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <Button href="#">Get the Partner Kit</Button>
                        <Button href="#" variant="outline">Submit a Case</Button>
                    </div>
                </section>

                {/* Who it's for */}
                <section>
                    <span className="label">Who it's for</span>
                    <div className="grid-2">
                        <div>
                            <h2>Partners who need on-site quality control.</h2>
                        </div>
                        <div className="flex-col">
                            <p className="text-body">
                                You have clients, but lack strong local execution. Designed for brokers, private bankers, advisors, family offices, lawyers, and agencies outside the UAE.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Partner Benefits */}
                <section id="partners">
                    <span className="label">Partner Benefits</span>
                    <div className="grid-2">
                        <Card accentGradient="var(--accent-magma)" hasAccentTop>
                            <div>
                                <h4>Ownership Protection</h4>
                                <p className="text-body">
                                    We never bypass the partner, and we don't sell directly around you. Your client relationships remain yours.
                                </p>
                            </div>
                        </Card>
                        <Card accentGradient="var(--accent-gold)" hasAccentTop>
                            <div>
                                <h4>Transparency</h4>
                                <p className="text-body">
                                    Clear status updates, scope and change control, and defined checkpoints throughout the process.
                                </p>
                            </div>
                        </Card>
                        <Card accentGradient="var(--accent-teal)" hasAccentTop>
                            <div>
                                <h4>Control</h4>
                                <p className="text-body">
                                    Decisions are made up&shy;front: whether we can proceed, and under exactly what conditions.
                                </p>
                            </div>
                        </Card>
                        <Card accentGradient="var(--accent-nebula)" hasAccentTop>
                            <div>
                                <h4>Quality</h4>
                                <p className="text-body">
                                    Optimized for banks and regulators, not "speed at any cost." We prioritize long-term stability.
                                </p>
                            </div>
                        </Card>
                    </div>
                </section>

                {/* Delivery Process */}
                <section id="process">
                    <span className="label">Delivery Process</span>
                    <h2>How we work</h2>
                    <div className="grid-4" style={{ marginTop: '40px' }}>
                        <ProcessStep number="01" title="Pre-screen" description="Documents, KYC/AML, Source of Funds, and risk map before any action." active />
                        <ProcessStep number="02" title="Banking Scenario" description='Bank routing and requirements selection. No "guaranteed account" promises.' />
                        <ProcessStep number="03" title="Delivery" description="Company setup, accounts, visas, and operations support within agreed scenario." />
                        <ProcessStep number="04" title="Ongoing" description="Retainer support to ensure stability and maximize LTV." />
                    </div>
                </section>

                {/* Engagement Models */}
                <section>
                    <span className="label">Engagement Models</span>
                    <div className="grid-2">
                        <div className="list-item" style={{ borderTop: 'none', paddingTop: 0 }}>
                            <div>
                                <h3>Referral</h3>
                                <p className="text-body" style={{ width: '100%' }}>
                                    The client knows WTP. The partner is paid a commission under agreed rules.
                                </p>
                            </div>
                        </div>
                        <div className="list-item" style={{ borderTop: 'none', paddingTop: 0 }}>
                            <div>
                                <h3>White-label</h3>
                                <p className="text-body" style={{ width: '100%' }}>
                                    The client may not know WTP. We work as a subcontractor; all communication goes through the partner.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Card
                        style={{ marginTop: '24px', borderColor: 'var(--border-focus)', background: 'transparent' }}
                    >
                        <h4 style={{ marginBottom: '24px' }}>Partner Protection Policy</h4>
                        <div className="grid-2">
                            <p className="text-body">• Client assigned to partner in CRM registry</p>
                            <p className="text-body">• Direct contact only in agreed format</p>
                            <p className="text-body">• Terms don't change without approval</p>
                            <p className="text-body">• Commissions agreed upfront</p>
                        </div>
                    </Card>
                </section>

                {/* Risk Policy */}
                <section id="risk">
                    <span className="label">Risk Policy</span>
                    <div className="risk-table">
                        <RiskRow
                            dotColor="green"
                            status="We Accept"
                            description="Transparent business rationale, document readiness, no critical red flags, realistic expectations."
                        />
                        <RiskRow
                            dotColor="yellow"
                            status="Accept w/ Conditions"
                            description="Higher risk, complex structure, non-standard operations. Requires enhanced control, fixed scope, separate pricing, written risk acknowledgment."
                        />
                        <RiskRow
                            dotColor="red"
                            status="We Decline"
                            description='Sanctions/toxic exposure, missing documents, "do it with no questions asked" requests, pressure to break rules.'
                            noBorder
                        />
                    </div>
                </section>

                {/* Product Lines */}
                <section>
                    <span className="label">Product Lines</span>
                    <div className="grid-4">
                        <ProductCard
                            title="Banking"
                            description="Personal & corporate accounts, payment support."
                            gradient="var(--accent-magma)"
                        />
                        <ProductCard
                            title="Business Setup"
                            description="Registration, licensing, tax & operating setup."
                            gradient="var(--accent-gold)"
                        />
                        <ProductCard
                            title="Residency"
                            description="Visas & Emirates ID integrated with tax logic."
                            gradient="var(--accent-teal)"
                        />
                        <ProductCard
                            title="Wealth"
                            description="Real estate, wills, foundations, custody."
                            gradient="var(--accent-nebula)"
                        />
                    </div>
                </section>

                {/* CTA */}
                <section style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 120px auto' }}>
                    <h2 style={{ fontSize: '32px' }}>Start with a Pilot</h2>
                    <p className="text-body" style={{ marginBottom: '32px' }}>
                        Get a pre-screen verdict, a commercial offer with clear boundaries, and a delivery plan with control points.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                        <Button href="#">Request Partner Kit</Button>
                        <Button href="#" variant="outline">Submit Case</Button>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    )
}

export default LandingPage
