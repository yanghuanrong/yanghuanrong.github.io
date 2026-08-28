# 杨焕荣

杨焕荣（南北）的个人站点。Astro 静态生成，面向 GEO：首包即完整 HTML，正文不依赖 JavaScript。

需要交互的部分用 React 写成「小岛」，例如主题切换与首页动效。

## 本地

```bash
npm install
npm run dev
```

构建：

```bash
npm run build
npm run preview
```

## 内容

- 文章：`src/content/blog/`
- 站点信息：`src/consts.ts`
- React 小岛：`src/components/react/`

## GEO

- `public/robots.txt` 放行常见 AI 爬虫
- `public/llms.txt` 给生成式引擎看的站点地图
- 页面带 Person / BlogPosting JSON-LD
- `sitemap.xml`（由 `sitemap-0.xml` 复制）与 `rss.xml` 构建时生成
