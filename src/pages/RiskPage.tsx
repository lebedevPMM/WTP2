import React from 'react'
import { Link } from 'react-router-dom'

const RiskPage: React.FC = () => {
    return (
        <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
            <h1>Risk Policy</h1>
            <p className="subtitle">We prioritize long-term stability and compliance.</p>

            <div style={{ marginTop: '40px' }}>
                <p className="text-body">This page is under construction.</p>
                <Link to="/" className="btn btn-outline" style={{ marginTop: '24px' }}>Back to Home</Link>
            </div>
        </div>
    )
}

export default RiskPage
