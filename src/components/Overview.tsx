import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { KeyboardEvent } from 'react';
import { ArrowRight, ArrowUpRight, Cpu, Fingerprint, Globe2, Layers, LockKeyhole, Monitor, Radio, ShieldCheck } from 'lucide-react';

const tabs = [
    { id: 'protocol', label: 'Features' }, { id: 'compare', label: 'Comparison' },
    { id: 'benchmarks', label: 'Benchmarks' }, { id: 'architecture', label: 'Architecture' },
];
const features = [
    { title: 'Censorship resistance', description: 'HTTP/3 camouflage, probe resistance, and MASQUE framing.', icon: ShieldCheck },
    { title: 'Encrypted Client Hello', description: 'X25519/HPKE with a decoy hostname for passive observers.', icon: LockKeyhole },
    { title: 'Pinned MTU', description: '1280-byte inner packets in a 1360-byte outer tunnel.', icon: Layers },
    { title: 'Zero-copy Rust', description: 'Reference-counted buffers, without cloning packet payloads.', icon: Cpu },
    { title: 'Cross-platform', description: 'Windows, Linux, and Android clients. Tauri desktop GUI.', icon: Monitor },
    { title: 'Dual-stack DNS', description: 'IPv4 and IPv6 routing with per-tunnel DNS isolation.', icon: Globe2 },
    { title: 'Enterprise identity', description: 'Keycloak OIDC, PKCE, JWT validation, and MFA.', icon: Fingerprint },
    { title: 'Seamless roaming', description: 'QUIC migration across Wi-Fi and mobile connections.', icon: Radio },
];
const comparisonRows = [
    { label: 'Handshake', mavi: 'TLS 1.3 / QUIC + ECH', wireguard: 'Noise IK', openvpn: 'TLS 1.2/1.3' },
    { label: 'DPI resistance', mavi: 'h3 + MASQUE + ECH', wireguard: 'Fixed header', openvpn: 'TLS fingerprint' },
    { label: 'Network roaming', mavi: 'QUIC migration', wireguard: 'Re-handshake on IP change', openvpn: 'Reconnect' },
    { label: 'MTU handling', mavi: 'Pinned 1280 / 1360 B', wireguard: 'No fixed inner MTU', openvpn: 'No fixed inner MTU' },
    { label: 'Throughput', mavi: '890 Mbit/s', wireguard: '920 Mbit/s', openvpn: '420 Mbit/s (UDP)' },
    { label: 'Added latency', mavi: '+0.4 ms', wireguard: '+0.3 ms', openvpn: '+1.2 ms (UDP)' },
];
const benchmarks = [
    { title: 'Throughput', unit: 'Mbit/s · higher is better', max: 920, values: [890, 920, 420], latency: false },
    { title: 'Added latency', unit: 'ms · lower is better', max: 1.2, values: [0.4, 0.3, 1.2], latency: true },
];
const benchmarkNames = ['Mavi VPN', 'WireGuard', 'OpenVPN'];

export default function Overview() {
    const { hash } = useLocation();
    const navigate = useNavigate();
    const activeTab = tabs.find((tab) => '#' + tab.id === hash)?.id ?? 'protocol';
    const handleTabKeyDown = (event: KeyboardEvent<HTMLAnchorElement>, index: number) => {
        let next: number;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        void navigate('/#' + tabs[next].id, { replace: true });
        document.getElementById('tab-' + tabs[next].id)?.focus();
    };

    return (
        <section className="overview" aria-labelledby="overview-title">
            <div className="panel-heading"><div><p className="eyebrow">01 / Engineered for the open internet</p><h2 id="overview-title">One protocol.<br /><span className="heading-muted">Every layer considered.</span></h2></div><p className="overview-intro">Modern transport. Thoughtful engineering. <br />Explore what makes Mavi work.</p></div>
            <div className="overview-tabs" role="tablist" aria-label="Explore Mavi VPN">
                {tabs.map((tab, index) => (<Link key={tab.id} to={'/#' + tab.id} replace role="tab" id={'tab-' + tab.id} aria-controls={tab.id} aria-selected={activeTab === tab.id} tabIndex={activeTab === tab.id ? 0 : -1} onKeyDown={(event) => handleTabKeyDown(event, index)}>{tab.label}</Link>))}
            </div>
            <div className="overview-body">
                <div className="overview-panel" id="protocol" role="tabpanel" aria-labelledby="tab-protocol" tabIndex={0} hidden={activeTab !== 'protocol'}>
                    <div className="feature-grid">{features.map(({ title, description, icon: Icon }, index) => (<article className="feature" key={title}><div className="feature-top"><span className="feature-icon"><Icon size={23} strokeWidth={1.5} aria-hidden="true" /></span><span className="feature-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span></div><h3>{title}</h3><p>{description}</p></article>))}</div>
                </div>
                <div className="overview-panel" id="compare" role="tabpanel" aria-labelledby="tab-compare" tabIndex={0} hidden={activeTab !== 'compare'}>
                    <div className="comparison-scroll" role="region" aria-label="VPN protocol comparison" tabIndex={0}>
                        <table className="comparison-table"><caption className="sr-only">Mavi VPN, WireGuard, and OpenVPN protocol comparison</caption>
                            <thead><tr><th scope="col">Protocol</th><th scope="col">Mavi VPN</th><th scope="col">WireGuard</th><th scope="col">OpenVPN</th></tr></thead>
                            <tbody>{comparisonRows.map((row) => (<tr key={row.label}><th scope="row">{row.label}</th><td>{row.mavi}</td><td>{row.wireguard}</td><td>{row.openvpn}</td></tr>))}</tbody>
                        </table>
                    </div>
                </div>
                <div className="overview-panel" id="benchmarks" role="tabpanel" aria-labelledby="tab-benchmarks" tabIndex={0} hidden={activeTab !== 'benchmarks'}>
                    <div className="benchmarks-grid">{benchmarks.map((benchmark) => (
                        <div key={benchmark.title}><h3 className="bench-group-title">{benchmark.title}</h3><p className="bench-group-unit">{benchmark.unit}</p>
                            <div className="bench-rows">{benchmark.values.map((value, index) => (
                                <div className={'bench-row' + (index === 0 ? ' bench-row-accent' : '')} key={benchmarkNames[index]}>
                                    <div className="bench-label">{benchmarkNames[index]}</div>
                                    <div className="bench-bar-track" aria-hidden="true"><div className={'bench-bar-fill' + (index === 0 ? ' bench-bar-fill-accent' : '')} style={{ width: (value / benchmark.max * 100) + '%' }} /></div>
                                    <div className="bench-value">{benchmark.latency ? '+' + value.toFixed(1) : value}</div>
                                </div>
                            ))}</div>
                        </div>
                    ))}</div>
                    <p className="benchmark-note">Project benchmark figures: iperf3 throughput and added latency on the same server and link. Performance depends on hardware and network conditions.</p>
                </div>
                <div className="overview-panel" id="architecture" role="tabpanel" aria-labelledby="tab-architecture" tabIndex={0} hidden={activeTab !== 'architecture'}>
                    <div className="protocol-path" aria-label="Packet path: Apps to TUN to Rust core to QUIC to UDP">{['Apps', 'TUN', 'Rust core', 'QUIC', 'UDP'].map((layer, index) => (<div className="protocol-path-step" key={layer}><span>{layer}</span>{index < 4 && <ArrowRight size={16} aria-hidden="true" />}</div>))}</div>
                    <dl className="architecture-specs">
                        <div><dt>Handshake</dt><dd>TLS 1.3 through QUIC, with ALPN h3 camouflage in CR mode.</dd></div>
                        <div><dt>Mobility</dt><dd>Connection IDs preserve session state across network changes.</dd></div>
                        <div><dt>Datapath</dt><dd>Reference-counted buffers feed QUIC datagrams without payload copies.</dd></div>
                        <div><dt>Identity</dt><dd>Keycloak OIDC and JWT validation sit outside the tunnel core.</dd></div>
                    </dl>
                </div>
            </div>
            <div className="overview-footer"><span>QUIC transport · TLS 1.3 · Rust core</span><Link className="text-link" to="/technology">Explore the technology <ArrowUpRight size={14} aria-hidden="true" /></Link></div>
        </section>
    );
}
