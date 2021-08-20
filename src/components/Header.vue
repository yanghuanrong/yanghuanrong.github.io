<template>
  <div class="header" :class="{ fixed: fixed }">
    <header class="topbar">
      <div class="logo" @click="logoTap">
        <transition name="logo" mode="out-in">
          <a v-if="isDetial" key="logo">返回Blog</a>
          <a v-else key="back">贝贝的HTML</a>
        </transition>
      </div>
      <div
        class="menutoggle"
        @click="menuTap"
        ref="close"
        id="menus1"
        :class="{ open: menu }"
      >
        <span>
          <i></i>
        </span>
        <span>
          <i></i>
        </span>
      </div>
    </header>

    <div class="nav-wrap" v-if="isMenu">
      <div class="container flex flex-column menu " :class="{ open: menu }">
        <div class="splitter">
          <span>Contents</span>
        </div>
        <a
          v-for="(item, i) in nav"
          @click="router(item, i)"
          :class="{ active: active === i }"
          :key="item.name"
        >
          <span>{{ item.name }}</span>
          <div class="arrow">
            <svg
              class="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              height="48"
              width="48"
              stroke="currentColor"
              stroke-width="2"
              stroke-linejoin="round"
              stroke-linecap="round"
            >
              <path stroke="currentColor" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
            </svg>
          </div>
        </a>
      </div>
    </div>
    <ShapeOverlays v-model="menu" @move="isMenu = menu" />
    <!-- <div id="maskMove"></div> -->
  </div>
</template>

<script>
import ShapeOverlays from './ShapeOverlays';
export default {
  components: {
    ShapeOverlays,
  },
  data() {
    return {
      fixed: false,
      menu: false,
      isMenu: false,
      active: null,
      isDetial: false,
      nav: [
        {
          path: '/blog',
          name: '博客文章',
        },
        {
          path: '/about',
          name: '关于',
        },
      ],
    };
  },
  watch: {
    $route(to, from) {
      setTimeout(() => {
        this.isDetial = to.name === 'detail';
      }, 1000);
    },
  },
  methods: {
    logoTap() {
      if (this.$route.path === '/') return;

      if (this.isDetial) {
        this.$router.back(-1);
      } else {
        this.$router.push('/');
      }
    },
    router(item, i) {
      if (this.$route.path === item.path) return;

      this.active = i;
      setTimeout(() => {
        this.menuTap();
        this.$router.push(item.path);
      }, 800);
    },
    menuTap() {
      this.menu = !this.menu;

      if (this.menu) {
        document.querySelector('#maskMove').className = 'menus';
        this.active = null;
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    },
  },
};
</script>
