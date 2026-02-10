'use client';

import { useEffect, useRef, useState } from 'react';

interface Spark {
    x: number;
    y: number;
    angle: number;
    radius: number;
    speed: number;
    size: number;
    color: string;
    life: number;
    maxLife: number;
    vx: number;
    vy: number;
    decay: number;
    onRing: boolean;
}

export default function PortalIntro({ onComplete }: { onComplete: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', resize);
        resize();

        // Initialize
        const center = { x: width / 2, y: height / 2 };
        let sparks: Spark[] = [];
        let frame = 0;
        let portalRadius = 0; // Starts at 0
        const targetRadius = Math.max(width, height) * 1.2; // Expand beyond screen
        let expansionSpeed = 0;

        const createSpark = (onRing: boolean, radius: number, speedMult: number): Spark => {
            const angle = Math.random() * Math.PI * 2;
            const tangentialSpeed = 0.2 + Math.random() * 0.1; // Fast rotation

            // Color Gradient Strategy: 
            // Core: White/Light Yellow (#FFFACD)
            // Mid: Gold/Orange (#FFA500)
            // Edge: Red/Dark Orange (#FF4500)
            const colors = ['#FFFACD', '#FFD700', '#FFA500', '#FF4500'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            return {
                x: center.x + Math.cos(angle) * radius,
                y: center.y + Math.sin(angle) * radius,
                angle: angle,
                radius: radius,
                speed: tangentialSpeed * (Math.random() > 0.5 ? 1 : 1), // All rotate same direction usually (CCW)
                vx: 0, // Calculated per frame
                vy: 0,
                size: Math.random() * 2 + 1,
                color: color,
                life: 1.0,
                decay: 0.01 + Math.random() * 0.03,
                onRing: onRing,
                maxLife: 0 // Not used in new logic, but required by interface
            };
        };

        const render = () => {
            frame++;

            // Clear with slight trail for motion blur feel
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(0, 0, width, height);

            // Set additive blending for glowing magma look
            ctx.globalCompositeOperation = 'lighter';

            // Animation Phases
            if (frame < 80) {
                // Phase 1: Sparkler / Ignition
                // Sparks are generated at center and fly outward chaotically
                if (frame % 2 === 0) {
                    for (let i = 0; i < 10; i++) {
                        const s = createSpark(false, Math.random() * 30, 1);
                        s.vx = (Math.random() - 0.5) * 10;
                        s.vy = (Math.random() - 0.5) * 10;
                        sparks.push(s);
                    }
                }
            } else if (frame < 250) {
                // Phase 2: Ring formation and Stable Spin
                portalRadius += (250 - portalRadius) * 0.05; // Ease to 250px stable size

                // Spawn MANY sparks on the ring
                for (let i = 0; i < 50; i++) {
                    const r = portalRadius + (Math.random() - 0.5) * 10; // Tight variance
                    const s = createSpark(true, r, 1);
                    sparks.push(s);
                }
            } else {
                // Phase 3: Expansion (The "Opening")
                expansionSpeed += 0.5; // Accelerate expansion
                portalRadius += expansionSpeed;

                // Continue spawning on the ring as it grows
                const circumference = 2 * Math.PI * portalRadius;
                const density = circumference / 10; // Adapt spawn rate to size
                for (let i = 0; i < density; i++) {
                    const r = portalRadius + (Math.random() - 0.5) * 15;
                    const s = createSpark(true, r, 1);
                    sparks.push(s);
                }
            }

            // Draw The Hole Logic (Visual Cutout)
            // We switch back to normal blending to cut the hole
            if (portalRadius > 50) {
                ctx.save();
                ctx.globalCompositeOperation = 'destination-out';
                ctx.beginPath();
                ctx.arc(center.x, center.y, portalRadius - 20, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
                ctx.globalCompositeOperation = 'lighter'; // Back to glow
            }

            // Update & Draw Sparks
            for (let i = 0; i < sparks.length; i++) {
                const s = sparks[i];

                // Physics
                if (s.onRing) {
                    // ROTATION PHYSICS
                    s.angle -= 0.08; // Slower, smoother rotation

                    // Update position based on new angle
                    s.x = center.x + Math.cos(s.angle) * s.radius;
                    s.y = center.y + Math.sin(s.angle) * s.radius;

                    // "Centrifugal Force" - chance to fly off tangentially
                    if (Math.random() < 0.1) {
                        s.onRing = false;
                        // Calculate tangent vector
                        const tangentAngle = s.angle - Math.PI / 2;
                        const velocity = 10 + Math.random() * 5;
                        s.vx = Math.cos(tangentAngle) * velocity;
                        s.vy = Math.sin(tangentAngle) * velocity;
                    }
                } else {
                    // FREE FLIGHT PHYSICS (Sparks flying off)
                    s.x += s.vx;
                    s.y += s.vy;
                    s.vx *= 0.95; // Air Drag
                    s.vy *= 0.95;
                    s.vy += 0.5; // Gravity
                }

                // Aging
                s.life -= s.decay;

                if (s.life <= 0 || s.x < -100 || s.x > width + 100 || s.y > height + 100) {
                    sparks.splice(i, 1);
                    i--;
                    continue;
                }

                // Draw Line Segment (Streak)
                const mb = s.onRing ? 0.2 : 0.6; // Motion blur length coefficient
                // For ring particles, calculate velocity based on rotation radius
                const velX = s.onRing ? Math.cos(s.angle - Math.PI / 2) * (s.radius * 0.15) : s.vx;
                const velY = s.onRing ? Math.sin(s.angle - Math.PI / 2) * (s.radius * 0.15) : s.vy;

                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(s.x - velX * mb, s.y - velY * mb);
                ctx.strokeStyle = s.color;
                ctx.globalAlpha = s.life;
                ctx.lineWidth = s.size;
                ctx.stroke();
                ctx.globalAlpha = 1.0;
            }

            if (portalRadius < targetRadius) {
                requestAnimationFrame(render);
            } else {
                const audio = new Audio('/welcome.mp3');
                audio.volume = 1;
                audio.play().catch(e => console.warn("Audio autoplay blocked:", e));

                setOpacity(0);
                setTimeout(onComplete, 1000);
            }
        };

        requestAnimationFrame(render);

        return () => window.removeEventListener('resize', resize);
    }, [onComplete]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 99999, // Absolute top
                pointerEvents: 'none',
                opacity: opacity,
                transition: 'opacity 1s ease-out'
            }}
        />
    );
}
