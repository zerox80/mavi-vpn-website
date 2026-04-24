import { EyeOff, Cpu, Globe2, Zap, Smartphone, Key, ShieldCheck, Network } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const features = [
    {
        icon: <EyeOff className="text-accent" size={32} strokeWidth={1.5} />,
        title: 'Censorship Resistance',
        description: 'Four progressive obfuscation levels: ALPN h3 masquerading, active probe resistance with Nginx simulation, MASQUE/RFC 9484 capsule framing, and ECH GREASE with SNI spoofing. Indistinguishable from browser traffic.',
    },
    {
        icon: <ShieldCheck className="text-accent" size={32} strokeWidth={1.5} />,
        title: 'Encrypted Client Hello',
        description: 'ECH GREASE with X25519/HPKE (RFC 9180) spoofs the SNI extension during TLS handshakes. DPI systems cannot determine the true destination, even from passive inspection of the ClientHello.',
    },
    {
        icon: <Globe2 className="text-accent" size={32} strokeWidth={1.5} />,
        title: 'The Pinned MTU Strategy',
        description: 'Solves "Packet Too Big" black holes. We enforce a strict 1280 Byte inner payload and a 1360 Byte outer tunnel (default), guaranteeing zero fragmentation globally. Now configurable via VPN_MTU (1280–1360).',
    },
    {
        icon: <Cpu className="text-accent" size={32} strokeWidth={1.5} />,
        title: 'Zero-Copy Rust Core',
        description: 'Engineered entirely in Rust with GSO/GRO offloading, BBR congestion control, mimalloc allocator, and 4 MB UDP buffers. Packets flow from TUN to QUIC without memory cloning.',
    },
    {
        icon: <Smartphone className="text-accent" size={32} strokeWidth={1.5} />,
        title: 'Cross-Platform Natives',
        description: 'Windows (WinTUN), Linux (TUN + systemd), and Android (Kotlin Compose + Rust JNI). Tauri v2 GUI with system tray. MSI, NSIS, DEB, RPM, AppImage installers.',
    },
    {
        icon: <Network className="text-accent" size={32} strokeWidth={1.5} />,
        title: 'Dual-Stack & DNS Isolation',
        description: 'Full IPv4 + IPv6 support with NAT66 via ip6tables. NRPT rules on Windows and per-tunnel DNS on Linux/Android prevent DNS leaks outside the tunnel.',
    },
    {
        icon: <Key className="text-accent" size={32} strokeWidth={1.5} />,
        title: 'Enterprise Identity',
        description: 'Keycloak OIDC with PKCE, JWT validation, JWKS rotation, and browser-based SSO. CSRF protection on the OAuth flow. Centralized access control for corporate deployments.',
    },
    {
        icon: <Zap className="text-accent" size={32} strokeWidth={1.5} />,
        title: 'Seamless Roaming',
        description: 'QUIC connection migration seamlessly shifts your connection between Wi-Fi and 5G. Per-app split tunneling on Android. No handshake restart on IP change.',
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
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
                        transition={{ duration: 0.6 }}
                        className="section-title"
                    >
                        Engineered for Hostile Networks.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="section-subtitle"
                    >
                        Not just another wrapper around WireGuard. Mavi VPN is a ground-up QUIC implementation
                        with progressive censorship resistance, zero-copy datapath, and cross-platform support for Windows, Linux, and Android.
                    </motion.p>
                </div>

                <motion.div 
                    className="features-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="feature-card"
                            variants={itemVariants}
                        >
                            <span className="feature-number">{String(index + 1).padStart(2, '0')}</span>
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
