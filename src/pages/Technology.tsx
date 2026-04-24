import Architecture from '../components/Architecture';
import HandshakeSvg from '../components/HandshakeSvg';
import ZeroCopySvg from '../components/ZeroCopySvg';

const crLevels = [
    { level: '0', mode: 'Standard', wire: 'Raw QUIC datagrams', activate: 'Default' },
    { level: '1', mode: 'CR Mode', wire: 'QUIC + ALPN h3 + probe resistance', activate: 'censorship_resistant: true' },
    { level: '2', mode: 'HTTP/3 Framing', wire: 'Full MASQUE connect-ip (RFC 9484) capsules', activate: 'http3_framing: true' },
    { level: '+', mode: 'ECH', wire: 'SNI spoofing + HPKE GREASE (RFC 9180)', activate: 'Provide ech_config hex' },
];

export default function Technology() {
    return (
        <div className="animate-fade-in" style={{ paddingTop: '7rem', paddingBottom: '3.5rem' }}>
            <div className="container" style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
                <h1 className="section-title">Under the Hood</h1>
                <p className="section-subtitle" style={{ maxWidth: '700px', marginInline: 'auto' }}>
                    Cryptographic and networking breakthroughs that allow Mavi VPN to
                    operate invisibly in hostile environments.
                </p>
            </div>

            <Architecture />

            <section className="container tech-section">
                <h2 className="section-title tech-section-header">Censorship Resistance Levels</h2>
                <div className="cr-table-wrapper">
                    <p className="cr-table-description">
                        Four progressive obfuscation layers that can be combined.
                        Each layer adds DPI resistance while maintaining full QUIC performance.
                    </p>
                    <table className="cr-table">
                        <thead>
                            <tr>
                                <th>Level</th>
                                <th>Mode</th>
                                <th>Wire Format</th>
                                <th>Activate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {crLevels.map((row) => (
                                <tr key={row.level}>
                                    <td data-label="Level">
                                        <span className={`cr-level-badge ${row.level === '+' ? 'cr-level-badge-plus' : ''}`}>
                                            {row.level}
                                        </span>
                                    </td>
                                    <td data-label="Mode" className="cr-mode">{row.mode}</td>
                                    <td data-label="Wire">{row.wire}</td>
                                    <td data-label="Activate" className="cr-activate">{row.activate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="container tech-section">
                <h2 className="section-title tech-section-header">QUIC 0-RTT & ALPN Masquerading</h2>
                <div className="tech-glass-grid">
                    <div>
                        <h3 className="tech-subtitle">Protocol Invisibility</h3>
                        <p className="tech-text">
                            When CR Mode is enabled, Mavi VPN drops the standard <code>mavivpn</code> ALPN
                            identifier and masquerades as <code>h3</code> (HTTP/3) during the TLS 1.3 handshake.
                        </p>
                        <p className="tech-text">
                            If an active DPI probe challenges the server with an invalid token, the server
                            serves a generic Nginx &ldquo;200 OK&rdquo; HTML page. Indistinguishable from a standard web server.
                        </p>
                    </div>
                    <div className="tech-diagram-box">
                        <HandshakeSvg />
                    </div>
                </div>
            </section>

            <section className="container tech-section">
                <h2 className="section-title tech-section-header">MASQUE / RFC 9484</h2>
                <div className="tech-glass">
                    <h3 className="tech-subtitle">HTTP/3 Capsule Framing</h3>
                    <p className="tech-text">
                        MASQUE (RFC 9484) tunnels IP packets inside HTTP/3 <code>CONNECT-IP</code> capsule frames.
                        When <code>http3_framing: true</code> is enabled, all tunneled packets are wrapped in standards-compliant HTTP/3 capsule framing.
                    </p>
                    <p className="tech-text">
                        DPI systems see only legitimate HTTP/3 proxy traffic. Even if identified as HTTP/3, the payload structure matches a standard CONNECT-IP proxy.
                    </p>
                    <div className="tech-wire-format">
                        <div className="tech-wire-format-title">Wire Format (Level 2):</div>
                        <div>QUIC Short Header → AEAD-encrypted → HTTP/3 DATAGRAM</div>
                        <div>→ CONNECT-IP capsule (stream_id, type, payload)</div>
                        <div>→ Inner IP packet (1280B max)</div>
                    </div>
                </div>
            </section>

            <section className="container tech-section">
                <h2 className="section-title tech-section-header">Encrypted Client Hello (ECH)</h2>
                <div className="tech-glass">
                    <h3 className="tech-subtitle">SNI Spoofing via X25519/HPKE</h3>
                    <p className="tech-text">
                        The TLS SNI extension reveals the destination hostname in plaintext. Mavi VPN implements ECH GREASE (RFC 9180) to encrypt
                        the real SNI using HPKE with X25519 key exchange. A decoy SNI is visible to passive observers.
                    </p>
                    <p className="tech-text">
                        Combined with MASQUE framing and ALPN h3 masquerading, the connection looks like a browser using Encrypted Client Hello through an HTTP/3 proxy.
                    </p>
                    <div className="tech-callout">
                        <strong>Combined with MASQUE:</strong> ECH + MASQUE + ALPN h3 provides three independent layers of obfuscation.
                    </div>
                </div>
            </section>

            <section className="container tech-section">
                <h2 className="section-title tech-section-header">Zero-Copy Datapath in Rust</h2>
                <div className="tech-glass">
                    <p className="tech-text">
                        Packets arriving on the TUN interface are read directly into <code>bytes::BytesMut</code> buffers.
                        These are passed by reference counting through encryption and encapsulation directly into the QUIC stream.
                        <strong> Zero payload cloning</strong> along the entire datapath.
                    </p>
                    <p className="tech-text">
                        The server uses <strong>GSO (Generic Segmentation Offload)</strong> to batch multiple QUIC datagrams into a single
                        <code>sendmsg()</code> syscall, reducing overhead by 8x. Combined with <strong>mimalloc</strong> and <strong>4 MB UDP buffers</strong>,
                        achieving ~890 Mbit/s on commodity hardware.
                    </p>
                    <div className="tech-diagram-box" style={{ padding: '0.5rem' }}>
                        <ZeroCopySvg />
                    </div>
                </div>
            </section>

            <section className="container tech-section">
                <h2 className="section-title tech-section-header">Seamless Roaming</h2>
                <div className="tech-glass">
                    <h3 className="tech-subtitle">QUIC Connection Migration</h3>
                    <p className="tech-text">
                        Moving between Wi-Fi and 5G changes your IP address, breaking TCP and legacy UDP connections. Mavi VPN uses QUIC's Connection Migration to instantly migrate the existing TLS 1.3 session without re-authenticating.
                    </p>
                    <p className="tech-text">
                        On Android, <strong>per-app split tunneling</strong> allows specific apps to bypass the tunnel, and <code>ConnectivityManager.NetworkCallback</code> triggers seamless migration hints to the Rust core.
                    </p>
                </div>
            </section>

            <section className="container tech-section">
                <h2 className="section-title tech-section-header">Dual-Stack & DNS Isolation</h2>
                <div className="tech-glass">
                    <h3 className="tech-subtitle">IPv4 + IPv6 with Leak Prevention</h3>
                    <p className="tech-text">
                        Full dual-stack support with IPv4 (<code>10.8.0.x/24</code>) and IPv6 ULA (<code>fd00::x/64</code>). NAT66 via <code>ip6tables</code> prevents IPv6 leaks.
                        DNS isolation enforced via NRPT (Windows) and per-tunnel DNS (Linux/Android).
                    </p>
                </div>
            </section>

            <section className="container tech-section">
                <h2 className="section-title tech-section-header">Enterprise Access Control</h2>
                <div className="tech-glass">
                    <h3 className="tech-subtitle">Keycloak OIDC Integration</h3>
                    <p className="tech-text">
                        JWT-based authentication via PKCE-authorized OAuth2 flows, validated against Keycloak's public JWKS endpoints with automatic key rotation. Supports MFA, SSO, and centralized access control.
                    </p>
                </div>
            </section>
        </div>
    );
}
