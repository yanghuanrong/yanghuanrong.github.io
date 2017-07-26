<template>
	<div id="">
		管理系统
		<div @click="loginOut">
			退出
		</div>
	</div>
</template>

<script>
	export default {
		created() {
			var currentUser = Bmob.User.current();
			if(!currentUser) {
				this.$router.push('/login');
				return;
			}
		},
		methods: {
			loginOut() {
				Bmob.User.logOut();
				this.$router.push('/');
			}
		}
	}
</script>

<style>

</style>