import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './style/main.less';

import Blog from '@blog/data';
Vue.config.productionTip = false;

Vue.use(Blog);

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
