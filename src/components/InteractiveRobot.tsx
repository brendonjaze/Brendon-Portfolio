"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InteractiveRobot() {
    const [isMounted, setIsMounted] = useState(false);
    const [shouldDisplay, setShouldDisplay] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        // PERFORMANCE & STABILITY:
        // We defer the robot for 3 seconds to protect the initial Lighthouse performance score.
        // The iframe approach isolates the 3D engine from Next.js, preventing 'Missing property' errors.
        const timer = setTimeout(() => {
            setShouldDisplay(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="fixed bottom-0 right-0 z-0 pointer-events-none select-none overflow-hidden">
            <AnimatePresence>
                {shouldDisplay && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 100 }}
                        animate={{ opacity: 0.5, scale: 1, y: 40 }}
                        exit={{ opacity: 0, scale: 0.8, y: 100 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] -mr-16 -mb-16"
                    >
                        <iframe
                            src="/robot.html"
                            title="Interactive Robot"
                            className="w-full h-full border-0"
                            scrolling="no"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
