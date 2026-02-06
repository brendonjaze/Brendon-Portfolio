'use client';

import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
    const [active, setActive] = useState('');
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, height: 0, opacity: 0 });
    const navRef = useRef<HTMLUListElement>(null);
    const itemRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

    const navItems = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    useEffect(() => {
        if (!active || !itemRefs.current[active] || !navRef.current) return;

        const activeEl = itemRefs.current[active];
        const navRect = navRef.current.getBoundingClientRect();
        const itemRect = activeEl!.getBoundingClientRect();

        setPillStyle({
            left: itemRect.left - navRect.left,
            width: itemRect.width,
            height: itemRect.height,
            opacity: 1
        });
    }, [active]);

    // Handle resize to update position
    useEffect(() => {
        const handleResize = () => {
            if (active && itemRefs.current[active] && navRef.current) {
                const activeEl = itemRefs.current[active];
                const navRect = navRef.current.getBoundingClientRect();
                const itemRect = activeEl!.getBoundingClientRect();
                setPillStyle(prev => ({ ...prev, left: itemRect.left - navRect.left }));
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [active]);


    return (
        <nav>
            <div className="nav-container">
                <div className="logo">BRENDON JAZE.</div>
                <ul className="nav-links" ref={navRef} style={{ position: 'relative' }}>
                    {/* Animated Sliding Pill */}
                    <div
                        style={{
                            position: 'absolute',
                            left: pillStyle.left,
                            width: pillStyle.width,
                            height: pillStyle.height,
                            opacity: pillStyle.opacity,
                            background: 'rgba(192, 132, 252, 0.4)',
                            borderRadius: '30px',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            pointerEvents: 'none',
                            zIndex: 0 // Behind text
                        }}
                    />

                    {navItems.map((item) => (
                        <li key={item.name} style={{ zIndex: 1 }}>
                            <a
                                ref={el => { itemRefs.current[item.href] = el }} // Correctly typed ref assignment
                                href={item.href}
                                onClick={() => setActive(item.href)}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '30px',
                                    // Background removed, handled by pill
                                    color: active === item.href ? 'white' : 'inherit',
                                    transition: 'color 0.3s ease',
                                    display: 'inline-block'
                                }}
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
