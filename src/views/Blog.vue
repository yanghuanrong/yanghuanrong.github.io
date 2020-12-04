<template>
  <div class="blog">
    <div class="container">
      <ul class="blog-list">
        <li v-for="(item, i) in list" :key="item.title">
          <div class="time">
            <span class="year">{{item.year}}</span>
            <span class="day">{{item.day}}</span>
          </div>
          <div class="title" :class="{active: active === i}" @click="toDetail(item, i, $event)">
            {{ item.title }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { data } from "@blog/data/data.json";

const list = data.map(item => {
  const time = item.date.split('.')
  item.year = `${time[0]}.${time[1]}`
  item.day = time[2]
  return item
})

export default {
  data() {
    return {
      active: null,
      list: list,
      arr: []
    };
  },
  mounted(){
    const title = document.querySelectorAll('.title')

    title.forEach(item => {
      let html = ""
      item.innerHTML.split('').forEach((text) => {
        html += `<span class="fly-span">${text}</span>`
      })
      item.innerHTML = html
    })

    
  },
  methods: {
    toDetail(item, i, e){
      this.active = i
      // let html = ""
      // e.target.innerHTML.split('').forEach((text) => {
      //   html += `<span class="fly-span">${text}</span>`
      // })
      // e.target.innerHTML = html
        this.$nextTick(() => {
          const box = document.querySelector('.title.active')
          const fly = box.querySelectorAll('.fly-span')
          function random(min, max) {  
              return Math.random() * (max - min) + min;  
          }
          let off = true

          ;[].forEach.call(fly, function(o){
            // console.log(o)
            o.style.cssText = `transform:translate3d(${(off ? random(-500, 500) : 0)}px, ${(off ? random(-500, 500) : 0)}px,${(off ? random(-500, 500) : 0)}px) scale(${(off ? random(2, 1) : 1)});opacity: ${(off ? 0 : 1)}; transition:all ${random(1, 2)}s ease ${random(0, 0.2)}s`;  
          });
          setTimeout(() => {
            this.$router.push({ name: 'detail', params: { id: item.blogName }})
          }, 2000)
        })
        
    }
  }
};
</script>


//容器  
var dom = document.querySelector(‘.flyBox’);  
//按钮  
var btn = document.querySelector(‘.flyBtn’);  
//存放字符串  
var html = ”;  
//将容器的innerHTML，split成数组，在拼接成字符串  
dom.innerHTML.split(”).forEach(function(o){  
    html+='<span class=“fly-span”>’+o+'</span>’  
});  
//替换内容  
dom.innerHTML = html;  
//随机数  
function random(min, max) {  
    return Math.random() * (max – min) + min;  
};  
//点击  
btn.onclick = function(){  
    init();  
};  
//获取所有飞散的元素  
var fly = dom.querySelectorAll(‘.fly-span’);  
function init(){  
    //添加css3属性  
    ;[].forEach.call(fly,function(o){  
        o.style.cssText = ‘transform:translate3d(‘+ (off ? random(-500, 500) : 0)+’px,’+(off ? random(-500, 500) : 0)+’px,’+(off ? random(-500, 500) : 0)+’px) scale(‘+(off ? random(2, 1) : 1)+’);opacity:’+  (off ? 0 : 1) +';transition:all ‘+random(2.5, 4)+’s ease ‘+random(0, 0.2)+’s';  
    });  
};  
打乱
