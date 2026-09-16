import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';
import compress from "astro-compress";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    build: {
      target: "es2022",
      minify: "esbuild",
      cssMinify: "lightningcss",
      sourcemap: false,
      reportCompressedSize: false,
    },
  },
  build: {
    inlineStylesheets: "always",
  },
  integrations: [
    alpinejs(),
    compress({
      HTML: false,
      CSS: true,
      JavaScript: true,
      Image: true,
    }),
  ],
  outDir: "./dist",
});
