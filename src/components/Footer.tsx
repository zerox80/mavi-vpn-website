

import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="footer-brand-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <img src="/mavi-logo.png" alt="Mavi VPN Logo" style={{ height: '32px', width: 'auto', borderRadius: '6px' }} />
                            <span className="logo-text">Mavi<span className="logo-accent">VPN</span></span>
                        </div>
                        <p className="footer-tagline">Engineered for absolute invisibility and uncompromised performance.</p>
                    </div>
                    <div className="footer-links">
                        <div className="link-group">
                            <h4 className="link-title">Product</h4>
                            <Link to="/" className="footer-link">Home</Link>
                            <Link to="/technology" className="footer-link">Technology</Link>
                            <a href="https://github.com/zerox80/mavi-vpn" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub Repo</a>
                        </div>
                        <div className="link-group">
                            <h4 className="link-title">Legal</h4>
                            <a href="#" className="footer-link">Privacy Policy</a>
                            <a href="#" className="footer-link">Terms of Service</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Mavi Dev Team. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
