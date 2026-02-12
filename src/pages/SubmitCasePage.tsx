import React from 'react'
import { Link } from 'react-router-dom'

const SubmitCasePage: React.FC = () => {
    return (
        <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
            <h1>Submit a Case</h1>
            <p className="subtitle">Start the pre-screen process.</p>

            <div style={{ marginTop: '40px' }}>
                <div style={{ maxWidth: '600px', background: '#0F0F0F', padding: '32px', borderRadius: '12px' }}>
                    <p className="text-body" style={{ marginBottom: '16px' }}>Please provide the following details:</p>
                    <ul className="text-body" style={{ marginLeft: '20px', marginBottom: '24px' }}>
                        <li>Client Nationality & Residency</li>
                        <li>Business Activity</li>
                        <li>Preferred Banking Jurisdiction</li>
                        <li>Source of Funds origin</li>
                    </ul>
                    <p className="text-body" style={{ fontSize: '13px', color: '#999' }}>Note: This form is a placeholder.</p>
                </div>
                <Link to="/" className="btn btn-outline" style={{ marginTop: '24px' }}>Back to Home</Link>
            </div>
        </div>
    )
}

export default SubmitCasePage
