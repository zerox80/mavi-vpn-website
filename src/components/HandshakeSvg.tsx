import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export default function HandshakeSvg() {
    return (
        <figure className="handshake-diagram">
            <figcaption>Client ↔ Mavi server</figcaption>
            <ol className="handshake-steps">
                <li><ArrowUpRight size={18} aria-hidden="true" /><div><strong>TLS 1.3 handshake</strong><span>ALPN h3 in CR mode · 0-RTT on resumption</span></div></li>
                <li><ArrowUpRight size={18} aria-hidden="true" /><div><strong>Authentication stream</strong><span>Client sends its token over a reliable QUIC stream.</span></div></li>
                <li><ArrowDownLeft size={18} aria-hidden="true" /><div><strong>Configuration & encrypted traffic</strong><span>IP, DNS and routes assigned. IP packets use QUIC datagrams.</span></div></li>
            </ol>
            <p className="diagram-note">Invalid token or active probe → HTTP/3 response resembling an Nginx page.</p>
        </figure>
    );
}
