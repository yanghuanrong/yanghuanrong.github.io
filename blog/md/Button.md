---
title: 打造现象级WEB按钮
tag: Vue
---

# 打造现象级WEB按钮
> 这个按钮来源于RelaxUI中的button组件。把它作为本次博客的技术测试在好不过了，在测试与开发的过程中。button按钮一直当担中非常重要的责任，他能给到用户最直观的体验。如果点击一个按钮没有反应的时候，那么他肯定是出BUG了。

:::demo 这就是来自`RelaxUI`的Button
``` html
<template>
  <div>
    <Button type="danger" @click="test">{{ msg }}</Button>
    <div v-for="item in 10">{{ item }}</div>
  </div>
</template>

<script>
import Button from '../package/Button.vue'
export default {
  components: {Button},
  data(){
    return {
      msg: '测试测试'
    }
  },
  methods: {
    test(){
      alert("111")
    }
  }
}
</script>

```
:::

-----------
:::demo 这就是来自`RelaxUI`的Button
```html
<template>
<div>
<div>1111</div>
<div>1111</div>
<div>1111</div>
<div>1111</div>
</div>
</template>
```
:::


```js
alert(111)
```