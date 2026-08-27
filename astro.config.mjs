// @ts-check
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import { rehypeLazyImages } from './src/plugins/rehype-lazy-images.mjs'

export default defineConfig({
  site: 'https://yanghuanrong.github.io',
  server: {
    host: '127.0.0.1',
    port: 4321,
  },
  integrations: [mdx(), sitemap(), react()],
  markdown: {
    rehypePlugins: [rehypeLazyImages],
    shikiConfig: {
      themes: {
        light: 'min-light',
        dark: 'min-dark',
      },
    },
  },
})
