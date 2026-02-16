import React from 'react'

interface LogoProps {
    variant?: 'black' | 'white'
    height?: number
    className?: string
}

const Logo: React.FC<LogoProps> = ({ variant = 'black', height = 48, className }) => {
    const src = variant === 'black'
        ? `${import.meta.env.BASE_URL}logo-black.svg`
        : `${import.meta.env.BASE_URL}logo-white.svg`

    return (
        <img
            src={src}
            alt="WTP"
            height={height}
            className={className}
            style={{ display: 'block' }}
        />
    )
}

export default Logo
