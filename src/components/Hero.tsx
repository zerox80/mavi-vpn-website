import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, ShieldAlert, Globe2 } from 'lucide-react';
import { motion } from 'framer-motion';
import TerminalMockup from './TerminalMockup';

export default function Hero() {
    return (
        <section className="hero-section" id="home">
            <div className="container hero-container">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="hero-content"
                >
                    <div className="badge">
                        <span className="badge-pulse"></span>
                        v0.9 · QUIC / HTTP/3 · Rust
                    </div>

                    <h1 className="hero-title">
                        Invisibility Meets <span className="text-accent">Performance.</span>
                    </h1>

                    <p className="hero-subtitle">
                        Next-gen cross-platform VPN engineered to defeat Deep Packet Inspection.
                        MASQUE framing, ECH GREASE, and a Zero-Copy Rust datapath.
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
                            <ShieldCheck className="feature-icon text-accent" size={16} />
                            <span>ECH + MASQUE</span>
                        </div>
                        <div className="feature-mini">
                            <Zap className="feature-icon text-accent" size={16} />
                            <span>BBR + GSO</span>
                        </div>
                        <div className="feature-mini">
                            <ShieldAlert className="feature-icon text-accent" size={16} />
                            <span>4× CR Levels</span>
                        </div>
                        <div className="feature-mini">
                            <Globe2 className="feature-icon text-accent" size={16} />
                            <span>Win / Linux / Android</span>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    >
                        <TerminalMockup />
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
