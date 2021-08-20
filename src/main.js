import Blog from '@blog/data';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './style/main.less';
Vue.config.productionTip = false;

Vue.use(Blog);

Vue.directive('hover', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el) {
    document.addEventListener('mousemove', function(e) {
      // 兼容性处理
      var event = e || window.event;
      var target = event.target || event.srcElement;
      // 判断是否匹配目标元素
      if (el.contains(target)) {
        document.querySelector('.cursor').classList.add('hover');
      }
    });
    el.addEventListener('mouseleave', () => {
      document.querySelector('.cursor').classList.remove('hover');
    });
    el.addEventListener('click', () => {
      document.querySelector('.cursor').classList.remove('hover');
      document.querySelector('.cursor').classList.add('click');
    });
  },
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

if (document.addEventListener) {
  const _titleChange = document.title;
  document.addEventListener('visibilitychange', function() {
    document.title = document.hidden
      ? '网页奔溃了...呜呜呜o(╯□╰)o...'
      : _titleChange;
  });
}

// --- CURSOR
const size = 20;
const cursor = document.querySelector('.cursor');
let top = 0;
window.addEventListener('scroll', (event) => {
  top =
    (event.srcElement ? event.srcElement.documentElement.scrollTop : false) ||
    window.pageYOffset ||
    (event.srcElement ? event.srcElement.body.scrollTop : 0);
});
document.addEventListener('mousemove', function(e) {
  cursor.style.left = e.pageX - size + 'px';
  cursor.style.top = e.pageY - top - size + 'px';
});
