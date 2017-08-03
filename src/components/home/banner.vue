<template>
	<div class="swiper-container banner" id="banner">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="item in Banner"><img :src="item" width="100%" /></div>
		</div>
		<div class="swiper-pagination"></div>
	</div>
</template>

<script>
	let Banner = ['https://photo.tuchong.com/489217/l/21726153.webp', 'https://photo.tuchong.com/1469746/l/9328918.webp']

	export default {
		data() {
			return {
				Banner: Banner
			}
		},
		mounted() {
			this.$nextTick(() => {
				new Swiper('#banner', {
					effect : 'fade',
					autoplay: 4000,
					speed:1000,
					autoplayDisableOnInteraction: false,
					pagination: '.swiper-pagination',
					bulletClass : 'my-bullet',
					bulletActiveClass : 'active',
					paginationClickable: true,
					preloadImages: false,
					lazyLoading: true
				});
			})
		},
	}
</script>

<style lang="less">
	.swiper-pagination{ position: absolute; bottom: 0; left: 0; width: 100%; padding-left: 20px;
		.my-bullet{ width: 25px; height: 4px; background: #FFF; display: block; opacity:.4; float: left; cursor: pointer; margin-right: 10px;
			&.active{ opacity: 1;}
		}
	}
</style>