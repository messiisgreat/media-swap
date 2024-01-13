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
      colors: {
        // カスタム文字色
        body: "#202124", // 背景が白の時
        "light-bg-bk": "black", // 背景が明るめの時
        "dark-bg-wh": "white", // 背景が暗めの時
      },
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
          primary: "#E95A8D",
          "primary-dark": "#D84177",
          "primary-darker": "#C22960",
          secondary: "#37BBCD",
          "secondary-dark": "#218E9B",
          "secondary-darker": "#105F68",
          "secondary-darkest": "#021F59",
          "secondary-thin": "#A7C6D9",
          tertiary: "#EDD815",
          "tertiary-dark": "#786D0B",
          black: "#000000",
          white: "#FFFFFF",
          background: "#F5F5F5",
          border: "#D9D9D9",
          "border-light": "#EDEDED",
          "background-dark": "#222222",
          gray: "#8d8d8d",
          "gray-dark": "#444444",
          "text-black": "#222222",
          "text-white": "#FFFFFF",
          link: "#074FBA",
          disabled: "#A4A4A4",
          accent: "#1be885",
          neutral: "#272136",
          "base-100": "#ffffff",
          info: "#778AD4",
          success: "#37D39A",
          warning: "#FABE22",
          error: "#F97272",
          body: {
            "background-color": "#FFFFFF",
          },
        },
      },
    ],
    logs: false,
  },
};
export default config;
