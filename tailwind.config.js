/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'train': "url('https://png.pngtree.com/png-vector/20240506/ourmid/pngtree-modern-bullet-train-png-image_12370412.png')",
      }),
    },
  },
  plugins: [],
}