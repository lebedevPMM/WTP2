import React from 'react'
import { Link } from 'react-router-dom'

interface ButtonProps {
    children: React.ReactNode
    href?: string
    variant?: 'primary' | 'outline'
    onClick?: () => void
    className?: string
}

const Button: React.FC<ButtonProps> = ({ children, href = '#', variant = 'primary', onClick, className = '' }) => {
    const classes = `btn ${variant === 'outline' ? 'btn-outline' : ''} ${className}`.trim()

    const isExternal = href.startsWith('http') || href.startsWith('mailto:')

    if (isExternal) {
        return (
            <a href={href} className={classes} onClick={onClick} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        )
    }

    return (
        <Link to={href} className={classes} onClick={onClick}>
            {children}
        </Link>
    )
}

export default Button
