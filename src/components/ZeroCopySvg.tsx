import { ArrowRight } from 'lucide-react';

export default function ZeroCopySvg() {
    return (
        <figure className="datapath-diagram">
            <figcaption>From interface to wire</figcaption>
            <ol className="datapath-nodes">
                <li><span className="diagram-label">01 / OS kernel</span><strong>TUN interface</strong><code>tun0</code><ArrowRight size={18} aria-hidden="true" /></li>
                <li><span className="diagram-label">02 / Rust core</span><strong>Shared buffer</strong><code>split().freeze()</code><ArrowRight size={18} aria-hidden="true" /></li>
                <li><span className="diagram-label">03 / Network</span><strong>QUIC datagram</strong><code>UDP · port 443</code></li>
            </ol>
            <p className="diagram-note">Read once, pass by reference. The Rust core runs on Tokio.</p>
        </figure>
    );
}
