<template>
  <div id="app">
    <div style="position: relative; z-index: 2">
      <Header />
      <div id="maskMove"></div>
       <transition name="fade">
        <div class="scroll-view" v-if="scrollView">
          <i></i>
        </div>
      </transition>
      <keep-alive include="blog">
        <router-view class="body"></router-view>
      </keep-alive>
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
  data(){
    return {
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
    }
  }
}
</script>
