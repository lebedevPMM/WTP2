import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { trackPageView } from '../lib/analytics'

const Layout: React.FC = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
        trackPageView(pathname)
    }, [pathname])

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
