import { satteri } from '@astrojs/markdown-satteri'
import { defineConfig } from 'astro/config'

import { contentMdastPlugins } from './src/plugins/markdown-plugins'

const site = process.env.SITE_URL || 'http://localhost:4321'

// GitHub Pages base_path is often "" or "/repo" (no trailing slash).
// Astro expects a path starting with "/" (except root).
let base = process.env.BASE_PATH || '/'

if (!base || base === '/') {
  base = '/'
} else {
  if (!base.startsWith('/')) base = `/${base}`

  base = base.replace(/\/$/, '')
}

export default defineConfig({
  site,
  base,
  srcDir: './src',
  publicDir: './public',
  outDir: '../site',
  trailingSlash: 'never',
  markdown: {
    processor: satteri({
      mdastPlugins: contentMdastPlugins(),
    }),
  },
  build: {
    format: 'file',
  },
})
