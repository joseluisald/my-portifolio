import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";
import alpinejs from "@astrojs/alpinejs";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://jlacode.com.br",
  adapter: node({ mode: "standalone" }),
  output: "server",
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      target: "es2022",
      sourcemap: false,
    },
  },
  build: {
    inlineStylesheets: "always",
  },
  integrations: [
    alpinejs({ entrypoint: "./src/scripts/main.ts" }),
    sitemap(),
    compress({
      HTML: false,
      CSS: true,
      JavaScript: true,
      Image: true,
    }),
  ],
  outDir: "./dist",
});
