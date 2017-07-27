// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
Bmob.initialize("466309c8abe3eb70d61bdfbe6ea32cab", "65a9ad08827983d55662444f9cd3019a");
import Vue from 'vue'
import App from './App'
import router from './router'
import local from '@/assets/js/local'
import anime from 'animejs'

Vue.config.productionTip = false
Vue.use(local)
Vue.prototype.$anime = anime
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
