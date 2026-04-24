import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        question: "How does Mavi VPN bypass firewalls and DPI?",
        answer: "Mavi VPN offers four progressive Censorship Resistance levels. At the base level, the TLS 1.3 handshake masquerades as HTTP/3 (ALPN h3) and serves a fake Nginx page to active probes. The highest level adds MASQUE/RFC 9484 capsule framing and ECH GREASE with SNI spoofing via X25519/HPKE — making the traffic indistinguishable from a browser visiting a website with Encrypted Client Hello."
    },
    {
        question: "What is MASQUE and how does it help?",
        answer: "MASQUE (RFC 9484) is a protocol that tunnels IP traffic inside HTTP/3 CONNECT-IP capsules. When enabled, Mavi VPN wraps all tunneled packets in standards-compliant HTTP/3 capsule frames. DPI systems that parse QUIC frames see only legitimate HTTP/3 proxy traffic, making it impossible to distinguish the VPN from a standard HTTP/3 proxy server."
    },
    {
        question: "What does Encrypted Client Hello (ECH) do?",
        answer: "ECH GREASE encrypts the TLS Server Name Indication (SNI) extension using X25519 key exchange and HPKE (RFC 9180). The real destination hostname is hidden inside an encrypted extension, while a decoy SNI (e.g., cloudflare-ech.com) is visible to passive observers. This prevents DPI systems from blocking connections based on the destination domain."
    },
    {
        question: "What happens if I switch from Wi-Fi to Mobile Data?",
        answer: "Unlike traditional VPNs that drop your connection and force a re-handshake, Mavi VPN utilizes QUIC Connection Migration. This allows your device to seamlessly transition between network interfaces without breaking the secure tunnel or changing your virtual IP, maintaining active TCP sessions."
    },
    {
        question: "Which platforms are supported?",
        answer: "Mavi VPN supports Windows (Rust + WinTUN kernel driver), Linux (TUN via /dev/net/tun with systemd daemon), and Android (Kotlin Jetpack Compose + Rust JNI Core). The Tauri v2 GUI runs on both Windows and Linux. Installers are available as MSI/NSIS (Windows), DEB/RPM/AppImage (Linux), and APK (Android). iOS support is on the roadmap."
    },
    {
        question: "Does it support IPv6?",
        answer: "Yes. Mavi VPN provides full dual-stack IPv4 + IPv6 support. The server assigns both an IPv4 address (e.g., 10.8.0.x) and an IPv6 ULA address (fd00::x) to each client. NAT66 is configured via ip6tables to route IPv6 traffic through the tunnel. DNS isolation via NRPT rules (Windows) or per-tunnel DNS (Linux/Android) prevents leaks on both stacks."
    },
    {
        question: "How are enterprise users authenticated?",
        answer: "We support Keycloak OIDC integration with PKCE, JWT validation against public JWKS endpoints, and JWKS rotation. The OAuth flow includes CSRF protection. This supports MFA, SSO, and centralized corporate access control — ideal for enterprise deployments."
    },
    {
        question: "Why use Rust instead of C or Go?",
        answer: "Rust provides absolute memory safety without needing a garbage collector. By building the Mavi VPN core in Rust, we eliminate entire classes of vulnerabilities (buffer overflows, use-after-free, race conditions) while achieving bare-metal performance through zero-copy asynchronous datapath with mimalloc for optimized memory allocation."
    },
    {
        question: "What is the 'Pinned MTU' strategy?",
        answer: "Many legacy VPNs fail on constrained networks (DS-Lite, PPPoE) because packets fragment. We enforce a strict 1280-byte inner payload and 1360-byte outer tunnel (default), eliminating PMTUD black holes. The MTU is now configurable via VPN_MTU (range 1280–1360) for environments that need different values."
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

                <div className="faq-container">
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
                            >
                                <button
                                    className="faq-question"
                                    onClick={() => toggleFaq(index)}
                                >
                                    {faq.question}
                                    <motion.div
                                        className="faq-question-icon"
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown size={20} />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            key="answer"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <p className="faq-answer">
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
