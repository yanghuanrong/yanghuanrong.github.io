import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/Blog.vue')
  },
  {
    path: '/blog/:id',
    name: 'detail',
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes
})

router.beforeEach((to,from,next) => {
  const el = document.getElementById('maskMove')
  if(el) {
    document.body.style = "overflow: hidden"
    el.style.width = '100%'

    el.addEventListener('transitionend', () => {
      el.style.left = 'inherit'
      el.style.right = '0'
      el.style.width = '0'
      document.body.style = ""

      next()
      el.addEventListener('transitionend', () => {
        el.style.left = '0'
        el.style.right = 'inherit'
      })
    })
  } else {
	  next()
  }
})

export default router
