'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [active, setActive] = useState('');
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, height: 0, opacity: 0 });
    const [menuOpen, setMenuOpen] = useState(false);
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

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full h-[70px] z-[1000] flex justify-center items-center pointer-events-none">
                <div className="pointer-events-auto w-[90%] max-w-[1200px] flex justify-between items-center px-5 md:px-8 py-2.5 bg-[#add8e6]/5 backdrop-blur-md rounded-full border border-[#add8e6]/15 shadow-sm">
                    <div className="font-heading text-xl md:text-2xl font-extrabold bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent">
                        BRENDON JAZE.
                    </div>

                    {/* Desktop nav */}
                    <ul className="hidden md:flex gap-4 relative" ref={navRef}>
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
                                    className={`inline-block px-5 py-2 rounded-full transition-colors duration-300 ${active === item.href ? 'text-white' : 'text-text-main hover:text-primary-light'}`}
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg hover:bg-white/5 transition-colors"
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            className="block w-5 h-px bg-white rounded-full origin-center"
                            animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.22 }}
                        />
                        <motion.span
                            className="block w-5 h-px bg-white rounded-full"
                            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.18 }}
                        />
                        <motion.span
                            className="block w-5 h-px bg-white rounded-full origin-center"
                            animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.22 }}
                        />
                    </button>
                </div>
            </nav>

            {/* Mobile dropdown menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="fixed top-[78px] left-4 right-4 z-[999] rounded-2xl overflow-hidden md:hidden"
                        style={{
                            background: 'rgba(18, 6, 38, 0.97)',
                            border: '1px solid rgba(192,132,252,0.18)',
                            backdropFilter: 'blur(24px)',
                        }}
                    >
                        <div className="flex flex-col py-2">
                            {navItems.map((item, i) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05, duration: 0.2 }}
                                    onClick={() => { setActive(item.href); setMenuOpen(false); }}
                                    className="px-6 py-4 text-base font-medium text-white/70 hover:text-white hover:bg-primary/10 transition-colors border-b border-white/5 last:border-0"
                                >
                                    {item.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
