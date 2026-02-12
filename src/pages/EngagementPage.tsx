import React from 'react'
import { Link } from 'react-router-dom'

const EngagementPage: React.FC = () => {
    return (
        <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
            <h1>Engagement Models</h1>
            <p className="subtitle">Referral vs. White-label.</p>

            <div style={{ marginTop: '40px' }}>
                <p className="text-body">Detailed comparison of our partnership models.</p>
                <Link to="/" className="btn btn-outline" style={{ marginTop: '24px' }}>Back to Home</Link>
            </div>
        </div>
    )
}

export default EngagementPage
