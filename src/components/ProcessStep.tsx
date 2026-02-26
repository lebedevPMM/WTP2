import React from 'react'

interface ProcessStepProps {
    number: string
    title: string
    description: React.ReactNode
    active?: boolean
}

const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description, active = false }) => {
    return (
        <div className={`process-step ${active ? 'active' : ''}`}>
            <span className="pill">{number}</span>
            <h3>{title}</h3>
            <p className="text-body">{description}</p>
        </div>
    )
}

export default ProcessStep
