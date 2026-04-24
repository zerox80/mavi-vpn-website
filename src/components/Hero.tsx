import { Link } from 'react-router-dom';
import { ShieldAlert, Zap, Globe2, ShieldCheck, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="hero-section" id="home">
            <div className="container hero-container">

                <div className="hero-glow"></div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="hero-content"
                >
                    <div className="hero-shield-icon">
                        <Shield size={28} strokeWidth={1.5} />
                    </div>

                    <div className="badge">
                        <span className="badge-pulse"></span>
                        v0.9 &middot; QUIC / HTTP/3 &middot; Rust
                    </div>

                    <h1 className="hero-title">
                        Invisibility Meets <span className="text-accent">Performance.</span>
                    </h1>

                    <p className="hero-subtitle">
                        The next-generation cross-platform VPN engineered to defeat Deep Packet Inspection.
                        MASQUE framing, ECH GREASE, and a Zero-Copy Rust datapath &mdash; across Windows, Linux, and Android.
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
                            <ShieldCheck className="feature-icon text-accent" size={20} />
                            <span>ECH GREASE + MASQUE</span>
                        </div>
                        <div className="feature-mini">
                            <Zap className="feature-icon text-accent" size={20} />
                            <span>BBR + GSO/GRO</span>
                        </div>
                        <div className="feature-mini">
                            <ShieldAlert className="feature-icon text-accent" size={20} />
                            <span>4&times; CR Levels</span>
                        </div>
                        <div className="feature-mini">
                            <Globe2 className="feature-icon text-accent" size={20} />
                            <span>Win / Linux / Android</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
