<template>
  <div class="header">
    <div class="logo" @click="logoTap($event)" v-hover>
      <transition name="logo" mode="out-in">
        <a v-if="isDetial" key="logo">返回Blog</a>
        <a v-else key="back">Best</a>
      </transition>
    </div>

    <div
      class="menutoggle"
      @click="menuTap"
      v-hover="true"
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

    <div class="nav-wrap" v-if="isMenu">
      <div class="menu" :class="{ open: menu }">
        <div class="splitter"><span>Contents</span></div>
        <a
          v-for="(item, i) in nav"
          @click="router($event, item, i)"
          :class="{ active: active === i }"
          :key="item.name"
          v-html="item.name"
          v-hover
        >
        </a>
      </div>
    </div>
    <ShapeOverlays v-model="menu" @move="isMenu = menu" />
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
          path: '/project',
          name: '<span>🥉</span> 开源项目',
        },
        {
          path: '/blog',
          name: '<span>✨</span> 奇思妙想',
        },
        {
          path: '/about',
          name: '<span>🐱‍👤</span> 关于',
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
    menu(value) {
      if (!value) {
        setTimeout(() => {
          document.querySelector('#maskMove').className = '';
        }, 300);
      }
    },
  },
  methods: {
    logoTap(e) {
      if (this.$route.path === '/') {
        e && e.stopPropagation();
        return;
      }

      if (this.isDetial) {
        this.$router.back(-1);
      } else {
        this.$router.push('/');
      }
    },
    router(e, item, i) {
      if (this.$route.path === item.path) {
        e && e.stopPropagation();
        return;
      }

      this.active = i;
      this.menuTap();
      this.$router.push(item.path);
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
