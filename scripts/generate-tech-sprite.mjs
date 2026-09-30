/**
 * Build public/icons/tech-sprite.webp from public/icons/tech/*.svg
 * Order must match src/consts.ts techIcons.
 *
 * Usage: node scripts/generate-tech-sprite.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const icons = [
  'html5',
  'css3',
  'javascript',
  'typescript',
  'react',
  'vue',
  'jquery',
  'webpack',
  'vite',
  'ant-design',
  'element',
  'nodejs',
  'electron',
  'express',
  'mongodb',
  'nextjs',
  'git',
  'github',
  'github-actions',
  'gitee',
  'markdown',
  'echarts',
  'chrome',
  'photoshop',
  'sass',
  'tailwindcss',
  'npm',
  'astro',
  'cursor',
]

const CELL = 64
const COLS = 8
const rows = Math.ceil(icons.length / COLS)

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const iconDir = path.join(rootDir, 'public/icons/tech')
const outPath = path.join(rootDir, 'public/icons/tech-sprite.webp')

const tiles = []
for (const id of icons) {
  const svg = fs.readFileSync(path.join(iconDir, `${id}.svg`))
  const buf = await sharp(svg, { density: 300 })
    .resize(CELL, CELL, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer()
  tiles.push(buf)
}

await sharp({
  create: {
    width: COLS * CELL,
    height: rows * CELL,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite(
    tiles.map((input, i) => ({
      input,
      left: (i % COLS) * CELL,
      top: Math.floor(i / COLS) * CELL,
    })),
  )
  .webp({ quality: 92, alphaQuality: 100, effort: 6 })
  .toFile(outPath)

console.log(
  `wrote ${path.relative(rootDir, outPath)} (${COLS}x${rows} cells, ${icons.length} icons, ${fs.statSync(outPath).size} bytes)`,
)
