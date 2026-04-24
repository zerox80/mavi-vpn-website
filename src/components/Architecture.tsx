import ZeroCopySvg from './ZeroCopySvg';
import { useCounter } from '../hooks/useCounter';

function StatCounter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
    const { count, ref } = useCounter(end);
    return (
        <div className="stat-item" ref={ref}>
            <div className="stat-value">{count}<span>{suffix}</span></div>
            <div className="stat-label">{label}</div>
        </div>
    );
}

export default function Architecture() {
    return (
        <section className="architecture-section" id="architecture">
            <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>

                {/* --- Pinned MTU Section --- */}
                <div className="architecture-grid">

                    <div className="architecture-content">
                        <h2 className="section-title">The &ldquo;Pinned MTU&rdquo; Paradigm.</h2>
                        <p className="architecture-description">
                            Most residential connections (DS-Lite, PPPoE) suffer from maximum transmission unit (MTU) limitations. Standard VPNs relying on 1500-byte packets inevitably cause fragmentation. Modern firewalls abhor fragments, silently dropping them into &ldquo;Black Holes&rdquo;.
                        </p>
                        <p className="architecture-description">
                            By enforcing a mathematically precise dual-layer MTU system - a 1280 Byte inner payload (your raw network packet) wrapped strictly in a VPN_MTU+80 Byte outer tunnel (default 1360B, including ~80 Bytes of QUIC/UDP/IP overhead) - Mavi VPN bypasses Path MTU Discovery failures completely. This absolute limit guarantees zero fragmentation on standard connections.
                        </p>

                        <div className="arch-stats">
                            <StatCounter end={1360} suffix="B" label="Outer QUIC Wire (Default)" />
                            <StatCounter end={1280} suffix="B" label="Inner Payload" />
                            <StatCounter end={0} suffix="%" label="Fragmentation Risk" />
                        </div>
                    </div>

                    <div className="architecture-visual">
                        <div className="diagram-container glass-panel">
                            <div className="diagram-layer outer-layer">
                                <span className="layer-label">Wire Layer (Quinn) 1360B (Default)</span>
                                <div className="diagram-layer inner-layer">
                                    <span className="layer-label text-accent">Payload (TUN) 1280B</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* --- Zero Copy Section --- */}
                <div className="architecture-grid">

                    <div className="architecture-visual">
                        <div className="diagram-container glass-panel" style={{ padding: '1rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ZeroCopySvg />
                        </div>
                    </div>

                    <div className="architecture-content">
                        <h2 className="section-title">Zero-Copy Datapath.</h2>
                        <p className="architecture-description">
                            Traditional VPNs copy packet bytes multiple times between the kernel sequence and user spaces, destroying throughput and wasting CPU cycles on unnecessary memory allocations.
                        </p>
                        <p className="architecture-description">
                            Mavi VPN utilizes an advanced <strong>Zero-Copy Datapath</strong> architecture written in asynchronous Rust. Packets read from the raw TUN interface are immediately wrapped into a reference-counted <code>Bytes</code> handle and enqueued directly into the QUIC engine without a single memory clone. Maximum performance, pure efficiency.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}
