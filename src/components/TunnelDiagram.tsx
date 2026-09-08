import { ArrowDown, ArrowUpRight, Globe2, Laptop, LockKeyhole, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TunnelDiagram() {
    return (
        <div className="tunnel-diagram">
            <div className="tunnel-caption"><span>THE PRIVATE PATH</span><span>01 — 03</span></div>
            <div className="tunnel-flow" role="img" aria-label="Protocol diagram: your device sends traffic through a Mavi QUIC tunnel, encrypted with TLS 1.3, to the open internet. HTTP/3 and MASQUE frame the traffic.">
                <div className="tunnel-endpoint"><span className="endpoint-icon"><Laptop size={23} strokeWidth={1.5} /></span><div><strong>Your device</strong><span>Windows · Linux · Android</span></div><span className="endpoint-number">01</span></div>
                <div className="tunnel-connector"><span className="packet-line" /><span className="connector-label"><LockKeyhole size={12} /> Encrypted with TLS 1.3</span><ArrowDown size={15} /></div>
                <div className="tunnel-core"><span className="tunnel-core-icon"><ShieldCheck size={31} strokeWidth={1.4} /></span><div><strong>Mavi tunnel</strong><span>Private by protocol.</span></div><span className="tunnel-core-tag">QUIC</span></div>
                <div className="tunnel-connector"><span className="packet-line" /><span className="connector-label">HTTP/3 + MASQUE</span><ArrowDown size={15} /></div>
                <div className="tunnel-endpoint"><span className="endpoint-icon"><Globe2 size={23} strokeWidth={1.5} /></span><div><strong>The open internet</strong><span>One resilient connection</span></div><span className="endpoint-number">03</span></div>
            </div>
            <Link to="/technology" className="tunnel-footer"><span>Explore the protocol</span><ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
    );
}
