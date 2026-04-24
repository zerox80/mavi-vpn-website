import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const closeMobile = () => setMobileOpen(false);

    return (
        <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="container navbar-container">
                <Link to="/" className="logo-group" onClick={closeMobile}>
                    <div className="logo-icon-wrapper">
                        <img src="/mavi-logo.png" alt="Mavi VPN Logo" style={{ height: '40px', width: 'auto', borderRadius: '8px' }} />
                    </div>
                    <span className="logo-text">Mavi<span className="logo-accent">VPN</span></span>
                </Link>

                <nav className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/technology" className="nav-link">Technology</Link>
                    <Link to="/whitepaper" className="nav-link">Whitepaper</Link>
                    <a href="https://github.com/zerox80/mavi-vpn" target="_blank" rel="noopener noreferrer" className="nav-link">GitHub</a>
                </nav>

                <div className="nav-actions">
                    <a href="https://github.com/zerox80/mavi-vpn" target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm nav-cta-desktop">GitHub</a>
                    <button className="mobile-menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                        <nav className="mobile-menu-links">
                            <Link to="/" className="mobile-menu-link" onClick={closeMobile}>Home</Link>
                            <Link to="/technology" className="mobile-menu-link" onClick={closeMobile}>Technology</Link>
                            <Link to="/whitepaper" className="mobile-menu-link" onClick={closeMobile}>Whitepaper</Link>
                            <a href="https://github.com/zerox80/mavi-vpn" target="_blank" rel="noopener noreferrer" className="mobile-menu-link" onClick={closeMobile}>GitHub</a>
                        </nav>
                        <div className="mobile-menu-actions">
                            <a href="https://github.com/zerox80/mavi-vpn" target="_blank" rel="noopener noreferrer" className="btn-primary" onClick={closeMobile}>GitHub</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
