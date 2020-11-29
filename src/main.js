import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "highlight.js/styles/github.css"
import './style/main.less'

import {registered} from './utils/registered'
Vue.config.productionTip = false


import Button from './components/Button'
import demoBlock from './components/demoBlock'

registered(Vue)

Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` 是组件的继承关系追踪
  console.log(msg)
}

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

