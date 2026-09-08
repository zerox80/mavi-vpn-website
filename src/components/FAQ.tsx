import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    return (
        <section className="faq-section" id="faq" aria-labelledby="faq-title">
            <div className="faq-header">
                <div><p className="eyebrow">03 / A little more clarity</p><h2 id="faq-title">Good questions.<br /><span className="heading-muted">Clear answers.</span></h2></div>
                <p>From the protocol to your platform. <br />Get to know Mavi a little better.</p>
                <Link className="text-link" to="/whitepaper">Read the whitepaper →</Link>
            </div>
            <div className="faq-container">
                {faqs.map((faq) => (
                    <details className="faq-item" name="mavi-faq" key={faq.question}>
                        <summary className="faq-question">{faq.question}<ChevronDown size={16} aria-hidden="true" /></summary>
                        <p className="faq-answer">{faq.answer}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}
