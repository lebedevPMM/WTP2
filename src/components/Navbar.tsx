import React from 'react'

const navLinks = [
    { label: 'Process', href: '#process' },
    { label: 'Partners', href: '#partners' },
    { label: 'Risk', href: '#risk' },
    { label: 'Contact', href: '#contact' },
]

const Navbar: React.FC = () => {
    return (
        <nav className="nav">
            <div className="brand">WTP</div>
            <div className="nav-links">
                {navLinks.map((link) => (
                    <a key={link.label} href={link.href} className="nav-link">
                        {link.label}
                    </a>
                ))}
            </div>
        </nav>
    )
}

export default Navbar
