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
        <div className="animate-fade-in" style={{ paddingTop: 'calc(var(--spacing-xl) * 2)', paddingBottom: 'var(--spacing-xl)' }}>
            <div className="container" style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
                <h1 className="section-title">Under the Hood</h1>
                <p className="section-subtitle" style={{ maxWidth: '800px', marginInline: 'auto' }}>
                    Explore the cryptographic and networking breakthroughs that allow Mavi VPN to
                    operate invisibly in hostile environments &mdash; with four progressive censorship resistance levels.
                </p>
            </div>

            <Architecture />

            <section className="container tech-section">
                <h2 className="section-title tech-section-header">Censorship Resistance Levels</h2>
                <div className="glass-panel cr-table-wrapper">
                    <p className="cr-table-description">
                        Mavi VPN offers <strong>four progressive obfuscation layers</strong> that can be combined.
                        Each layer adds DPI resistance while maintaining full QUIC performance. Higher levels make the traffic
                        increasingly indistinguishable from legitimate browser connections.
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
                <div className="glass-panel tech-glass-grid">
                    <div>
                        <h3 className="tech-subtitle">Protocol Invisibility</h3>
                        <p className="tech-text">
                            When CR (Censorship Resistance) Mode is enabled, Mavi VPN drops the standard <code>mavivpn</code> ALPN
                            identifier during the TLS 1.3 handshake. Instead, it masquerades as <code>h3</code> (HTTP/3).
                        </p>
                        <p className="tech-text">
                            If an active DPI probe challenges the server with an invalid authentication token, the server
                            <strong> does not reset the connection</strong>. Instead, it serves a generic Nginx &ldquo;200 OK&rdquo; HTML page.
                            To any surveillance system, the VPN server is indistinguishable from a standard web server.
                        </p>
                    </div>
                    <div className="tech-diagram-box">
                        <HandshakeSvg />
                    </div>
                </div>
            </section>

            <section className="container tech-section">
                <h2 className="section-title tech-section-header">MASQUE / RFC 9484</h2>
                <div className="glass-panel tech-glass">
                    <h3 className="tech-subtitle">HTTP/3 Capsule Framing</h3>
                    <p className="tech-text">
                        MASQUE (Multipurpose Application Service Extension, RFC 9484) tunnels IP packets inside HTTP/3 <code>CONNECT-IP</code> capsule frames.
                        When <code>http3_framing: true</code> is enabled, all tunneled IP packets are wrapped in standards-compliant HTTP/3 capsule framing.
                    </p>
                    <p className="tech-text">
                        DPI systems that parse QUIC frames see only legitimate HTTP/3 proxy traffic. The capsule framing adds a second layer of indirection
                        beyond ALPN masquerading &mdash; even if a firewall identifies the connection as HTTP/3, the payload structure matches a standard
                        CONNECT-IP proxy rather than a custom VPN protocol.
                    </p>
                    <div className="tech-wire-format">
                        <div className="tech-wire-format-title">Wire Format (MASQUE Level 2):</div>
                        <div>QUIC Short Header &rarr; AEAD-encrypted &rarr; HTTP/3 DATAGRAM</div>
                        <div>&rarr; CONNECT-IP capsule (stream_id, type, payload)</div>
                        <div>&rarr; Inner IP packet (1280B max)</div>
                    </div>
                </div>
            </section>

            <section className="container tech-section">
                <h2 className="section-title tech-section-header">Encrypted Client Hello (ECH)</h2>
                <div className="glass-panel tech-glass">
                    <h3 className="tech-subtitle">SNI Spoofing via X25519/HPKE</h3>
                    <p className="tech-text">
                        The TLS Server Name Indication (SNI) extension reveals the destination hostname in plaintext during every TLS handshake.
                        DPI systems use this to block connections to specific domains. Mavi VPN implements ECH GREASE (RFC 9180) to encrypt
                        the real SNI using Hybrid Public Key Encryption (HPKE) with X25519 key exchange.
                    </p>
                    <p className="tech-text">
                        The real destination hostname is hidden inside an encrypted TLS extension, while a decoy SNI
                        (e.g., <code>cloudflare-ech.com</code>) is visible to passive observers. The server uses its private key
                        to decrypt the inner ClientHello and establish the true connection. Certificate pinning with SHA-256 fingerprint
                        verification ensures clients only connect to the legitimate server.
                    </p>
                    <div className="tech-callout">
                        <strong>Combined with MASQUE framing:</strong> ECH + MASQUE + ALPN h3 provides three independent layers of obfuscation &mdash;
                        the connection looks like a browser using Encrypted Client Hello to visit a website through an HTTP/3 CONNECT-IP proxy.
                    </div>
                </div>
            </section>

            <section className="container tech-section">
                <h2 className="section-title tech-section-header">Zero-Copy Datapath in Rust</h2>
                <div className="glass-panel tech-glass">
                    <p className="tech-text">
                        Performance is driven by a multithreaded Tokio asynchronous runtime. Packets arriving on the TUN interface
                        are read directly into memory buffers utilizing <code>bytes::BytesMut</code>.
                    </p>
                    <p className="tech-text">
                        These buffers are passed by reference counting through the encryption and encapsulation layers directly into the
                        QUIC stream. <strong>Zero payload cloning</strong> happens along the entire datapath, allowing the userspace
                        VPN to operate near the theoretical limits of the physical hardware.
                    </p>
                    <p className="tech-text" style={{ marginBottom: '2rem' }}>
                        The server uses <strong>GSO (Generic Segmentation Offload)</strong> to batch multiple QUIC datagrams into a single
                        <code>sendmsg()</code> syscall, reducing syscall overhead by 8x. Combined with <strong>mimalloc</strong> for optimized
                        memory allocation and <strong>4 MB UDP socket buffers</strong> for burst resilience, the server achieves ~890 Mbit/s throughput
                        on commodity hardware.
                    </p>
                    <div className="tech-diagram-box" style={{ padding: 'var(--spacing-sm)' }}>
                        <ZeroCopySvg />
                    </div>
                </div>
            </section>

            <section className="container tech-section">
                <h2 className="section-title tech-section-header">Seamless Roaming</h2>
                <div className="glass-panel tech-glass">
                    <h3 className="tech-subtitle">QUIC Connection Migration</h3>
                    <p className="tech-text">
                        Mobile networks are inherently unstable. Moving between Wi-Fi and 5G typically changes your IP address, completely breaking open TCP and legacy UDP connections. This forces standard VPNs to initiate a new cryptographic handshake, causing connection drops or &ldquo;stuck&rdquo; traffic.
                    </p>
                    <p className="tech-text">
                        By utilizing the robust Connection Migration features of the QUIC protocol, our client detects network switches and instantly migrates the existing TLS 1.3 session to the new network interface without re-authenticating. The IP addresses of the tunnel remain stable, ensuring continuous connectivity for background downloads, VoIP calls, and active TCP sessions.
                    </p>
                    <p className="tech-text">
                        On Android, <strong>per-app split tunneling</strong> allows specific applications to bypass the VPN tunnel,
                        and the Kotlin layer monitors network capability changes via <code>ConnectivityManager.NetworkCallback</code>
                        to trigger seamless migration hints to the Rust core.
                    </p>
                </div>
            </section>

            <section className="container tech-section">
                <h2 className="section-title tech-section-header">Dual-Stack & DNS Isolation</h2>
                <div className="glass-panel tech-glass">
                    <h3 className="tech-subtitle">IPv4 + IPv6 with Leak Prevention</h3>
                    <p className="tech-text">
                        Mavi VPN provides full dual-stack support, assigning both an IPv4 address (e.g., <code>10.8.0.x/24</code>) and
                        an IPv6 ULA address (<code>fd00::x/64</code>) to each client. NAT66 via <code>ip6tables</code> ensures IPv6 traffic
                        is routed through the tunnel, preventing IPv6 leaks that plague many VPN implementations.
                    </p>
                    <p className="tech-text">
                        DNS isolation is enforced at the OS level: <strong>NRPT (Name Resolution Policy Table)</strong> rules on Windows
                        ensure all DNS queries go through the tunnel, while per-tunnel DNS configuration on Linux and Android achieves
                        the same result. The default DNS server (<code>1.1.1.1</code>) is configurable via <code>VPN_DNS</code>.
                    </p>
                </div>
            </section>

            <section className="container tech-section">
                <h2 className="section-title tech-section-header">Enterprise Access Control</h2>
                <div className="glass-panel tech-glass">
                    <h3 className="tech-subtitle">Keycloak OIDC Integration</h3>
                    <p className="tech-text">
                        For corporate environments, static tokens are insufficient. Mavi VPN integrates natively with Keycloak environments acting as a secure OIDC Resource Server.
                    </p>
                    <p className="tech-text">
                        Clients securely obtain JSON Web Tokens (JWT) via PKCE-authorized OAuth2 flows, which are then validated against
                        Keycloak&rsquo;s public JWKS endpoints with automatic key rotation. The OAuth flow includes CSRF protection via state
                        parameter validation.
                    </p>
                    <p className="tech-text">
                        This enables Multi-Factor Authentication (MFA), Single Sign-On (SSO), and absolute administrative control over
                        VPN tunnel assignments &mdash; ideal for enterprise deployments requiring centralized identity management.
                    </p>
                </div>
            </section>
        </div>
    );
}
