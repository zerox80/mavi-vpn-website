import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="container navbar-container">
                <Link to="/" className="logo-group">
                    <div className="logo-icon-wrapper">
                        <img src="/mavi-logo.png" alt="Mavi VPN Logo" style={{ height: '48px', width: 'auto', borderRadius: '8px' }} />
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
                    <a href="https://github.com/zerox80/mavi-vpn" target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm">GitHub Repo</a>
                </div>
            </div>
        </header>
    );
}
