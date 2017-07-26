<template>
	<div class="login-body">
		<div class="login-wrap">
			<div class="login-anime">
				<div class="login-row">
					<i class="icon-user"></i>
					<input type="text" ref="username" v-model="username" placeholder="Username"/>
				</div>
				<div class="login-row">
					<i class="icon-password"></i>
					<input type="password" ref="password" v-model="password" placeholder="Password" />
				</div>
				<button type="button" @click="login" class="login-btn">
					<span v-if="!islogin">Sign In</span>
					<loading v-if="islogin"></loading>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import anime from 'animejs';
	import loading from '@/components/login/loading'
	export default {
		data(){
			return {
				islogin:false,
				username:"",
				password:""
			}
		},
		methods:{
			error(){
				this.islogin = false;
				anime({
				  targets: '.login-anime',
				  translateX: [
				    { value: 20, duration: 100 , easing: 'easeInOutSine'},
				    { value: 0, duration: 100 , easing: 'easeInOutSine'},
				    { value: 20, duration: 100 , easing: 'easeInOutSine'},
				    { value: 0, duration: 100 , easing: 'easeInOutSine'},
				    { value: 20, duration: 100 , easing: 'easeInOutSine'},
				    { value: 0, duration: 100 , easing: 'easeInOutSine'}
				  ]
				});
			},
			login(){
				this.islogin = true;
				let username= this.$refs.username.value;
				let password = this.$refs.password.value;
				
				if(username == ""){
					this.error()
					return false;
				}
				if(password == ""){
					this.error()
					return false;
				}
				
				Bmob.User.logIn(username, password, {
				  success: (user)=>{
				  	if(user.attributes.code == undefined){
				  		anime({
						  targets: '.login-btn',
						  width: {
						  	value:44,
						  	duration: 300,
						    easing: 'easeInOutQuart'
						  },
						  scale: {
						    value: 120,
						    duration: 400,
						    delay: 300,
						    easing: 'easeInOutQuart'
						  },
						  complete: (anim)=>{
							this.$router.push('/admin');
						  }
						});
				  	}else{
						this.error()
				  	}
				  },
				  error: (user, error)=>{
					this.error()
				  	console.log("error")
				  }
				});
			}
		},
		components:{
			loading
		}
	}
</script>

<style>
</style>