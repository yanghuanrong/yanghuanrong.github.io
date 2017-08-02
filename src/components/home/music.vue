<template>
  	<div class="music">
  		<div class="left">
  		</div>
  		<div class="right"></div>
  	</div>
</template>
	
<script>
	export default {
		data(){
			return {
				musicList:['../../../static/audio/Remix.mp3']
			}
		},
		mounted(){
		    var audio = new Audio();
		    audio.src = this.musicList[0]
		    audio.play();
		},
		methods:{
			
		}
	}
	
</script>

<style lang="less">
	.music{ display: flex; justify-content: space-between;}
	.left{ flex: 1; position: relative;}
	.right{ background: #00f281; height: 100px; width: 75px;}
	
</style>