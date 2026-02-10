'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

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
        <nav className="fixed top-0 left-0 w-full h-[70px] z-[1000] flex justify-center items-center pointer-events-none">
            <div className="pointer-events-auto w-[90%] max-w-[1200px] flex justify-between items-center px-8 py-2.5 bg-[#add8e6]/5 backdrop-blur-md rounded-full border border-[#add8e6]/15 shadow-sm">
                <div className="font-heading text-2xl font-extrabold bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent">
                    BRENDON JAZE.
                </div>

                <ul className="hidden md:flex gap-4 relative" ref={navRef}>
                    {/* Animated Sliding Pill */}
                    <div
                        className="absolute bg-primary/40 rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] -z-10"
                        style={{
                            left: pillStyle.left,
                            width: pillStyle.width,
                            height: pillStyle.height,
                            opacity: pillStyle.opacity,
                        }}
                    />

                    {navItems.map((item) => (
                        <li key={item.name} className="z-10">
                            <a
                                ref={el => { itemRefs.current[item.href] = el }}
                                href={item.href}
                                onClick={() => setActive(item.href)}
                                className={`inline-block px-5 py-2 rounded-full transition-colors duration-300 ${active === item.href ? 'text-white' : 'text-text-main hover:text-primary-light'
                                    }`}
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
