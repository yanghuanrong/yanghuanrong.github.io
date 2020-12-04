<template>
  <div class="blog" style="overflow:hidden">
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
  item.move = false
  return item
})

function random(min, max) {  
    return Math.random() * (max - min) + min;  
}

export default {
  name: 'blog',
  data() {
    return {
      active: null,
      list: list,
      fly: []
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
        this.$nextTick(() => {
          const box = document.querySelector('.title.active')
          this.fly = box.querySelectorAll('.fly-span')
  
          const off = this.list[this.active].move = true
          this.fly.forEach((item) => {
            item.style.cssText = `transform:translate3d(${(off ? random(-500, 500) : 0)}px, ${(off ? random(-500, 500) : 0)}px,${(off ? random(-500, 500) : 0)}px) scale(${(off ? random(2, 1) : 1)});opacity: ${(off ? 0 : 1)}; transition:all ${random(1, 2)}s ease ${random(0, 0.2)}s;`;
          })
    
          setTimeout(() => {
            this.$router.push({ name: 'detail', params: { id: item.blogName }})
          }, 800)
        })
    }
  },
  activated(){
    this.$nextTick(() => {
        if(this.active === null){
          return
        }
        const off = this.list[this.active].move = false
        setTimeout(() => {
          this.fly.forEach((item) => {
            item.style.cssText = `transform:translate3d(${(off ? random(-500, 500) : 0)}px, ${(off ? random(-500, 500) : 0)}px,${(off ? random(-500, 500) : 0)}px) scale(${(off ? random(2, 1) : 1)});opacity: ${(off ? 0 : 1)}; transition:all ${random(1, 2)}s ease ${random(0, 0.2)}s;`;
          })
        })
    })
  }
};
</script>
