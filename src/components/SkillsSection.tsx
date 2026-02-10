"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

const skills = [
    "Responsive Web Design", "User Research", "React", "Next.js",
    "HTML/CSS", "JavaScript", "Express.js", "Node.js",
    "Python", "FastAPI", "Supabase", "Arduino",
    "IoT", "Tailwind CSS", "Framer Motion"
];

const SkillPill = ({ skill }: { skill: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse position relative to the element center
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for the movement
    const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from center
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Attract the element slightly towards the mouse (magnetic effect)
        // Multiplier determines the strength (0.2 = moves 20% of mouse distance)
        x.set(distanceX * 0.3);
        y.set(distanceY * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="relative z-10"
        >
            <div className="glass px-6 py-3 rounded-full text-sm md:text-base font-semibold text-primary-light cursor-default border border-white/5 hover:border-primary/50 hover:bg-white/10 transition-colors duration-300">
                {skill}
            </div>
        </motion.div>
    );
};

export default function SkillsSection() {
    return (
        <section id="skills" className="py-24 px-4 container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary-light to-white bg-clip-text text-transparent">
                    Tech Stack
                </h2>

                <div className="flex flex-wrap gap-4 justify-center max-w-5xl mx-auto">
                    {skills.map((skill, index) => (
                        <SkillPill key={index} skill={skill} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
