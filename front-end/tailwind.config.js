module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // مسیر فایل‌های پروژه
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        fadeOut: "fadeOut 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      fontFamily: {
        kalame: ['Kalameh', 'sans-serif'],
        vazir: ['Vazir', 'sans-serif'],
      },
    },
  },
  plugins: [],
};