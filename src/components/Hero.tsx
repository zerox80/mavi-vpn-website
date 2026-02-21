import { Link } from 'react-router-dom';
import { ShieldAlert, Zap, Lock } from 'lucide-react';

export default function Hero() {
    return (
        <section className="hero-section" id="home">
            <div className="container hero-container">

                {/* Abstract Background Element (CSS based) */}
                <div className="hero-glow"></div>

                <div className="hero-content animate-fade-in">
                    <div className="badge">
                        <span className="badge-pulse"></span>
                        Protocol: QUIC / UDP
                    </div>

                    <h1 className="hero-title">
                        Invisibility Meets <span className="text-accent">Performance.</span>
                    </h1>

                    <p className="hero-subtitle">
                        The next-generation VPN engineered to defeat Deep Packet Inspection.
                        Powered by HTTP/3 masquerading and a Zero-Copy Rust datapath.
                    </p>

                    <div className="hero-actions">
                        <a href="https://github.com/zerox80/mavi-vpn" target="_blank" rel="noopener noreferrer" className="btn-primary">
                            GitHub Repo
                        </a>
                        <Link to="/technology" className="btn-secondary">
                            Read Architecture
                        </Link>
                    </div>

                    <div className="hero-features">
                        <div className="feature-mini">
                            <Zap className="feature-icon text-accent" size={20} />
                            <span>BBR Congestion Control</span>
                        </div>
                        <div className="feature-mini">
                            <ShieldAlert className="feature-icon text-accent" size={20} />
                            <span>CR Mode (Anti-Censorship)</span>
                        </div>
                        <div className="feature-mini">
                            <Lock className="feature-icon text-accent" size={20} />
                            <span>Pinned MTU Engine</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
