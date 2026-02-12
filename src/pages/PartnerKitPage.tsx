import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar' // Wait, Navbar is in Layout. But PartnerKitPage is rendered inside Layout. So no Navbar needed.
// Ah, previous PartnerKitPage had no layout wrapper? No, it's rendered in App inside Layout. Correct.

const PartnerKitPage: React.FC = () => {
    return (
        <div className="container" style={{ paddingBottom: '120px' }}>
            <section className="hero-section" style={{ minHeight: 'auto', marginBottom: '80px' }}>
                <div className="label" style={{ marginBottom: '32px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>← Back to Overview</Link>
                </div>
                <h1>Partner Kit</h1>
                <div className="label" style={{ marginBottom: '16px' }}>PILOT PROGRAM</div>
                <p className="subtitle" style={{ marginBottom: 0 }}>
                    Get access to the WTP partner documentation, onboarding pack, and submit your first case.
                </p>
            </section>

            <section className="grid-2">
                <div>
                    <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Download One Pager</h2>
                    <p className="text-body" style={{ marginBottom: '32px' }}>
                        A concise overview of our partnership model, risk framework, and product lines. ideal for sharing involved stakeholders.
                    </p>
                    <a href="/WTP_One_Pager.pdf" target="_blank" rel="noopener noreferrer" className="btn">
                        Download PDF
                    </a>
                    <div style={{ marginTop: '40px' }}>
                        <Link to="/" className="btn btn-outline">Back to Home</Link>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <a href="/WTP_One_Pager.pdf" target="_blank" rel="noopener noreferrer" style={{ display: 'block', border: '1px solid var(--border-subtle)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                        <img src="/WTP_One_Pager_preview.png" alt="WTP One Pager Preview" style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
                    </a>
                </div>
            </section>
        </div>
    )
}

export default PartnerKitPage
