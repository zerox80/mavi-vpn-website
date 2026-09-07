import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Copy, Monitor, Smartphone, Terminal } from 'lucide-react';
import FAQ from '../components/FAQ';
import Overview from '../components/Overview';
import TerminalMockup from '../components/TerminalMockup';
import TunnelDiagram from '../components/TunnelDiagram';
import { GitHub } from '../components/icons/GitHub';

const CLONE_COMMAND = 'git clone https://github.com/zerox80/mavi-vpn';
const platforms = [
    { name: 'Windows', detail: 'WinTUN · x64 / ARM64', icon: Monitor },
    { name: 'Linux', detail: 'TUN · systemd', icon: Terminal },
    { name: 'Android', detail: 'Kotlin · Rust JNI', icon: Smartphone },
];

export default function Home() {
    const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
    const handleCopyCommand = async () => {
        try {
            await navigator.clipboard.writeText(CLONE_COMMAND);
            setCopyState('copied');
        } catch {
            setCopyState('error');
        }
    };
    return (
        <div className="home-page">
            <section className="hero" aria-labelledby="headline">
                <div className="hero-main">
                    <div className="hero-content">
                        <div className="hero-version"><span className="hero-version-tag">OPEN SOURCE</span><span>v0.9 <span aria-hidden="true">/</span> MIT licensed</span></div>
                        <h1 id="headline">Invisibility meets<br /><span className="text-accent">performance.</span></h1>
                        <p className="lede">An open-source VPN built on QUIC and Rust. Encrypted traffic, resilient connections, and a protocol designed for restrictive networks.</p>
                        <div className="hero-actions">
                            <Link className="button icon-link" to="/#downloads">Get Mavi VPN <ArrowDown size={16} aria-hidden="true" /></Link>
                            <a className="button secondary icon-link" href="https://github.com/zerox80/mavi-vpn" target="_blank" rel="noopener noreferrer"><GitHub size={16} /> Explore the source</a>
                        </div>
                        <div className="hero-platforms"><Monitor size={14} aria-hidden="true" /><span>Windows</span><span aria-hidden="true">/</span><span>Linux</span><span aria-hidden="true">/</span><span>Android</span></div>
                    </div>
                    <TunnelDiagram />
                </div>
                <dl className="hero-stats" aria-label="Protocol highlights">
                    <div><dt>Throughput</dt><dd>890 <span>Mbit/s</span></dd></div>
                    <div><dt>Inner payload</dt><dd>1280 <span>bytes</span></dd></div>
                    <div><dt>Encryption</dt><dd>TLS <span>1.3</span></dd></div>
                    <div><dt>Implementation</dt><dd>Rust <span>zero-copy</span></dd></div>
                </dl>
            </section>
            <div className="home-workspace">
                <Overview />
                <aside className="download-panel" id="downloads" aria-labelledby="download-title">
                    <div className="panel-heading"><div><p className="eyebrow">Start here</p><h2 id="download-title">Get Mavi VPN</h2></div><ArrowDown size={20} className="text-accent" aria-hidden="true" /></div>
                    <div className="platform-grid">
                        {platforms.map(({ name, detail, icon: Icon }) => (
                            <a className="platform-row" key={name} href="https://github.com/zerox80/mavi-vpn/releases" target="_blank" rel="noopener noreferrer" aria-label={name + ' releases on GitHub'}>
                                <Icon size={20} aria-hidden="true" /><div><div className="platform-name">{name}</div><div className="platform-detail">{detail}</div></div><ArrowUpRight size={16} aria-hidden="true" />
                            </a>
                        ))}
                    </div>
                    <p className="release-note">Releases on GitHub. iOS and router support are on the roadmap.</p>
                    <div className="source-install">
                        <div className="source-install-label"><Terminal size={16} aria-hidden="true" /> Build from source</div>
                        <div className="hero-command">
                            <div className="hero-command-line"><span className="hero-command-prompt" aria-hidden="true">$</span><span className="hero-command-text">{CLONE_COMMAND}</span></div>
                            <button type="button" className="hero-command-copy" onClick={handleCopyCommand} aria-label={copyState === 'copied' ? 'Clone command copied' : 'Copy clone command'} title={copyState === 'copied' ? 'Copied' : 'Copy command'}>{copyState === 'copied' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}</button>
                        </div>
                        <p className={copyState === 'error' ? 'copy-feedback' : 'sr-only'} role="status">{copyState === 'error' ? 'Could not copy. Select the command to copy it manually.' : copyState === 'copied' ? 'Clone command copied to clipboard.' : ''}</p>
                        <Link className="text-link" to="/#docs">Setup instructions <ArrowUpRight size={14} aria-hidden="true" /></Link>
                    </div>
                </aside>
            </div>
            <details className="setup-details" id="docs">
                <summary><span className="setup-heading"><Terminal size={18} aria-hidden="true" /><span>From source to a working tunnel</span></span><span className="setup-summary-end"><span>3 steps</span><ChevronDown size={18} aria-hidden="true" /></span></summary>
                <div className="docs-grid">
                    <ol className="docs-steps">
                        <li className="wp-step"><span className="wp-step-number">01</span><div className="wp-step-content"><h3>Clone and build</h3><p>Run <code>cargo build --release</code> to compile the Rust core and CLI for your target platform.</p></div></li>
                        <li className="wp-step"><span className="wp-step-number">02</span><div className="wp-step-content"><h3>Configure the server</h3><p>Set the listen address, pinned VPN_MTU, and Keycloak OIDC endpoint in <code>server.toml</code>.</p></div></li>
                        <li className="wp-step"><span className="wp-step-number">03</span><div className="wp-step-content"><h3>Connect</h3><p>The client completes a QUIC/TLS 1.3 handshake and authenticates against Keycloak.</p></div></li>
                    </ol>
                    <div><p className="terminal-example-label">Example server session</p><TerminalMockup /></div>
                    <Link className="text-link" to="/whitepaper">Read the full whitepaper <ArrowUpRight size={14} aria-hidden="true" /></Link>
                </div>
            </details>
            <FAQ />
        </div>
    );
}
