'use client';

import { useState, useEffect } from 'react';
import PortalIntro from './PortalIntro';

export default function SiteIntro() {
    const [showIntro, setShowIntro] = useState(true);

    // Prevent scrolling while intro is playing
    useEffect(() => {
        if (showIntro) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [showIntro]);

    if (!showIntro) return null;

    return <PortalIntro onComplete={() => setShowIntro(false)} />;
}
