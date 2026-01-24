'use client';

import { useEffect, useState } from 'react';

export default function CursorLight() {
    const [position, setPosition] = useState({ x: -500, y: -500 }); // Start off-screen

    useEffect(() => {
        const updateCursor = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateCursor);

        return () => {
            window.removeEventListener('mousemove', updateCursor);
        };
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(192, 132, 252, 0.12) 0%, transparent 70%)',
                transform: `translate(${position.x - 250}px, ${position.y - 250}px)`,
                pointerEvents: 'none',
                zIndex: 9999,
                transition: 'transform 0.15s cubic-bezier(0.2, 0, 0.4, 1)', // Smooth lag effect
                mixBlendMode: 'screen', // Helps it blend nicely like light
            }}
        />
    );
}
