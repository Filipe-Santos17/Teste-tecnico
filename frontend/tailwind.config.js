/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/components/*.{js,tsx, jsx, ts}",
    "./src/components/**/*.{js,tsx, jsx, ts}",
    "./src/components/**/**/*.{js,tsx, jsx, ts}",
    "./src/layouts/*.{js,tsx, jsx, ts}",
    "./src/pages/*.{js,tsx, jsx, ts}",
    "./src/pages/**/*.{js,tsx, jsx, ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#635fc7",
        purpleLigth: "#A8A4FF",
        black: "#232324",
        red: "#EA5555",
        gray10: "#20212C",
        gray20: "#2B2C37",
        gray30: "#3E3F4E",
        gray40: "#828FA3",
        gray50: "#E4EBFA",
        gray60: "#F4F7FD",
        darkNeutral: '#121212',
        modalBg:'#20212C30',
      },
      screens: {
        xl: { max: '1920px' },
        lg: { max: '1440px' },
        md2: { max: '1280px' },
        md: { max: '1024px' },
        sm: { max: '600px' },
      },
    },
  },
  plugins: [],
};
