import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let time = 0;

        const blobs = [
            { x: 0.2, y: 0.3, r: 0.25, speed: 0.0003, phase: 0, color: 'rgba(37, 99, 235, 0.08)' },
            { x: 0.7, y: 0.2, r: 0.3, speed: 0.0004, phase: 2, color: 'rgba(99, 102, 241, 0.06)' },
            { x: 0.5, y: 0.6, r: 0.35, speed: 0.0002, phase: 4, color: 'rgba(14, 165, 233, 0.05)' },
            { x: 0.8, y: 0.7, r: 0.2, speed: 0.0005, phase: 1, color: 'rgba(37, 99, 235, 0.04)' },
            { x: 0.3, y: 0.8, r: 0.28, speed: 0.0003, phase: 3, color: 'rgba(168, 85, 247, 0.04)' },
        ];

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
            ctx.scale(dpr, dpr);
        };

        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            ctx.clearRect(0, 0, w, h);

            for (const blob of blobs) {
                const cx = blob.x * w + Math.sin(time * blob.speed * 1000 + blob.phase) * w * 0.08;
                const cy = blob.y * h + Math.cos(time * blob.speed * 800 + blob.phase * 1.3) * h * 0.06;
                const r = blob.r * Math.min(w, h) + Math.sin(time * blob.speed * 600 + blob.phase * 0.7) * 30;

                const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
                gradient.addColorStop(0, blob.color);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.beginPath();
                ctx.fillStyle = gradient;
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.fill();
            }

            time += 16;
            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
}
