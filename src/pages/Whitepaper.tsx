
import { FileText, Shield, Zap, Lock, Activity, Server, Smartphone, Globe } from 'lucide-react';

export default function Whitepaper() {
    return (
        <div className="whitepaper-page">
            {/* Hero Section */}
            <section className="whitepaper-hero">
                <div className="hero-glow"></div>
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="whitepaper-hero-content text-center">
                        <div className="badge animate-fade-in" style={{ margin: '0 auto', marginBottom: '1.5rem' }}>
                            <FileText size={16} className="text-accent" />
                            Technical Whitepaper
                        </div>
                        <h1 className="hero-title animate-fade-in" style={{ animationDelay: '100ms' }}>
                            Mavi VPN Technical <span className="text-accent">Architecture</span>
                        </h1>
                        <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '200ms', maxWidth: '800px', margin: '0 auto' }}>
                            Architecture, Protocol & Security Implementation
                        </p>
                        <div className="whitepaper-meta animate-fade-in" style={{ animationDelay: '300ms' }}>
                            <span>By: Mavi Dev Team</span>
                            <span className="meta-divider">•</span>
                            <span>Updated: 2024</span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container whitepaper-container">
                {/* Abstract */}
                <section className="glass-panel whitepaper-abstract animate-fade-in" style={{ animationDelay: '400ms' }}>
                    <h2 className="abstract-title">Abstract</h2>
                    <p>
                        This document details the technical architecture, security mechanisms, and implementation specifics of Mavi VPN. It covers the custom QUIC-based protocol, censorship resistance strategies, cross-platform client implementations (Windows/Android), and the novel <strong>"Pinned MTU"</strong> strategy that ensures robust connectivity across constrained networks (DS-Lite, PPPoE) without fragmentation or MSS clamping hacks.
                    </p>
                </section>

                <div className="whitepaper-content animate-fade-in" style={{ animationDelay: '500ms' }}>

                    {/* 1. Introduction */}
                    <section className="wp-section" id="introduction">
                        <h2 className="wp-heading-2">1. Introduction</h2>
                        <p className="wp-paragraph">
                            Mavi VPN is a high-performance, censorship-resistant VPN built on top of the IETF QUIC protocol. Unlike traditional VPNs (OpenVPN, WireGuard) that use custom packet headers or standard TCP/UDP streams, Mavi VPN is designed to look and behave like standard HTTP/3 web traffic to evade Deep Packet Inspection (DPI).
                        </p>
                        <p className="wp-paragraph">The core philosophy is <strong>invisibility and performance</strong>:</p>

                        <ul className="wp-list">
                            <li>
                                <div className="wp-list-icon"><Zap size={18} /></div>
                                <div className="wp-list-content">
                                    <strong>Transport:</strong> UDP/QUIC (Userspace network stack).
                                </div>
                            </li>
                            <li>
                                <div className="wp-list-icon"><Lock size={18} /></div>
                                <div className="wp-list-content">
                                    <strong>Encryption:</strong> TLS 1.3 (inherent to QUIC).
                                </div>
                            </li>
                            <li>
                                <div className="wp-list-icon"><Shield size={18} /></div>
                                <div className="wp-list-content">
                                    <strong>Authentication:</strong> Token-based with Certificate Pinning (Eliminates CA trust issues).
                                </div>
                            </li>
                            <li>
                                <div className="wp-list-icon"><Smartphone size={18} /></div>
                                <div className="wp-list-content">
                                    <strong>Platform Support:</strong> Native implementations for Windows (Rust/WinTUN) and Android (Kotlin/Rust/VpnService).
                                </div>
                            </li>
                        </ul>
                    </section>

                    {/* 2. Architecture Overview */}
                    <section className="wp-section" id="architecture-overview">
                        <h2 className="wp-heading-2">2. Architecture Overview</h2>

                        <h3 className="wp-heading-3">2.1 Component Diagram</h3>
                        <p className="wp-paragraph">The system consists of three main components sharing a common core logic:</p>

                        <div className="wp-code-block">
                            <pre>
                                {`[ Android Client ]      [ Windows Client ]
(Kotlin + Rust JNI)    (Rust + WinTUN)
         |                    |
         |   QUIC Tunnel      |
         +--------+-----------+
                  |
          [ VPN Server ]
         (Rust + Tun/Tap)`}
                            </pre>
                        </div>

                        <h3 className="wp-heading-3">2.2 Shared Core (<code>shared</code> crate)</h3>
                        <p className="wp-paragraph">All components share the <code>shared</code> library, ensuring protocol consistency.</p>
                        <ul className="wp-bullets">
                            <li><strong>Protocol Definition:</strong> <code>ControlMessage</code> enum (Auth, Config, Error).</li>
                            <li><strong>Serialization:</strong> <code>bincode</code> for compact, high-performance binary encoding.</li>
                            <li><strong>ICMP Logic:</strong> Utilities for constructing ICMP "Packet Too Big" messages (fallback mechanism).</li>
                        </ul>
                    </section>

                    {/* 3. Protocol Specification */}
                    <section className="wp-section" id="protocol-specification">
                        <h2 className="wp-heading-2">3. Protocol Specification</h2>

                        <h3 className="wp-heading-3">3.1 Transport Layer: QUIC</h3>
                        <p className="wp-paragraph">We use the <code>quinn</code> Rust crate (implementation of IETF QUIC).</p>
                        <ul className="wp-bullets">
                            <li><strong>Streams:</strong> Used for the initial Handshake (Reliable, Ordered).</li>
                            <li><strong>Datagrams:</strong> Used for VPN traffic (Unreliable, Unordered). This eliminates Head-of-Line (HoL) blocking, critical for real-time applications.</li>
                        </ul>

                        <h3 className="wp-heading-3">3.2 Handshake Flow</h3>
                        <p className="wp-paragraph">The connection establishment follows a strict zero-round-trip (0-RTT) capable design pattern:</p>

                        <div className="wp-steps">
                            <div className="wp-step">
                                <div className="wp-step-number">1</div>
                                <div className="wp-step-content">
                                    <strong>Connect:</strong> Client initiates QUIC connection to Server.
                                </div>
                            </div>
                            <div className="wp-step">
                                <div className="wp-step-number">2</div>
                                <div className="wp-step-content">
                                    <strong>Auth (Stream):</strong> Client opens a bidirectional stream and sends:
                                    <div className="wp-inline-code dark-bg"><code>ControlMessage::Auth &#123; token: String &#125;</code></div>
                                    (Serialized via bincode).
                                </div>
                            </div>
                            <div className="wp-step">
                                <div className="wp-step-number">3</div>
                                <div className="wp-step-content">
                                    <strong>Verification:</strong> Server verifies the token using constant-time comparison.
                                    <ul className="wp-sub-bullets">
                                        <li><em>If Invalid (Standard Mode):</em> Returns <code>ControlMessage::Error</code>.</li>
                                        <li><em>If Invalid (Censorship Resistant Mode):</em> Emulates a generic Nginx HTTP 200 OK response to confuse active probes.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="wp-step">
                                <div className="wp-step-number">4</div>
                                <div className="wp-step-content">
                                    <strong>Config (Stream):</strong> Server allocates IPs and responds with:
                                    <div className="wp-inline-code dark-bg"><code>ControlMessage::Config</code></div>
                                    Assigned IPv4, IPv6, Netmask, Gateway, DNS, MTU, Routes.
                                </div>
                            </div>
                            <div className="wp-step">
                                <div className="wp-step-number">5</div>
                                <div className="wp-step-content">
                                    <strong>Tunnel Ready:</strong> Client applies network config and switches to Datagram mode for payload transport.
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 4. Security & Censorship Resistance */}
                    <section className="wp-section" id="security-censorship">
                        <div className="wp-section-header-icon">
                            <Shield className="text-accent" size={28} />
                            <h2 className="wp-heading-2 mb-0">4. Security & Censorship Resistance</h2>
                        </div>

                        <h3 className="wp-heading-3">4.1 Encryption (TLS 1.3)</h3>
                        <p className="wp-paragraph">
                            All traffic is encrypted using TLS 1.3 (ChaCha20-Poly1305 or AES-GCM), provided by the QUIC stack. We use <code>rustls</code> as the crypto backend for memory safety.
                        </p>

                        <h3 className="wp-heading-3">4.2 Certificate Pinning</h3>
                        <p className="wp-paragraph">To essentially eliminate Man-in-the-Middle (MITM) attacks and reliance on compromised Certificate Authorities:</p>
                        <ul className="wp-bullets">
                            <li>The client is hardcoded with the SHA256 hash of the server's X.509 certificate.</li>
                            <li>During the TLS handshake, the client verifies the remote certificate matches this hash exactly.</li>
                            <li>If the hash mismatches, the connection is immediately aborted.</li>
                        </ul>

                        <h3 className="wp-heading-3">4.3 Censorship Resistant Mode (CR Mode)</h3>
                        <p className="wp-paragraph">Designed to bypass strict firewalls (GFW, Corporate Filters).</p>
                        <ul className="wp-bullets">
                            <li>
                                <strong>ALPN Masquerading:</strong>
                                <ul className="wp-sub-bullets">
                                    <li><strong>Standard:</strong> Uses ALPN <code>mavivpn</code>.</li>
                                    <li><strong>CR Mode:</strong> Uses ALPN <code>h3</code> (HTTP/3). The traffic looks identical to a standard browser fetching a website via QUIC.</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Probe Resistance:</strong> If the server detects an invalid token or protocol violation in CR Mode, it does NOT discard the connection or send a plaintext HTTP/1.1 response (which is a known DPI fingerprinting vector). Instead, it simulates a legitimate HTTP/3 Web-Server:
                                <ul className="wp-sub-bullets" style={{ marginTop: '0.5rem' }}>
                                    <li>It opens a unidirectional control stream to send an HTTP/3 <code>SETTINGS</code> frame.</li>
                                    <li>It sends a binary <code>HEADERS</code> frame containing valid QPACK-encoded headers (e.g., <code>:status 200</code>, <code>server: nginx</code>).</li>
                                    <li>It follows up with a <code>DATA</code> frame containing the HTML payload.</li>
                                </ul>
                            </li>
                        </ul>
                        <div className="wp-callout">
                            This advanced probe resistance makes the VPN completely indistinguishable from a standard web server during <em>Active Probing</em> attacks by firewalls.
                        </div>
                    </section>

                    {/* 5. MTU Strategy */}
                    <section className="wp-section" id="mtu-strategy">
                        <div className="wp-section-header-icon">
                            <Activity className="text-accent" size={28} />
                            <h2 className="wp-heading-2 mb-0">5. MTU Strategy: The "Pinned Mode"</h2>
                        </div>
                        <p className="wp-lead">This is the most critical architectural decision in Mavi VPN, solving the "Packet Too Big" and "Black Hole" issues common in modern networks.</p>

                        <h3 className="wp-heading-3">5.1 The Problem: Fragmentation & Black Holes</h3>
                        <p className="wp-paragraph">Most residential connections (DSL, Fiber with DS-Lite/PPPoE) have an MTU lower than the standard 1500 bytes (typically 1460-1492 bytes).</p>
                        <div className="wp-problem-box">
                            <ul className="wp-bullets no-margin">
                                <li><strong>Standard VPNs (MTU 1500):</strong> Attempt to send 1500-byte packets.</li>
                                <li><strong>Result:</strong> The router MUST fragment the packet.</li>
                                <li><strong>Failure:</strong> Many modern firewalls and NAT gateways drop fragments for security or performance reasons. Or the "Don't Fragment" bit is set, and the router sends an ICMP error which is also dropped.</li>
                                <li><strong>Consequence:</strong> The packet vanishes ("Black Hole").</li>
                                <li><strong>Quinn's Reaction:</strong> The QUIC stack detects packet loss, assumes congestion, and aggressively throttles the connection (MTU reset to 1280).</li>
                            </ul>
                        </div>

                        <h3 className="wp-heading-3">5.2 The Solution: Pinned Mode (Inner 1280 / Outer 1360)</h3>
                        <p className="wp-paragraph">Instead of relying on Path MTU Discovery (which fails due to Black Holes) or Fragmentation (which is unreliable), Mavi VPN uses a strict two-layer MTU strategy:</p>

                        <div className="wp-grid-2">
                            <div className="wp-card">
                                <h4 className="wp-card-title">Layer 1: The Inner Tunnel (Payload)</h4>
                                <ul className="wp-bullets">
                                    <li><strong>MTU:</strong> <span className="text-accent font-semibold">1280 Bytes</span>.</li>
                                    <li><strong>Why?:</strong> This is the minimum required MTU for IPv6. Every device on the internet MUST support 1280 bytes.</li>
                                    <li><strong>Effect:</strong> The OS inside the tunnel (Android/Windows) will never generate a packet larger than 1280 bytes.</li>
                                </ul>
                            </div>
                            <div className="wp-card">
                                <h4 className="wp-card-title">Layer 2: The Outer Tunnel (Wire)</h4>
                                <ul className="wp-bullets">
                                    <li><strong>MTU:</strong> <span className="text-accent font-semibold">1360 Bytes (Pinned)</span>.</li>
                                    <li><strong>Mechanism:</strong>
                                        <ol className="wp-ordered-list">
                                            <li>We disable Quinn's dynamic Path MTU Discovery (<code>mtu_discovery_config(None)</code>).</li>
                                            <li>We force <code>initial_mtu(1360)</code> AND <code>min_mtu(1360)</code>.</li>
                                        </ol>
                                    </li>
                                    <li><strong>Why 1360?:</strong> It is small enough for DSL/PPPoE but large enough for the payload.</li>
                                </ul>
                            </div>
                        </div>

                        <h3 className="wp-heading-3">5.3 The Math (Why it works)</h3>
                        <div className="wp-math-box">
                            <div className="math-row">
                                <span className="math-label">Outer Capacity:</span>
                                <span className="math-value">1360 Bytes</span>
                            </div>
                            <div className="math-row math-minus">
                                <span className="math-label">Protocol Overhead:</span>
                                <span className="math-value">~80 Bytes</span>
                                <span className="math-desc">(IPv4 + UDP + QUIC + TLS Tag)</span>
                            </div>
                            <div className="math-divider"></div>
                            <div className="math-row math-result">
                                <span className="math-label">Available Payload Space:</span>
                                <span className="math-value text-accent font-bold">1280 Bytes</span>
                            </div>
                            <div className="math-row">
                                <span className="math-label">Required Payload Space:</span>
                                <span className="math-value">1280 Bytes (Our Inner MTU)</span>
                            </div>
                            <div className="math-conclusion mt-4">
                                <strong>Check:</strong> 1280 &ge; 1280. <span className="text-accent font-bold">It fits perfectly.</span>
                            </div>
                        </div>
                        <p className="wp-paragraph mt-4">
                            By pinning the minimum MTU to 1360, we prevent the QUIC stack from ever dropping the effective payload capacity below 1280, guaranteeing that packets are never blocked due to size, regardless of network conditions.
                        </p>
                    </section>

                    {/* 6. Server & Client Implementation */}
                    <section className="wp-section" id="implementation">
                        <h2 className="wp-heading-2">6. Implementation Details</h2>

                        <div className="wp-implementation-grid">
                            <div className="wp-implementation-card">
                                <div className="impl-icon"><Server size={24} /></div>
                                <h3 className="wp-heading-3">Server (<code>backend</code>)</h3>
                                <ul className="wp-bullets">
                                    <li><strong>Performance Tuning:</strong> Pinned MTU + BBR Congestion Control.</li>
                                    <li><strong>GSO Offload:</strong> Generic Segmentation Offload enabled for lower CPU usage.</li>
                                    <li><strong>Large Buffers:</strong> Send/Receive windows set to 4MB, Socket Buffers to 2MB.</li>
                                    <li><strong>MSS Clamping DISABLED:</strong> No longer needed due to the Pinned MTU strategy.</li>
                                    <li><strong>Zero-Copy Datapath:</strong> Uses <code>bytes::Bytes</code> and <code>bytes::BytesMut</code> to forward packets from TUN to QUIC without copying the payload.</li>
                                </ul>
                            </div>

                            <div className="wp-implementation-card">
                                <div className="impl-icon"><Globe size={24} /></div>
                                <h3 className="wp-heading-3">Windows Client (<code>windows</code>)</h3>
                                <ul className="wp-bullets">
                                    <li><strong>Driver:</strong> Uses <code>wintun</code> (Layer 3 TUN driver).</li>
                                    <li><strong>Pinned MTU:</strong> Implements the 1360 pinning strategy.</li>
                                    <li><strong>Configuration:</strong> Uses <code>netsh</code> commands to reliably set DNS and MTU.</li>
                                    <li><strong>Architecture:</strong> Multithreaded async runtime (Tokio).</li>
                                </ul>
                            </div>

                            <div className="wp-implementation-card">
                                <div className="impl-icon"><Smartphone size={24} /></div>
                                <h3 className="wp-heading-3">Android Client (<code>android</code>)</h3>
                                <ul className="wp-bullets">
                                    <li><strong>Architecture:</strong> Hybrid Kotlin (UI) + Rust (Core).</li>
                                    <li><strong>JNI Bridge:</strong> Rust core compiled as shared library (<code>libmavivpn.so</code>).</li>
                                    <li><strong>MTU Handling:</strong> Receives 1280 MTU config, sets TUN interface.</li>
                                    <li><strong>ICMP Loopback:</strong> Local generation of "Packet Too Big" ICMP messages if app attempts to send &gt; 1280 bytes.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Conclusion */}
                    <section className="wp-section" id="conclusion">
                        <h2 className="wp-heading-2">7. Conclusion</h2>
                        <div className="glass-panel" style={{ padding: '2rem', borderLeft: '4px solid var(--accent-base)' }}>
                            <p className="wp-paragraph mb-0" style={{ fontSize: '1.1rem', fontWeight: 500 }}>
                                Mavi VPN provides a modern, secure, and performant alternative to legacy VPN protocols. By leveraging QUIC and the mathematically verified "Pinned MTU" strategy, it offers robust connectivity even in hostile network environments where fragmentation and Path MTU Discovery fail.
                            </p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
