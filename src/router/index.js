import Vue from 'vue'
import Router from 'vue-router'

//前端页面
import index from '@/components/home/index'
import home from '@/components/home/home'
import photo from '@/components/home/photo'
import about from '@/components/home/about'
import msg from '@/components/home/msg'
import detail from '@/components/home/detail'

//后端管理
import admin from '@/components/admin/index'
import detailPush from '@/components/admin/detailPush'
import photoPush from '@/components/admin/photoPush'

//登录界面
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
    redirect: '/home',
    children: [{
      path: '/home',
      name:'home',
      component: home,
    }, {
      path: '/detail/:id?',
      name: 'detail',
      component: detail,
    }, {
      path: '/photo',
      name: 'photo',
      component: photo
    }, {
      path: '/about',
      name: 'about',
      component: about
    }, {
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
      },
      redirect: '/detailPush',
      children: [{
        path: '/detailPush',
        component: detailPush,
      }, {
        path: '/photoPush',
        component: photoPush,
      }
      ]
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
