import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(dropdown|select|skeleton|spinner|menu|divider|popover|button|ripple|listbox|scroll-shadow).js"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FC4747",
        "dark-blue": "#161D2F",
        "semi-dark": "#10141E",
        "grey-blue": "#5A698F",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
