import fg from 'fast-glob'
import type { FeedOptions, Item } from 'feed'
import { Feed } from 'feed'
import fs from 'fs-extra'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import { dirname } from 'path'

const DOMAIN = 'https://bsie.gitee.io'
const AUTHOR = {
  name: 'yanghuanrong',
  email: 'bsie@qq.com',
  link: DOMAIN,
}
const markdown = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
})

async function run() {
  await buildBlogRSS()
}

async function buildBlogRSS() {
  const files = await fg('pages/posts/*.md')

  const options = {
    title: 'yanghuanrong',
    description: 'yanghuanrong\' Blog',
    id: 'https://bsie.gitee.io/',
    link: 'https://bsie.gitee.io/',
    copyright: 'CC BY-NC-SA 4.0 2021 © yanghuanrong',
    feedLinks: {
      json: 'https://bsie.gitee.io/feed.json',
      atom: 'https://bsie.gitee.io/feed.atom',
      rss: 'https://bsie.gitee.io/feed.xml',
    },
  }
  const posts: any[] = (
    await Promise.all(
      files.filter(i => !i.includes('index'))
        .map(async(i) => {
          const raw = await fs.readFile(i, 'utf-8')
          const { data, content } = matter(raw)

          if (data.lang !== 'en')
            return

          const html = markdown.render(content)
            .replace('src="/', `src="${DOMAIN}/`)

          if (data.image?.startsWith('/'))
            data.image = DOMAIN + data.image

          return {
            ...data,
            date: new Date(data.date),
            content: html,
            author: [AUTHOR],
            link: DOMAIN + i.replace(/^pages(.+)\.md$/, '$1'),
          }
        }),
    ))
    .filter(Boolean)

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))

  await writeFeed('feed', options, posts)
}

async function writeFeed(name: string, options: FeedOptions, items: Item[]) {
  options.author = AUTHOR
  options.image = 'https://bsie.gitee.io/avatar.png'
  options.favicon = 'https://bsie.gitee.io/logo.png'

  const feed = new Feed(options)

  items.forEach(item => feed.addItem(item))
  await fs.ensureDir(dirname(`./dist/${name}`))
  await fs.writeFile(`./dist/${name}.xml`, feed.rss2(), 'utf-8')
  await fs.writeFile(`./dist/${name}.atom`, feed.atom1(), 'utf-8')
  await fs.writeFile(`./dist/${name}.json`, feed.json1(), 'utf-8')
}

run()
