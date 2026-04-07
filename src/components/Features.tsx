import { EyeOff, Cpu, Globe2, Zap, Smartphone, Key } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const features = [
    {
        icon: <EyeOff className="text-accent" size={32} strokeWidth={1.5} />,
        title: 'Censorship Resistance',
        description: 'Bypass strict firewalls (GFW, Corporate). Mavi VPN uses ALPN h3 masquerading and actively deflects DPI scanners by simulating a legitimate HTTP/3 Web-Server.',
    },
    {
        icon: <Globe2 className="text-accent" size={32} strokeWidth={1.5} />,
        title: 'The Pinned MTU Strategy',
        description: 'Solves "Packet Too Big" black holes. We enforce a strict 1280 Byte inner payload and a 1360 Byte outer tunnel, guaranteeing zero fragmentation globally.',
    },
    {
        icon: <Cpu className="text-accent" size={32} strokeWidth={1.5} />,
        title: 'Zero-Copy Rust Core',
        description: 'Engineered entirely in Rust. Packets flow from the bare-metal TUN interface directly into the QUIC channel without memory cloning for maximum throughput.',
    },
    {
        icon: <Smartphone className="text-accent" size={32} strokeWidth={1.5} />,
        title: 'Cross-Platform Natives',
        description: 'Built natively for your hardware. High-performance Windows client using WinTUN, and a sleek Android application utilizing Kotlin Jetpack Compose and our Rust JNI Core.',
    },
    {
        icon: <Key className="text-accent" size={32} strokeWidth={1.5} />,
        title: 'Enterprise Identity',
        description: 'Ready for corporate deployments with Keycloak OIDC integration. Centralize user management, enforce MFA, and maintain perfect access control.',
    },
    {
        icon: <Zap className="text-accent" size={32} strokeWidth={1.5} />,
        title: 'Seamless Roaming',
        description: 'Experience network transitions without dropping the tunnel. Our QUIC connection migration strategy seamlessly shifts your connection between Wi-Fi and 5G.',
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
                        designed to survive where legacy protocols are aggressively throttled or blocked.
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
                            className="feature-card glass-panel"
                            variants={itemVariants}
                            whileHover={{ y: -5, boxShadow: 'var(--shadow-xl)', borderColor: 'rgba(37, 99, 235, 0.3)' }}
                            style={{ opacity: 1, animation: 'none' }} /* Overriding legacy CSS animation */
                        >
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
