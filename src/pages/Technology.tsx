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

            <section className="container" style={{ marginTop: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)' }}>
                <h2 className="section-title text-center" style={{ marginBottom: 'var(--spacing-lg)' }}>Censorship Resistance Levels</h2>
                <div className="glass-panel" style={{ padding: 'var(--spacing-lg)', overflow: 'auto' }}>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                        Mavi VPN offers <strong>four progressive obfuscation layers</strong> that can be combined.
                        Each layer adds DPI resistance while maintaining full QUIC performance. Higher levels make the traffic
                        increasingly indistinguishable from legitimate browser connections.
                    </p>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--border-light)' }}>
                                <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>Level</th>
                                <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>Mode</th>
                                <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>Wire Format</th>
                                <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>Activate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {crLevels.map((row) => (
                                <tr key={row.level} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--accent-base)' }}>{row.level}</td>
                                    <td style={{ padding: '0.75rem', color: 'var(--text-primary)', fontWeight: 500 }}>{row.mode}</td>
                                    <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{row.wire}</td>
                                    <td style={{ padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{row.activate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="container" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h2 className="section-title text-center" style={{ marginBottom: 'var(--spacing-lg)' }}>QUIC 0-RTT & ALPN Masquerading</h2>

                <div className="glass-panel" style={{ padding: 'var(--spacing-lg)', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--spacing-lg)', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Protocol Invisibility</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                            When CR (Censorship Resistance) Mode is enabled, Mavi VPN drops the standard <span style={{ fontFamily: 'monospace' }}>mavivpn</span> ALPN
                            identifier during the TLS 1.3 handshake. Instead, it masquerades as <span style={{ fontFamily: 'monospace' }}>h3</span> (HTTP/3).
                        </p>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                            If an active DPI probe challenges the server with an invalid authentication token, the server
                            <strong> does not reset the connection</strong>. Instead, it serves a generic Nginx "200 OK" HTML page.
                            To any surveillance system, the VPN server is indistinguishable from a standard web server.
                        </p>
                    </div>

                    <div style={{ background: 'var(--bg-tertiary)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                        <HandshakeSvg />
                    </div>
                </div>
            </section>

            <section className="container" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h2 className="section-title text-center" style={{ marginBottom: 'var(--spacing-lg)' }}>MASQUE / RFC 9484</h2>
                <div className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>HTTP/3 Capsule Framing</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                        MASQUE (Multipurpose Application Service Extension, RFC 9484) tunnels IP packets inside HTTP/3 <code>CONNECT-IP</code> capsule frames.
                        When <code>http3_framing: true</code> is enabled, all tunneled IP packets are wrapped in standards-compliant HTTP/3 capsule framing.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                        DPI systems that parse QUIC frames see only legitimate HTTP/3 proxy traffic. The capsule framing adds a second layer of indirection
                        beyond ALPN masquerading — even if a firewall identifies the connection as HTTP/3, the payload structure matches a standard
                        CONNECT-IP proxy rather than a custom VPN protocol.
                    </p>
                    <div style={{ background: 'var(--bg-tertiary)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <div style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 600 }}>Wire Format (MASQUE Level 2):</div>
                        <div>QUIC Short Header → AEAD-encrypted → HTTP/3 DATAGRAM</div>
                        <div>→ CONNECT-IP capsule (stream_id, type, payload)</div>
                        <div>→ Inner IP packet (1280B max)</div>
                    </div>
                </div>
            </section>

            <section className="container" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h2 className="section-title text-center" style={{ marginBottom: 'var(--spacing-lg)' }}>Encrypted Client Hello (ECH)</h2>
                <div className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>SNI Spoofing via X25519/HPKE</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                        The TLS Server Name Indication (SNI) extension reveals the destination hostname in plaintext during every TLS handshake.
                        DPI systems use this to block connections to specific domains. Mavi VPN implements ECH GREASE (RFC 9180) to encrypt
                        the real SNI using Hybrid Public Key Encryption (HPKE) with X25519 key exchange.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                        The real destination hostname is hidden inside an encrypted TLS extension, while a decoy SNI
                        (e.g., <code>cloudflare-ech.com</code>) is visible to passive observers. The server uses its private key
                        to decrypt the inner ClientHello and establish the true connection. Certificate pinning with SHA-256 fingerprint
                        verification ensures clients only connect to the legitimate server.
                    </p>
                    <div className="wp-callout" style={{ background: 'rgba(37, 99, 235, 0.08)', borderLeft: '4px solid var(--accent-base)', padding: '1rem', borderRadius: '0 var(--radius-md) var(--radius-md) 0', marginTop: '1rem' }}>
                        <strong>Combined with MASQUE framing:</strong> ECH + MASQUE + ALPN h3 provides three independent layers of obfuscation —
                        the connection looks like a browser using Encrypted Client Hello to visit a website through an HTTP/3 CONNECT-IP proxy.
                    </div>
                </div>
            </section>

            <section className="container" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h2 className="section-title text-center" style={{ marginBottom: 'var(--spacing-lg)' }}>Zero-Copy Datapath in Rust</h2>
                <div className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                        Performance is driven by a multithreaded Tokio asynchronous runtime. Packets arriving on the TUN interface
                        are read directly into memory buffers utilizing <span style={{ fontFamily: 'monospace' }}>bytes::BytesMut</span>.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                        These buffers are passed by reference counting through the encryption and encapsulation layers directly into the
                        QUIC stream. <strong>Zero payload cloning</strong> happens along the entire datapath, allowing the userspace
                        VPN to operate near the theoretical limits of the physical hardware.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                        The server uses <strong>GSO (Generic Segmentation Offload)</strong> to batch multiple QUIC datagrams into a single
                        <code>sendmsg()</code> syscall, reducing syscall overhead by 8x. Combined with <strong>mimalloc</strong> for optimized
                        memory allocation and <strong>4 MB UDP socket buffers</strong> for burst resilience, the server achieves ~890 Mbit/s throughput
                        on commodity hardware.
                    </p>
                    <div style={{ background: 'var(--bg-tertiary)', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                        <ZeroCopySvg />
                    </div>
                </div>
            </section>

            <section className="container" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h2 className="section-title text-center" style={{ marginBottom: 'var(--spacing-lg)' }}>Seamless Roaming</h2>
                <div className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>QUIC Connection Migration</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                        Mobile networks are inherently unstable. Moving between Wi-Fi and 5G typically changes your IP address, completely breaking open TCP and legacy UDP connections. This forces standard VPNs to initiate a new cryptographic handshake, causing connection drops or "stuck" traffic.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                        By utilizing the robust Connection Migration features of the QUIC protocol, our client detects network switches and instantly migrates the existing TLS 1.3 session to the new network interface without re-authenticating. The IP addresses of the tunnel remain stable, ensuring continuous connectivity for background downloads, VoIP calls, and active TCP sessions.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        On Android, <strong>per-app split tunneling</strong> allows specific applications to bypass the VPN tunnel,
                        and the Kotlin layer monitors network capability changes via <code>ConnectivityManager.NetworkCallback</code>
                        to trigger seamless migration hints to the Rust core.
                    </p>
                </div>
            </section>

            <section className="container" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h2 className="section-title text-center" style={{ marginBottom: 'var(--spacing-lg)' }}>Dual-Stack & DNS Isolation</h2>
                <div className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>IPv4 + IPv6 with Leak Prevention</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                        Mavi VPN provides full dual-stack support, assigning both an IPv4 address (e.g., <code>10.8.0.x/24</code>) and
                        an IPv6 ULA address (<code>fd00::x/64</code>) to each client. NAT66 via <code>ip6tables</code> ensures IPv6 traffic
                        is routed through the tunnel, preventing IPv6 leaks that plague many VPN implementations.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        DNS isolation is enforced at the OS level: <strong>NRPT (Name Resolution Policy Table)</strong> rules on Windows
                        ensure all DNS queries go through the tunnel, while per-tunnel DNS configuration on Linux and Android achieves
                        the same result. The default DNS server (<code>1.1.1.1</code>) is configurable via <code>VPN_DNS</code>.
                    </p>
                </div>
            </section>

            <section className="container" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h2 className="section-title text-center" style={{ marginBottom: 'var(--spacing-lg)' }}>Enterprise Access Control</h2>
                <div className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Keycloak OIDC Integration</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                        For corporate environments, static tokens are insufficient. Mavi VPN integrates natively with Keycloak environments acting as a secure OIDC Resource Server.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                        Clients securely obtain JSON Web Tokens (JWT) via PKCE-authorized OAuth2 flows, which are then validated against
                        Keycloak's public JWKS endpoints with automatic key rotation. The OAuth flow includes CSRF protection via state
                        parameter validation.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        This enables Multi-Factor Authentication (MFA), Single Sign-On (SSO), and absolute administrative control over
                        VPN tunnel assignments &mdash; ideal for enterprise deployments requiring centralized identity management.
                    </p>
                </div>
            </section>

        </div>
    );
}
