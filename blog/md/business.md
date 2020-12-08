---
title: 一些会常用的业务代码整理
tag: any
date: 2020.12.08
---

# 一些会常用的业务代码整理
> 把一些在业务中经常会用到的代码归纳收集整理

## 数字千位分割
价格显示易读形式
```js
function moneyFormat(value) {
    return value ? value.toString().replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') : value
}
moneyFormat("1024.31") //1,024.31
```

## 随机生成颜色值

```js
function randomColor() {
    const s = (Math.random() * 0xfffff * 1000000).toString(16)
    return '#' + s.slice(0, 6)
}
randomColor() //#12cf63
```

