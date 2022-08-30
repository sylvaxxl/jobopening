module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "cover-pic": "url('/images/hero.webp')",
        "signin": "url('/images/jobopening_signin.jpg')"
      }),
    },
  },
  plugins: [],
};
