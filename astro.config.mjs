// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }]
    ]
  },
  
  integrations: [
    react(),
  ],
});
