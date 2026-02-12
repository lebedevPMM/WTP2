import React from 'react'

interface ButtonProps {
    children: React.ReactNode
    href?: string
    variant?: 'primary' | 'outline'
    onClick?: () => void
    className?: string
}

const Button: React.FC<ButtonProps> = ({ children, href = '#', variant = 'primary', onClick, className = '' }) => {
    const classes = `btn ${variant === 'outline' ? 'btn-outline' : ''} ${className}`.trim()

    return (
        <a href={href} className={classes} onClick={onClick}>
            {children}
        </a>
    )
}

export default Button
