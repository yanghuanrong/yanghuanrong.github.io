export const SITE_TITLE = '杨焕荣'
export const SITE_DESCRIPTION =
  '杨焕荣（南北）。设计工程师。做过视觉、App 界面、产品和工程，专注 UI 组件、设计系统、排版与动画。'
export const SITE_URL = 'https://yanghuanrong.github.io'
export const AUTHOR_NAME = '杨焕荣'
export const AUTHOR_ALIAS = '南北'
export const AUTHOR_JOB = '设计工程师'
export const GITHUB_URL = 'https://github.com/yanghuanrong'
export const JUEJIN_URL = 'https://juejin.cn/user/2286606292882749'
export const ZHIHU_URL = 'https://www.zhihu.com/people/yang-huan-rong-91'
export const X_URL = 'https://x.com/mkoibb'
export const EMAIL = 'bsie@qq.com'
export const GA_MEASUREMENT_ID = 'G-1Q6ZSZMR70'

export const SAME_AS = [GITHUB_URL, JUEJIN_URL, ZHIHU_URL, X_URL] as const

export const socials = [
  { name: 'GitHub', href: GITHUB_URL },
  { name: '掘金', href: JUEJIN_URL },
  { name: '知乎', href: ZHIHU_URL },
  { name: 'X', href: X_URL },
  { name: 'Email', href: `mailto:${EMAIL}` },
]

export type Project = {
  name: string
  desc: string
  initial: string
  cover: string
  href?: string
  coverImage?: 'relax-ui' | 'relax-plus' | 'eprotek' | 'hydrogen'
}

export const projects: Project[] = [
  {
    name: 'Eprotek',
    href: 'https://www.eprotekcorp.com/',
    desc: 'Eprotek 官网，用 Next.js 搭建面向全球客户的英文站。产品、方案、新闻和案例从后台发布，每页可配 SEO，sitemap 随内容自动更新。',
    initial: 'E',
    cover: '#e8e8e6',
    coverImage: 'eprotek',
  },
  {
    name: 'Relax Plus',
    href: 'https://yanghuanrong.github.io/RelaxPlus/',
    desc: 'Relax Plus，Vue 3 桌面端组件库，涵盖按钮、表单、反馈、导航等二十多个组件。Markdown 文档站点，GitHub Actions 自动部署，npm 发包 relaxplus。',
    initial: 'P',
    cover: '#f7f8fa',
    coverImage: 'relax-plus',
  },
  {
    name: 'Relax UI',
    href: 'https://github.com/yanghuanrong/RelaxUI',
    desc: 'Relax UI，Vue 2 组件库，Relax Plus 的前身，2017 年起迭代。npm 包 vue-relax-ui，带在线组件文档。',
    initial: 'R',
    cover: '#f7f8fa',
    coverImage: 'relax-ui',
  },
  {
    name: 'Hydrogen JS SDK',
    href: 'https://github.com/bmob/hydrogen-js-sdk',
    desc: 'Bmob 新版 ES6 SDK，新版语法整合，面向前端混合开发场景，支持微信小程序、抖音小程序、H5、快应用、Cocos 游戏、混合 App 等平台。',
    initial: 'H',
    cover: '#e8e8e6',
    coverImage: 'hydrogen',
  },
]

export type Contribution = {
  repo: string
  note: string
  href: string
}

export const contributions: Contribution[] = [
  {
    repo: 'dream-num/Luckysheet',
    note: '开源的在线电子表格，类 Excel 的协同编辑与公式能力。',
    href: 'https://github.com/dream-num/Luckysheet',
  },
  {
    repo: 'ascoders/weekly',
    note: '前端精读周刊，持续输出框架、工程与设计相关阅读。',
    href: 'https://github.com/ascoders/weekly',
  },
  {
    repo: 'Anduin2017/HowToCook',
    note: '程序员做饭指南，用结构化文档写清家常菜做法。',
    href: 'https://github.com/Anduin2017/HowToCook',
  },
  {
    repo: 'ant-design/x',
    note: 'Ant Design 的 AI 应用组件库，覆盖对话与生成式界面。',
    href: 'https://github.com/ant-design/x',
  },
]

export const photos = [
  { src: '/photos/17844430.webp', caption: '', width: 1080, height: 720 },
  { src: '/photos/17843828.webp', caption: '', width: 800, height: 1200 },
  { src: '/photos/17842351.webp', caption: '', width: 1080, height: 720 },
  { src: '/photos/17841802.webp', caption: '', width: 1080, height: 720 },
  { src: '/photos/17841685.webp', caption: '', width: 1080, height: 720 },
  { src: '/photos/17846369.webp', caption: '', width: 1080, height: 720 },
  { src: '/photos/17846368.webp', caption: '', width: 1080, height: 720 },
  { src: '/photos/17846375.webp', caption: '', width: 1080, height: 720 },
  { src: '/photos/17849817.webp', caption: '', width: 1080, height: 720 },
] as const

export type PhotoItem = (typeof photos)[number]

/** Sprite built by `node scripts/generate-tech-sprite.mjs` — order must match that script. */
export const TECH_SPRITE = {
  src: '/icons/tech-sprite.webp',
  cols: 8,
  rows: 4,
} as const

export const techIcons = [
  { name: 'HTML5' },
  { name: 'CSS3' },
  { name: 'JavaScript' },
  { name: 'TypeScript' },
  { name: 'React' },
  { name: 'Vue' },
  { name: 'jQuery' },
  { name: 'Webpack' },
  { name: 'Vite' },
  { name: 'Ant Design' },
  { name: 'Element' },
  { name: 'Node.js' },
  { name: 'Electron' },
  { name: 'Express' },
  { name: 'MongoDB' },
  { name: 'Next.js' },
  { name: 'Git' },
  { name: 'GitHub' },
  { name: 'GitHub Actions' },
  { name: 'Gitee' },
  { name: 'Markdown' },
  { name: 'ECharts' },
  { name: 'Chrome' },
  { name: 'Photoshop' },
  { name: 'Sass' },
  { name: 'Tailwind CSS' },
  { name: 'npm' },
  { name: 'Astro' },
  { name: 'Cursor' },
] as const

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
