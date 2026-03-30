/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}', // Tremor module
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        display: ['var(--font-display)', 'serif'],
      },
      colors: {
        canvas: '#F8F2E8',
        pearl: '#FCF8F1',
        ink: '#171411',
        bronze: '#A7835B',
        taupe: '#83776A',
        dusk: '#4E4147',
        sage: '#68786E',
      },
      boxShadow: {
        float: '0 24px 80px rgba(23, 20, 17, 0.14)',
        'float-lg': '0 40px 120px rgba(23, 20, 17, 0.18)',
        halo:
          '0 0 0 1px rgba(255, 255, 255, 0.45) inset, 0 20px 60px rgba(23, 20, 17, 0.12)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        float: 'float 12s ease-in-out infinite',
        'fade-up': 'fadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        shimmer: 'shimmer 9s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          from: {
            opacity: '0',
            transform: 'translateY(18px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
        shimmer: {
          from: {
            backgroundPosition: '0% 50%',
          },
          to: {
            backgroundPosition: '200% 50%',
          },
        },
      },
    },
  },
  plugins: [],
};
