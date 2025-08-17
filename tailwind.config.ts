import type { Config } from "tailwindcss";
import {
  generateTailwindColors,
  generateTailwindGradients,
} from "./src/design/tokens/colors";
import { generateTailwindSpacing } from "./src/design/tokens/spacing";
import { generateTailwindTypography } from "./src/design/tokens/typography";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      // デザイントークンから生成
      ...generateTailwindTypography(),
      ...generateTailwindSpacing(),
      backgroundImage: generateTailwindGradients(),
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // デザイントークンから直接カラーを生成
      colors: generateTailwindColors(),
      gridTemplateColumns: {
        footer: "400px 1fr 1fr 1fr",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    ({ addBase }: { addBase: (styles: Record<string, unknown>) => void }) => {
      addBase({
        'a, [role="link"]': {
          cursor: "pointer",
        },
      });
    },
  ],
};
export default config;
