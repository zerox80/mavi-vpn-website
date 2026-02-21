export default function ZeroCopySvg() {
    return (
        <svg
            viewBox="0 0 800 400"
            className="w-full h-auto text-primary"
            style={{ fontFamily: 'Inter, sans-serif' }}
        >
            <defs>
                {/* Glow Effects */}
                <filter id="zcGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="zcSubtleGlow" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Data Packet Gradients */}
                <linearGradient id="tunGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
                <linearGradient id="quicGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#6d28d9" />
                </linearGradient>

                {/* Area Gradients */}
                <linearGradient id="kernelGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--bg-secondary)" />
                    <stop offset="100%" stopColor="var(--bg-primary)" />
                </linearGradient>
                <linearGradient id="userspaceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--bg-tertiary)" />
                    <stop offset="100%" stopColor="var(--bg-primary)" />
                </linearGradient>

                <marker id="zcArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-secondary)" />
                </marker>
            </defs>

            {/* Background Architecture Areas */}
            <rect width="800" height="400" fill="transparent" />

            <g transform="translate(50, 40)">
                {/* Kernel Space (TUN) */}
                <rect width="200" height="320" rx="10" fill="url(#kernelGrad)" stroke="var(--border-light)" strokeWidth="2" strokeDasharray="4 4" />
                <text x="100" y="30" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="700">OS Kernel</text>
                <text x="100" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">Virtual Network Layer</text>

                {/* Userspace (Rust Core) */}
                <rect x="250" y="0" width="200" height="320" rx="10" fill="url(#userspaceGrad)" stroke="var(--accent-base)" strokeWidth="2" filter="url(#zcSubtleGlow)" />
                <text x="350" y="30" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="700">Mavi Rust Core</text>
                <text x="350" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">tokio async runtime</text>

                {/* Network Interface (QUIC) */}
                <rect x="500" y="0" width="200" height="320" rx="10" fill="url(#kernelGrad)" stroke="var(--border-light)" strokeWidth="2" strokeDasharray="4 4" />
                <text x="600" y="30" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="700">Network NIC</text>
                <text x="600" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">Physical Wire</text>
            </g>

            {/* Components */}
            {/* TUN Interface */}
            <g transform="translate(100, 180)">
                <rect width="100" height="50" rx="6" fill="var(--bg-primary)" stroke="#3b82f6" strokeWidth="2" />
                <text x="50" y="30" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="600">TUN (tun0)</text>
            </g>

            {/* Bytes Buffer Handle (Zero Copy logic) */}
            <g transform="translate(300, 180)">
                <rect width="100" height="50" rx="6" fill="var(--bg-primary)" stroke="var(--accent-base)" strokeWidth="2" filter="url(#zcGlow)" />
                <text x="50" y="22" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="600">Bytes Ref</text>
                <text x="50" y="38" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="monospace">split_to().freeze()</text>
            </g>

            {/* UDP Socket */}
            <g transform="translate(550, 180)">
                <rect width="100" height="50" rx="6" fill="var(--bg-primary)" stroke="#8b5cf6" strokeWidth="2" />
                <text x="50" y="30" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="600">UDP Port 443</text>
            </g>

            {/* Paths / Lines */}
            <path d="M 200 205 L 300 205" stroke="var(--text-secondary)" strokeWidth="2" fill="none" />
            <path d="M 400 205 L 550 205" stroke="var(--text-secondary)" strokeWidth="2" fill="none" />

            {/* Labels explaining Zero-copy */}
            <text x="250" y="195" textAnchor="middle" fill="var(--accent-base)" fontSize="11" fontWeight="600">1. Async Read</text>
            <text x="475" y="195" textAnchor="middle" fill="var(--accent-base)" fontSize="11" fontWeight="600">2. QUIC Enqueue (No Clone)</text>

            <text x="400" y="330" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="700">Zero-Copy Datapath: Pass reference handle instead of mem-copying.</text>

            {/* Animated Packets */}
            {/* Tun -> Rust Buffer */}
            <g transform="translate(200, 205)">
                <circle r="6" fill="url(#tunGrad)">
                    <animate attributeName="cx" values="0; 100" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1; 1; 0" dur="2s" keyTimes="0; 0.9; 1" repeatCount="indefinite" />
                </circle>
                <circle r="4" fill="#ffffff" opacity="0.8">
                    <animate attributeName="cx" values="0; 100" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1; 1; 0" dur="2s" keyTimes="0; 0.9; 1" repeatCount="indefinite" />
                </circle>
            </g>

            {/* Rust Buffer -> QUIC (Encrypted output) */}
            <g transform="translate(400, 205)">
                <circle r="6" fill="url(#quicGrad)">
                    {/* Delayed start to simulate flow */}
                    <animate attributeName="cx" values="0; 150" dur="2s" begin="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0; 1; 1; 0" dur="2s" begin="1s" keyTimes="0; 0.1; 0.9; 1" repeatCount="indefinite" />
                </circle>
                <circle r="4" fill="#ffffff" opacity="0.8">
                    <animate attributeName="cx" values="0; 150" dur="2s" begin="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0; 1; 1; 0" dur="2s" begin="1s" keyTimes="0; 0.1; 0.9; 1" repeatCount="indefinite" />
                </circle>
            </g>
        </svg>
    );
}
