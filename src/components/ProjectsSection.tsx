"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Wait, I should check if lucide-react is installed. If not, I'll use SVG icons directly to be safe.

// Fallback icons
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);

interface Project {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    tech: string[];
    link: string;
    color: string;
    image?: string;
}

const projects: Project[] = [
    {
        id: "lms",
        title: "Library Management",
        shortDescription: "Comprehensive tracking for books & members.",
        fullDescription: "A fully integrated Library Management System designed to streamline the tracking of book inventories, member registrations, and borrowing capabilities. It features a responsive UI, real-time availability updates, and an admin dashboard for efficient management.",
        tech: ["Next.js", "Tailwind CSS", "PostgreSQL"],
        link: "https://library-management-system-ebon-ten.vercel.app/login",
        color: "from-purple-600 to-blue-600",
        image: "/lms-thumbnail.png"
    },
    {
        id: "attendance",
        title: "IoT Attendance",
        shortDescription: "Biometric & RFID based tracking system.",
        fullDescription: "An advanced IoT solution leveraging ESP32 and Arduino microcontrollers to automate attendance tracking. It supports real-time data syncing to a web dashboard, reducing manual errors and providing instant reporting for institutions.",
        tech: ["Arduino", "ESP32", "React", "Supabase"],
        link: "https://brendon-front-gy4dqwn1k-brendon-jazes-projects.vercel.app/",
        color: "from-emerald-500 to-cyan-500",
        image: "/iot-thumbnail.png"
    }
];

export default function ProjectsSection() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const shouldReduceMotion = useReducedMotion();

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedId(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Update URL hash (optional polish)
    useEffect(() => {
        if (selectedId) {
            window.history.pushState(null, "", `#project-${selectedId}`);
        } else {
            // Remove hash without scrolling
            window.history.pushState(null, "", window.location.pathname);
        }
    }, [selectedId]);

    return (
        <section id="projects" className="py-24 px-4 max-w-7xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary-light to-white bg-clip-text text-transparent"
            >
                Featured Projects
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {projects.map((project) => (
                    <motion.div
                        layoutId={shouldReduceMotion ? undefined : `card-container-${project.id}`}
                        key={project.id}
                        onClick={() => setSelectedId(project.id)}
                        className="group relative cursor-pointer rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-colors"
                        whileHover={shouldReduceMotion ? {} : { y: -5 }}
                        whileTap={shouldReduceMotion ? {} : {
                            y: -8,
                            scale: 1.02,
                            boxShadow: "0 20px 60px rgba(157, 78, 221, 0.4)"
                        }}
                    >
                        {/* Card Header - Image or Gradient */}
                        <motion.div
                            layoutId={shouldReduceMotion ? undefined : `card-image-${project.id}`}
                            className={`h-48 w-full relative overflow-hidden ${!project.image ? `bg-gradient-to-br ${project.color}` : ''} opacity-80 group-hover:opacity-100 transition-opacity`}
                        >
                            {project.image && (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </motion.div>

                        <div className="p-6">
                            <motion.h3
                                layoutId={shouldReduceMotion ? undefined : `card-title-${project.id}`}
                                className="text-2xl font-bold text-white mb-2"
                            >
                                {project.title}
                            </motion.h3>
                            <motion.p
                                layoutId={shouldReduceMotion ? undefined : `card-desc-${project.id}`}
                                className="text-gray-400 mb-4"
                            >
                                {project.shortDescription}
                            </motion.p>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-primary-light">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedId && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
                        />

                        {/* Modal */}
                        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4">
                            {projects.map((project) => (
                                project.id === selectedId && (
                                    <motion.div
                                        layoutId={shouldReduceMotion ? undefined : `card-container-${project.id}`}
                                        initial={shouldReduceMotion ? { opacity: 0, scale: 0.95 } : undefined}
                                        animate={shouldReduceMotion ? { opacity: 1, scale: 1 } : undefined}
                                        exit={shouldReduceMotion ? { opacity: 0, scale: 0.95 } : undefined}
                                        key={project.id}
                                        className="w-full max-w-3xl bg-[#1a0b2e] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative pointer-events-auto flex flex-col max-h-[90vh]"
                                    >
                                        {/* Close Button */}
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                            className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
                                        >
                                            <CloseIcon />
                                        </button>

                                        {/* Expanded Header */}
                                        <motion.div
                                            layoutId={shouldReduceMotion ? undefined : `card-image-${project.id}`}
                                            className={`h-64 w-full relative shrink-0 overflow-hidden ${!project.image ? `bg-gradient-to-br ${project.color}` : ''}`}
                                        >
                                            {project.image && (
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#1a0b2e] to-transparent" />
                                        </motion.div>

                                        <div className="p-8 overflow-y-auto custom-scrollbar">
                                            <motion.h3
                                                layoutId={shouldReduceMotion ? undefined : `card-title-${project.id}`}
                                                className="text-4xl font-bold text-white mb-4"
                                            >
                                                {project.title}
                                            </motion.h3>

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="prose prose-invert max-w-none"
                                            >
                                                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                                    {project.fullDescription}
                                                </p>

                                                <div className="mb-8">
                                                    <h4 className="text-lg font-semibold text-primary-light mb-3">Technologies Used</h4>
                                                    <div className="flex flex-wrap gap-3">
                                                        {project.tech.map((t) => (
                                                            <span key={t} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300">
                                                                {t}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-full font-semibold transition-all hover:scale-105"
                                                >
                                                    Open Project <LinkIcon />
                                                </a>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )
                            ))}
                        </div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
