<template>
  <div class="index-body">
  	<div class="index-wrap" :class="{active:isRouter}">
  		<div class="index-menu">
  			<a href="https://github.com/yanghuanrong" target="_blank">
  				<i class="icon-github"></i>
  				<i class="icon-github"></i>
  			</a>
  			<a href="http://weibo.com/yanghuanrong" target="_blank">
  				<i class="icon-weibo"></i>
  				<i class="icon-weibo"></i>
  			</a>
  			<a href="#">
  				<i class="icon-weix"></i>
  				<i class="icon-weix"></i>
  			</a>
  			<a href="#">
  				<i class="icon-email"></i>
  				<i class="icon-email"></i>
  			</a>
  		</div>
  		<div class="index-content">
				<banner></banner>
  			<div class="Photo"></div>
				<div class="blog" @click="blog">
					<i class="icon-blog"></i>
				</div>
				<music></music>
  			<div class="msg"></div>
  		</div>
  		<div class="shadow"></div>
  	</div>
  	
  	<div class="page" :class="{active:isRouter}">
    	<router-view></router-view>
    </div>
  </div>
</template>

<script type="text/javascript">
	import music from './music'
	import banner from './banner'
	export default {
		data(){
			return {
				isRouter:false
			}
		},
		methods:{
			blog(){
				this.isRouter=true
				this.$router.push('/blog');
			}
		},
		components:{
			music,
			banner
		}
	}
</script>
