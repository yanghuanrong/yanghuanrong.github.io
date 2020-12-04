<template>
  <div class="header" :class="{ fixed: fixed}" >
    <header class="topbar">
      <div class="container flex items-center justify-between relative">
        <div class="logo" @click="logoTap">
          <transition name="logo" mode="out-in">
            <a @click="$router.back(-1)" v-if="isDetial" key="logo">返回Blog</a>
            <router-link  to="/"  v-else key="back">贝贝的HTML</router-link>
          </transition>
        </div>
        <div class="menutoggle" @click="menuTap" ref="close" :class="{ open: menu }">
          <span>
            <i></i>
          </span>
          <span>
            <i></i>
          </span>
        </div>
      </div>
    </header>
    <div class="menu" :class="{open: menu}">
      <div class="container flex flex-column">
        <div class="splitter">
          <span>Contents</span>
        </div>
        <a
          v-for="(item, i) in nav"
          @click="router(item, i)"
          :class="{active: active === i}"
          :key="item.name"
        >
          <span>{{item.name}}</span>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      fixed: false,
      menu: false,
      active: null,
      isDetial: false,
      nav: [
        {
          path: "/blog",
          name: "博客文章",
        },
        {
          path: "/about",
          name: "关于",
        },
      ],
    };
  },
  watch:{
    $route(to,from){
      setTimeout(() => {
        this.isDetial = to.name === 'detail'
      }, 1000)
    }
  },
  mounted() {
    window.addEventListener("scroll", this.isFixed, false);
  },
  methods: {
    logoTap(){
      if (this.$route.path === '/') return;
      this.$router.push('/');
    },
    router(item, i) {
      if (this.$route.path === item.path) return;

      this.active = i;
      setTimeout(() => {
        this.menuTap();
        this.$router.push(item.path);
      }, 800);
    },
    isFixed() {
      this.fixed = window.pageYOffset >= 80 ? true : false;
    },
    menuTap() {
      this.menu = !this.menu;

      if (this.menu) {
        this.active = null;
        this.$refs.close.style.top = this.fixed ? "80px" : "0";
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
        this.$refs.close.style.top = 0;
      }
    },
  },
};
</script>