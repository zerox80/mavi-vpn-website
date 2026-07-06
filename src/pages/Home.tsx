import { useState } from 'react';
import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';
import TerminalMockup from '../components/TerminalMockup';

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

const CLONE_COMMAND = 'git clone https://github.com/zerox80/mavi-vpn';

const comparisonRows = [
    { label: 'Handshake', mavi: 'TLS 1.3 via QUIC (+ ECH)', wireguard: 'Noise IK', openvpn: 'TLS 1.2/1.3 over TCP/UDP' },
    { label: 'DPI resistance', mavi: 'ALPN h3 + MASQUE + ECH', wireguard: 'fixed header, fingerprintable', openvpn: 'fingerprintable TLS handshake' },
    { label: 'Network roaming', mavi: 'QUIC connection migration', wireguard: 're-handshake on IP change', openvpn: 'reconnect required' },
    { label: 'MTU handling', mavi: 'pinned 1280B / 1360B', wireguard: 'no fixed inner MTU', openvpn: 'no fixed inner MTU' },
    { label: 'Throughput', mavi: '890 Mbit/s', wireguard: '920 Mbit/s', openvpn: '420 Mbit/s (UDP)' },
    { label: 'Added latency', mavi: '+0.4 ms', wireguard: '+0.3 ms', openvpn: '+1.2 ms (UDP)' },
];

const throughputBench = [
    { name: 'Mavi VPN', value: 890, accent: true },
    { name: 'WireGuard', value: 920, accent: false },
    { name: 'OpenVPN', value: 420, accent: false },
];

const latencyBench = [
    { name: 'Mavi VPN', value: 0.4, accent: true },
    { name: 'WireGuard', value: 0.3, accent: false },
    { name: 'OpenVPN', value: 1.2, accent: false },
];

const maxThroughput = Math.max(...throughputBench.map((b) => b.value));
const maxLatency = Math.max(...latencyBench.map((b) => b.value));

const steps = [
    {
        num: '01',
        title: 'Clone and build',
        body: 'cargo build --release compiles the Rust core and CLI for Linux, Windows, and Android targets.',
    },
    {
        num: '02',
        title: 'Configure the server',
        body: 'A short server.toml sets the listen address, the pinned VPN_MTU, and the Keycloak OIDC endpoint.',
    },
    {
        num: '03',
        title: 'Connect',
        body: 'The client completes a QUIC/TLS 1.3 handshake, authenticates against Keycloak, and the tunnel is up.',
    },
];

const platforms = [
    { name: 'Windows', detail: 'WinTUN driver · x64 / ARM64 · Tauri v2 GUI' },
    { name: 'Linux', detail: 'TUN + systemd daemon · Tauri v2 GUI' },
    { name: 'Android', detail: 'Kotlin + Rust JNI · per-app split tunneling' },
];

export default function Home() {
    const [copied, setCopied] = useState(false);

    const handleCopyCommand = () => {
        navigator.clipboard.writeText(CLONE_COMMAND).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
    };

    return (
        <div className="home-page">
            <section className="hero" aria-labelledby="headline">
                <div className="hero-version">
                    <span className="hero-version-tag">v0.9</span>
                    <span>MIT License &middot; Open Source</span>
                </div>
                <h1 id="headline">Invisibility meets <span className="text-accent">performance</span>.</h1>
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

                <div className="hero-command">
                    <div className="hero-command-line">
                        <span className="hero-command-prompt">$</span>
                        <span className="hero-command-text">{CLONE_COMMAND}</span>
                        <span className="hero-command-cursor" />
                    </div>
                    <button type="button" className="hero-command-copy" onClick={handleCopyCommand}>
                        {copied ? 'copied' : 'copy'}
                    </button>
                </div>

                <div className="hero-stats" aria-label="Protocol highlights">
                    <div><b>890 Mbit/s</b>Throughput</div>
                    <div><b>1280B</b>Pinned inner MTU</div>
                    <div><b>4&times;</b>CR obfuscation levels</div>
                    <div><b>0</b>Fragmentation risk</div>
                </div>
            </section>

            <section className="section section-alt" id="protocol">
                <div className="section-head">
                    <div>
                        <p className="eyebrow">Why Mavi VPN</p>
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
                            <span className="num">{`[${String(index + 1).padStart(2, '0')}]`}</span>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section" id="compare">
                <div className="section-head">
                    <div>
                        <p className="eyebrow">Vergleich</p>
                        <h2>Against the rest of the field.</h2>
                    </div>
                    <p className="section-copy">
                        Mavi VPN is not a generic wrapper around legacy VPN framing. The QUIC-native transport model
                        is the product, measured head-to-head against WireGuard and OpenVPN.
                    </p>
                </div>

                <div className="compare-table">
                    <div className="compare-table-row compare-table-head">
                        <div />
                        <div className="text-accent">Mavi VPN</div>
                        <div>WireGuard</div>
                        <div>OpenVPN</div>
                    </div>
                    {comparisonRows.map((row) => (
                        <div className="compare-table-row" key={row.label}>
                            <div className="compare-table-label">{row.label}</div>
                            <div className="compare-table-mavi">{row.mavi}</div>
                            <div>{row.wireguard}</div>
                            <div>{row.openvpn}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section section-alt" id="benchmarks">
                <div className="section-head">
                    <div>
                        <p className="eyebrow">Measured, not marketed</p>
                        <h2>Where Mavi VPN trades raw speed for invisibility.</h2>
                    </div>
                    <p className="section-copy">
                        iperf3 throughput and added latency on the same commodity server and link. Mavi VPN does not
                        claim to be the fastest option here &mdash; it claims to keep working on networks where the
                        fastest option gets blocked.
                    </p>
                </div>

                <div className="benchmarks-grid">
                    <div>
                        <div className="bench-group-title">Throughput</div>
                        <div className="bench-group-unit">Mbit/s &mdash; higher is better</div>
                        <div className="bench-rows">
                            {throughputBench.map((b) => (
                                <div className="bench-row" key={b.name}>
                                    <div className="bench-label" style={b.accent ? { color: 'var(--accent)' } : undefined}>{b.name}</div>
                                    <div className="bench-bar-track">
                                        <div
                                            className={`bench-bar-fill${b.accent ? ' bench-bar-fill-accent' : ''}`}
                                            style={{ width: `${Math.round((b.value / maxThroughput) * 100)}%` }}
                                        />
                                    </div>
                                    <div className="bench-value">{b.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="bench-group-title">Latency added</div>
                        <div className="bench-group-unit">ms &mdash; lower is better</div>
                        <div className="bench-rows">
                            {latencyBench.map((b) => (
                                <div className="bench-row" key={b.name}>
                                    <div className="bench-label" style={b.accent ? { color: 'var(--accent)' } : undefined}>{b.name}</div>
                                    <div className="bench-bar-track">
                                        <div
                                            className={`bench-bar-fill${b.accent ? ' bench-bar-fill-accent' : ''}`}
                                            style={{ width: `${Math.round((b.value / maxLatency) * 100)}%` }}
                                        />
                                    </div>
                                    <div className="bench-value">+{b.value.toFixed(1)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" id="docs">
                <div className="section-head">
                    <div>
                        <p className="eyebrow">Getting started</p>
                        <h2>In three steps, in the tunnel.</h2>
                    </div>
                    <p className="section-copy">
                        No accounts, no central control plane for the data path &mdash; a peer builds from source,
                        reads a short config file, and connects.
                    </p>
                </div>

                <div className="docs-grid">
                    <div className="docs-steps">
                        {steps.map((s) => (
                            <div className="wp-step" key={s.num}>
                                <div className="wp-step-number">{s.num}</div>
                                <div className="wp-step-content">
                                    <h3>{s.title}</h3>
                                    <p>{s.body}</p>
                                </div>
                            </div>
                        ))}
                        <Link className="docs-link" to="/whitepaper">&rarr; Read the full whitepaper</Link>
                    </div>

                    <TerminalMockup />
                </div>
            </section>

            <section className="section section-alt" id="architecture">
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

            <section className="section" id="downloads">
                <div className="section-head">
                    <div>
                        <p className="eyebrow">Downloads</p>
                        <h2>Runs where you run.</h2>
                    </div>
                    <p className="section-copy">
                        Builds and release notes live on GitHub. iOS and a router package are on the roadmap, not
                        shipped yet.
                    </p>
                </div>

                <div className="platform-grid">
                    {platforms.map((p) => (
                        <a
                            className="platform-row"
                            key={p.name}
                            href="https://github.com/zerox80/mavi-vpn/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div>
                                <div className="platform-name">{p.name}</div>
                                <div className="platform-detail">{p.detail}</div>
                            </div>
                            <span className="platform-arrow">&darr;</span>
                        </a>
                    ))}
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
