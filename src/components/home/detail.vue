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
				<img :src="detail.author.photo" /> {{detail.author.name}} - {{detail.createdAt}}
			</div>
			<div class="detail-article">{{detail.detail}}</div>
			<div> 被浏览 {{detail.look}} 次</div>
			<div class="column-title">
				<span>0条评论</span>
				<i></i>
			</div>
			<dl class="detail-msg">
				<dt><img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2401881700,2342273471&fm=58"/></dt>
				<dd>
					<input type="text" placeholder="填写姓名" />
					<textarea rows="3"></textarea>
				</dd>
			</dl>
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
				detail: {}
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
				if(this.$route.params.id) {
					document.body.style = "overflow:hidden"
				}
				var detail = Bmob.Object.extend("detail");
				var query = new Bmob.Query(detail);
				query.include("user");
				query.get(this.$route.params.id, {
					success: (object) => {
						let pic = object.get('pic') ? {
							"background-image": `url(${object.get('pic')})`
						} : false

						this.detail = {
							'id': object.id,
							'title': object.get('title'),
							'type': object.get('type'),
							'pic': pic,
							'look': object.get('look'),
							'detail': object.get('detail'),
							'createdAt': object.createdAt,
							'author': {
								'photo': object.get('user').attributes.photo,
								'name': object.get('user').attributes.name,
							}
						}
					},
					error: function(object, error) {
						// 查询失败
					}
				});
			},
			close() {
				this.$router.push('/home');
				document.body.style = ""
			}
		}
	}
</script>