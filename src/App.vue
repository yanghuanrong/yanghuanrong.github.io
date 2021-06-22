<template>
  <div id="app">
    <div style="position: relative; z-index: 2">
      <Header />
      <div id="maskMove"></div>
      <div v-if="$route.name === 'blog'">
       <transition name="fade">
        <div class="scroll-view" v-if="scrollView">
          <i></i>
        </div>
      </transition>
      </div>
      <router-view class="body" v-if="isRouterAlive"></router-view>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Header,
    Footer,
  },
  provide(){
    return {
      reload: this.reload
    }
  },
  data(){
    return {
      isRouterAlive: true,
      scrollView: false
    }
  },
  watch: {
    '$route': {
      handler(to, from) {
        this.$nextTick(() => {
          if(this.hasScrollbar()) {
            this.scrollView = true
          }
        })
      },
      immediate: true
    }
  },
  mounted(){
     window.addEventListener("scroll", this.isScrollShow, false);
  },
  methods: {
    hasScrollbar() {
      return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
    },
    isScrollShow(){
       this.scrollView = window.pageYOffset >= 80 ? false : true;
    },
    reload(){
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
