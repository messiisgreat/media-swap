import { type Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      flex: {
        "28": "0 0 28%",
        "100": "0 0 100%",
      },
      keyframes: {
        "heart-out": {
          "0%": { transform: "scale(1.4)" },
          "100%": { transform: "scale(1)" },
        },
        heart: {
          "0%": { transform: "scale(0.2)" },
          "40%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
        "heart-circle": {
          "40%": { transform: "scale(10)", opacity: "1", fill: "#DD4688" },
          "55%": { transform: "scale(11)", opacity: "1", fill: "#D46ABF" },
          "65%": { transform: "scale(12)", opacity: "1", fill: "#CC8EF5" },
          "75%": {
            transform: "scale(13)",
            opacity: "1",
            fill: "transparent",
            stroke: "#CC8EF5",
            strokeWidth: "0.5",
          },
          "85%": {
            transform: "scale(17)",
            opacity: "1",
            fill: "transparent",
            stroke: "#CC8EF5",
            strokeWidth: "0.2",
          },
          "95%": {
            transform: "scale(18)",
            opacity: "1",
            fill: "transparent",
            stroke: "#CC8EF5",
            strokeWidth: "0.1",
          },
          "100%": {
            transform: "scale(19)",
            opacity: "1",
            fill: "transparent",
            stroke: "#CC8EF5",
            strokeWidth: "0",
          },
        },
      },
      animation: {
        "heart-out": "heart-out 0.3s linear forwards",
        heart: "heart 0.3s linear forwards 0.25s",
        "heart-circle": "heart-circle 0.3s linear forwards",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        lightTheme: {
          primary: "#37bbcd",
          "primary-dark": "#218e9b",
          "primary-darker": "#105f68",
          "primary-darkest": "#021f59",
          "primary-thin": "#a7c6d9",
          secondary: "#e95a8d",
          "secondary-dark": "#d84177",
          "secondary-darker": "#c22960",
          tertiary: "#edd815",
          "tertiary-dark": "#786d0b",
          black: "#000000",
          white: "#ffffff",
          background: "#f5f5f5",
          border: "#d9d9d9",
          "border-light": "#ededed",
          "background-dark": "#222222",
          gray: "#8d8d8d",
          "gray-dark": "#444444",
          "text-black": "#222222",
          "text-white": "#ffffff",
          link: "#074fba",
          disabled: "#A4A4A4",
          accent: "#1be885",
          neutral: "#272136",
          "base-100": "#ffffff",
          info: "#778ad4",
          success: "#23b893",
          warning: "#f79926",
          error: "#ea535a",
          body: {
            "background-color": "#e3e6e6",
          },
        },
      },
    ],
    logs: false,
  },
};
export default config;
