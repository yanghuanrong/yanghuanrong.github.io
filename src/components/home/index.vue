<template>
	<div class="index" :class="{about:isAbout}">
		<header class="header">
			<div class="wrap flex">
				<h1 class="logo">
					<router-link to="/home" tag="a" class="icon-blog"></router-link>
				</h1>
				<nav>
					<ul class="nav flex">
						<li><router-link to="/home" tag="a">首页</router-link></li>
						<li><router-link to="/photo" tag="a">摄影</router-link></li>
						<li><router-link to="/draw" tag="a">绘画</router-link></li>
						<li><router-link to="/about" tag="a">关于</router-link></li>
						<li><router-link to="/msg" tag="a">留言</router-link></li>
					</ul>
				</nav>
				<div class="app">
					<a href="http://github.com/yanghuanrong" target="_blank">
						<i class="icon-github"></i>
					</a>
					<a href="http://weibo.com/yanghuanrong" target="_blank">
						<i class="icon-weibo"></i>
					</a>
				</div>
			</div>
		</header>
		<div class="wrap">
			<div class="page-body">
   				<transition name="fade" mode="out-in">
    				<router-view></router-view>
    			</transition>
    		</div>
    		<div class="music"></div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {
				isAbout:false
			}
		},
		mounted(){
			this.isAboutPage(this.$route.name)
		},
		methods:{
			isAboutPage(page){
				if(page == "about"){
					this.isAbout = true;
				}else{
					this.isAbout = false;
				}
			}
		},
		watch: {
		    $route(to,from){
			this.isAboutPage(to.name)
			}
		},
	}
</script>
