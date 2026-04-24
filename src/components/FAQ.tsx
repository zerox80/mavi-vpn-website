import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        question: "How does Mavi VPN bypass firewalls and DPI?",
        answer: "Mavi VPN offers four progressive Censorship Resistance levels. The TLS 1.3 handshake masquerades as HTTP/3 (ALPN h3) and serves a fake Nginx page to active probes. The highest level adds MASQUE/RFC 9484 capsule framing and ECH GREASE with SNI spoofing."
    },
    {
        question: "What is MASQUE and how does it help?",
        answer: "MASQUE (RFC 9484) tunnels IP traffic inside HTTP/3 CONNECT-IP capsules. DPI systems see only legitimate HTTP/3 proxy traffic, making it impossible to distinguish the VPN from a standard HTTP/3 proxy server."
    },
    {
        question: "What does Encrypted Client Hello (ECH) do?",
        answer: "ECH GREASE encrypts the TLS SNI extension using X25519 key exchange and HPKE (RFC 9180). The real destination hostname is hidden while a decoy SNI is visible to passive observers."
    },
    {
        question: "What happens if I switch from Wi-Fi to Mobile Data?",
        answer: "Mavi VPN uses QUIC Connection Migration. Your device seamlessly transitions between network interfaces without breaking the secure tunnel or changing your virtual IP."
    },
    {
        question: "Which platforms are supported?",
        answer: "Windows (Rust + WinTUN), Linux (TUN + systemd), and Android (Kotlin Compose + Rust JNI). Tauri v2 GUI for desktop. iOS is on the roadmap."
    },
    {
        question: "Does it support IPv6?",
        answer: "Yes. Full dual-stack IPv4 + IPv6 with NAT66 via ip6tables. DNS isolation via NRPT rules (Windows) or per-tunnel DNS (Linux/Android) prevents leaks on both stacks."
    },
    {
        question: "Why use Rust instead of C or Go?",
        answer: "Rust provides memory safety without a garbage collector, eliminating buffer overflows, use-after-free, and race conditions while achieving bare-metal performance through zero-copy async datapath."
    },
    {
        question: "What is the 'Pinned MTU' strategy?",
        answer: "We enforce a strict 1280-byte inner payload and 1360-byte outer tunnel (default), eliminating PMTUD black holes. Configurable via VPN_MTU (1280–1360)."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq-section" id="faq">
            <div className="container">
                <div className="section-header text-center faq-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="section-title"
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="section-subtitle"
                        style={{ maxWidth: '550px', marginInline: 'auto' }}
                    >
                        Everything you need to know about deployment, operation, and security.
                    </motion.p>
                </div>

                <div className="faq-container">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05, duration: 0.4 }}
                                className={`faq-item ${isOpen ? 'open' : ''}`}
                            >
                                <button
                                    className="faq-question"
                                    onClick={() => toggleFaq(index)}
                                >
                                    {faq.question}
                                    <motion.div
                                        className="faq-question-icon"
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronDown size={18} />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            key="answer"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2, ease: "easeInOut" }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <p className="faq-answer">{faq.answer}</p>
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
