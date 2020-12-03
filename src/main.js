import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './style/main.less'

import { registered } from './utils/registered'
Vue.config.productionTip = false


import Button from './components/Button'
import demoBlock from './components/demoBlock'

registered(Vue)

Vue.component('Button', Button)
Vue.component('demoBlock', demoBlock)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

if (document.addEventListener) {
  const _titleChange = document.title;
  document.addEventListener('visibilitychange', function () {
    document.title = document.hidden ? '网页奔溃了...呜呜呜o(╯□╰)o...' : _titleChange
  });
};

