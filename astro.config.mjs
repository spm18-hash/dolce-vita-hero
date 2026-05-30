// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
    },
  },
  image: {
    domains: ["image.mux.com"],
  },
  fonts: [
    {
      name: "Inter",
      provider: fontProviders.google(),
      cssVariable: "--font-sans",
      weights: [400, 500, 600],
    },
    {
      name: "Italiana",
      provider: fontProviders.google(),
      cssVariable: "--font-italiana",
      weights: [400],
    },
  ],
});
