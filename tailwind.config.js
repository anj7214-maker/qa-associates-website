/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B2C5D',
        crimson: '#B22222',
        mist: '#F4F6F8',
        ink: '#14213D',
      },
      boxShadow: {
        soft: '0 18px 50px rgba(11, 44, 93, 0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        floatUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        floatUp: 'floatUp 0.7s ease both',
      },
    },
  },
  plugins: [],
};
