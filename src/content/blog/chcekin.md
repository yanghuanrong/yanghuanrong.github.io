---
title: 掘金自动签到 Juejin Auto Check-in
description: 用 chcekin 每天自动签掘金：Cookie 调成长 API，写接口走 Playwright，GitHub Actions 定时跑，钉钉推结果。
pubDate: 2026-08-27
---

我每天都会刷掘金，签到领矿石，但老忘点。后来写成自动任务，代码在 [chcekin](https://github.com/yanghuanrong/chcekin)。

## 用的方案

以前那套开源签到，大多是 **Cookie + Node 直接调接口**。读数据没问题，签到 POST 经常被拦——返回空 body，Actions 看着成功，矿石不涨。

这版改成：

- **GET**（今日状态、矿石、天数）仍用 Node `fetch` 带 Cookie
- **POST**（签到、抽奖）HTTP 空响应时，**Playwright** 开无头浏览器，在页面里发同一个请求，让 secsdk 自己补签名

```js
async function apiPost(cookie, apiPath, body = {}) {
  const httpResp = await apiPostHttp(cookie, apiPath, body)
  if (!httpResp.empty) return httpResp
  return browserApiPost(cookie, apiPath, body)
}
```

本地用 Chrome，CI 用 Chromium。需要的话可以 `FORCE_BROWSER=true` 让写接口全程走浏览器。

## 定时跑

GitHub Actions 每天北京时间 8:00、8:30 各跑一次。Secrets 配 `JUEJIN_COOKIE`，可选钉钉 Webhook，跑完推送矿石、连续天数、抽奖结果。今天已签（`err_no=15001`）当成功退出。

Cookie 大概三十天要换一条；快过期时钉钉摘要里会提醒。仓库还有 keepalive workflow，避免公开 repo 太久不 commit 导致 schedule 被停。

## 本地试

```bash
cp .env.example .env   # JUEJIN_COOKIE，可选钉钉
npm install && npm start
```

Cookie 在 Chrome 登录掘金后，从 DevTools 复制 `juejin.cn` 下的 Cookie 拼成一行即可。
