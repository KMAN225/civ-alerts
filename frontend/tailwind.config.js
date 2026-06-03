/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ciOrange: '#F59E0B', // Ambre - accent chaud
        ciGreen: '#059669',  // Émeraude - vert moderne et sobre
        ciWhite: '#FFFFFF',
        ciDark: '#111827',   // Gris très foncé
        ciGray: '#F3F4F6',
      },
    },
  },
  plugins: [],
}
