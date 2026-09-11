/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0B2647',
          900: '#0D2C57',
          800: '#123769',
          700: '#143D75',
          600: '#1B4E92',
          500: '#2563A8',
        },
        teal: {
          600: '#089199',
          500: '#0BB8C4',
          400: '#3FCBD3',
          100: '#E3FAFB',
        },
        // sand/ink/line/surface are theme-sensitive: their actual values
        // come from CSS variables defined in index.css (:root for light,
        // html.dark for dark), so every existing bg-sand-50 / text-ink-900 /
        // border-line usage across the app re-themes automatically when the
        // .dark class toggles on <html> — no per-component dark: variants
        // needed.
        sand: {
          50: 'rgb(var(--color-sand-50) / <alpha-value>)',
          100: 'rgb(var(--color-sand-100) / <alpha-value>)',
          200: 'rgb(var(--color-sand-200) / <alpha-value>)',
        },
        ink: {
          900: 'rgb(var(--color-ink-900) / <alpha-value>)',
          700: 'rgb(var(--color-ink-700) / <alpha-value>)',
          500: 'rgb(var(--color-ink-500) / <alpha-value>)',
          300: 'rgb(var(--color-ink-300) / <alpha-value>)',
        },
        line: {
          DEFAULT: 'rgb(var(--color-line) / <alpha-value>)',
          soft: 'rgb(var(--color-line-soft) / <alpha-value>)',
        },
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        success: { DEFAULT: '#1E8F5F', bg: '#E8F5EE' },
        warning: { DEFAULT: '#B4740F', bg: '#FBF1DF' },
        danger: { DEFAULT: '#C1352B', bg: '#FBEAE8' },
        info: { DEFAULT: '#2563A8', bg: '#EAF1FA' },
      },
      fontFamily: {
        sans: ['Cairo', 'Segoe UI', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '18px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(13,44,87,0.06)',
        md: '0 6px 20px rgba(13,44,87,0.08)',
        lg: '0 16px 40px rgba(13,44,87,0.14)',
      },
      maxWidth: {
        content: '1240px',
      },
    },
  },
  plugins: [],
}
