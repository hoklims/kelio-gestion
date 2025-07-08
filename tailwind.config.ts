import type { Config } from "tailwindcss"
import { THEME } from './src/lib/design-system/theme'

const config: Config = {
  darkMode: "class",
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
      // Oklab-based color system
      colors: {
        ...THEME.colors,
        // Legacy compatibility
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Palette étendue basée sur Oklab/CAM16
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        // Couleurs avec gamme complète de shades
        emerald: {
          50: "oklch(var(--color-emerald-50))",
          100: "oklch(var(--color-emerald-100))",
          200: "oklch(var(--color-emerald-200))",
          500: "oklch(var(--color-emerald-500))",
          800: "oklch(0.35 0.16 158)", // Ajout shade 800 pour contraste
          900: "oklch(var(--color-emerald-900))",
          950: "oklch(var(--color-emerald-950))",
          DEFAULT: "oklch(var(--color-emerald))",
          foreground: "oklch(var(--color-emerald-foreground))",
        },
        amber: {
          50: "oklch(var(--color-amber-50))",
          100: "oklch(var(--color-amber-100))",
          200: "oklch(var(--color-amber-200))",
          500: "oklch(var(--color-amber-500))",
          800: "oklch(0.35 0.21 35)", // Ajout shade 800 pour contraste
          900: "oklch(var(--color-amber-900))",
          950: "oklch(var(--color-amber-950))",
          DEFAULT: "oklch(var(--color-amber))",
          foreground: "oklch(var(--color-amber-foreground))",
        },
        violet: {
          50: "oklch(var(--color-violet-50))",
          100: "oklch(var(--color-violet-100))",
          200: "oklch(var(--color-violet-200))",
          500: "oklch(var(--color-violet-500))",
          800: "oklch(0.40 0.18 275)", // Ajout shade 800 pour contraste
          900: "oklch(var(--color-violet-900))",
          950: "oklch(var(--color-violet-950))",
          DEFAULT: "oklch(var(--color-violet))",
          foreground: "oklch(var(--color-violet-foreground))",
        },
        rose: {
          DEFAULT: "hsl(var(--rose))",
          foreground: "hsl(var(--rose-foreground))",
        },
        indigo: {
          50: "oklch(var(--color-indigo-50))",
          100: "oklch(var(--color-indigo-100))",
          200: "oklch(var(--color-indigo-200))",
          500: "oklch(var(--color-indigo-500))",
          800: "oklch(0.35 0.20 238)", // Ajout shade 800 pour contraste
          900: "oklch(var(--color-indigo-900))",
          950: "oklch(var(--color-indigo-950))",
          DEFAULT: "oklch(var(--color-indigo))",
          foreground: "oklch(var(--color-indigo-foreground))",
        },
        teal: {
          DEFAULT: "hsl(var(--teal))",
          foreground: "hsl(var(--teal-foreground))",
        },
        // Couleurs d'accent supplémentaires pour enrichir la palette
        coral: {
          50: "oklch(var(--color-coral-50))",
          100: "oklch(var(--color-coral-100))",
          200: "oklch(var(--color-coral-200))",
          500: "oklch(var(--color-coral-500))",
          800: "oklch(0.35 0.22 12)", // Ajout shade 800 pour contraste
          900: "oklch(var(--color-coral-900))",
          950: "oklch(var(--color-coral-950))",
          DEFAULT: "oklch(var(--color-coral))",
          foreground: "oklch(var(--color-coral-foreground))",
        },
        mint: {
          50: "oklch(var(--color-mint-50))",
          100: "oklch(var(--color-mint-100))",
          200: "oklch(var(--color-mint-200))",
          500: "oklch(var(--color-mint-500))",
          800: "oklch(0.32 0.13 165)", // Ajout shade 800 pour contraste
          900: "oklch(var(--color-mint-900))",
          950: "oklch(var(--color-mint-950))",
          DEFAULT: "oklch(var(--color-mint))",
          foreground: "oklch(var(--color-mint-foreground))",
        },
        lavender: {
          50: "oklch(var(--color-lavender-50))",
          100: "oklch(var(--color-lavender-100))",
          200: "oklch(var(--color-lavender-200))",
          500: "oklch(var(--color-lavender-500))",
          800: "oklch(0.45 0.11 260)", // Ajout shade 800 pour contraste
          900: "oklch(var(--color-lavender-900))",
          950: "oklch(var(--color-lavender-950))",
          DEFAULT: "oklch(var(--color-lavender))",
          foreground: "oklch(var(--color-lavender-foreground))",
        },
        peach: {
          50: "oklch(var(--color-peach-50))",
          100: "oklch(var(--color-peach-100))",
          200: "oklch(var(--color-peach-200))",
          500: "oklch(var(--color-peach-500))",
          800: "oklch(0.40 0.19 25)", // Ajout shade 800 pour contraste
          900: "oklch(var(--color-peach-900))",
          950: "oklch(var(--color-peach-950))",
          DEFAULT: "oklch(var(--color-peach))",
          foreground: "oklch(var(--color-peach-foreground))",
        },
        sage: {
          50: "oklch(var(--color-sage-50))",
          100: "oklch(var(--color-sage-100))",
          200: "oklch(var(--color-sage-200))",
          500: "oklch(var(--color-sage-500))",
          800: "oklch(0.40 0.09 135)", // Ajout shade 800 pour contraste
          900: "oklch(var(--color-sage-900))",
          950: "oklch(var(--color-sage-950))",
          DEFAULT: "oklch(var(--color-sage))",
          foreground: "oklch(var(--color-sage-foreground))",
        },
        sky: {
          50: "oklch(var(--color-sky-50))",
          100: "oklch(var(--color-sky-100))",
          200: "oklch(var(--color-sky-200))",
          500: "oklch(var(--color-sky-500))",
          800: "oklch(0.40 0.20 195)", // Ajout shade 800 pour contraste
          900: "oklch(var(--color-sky-900))",
          950: "oklch(var(--color-sky-950))",
          DEFAULT: "oklch(var(--color-sky))",
          foreground: "oklch(var(--color-sky-foreground))",
        },
        // Ajout des couleurs standard Tailwind manquantes mais avec nos variables
        slate: {
          50: "oklch(0.98 0.008 210)",
          100: "oklch(0.95 0.012 210)",
          200: "oklch(0.90 0.015 210)",
          300: "oklch(0.82 0.012 210)",
          400: "oklch(0.68 0.008 210)",
          500: "oklch(0.58 0.006 210)",
          600: "oklch(0.48 0.004 210)",
          700: "oklch(0.38 0.004 210)",
          800: "oklch(0.28 0.006 210)",
          900: "oklch(0.18 0.006 210)",
          950: "oklch(0.12 0.008 210)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-from-right": {
          from: { transform: "translateX(100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "scale-in": "scale-in 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-in-from-right": "slide-in-from-right 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "pulse-soft": "pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      // Amélioration des ombres pour un design plus doux
      boxShadow: {
        ...THEME.boxShadow,
        'card': '0 1px 3px hsla(var(--foreground), 0.1), 0 1px 2px hsla(var(--foreground), 0.06)',
        'card-hover': '0 4px 6px hsla(var(--foreground), 0.1), 0 2px 4px hsla(var(--foreground), 0.06)',
        'soft': '0 2px 8px hsla(var(--foreground), 0.08)',
        'soft-lg': '0 8px 25px hsla(var(--foreground), 0.12)',
      },
      // Amélioration de l'espacement avec design system
      spacing: {
        ...THEME.spacing,
        '18': '4.5rem',
        '88': '22rem',
      },
      // Premium colors extension
      extend: {
        // Conteneur personnalisé pour le design premium
        '.container-premium': {
          'max-width': '1400px',
          'margin': '0 auto',
          'padding': '0 1.5rem',
          '@screen sm': {
            'padding': '0 2rem',
          },
          '@screen lg': {
            'padding': '0 3rem',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
