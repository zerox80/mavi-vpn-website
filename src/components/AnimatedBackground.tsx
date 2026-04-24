export default function AnimatedBackground() {
    return (
        <div
            aria-hidden="true"
            style={{
                position: 'fixed',
                inset: 0,
                background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59,130,246,0.06), transparent)',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
}
