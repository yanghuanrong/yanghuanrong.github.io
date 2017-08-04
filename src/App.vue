<template>
  <div id="app">
   <transition name="fade">
    <router-view></router-view>
   </transition>
  </div>
</template>

<style lang="less">
	@import url("./assets/style/custom.less");
</style>