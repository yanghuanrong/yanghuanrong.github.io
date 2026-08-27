---
title: 优化 webpack5 热更新从 9s 下降至 1~2s
description: 自搭 webpack5 项目热更新越来越慢，文档和其他人的经验试了没用。最后是 CleanWebpackPlugin 在 dev 里清缓存惹的祸。
pubDate: 2022-06-01
---

## 保存一下要等 7~9 秒

公司的项目是用 webpack5 自搭的，没上 create-react-app、vue-cli 这类脚手架。一开始文件少，改完保存，浏览器几秒内就能刷出来，还能接受。

项目越做越大，组件和页面一路涨，dev 下每次保存都要等 7~9 秒。光标在编辑器里闪，终端还在转，这个等待很磨人。你说它是冷启动吧，项目明明已经在跑，只是改了一个小组件。

## 文档和攻略都试过

我先去翻 webpack 官方文档，又搜了一圈别人写的优化清单。什么缓存、拆分、持久化，能试的都过了一遍，然并卵。时间花在配置上，体感几乎没变化。

那阵子甚至怀疑是不是机器老了、依赖装太多。同事那边也慢。问题还是在 webpack 配置上。

## CleanWebpackPlugin 放错环境了

没办法，回头把自己的 webpack 配置从头到尾捋了一遍。plugins 那一段反复看，`CleanWebpackPlugin` 引起了我的注意。

这个插件干的事很直白，每次构建完把输出目录清干净，避免旧文件残留。生产环境打包前清一次，很合理。但我当时的写法是 dev 和 production 共用同一套 plugins，`CleanWebpackPlugin` 在 dev 里也跑。每保存一次，它就把 webpack 输出目录删一遍，等于每次热更新都从零开始，之前攒的缓存全废。

dev 这边本来还挂了 `HotModuleReplacementPlugin`，热更新依赖中间产物和缓存才能快。输出目录被清掉，HMR 只能退化成接近全量重编，7~9 秒就这么来的。

改法也简单，让 `CleanWebpackPlugin` 只在 production 生效

```js
const devMode = process.env.NODE_ENV !== 'production'
if (devMode) {
  base_config.plugins.push(new webpack.HotModuleReplacementPlugin())
} else {
  base_config.plugins.push(new CleanWebpackPlugin())
}
```

改完再保存，终端里的耗时掉到了 1~2 秒。

快。和项目刚起步时差不多。

没什么高大上的摇树、dll、分包策略，就是把插件放回它该在的环境。开发要快，就别在 dev 里清输出目录；上线要干净，再让 `CleanWebpackPlugin` 出场。
