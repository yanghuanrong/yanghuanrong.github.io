<template>
  <div class="home">
    <div class="container intro">
      <div class="sectionheader flex flex-column">
        <h3>我是一名WEB前端工作者，住在广东的佛山地区——用耳熟能详的前端技术快乐的构建应用程序。</h3>
        <p>现在每天早上起床，在Wechat, QQ上和朋友们一起探讨和研究技术。总是致力于建造和学习新东西。</p>
      </div>
    </div>

    <section class="container flex flex-column">
      <div class="splitter">
        <span>Professional work</span>
        <hr />
      </div>

      <div class="project black">
        <div class="info">
          <h4>重要的基础</h4>
          <p>
            具备设计和编写网站的重要技能
            <br />HTML CSS JavaScript
          </p>
        </div>
      </div>

      <div class="project blue">
        <div class="info">
          <h4>提升</h4>
          <p>
            使用VUE编写功能齐全的WEB应用程序
            <br />供内部使用。
          </p>
        </div>
      </div>
    </section>

    <section class="container flex flex-column">
      <div class="opensource">
        <div class="sectionheader">
          <h3 class="flex items-center">
            <div>开源</div>
            <div class="pulse flex">
              <svg
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="red"
                height="60"
                width="60"
                stroke="currentColor"
                stroke-width="0"
                stroke-linejoin="round"
                stroke-linecap="round"
              >
                <path
                  stroke="currentColor"
                  d="M5.095 4.9c2.076-2.026 4.415-.199 5.743 1.244.52.565 1.546.51 2.029-.087 1.155-1.427 3.27-3.143 5.862-1.156C23.834 8.814 11.912 20 11.912 20S.486 9.401 5.095 4.9z"
                />
              </svg>
            </div>
          </h3>

          <p>我们都热爱开源，它可以让我们更好的工作。下面是我构建与参与的几个项目。</p>
        </div>
        <div class="splitter">
          <span>OPEN SOURCE PROJECTS</span>
          <hr />
        </div>

        <div class="osproject grid">
          <div class="col-xs-12 col-sm-5">
            <h5>RelaxUI</h5>
          </div>
          <div class="col-xs-12 col-sm-7">
            <p class="mb6">基于VUE编写的UI组件库</p>
            <a href="https://github.com/yanghuanrong/RelaxUI" class="button link" target="_blank">
              <span>GitHub</span>
              <svg
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                height="24"
                width="24"
                stroke="currentColor"
                stroke-width="3"
                stroke-linejoin="round"
                stroke-linecap="round"
              >
                <path stroke="currentColor" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
              </svg>
            </a>
          </div>
        </div>

        <div class="osproject grid">
          <div class="col-xs-12 col-sm-5">
            <h5>hydrogen-js-sdk</h5>
          </div>
          <div class="col-xs-12 col-sm-7">
            <p class="mb6">本SDK基于ES6开发，致力打造基于前端混合开发需求，支持微信小程序、H5、快应用、游戏Cocos、混合App等平台。</p>
            <a href="https://github.com/bmob/hydrogen-js-sdk" class="button link" target="_blank">
              <span>GitHub</span>
              <svg
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                height="24"
                width="24"
                stroke="currentColor"
                stroke-width="3"
                stroke-linejoin="round"
                stroke-linecap="round"
              >
                <path stroke="currentColor" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="container flex flex-column talk">
      <div class="project black">
        <div class="info">
          <h4>有项目吗？聊聊</h4>
          <p>
            即使是一个重构切图的项目或者是想法？
            <br />也可以告诉我
          </p>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
