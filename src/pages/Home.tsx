import { ArrowRight, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Features from '../components/Features';
import FAQ from '../components/FAQ';

export default function Home() {
    return (
        <div className="animate-fade-in">
            <Hero />
            <Features />

            <section className="cta-section">
                <motion.div
                    className="cta-panel"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="cta-icon">
                        <FileText size={22} />
                    </div>
                    <h3 className="cta-title">Want to look under the hood?</h3>
                    <p className="cta-subtitle">
                        Explore MASQUE framing, ECH GREASE, the Pinned MTU engine, and the QUIC Zero-Copy datapath.
                    </p>
                    <div className="cta-actions">
                        <a href="/technology" className="btn-primary">
                            Technical Deep Dive <ArrowRight size={15} style={{ marginLeft: '0.3rem' }} />
                        </a>
                        <a href="/whitepaper" className="btn-secondary">
                            Whitepaper
                        </a>
                    </div>
                </motion.div>
            </section>

            <FAQ />
        </div>
    );
}
