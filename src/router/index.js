import '@/style/highlight.css';
import Blog from '@blog/data';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const BlogRoute = Blog.data.map((item) => ({
  path: `/blog/${item.id}`,
  name: 'detail',
  meta: {
    title: item.title,
  },
  component: () => import('@blog/md/' + item.fileName),
}));

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
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
});

router.beforeEach((to, from, next) => {
  const el = document.getElementById('maskMove');
  if (el) {
    el.className = 'show';
    el.addEventListener('transitionend', fn1);
    function fn1() {
      next();
      el.className = 'hide';
      el.removeEventListener('transitionend', fn1);
      el.addEventListener('transitionend', fn2);
    }
    function fn2() {
      el.className = '';
      el.style = '';
      el.removeEventListener('transitionend', fn2);
    }
  } else {
    next();
  }
});

export default router;
