"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const skillCategories = [
    {
        label: "Front-end",
        color: "#c084fc",
        skills: ["React", "Next.js", "JavaScript", "HTML/CSS", "Tailwind CSS", "Framer Motion", "Responsive Web Design", "User Research"],
    },
    {
        label: "Back-end",
        color: "#22d3ee",
        skills: ["Node.js", "Express.js", "Python", "Supabase", "Arduino", "IoT"],
    },
    {
        label: "APIs",
        color: "#34d399",
        skills: ["RestAPI", "FastAPI"],
    },
];

// Flatten skills with their category color for rendering
const tags = skillCategories.flatMap(cat =>
    cat.skills.map(name => ({ name, color: cat.color }))
);

// ─── Math ─────────────────────────────────────────────────────────────────────

/**
 * Distribute n points evenly on a unit sphere using the Fibonacci lattice.
 * This avoids clustering at the poles that equal-angle grids produce.
 */
function fibonacciUnitSphere(n: number) {
    const golden = Math.PI * (1 + Math.sqrt(5)); // golden angle in radians
    return Array.from({ length: n }, (_, i) => {
        const phi = Math.acos(1 - 2 * (i + 0.5) / n); // polar angle
        const theta = golden * i;                        // azimuthal angle
        return {
            x: Math.sin(phi) * Math.cos(theta),
            y: Math.cos(phi),
            z: Math.sin(phi) * Math.sin(theta),
        };
    });
}

// Pre-compute once at module load — positions are fixed, only rotation changes
const UNIT_POINTS = fibonacciUnitSphere(tags.length);

/** Rotate a 3D point: first around Y axis, then around X axis */
function rotateXY(ox: number, oy: number, oz: number, rx: number, ry: number) {
    // Y-axis rotation
    const cosY = Math.cos(ry), sinY = Math.sin(ry);
    const x1 = ox * cosY + oz * sinY;
    const z1 = -ox * sinY + oz * cosY;
    // X-axis rotation
    const cosX = Math.cos(rx), sinX = Math.sin(rx);
    return {
        x: x1,
        y: oy * cosX - z1 * sinX,
        z: oy * sinX + z1 * cosX,
    };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SkillsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const tagsRef = useRef<(HTMLSpanElement | null)[]>([]);
    const rafRef = useRef<number>(0);

    // All animation state lives in refs — no state updates = no React re-renders in the loop
    const rot = useRef({ x: 0.3, y: 0 });       // current rotation angles
    const vel = useRef({ x: 0, y: 0 });           // angular velocity for inertia
    const drag = useRef({ active: false, lastX: 0, lastY: 0 });
    const autoRotate = useRef(true);
    const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hoveredTag = useRef<string | null>(null);

    /** Pause auto-rotation on interaction; resume after 2 s of inactivity */
    const scheduleAutoRotate = useCallback(() => {
        autoRotate.current = false;
        if (idleTimer.current) clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(() => { autoRotate.current = true; }, 2000);
    }, []);

    /** Main animation loop — runs every frame via requestAnimationFrame */
    const animate = useCallback(() => {
        const container = containerRef.current;
        if (!container) { rafRef.current = requestAnimationFrame(animate); return; }

        const w = container.offsetWidth;
        const h = container.offsetHeight;
        const radius = Math.min(w, h) * 0.46;   // sphere radius scales with container
        const fov = radius * 2.5;               // perspective distance
        const cx = w / 2;
        const cy = h / 2;

        // Idle auto-rotation
        if (autoRotate.current && !drag.current.active) {
            rot.current.y += 0.0018;
        }

        // Apply inertia after drag release
        if (!drag.current.active) {
            rot.current.x += vel.current.x;
            rot.current.y += vel.current.y;
            vel.current.x *= 0.92; // damping factor
            vel.current.y *= 0.92;
        }

        // Update each tag's DOM element directly (avoids React reconciler overhead)
        tagsRef.current.forEach((el, i) => {
            if (!el) return;

            const pt = UNIT_POINTS[i];
            const { x, y, z } = rotateXY(
                pt.x * radius, pt.y * radius, pt.z * radius,
                rot.current.x, rot.current.y
            );

            // Perspective projection: things further away shrink
            const pScale = fov / (fov + z);
            const px = cx + x * pScale;
            const py = cy + y * pScale;

            // Depth: 0 = back, 1 = front — drives opacity and size
            const depth = (z / radius + 1) / 2;
            const isHovered = hoveredTag.current === tags[i].name;
            const scale = pScale * (isHovered ? 1.35 : 1);

            el.style.left = `${px.toFixed(1)}px`;
            el.style.top = `${py.toFixed(1)}px`;
            el.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(4)})`;
            el.style.opacity = "1";
            el.style.zIndex = `${Math.round(depth * 100)}`;
            el.style.fontSize = `${(14 + depth * 10).toFixed(1)}px`;
            // Glow only on hovered foreground items
            el.style.filter = isHovered
                ? `drop-shadow(0 0 10px ${tags[i].color}bb) drop-shadow(0 0 4px ${tags[i].color})`
                : "none";
        });

        rafRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        rafRef.current = requestAnimationFrame(animate);
        return () => {
            cancelAnimationFrame(rafRef.current);
            if (idleTimer.current) clearTimeout(idleTimer.current);
        };
    }, [animate]);

    // ─── Pointer events (unifies mouse + touch) ────────────────────────────────

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        drag.current = { active: true, lastX: e.clientX, lastY: e.clientY };
        scheduleAutoRotate();
    }, [scheduleAutoRotate]);

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        if (!drag.current.active) return;
        const dx = e.clientX - drag.current.lastX;
        const dy = e.clientY - drag.current.lastY;
        // Convert pixel delta to angular velocity
        vel.current.x = dy * 0.005;
        vel.current.y = dx * 0.005;
        rot.current.x += dy * 0.005;
        rot.current.y += dx * 0.005;
        drag.current.lastX = e.clientX;
        drag.current.lastY = e.clientY;
    }, []);

    const onPointerUp = useCallback(() => {
        drag.current.active = false;
    }, []);

    return (
        <section id="skills" className="py-24 px-4 container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary-light to-white bg-clip-text text-transparent">
                    Tech Stack
                </h2>

                {/* Category colour legend */}
                <div className="flex gap-6 justify-center mb-6">
                    {skillCategories.map(cat => (
                        <div key={cat.label} className="flex items-center gap-2 text-sm">
                            <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: cat.color, boxShadow: `0 0 6px ${cat.color}` }}
                            />
                            <span className="text-gray-400">{cat.label}</span>
                        </div>
                    ))}
                </div>

                {/* 3D sphere container — position:relative so tags can be absolute inside */}
                <div
                    ref={containerRef}
                    className="relative w-full select-none cursor-grab active:cursor-grabbing"
                    style={{ height: "580px" }}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerLeave={onPointerUp}
                >
                    {tags.map((tag, i) => (
                        <span
                            key={tag.name}
                            ref={el => { tagsRef.current[i] = el; }}
                            className="absolute font-semibold whitespace-nowrap pointer-events-auto rounded-full border border-white/10 px-4 py-1.5 backdrop-blur-sm"
                            style={{
                                color: tag.color,
                                backgroundColor: "rgba(255,255,255,0.05)",
                                willChange: "transform, opacity, filter",
                            }}
                            onMouseEnter={() => { hoveredTag.current = tag.name; }}
                            onMouseLeave={() => { hoveredTag.current = null; }}
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
