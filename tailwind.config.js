/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        overlay: "rgba(0, 0, 0, 0.5)",
      },
      boxShadow: {
        "image-crop-area": " 0 2000px 2000px rgba(0 0 0/30%)",
      },
    },
  },
  plugins: [],
};
