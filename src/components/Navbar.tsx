import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { GitHub } from './icons/GitHub';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="nav" onKeyDown={(event) => { if (event.key === 'Escape') setMenuOpen(false); }}>
            <Link to="/" className="brand" aria-label="Mavi VPN home" onClick={() => setMenuOpen(false)}>
                <span className="brand-mark" aria-hidden="true">
                    <img src="/mavi-logo.png" alt="" />
                </span>
                <span>mavi<span className="brand-vpn">VPN</span></span>
            </Link>

            <nav className={`nav-links${menuOpen ? ' is-open' : ''}`} id="primary-navigation" aria-label="Primary navigation">
                <NavLink to="/" end onClick={() => setMenuOpen(false)}>Overview</NavLink>
                <NavLink to="/technology" onClick={() => setMenuOpen(false)}>Technology</NavLink>
                <NavLink to="/whitepaper" onClick={() => setMenuOpen(false)}>Whitepaper</NavLink>
            </nav>

            <div className="nav-actions">
                <a className="button button-compact icon-link" href="https://github.com/zerox80/mavi-vpn" target="_blank" rel="noopener noreferrer" aria-label="Mavi VPN on GitHub">
                    <GitHub size={14} />
                    <span>GitHub</span><ArrowUpRight size={14} aria-hidden="true" />
                </a>
            </div>
            <button
                className="nav-toggle"
                type="button"
                aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
                aria-expanded={menuOpen}
                aria-controls="primary-navigation"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
        </header>
    );
}
