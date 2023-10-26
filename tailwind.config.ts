import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "sidebar-blue": "rgb(9, 25, 40)",
        "custom-gray": "rgb(66, 66, 66)",
        "close-friends-bg": "rgb(223, 239, 255)",
        "super-close-friends-bg": "rgb(220, 255, 230)",
      },
      colors: {
        "custom-gray": "rgb(66, 66, 66)",
        "clear-all-blue": "rgb(51, 153, 255)",
        "close-friends-tag": "rgb(51, 153, 255)",
        "super-close-friends-tag": "rgb(25, 180, 68)",
        "mail-phone-color": "rgb(171, 171, 171)",
      },
    },
  },
  plugins: [],
};
export default config;
