"use strict";

// 覆盖默认的 fence 渲染策略
module.exports = function (md) {
  var defaultRender = md.renderer.rules.fence;

  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    var token = tokens[idx]; // 判断该 fence 是否在 :::demo 内

    var prevToken = tokens[idx - 1];
    var isInDemoContainer = prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^demo\s*(.*)$/);

    if (token.info.trim() === 'html' && isInDemoContainer) {
      return "<template slot=\"highlight\"><pre v-pre><code class=\"html\">".concat(md.utils.escapeHtml(token.content), "</code></pre></template>");
    }

    return defaultRender(tokens, idx, options, env, self);
  };
};