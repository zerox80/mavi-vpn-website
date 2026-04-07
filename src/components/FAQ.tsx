import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        question: "How does Mavi VPN bypass firewalls and DPI?",
        answer: "Mavi VPN utilizes an advanced Censorship Resistance (CR) Mode. Instead of broadcasting standard VPN signatures, the TLS 1.3 handshake masquerades as standard HTTP/3 traffic. If an active probe queries the server, it responds with a generic Nginx 200 OK HTML page."
    },
    {
        question: "What happens if I switch from Wi-Fi to Mobile Data?",
        answer: "Unlike traditional VPNs that drop your connection and force a re-handshake, Mavi VPN utilizes QUIC Connection Migration. This allows your device to seamlessly transition between network interfaces without breaking the secure tunnel or changing your virtual IP, maintaining active TCP sessions."
    },
    {
        question: "Does it support both PC and Mobile?",
        answer: "Yes. Our ecosystem includes a native high-performance Rust Windows client leveraging WinTUN, and a sleek Android application built with Kotlin Jetpack Compose paired with our native Rust JNI Core. Both guarantee zero-copy performance."
    },
    {
        question: "How are enterprise users authenticated?",
        answer: "We support Keycloak OIDC integration. The Mavi VPN server acts as a Resource Server, dynamically authenticating JSON Web Tokens (JWT) against Keycloak's public JWKS endpoints. This fully supports MFA, SSO, and centralized corporate access control."
    },
    {
        question: "Why use Rust instead of C or Go?",
        answer: "Rust provides absolute memory safety without needing a garbage collector. By building the Mavi VPN core in Rust, we completely eliminate entire classes of vulnerabilities (like buffer overflows) while achieving bare-metal performance through our zero-copy asynchronous datapath."
    },
    {
        question: "What is the 'Pinned MTU' strategy?",
        answer: "Many legacy VPNs fail on constrained networks (like DSL) because packets become too large and fragment. We solve this by strictly pinning the internal virtual network payload to exactly 1280 bytes, guaranteeing seamless passage without 'Packet Too Big' black holes."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq-section" id="faq" style={{ padding: 'var(--spacing-xl) 0', background: 'var(--bg-secondary)' }}>
            <div className="container">
                <div className="section-header text-center" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="section-title"
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="section-subtitle" 
                        style={{ maxWidth: '600px', marginInline: 'auto' }}
                    >
                        Everything you need to know about the deployment, operation, and security of Mavi VPN.
                    </motion.p>
                </div>

                <div className="faq-container" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className={`faq-item glass-panel ${isOpen ? 'open' : ''}`}
                                style={{
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border-light)',
                                    overflow: 'hidden',
                                    background: 'var(--bg-primary)'
                                }}
                            >
                                <button
                                    className="faq-question"
                                    onClick={() => toggleFaq(index)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '1.25rem',
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--text-primary)',
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        textAlign: 'left'
                                    }}
                                >
                                    {faq.question}
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ flexShrink: 0, marginLeft: '1rem' }}
                                    >
                                        <ChevronDown size={20} className="text-secondary" />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <p
                                                className="faq-answer"
                                                style={{
                                                    padding: '0 1.25rem 1.25rem',
                                                    color: 'var(--text-secondary)',
                                                    lineHeight: '1.6',
                                                    margin: 0
                                                }}
                                            >
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
