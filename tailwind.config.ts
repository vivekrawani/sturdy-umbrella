import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    
    extend: {
      spacing:{
        '90svh' : '90svh',
        '80svh' : '80svh'
      },
      colors : {
        "red-bull" : "#F62F63",
        't-b-9' : "rgba(0, 0, 0, 0.9)",
        't-b-4' : "rgba(0,0,0, 0.4)",
        't-b-7' : "rgba(0, 0, 0, 0.7)"
      },
      boxShadow: {
        '3xl': '-16px -6px 15px 0px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "image-1" : 
          "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80);",
        },

    },
  },
  plugins: [],
};
export default config;
