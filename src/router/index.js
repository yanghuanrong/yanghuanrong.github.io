import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/home/index'
import home from '@/components/home/home'
import photo from '@/components/home/photo'
import draw from '@/components/home/draw'
import about from '@/components/home/about'
import msg from '@/components/home/msg'

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
			redirect:'/home',
			children: [{
				path: '/home',
				component: home
			},{
				path: '/photo',
				component: photo
			},{
				path: '/draw',
				component: draw
			},{
				path: '/about',
				name: 'about',
				component: about
			},{
				path: '/msg',
				name: 'msg',
				component: msg
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