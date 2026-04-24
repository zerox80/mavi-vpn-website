import { EyeOff, Cpu, Globe2, Zap, Smartphone, Key, ShieldCheck, Network } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const features = [
    {
        icon: <EyeOff className="text-accent" size={28} strokeWidth={1.5} />,
        title: 'Censorship Resistance',
        description: 'Four progressive obfuscation levels: ALPN h3 masquerading, active probe resistance, MASQUE/RFC 9484 capsule framing, and ECH GREASE.',
    },
    {
        icon: <ShieldCheck className="text-accent" size={28} strokeWidth={1.5} />,
        title: 'Encrypted Client Hello',
        description: 'ECH GREASE with X25519/HPKE (RFC 9180) spoofs the SNI extension during TLS handshakes. DPI cannot determine the true destination.',
    },
    {
        icon: <Globe2 className="text-accent" size={28} strokeWidth={1.5} />,
        title: 'Pinned MTU Strategy',
        description: 'Solves "Packet Too Big" black holes. Strict 1280B inner payload and 1360B outer tunnel guarantee zero fragmentation globally.',
    },
    {
        icon: <Cpu className="text-accent" size={28} strokeWidth={1.5} />,
        title: 'Zero-Copy Rust Core',
        description: 'Engineered in Rust with GSO/GRO offloading, BBR congestion control, mimalloc, and 4 MB UDP buffers. No memory cloning.',
    },
    {
        icon: <Smartphone className="text-accent" size={28} strokeWidth={1.5} />,
        title: 'Cross-Platform',
        description: 'Windows (WinTUN), Linux (TUN + systemd), Android (Kotlin + Rust JNI). Tauri v2 GUI with system tray.',
    },
    {
        icon: <Network className="text-accent" size={28} strokeWidth={1.5} />,
        title: 'Dual-Stack & DNS',
        description: 'Full IPv4 + IPv6 with NAT66. NRPT rules on Windows and per-tunnel DNS on Linux/Android prevent leaks.',
    },
    {
        icon: <Key className="text-accent" size={28} strokeWidth={1.5} />,
        title: 'Enterprise Identity',
        description: 'Keycloak OIDC with PKCE, JWT validation, JWKS rotation, and SSO. CSRF protection on the OAuth flow.',
    },
    {
        icon: <Zap className="text-accent" size={28} strokeWidth={1.5} />,
        title: 'Seamless Roaming',
        description: 'QUIC connection migration shifts between Wi-Fi and 5G. Per-app split tunneling on Android. No re-handshake.',
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

export default function Features() {
    return (
        <section className="features-section" id="features">
            <div className="container">

                <div className="section-header text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="section-title"
                    >
                        Engineered for Hostile Networks.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="section-subtitle"
                    >
                        Not another WireGuard wrapper. A ground-up QUIC implementation with progressive
                        censorship resistance, zero-copy datapath, and cross-platform support.
                    </motion.p>
                </div>

                <motion.div
                    className="features-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    {features.map((feature, index) => (
                        <motion.div key={index} className="feature-card" variants={itemVariants}>
                            <div className="feature-icon-wrapper">
                                {feature.icon}
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
