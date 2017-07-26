import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/home/index'
import admin from '@/components/admin/index'
import login from '@/components/login/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '*',
			redirect: '/'
    }
  ]
})
