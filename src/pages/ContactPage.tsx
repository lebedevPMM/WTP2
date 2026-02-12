import React from 'react'
import { Link } from 'react-router-dom'

const ContactPage: React.FC = () => {
    return (
        <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
            <h1>Contact Us</h1>
            <p className="subtitle">Get in touch with our team.</p>

            <div style={{ marginTop: '40px' }}>
                <p className="text-body">Email: email@wtp.uae</p>
                <p className="text-body">Telegram: @wtp_uae</p>
                <Link to="/" className="btn btn-outline" style={{ marginTop: '24px' }}>Back to Home</Link>
            </div>
        </div>
    )
}

export default ContactPage
