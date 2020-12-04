import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
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



export default router
