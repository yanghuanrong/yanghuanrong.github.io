<template>
	<div class="blog-list">
		<router-view></router-view>
		<div>
			<div class="blog-item">
				<p class="source">该话题来自:HTML</p>
				<div class="blog-title">
					<router-link to="/detail/1">在日常生活中，做手机评测的大牛都是用什么手机，苹果吗，为什么？</router-link>
				</div>
				<div class="blog-description">
					<router-link to="/detail/1" class="blog-img" tag="div" style="background-image:url(http://f11.baidu.com/it/u=1920635231,2173067209&fm=72);">
					</router-link>	
					<router-link to="/detail/1" class="blog-text" tag="div">
					作为前手机测评人过来说两句。 “测评大牛”主力机用iPhone的居多，没99%也有89%。请不要把他们微博小尾巴作为判断依据，大牛们也经常靠小尾巴蹭热度，不足以作为判断依据。 在现在这个时间点仍然可以说i
					</router-link>
				</div>
				<div class="blog-handle">
					<div class="blog-date">2017-06-07</div>
					<div class="blog-icon">
						<span>
							<i class="icon-look"></i> 598
						</span>
						<span>
							<i class="icon-msg"></i> 添加评论
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		created(){
			console.log(this.$router)
		}
	}
</script>

