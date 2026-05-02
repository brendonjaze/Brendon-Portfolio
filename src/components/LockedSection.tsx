"use client";
import { motion, AnimatePresence } from "framer-motion";

interface LockedSectionProps {
  locked: boolean;
  upgradeTo: "Pro" | "Max";
  upgradePrice: string;
  sectionName: string;
  onUpgrade: () => void;
  children: React.ReactNode;
}

export default function LockedSection({
  locked,
  upgradeTo,
  upgradePrice,
  sectionName,
  onUpgrade,
  children,
}: LockedSectionProps) {
  return (
    <div className="relative">
      {children}
      <AnimatePresence>
        {locked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 backdrop-blur-md bg-[#1a0b2e]/70 flex items-center justify-center z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="glass p-8 text-center max-w-sm mx-4 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(192,132,252,0.15)]"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-bold font-heading mb-1 text-white">
                {sectionName}
              </h3>
              <p className="text-text-dim mb-5 text-sm leading-relaxed">
                Available on the{" "}
                <span className="text-primary font-semibold">{upgradeTo} Plan</span>
                {" "}· {upgradePrice}
              </p>
              <button
                onClick={onUpgrade}
                className="w-full py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(192,132,252,0.3)] text-sm"
              >
                Upgrade to {upgradeTo}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
