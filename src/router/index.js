import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Blog from '@blog/data'
import hljs from 'highlight.js'
import '@/style/highlight.css'

Vue.use(VueRouter)

const BlogRoute = Blog.data.map((item) => ({
  path: `/blog/${item.id}`,
  name: 'detail',
  meta: {
    title: item.title,
  },
  component: () => import('@blog/md/' + item.fileName),
}))

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/Blog.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
  },
  ...BlogRoute,
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes,
})

router.beforeEach((to, from, next) => {
  const el = document.getElementById('maskMove')
  if (el) {
    document.body.style = 'overflow: hidden'
    el.style.width = '100%'

    el.addEventListener('transitionend', () => {
      next()
      el.style.left = 'inherit'
      el.style.right = '0'
      el.style.width = '0'
      document.body.style = ''

      // el.addEventListener('transitionend', () => {
      //   el.style.left = '0'
      //   el.style.right = 'inherit'
      // })
    })
  } else {
    next()
  }
})

router.afterEach(() => {
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)

    const elements = document.querySelectorAll('pre code.hljs')
    for (let i = 0; i < elements.length; i++) {
      let html = elements[i].innerHTML
      let num = 1
      html = '<span class="ln-num" data-num="' + num + '"></span>' + html
      html = html.trim().replace(/\r\n|\r|\n/g, function(a) {
        num++
        return a + '<span class="ln-num" data-num="' + num + '"></span>'
      })
      html = '<span class="ln-bg"></span>' + html
      elements[i].innerHTML = html
    }
  })
})

export default router
