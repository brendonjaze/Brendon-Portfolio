"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InteractiveRobot() {
    const [isMounted, setIsMounted] = useState(false);
    const [shouldDisplay, setShouldDisplay] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

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

    // Listen for mousemove coordinates echoed back from robot.html via postMessage.
    // The iframe captures real pointer events (so the Spline robot tracks the cursor),
    // and we re-dispatch them on the parent window so the CursorComet keeps animating.
    useEffect(() => {
        if (!shouldDisplay) return;

        const handleMessage = (e: MessageEvent) => {
            if (e.data?.type === 'iframe-mousemove') {
                const iframe = iframeRef.current;
                if (!iframe) return;

                const rect = iframe.getBoundingClientRect();
                // Translate iframe-relative coords to parent page coords
                const parentX = e.data.x + rect.left;
                const parentY = e.data.y + rect.top;

                // Dispatch a real mousemove on the parent window
                // so CursorComet and other effects keep working
                window.dispatchEvent(new MouseEvent('mousemove', {
                    clientX: parentX,
                    clientY: parentY,
                    bubbles: true,
                    cancelable: true,
                }));
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [shouldDisplay]);

    if (!isMounted) return null;

    return (
        <div className="fixed bottom-0 right-0 z-10 pointer-events-none select-none overflow-hidden">
            <AnimatePresence>
                {shouldDisplay && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 100 }}
                        animate={{ opacity: 0.6, scale: 1, y: 40 }}
                        exit={{ opacity: 0, scale: 0.8, y: 100 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="w-[350px] h-[350px] md:w-[500px] md:h-[500px] -mr-20 -mb-20"
                    >
                        <iframe
                            ref={iframeRef}
                            src="/robot.html"
                            title="Interactive Robot"
                            className="w-full h-full border-0 pointer-events-auto"
                            scrolling="no"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

