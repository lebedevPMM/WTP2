import React from 'react'

interface CardProps {
    children: React.ReactNode
    accentGradient?: string
    hasAccentTop?: boolean
    style?: React.CSSProperties
    className?: string
}

const Card: React.FC<CardProps> = ({ children, accentGradient, hasAccentTop = false, style = {}, className = '' }) => {
    const cardStyle: React.CSSProperties = {
        ...style,
        ...(accentGradient ? { '--accent-gradient': accentGradient } as React.CSSProperties : {}),
    }

    return (
        <div className={`card ${className}`} style={cardStyle}>
            {hasAccentTop && <div className="card-accent-top" />}
            {children}
        </div>
    )
}

export default Card
