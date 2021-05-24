---
title: 日历
tag: vue
date: 2020.11.14
---

# 日历
> 这个按钮来源于RelaxUI中的button组件。把它作为本次博客的技术测试在好不过了，在测试与开发的过程中。button按钮一直当担中非常重要的责任，他能给到用户最直观的体验。如果点击一个按钮没有反应的时候，那么他肯定是出BUG了。

:::demo 这就是来自`RelaxUI`的Button
``` html
<template>
  <div>
    <cc v-model="a"></cc>
  </div>
</template>

<script>
import cc from '../package/fr-calendar.vue'
export default {
  components: {cc},
  data(){
    return {
      a: true
    }
  }
}
</script>

```
:::

-----------

```html
<div>1111</div>
<div>1111</div>
<div>1111</div>
<div>1111</div>
```


```js
alert(111)
```