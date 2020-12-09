---
title: 实现一键复制
tag: vue
date: 2020.12.08
---

# 一键复制
> 在移动端或者pc端经常会遇到这样的需求

:::demo
```html
<template>
    <div class="page">
        <p class="copy-text-box">有内鬼，终止交易</p>
        <button @click="click" class="copy-btn">点击复制</button>
        <textarea class="textarea" placeholder="粘贴区域"></textarea>
    </div>
</template>
<script>
function copy(value) {
    const oInput = document.createElement('textarea')
    document.body.appendChild(oInput)
    oInput.style.width = '0'
    oInput.style.height = '0'
    oInput.style.position = 'absolute'
    oInput.style.opacity = '0'
    oInput.value = value

    const ua = window.navigator.userAgent

    if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        oInput.focus();
        oInput.setSelectionRange(0, 9999);
        document.execCommand("copy");
    } else if (ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1) {
        oInput.select();
        document.execCommand("copy");
    } else {
        oInput.focus();
        oInput.setSelectionRange(0, 9999);
        document.execCommand("copy");
    }
    document.body.removeChild(oInput)
}
export default {
  methods: {
    click(){
        const text =document.querySelector('.copy-text-box').innerHTML
        copy(text)
    }
  }
}
</script>

<style scope>
    .page{
        text-align:center;
        padding: 30px;
    }
    .copy-text-box{
        margin-bottom: 30px;
    }
    .copy-btn{
        background: green;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
        display: block;
        margin: 0 auto 30px;
        cursor: pointer;
    }
    .textarea{
        border: 1px solid #ddd;
        min-width: 200px;
        max-width: 500px;
        min-height: 100px;
        padding: 5px;
        border-radius: 3px;
    }
</style>
```
:::