import '@/style/highlight.css';
import Blog from '@blog/data';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/Index.vue';

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
    name: 'index',
    component: Index,
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
  const el = document.querySelector('#maskMove:not(.menus)');

  if (el) {
    el.className = 'show';
    el.addEventListener('transitionend', fn1);
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '10px';
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
      document.body.style.overflow = '';
      document.body.style.paddingRight = '0';
      document.querySelector('.cursor').classList.remove('hover');
      document.querySelector('.cursor').classList.remove('click');
    }
  } else {
    next();
    const el = document.querySelector('#maskMove');
    el && (el.className = '');
    setTimeout(() => {
      const cursor = document.querySelector('.cursor.click');
      cursor && cursor.classList.remove('click');
    }, 600);
  }
});

export default router;
