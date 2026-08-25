export const SITE_TITLE = '南北'
export const SITE_DESCRIPTION =
  '南北（杨焕荣）。广州，九年前端。做零代码引擎、跨端 SDK 和开源组件库。像素级还原是默认标准。'
export const SITE_SLOGAN = '像素对齐，是默认标准。'
export const SITE_URL = 'https://yanghuanrong.github.io'
export const AUTHOR_NAME = '杨焕荣'
export const AUTHOR_ALIAS = '南北'
export const AUTHOR_JOB = '前端'
export const GITHUB_URL = 'https://github.com/yanghuanrong'
export const EMAIL = 'bsie@qq.com'

export const socials = [
  { name: 'GitHub', href: GITHUB_URL },
  { name: 'Email', href: `mailto:${EMAIL}` },
  { name: '图虫', href: 'https://sovo.tuchong.com/' },
  { name: '站酷', href: 'https://www.zcool.com.cn/u/17555157' },
  { name: 'RSS', href: '/rss.xml' },
]

export type Project = {
  name: string
  desc: string
  initial: string
  cover: string
  href?: string
  coverImage?: 'relax-ui' | 'relax-plus'
}

export const projects: Project[] = [
  {
    name: '零代码平台',
    desc: '面向普通人。领域建模之后，表单、流程、报表、UI 四套引擎用拖拉拽拼起来。DSL、React 多页构建、错误监控是我写的。',
    initial: 'N',
    cover: '#14151a',
  },
  {
    name: 'Relax Plus',
    href: 'https://yanghuanrong.github.io/RelaxPlus/',
    desc: 'Vue 3 组件库。setup 语法还没发布就开始做，按钮到日历二十多个组件，文档和 CI 自己搭。过了百星。',
    initial: 'P',
    cover: '#f7f8fa',
    coverImage: 'relax-plus',
  },
  {
    name: 'Relax UI',
    href: 'https://github.com/yanghuanrong/RelaxUI',
    desc: '更早那套 Vue 2 组件库。同一套审美，先在业务里打过一遍。',
    initial: 'R',
    cover: '#f7f8fa',
    coverImage: 'relax-ui',
  },
  {
    name: 'Hydrogen JS SDK',
    href: 'https://github.com/bmob/hydrogen-js-sdk',
    desc: '给微信小程序、快应用、抖音、H5 接 Bmob 云服务。环境、构建和 Query 核心是我写的，到现在还在跑。',
    initial: 'H',
    cover: '#1c1718',
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

export const techIcons = [
  { name: 'HTML5', src: '/icons/tech/html5.svg' },
  { name: 'CSS3', src: '/icons/tech/css3.svg' },
  { name: 'JavaScript', src: '/icons/tech/javascript.svg' },
  { name: 'TypeScript', src: '/icons/tech/typescript.svg' },
  { name: 'React', src: '/icons/tech/react.svg' },
  { name: 'Vue', src: '/icons/tech/vue.svg' },
  { name: 'jQuery', src: '/icons/tech/jquery.svg' },
  { name: 'Webpack', src: '/icons/tech/webpack.svg' },
  { name: 'Vite', src: '/icons/tech/vite.svg' },
  { name: 'Ant Design', src: '/icons/tech/ant-design.svg' },
  { name: 'Element', src: '/icons/tech/element.svg' },
  { name: 'Node.js', src: '/icons/tech/nodejs.svg' },
  { name: 'Express', src: '/icons/tech/express.svg' },
  { name: 'MongoDB', src: '/icons/tech/mongodb.svg' },
  { name: 'Next.js', src: '/icons/tech/nextjs.svg' },
  { name: 'Git', src: '/icons/tech/git.svg' },
  { name: 'GitHub', src: '/icons/tech/github.svg' },
  { name: 'GitHub Actions', src: '/icons/tech/github-actions.svg' },
  { name: 'Gitee', src: '/icons/tech/gitee.svg' },
  { name: 'Markdown', src: '/icons/tech/markdown.svg' },
  { name: 'ECharts', src: '/icons/tech/echarts.svg' },
  { name: 'Chrome', src: '/icons/tech/chrome.svg' },
  { name: 'Photoshop', src: '/icons/tech/photoshop.svg' },
  { name: 'Sass', src: '/icons/tech/sass.svg' },
  { name: 'npm', src: '/icons/tech/npm.svg' },
  { name: 'Astro', src: '/icons/tech/astro.svg' },
] as const

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
