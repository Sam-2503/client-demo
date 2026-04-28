import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			colors: {
				brand: {
					gold: "#c8971f",
					"gold-light": "#e8b830",
					"gold-dark": "#a0740f",
					black: "#0a0a0a",
					dark: "#0f0f0f",
					panel: "#202020",
					card: "#181818",
					border: "#252525",
					"border-light": "#2e2e2e",
					muted: "#888888",
					"muted-light": "#cccccc",
				},
			},
			fontFamily: {
				sans: ["Jost", "ui-sans-serif", "system-ui", "sans-serif"],
				serif: ["Cormorant Garamond", "ui-serif", "Georgia", "serif"],
			},
			boxShadow: {
				glow: "0 8px 24px rgba(200, 151, 31, 0.35)",
			},
			keyframes: {
				fadeUp: {
					from: { opacity: "0", transform: "translateY(30px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				fadeIn: {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
			},
			animation: {
				"fade-up": "fadeUp 0.9s ease both",
				"fade-in": "fadeIn 1.2s ease both",
			},
		},
	},
	plugins: [],
};

export default config;
