<template>
	<div class="index">
		<header class="header" :class="{mini:scroll}" ref="header">
			<div class="flex">
				<h1 class="logo">
					<router-link to="/home" tag="a" class="icon-blog"></router-link>
				</h1>
				<nav>
					<ul class="nav flex">
						<li>
							<router-link to="/home" tag="a">首页</router-link>
						</li>
						<li>
							<router-link to="/photo" tag="a">摄影</router-link>
						</li>
						<li>
							<router-link to="/about" tag="a">关于</router-link>
						</li>
						<li>
							<router-link to="/msg" tag="a">留言</router-link>
						</li>
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
    <div class="page-body">
      <transition name="fade" mode="out-in">
        <keep-alive exclude="detail">
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>

    <div class="page-footer">
      <p>COPYRIGHT (©) 2017 杨焕荣 | 中国高端 js 玩家</p>
    </div>
	</div>
</template>


<script type="text/javascript">
  export default {
    data() {
      return {
        scroll:false,
      }
    },
    mounted() {
      window.addEventListener('scroll', () => {
        this.scroll = document.body.scrollTop >= 200 ? true : false;
      });
      this.fetchDate();
    },
    methods:{
      fetchDate() {
        if(this.$route.name === "home"){
          this.$refs.header.style="background:transparent;"
        }else{
          this.$refs.header.style=""
        }
      },
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      "$route": "fetchDate"
    }
  }
</script>
