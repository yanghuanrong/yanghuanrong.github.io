<template>
  <div id="app">
    <div style="position: relative; z-index: 2">
      <Header />
      <div id="maskMove"></div>
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
}
</script>
