'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function getMonthsExperience(): number {
  const start = new Date(2025, 9, 27); // Oct 27, 2025
  const now = new Date();
  const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  return Math.max(0, now.getDate() < start.getDate() ? months - 1 : months);
}

const STARS = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  x: (i * 137.508) % 100,
  y: (i * 93.7) % 100,
  size: (i % 3) === 0 ? 2 : 1,
  opacity: 0.08 + (i % 7) * 0.06,
  duration: 2.5 + (i % 5),
  delay: (i % 6) * 0.5,
}));

export default function LandingIntro({ onComplete }: { onComplete: () => void }) {
  const [dismissed, setDismissed] = useState(false);
  const months = getMonthsExperience();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleEnter = () => setDismissed(true);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!dismissed && (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.7 } }}
          exit={{ opacity: 0, y: -70, transition: { duration: 0.75, ease: [0.4, 0, 0.2, 1] } }}
          className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
          style={{
            zIndex: 9999,
            background: 'linear-gradient(160deg, #080212 0%, #1a0b2e 50%, #0e0620 100%)',
          }}
        >
          {/* Twinkling stars */}
          {STARS.map(s => (
            <motion.div
              key={s.id}
              className="absolute rounded-full bg-white pointer-events-none"
              style={{
                width: s.size,
                height: s.size,
                left: `${s.x}%`,
                top: `${s.y}%`,
                opacity: s.opacity,
              }}
              animate={{ opacity: [s.opacity, s.opacity * 3, s.opacity] }}
              transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}

          {/* Radial ambient glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: '800px',
              height: '800px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(192,132,252,0.10) 0%, transparent 60%)',
              borderRadius: '50%',
            }}
          />

          {/* Corner accents */}
          <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-primary/20 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-primary/20 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-primary/20 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-primary/20 rounded-br-sm pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-8 px-6 w-full max-w-lg">

            {/* Eyebrow label */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-[11px] tracking-[0.55em] uppercase text-primary/40 font-light"
            >
              Portfolio · 2025
            </motion.p>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
              className="text-center"
            >
              <h1 className="font-heading leading-none">
                <span
                  className="block text-5xl md:text-6xl font-bold text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #e9d5ff 45%, #c084fc 100%)',
                  }}
                >
                  Brendon Jaze
                </span>
                <span className="block text-2xl md:text-3xl text-white/40 font-light mt-2 tracking-widest">
                  M. Lambago
                </span>
              </h1>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="w-24 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #c084fc, transparent)' }}
            />

            {/* Info cards */}
            <div className="w-full flex flex-col gap-3">

              {/* Field — full width */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="w-full flex items-center justify-between px-6 py-4 rounded-xl"
                style={{
                  background: 'rgba(192,132,252,0.06)',
                  border: '1px solid rgba(192,132,252,0.22)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span className="text-[11px] uppercase tracking-[0.35em] text-primary/50">Field</span>
                <span
                  className="text-sm font-semibold tracking-wide px-4 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(192,132,252,0.15)',
                    border: '1px solid rgba(192,132,252,0.35)',
                    color: '#e9d5ff',
                  }}
                >
                  Information Technology
                </span>
              </motion.div>

              {/* Age + Birthday */}
              <div className="grid grid-cols-2 gap-3">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="flex flex-col gap-2 px-5 py-5 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <span className="text-[11px] uppercase tracking-[0.35em] text-white/25">Age</span>
                  <span className="text-5xl font-heading font-bold text-white leading-none">24</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="flex flex-col gap-2 px-5 py-5 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <span className="text-[11px] uppercase tracking-[0.35em] text-white/25">Birthday</span>
                  <div className="font-heading font-semibold text-white leading-tight">
                    <span className="text-xl block">October 6</span>
                    <span className="text-base text-white/40 font-light">2001</span>
                  </div>
                </motion.div>
              </div>

              {/* Experience */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="w-full flex items-center justify-between px-6 py-4 rounded-xl"
                style={{
                  background: 'rgba(192,132,252,0.04)',
                  border: '1px solid rgba(192,132,252,0.15)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span className="text-[11px] uppercase tracking-[0.35em] text-primary/50">Experience</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-heading font-bold text-white leading-none">{months}</span>
                  <span className="text-sm text-white/40 font-light">
                    {months === 1 ? 'month' : 'months'}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              onClick={handleEnter}
              whileHover={{ scale: 1.04, boxShadow: '0 0 48px rgba(192,132,252,0.55)' }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 rounded-full text-sm font-semibold text-white tracking-wide transition-shadow"
              style={{
                background: 'linear-gradient(135deg, #c084fc 0%, #9333ea 100%)',
                boxShadow: '0 0 28px rgba(192,132,252,0.35)',
              }}
            >
              Want to know more about me?
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
