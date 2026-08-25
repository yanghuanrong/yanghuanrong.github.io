import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts'

export async function GET(context: { site?: URL }) {
  const posts = await getCollection('blog')
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site ?? 'https://yanghuanrong.github.io',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
    })),
  })
}
