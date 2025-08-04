module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#020617',
          900: '#0a192f',
          850: '#0f172a',
          800: '#172a45',
          700: '#2a4365',
          600: '#334155',
        },
        cyan: {
          600: '#0891b2',
          500: '#06b6d4',
          400: '#22d3ee',
          300: '#67e8f9',
          200: '#a5f3fc',
          100: '#cffafe',
        },
        violet: {
          900: '#4c1d95',
          800: '#5b21b6',
          700: '#7c3aed',
          600: '#8b5cf6',
          500: '#a855f7',
          400: '#c084fc',
        },
        purple: {
          900: '#581c87',
          800: '#6b21a8',
          700: '#7e22ce',
          600: '#9333ea',
          500: '#a855f7',
          400: '#c084fc',
        },
        pink: {
          500: '#ec4899',
          400: '#f472b6',
          300: '#f9a8d4',
        },
        orange: {
          500: '#f97316',
          400: '#fb923c',
          300: '#fdba74',
        },
        emerald: {
          500: '#10b981',
          400: '#34d399',
          300: '#6ee7b7',
        },
        slate: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
          50: '#f8fafc',
        }
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'spin-slower': 'spin 4s linear infinite',
        'glow': 'glow 2.5s ease-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'wave': 'wave 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 0.4 },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        wave: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(34, 211, 238, 0.3)',
        'glow-lg': '0 0 30px rgba(34, 211, 238, 0.4)',
        'glow-xl': '0 0 50px rgba(34, 211, 238, 0.5)',
        'purple-glow': '0 0 20px rgba(168, 85, 247, 0.3)',
        'emerald-glow': '0 0 20px rgba(16, 185, 129, 0.3)',
      },
    },
  },
  plugins: [],
}