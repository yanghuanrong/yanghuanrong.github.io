<template>
  <div id="app">
   <transition name="fade">
    <router-view></router-view>
   </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
	@import url("./assets/style/custom.less");
</style>