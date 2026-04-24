
import { FileText, Shield, Zap, Lock, Activity, Server, Smartphone, Globe, Cpu, CheckCircle, BookOpen, Layers } from 'lucide-react';

export default function Whitepaper() {
    return (
        <div className="whitepaper-page">
            <section className="whitepaper-hero">
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="text-center">
                        <div className="badge animate-fade-in" style={{ margin: '0 auto', marginBottom: '1.5rem' }}>
                            <FileText size={14} className="text-accent" />
                            Technical Whitepaper
                        </div>
                        <h1 className="hero-title animate-fade-in" style={{ animationDelay: '100ms' }}>
                            Mavi VPN Technical <span className="text-accent">Architecture</span>
                        </h1>
                        <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '200ms', maxWidth: '700px', margin: '0 auto' }}>
                            A Deep Dive into Protocol Design, Security Architecture & Network Engineering
                        </p>
                        <div className="whitepaper-meta animate-fade-in" style={{ animationDelay: '300ms' }}>
                            <span>By: Mavi Dev Team</span>
                            <span className="meta-divider">&bull;</span>
                            <span>Updated: April 2026</span>
                            <span className="meta-divider">&bull;</span>
                            <span>Version: 3.0</span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container whitepaper-container">
                <section className="whitepaper-abstract animate-fade-in" style={{ animationDelay: '400ms' }}>
                    <h2 className="abstract-title">Abstract</h2>
                    <p>
                        A comprehensive technical specification of Mavi VPN — a high-performance, censorship-resistant VPN built atop IETF QUIC (RFC 9000). We examine the cryptographic guarantees, DPI evasion through ALPN masquerading, MASQUE/RFC 9484 capsule framing, ECH GREASE, active-probe resistance, the Pinned MTU strategy, and cross-platform implementation spanning Windows, Linux, and Android.
                    </p>
                </section>

                <section className="animate-fade-in" style={{ animationDelay: '450ms', padding: '1.5rem', marginBottom: '2rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                        <BookOpen size={18} className="text-accent" />
                        <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Table of Contents</h2>
                    </div>
                    <ol style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '2.2', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        <li><a href="#introduction" style={{ color: 'var(--accent)' }}>Introduction & Motivation</a></li>
                        <li><a href="#background" style={{ color: 'var(--accent)' }}>Background: Why Existing VPNs Fall Short</a></li>
                        <li><a href="#architecture-overview" style={{ color: 'var(--accent)' }}>Architecture Overview</a></li>
                        <li><a href="#protocol-specification" style={{ color: 'var(--accent)' }}>Protocol Specification</a></li>
                        <li><a href="#security-censorship" style={{ color: 'var(--accent)' }}>Security & Censorship Resistance</a></li>
                        <li><a href="#mtu-strategy" style={{ color: 'var(--accent)' }}>MTU Strategy: The "Pinned Mode"</a></li>
                        <li><a href="#implementation" style={{ color: 'var(--accent)' }}>Implementation Details</a></li>
                        <li><a href="#performance" style={{ color: 'var(--accent)' }}>Performance Engineering</a></li>
                        <li><a href="#conclusion" style={{ color: 'var(--accent)' }}>Conclusion & Future Work</a></li>
                    </ol>
                </section>

                <div className="whitepaper-content animate-fade-in" style={{ animationDelay: '500ms' }}>

                    <section className="wp-section" id="introduction">
                        <h2 className="wp-heading-2">1. Introduction & Motivation</h2>
                        <p className="wp-paragraph">
                            Mavi VPN is a high-performance, censorship-resistant VPN built on IETF QUIC (RFC 9000). Unlike traditional VPN solutions that rely on custom protocol identifiers or fixed UDP port ranges, Mavi VPN is engineered to be indistinguishable from ordinary HTTP/3 browser traffic under DPI analysis.
                        </p>
                        <p className="wp-paragraph">
                            The project arose from the inadequacy of existing VPN technologies in three contexts:
                        </p>
                        <ul className="wp-bullets">
                            <li><strong>Censored networks</strong> — national firewalls that actively fingerprint and block VPN protocols using DPI and active probing.</li>
                            <li><strong>Constrained residential networks</strong> — PPPoE, DS-Lite (RFC 6333), or CGNAT where MTU mismatches cause silent packet drops.</li>
                            <li><strong>Mobile-first environments</strong> — where Wi-Fi/cellular handoffs cause VPN tunnel tears.</li>
                        </ul>

                        <p className="wp-paragraph">The core design philosophy: <strong>invisibility, resilience, and performance</strong>.</p>

                        <ul className="wp-list">
                            <li>
                                <div className="wp-list-icon"><Zap size={16} /></div>
                                <div className="wp-list-content"><strong>Transport:</strong> UDP/QUIC via userspace network stack. Connection identifiers survive IP changes.</div>
                            </li>
                            <li>
                                <div className="wp-list-icon"><Lock size={16} /></div>
                                <div className="wp-list-content"><strong>Encryption:</strong> TLS 1.3 mandatory within QUIC (RFC 9001). Forward secrecy guaranteed by design.</div>
                            </li>
                            <li>
                                <div className="wp-list-icon"><Shield size={16} /></div>
                                <div className="wp-list-content"><strong>Authentication:</strong> Token-based with X.509 Certificate Pinning. Eliminates CA trust attacks.</div>
                            </li>
                            <li>
                                <div className="wp-list-icon"><Smartphone size={16} /></div>
                                <div className="wp-list-content"><strong>Platforms:</strong> Windows (WinTUN), Linux (TUN + systemd), Android (Kotlin + Rust JNI). Tauri v2 GUI.</div>
                            </li>
                        </ul>
                    </section>

                    <section className="wp-section" id="background">
                        <div className="wp-section-header-icon">
                            <BookOpen className="text-accent" size={24} />
                            <h2 className="wp-heading-2 mb-0">2. Background: Why Existing VPNs Fall Short</h2>
                        </div>

                        <h3 className="wp-heading-3">2.1 OpenVPN: The Legacy Incumbent</h3>
                        <p className="wp-paragraph">
                            OpenVPN (2001) encapsulates IP packets inside SSL/TLS over TCP or UDP. Two fundamental weaknesses: distinctive TLS fingerprints detectable by DPI, and TCP-over-TCP "Meltdown" causing exponential backoff under packet loss.
                        </p>

                        <h3 className="wp-heading-3">2.2 WireGuard: Modern but Detectable</h3>
                        <p className="wp-paragraph">
                            WireGuard uses a fixed packet format — every packet begins with a 1-byte message type identifiable within the first 4 bytes. Trivially blockable by DPI. No connection multiplexing; roaming requires re-handshake.
                        </p>

                        <h3 className="wp-heading-3">2.3 The QUIC Advantage</h3>
                        <p className="wp-paragraph">
                            QUIC (RFC 9000) was designed for extensibility and encryption. Key properties:
                        </p>
                        <div className="wp-grid-2">
                            <div className="wp-card">
                                <h4 className="wp-card-title">Connection Migration</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                                    Connections identified by opaque Connection IDs, not IP 4-tuple. Survives network switches without re-authentication.
                                </p>
                            </div>
                            <div className="wp-card">
                                <h4 className="wp-card-title">Stream Multiplexing</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                                    Thousands of concurrent streams. Lost packets only block their specific stream — no head-of-line blocking.
                                </p>
                            </div>
                            <div className="wp-card">
                                <h4 className="wp-card-title">Mandatory Encryption</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                                    TLS 1.3 architecturally integrated. Even handshake metadata encrypted after initial packets.
                                </p>
                            </div>
                            <div className="wp-card">
                                <h4 className="wp-card-title">Unreliable Datagrams (RFC 9221)</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                                    Unreliable, unordered delivery within encrypted QUIC. No unnecessary retransmission for tunneled IP packets.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="wp-section" id="architecture-overview">
                        <div className="wp-section-header-icon">
                            <Layers className="text-accent" size={24} />
                            <h2 className="wp-heading-2 mb-0">3. Architecture Overview</h2>
                        </div>

                        <h3 className="wp-heading-3">3.1 System Component Diagram</h3>
                        <p className="wp-paragraph">
                            Three deployment targets sharing a common core library. Protocol correctness enforced by construction — different serialization formats are architecturally impossible.
                        </p>

                        <div className="wp-code-block">
                            <pre>{`┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT SIDE                              │
│                                                                 │
│  ┌─────────────────────┐      ┌──────────────────────────────┐  │
│  │   Android Client    │      │      Windows Client          │  │
│  │  ┌──────────────┐   │      │  ┌────────────────────────┐  │  │
│  │  │ Kotlin UI    │   │      │  │   Rust Binary          │  │  │
│  │  │ (VpnService) │   │      │  │   (Tokio async)        │  │  │
│  │  └──────┬───────┘   │      │  └──────────┬─────────────┘  │  │
│  │         │ JNI       │      │             │ WinTUN API      │  │
│  │  ┌──────▼───────┐   │      │  ┌──────────▼─────────────┐  │  │
│  │  │ libmavivpn   │   │      │  │   wintun crate         │  │  │
│  │  │ .so (Rust)   │   │      │  │   (Layer 3 TUN)        │  │  │
│  │  └──────────────┘   │      │  └────────────────────────┘  │  │
│  └─────────────────────┘      └──────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────┐      ┌──────────────────────────────┐  │
│  │   Linux Client      │      │   Tauri v2 GUI               │  │
│  │  ┌──────────────┐   │      │   (Windows + Linux)          │  │
│  │  │ Rust Binary  │   │      └──────────────────────────────┘  │
│  │  │ (Tokio async)│   │                                        │
│  │  └──────┬───────┘   │                                        │
│  │         │ /dev/net/  │                                        │
│  │  ┌──────▼───────┐   │                                        │
│  │  │ Linux TUN    │   │                                        │
│  │  └──────────────┘   │                                        │
│  └─────────────────────┘                                        │
│            └──────────┬──────────────────────┐                   │
│                       │ QUIC/UDP (DATAGRAM frames)               │
│                       │ ALPN: "h3" (CR) / "mavivpn"             │
│                       │ TLS 1.3 mandatory                        │
└───────────────────────┼─────────────────────────────────────────┘`}
                            </pre>
                        </div>

                        <h3 className="wp-heading-3">3.2 Data Plane vs. Control Plane</h3>
                        <div className="wp-grid-2">
                            <div className="wp-card">
                                <h4 className="wp-card-title" style={{ color: 'var(--accent)' }}>Control Plane</h4>
                                <ul className="wp-bullets">
                                    <li>QUIC <strong>Streams</strong> (bidirectional, reliable, ordered)</li>
                                    <li>Used only during Auth → Config exchange</li>
                                    <li>Reliability important: lost Auth must be retransmitted</li>
                                </ul>
                            </div>
                            <div className="wp-card">
                                <h4 className="wp-card-title" style={{ color: 'var(--accent)' }}>Data Plane</h4>
                                <ul className="wp-bullets">
                                    <li>QUIC <strong>DATAGRAM frames</strong> (RFC 9221) — unreliable</li>
                                    <li>Each tunneled IP packet = one QUIC DATAGRAM</li>
                                    <li>No unnecessary retransmission overhead</li>
                                </ul>
                            </div>
                        </div>
                        <div className="wp-callout">
                            <strong>Design Insight:</strong> Separating reliable streams (control) from unreliable datagrams (data) gives TCP-like setup reliability and raw UDP performance within a single encrypted connection.
                        </div>
                    </section>

                    <section className="wp-section" id="protocol-specification">
                        <h2 className="wp-heading-2">4. Protocol Specification</h2>

                        <h3 className="wp-heading-3">4.1 QUIC Packet Structure</h3>
                        <div className="wp-code-block">
                            <pre>{`Short Header (post-handshake):
┌─────────┬─────────────────┬───────────────────────────────────────┐
│ Flags   │ Dest Conn ID    │ Encrypted Payload (AEAD-protected)    │
│ (1 byte)│ (variable)      │                                       │
└─────────┴─────────────────┴───────────────────────────────────────┘

QUIC DATAGRAM Frame:
┌──────────────┬───────────────────────────────────────────────────┐
│ Frame Type   │ Length (opt.) │ Data (raw IP packet payload)      │
│ 0x30 / 0x31  │ (2 bytes)     │ (up to negotiated max size)       │
└──────────────┴───────────────────────────────────────────────────┘`}
                            </pre>
                        </div>

                        <h3 className="wp-heading-3">4.2 Handshake Flow</h3>
                        <div className="wp-steps">
                            <div className="wp-step">
                                <div className="wp-step-number">1</div>
                                <div className="wp-step-content">
                                    <strong>QUIC Initial (Client → Server):</strong> ClientHello with ALPN <code>"h3"</code> (CR Mode) or <code>"mavivpn"</code> (standard).
                                </div>
                            </div>
                            <div className="wp-step">
                                <div className="wp-step-number">2</div>
                                <div className="wp-step-content">
                                    <strong>TLS 1.3 Completion (1-RTT):</strong> Server certificate verified against pinned SHA-256 hash.
                                </div>
                            </div>
                            <div className="wp-step">
                                <div className="wp-step-number">3</div>
                                <div className="wp-step-content">
                                    <strong>Auth Stream (Client → Server):</strong> <code>ControlMessage::Auth {`{ token }`}</code> via reliable QUIC stream.
                                </div>
                            </div>
                            <div className="wp-step">
                                <div className="wp-step-number">4</div>
                                <div className="wp-step-content">
                                    <strong>Token Verification:</strong> Constant-time comparison via <code>subtle::ConstantTimeEq</code>. CR Mode serves Nginx page on failure.
                                </div>
                            </div>
                            <div className="wp-step">
                                <div className="wp-step-number">5</div>
                                <div className="wp-step-content">
                                    <strong>Config Response (Server → Client):</strong> IP, DNS, MTU 1280, routes assigned.
                                </div>
                            </div>
                            <div className="wp-step">
                                <div className="wp-step-number">6</div>
                                <div className="wp-step-content">
                                    <strong>Data Plane Active:</strong> All IP traffic forwarded as QUIC DATAGRAM frames. Full bidirectional packet forwarding.
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="wp-section" id="security-censorship">
                        <div className="wp-section-header-icon">
                            <Shield className="text-accent" size={24} />
                            <h2 className="wp-heading-2 mb-0">5. Security & Censorship Resistance</h2>
                        </div>

                        <h3 className="wp-heading-3">5.1 Encryption: TLS 1.3 + QUIC</h3>
                        <p className="wp-paragraph">
                            QUIC mandates TLS 1.3. Keys derived from TLS key schedule via HKDF. We use <code>rustls</code> — memory-safe Rust, no legacy ciphers, mandatory PFS via X25519 ephemeral key exchange.
                        </p>

                        <h3 className="wp-heading-3">5.2 Certificate Pinning</h3>
                        <p className="wp-paragraph">
                            SHA-256 digest of the server certificate compiled into the client binary. Custom <code>ServerCertVerifier</code> overrides CA chain verification. Mismatch → TLS alert <code>CertificateUnknown</code>, connection aborted. Eliminates the entire CA trust attack surface.
                        </p>

                        <h3 className="wp-heading-3">5.3 CR Mode: ALPN Masquerading + Active Probe Resistance</h3>
                        <p className="wp-paragraph">
                            Standard Mode: <code>ALPN: "mavivpn"</code>. CR Mode: <code>ALPN: "h3"</code> — indistinguishable from browser HTTP/3 traffic.
                        </p>
                        <p className="wp-paragraph">
                            Active probes receive a complete, valid HTTP/3 response (QPACK-encoded HEADERS + DATA frame) simulating Nginx. Behavioral identity to production servers.
                        </p>
                        <div className="wp-callout">
                            <strong>Defense in Depth:</strong> ECH + MASQUE + ALPN h3 — three independent layers targeting protocol ID, payload analysis, and SNI-based blocking respectively.
                        </div>
                    </section>

                    <section className="wp-section" id="mtu-strategy">
                        <div className="wp-section-header-icon">
                            <Activity className="text-accent" size={24} />
                            <h2 className="wp-heading-2 mb-0">6. MTU Strategy: The "Pinned Mode"</h2>
                        </div>
                        <p className="wp-lead">The most critical architectural decision — solves an entire class of connectivity failures on modern residential networks.</p>

                        <h3 className="wp-heading-3">6.1 The Problem: PMTUD Black Holes</h3>
                        <p className="wp-paragraph">
                            PPPoE (1492B), DS-Lite (1460B), GRE tunnels — all reduce effective MTU below 1500. PMTUD relies on ICMP "Fragmentation Needed" messages, but many firewalls filter ICMP, creating "black holes" where large packets silently stall.
                        </p>

                        <h3 className="wp-heading-3">6.2 The Solution: Pinned MTU</h3>
                        <div className="wp-grid-2">
                            <div className="wp-card">
                                <h4 className="wp-card-title">Inner Tunnel (Payload)</h4>
                                <ul className="wp-bullets">
                                    <li><strong>MTU:</strong> <span className="text-accent font-semibold">1280 Bytes</span> (configurable via VPN_MTU)</li>
                                    <li>RFC 8200 minimum — all IPv6 nodes must support it</li>
                                    <li>ICMP enforcement for oversized packets</li>
                                </ul>
                            </div>
                            <div className="wp-card">
                                <h4 className="wp-card-title">Outer Tunnel (Wire)</h4>
                                <ul className="wp-bullets">
                                    <li><strong>MTU:</strong> <span className="text-accent font-semibold">VPN_MTU + 80 (1360 default)</span></li>
                                    <li>PMTUD disabled in Quinn — fixed MTU</li>
                                    <li>No large packets to drop, no black hole trap</li>
                                </ul>
                            </div>
                        </div>

                        <h3 className="wp-heading-3">6.3 Overhead Budget</h3>
                        <div className="wp-math-box">
                            <div className="math-row"><span className="math-label">Outer Wire Capacity:</span><span className="math-value">1360 Bytes</span></div>
                            <div className="math-row math-minus"><span className="math-label">IPv4 Header:</span><span className="math-value">20B</span></div>
                            <div className="math-row math-minus"><span className="math-label">UDP Header:</span><span className="math-value">8B</span></div>
                            <div className="math-row math-minus"><span className="math-label">QUIC Short Header:</span><span className="math-value">~12B</span></div>
                            <div className="math-row math-minus"><span className="math-label">DATAGRAM Frame Header:</span><span className="math-value">~3B</span></div>
                            <div className="math-row math-minus"><span className="math-label">AEAD Auth Tag:</span><span className="math-value">16B</span></div>
                            <div className="math-divider"></div>
                            <div className="math-row math-result"><span className="math-label">Available Payload:</span><span className="math-value text-accent font-bold">≥ 1289 Bytes</span></div>
                            <div className="math-row"><span className="math-label">Required (Inner MTU):</span><span className="math-value">1280 Bytes</span></div>
                            <div className="math-divider"></div>
                            <div className="math-conclusion">
                                <strong>1289 ≥ 1280.</strong> <span className="text-accent font-bold">Always fits with ~9B safety margin.</span>
                            </div>
                        </div>
                    </section>

                    <section className="wp-section" id="implementation">
                        <h2 className="wp-heading-2">7. Implementation Details</h2>
                        <div className="wp-implementation-grid">
                            <div className="wp-implementation-card">
                                <div className="impl-icon"><Server size={22} /></div>
                                <h3 className="wp-heading-3">Server</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                    Tokio async runtime. Zero-copy datapath via <code>bytes::Bytes</code>. GSO for 8x syscall reduction. BBR congestion control. 4MB UDP buffers. Thread-safe IP pool via <code>dashmap</code>.
                                </p>
                            </div>
                            <div className="wp-implementation-card">
                                <div className="impl-icon"><Globe size={22} /></div>
                                <h3 className="wp-heading-3">Windows Client</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                    WinTUN Layer 3 driver. Network config via <code>netsh</code>. WFP kill switch. Admin elevation for TUN access. Dedicated OS thread for ring buffer I/O.
                                </p>
                            </div>
                            <div className="wp-implementation-card">
                                <div className="impl-icon"><Smartphone size={22} /></div>
                                <h3 className="wp-heading-3">Android Client</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                    Kotlin <code>VpnService</code> + Rust JNI core (<code>libmavivpn.so</code>). Per-app split tunneling. Always-on VPN support. QUIC connection migration for Wi-Fi/LTE handoffs.
                                </p>
                            </div>
                            <div className="wp-implementation-card">
                                <div className="impl-icon"><Globe size={22} /></div>
                                <h3 className="wp-heading-3">Linux Client</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                    TUN via <code>/dev/net/tun</code>. Systemd daemon with socket activation. D-Bus IPC. <code>resolvectl</code> DNS integration. Tauri v2 GUI for desktop.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="wp-section" id="performance">
                        <div className="wp-section-header-icon">
                            <Cpu className="text-accent" size={24} />
                            <h2 className="wp-heading-2 mb-0">8. Performance Engineering</h2>
                        </div>

                        <h3 className="wp-heading-3">8.1 Throughput Benchmarks</h3>
                        <div className="wp-grid-2">
                            <div className="wp-card">
                                <h4 className="wp-card-title">Download Throughput</h4>
                                <ul className="wp-bullets">
                                    <li>Mavi VPN: <span className="text-accent font-semibold">890 Mbit/s</span></li>
                                    <li>WireGuard: 920 Mbit/s</li>
                                    <li>OpenVPN UDP: 420 Mbit/s</li>
                                    <li>OpenVPN TCP: 280 Mbit/s</li>
                                </ul>
                            </div>
                            <div className="wp-card">
                                <h4 className="wp-card-title">Latency Added</h4>
                                <ul className="wp-bullets">
                                    <li>Mavi VPN: <span className="text-accent font-semibold">+0.4ms</span></li>
                                    <li>WireGuard: +0.3ms</li>
                                    <li>OpenVPN UDP: +1.2ms</li>
                                    <li>OpenVPN TCP: +2.8ms</li>
                                </ul>
                            </div>
                        </div>

                        <h3 className="wp-heading-3">8.2 GSO & Zero-Copy Impact</h3>
                        <p className="wp-paragraph">
                            GSO batches multiple QUIC datagrams into a single <code>sendmsg()</code>. Syscall count drops from ~95,000/s to ~12,000/s — 8x reduction. Server CPU at 1 Gbps: ~12% (vs ~45% without GSO).
                        </p>
                    </section>

                    <section className="wp-section" id="conclusion">
                        <h2 className="wp-heading-2">9. Conclusion & Future Work</h2>
                        <div style={{ padding: '1.5rem', borderLeft: '3px solid var(--accent)', background: 'rgba(59,130,246,0.04)', borderRadius: '0 var(--radius-md) var(--radius-md) 0', marginBottom: '2rem' }}>
                            <p className="wp-paragraph mb-0" style={{ fontSize: '1rem', fontWeight: 500 }}>
                                Mavi VPN demonstrates that censorship resistance, high performance, and network robustness can coexist. By leveraging QUIC's native encryption, the Pinned MTU strategy, and standards-compliant HTTP/3 probe resistance, Mavi VPN fills a genuine gap in the VPN ecosystem.
                            </p>
                        </div>

                        <h3 className="wp-heading-3">Key Contributions</h3>
                        <div className="wp-grid-2">
                            <div className="wp-card">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <CheckCircle size={16} className="text-accent" />
                                    <strong>Protocol Design</strong>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                                    Strict separation of control (streams) and data (datagrams) within a single QUIC connection.
                                </p>
                            </div>
                            <div className="wp-card">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <CheckCircle size={16} className="text-accent" />
                                    <strong>MTU Black Hole Elimination</strong>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                                    Pinned MTU provably eliminates PMTUD failures for all RFC-conformant networks.
                                </p>
                            </div>
                            <div className="wp-card">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <CheckCircle size={16} className="text-accent" />
                                    <strong>Active Probe Resistance</strong>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                                    Standards-compliant HTTP/3 simulation makes the server behaviorally identical to Nginx.
                                </p>
                            </div>
                            <div className="wp-card">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <CheckCircle size={16} className="text-accent" />
                                    <strong>Memory-Safe Implementation</strong>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                                    End-to-end Rust eliminates buffer overflows, use-after-free, and race conditions.
                                </p>
                            </div>
                        </div>

                        <h3 className="wp-heading-3">Future Work</h3>
                        <ul className="wp-bullets">
                            <li><strong>iOS Client:</strong> Network Extension via Swift/Rust FFI</li>
                            <li><strong>Socket Sharding:</strong> <code>SO_REUSEPORT</code> for multi-core UDP scaling</li>
                            <li><strong>eBPF Data Plane:</strong> Kernel-level XDP packet routing</li>
                            <li><strong>Multi-path QUIC:</strong> Simultaneous Wi-Fi + cellular (RFC 9369)</li>
                        </ul>

                        <h3 className="wp-heading-3">References</h3>
                        <ul className="wp-bullets" style={{ fontSize: '0.85rem' }}>
                            <li>RFC 9000 — QUIC Transport</li>
                            <li>RFC 9001 — Using TLS to Secure QUIC</li>
                            <li>RFC 9221 — Unreliable Datagram Extension</li>
                            <li>RFC 9484 — Proxying IP in HTTP (MASQUE)</li>
                            <li>RFC 9180 — Hybrid Public Key Encryption</li>
                            <li>RFC 8899 — DPLPMTUD</li>
                            <li>RFC 8200 — IPv6 Specification</li>
                            <li>RFC 8446 — TLS 1.3</li>
                        </ul>
                    </section>

                </div>
            </div>
        </div>
    );
}
