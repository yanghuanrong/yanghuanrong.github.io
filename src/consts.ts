export const SITE_TITLE = '杨焕荣'
export const SITE_DESCRIPTION =
  '杨焕荣（南北）。长沙，设计工程师。做过视觉、App 界面、产品和工程，专注 UI 组件、设计系统、排版与动画。'
export const SITE_SLOGAN = '像素对齐，是默认标准。'
export const SITE_URL = 'https://yanghuanrong.github.io'
export const AUTHOR_NAME = '杨焕荣'
export const AUTHOR_ALIAS = '南北'
export const AUTHOR_JOB = '设计工程师'
export const GITHUB_URL = 'https://github.com/yanghuanrong'
export const EMAIL = 'bsie@qq.com'

export const socials = [
  { name: 'GitHub', href: GITHUB_URL },
  { name: 'Email', href: `mailto:${EMAIL}` },
  { name: 'RSS', href: '/rss.xml' },
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
    desc: '电涌保护品牌官网。产品、方案与认证内容结构化呈现，英文站面向全球客户。',
    initial: 'E',
    cover: '#e8e8e6',
    coverImage: 'eprotek',
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
  { name: 'Electron', src: '/icons/tech/electron.svg' },
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
  { name: 'Cursor', src: '/icons/tech/cursor.svg' },
] as const

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
