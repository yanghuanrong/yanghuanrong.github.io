<template>
	<div class="post" style="position: absolute; top: 53px; left: 0;">
		<div class="loading" v-if="loading">
			Loading...
		</div>

		<div v-if="error" class="error">
			{{ error }}
		</div>

		<div v-if="post" class="content">
			<h2>{{ post.title }}</h2>
			<p>{{ post.body }}</p>
		</div>
	</div>

</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				loading: false,
				post: null,
				error: null
			}
		},
		created() {
			this.fetchData()
		},
		watch: {
			'$route': 'fetchData'
		},
		methods: {
			fetchData() {
				this.error = this.post = null;
				this.loading = true;
				console.log(this.$route.params.id)				
				
//				getPost(this.$route.params.id, (err, post) => {
//					this.loading = false
//					if(err) {
//						this.error = err.toString()
//					} else {
//						this.post = post
//					}
//				})
			}
		}
	}
</script>