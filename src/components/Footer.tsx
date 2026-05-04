import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-grid">
                <div>
                    <Link to="/" className="brand footer-brand" aria-label="Mavi VPN home">
                        <span className="brand-mark" aria-hidden="true">
                            <img src="/mavi-logo.png" alt="" />
                        </span>
                        <span>Mavi VPN</span>
                    </Link>
                    <p className="footer-tagline">
                        High-performance, censorship-resistant VPN built on QUIC, MASQUE, ECH, and Rust.
                    </p>
                </div>

                <div className="footer-links">
                    <div className="link-group">
                        <h4 className="link-title">Product</h4>
                        <Link to="/" className="footer-link">Home</Link>
                        <Link to="/technology" className="footer-link">Technology</Link>
                        <Link to="/whitepaper" className="footer-link">Whitepaper</Link>
                    </div>
                    <div className="link-group">
                        <h4 className="link-title">Project</h4>
                        <a href="https://github.com/zerox80/mavi-vpn" target="_blank" rel="noopener noreferrer" className="footer-link">
                            GitHub Repo
                        </a>
                        <a href="https://github.com/zerox80/mavi-vpn/issues" target="_blank" rel="noopener noreferrer" className="footer-link">
                            Issues
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Mavi Dev Team.</p>
                <a href="#top">Back to top</a>
            </div>
        </footer>
    );
}
