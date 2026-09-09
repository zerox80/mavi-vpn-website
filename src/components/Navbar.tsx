import { useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowDown, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="nav" onKeyDown={(event) => {
            if (event.key === 'Escape' && menuOpen) {
                closeMenu();
                toggleRef.current?.focus();
            }
        }}>
            <Link to="/" className="brand" aria-label="Mavi VPN home" onClick={closeMenu}>
                <span className="brand-mark" aria-hidden="true"><img src="/mavi-logo.png" alt="" width="32" height="32" /></span>
                <span>mavi<span className="brand-vpn">VPN</span></span>
            </Link>
            <nav className={`nav-links${menuOpen ? ' is-open' : ''}`} id="primary-navigation" aria-label="Primary navigation">
                <NavLink to="/" end onClick={closeMenu}>Overview</NavLink>
                <NavLink to="/technology" onClick={closeMenu}>Technology</NavLink>
                <NavLink to="/whitepaper" onClick={closeMenu}>Whitepaper</NavLink>
            </nav>
            <Link className="nav-download" to="/#downloads" onClick={closeMenu}>Download <ArrowDown size={15} aria-hidden="true" /></Link>
            <button ref={toggleRef} className="nav-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
        </header>
    );
}
