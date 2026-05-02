import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: "https://relaxmassage51.ru",
  output: "static",
  // ДОБАВЬТЕ ЭТОТ БЛОК:
  server: {
    open: true, // Автоматически открывать браузер при старте
    host: true, // Позволяет открывать проект в локальной сети (например, с телефона)
  },
  integrations: [sitemap(), robotsTxt()],
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@layouts": path.resolve(__dirname, "./src/layouts"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@styles": path.resolve(__dirname, "./src/styles"),
        "@scripts": path.resolve(__dirname, "./public/scripts"),
      },
    },
  },
});
