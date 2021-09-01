<template>
  <div class="project-view">
    <div class="page-title">
      <h3>
        开源项目
      </h3>
      <p>构建了几个不成器的开源项目，总是因为精力不够而疏忽维护。</p>
    </div>
    <div class="project">
      <ul>
        <li v-for="item in list" :key="item.id">
          <div class="item">
            <div class="content">
              <div class="title">
                {{ item.title }}
              </div>
              <div class="desc">
                {{ item.desc }}
              </div>
            </div>
          </div>
          <a target="_blank" class="btn" :href="item.link" v-hover></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
function query(selector) {
  return Array.from(document.querySelectorAll(selector));
}
export default {
  name: 'blog',
  data() {
    return {
      open: true,
      router: true,
      list: [
        {
          tag: 'Vue3',
          desc: '使用VUE3编写的UI组件库，轻量、精美，融入更多思考',
          title: 'RelaxPlus',
          link: 'https://github.com/yanghuanrong/RelaxPlus',
        },
        {
          tag: 'Vue3',
          desc: '使用VUE2编写的UI组件库，奠定了VUE组件开发基础',
          title: 'RelaxUI',
          link: 'https://github.com/yanghuanrong/RelaxUI',
        },
        {
          tag: 'Vue3',
          desc:
            '使用ES6开发的SDK，致力打造基于前端混合开发需求，支持微信小程序、H5、快应用、游戏Cocos、混合App等平台。',
          title: 'hydrogen-js-sdk',
          link: 'https://github.com/bmob/hydrogen-js-sdk',
        },
      ],
    };
  },
  mounted() {
    const observer = new IntersectionObserver(
      (changes) => {
        changes.forEach(function(change) {
          if (change.intersectionRatio === 1) {
            change.target.className = 'show';
          }
        });
      },
      {
        threshold: [0, 1],
      }
    );
    query('.blog-list li').forEach(function(item) {
      observer.observe(item);
    });
  },
};
</script>
