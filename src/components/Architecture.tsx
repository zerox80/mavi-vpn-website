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
            <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>

                <div className="architecture-grid">
                    <div className="architecture-content">
                        <h2 className="section-title">The &ldquo;Pinned MTU&rdquo; Paradigm.</h2>
                        <p className="architecture-description">
                            Most residential connections (DS-Lite, PPPoE) suffer from MTU limitations. Standard VPNs relying on 1500-byte packets inevitably cause fragmentation.
                        </p>
                        <p className="architecture-description">
                            By enforcing a dual-layer MTU system — a 1280B inner payload wrapped in a VPN_MTU+80B outer tunnel — Mavi VPN bypasses PMTUD failures completely. Zero fragmentation guaranteed.
                        </p>

                        <div className="arch-stats">
                            <StatCounter end={1360} suffix="B" label="Outer QUIC Wire" />
                            <StatCounter end={1280} suffix="B" label="Inner Payload" />
                            <StatCounter end={0} suffix="%" label="Fragmentation Risk" />
                        </div>
                    </div>

                    <div className="architecture-visual">
                        <div className="diagram-container">
                            <div className="diagram-layer outer-layer">
                                <span className="layer-label">Wire Layer 1360B</span>
                                <div className="diagram-layer inner-layer">
                                    <span className="layer-label text-accent">Payload 1280B</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="architecture-grid">
                    <div className="architecture-visual">
                        <div className="diagram-container" style={{ padding: '0.75rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ZeroCopySvg />
                        </div>
                    </div>

                    <div className="architecture-content">
                        <h2 className="section-title">Zero-Copy Datapath.</h2>
                        <p className="architecture-description">
                            Traditional VPNs copy packet bytes multiple times between kernel and userspace, destroying throughput.
                        </p>
                        <p className="architecture-description">
                            Mavi VPN uses an advanced <strong>Zero-Copy Datapath</strong> in async Rust. Packets from the TUN interface are wrapped into reference-counted <code>Bytes</code> handles and enqueued directly into QUIC without a single memory clone.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
