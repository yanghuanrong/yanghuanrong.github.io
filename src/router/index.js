import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/home/index'
import blog from '@/components/home/blog'

import admin from '@/components/admin/index'
import login from '@/components/login/index'


Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'index',
			component: index,
			meta: {
				index: 0,
			},
			children: [{
				path: 'blog',
				component: blog
			}]
		},
		{
			path: '/admin',
			name: 'admin',
			component: admin,
			meta: {
				index: 1,
			}
		},
		{
			path: '/login',
			name: 'login',
			component: login,
			meta: {
				index: 2,
			}
		},
		{
			path: '*',
			redirect: '/'
		}
	]
})