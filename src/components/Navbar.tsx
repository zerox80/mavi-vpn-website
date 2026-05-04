import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <header className="nav" aria-label="Primary navigation">
            <Link to="/" className="brand" aria-label="Mavi VPN home">
                <span className="brand-mark" aria-hidden="true">
                    <img src="/mavi-logo.png" alt="" />
                </span>
                <span>Mavi VPN</span>
            </Link>

            <nav className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/technology">Technology</Link>
                <Link to="/whitepaper">Whitepaper</Link>
                <a href="https://github.com/zerox80/mavi-vpn" target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
            </nav>

            <div className="nav-actions">
                <a className="button button-compact" href="https://github.com/zerox80/mavi-vpn" target="_blank" rel="noopener noreferrer">
                    Source
                </a>
            </div>
        </header>
    );
}
