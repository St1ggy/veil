import { defineConfig } from "astro/config";
import { remarkWikilinks } from "./src/plugins/remark-wikilinks.js";
import { remarkSwadeTooltips } from "./src/plugins/remark-swade-tooltips.js";

const site = process.env.SITE_URL || "http://localhost:4321";

// GitHub Pages base_path is often "" or "/repo" (no trailing slash).
// Astro expects a path starting with "/" (except root).
let base = process.env.BASE_PATH || "/";
if (!base || base === "/") {
  base = "/";
} else {
  if (!base.startsWith("/")) base = `/${base}`;
  base = base.replace(/\/$/, "");
}

export default defineConfig({
  site,
  base,
  srcDir: "./src",
  publicDir: "./public",
  outDir: "../site",
  trailingSlash: "never",
  markdown: {
    remarkPlugins: [remarkWikilinks, remarkSwadeTooltips],
  },
  build: {
    format: "file",
  },
});
