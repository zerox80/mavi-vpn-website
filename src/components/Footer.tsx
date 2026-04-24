import { Link } from 'react-router-dom';
import { Github, ArrowUp } from 'lucide-react';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="footer-brand-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <img src="/mavi-logo.png" alt="Mavi VPN Logo" style={{ height: '48px', width: 'auto', borderRadius: '8px' }} />
                            <span className="logo-text">Mavi<span className="logo-accent">VPN</span></span>
                        </div>
                        <p className="footer-tagline">High-performance, censorship-resistant VPN built with Rust. v0.9</p>
                        <div className="footer-social">
                            <a href="https://github.com/zerox80/mavi-vpn" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="GitHub">
                                <Github size={18} />
                            </a>
                        </div>
                    </div>
                    <div className="footer-links">
                        <div className="link-group">
                            <h4 className="link-title">Product</h4>
                            <Link to="/" className="footer-link">Home</Link>
                            <Link to="/technology" className="footer-link">Technology</Link>
                            <Link to="/whitepaper" className="footer-link">Whitepaper</Link>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <p>&copy; {new Date().getFullYear()} Mavi Dev Team. All rights reserved.</p>
                        <button className="footer-back-top" onClick={scrollToTop}>
                            Back to top <ArrowUp size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
