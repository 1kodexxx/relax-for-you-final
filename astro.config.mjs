import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";

// 🚀 Конфигурация проекта Relax For You
export default defineConfig({
  site: "https://relaxmassage51.ru", // ← твой реальный домен
  output: "static", // ← Статический билд, без адаптеров
  integrations: [sitemap(), robotsTxt()],
  vite: {
    resolve: {
      alias: {
        "@": "/src",
        "@components": "/src/components",
        "@layouts": "/src/layouts",
        "@pages": "/src/pages",
        "@styles": "/src/styles",
        "@scripts": "/public/scripts",
      },
    },
  },
});
