'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    sides: number;
    color: string;
    vx: number;
    vy: number;
    opacity: number;
    angle: number;
    rotationSpeed: number;
    orbitRadius: number;
    orbitSpeed: number;
    currentOrbitAngle: number;
}

export default function CursorParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticle = (index: number): Particle => {
            const sidesOptions = [3, 4, 5];
            const orbitRadius = 2 + (index % 12) * 3; // Much closer to the cursor
            const orbitSpeed = (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1);

            return {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 2 + 2, // Slightly smaller particles
                sides: sidesOptions[Math.floor(Math.random() * sidesOptions.length)],
                color: '192, 132, 252', // Purple theme
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                opacity: Math.random() * 0.2 + 0.2, // Lower opacity: 0.2 to 0.4
                angle: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.05,
                orbitRadius,
                orbitSpeed,
                currentOrbitAngle: Math.random() * Math.PI * 2
            };
        };

        const initParticles = () => {
            const count = 80;
            particlesRef.current = Array.from({ length: count }, (_, i) => createParticle(i));
        };

        const drawPolygon = (context: CanvasRenderingContext2D, x: number, y: number, radius: number, sides: number, rotation: number) => {
            if (sides < 3) return;
            context.beginPath();
            const angleStep = (Math.PI * 2) / sides;
            for (let i = 0; i < sides; i++) {
                const theta = rotation + i * angleStep;
                const px = x + radius * Math.cos(theta);
                const py = y + radius * Math.sin(theta);
                if (i === 0) context.moveTo(px, py);
                else context.lineTo(px, py);
            }
            context.closePath();
            context.fill();
        };

        let suckTimer = 0;
        let isExploding = false;
        let explosionDuration = 0;
        let particlesGathered = 0;

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const mouse = mouseRef.current;
            const influenceRadius = 250;
            const attractionRadius = 300;

            // Logic to trigger explosion
            // If many particles are gathered near mouse for > 2.5s
            if (particlesGathered > 30) {
                suckTimer++;
            } else {
                suckTimer = Math.max(0, suckTimer - 0.5); // Slow decay
            }

            if (suckTimer > 150 && !isExploding) { // ~2.5 seconds
                isExploding = true;
                explosionDuration = 30; // 0.5s blast duration
                suckTimer = 0;
            }

            if (isExploding) {
                explosionDuration--;
                if (explosionDuration <= 0) {
                    isExploding = false;
                }
            }

            let currentGathered = 0;

            particlesRef.current.forEach((p) => {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const distToMouse = Math.sqrt(dx * dx + dy * dy);

                if (distToMouse < 100) {
                    currentGathered++;
                }

                if (isExploding) {
                    // EXPLOSION MECHANIC
                    if (explosionDuration === 29) {
                        const angleToMouse = Math.atan2(dy, dx);
                        const blastForce = 30.0 + Math.random() * 20.0;
                        p.vx -= Math.cos(angleToMouse) * blastForce;
                        p.vy -= Math.sin(angleToMouse) * blastForce;
                        p.rotationSpeed = (Math.random() - 0.5) * 0.5;
                    }
                } else if (mouse.x > 0 && distToMouse < attractionRadius) {
                    const angleToMouse = Math.atan2(dy, dx);

                    // PURE ATTRACTION: Particles are pulled towards cursor but preserve momentum to pass through
                    // Gentle pull that gets slightly stronger as they get closer
                    const attractionStrength = 0.05 + (1 - distToMouse / attractionRadius) * 0.15;
                    p.vx += Math.cos(angleToMouse) * attractionStrength;
                    p.vy += Math.sin(angleToMouse) * attractionStrength;

                    // Increased rotation when interacting
                    p.angle += p.rotationSpeed * 3;
                }

                // DEEP SPACE MODE: Floating around (now applies universally, with repulsion adding to velocity)
                // Apply drag to velocity so they slow down after being pushed
                p.vx *= 0.98;
                p.vy *= 0.98;

                // Maintain a minimal drift speed
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed < 0.2) {
                    const angle = Math.random() * Math.PI * 2;
                    p.vx += Math.cos(angle) * 0.05;
                    p.vy += Math.sin(angle) * 0.05;
                }

                p.x += p.vx;
                p.y += p.vy;
                p.angle += p.rotationSpeed;

                // Screen wrap
                if (p.x < -50) p.x = canvas.width + 50;
                if (p.x > canvas.width + 50) p.x = -50;
                if (p.y < -50) p.y = canvas.height + 50;
                if (p.y > canvas.height + 50) p.y = -50;

                ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
                drawPolygon(ctx, p.x, p.y, p.size, p.sides, p.angle);
            });

            particlesGathered = currentGathered;

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        resize();
        initParticles();
        animate();

        // Replenish particles every 3 seconds
        const replenishInterval = setInterval(() => {
            const currentCount = particlesRef.current.length;
            const maxParticles = 200; // Increased cap for a fuller feel

            if (currentCount < maxParticles) {
                const newParticlesCount = 15; // More particles per replenishment
                const newParticles = Array.from({ length: newParticlesCount }, (_, i) => {
                    const p = createParticle(currentCount + i);

                    // Randomly choose a spawn location (Left, Right, Top, Bottom, or Center)
                    const spawnType = Math.floor(Math.random() * 5);

                    if (spawnType === 0) { // Left
                        p.x = -20;
                        p.y = Math.random() * canvas.height;
                    } else if (spawnType === 1) { // Right
                        p.x = canvas.width + 20;
                        p.y = Math.random() * canvas.height;
                    } else if (spawnType === 2) { // Top
                        p.y = -20;
                        p.x = Math.random() * canvas.width;
                    } else if (spawnType === 3) { // Bottom
                        p.y = canvas.height + 20;
                        p.x = Math.random() * canvas.width;
                    } else { // Center
                        p.x = canvas.width / 2 + (Math.random() - 0.5) * 100;
                        p.y = canvas.height / 2 + (Math.random() - 0.5) * 100;
                        // Give center-spawned particles some initial velocity to move outwards
                        p.vx = (Math.random() - 0.5) * 2;
                        p.vy = (Math.random() - 0.5) * 2;
                    }
                    return p;
                });
                particlesRef.current = [...particlesRef.current, ...newParticles];
            }
        }, 3000);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(replenishInterval);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 10000, // Top priority
                display: 'block',
                mixBlendMode: 'screen',
            }}
        />
    );
}
