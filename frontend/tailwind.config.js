import daisyui from 'daisyui';

export default {
  darkMode: 'class', 
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1d9bf0',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['dark'],
    darkTheme: 'dark',
  },
};