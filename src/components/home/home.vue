<template>
	<div class="blog-list">
		<transition name="fade">
			<router-view></router-view>
		</transition>
		<div>
			<div class="blog-item" v-for="item in detail">
				<p class="source">该话题来自:{{item.type}}</p>
				<div class="blog-title">
					<router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
				</div>
				<div class="blog-description">
					<router-link :to="'/detail/'+item.id" class="blog-img" tag="div" v-if="item.pic" :style="item.pic"></router-link>
					<router-link :to="'/detail/'+item.id" class="blog-text" tag="div">
						{{item.detail}}
					</router-link>
				</div>
				<div class="blog-handle">
					<div class="blog-date">{{item.createdAt}}</div>
					<div class="blog-icon">
						<span>
							<i class="icon-look"></i> {{item.look}}
						</span>
						<span>
							<i class="icon-msg"></i> 添加评论
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="loading" v-if="loading">
			<load></load>
		</div>
	</div>
</template>

<script type="text/javascript">
	let detail = Bmob.Object.extend('detail');
	let query = new Bmob.Query(detail);
	import load from './loading'
	export default {
		data() {
			return {
				detail: [],
				iNow:0,
				scroll:0,
				loading:false,
			}
		},
		activated(){
			window.scrollTo(0,this.scroll)
		},
		deactivated(){
			this.scroll=document.body.scrollTop;
			setTimeout(function(){
				window.scrollTo(0,0)
			},1000)
		},
		created() {
			this.getList();
		},
		mounted(){
			let sw = true;
			window.addEventListener('scroll',()=>{
                if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
                    if(sw){
                        sw = false;
                        this.iNow++;
                        this.getList();
                    }  
                }  
            });  
		},
		methods: {
			getList() {
				this.loading=true;
				query.skip(this.iNow * 4);
    			query.limit(4);
				query.find({
					success: (results) => {
						this.loading=false;
						for(let i = 0; i < results.length; i++) {
							let object = results[i];
							let pic = object.get('pic') ? {
								"background-image": `url(${object.get('pic')})`
							} : false
							this.detail.push({
								'id': object.id,
								'title': object.get('title'),
								'type': object.get('type'),
								'pic': pic,
								'look': object.get('look'),
								'detail': object.get('detail').length > 200 ? object.get('detail').substring(0, 200) + "..." : object.get('detail'),
								'createdAt': object.createdAt
							})
						}
					},
					error: function(error) {
						alert("查询失败: " + error.code + " " + error.message);
					}
				});

			}
		},
		components:{
			load
		}
	}
</script>