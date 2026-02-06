'use client';

import { useEffect, useRef } from 'react';

interface Point {
    x: number;
    y: number;
}

export default function CursorComet() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef<Point>({ x: -100, y: -100 });
    const trailRef = useRef<Point[]>([]);
    const animationFrameRef = useRef<number>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const mouse = mouseRef.current;

            // Add current position to trail
            trailRef.current.push({ x: mouse.x, y: mouse.y });

            // Limit trail length
            const maxTrailLength = 25;
            if (trailRef.current.length > maxTrailLength) {
                trailRef.current.shift();
            }

            // Draw trail
            // We iterate backwards to draw the head on top
            for (let i = 0; i < trailRef.current.length; i++) {
                const point = trailRef.current[i];

                // Calculate properties based on index (0 is tail, length-1 is head)
                const ratio = i / trailRef.current.length;

                // Size: Head is biggest (12px), Tail shrinks to 0
                const size = 12 * ratio;

                // Color Interpolation: Purple to Light Blue
                // Purple: 192, 132, 252
                // Light Blue: 120, 220, 255
                // We want tail (low ratio) to be one color, head (high ratio) to be another?
                // Or user said "purple and light blue". Let's make the head Light Blue and fade to Purple, or vice versa.
                // Let's go: Head = Light Blue, Tail = Purple

                const r = 192 + (120 - 192) * ratio;
                const g = 132 + (220 - 132) * ratio;
                const b = 252 + (255 - 252) * ratio;
                const color = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;

                ctx.beginPath();
                ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Direct updates might be too jagged, but let's try raw input first. 
            // For a "following" feel, we usually use interpolation, but the user attached an image of a clean trail.
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        // Use an interpolated mouse position for smoother "following" movement
        let currentX = -100;
        let currentY = -100;

        const smoothAnimate = () => {
            if (!canvas || !ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Smoothly move the "Head" towards the actual mouse
            // "Cursor following an object" implies the object lags behind slightly (Spring physics)
            const target = mouseRef.current;
            const easing = 0.15; // Speed of the comet follower

            currentX += (target.x - currentX) * easing;
            currentY += (target.y - currentY) * easing;

            // Add smoothed position to trail
            trailRef.current.push({ x: currentX, y: currentY });

            const maxTrailLength = 20;
            if (trailRef.current.length > maxTrailLength) {
                trailRef.current.shift();
            }

            // Draw Trail
            for (let i = 0; i < trailRef.current.length; i++) {
                const point = trailRef.current[i];
                const indexFromHead = trailRef.current.length - 1 - i;
                const ratio = i / trailRef.current.length; // 0 (tail) -> 1 (head)

                // Size
                const size = 10 * ratio; // Head is 10px

                // Color Gradient: Purple Core (Head) with Light Blue Tail
                // Purple: 138, 43, 226
                // Light Blue: 0, 191, 255

                // Interpolate from Light Blue (Tail, ratio 0) to Purple (Head, ratio 1)
                const r_val = 0 + (138 - 0) * ratio;
                const g_val = 191 + (43 - 191) * ratio;
                const b_val = 255 + (226 - 255) * ratio;

                ctx.beginPath();
                ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgb(${Math.round(r_val)}, ${Math.round(g_val)}, ${Math.round(b_val)})`;
                ctx.fill();
            }

            animationFrameRef.current = requestAnimationFrame(smoothAnimate);
        }

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        resize();
        smoothAnimate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
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
                zIndex: 10001, // Above particles (10000)
            }}
        />
    );
}
