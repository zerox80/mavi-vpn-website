import { ArrowRight, ArrowUpRight, Globe2, Laptop, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TunnelDiagram() {
    return (
        <div className="tunnel-diagram">
            <div className="tunnel-caption"><span>PROTOCOL OVERVIEW</span><span className="tunnel-encryption"><ShieldCheck size={14} aria-hidden="true" /> TLS 1.3</span></div>
            <div className="tunnel-flow" role="img" aria-label="Your device sends traffic through an encrypted Mavi QUIC tunnel to the network, using HTTP/3 and MASQUE framing.">
                <div className="tunnel-endpoint"><Laptop size={25} strokeWidth={1.4} /><span>Your device</span></div>
                <div className="tunnel-connector"><span /><ArrowRight size={15} /></div>
                <div className="tunnel-core"><ShieldCheck size={29} strokeWidth={1.4} /><span>MAVI</span></div>
                <div className="tunnel-connector"><span /><ArrowRight size={15} /></div>
                <div className="tunnel-endpoint"><Globe2 size={25} strokeWidth={1.4} /><span>The network</span></div>
            </div>
            <div className="tunnel-protocols"><span>QUIC</span><span>HTTP/3</span><span>MASQUE</span><span>ECH</span></div>
            <Link to="/technology" className="tunnel-footer"><span>Inside the encrypted tunnel</span><ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
    );
}
