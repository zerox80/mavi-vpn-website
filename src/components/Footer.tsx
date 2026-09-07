import { Link } from 'react-router-dom';
import { GitHub } from './icons/GitHub';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-main">
                <Link to="/" className="brand" aria-label="Mavi VPN home"><span className="brand-mark" aria-hidden="true"><img src="/mavi-logo.png" alt="" /></span><span>Mavi VPN</span></Link>
                <nav className="footer-links" aria-label="Footer navigation">
                    <Link to="/" className="footer-link">Home</Link>
                    <Link to="/technology" className="footer-link">Technology</Link>
                    <Link to="/whitepaper" className="footer-link">Whitepaper</Link>
                    <a href="https://github.com/zerox80/mavi-vpn" target="_blank" rel="noopener noreferrer" className="footer-link icon-link"><GitHub size={14} /> GitHub</a>
                    <a href="https://github.com/zerox80/mavi-vpn/issues" target="_blank" rel="noopener noreferrer" className="footer-link">Issues</a>
                </nav>
            </div>
            <div className="footer-bottom"><p>© {new Date().getFullYear()} Mavi Dev Team. Open source under the MIT license.</p><a href="#top">Back to top ↑</a></div>
        </footer>
    );
}
