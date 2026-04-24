export default function TerminalMockup() {
    return (
        <div className="hero-terminal">
            <div className="terminal-header">
                <span className="terminal-dot terminal-dot-red" />
                <span className="terminal-dot terminal-dot-yellow" />
                <span className="terminal-dot terminal-dot-green" />
                <span className="terminal-title">mavi-vpn — server</span>
            </div>
            <div className="terminal-body">
                <div className="terminal-line">
                    <span className="terminal-prompt">$</span>
                    <span className="terminal-cmd">mavi-vpn-server --config /etc/mavi/server.toml</span>
                </div>
                <div className="terminal-line">
                    <span className="terminal-comment">&nbsp;# Mavi VPN Server v0.9 — Rust / Quinn / Tokio</span>
                </div>
                <div className="terminal-line">
                    <span className="terminal-success">&nbsp;✓</span>
                    <span className="terminal-accent">QUIC listener</span>
                    <span>&nbsp;bound to 0.0.0.0:443</span>
                </div>
                <div className="terminal-line">
                    <span className="terminal-success">&nbsp;✓</span>
                    <span className="terminal-accent">ECH keys</span>
                    <span>&nbsp;loaded (X25519 / HPKE)</span>
                </div>
                <div className="terminal-line">
                    <span className="terminal-success">&nbsp;✓</span>
                    <span className="terminal-accent">MASQUE</span>
                    <span>&nbsp;capsule framing enabled (RFC 9484)</span>
                </div>
                <div className="terminal-line">
                    <span className="terminal-success">&nbsp;✓</span>
                    <span className="terminal-accent">GSO/GRO</span>
                    <span>&nbsp;offload active · BBR congestion control</span>
                </div>
                <div className="terminal-line">
                    <span className="terminal-warn">&nbsp;→</span>
                    <span>&nbsp;Client connected:</span>
                    <span className="terminal-success">&nbsp;10.8.0.2</span>
                    <span>&nbsp;(CR Level 2 + ECH)</span>
                </div>
                <div className="terminal-line">
                    <span className="terminal-success">&nbsp;•</span>
                    <span>&nbsp;Throughput:</span>
                    <span className="terminal-accent">&nbsp;891 Mbit/s</span>
                    <span>&nbsp;· 0 fragments · 0 drops</span>
                    <span className="terminal-cursor" />
                </div>
            </div>
        </div>
    );
}
