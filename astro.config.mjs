import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://relaxmassage51.ru",
  output: "static",
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
