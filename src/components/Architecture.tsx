export default function Architecture() {
    return (
        <section className="architecture-section" id="architecture">
            <div className="architecture-grid">
                <div className="architecture-content">
                    <p className="eyebrow">Packet design</p>
                    <h2 className="section-title">A smaller packet. A clearer path.</h2>
                    <p className="architecture-description">A 1280-byte inner payload travels inside a 1360-byte outer QUIC packet. The pinned MTU strategy is designed for constrained links such as DS-Lite and PPPoE.</p>
                    <dl className="arch-stats">
                        <div className="stat-item"><dt className="stat-label">Outer packet</dt><dd className="stat-value">1360<span>B</span></dd></div>
                        <div className="stat-item"><dt className="stat-label">Inner payload</dt><dd className="stat-value">1280<span>B</span></dd></div>
                        <div className="stat-item"><dt className="stat-label">Envelope</dt><dd className="stat-value">80<span>B</span></dd></div>
                    </dl>
                </div>
                <div className="architecture-visual" role="img" aria-label="A 1280-byte inner payload inside a 1360-byte outer QUIC packet.">
                    <div className="diagram-container">
                        <div className="diagram-layer outer-layer">
                            <span className="layer-label">QUIC packet · 1360 B</span>
                            <div className="diagram-layer inner-layer"><span className="layer-label text-accent">IP payload · 1280 B</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
