---
title: 优化 webpack5 热更新从 9s 下降至 1~2s
description: 在未使用开源脚手架的 webpack5 项目中，定位 CleanWebpackPlugin 在开发环境清空缓存，使热更新从 7–9 秒降到 1–2 秒。
pubDate: 2022-06-01
---

公司的项目是用 webpack5 搭建起来的，没有使用其他开源的脚手架，然而随着项目文件变多，每次保存文件都需要经过 7~9s 的等待。

翻阅了许多的文档，试用了各种别人总结的经验，然并卵。

最后去屡了一下自己的配置逻辑，凭着敏锐的直觉，就觉得是 `CleanWebpackPlugin` 有问题。`CleanWebpackPlugin` 这个 plugin 的作用是每次重建后都会删除 webpack 目录中的所有文件，在 `dev` 环境下，每次保存都执行，意味着缓存的文件不再生效。

```js
const devMode = process.env.NODE_ENV !== 'production'
if (devMode) {
  base_config.plugins.push(new webpack.HotModuleReplacementPlugin())
} else {
  base_config.plugins.push(new CleanWebpackPlugin())
}
```

所以这个包最好是只在 `production` 环境下使用，没有什么高大上的摇树、dll 等等；仅仅只需要把 plugin 用在合适的时机，就可以得到非常棒的效果。
