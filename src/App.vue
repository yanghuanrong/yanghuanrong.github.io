<template>
  <div id="app">
    <div id="maskMove">
      <Loading />
      <div class="text">Best</div>
    </div>
    <Header />
    <!-- <div v-if="$route.name === 'blog'">
        <transition name="fade">
          <div class="scroll-view" v-if="scrollView">
            <i></i>
          </div>
        </transition>
      </div> -->
    <transition name="fade" mode="out-in">
      <router-view v-if="isRouterAlive"></router-view>
    </transition>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Loading from '@/components/Loading.vue';
import Mao from '@/components/Mao.vue';
export default {
  components: {
    Header,
    Footer,
    Loading,
    Mao,
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
      scrollView: false,
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        this.$nextTick(() => {
          if (this.hasScrollbar()) {
            this.scrollView = true;
          }
        });
      },
      immediate: true,
    },
  },
  mounted() {
    window.addEventListener('scroll', this.isScrollShow, false);
  },
  methods: {
    hasScrollbar() {
      return (
        document.body.scrollHeight >
        (window.innerHeight || document.documentElement.clientHeight)
      );
    },
    isScrollShow() {
      this.scrollView = window.pageYOffset >= 80 ? false : true;
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>
