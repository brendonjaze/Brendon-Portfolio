'use client';

import { useEffect, useRef } from 'react';

export default function CursorLight() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const updateCursor = (e: MouseEvent) => {
            // Direct DOM manipulation for zero-lag response
            cursor.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
        };

        window.addEventListener('mousemove', updateCursor);

        return () => {
            window.removeEventListener('mousemove', updateCursor);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(192, 132, 252, 0.25) 0%, rgba(192, 132, 252, 0.1) 20%, transparent 40%)',
                transform: 'translate(-500px, -500px)', // Start off-screen
                pointerEvents: 'none',
                zIndex: 9999,
                mixBlendMode: 'screen',
                willChange: 'transform', // Optimization for smooth movement
            }}
        />
    );
}
