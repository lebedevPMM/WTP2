import React from 'react'

const Footer: React.FC = () => {
    return (
        <footer id="contact">
            <div className="container grid-4">
                <div>
                    <div className="brand" style={{ marginBottom: '24px' }}>WTP</div>
                    <p className="text-body" style={{ fontSize: '13px' }}>UAE Execution Partner.</p>
                </div>
                <div>
                    <span className="label">Contact</span>
                    <p className="text-body" style={{ marginBottom: '8px' }}>email@wtp.uae</p>
                    <p className="text-body">Telegram: @wtp_uae</p>
                </div>
                <div>
                    <span className="label">Legal</span>
                    <p className="text-body" style={{ marginBottom: '8px' }}>Terms of Service</p>
                    <p className="text-body">Privacy Policy</p>
                </div>
                <div>
                    <span className="label">Office</span>
                    <p className="text-body">
                        Dubai International Financial Centre<br />
                        Dubai, UAE
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
