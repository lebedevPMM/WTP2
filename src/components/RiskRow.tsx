import React from 'react'

interface RiskRowProps {
    status: string
    description: string
    dotColor: 'green' | 'yellow' | 'red'
    noBorder?: boolean
}

const RiskRow: React.FC<RiskRowProps> = ({ status, description, dotColor, noBorder = false }) => {
    return (
        <div className="risk-row" style={noBorder ? { borderBottom: 'none' } : {}}>
            <div className="risk-status">
                <span className={`dot ${dotColor}`} />
                {status}
            </div>
            <p className="text-body">{description}</p>
        </div>
    )
}

export default RiskRow
