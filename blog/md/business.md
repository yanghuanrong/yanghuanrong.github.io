---
title: 一些会常用的业务代码整理
tag: JavaScript
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

## 随机生成范围的值
```js
function randomScope() {
    return Math.random() * (max - min) + min;
}
```

## 随机在数组中选一个
```js
function randomSelect(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}
```
