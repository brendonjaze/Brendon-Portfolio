import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                primary: "var(--primary)",
                "primary-light": "var(--primary-light)",
                "primary-dark": "var(--primary-dark)",
                bg: "var(--bg-color)",
                "text-main": "var(--text-main)",
                "text-dim": "var(--text-dim)",
                "card-bg": "var(--card-bg)",
                "glass-border": "var(--glass-border)",
            },
            fontFamily: {
                heading: ["var(--font-heading)", "sans-serif"],
                body: ["var(--font-body)", "sans-serif"],
            },
            keyframes: {
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
            animation: {
                "fade-up": "fade-up 0.8s ease forwards",
            },
        },
    },
    plugins: [],
};
export default config;
