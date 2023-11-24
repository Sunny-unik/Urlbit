/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,ejs}"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px"
      }
    }
  },
  plugins: []
};
