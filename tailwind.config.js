/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#17140F",
        primaryLight: "#221E17",
        secondary: "#E2983E",
        textPrimary: "#F3EDE3",
        textSecondary: "#ABA095",
      },
    },
  },
  plugins: [],
}
