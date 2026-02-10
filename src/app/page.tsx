"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  return (
    <div className="min-h-screen text-text-main overflow-x-hidden">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-2 lg:order-1 text-center lg:text-left"
            >
              <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight mb-6">
                Brendon Jaze <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                  M. Lambago
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-text-dim max-w-lg mx-auto lg:mx-0 mb-8 font-light">
                A Creative Developer crafting exceptional digital experiences with modern technologies.
              </p>

              <div className="flex gap-4 justify-center lg:justify-start">
                <a
                  href="#projects"
                  className="px-8 py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold transition-all hover:scale-105 shadow-[0_0_20px_rgba(192,132,252,0.3)]"
                >
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 text-white font-semibold transition-all hover:scale-105 backdrop-blur-sm"
                >
                  Get In Touch
                </a>
              </div>
            </motion.div>

            {/* Profile Image with Shape */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="order-1 lg:order-2 flex justify-center relative"
            >
              <div className="relative w-[228px] h-[228px] md:w-[304px] md:h-[304px]">
                {/* Glowing orb behind */}
                <div className="absolute inset-0 bg-primary blur-[80px] opacity-20 animate-pulse" />

                <div
                  className="relative w-full h-full overflow-hidden border-[4px] border-primary shadow-[0_0_50px_rgba(192,132,252,0.5)] bg-primary-dark/20 backdrop-blur-sm"
                  style={{
                    borderRadius: '50% 50% 30% 70% / 60% 40% 60% 40%',
                  }}
                >
                  <Image
                    src="/profile.jpg"
                    alt="Brendon Jaze M. Lambago"
                    fill
                    sizes="(max-width: 768px) 228px, 304px"
                    quality={75}
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="container max-w-4xl mx-auto"
          >
            <div className="glass p-8 md:p-12 relative overflow-hidden group">
              {/* Decorative gradient blob */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10 group-hover:bg-primary/30 transition-colors duration-500" />

              <h2 className="text-4xl font-bold font-heading mb-8 text-center bg-gradient-to-r from-white to-text-dim bg-clip-text text-transparent">
                About Me
              </h2>

              <div className="grid md:grid-cols-2 gap-8 text-lg text-text-dim leading-relaxed">
                <p>
                  I am a passionate developer with a strong focus on building responsive and interactive web applications.
                  My journey in tech is driven by curiosity and a desire to solve complex problems through clean, efficient code.
                </p>
                <p>
                  With a background in modern web frameworks and a keen eye for design, I bridge the gap between aesthetics
                  and functionality, ensuring every project I work on provides a seamless user experience.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <SkillsSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="container max-w-3xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
              Let&apos;s create something.
            </h2>
            <p className="text-xl text-text-dim mb-12 max-w-xl mx-auto">
              Right now, I&apos;m searching for fresh opportunities. Whether you have a question or simply want to say hello, I&apos;m always open to chat!
            </p>

            <a
              href="mailto:brendonjaze07@gmail.com"
              className="inline-block px-10 py-4 bg-white text-bg font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              Say Hello
            </a>

            <div className="mt-16 flex flex-wrap justify-center gap-6">
              {[
                { name: "GitHub", url: "https://github.com/brendonjaze" },
                { name: "LinkedIn", url: "https://www.linkedin.com/in/brendon-jaze-a34466322/" },
                { name: "Messenger", url: "https://www.facebook.com/brendonjaze1006" }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg border border-white/5 bg-white/5 transition-all"
                  whileHover={{
                    y: -5,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(192, 132, 252, 0.5)",
                    boxShadow: "0 10px 30px rgba(192, 132, 252, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-8 text-center text-text-dim border-t border-white/5">
        <p>© {new Date().getFullYear()} Brendon Jaze M. Lambago. Built with love.</p>
      </footer>
    </div>
  );
}
