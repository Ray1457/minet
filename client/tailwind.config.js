/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'cream': '#f8f1e7',
        'theme-orange': '#D96F32',
        'dark-orange': '#C75D2C',
        'gold': '#F8B259',
      },
      fontFamily: {
  blockblueprint: ['BlockBlueprint', 'system-ui', 'sans-serif'],
  calpina: ['Calpina', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
  // darkMode: 'class', // optional: enable class-based dark mode
}

