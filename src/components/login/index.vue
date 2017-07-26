<template>
	<div class="login-body">
		<div class="login-wrap">
			<div class="login-row">
				<label for="username">Username</label>
				<input type="text" ref="username" id="username"/>
			</div>
			<div class="login-row">
				<label for="password">Password</label>
				<input type="password" ref="password" id="password"/>
			</div>
			<button type="button" @click="login" class="login-btn">Sign In</button>
		</div>
	</div>
</template>

<script>
	import anime from 'animejs';
	export default {
		methods:{
			login(){
				let username= this.$refs.username.value;
				let password = this.$refs.password.value;
				
				Bmob.User.logIn(username, password, {
				  success: (user)=>{
				  	if(username){
				  		anime({
						  targets: '.login-btn',
						  width: {
						  	value:44,
						  	duration: 800,
						    easing: 'easeInOutQuart'
						  },
						  scale: {
						    value: 100,
						    duration: 1600,
						    delay: 800,
						    easing: 'easeInOutQuart'
						  },
						  background:{
						  	value:"#FFF",
						  	duration: 300,
						    delay: 1600,
						  },
						  complete: (anim)=>{
							this.$router.push('/admin');
						  }
						});
				  	}else{
						alert("用户名密码错误");
				  	}
				  },
				  error: (user, error)=>{
				  	console.log("error")
				  }
				});
			}
		}
	}
</script>

<style>
</style>