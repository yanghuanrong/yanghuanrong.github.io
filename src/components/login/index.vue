<template>
	<div class="login-body">
		<div class="back" @click="back">
			<i class="icon-back"></i>
		</div>
		<div class="login-wrap">
			<div class="login-anime">
				<div class="login-row">
					<i class="icon-user"></i>
					<input type="text" ref="username" v-model="username" placeholder="Username" />
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
	import loading from '@/components/login/loading'
	export default {
		data() {
			return {
				islogin: false,
				username: "",
				password: ""
			}
		},
		mounted() {
			//back箭头动画
			this.$anime({
				targets: '.back',
				opacity: 1,
				translateX: -50,
				duration: 800,
				easing: 'easeInOutSine'
			});
			
			this.$anime({
				targets:'.login-anime',
				opacity: 1,
				duration: 800,
				easing: 'easeInOutSine'
			})
			
		},
		methods: {
			error() {
				this.islogin = false;
				this.$anime({
					targets: '.login-anime',
					translateX: [{
							value: 10,
							duration: 100,
							easing: 'easeInOutSine'
						},
						{
							value: -10,
							duration: 100,
							easing: 'easeInOutSine'
						},
						
					],
					loop:3
				});
			},
			back(){
				this.$anime({
					targets: '.back',
					opacity: 1,
					translateX: -200,
					duration: 200,
					easing: 'easeInOutSine',
					complete: (anim) => {
						this.$router.push('/');
					}
				});
			},
			login() {
				this.islogin = true;
				let username = this.$refs.username.value;
				let password = this.$refs.password.value;

				if(username == "") {
					this.error()
					return false;
				}
				if(password == "") {
					this.error()
					return false;
				}

				Bmob.User.logIn(username, password, {
					success: (user) => {
						if(user.attributes.code == undefined) {
							this.$anime({
								targets: '.login-btn',
								width: {
									value: 44,
									duration: 400,
									easing: 'easeInOutQuart'
								},
								scale: {
									value: 120,
									duration: 400,
									delay: 800,
									easing: 'easeInOutQuart'
								},
								complete: (anim) => {
									this.$router.push('/admin');
								}
							});
						} else {
							this.error()
						}
					},
					error: (user, error) => {
						this.error()
						console.log("error")
					}
				});
			}
		},
		components: {
			loading
		}
	}
</script>

<style>

</style>