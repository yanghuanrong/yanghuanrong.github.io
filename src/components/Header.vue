<template>
  <header class="header" :class="{ fixed: fixed }">
    <div class="container flex items-center justify-between relative">
      <div class="logo"><a href="/">贝贝的HTML</a></div>
      <div class="menutoggle" @click="menuTap" ref="close" :class="{ open: menu }">
        <span>
          <i></i>
        </span>
        <span>
          <i></i>
        </span>
      </div>
    </div>
    <div class="menu" :class="{open: menu}"></div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      fixed: false,
      menu: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.isFixed, false);
  },
  methods: {
    isFixed() {
      this.fixed = window.pageYOffset >= 80 ? true : false;
    },
    menuTap() {
      this.menu = !this.menu

      if(this.menu){
        this.$refs.close.style.top = this.fixed ? '112px' : '32px'
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
        this.$refs.close.style.top = 0
      }

    }
  },
};
</script>