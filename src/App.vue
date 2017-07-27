<template>
  <div id="app">
   <transition :name="animenames">
    <router-view></router-view>
   </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
  	return {
  		animenames:'left'
  	}
  },
  watch:{
			$route(to,from){
				//监听路由的变化；如果值为1；说明是去到admin
				if(to.meta.index == 1){
					this.animenames = "fade"
				}else	if(to.meta.index < from.meta.index){
					this.animenames = "right"
				}else{
					this.animenames = "left"
				}
			}
		}
}
</script>

<style lang="less">
	@import url("./assets/style/custom.less");
</style>