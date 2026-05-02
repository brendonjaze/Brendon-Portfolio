"use client";
import { motion } from "framer-motion";

export type Plan = "free" | "pro" | "max";

const PLANS: {
  id: Plan;
  name: string;
  price: string;
  period?: string;
  badge?: string;
  features: string[];
}[] = [
  {
    id: "free",
    name: "Free",
    price: "₱0",
    features: ["Name & title", "About me section"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "₱499",
    period: "/mo",
    badge: "Popular",
    features: ["Everything in Free", "Tech stack & skills"],
  },
  {
    id: "max",
    name: "Max",
    price: "₱999",
    period: "/mo",
    badge: "Everything",
    features: ["Everything in Pro", "Projects portfolio", "Contact info"],
  },
];

interface PricingSectionProps {
  activePlan: Plan | null;
  onSelect: (plan: Plan) => void;
}

export default function PricingSection({ activePlan, onSelect }: PricingSectionProps) {
  return (
    <section className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="container max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-4 tracking-widest uppercase"
          >
            Employer Access
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-3 text-white">
            Choose Your Plan
          </h2>
          <p className="text-text-dim text-base max-w-sm mx-auto">
            Pick a plan to explore my portfolio.{" "}
            <span className="text-white/40 text-sm">No credit card required 😉</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {PLANS.map((plan, i) => {
            const isActive = activePlan === plan.id;
            const isPro = plan.id === "pro";
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(plan.id)}
                className={`relative flex flex-col gap-5 p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-primary/10 border border-primary shadow-[0_0_30px_rgba(192,132,252,0.25)]"
                    : isPro
                    ? "glass border border-primary/30 hover:border-primary/60 hover:shadow-[0_0_20px_rgba(192,132,252,0.15)]"
                    : "glass border border-white/10 hover:border-white/20"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full tracking-wider uppercase whitespace-nowrap">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <p className="text-xs font-semibold text-text-dim uppercase tracking-widest mb-2">
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold font-heading text-white leading-none">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-text-dim text-sm mb-0.5">{plan.period}</span>
                    )}
                  </div>
                </div>

                <ul className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-text-dim">
                      <span className="mt-0.5 w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-[0_0_16px_rgba(192,132,252,0.4)]"
                      : "border border-white/15 hover:bg-white/5 text-white/80 hover:text-white"
                  }`}
                >
                  {isActive ? "✓ Current Plan" : `Get ${plan.name}`}
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
