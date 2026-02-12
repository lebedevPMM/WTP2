import React from 'react'
import { Link } from 'react-router-dom'

const UpdatesPage: React.FC = () => {
    return (
        <div className="container" style={{ paddingBottom: '120px' }}>
            <section className="hero-section" style={{ minHeight: 'auto', marginBottom: '80px' }}>
                <div className="label" style={{ marginBottom: '32px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>← Back to Overview</Link>
                </div>
                <h1>Updates</h1>
                <div className="label" style={{ marginBottom: '16px' }}>CHANGELOG</div>
                <p className="subtitle" style={{ marginBottom: 0 }}>
                    Latest updates on banking scenarios, regulatory changes, and new product capabilities.
                </p>
            </section>

            <section style={{ marginTop: '40px' }}>
                <p className="text-body">No updates yet.</p>
                <Link to="/" className="btn btn-outline" style={{ marginTop: '24px' }}>Back to Home</Link>
            </section>
        </div>
    )
}

export default UpdatesPage
