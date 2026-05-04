import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';

const featureCards = [
    {
        title: 'Censorship resistance',
        description: 'Progressive ALPN h3 masquerading, active probe resistance, MASQUE capsule framing, and ECH GREASE.',
    },
    {
        title: 'Encrypted Client Hello',
        description: 'X25519/HPKE hides the real SNI while a decoy hostname remains visible to passive observers.',
    },
    {
        title: 'Pinned MTU strategy',
        description: 'Strict 1280B inner payload and 1360B outer tunnel avoid fragmentation across constrained networks.',
    },
    {
        title: 'Zero-copy Rust core',
        description: 'TUN packets move through reference-counted buffers into QUIC without payload cloning.',
    },
    {
        title: 'Cross-platform clients',
        description: 'Windows with WinTUN, Linux with TUN and systemd, and Android with Kotlin plus Rust JNI.',
    },
    {
        title: 'Dual-stack DNS isolation',
        description: 'IPv4 and IPv6 routing with DNS leak prevention through NRPT or per-tunnel resolver control.',
    },
    {
        title: 'Enterprise identity',
        description: 'Keycloak OIDC, PKCE, JWT validation, JWKS rotation, MFA, and centralized access control.',
    },
    {
        title: 'Seamless roaming',
        description: 'QUIC connection migration keeps sessions alive when clients move between Wi-Fi and mobile data.',
    },
];

export default function Home() {
    return (
        <div className="home-page">
            <section className="hero" aria-labelledby="headline">
                <div>
                    <p className="eyebrow">QUIC-native private transport</p>
                    <h1 id="headline">Invisibility meets performance.</h1>
                    <p className="lede">
                        Mavi VPN is a next-generation cross-platform VPN engineered to defeat deep packet inspection with
                        MASQUE framing, ECH GREASE, pinned MTU behavior, and a zero-copy Rust datapath.
                    </p>
                    <div className="hero-actions">
                        <a className="button" href="https://github.com/zerox80/mavi-vpn" target="_blank" rel="noopener noreferrer">
                            GitHub repo
                        </a>
                        <Link className="button secondary" to="/technology">
                            View architecture
                        </Link>
                    </div>

                    <div className="hero-meta" aria-label="Protocol highlights">
                        <div>
                            <b>ECH + MASQUE</b>
                            <span>Layered protocol camouflage for hostile and heavily inspected networks.</span>
                        </div>
                        <div>
                            <b>1280B</b>
                            <span>Pinned inner payload keeps tunnel packets below dangerous fragmentation limits.</span>
                        </div>
                        <div>
                            <b>Rust</b>
                            <span>Memory-safe async networking with QUIC, GSO/GRO, BBR, and zero-copy packet flow.</span>
                        </div>
                    </div>
                </div>

                <aside className="protocol-panel" aria-label="Mavi VPN tunnel visualization">
                    <div className="panel-head">
                        <span>Live tunnel model</span>
                        <span className="status">v0.9 draft</span>
                    </div>
                    <div className="tunnel">
                        <div className="node client">Client</div>
                        <div className="node edge">Mavi edge</div>
                        <div className="node origin">Internet</div>
                        <div className="packet">
                            handshake: tls 1.3<br />
                            transport: quic over udp 443<br />
                            disguise: h3 + masque + ech<br />
                            payload: encrypted tun frames
                        </div>
                    </div>
                    <div className="panel-foot">
                        <div><b>890</b><span>Mbit/s slot</span></div>
                        <div><b>0</b><span>Fragments</span></div>
                        <div><b>3</b><span>Platforms</span></div>
                    </div>
                </aside>
            </section>

            <section className="section" id="protocol">
                <div className="section-head">
                    <div>
                        <p className="eyebrow">Protocol promise</p>
                        <h2>Built for networks that inspect, throttle, and change.</h2>
                    </div>
                    <p className="section-copy">
                        Mavi VPN treats censorship resistance, mobile roaming, packet loss, and operator visibility as
                        core protocol requirements instead of afterthoughts.
                    </p>
                </div>

                <div className="feature-grid">
                    {featureCards.map((feature, index) => (
                        <div className="feature" key={feature.title}>
                            <span className="num">{String(index + 1).padStart(2, '0')}</span>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section" id="architecture">
                <div className="section-head">
                    <div>
                        <p className="eyebrow">Architecture</p>
                        <h2>A narrow protocol stack with the hard parts visible.</h2>
                    </div>
                    <p className="section-copy">
                        The product story stays technical and scannable: tunnel layers, security posture, transport
                        behavior, and operational boundaries are visible from the first page.
                    </p>
                </div>

                <div className="architecture-grid">
                    <div className="stack" aria-label="Mavi VPN protocol stack">
                        <div className="stack-row"><b>Apps</b><span className="lane"></span></div>
                        <div className="stack-row"><b>TUN device</b><span className="lane"></span></div>
                        <div className="stack-row"><b>Rust core</b><span className="lane"></span></div>
                        <div className="stack-row"><b>QUIC session</b><span className="lane"></span></div>
                        <div className="stack-row"><b>UDP path</b><span className="lane"></span></div>
                    </div>

                    <div className="spec-card">
                        <div>
                            <p className="eyebrow">Implementation posture</p>
                            <h3>Small enough to audit. Clear enough to operate.</h3>
                        </div>
                        <div className="spec-list">
                            <div><b>Handshake</b><span>TLS 1.3 through QUIC, with ALPN h3 camouflage when CR mode is active.</span></div>
                            <div><b>Mobility</b><span>Connection IDs allow network path changes without throwing away session state.</span></div>
                            <div><b>Datapath</b><span>Reference-counted packet buffers feed QUIC datagrams without repeated payload copies.</span></div>
                            <div><b>Identity</b><span>Keycloak OIDC and JWT validation stay in the control plane, outside the tunnel core.</span></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" id="proof">
                <div className="section-head">
                    <div>
                        <p className="eyebrow">Measured claims</p>
                        <h2>Performance claims with technical context attached.</h2>
                    </div>
                    <p className="section-copy">
                        The homepage presents the headline metrics as engineering claims tied to the underlying design:
                        pinned MTU, zero-copy buffers, and QUIC migration.
                    </p>
                </div>

                <div className="proof-grid">
                    <div className="proof-card">
                        <b>890 Mbit/s</b>
                        <div>
                            <h3>Throughput target</h3>
                            <p>Commodity-server datapath with GSO/GRO, BBR, mimalloc, and 4 MB UDP buffers.</p>
                        </div>
                    </div>
                    <div className="proof-card">
                        <b>+0.4 ms</b>
                        <div>
                            <h3>Latency budget</h3>
                            <p>Low added latency by avoiding TCP-over-TCP behavior and unnecessary packet copies.</p>
                        </div>
                    </div>
                    <div className="proof-card">
                        <b>1280B</b>
                        <div>
                            <h3>Inner MTU</h3>
                            <p>Designed to eliminate PMTUD black holes across PPPoE, DS-Lite, and mobile networks.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" id="compare">
                <div className="section-head">
                    <div>
                        <p className="eyebrow">Comparison</p>
                        <h2>Position QUIC where operators can understand it.</h2>
                    </div>
                    <p className="section-copy">
                        Mavi VPN is not a generic wrapper around legacy VPN framing. The transport model is the product.
                    </p>
                </div>

                <div className="comparison">
                    <div className="compare-row compare-head">
                        <div>Concern</div>
                        <div>Traditional VPN framing</div>
                        <div>Mavi QUIC-native framing</div>
                    </div>
                    <div className="compare-row">
                        <div><strong>Detection</strong></div>
                        <div><p>Distinctive protocol identifiers or packet shapes are easier to fingerprint.</p></div>
                        <div><p>HTTP/3-like transport, MASQUE capsules, and ECH reduce obvious wire signatures.</p></div>
                    </div>
                    <div className="compare-row">
                        <div><strong>Network change</strong></div>
                        <div><p>Roaming is often implemented as reconnect logic in the client.</p></div>
                        <div><p>QUIC migration keeps session identity independent from the current IP path.</p></div>
                    </div>
                    <div className="compare-row">
                        <div><strong>MTU failure</strong></div>
                        <div><p>Large packets can disappear when ICMP feedback is blocked.</p></div>
                        <div><p>Pinned inner and outer MTU limits avoid black-hole fragmentation traps.</p></div>
                    </div>
                </div>
            </section>

            <section className="cta" id="start">
                <div>
                    <p className="eyebrow">Next step</p>
                    <h2>Read the implementation details or inspect the source.</h2>
                </div>
                <div className="cta-panel">
                    <p>
                        The technical pages keep the full architecture story available without diluting the landing page.
                    </p>
                    <div className="hero-actions">
                        <Link className="button" to="/technology">Technical deep dive</Link>
                        <Link className="button secondary" to="/whitepaper">Whitepaper</Link>
                    </div>
                </div>
            </section>

            <FAQ />
        </div>
    );
}
