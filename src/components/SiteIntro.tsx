'use client';

import { useState, useEffect } from 'react';
import PortalIntro from './PortalIntro';

export default function SiteIntro() {
    const [started, setStarted] = useState(false);
    const [showIntro, setShowIntro] = useState(true);

    // Prevent scrolling while intro is playing
    useEffect(() => {
        if (showIntro) {
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0); // Ensure top of page
        } else {
            document.body.style.overflow = '';
        }
    }, [showIntro]);

    if (!showIntro) return null;

    if (!started) {
        return (
            <div
                onClick={() => setStarted(true)}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: '#000',
                    zIndex: 100000,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    fontFamily: 'var(--font-heading)',
                }}
            >
                <div style={{
                    fontSize: '1.5rem',
                    letterSpacing: '0.2em',
                    opacity: 0.8,
                    animation: 'pulse 2s infinite'
                }}>
                    CLICK TO ENTER
                </div>
                <style jsx>{`
                    @keyframes pulse {
                        0% { opacity: 0.4; text-shadow: 0 0 10px rgba(192, 132, 252, 0); }
                        50% { opacity: 1; text-shadow: 0 0 20px rgba(192, 132, 252, 0.5); }
                        100% { opacity: 0.4; text-shadow: 0 0 10px rgba(192, 132, 252, 0); }
                    }
                `}</style>
            </div>
        );
    }

    return <PortalIntro onComplete={() => setShowIntro(false)} />;
}
