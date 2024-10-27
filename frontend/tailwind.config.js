/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mont: ['Montserrat', ...(defaultTheme.fontFamily.serif ?? [])],
        noto: ['Noto Sans', ...(defaultTheme.fontFamily.serif ?? [])],
      },
      colors: {
        green: {
          primary: '#538C87',
          secondary: '#EBFFFD',
        },
        dark: {
          primary: '#2B1B12',
          secondary: '#444444',
        },
        light: {
          primary: '#FFFFFF',
          secondary: '#FBF5F1',
        },
        cyan: {
          primary: '#41EBFFFD',
        },
        gray: {
          primary: '#666666',
          secondary: '#D9D9D9',
          light: '#FAFAFA',
        },
        blue: {
          secondary: '#4182F9',
        },
        red: {
          primary: '#EB5757',
        },
      },
    },
  },
  plugins: [],
};