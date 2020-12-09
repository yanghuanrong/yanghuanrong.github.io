---
title: 文字飞散特效组件
tag: vue
date: 2020.12.09
---

# 在VUE中实现一个文字飞散特效
> 主要是使用的transition-group中的钩子函数对元素做css动画处理

:::demo 
``` html
<template>
  <div class="page" @click="open = !open" >
    <text-fly text="关关雎鸠，在河之洲" v-model="open"></text-fly>
  </div>
</template>

<script>
import textFly from '../package/TextFly.vue'
export default {
  components: {textFly},
  data(){
    return {
      open: true
    }
  }
}
</script>

<style>
  .page{
    font-size:  56px;
    font-weight: bold;
    padding: 100px 0;
    overflow: hidden;
    cursor: pointer;
    text-align: center;
  }
</style>

```
