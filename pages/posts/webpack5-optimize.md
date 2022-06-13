---
title: 优化webpack5热更新从9s下降至1~2s
date: 2022-06-01
duration: 1min
---

公司的项目是用 webpack5 搭建起来的，没有使用其他开源的脚手架，然而随着项目文件变多，每次保存文件都需要经过 7~9s 的等待。

翻阅了许多的文档，试用了各种别人总结的经验，然并卵。

最后去屡了一下自己的配置逻辑，凭着敏锐的直觉，就觉得是`CleanWebpackPlugin`有问题。 `CleanWebpackPlugin`这个plugin的作用是每次重建后都会删除webpack目录中的所有文件，在`dev`环境下，每次保存都执行，意味着缓存的文件不在生效。

```js
const devMode = process.env.NODE_ENV !== 'production'
if (devMode) {
  base_config.plugins.push(new webpack.HotModuleReplacementPlugin())
} else {
  base_config.plugins.push(new CleanWebpackPlugin())
}
```

所以这个包最好是只在`production`环境下使用，没有什么高大上的摇树、dll等等；仅仅只需要把`plugin`用在合适的时机，就可以得到非常棒的效果。
