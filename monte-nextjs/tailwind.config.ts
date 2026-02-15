import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'monte-brown': '#42312b',
        'monte-brown-light': '#5c4a42',
        'monte-brown-dark': '#352922',
        'monte-cream': '#FFFBF7',
        'monte-beige': '#FDF5E6',
        'monte-accent-light': '#EFEBE9',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
