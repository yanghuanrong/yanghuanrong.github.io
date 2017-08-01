<template>
  <div class="index-body">
  	<div class="index-wrap"></div>
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
