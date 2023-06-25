/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      blue: "#0076ff",
      orange: "#f26522",
      //blue: '#1fb6ff',
      blueHover: "#3391FF",
      green: "#10b981",
      greenHover: "#059669",
      lightGreen: "#ecfdf5",
      gray: "#d1d5db",
      grayHover: "#9ca3af",
    },
    fontFamily: {
      sans: ["sans-serif", "sans-serif"],
      serif: ["Georgia", "serif"],
      mono: ["Menlo", "monospace"],
      comfortaa: ["var(--font-comfortaa)", "sans-serif"],
      arial: ["Arial", "sans-serif"],
      helvetica: ["Helvetica", "sans-serif"],
    },
    screens: {
      footerXM: "402px",
      xs: "480px",
      footerSM: "620px",
      sm: "640px",
      md: "768px",
      ml: "896px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1600px",
    },
  },
  plugins: [],
};
