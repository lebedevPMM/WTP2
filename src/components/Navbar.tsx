import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const isHome = location.pathname === '/'

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
        e.preventDefault()

        if (isHome) {
            const el = document.getElementById(anchor)
            if (el) {
                const offset = 80 // Height of navbar approx
                const bodyRect = document.body.getBoundingClientRect().top
                const elementRect = el.getBoundingClientRect().top
                const elementPosition = elementRect - bodyRect
                const offsetPosition = elementPosition - offset

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                })
            }
        } else {
            navigate('/')
            setTimeout(() => {
                const el = document.getElementById(anchor)
                if (el) {
                    const offset = 80
                    const bodyRect = document.body.getBoundingClientRect().top
                    const elementRect = el.getBoundingClientRect().top
                    const elementPosition = elementRect - bodyRect
                    const offsetPosition = elementPosition - offset

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    })
                }
            }, 100)
        }
    }

    return (
        <nav className="nav">
            <Link to="/" className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>WTP</Link>
            <div className="nav-links">
                <a href="#process" className="nav-link" onClick={(e) => handleNavClick(e, 'process')}>Process</a>
                <a href="#partners" className="nav-link" onClick={(e) => handleNavClick(e, 'partners')}>Partners</a>
                <a href="#risk" className="nav-link" onClick={(e) => handleNavClick(e, 'risk')}>Risk</a>
                <Link to="/contact" className="nav-link">Contact</Link>
            </div>
        </nav>
    )
}

export default Navbar
