/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ciOrange: '#F89406', // Orange institutionnel
        ciGreen: '#008532',  // Vert drapeau officiel
        ciWhite: '#FFFFFF',
        ciDark: '#1A1A1A',   // Noir profond pour le sérieux
        ciGray: '#F3F4F6',   // Gris très clair pour les fonds de section
      },
    },
  },
  plugins: [],
}
