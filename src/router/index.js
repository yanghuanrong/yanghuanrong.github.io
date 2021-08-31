import '@/style/highlight.css';
import Blog from '@blog/data';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/Index.vue';

Vue.use(VueRouter);

const BlogRoute = Blog.data.map((item) => ({
  path: `/blog/${item.id}`,
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
    path: '/github',
    name: 'github',
    component: () => import('../views/Github.vue'),
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
  next();
  const el = document.querySelector('#maskMove');
  el && (el.className = '');
  setTimeout(() => {
    const cursor = document.querySelector('.cursor.click');
    cursor && cursor.classList.remove('click');
  }, 600);
});

export default router;
