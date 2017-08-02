<template>
  	<div class="music">
  		<div class="left">
  			<div class="progress"><div class="progress2" id="progress" style="width: 7.79271%; background: rgb(255, 217, 109);">&nbsp;</div></div>
        <button id="menu" style=" position: absolute; top: 50px; left: 40px; z-index: 88888;"> 开关 </button>
  			
  			<div class="div1">
            <ul class="oUl">
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                <li>
                    <span></span>
                </li>
                
            </ul>
        </div>
  			
  			
  		</div>
  		<div class="right"></div>
  	</div>
</template>
	
<script>
	export default {
		data(){
			return {
				musicList:['./img/horse.mp3']
			}
		},
		created(){
        	var aImg = document.getElementsByTagName("span");
			var aLi = document.getElementsByTagName("li");
			
            var audioContext,analyser,sourceNode,freqArray,nowbtn,num,k,m,n;
			
			var audio = new Audio()
			audio.src = "../../../static/audio/Remix.mp3";
			audio.addEventListener("canplay", function(e) {
                    analyser = sourceNode = null;
                    audioContext = audioContext || new AudioContext();
                    // 调用音频解码器
                    analyser = (analyser || audioContext.createAnalyser());
                    //
                    sourceNode = audioContext.createMediaElementSource(audio);
                    //
                    sourceNode.connect(analyser);
                    sourceNode.connect(audioContext.destination);

                    audio.play();
                    update()
                    
                    
            }, false);
            function update() {
                    progress.style.width = audio.currentTime/audio.duration*100+'%';
                    freqArray = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(freqArray);
                    fn(freqArray);
                    if(audio.paused){
                        freqArray = null;
                    }else{
                        requestAnimationFrame(update);
                    }
                };
            function fn(arr){
                var step = Math.round(arr.length / (aLi.length*2)); 
                for( var i = 0; i < aLi.length; i++ ){
                    num = arr[i * step];
                    
                    k = (num) / aImg[i].offsetHeight * 100;
                    m = 100 - k;
//                      console.log(m)
//                      n = (m-30)>0?(m-30):0;
                    n = (m/50);
//                      aImg[i].style.cssText = "-webkit-transform:(0," + n + "%,0);transform:translate3d(0," + n +"%,0)";
                    aImg[i].style.cssText = "transform:scaleY(" + n +")";
                    
                }
            }
				
		},
		methods:{
			
		}
	}
	
</script>

<style lang="less">
	.music{ display: flex; justify-content: space-between;}
	.left{ flex: 1; position: relative;}
	.right{ background: #00f281; height: 100px; width: 75px;}
	
	
	.div1 {
                width: 100%;
                position: absolute;
                left: 0;
                bottom: 0;
                height: 100px;
                overflow:hidden;
            }
            .oUl {
            	transform:scaleX(-1);
                position: absolute;
                left: 0;
                bottom: 0;
                transition: transform .4s cubic-bezier(.445,.05,.55,.95);
                width: 100%;
                display: flex;
                 justify-content: center;
                align-items: center;
            }
            .oUl li {
                flex: 1;
                position: relative;
                transition: transform .4s cubic-bezier(.445,.05,.55,.95);
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100px;
            }
            .oUl li span{
                width: 100%;
                max-width: 100%;
                height: 1px;
                position: relative;
                background: red;
                background-size:contain;
                transition: transform .1s;
                background-repeat:  no-repeat;
                transform-origin: center;
                transform: scaleY(0);
                display: block;
            }
            .oUl li:nth-child(1) span{
                background: red;
            }
            .oUl li:nth-child(2) span{
                background: green;
            }
            .oUl li:nth-child(3) span{
                background: yellow;
            }
            .oUl li:nth-child(4) span{
                background: blue;
            }
            .oUl li:nth-child(5) span{
                background: orange;
            }
            .oUl li:nth-child(6) span{
                background: olive;
            }
            .oUl li:nth-child(7) span{
                background: mediumturquoise;
            }
            .oUl li:nth-child(8) span{
                background: orchid;
            }
            .oUl li:nth-child(9) span{
                background: teal;
            }
            .oUl li:nth-child(10) span{
                background: pink;
            }
            #div2{
                position: absolute;
                left: 0;
                bottom: 0;
                z-index: 10;
                height: 370px;
            }
            #div2 div{
                width: 10px;
                height: 10px;
                background: red;
                position: absolute;
                left: 0;
                top:0;
            }

            .oUl li.prev{
                transform: translate3d(-13%,0,0);
            }
            .oUl li.next{
                transform: translate3d(13%,0,0);
            }
            #abc li:nth-child(n) img{
                transform:translate3d(0,25%,0) !important;/* 
                -webkit-transition: .4s !important;
                transition:.4s !important; */
            }
            #abc ul li.lager img{
                transform:translate3d(0,15%,0) !important;/* 
                -webkit-transition: .4s !important;
                transition: .4s !important; */
            }
            #btn{
                position: absolute;
                left: 0;
                top:0;
                z-index: 10;
            }
</style>