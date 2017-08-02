<template>
  	<div class="music">
  		<div class="left">
  			<canvas id='canvas' hef="canvas" width="200" height="100"></canvas>
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
			window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
			
var gradient;
		    var audio = new Audio();
		    audio.src = this.musicList[0]
		    var ctx = new AudioContext();
		    var analyser = ctx.createAnalyser();
		    var audioSrc = ctx.createMediaElementSource(audio);
		    // we have to connect the MediaElementSource with the analyser 
		    audioSrc.connect(analyser);
		    analyser.connect(ctx.destination);
		    // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
		    // analyser.fftSize = 64;
		    // frequencyBinCount tells you how many values you'll receive from the analyser
		    var frequencyData = new Uint8Array(analyser.frequencyBinCount);
		
		    // we're ready to receive some data!
		    var canvas = document.getElementById('canvas'),
		        cwidth = canvas.width,
		        cheight = canvas.height - 1,
		        meterWidth = 10, //width of the meters in the spectrum
		        gap = 1, //gap between meters
		        capHeight = 1,
		        capStyle = '#fff',
		        meterNum = 200 / (10 + 1), //count of the meters
		        capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
		    ctx = canvas.getContext('2d'),
		    gradient = ctx.createLinearGradient(0, 0, 0, 100);
		    gradient.addColorStop(1, '#0f0');
		    gradient.addColorStop(0.5, '#ff0');
		    gradient.addColorStop(0, '#f00');
		    // loop
		    function renderFrame() {
		        var array = new Uint8Array(analyser.frequencyBinCount);
		        analyser.getByteFrequencyData(array);
		        var step = Math.round(array.length / meterNum); //sample limited data from the total array
		        ctx.clearRect(0, 0, cwidth, cheight);
		        for (var i = 0; i < meterNum; i++) {
		            var value = array[i * step]*.4;
		            if (capYPositionArray.length < Math.round(meterNum)) {
		                capYPositionArray.push(value);
		            };
		            ctx.fillStyle = capStyle;
		            //draw the cap, with transition effect
		            if (value < capYPositionArray[i]) {
		                ctx.fillRect(i * 11, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
		            } else {
		                ctx.fillRect(i * 11, cheight - value, meterWidth, capHeight);
		                capYPositionArray[i] = value;
		            };
		            ctx.fillStyle = gradient; //set the filllStyle to gradient for a better look
		            ctx.fillRect(i * 11 /*meterWidth+gap*/ , cheight - value + capHeight, meterWidth, cheight); //the meter
		        }
		        requestAnimationFrame(renderFrame);
		    }
		    renderFrame();
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