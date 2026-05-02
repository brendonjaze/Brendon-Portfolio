"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
    {
        label: "Front-end",
        color: "#c084fc",
        rgb: "192,132,252",
        skills: [
            { name: "React", description: "Component-based UI library for building fast, interactive interfaces." },
            { name: "Next.js", description: "React framework with SSR, file-based routing, and full-stack APIs." },
            { name: "JavaScript", description: "The core scripting language powering all web interactivity." },
            { name: "HTML/CSS", description: "Foundation of the web — structure, layout, and visual style." },
            { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid, consistent UI development." },
            { name: "Responsive Design", description: "Building layouts that adapt fluidly across all screen sizes." },
            { name: "User Research", description: "Gathering insights to design with real user needs in mind." },
        ],
    },
    {
        label: "Back-end",
        color: "#22d3ee",
        rgb: "34,211,238",
        skills: [
            { name: "Node.js", description: "JavaScript runtime for building scalable server-side applications." },
            { name: "Express.js", description: "Minimal, flexible Node.js framework for building REST APIs." },
            { name: "Python", description: "Versatile language used for scripting, automation, and data work." },
            { name: "Supabase", description: "Open-source Firebase alternative backed by PostgreSQL." },
            { name: "Arduino", description: "Microcontroller platform for embedded systems and hardware projects." },
            { name: "IoT", description: "Connecting physical devices to the internet for smart systems." },
        ],
    },
    {
        label: "APIs",
        color: "#34d399",
        rgb: "52,211,153",
        skills: [
            { name: "REST API", description: "Standard HTTP-based architecture for client-server data exchange." },
            { name: "FastAPI", description: "High-performance Python API framework with automatic OpenAPI docs." },
        ],
    },
];

type Skill = { name: string; description: string; category: string; color: string; rgb: string };

const frontendSkills: Skill[] = skillCategories[0].skills.map(s => ({
    ...s,
    category: skillCategories[0].label,
    color: skillCategories[0].color,
    rgb: skillCategories[0].rgb,
}));

const backendApiSkills: Skill[] = [
    ...skillCategories[1].skills.map(s => ({ ...s, category: skillCategories[1].label, color: skillCategories[1].color, rgb: skillCategories[1].rgb })),
    ...skillCategories[2].skills.map(s => ({ ...s, category: skillCategories[2].label, color: skillCategories[2].color, rgb: skillCategories[2].rgb })),
];

const allSkills = [...frontendSkills, ...backendApiSkills];

// ── Marquee card — same visual design, no entry animation ──────────────────
function MarqueeCard({ skill }: { skill: Skill }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="relative flex-shrink-0 w-[148px] sm:w-[185px] md:w-[220px] cursor-default select-none"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Ambient glow */}
            <div
                className="absolute -inset-2 rounded-xl pointer-events-none transition-opacity duration-300"
                style={{
                    background: `radial-gradient(ellipse at 50% 50%, rgba(${skill.rgb}, 0.22) 0%, transparent 70%)`,
                    filter: "blur(10px)",
                    opacity: hovered ? 1 : 0,
                }}
            />

            {/* Card shell */}
            <div
                className="relative overflow-hidden rounded-xl flex flex-col transition-all duration-200"
                style={{
                    background: "rgba(5, 1, 16, 0.88)",
                    border: `1px solid rgba(${skill.rgb}, ${hovered ? 0.55 : 0.14})`,
                    backdropFilter: "blur(18px)",
                    boxShadow: hovered
                        ? `0 0 0 1px rgba(${skill.rgb}, 0.12), 0 8px 32px rgba(0,0,0,0.6), inset 0 0 40px rgba(${skill.rgb}, 0.04)`
                        : "0 4px 20px rgba(0,0,0,0.4)",
                }}
            >
                {/* Top accent line */}
                <div
                    className="absolute top-0 inset-x-0 h-px transition-opacity duration-200"
                    style={{
                        background: `linear-gradient(90deg, transparent 5%, rgba(${skill.rgb}, ${hovered ? 1 : 0.45}) 50%, transparent 95%)`,
                    }}
                />

                {/* HUD corner brackets */}
                <div className="absolute top-[7px] left-[7px] w-3 h-3 pointer-events-none transition-all duration-200"
                    style={{ borderTop: `1.5px solid ${skill.color}`, borderLeft: `1.5px solid ${skill.color}`, opacity: hovered ? 1 : 0.28 }} />
                <div className="absolute top-[7px] right-[7px] w-3 h-3 pointer-events-none transition-all duration-200"
                    style={{ borderTop: `1.5px solid ${skill.color}`, borderRight: `1.5px solid ${skill.color}`, opacity: hovered ? 1 : 0.28 }} />
                <div className="absolute bottom-[7px] left-[7px] w-3 h-3 pointer-events-none transition-all duration-200"
                    style={{ borderBottom: `1.5px solid ${skill.color}`, borderLeft: `1.5px solid ${skill.color}`, opacity: hovered ? 1 : 0.28 }} />
                <div className="absolute bottom-[7px] right-[7px] w-3 h-3 pointer-events-none transition-all duration-200"
                    style={{ borderBottom: `1.5px solid ${skill.color}`, borderRight: `1.5px solid ${skill.color}`, opacity: hovered ? 1 : 0.28 }} />

                {/* Content */}
                <div className="relative p-3.5 sm:p-5 flex flex-col gap-2 sm:gap-3" style={{ zIndex: 10 }}>
                    {/* Category badge */}
                    <div className="flex items-center gap-2">
                        <div className="relative flex-shrink-0 w-2 h-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: skill.color }} />
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                style={{ backgroundColor: skill.color }}
                                animate={{ scale: [1, 2.8], opacity: [0.55, 0] }}
                                transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
                            />
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-[0.18em]"
                            style={{ color: skill.color, opacity: 0.65 }}>
                            {skill.category}
                        </span>
                    </div>

                    {/* Skill name */}
                    <h3
                        className="font-mono font-bold text-[12px] sm:text-[14px] leading-snug text-white tracking-wide transition-all duration-200"
                        style={{ textShadow: hovered ? `0 0 18px rgba(${skill.rgb}, 0.9)` : "none" }}
                    >
                        {skill.name}
                    </h3>

                    {/* Description */}
                    <p className="text-[10px] sm:text-[11px] leading-relaxed"
                        style={{ color: "rgba(155,155,195,0.62)" }}>
                        {skill.description}
                    </p>

                    {/* Bottom data bar */}
                    <div className="h-px rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                                background: `linear-gradient(90deg, ${skill.color}, rgba(${skill.rgb},0.2))`,
                                width: hovered ? "100%" : "28%",
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Marquee row ────────────────────────────────────────────────────────────
function MarqueeRow({ skills, direction, duration }: {
    skills: Skill[];
    direction: "left" | "right";
    duration: number;
}) {
    const [paused, setPaused] = useState(false);
    // Duplicate for seamless loop
    const items = [...skills, ...skills];

    return (
        <div
            className="relative overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Left fade */}
            <div
                className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to right, #1a0b2e 0%, transparent 100%)" }}
            />
            {/* Right fade */}
            <div
                className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to left, #1a0b2e 0%, transparent 100%)" }}
            />

            <div
                className="flex gap-2 sm:gap-4 py-1"
                style={{
                    width: "max-content",
                    animation: `marquee-${direction} ${duration}s linear infinite`,
                    animationPlayState: paused ? "paused" : "running",
                }}
            >
                {items.map((skill, i) => (
                    <MarqueeCard key={`${skill.name}-${i}`} skill={skill} />
                ))}
            </div>
        </div>
    );
}

// ── Section ────────────────────────────────────────────────────────────────
export default function SkillsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: "-8%" });
    const [loadPct, setLoadPct] = useState(0);
    const [termLine, setTermLine] = useState("");
    const TERM_TEXT = "> SYS_SCAN :: NEURAL_INTERFACE ONLINE";

    useEffect(() => {
        if (!inView) return;

        let i = 0;
        const typeInt = setInterval(() => {
            setTermLine(TERM_TEXT.slice(0, i + 1));
            i++;
            if (i >= TERM_TEXT.length) clearInterval(typeInt);
        }, 32);

        let pct = 0;
        const loadInt = setInterval(() => {
            pct = Math.min(pct + 2, 100);
            setLoadPct(pct);
            if (pct >= 100) clearInterval(loadInt);
        }, 18);

        return () => { clearInterval(typeInt); clearInterval(loadInt); };
    }, [inView]);

    return (
        <>
            {/* Keyframe definitions */}
            <style>{`
                @keyframes marquee-left {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                @keyframes marquee-right {
                    from { transform: translateX(-50%); }
                    to   { transform: translateX(0); }
                }
            `}</style>

            <section id="skills" ref={sectionRef} className="py-28 px-6 relative overflow-hidden">
                {/* Dot-grid background */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(rgba(192,132,252,0.18) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                        maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 100%)",
                        WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 100%)",
                    }}
                />
                {/* Grid lines */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(192,132,252,0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(192,132,252,0.06) 1px, transparent 1px)
                        `,
                        backgroundSize: "64px 64px",
                    }}
                />
                {/* Vignette */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 85% 70% at 50% 50%, transparent 40%, #1a0b2e 100%)" }} />

                <div className="container max-w-7xl mx-auto relative">
                    {/* ── Header ── */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        {/* Window chrome */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                            </div>
                            <div className="flex-1 h-px"
                                style={{ background: "linear-gradient(90deg, rgba(192,132,252,0.15) 0%, transparent 80%)" }} />
                        </div>

                        {/* Terminal line */}
                        <div className="flex items-center gap-1 mb-5">
                            <span className="font-mono text-xs" style={{ color: "rgba(192,132,252,0.55)" }}>
                                {termLine}
                            </span>
                            <motion.span
                                className="inline-block w-1.5 h-[13px] align-middle ml-px"
                                style={{ background: "rgba(192,132,252,0.6)" }}
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ repeat: Infinity, duration: 0.9, times: [0, 0.5, 1] }}
                            />
                        </div>

                        {/* Loading bar */}
                        <div className="flex items-center gap-3 mb-7">
                            <div className="relative flex-1 h-px bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="absolute inset-y-0 left-0 rounded-full"
                                    style={{
                                        width: `${loadPct}%`,
                                        background: "linear-gradient(90deg, #c084fc 0%, #22d3ee 60%, #34d399 100%)",
                                        boxShadow: "0 0 10px rgba(192,132,252,0.6)",
                                        transition: "width 18ms linear",
                                    }}
                                />
                            </div>
                            <span className="font-mono text-[10px] tabular-nums w-8 text-right"
                                style={{ color: "rgba(192,132,252,0.45)" }}>
                                {loadPct}%
                            </span>
                        </div>

                        {/* Main title */}
                        <h2 className="font-heading font-bold leading-none mb-6"
                            style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)" }}>
                            <span
                                className="bg-clip-text text-transparent"
                                style={{ backgroundImage: "linear-gradient(135deg, #ede9fe 0%, #c084fc 45%, #22d3ee 100%)" }}>
                                TECH STACK
                            </span>
                        </h2>

                        {/* Category legend */}
                        <div className="flex flex-wrap gap-6">
                            {skillCategories.map((cat, i) => (
                                <motion.div
                                    key={cat.label}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.35 + i * 0.1, duration: 0.4 }}
                                    className="flex items-center gap-2.5"
                                >
                                    <div className="relative w-2 h-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                                        <motion.div
                                            className="absolute inset-0 rounded-full"
                                            style={{ backgroundColor: cat.color, opacity: 0.5 }}
                                            animate={{ scale: [1, 2.6], opacity: [0.5, 0] }}
                                            transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut", delay: i * 0.7 }}
                                        />
                                    </div>
                                    <span className="font-mono text-[10px] uppercase tracking-[0.2em]"
                                        style={{ color: cat.color, opacity: 0.65 }}>
                                        {cat.label}
                                    </span>
                                    <span className="font-mono text-[10px]" style={{ color: "rgba(255,255,255,0.18)" }}>
                                        [{String(cat.skills.length).padStart(2, "0")}]
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Marquee rows ── */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col gap-4 -mx-6"
                    >
                        {/* Row 1: Front-end → scrolls right */}
                        <MarqueeRow skills={frontendSkills} direction="right" duration={38} />

                        {/* Row 2: Back-end + APIs → scrolls left */}
                        <MarqueeRow skills={backendApiSkills} direction="left" duration={42} />
                    </motion.div>

                    {/* Footer status line */}
                    <motion.div
                        className="mt-10 flex items-center gap-3"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 1.0, duration: 0.6 }}
                    >
                        <div className="h-px flex-1"
                            style={{ background: "linear-gradient(90deg, rgba(192,132,252,0.2) 0%, transparent 100%)" }} />
                        <span className="font-mono text-[9px] tracking-widest uppercase"
                            style={{ color: "rgba(192,132,252,0.28)" }}>
                            {allSkills.length.toString().padStart(2, "0")} modules loaded — system nominal
                        </span>
                        <div className="h-px flex-1"
                            style={{ background: "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.2) 100%)" }} />
                    </motion.div>
                </div>
            </section>
        </>
    );
}
