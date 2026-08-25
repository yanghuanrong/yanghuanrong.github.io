export const SITE_TITLE = '南北'
export const SITE_DESCRIPTION =
  '南北（杨焕荣）。广州，九年前端。做零代码引擎、跨端 SDK 和开源组件库。像素级还原是默认标准。'
export const SITE_URL = 'https://yanghuanrong.github.io'
export const AUTHOR_NAME = '杨焕荣'
export const AUTHOR_ALIAS = '南北'
export const AUTHOR_JOB = '前端'
export const GITHUB_URL = 'https://github.com/yanghuanrong'
export const AVATAR_URL = 'https://github.com/yanghuanrong.png'
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
    href: 'https://github.com/yanghuanrong/RelaxPlus',
    desc: 'Vue 3 组件库。setup 语法还没发布就开始做，按钮到日历二十多个组件，文档和 CI 自己搭。过了百星。',
    initial: 'P',
    cover: '#141c18',
  },
  {
    name: 'Relax UI',
    href: 'https://github.com/yanghuanrong/RelaxUI',
    desc: '更早那套 Vue 2 组件库。同一套审美，先在业务里打过一遍。',
    initial: 'R',
    cover: '#17181c',
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
  { src: '/photos/road.jpg', caption: '路上' },
  { src: '/photos/water.jpg', caption: '水里' },
  { src: '/photos/city.jpg', caption: '城里' },
]

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
