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

            {/* Kernel Space (TUN) */}
            <rect x="50" y="40" width="220" height="260" rx="10" fill="url(#kernelGrad)" stroke="var(--border-light)" strokeWidth="2" strokeDasharray="4 4" />
            <text x="160" y="75" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="700">OS Kernel</text>
            <text x="160" y="95" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">Virtual Network Layer</text>

            {/* Userspace (Rust Core) */}
            <rect x="290" y="40" width="220" height="260" rx="10" fill="url(#userspaceGrad)" stroke="var(--accent-base)" strokeWidth="2" filter="url(#zcSubtleGlow)" />
            <text x="400" y="75" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="700">Mavi Rust Core</text>
            <text x="400" y="95" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">tokio async runtime</text>

            {/* Network Interface (QUIC) */}
            <rect x="530" y="40" width="220" height="260" rx="10" fill="url(#kernelGrad)" stroke="var(--border-light)" strokeWidth="2" strokeDasharray="4 4" />
            <text x="640" y="75" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="700">Network NIC</text>
            <text x="640" y="95" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">Physical Wire</text>

            {/* Components */}
            {/* TUN Interface */}
            <rect x="100" y="145" width="120" height="50" rx="6" fill="var(--bg-primary)" stroke="#3b82f6" strokeWidth="2" />
            <text x="160" y="175" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="600">TUN (tun0)</text>

            {/* Bytes Buffer Handle (Zero Copy logic) */}
            <rect x="340" y="145" width="120" height="50" rx="6" fill="var(--bg-primary)" stroke="var(--accent-base)" strokeWidth="2" filter="url(#zcGlow)" />
            <text x="400" y="167" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="600">Bytes Ref</text>
            <text x="400" y="183" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="monospace">split_to().freeze()</text>

            {/* UDP Socket */}
            <rect x="580" y="145" width="120" height="50" rx="6" fill="var(--bg-primary)" stroke="#8b5cf6" strokeWidth="2" />
            <text x="640" y="175" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="600">UDP Port 443</text>

            {/* Paths / Lines */}
            <line x1="220" y1="170" x2="330" y2="170" stroke="var(--text-secondary)" strokeWidth="2" markerEnd="url(#zcArrow)" />
            <line x1="460" y1="170" x2="570" y2="170" stroke="var(--text-secondary)" strokeWidth="2" markerEnd="url(#zcArrow)" />

            {/* Labels explaining Zero-copy */}
            <text x="280" y="160" textAnchor="middle" fill="var(--accent-base)" fontSize="11" fontWeight="600">1. Async Read</text>
            <text x="515" y="160" textAnchor="middle" fill="var(--accent-base)" fontSize="11" fontWeight="600">2. Enqueue (No Clone)</text>

            {/* Bottom Global Text */}
            <text x="400" y="340" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="700">Zero-Copy Datapath: Pass reference handle instead of memory copying.</text>

            {/* Animated Packets */}
            {/* Tun -> Rust Buffer */}
            <g transform="translate(0, 170)">
                <circle r="6" fill="url(#tunGrad)">
                    <animate attributeName="cx" values="220; 340" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1; 1; 0" dur="2s" keyTimes="0; 0.9; 1" repeatCount="indefinite" />
                </circle>
                <circle r="4" fill="#ffffff" opacity="0.8">
                    <animate attributeName="cx" values="220; 340" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1; 1; 0" dur="2s" keyTimes="0; 0.9; 1" repeatCount="indefinite" />
                </circle>
            </g>

            {/* Rust Buffer -> QUIC (Encrypted output) */}
            <g transform="translate(0, 170)">
                <circle r="6" fill="url(#quicGrad)">
                    {/* Delayed start to simulate flow */}
                    <animate attributeName="cx" values="460; 580" dur="2s" begin="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0; 1; 1; 0" dur="2s" begin="1s" keyTimes="0; 0.1; 0.9; 1" repeatCount="indefinite" />
                </circle>
                <circle r="4" fill="#ffffff" opacity="0.8">
                    <animate attributeName="cx" values="460; 580" dur="2s" begin="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0; 1; 1; 0" dur="2s" begin="1s" keyTimes="0; 0.1; 0.9; 1" repeatCount="indefinite" />
                </circle>
            </g>
        </svg>
    );
}
