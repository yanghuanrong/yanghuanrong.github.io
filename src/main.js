import Blog from '@blog/data';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './style/main.less';
import loading from './utils/loading';
Vue.config.productionTip = false;

Vue.use(Blog);

Vue.directive('hover', {
  inserted: function(el, binding) {
    document.addEventListener('mousemove', function(e) {
      var event = e || window.event;
      var target = event.target || event.srcElement;
      if (el.contains(target)) {
        document.querySelector('.cursor').classList.add('hover');
      }
    });
    document.addEventListener('click', function(e) {
      var event = e || window.event;
      var target = event.target || event.srcElement;
      if (el.contains(target)) {
        document.querySelector('.cursor').classList.remove('hover');
        document.querySelector('.cursor').classList.add('click');
        if (binding.value) {
          setTimeout(() => {
            document.querySelector('.cursor').classList.remove('click');
          }, 600);
        }
      }
    });
    el.addEventListener('mouseleave', () => {
      document.querySelector('.cursor').classList.remove('hover');
    });
  },
});

// let load = true;
// loading({
//   onloading(i) {
//     document.getElementById('loading').innerHTML = i;
//   },
//   done() {
//     load = false;
document.body.removeChild(document.getElementById('loading'));
document.querySelector('.cursor').className = 'cursor';
new Vue({
  router,
  render: (h) => h(App),
  mounted() {
    this.$nextTick(() => {
      document.getElementById('app').style.opacity = '1';
    });
  },
}).$mount('#app');
//   },
// });

if (document.addEventListener) {
  const _titleChange = document.title;
  document.addEventListener('visibilitychange', function() {
    document.title = document.hidden
      ? '网页奔溃了...呜呜呜o(╯□╰)o...'
      : _titleChange;
  });
}

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
  // if (load) return;
  cursor.style.left = e.pageX - size + 'px';
  cursor.style.top = e.pageY - top - size + 'px';
});
