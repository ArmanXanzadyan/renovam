import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
      },
    },
    extend: {
      colors: {
        // Brand — deep teal-blue (trust/reliability)
        brand: {
          DEFAULT: "#12566B",
          hover: "#0E4557",
          50: "#EAF2F5",
          100: "#CFE0E7",
          600: "#12566B",
          700: "#0E4557",
          900: "#082C38",
        },
        // Accent — warm amber/terracotta (action, "home")
        accent: {
          DEFAULT: "#E4771E",
          hover: "#C9630F",
          50: "#FDF1E6",
          100: "#FADEC4",
        },
        // Call action — green
        call: {
          DEFAULT: "#1FA463",
          hover: "#178050",
        },
        // Messenger brand colors
        viber: "#7360F2",
        telegram: "#229ED9",
        whatsapp: "#25D366",
        // Neutrals (warm)
        ink: "#1E2329", // body text / headings
        muted: "#5B6672", // secondary text
        surface: "#FFFFFF",
        canvas: "#F4F1EC", // warm section background
        line: "#E3E6EA", // borders/dividers
      },
      fontFamily: {
        // Both wired to the same Armenian-capable variable via next/font
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "var(--font-sans)", "sans-serif"],
      },
      fontSize: {
        // Mobile-first sizes; larger via responsive utilities
        h1: ["2rem", { lineHeight: "1.15", fontWeight: "700" }],
        h2: ["1.625rem", { lineHeight: "1.2", fontWeight: "600" }],
        h3: ["1.25rem", { lineHeight: "1.3", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.6" }],
        small: ["0.8125rem", { lineHeight: "1.5" }],
      },
      borderRadius: {
        card: "16px",
        btn: "10px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.06)",
        cardHover: "0 8px 24px rgba(0,0,0,0.10)",
        bar: "0 -2px 12px rgba(0,0,0,0.08)",
      },
      maxWidth: {
        prose: "70ch",
      },
      spacing: {
        "safe-b": "env(safe-area-inset-bottom)",
      },
      zIndex: {
        header: "50",
        bar: "40",
        cluster: "45",
        modal: "60",
      },
    },
  },
  plugins: [],
};

export default config;
