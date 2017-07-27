<template>
  <div class="index-body" :class="{ active:isNav }">
  	<div class="left-bar">
  		<div class="meun-button" @click="NavEvent">
  			<i></i>
  			<i></i>
  			<i></i>
  		</div>
  	</div>
  	<div class="right-bar">
  		<router-link to="/admin">登录</router-link>
  	</div>
  </div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {
				isNav:false
			}
		},
		methods:{
			NavEvent(){
				this.isNav = !this.isNav;
			}
		}
	}
</script>
