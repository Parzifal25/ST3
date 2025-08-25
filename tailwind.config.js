/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#C70276',
          'pink-light': '#FFE4F1',
          'pink-glow': '#FF77B5',
        },
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          600: '#666666',
          900: '#1A1A1A',
        }
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-brand': 'pulse-brand 2s infinite',
        'bounce-gentle': 'bounce-gentle 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-brand': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(199, 2, 118, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(199, 2, 118, 0)' }
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        }
      }
    },
  },
  plugins: [],
}