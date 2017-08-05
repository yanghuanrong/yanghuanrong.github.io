<template>
	<div class="detail-wrap">
		<!--<div class="loading" v-if="loading">
			Loading...
		</div>-->

		<!--<div v-if="error" class="error">
			{{ error }}
		</div>-->

		<div class="detail-body">
			<div class="close" @click="close"><i class="icon-close"></i></div>
			<div class="detail-img" v-if="detail.pic" :style="detail.pic"></div>
			<h1 class="detail-title">{{detail.title}}</h1>
			<div class="detail-author" v-if="detail.author">
				<img :src="detail.author.photo"/> {{detail.author.name}} - {{detail.createdAt}}
			</div>
			<div class="detail-article">{{detail.detail}}</div>
			<p></p>
		</div>
	</div>

</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				loading: false,
				post: null,
				error: null,
				detail:{}
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
//				this.error = this.post = null;
//				this.loading = true;
				if(this.$route.params.id){
					document.body.style="overflow:hidden"
				}
				var detail = Bmob.Object.extend("detail");
				var query = new Bmob.Query(detail);
				query.include("user");
				query.get(this.$route.params.id, {
				  success: (object)=>{
						let pic = object.get('pic') ? {"background-image":`url(${object.get('pic')})`} : false
				  	
				    	this.detail={
							'id': object.id,
							'title': object.get('title'),
							'type': object.get('type'),
							'pic': pic,
							'look': object.get('look'),
							'detail': object.get('detail'),
							'createdAt': object.createdAt,
							'author':{
								'photo':object.get('user').attributes.photo,
								'name':object.get('user').attributes.name,
							}
						}
				  },
				  error: function(object, error) {
				    // 查询失败
				  }
				});
			},
			close(){
				this.$router.push('/home');
				document.body.style=""
			}
		}
	}
</script>