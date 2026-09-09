import MobileDisclosure from '../components/MobileDisclosure';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Copy, Monitor, Smartphone, Terminal } from 'lucide-react';
import FAQ from '../components/FAQ';
import Overview from '../components/Overview';
import TerminalMockup from '../components/TerminalMockup';

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
                <p className="eyebrow">Open source. Open internet.</p>
                <h1 id="headline">A little more<br /><span className="text-accent">freedom online.</span></h1>
                <p className="lede">An open-source VPN for a fast, encrypted connection. Built with Rust and QUIC.</p>
                <div className="hero-actions">
                    <Link className="button" to="/#downloads">Get Mavi VPN <ArrowDown size={16} aria-hidden="true" /></Link>
                    <a className="text-link" href="https://github.com/zerox80/mavi-vpn" target="_blank" rel="noopener noreferrer">View on GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>
                </div>
                <div className="hero-footnote"><span>Windows · Linux · Android</span><span>MIT licensed</span></div>
            </section>

            <section className="download-panel" id="downloads" aria-labelledby="download-title">
                <div className="section-intro">
                    <p className="eyebrow">01 / Get connected</p>
                    <h2 id="download-title">Choose your platform.</h2>
                    <p>The latest releases, directly from the source.</p>
                </div>
                <div className="download-options">
                    <div className="platform-list">
                        {platforms.map(({ name, detail, icon: Icon }) => (
                            <a className="platform-row" key={name} href="https://github.com/zerox80/mavi-vpn/releases" target="_blank" rel="noopener noreferrer" aria-label={name + ' releases on GitHub'}>
                                <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                                <div className="platform-info"><span className="platform-name">{name}</span><span className="platform-detail">{detail}</span></div>
                                <span className="platform-action">GitHub releases <ArrowUpRight size={16} aria-hidden="true" /></span>
                            </a>
                        ))}
                    </div>
                    <div className="download-note"><p>iOS and router support are on the roadmap.</p><Link className="text-link" to="/#docs">Setup instructions <ArrowDown size={14} aria-hidden="true" /></Link></div>
                </div>
            </section>

            <Overview />

            <section className="setup-section" aria-labelledby="setup-title">
                <div className="section-intro"><p className="eyebrow">03 / From the source</p><h2 id="setup-title">Make it your own.</h2><p>Build the Rust core, configure your server, and connect.</p></div>
                <MobileDisclosure title="Build & setup" revealHashes={['docs']}>
                <div className="setup-content">
                    <div className="source-install">
                        <p className="command-label">Start with the source</p>
                        <div className="hero-command">
                            <code>{CLONE_COMMAND}</code>
                            <button type="button" className="hero-command-copy" onClick={handleCopyCommand} aria-label={copyState === 'copied' ? 'Clone command copied' : 'Copy clone command'} title={copyState === 'copied' ? 'Copied' : 'Copy command'}>{copyState === 'copied' ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}</button>
                        </div>
                        <p className={copyState === 'error' ? 'copy-feedback' : 'sr-only'} role="status">{copyState === 'error' ? 'Could not copy. Select the command to copy it manually.' : copyState === 'copied' ? 'Clone command copied to clipboard.' : ''}</p>
                    </div>
                    <details className="setup-details" id="docs">
                        <summary><span>From source to a working tunnel</span><span className="setup-summary-end">3 steps <ChevronDown size={16} aria-hidden="true" /></span></summary>
                        <div className="docs-grid">
                            <ol className="docs-steps">
                                <li className="wp-step"><span className="wp-step-number">01</span><div className="wp-step-content"><h3>Clone and build</h3><p>Run <code>cargo build --release</code> to compile the Rust core and CLI for your platform.</p></div></li>
                                <li className="wp-step"><span className="wp-step-number">02</span><div className="wp-step-content"><h3>Configure the server</h3><p>Set the listen address, pinned VPN_MTU, and Keycloak OIDC endpoint in <code>server.toml</code>.</p></div></li>
                                <li className="wp-step"><span className="wp-step-number">03</span><div className="wp-step-content"><h3>Connect</h3><p>The client completes a QUIC/TLS 1.3 handshake and authenticates against Keycloak.</p></div></li>
                            </ol>
                            <div><p className="terminal-example-label">Example server session</p><TerminalMockup /></div>
                            <Link className="text-link" to="/whitepaper">Read the whitepaper <ArrowUpRight size={14} aria-hidden="true" /></Link>
                        </div>
                    </details>
                </div>
                </MobileDisclosure>
            </section>
            <FAQ />
        </div>
    );
}
