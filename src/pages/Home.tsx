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
                    className="cta-panel glass-panel"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="cta-icon">
                        <FileText size={24} />
                    </div>
                    <h3 className="cta-title">Want to look under the hood?</h3>
                    <p className="cta-subtitle">
                        Explore MASQUE framing, ECH GREASE, the Pinned MTU engine, and the QUIC Zero-Copy datapath in our technical deep dive.
                    </p>
                    <div className="cta-actions">
                        <a href="/technology" className="btn-primary">
                            Read Technical Deep Dive <ArrowRight size={16} style={{ marginLeft: '0.4rem' }} />
                        </a>
                        <a href="/whitepaper" className="btn-secondary">
                            Read Whitepaper
                        </a>
                    </div>
                </motion.div>
            </section>

            <FAQ />
        </div>
    );
}
