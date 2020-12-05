<template>
  <div class="demo-block">
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div class="meta" ref="meta">
      <div class="description" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="highlight">
        <slot name="highlight"></slot>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import "./demoBlock.less";

export default {
  mounted() {
    this.$nextTick(() => {
      const blocks = document.querySelectorAll("pre code:not(.hljs)");
      Array.prototype.forEach.call(blocks, hljs.highlightBlock);

      const elements = document.querySelectorAll("pre code.hljs");
      for (let i = 0; i < elements.length; i++) {
        let html = elements[i].innerHTML;
        let num = 1;
        html = '<span class="ln-num" data-num="' + num + '"></span>' + html;
        html = html.trim().replace(/\r\n|\r|\n/g, function (a) {
          num++;
          return a + '<span class="ln-num" data-num="' + num + '"></span>';
        });
        html = '<span class="ln-bg"></span>' + html;
        elements[i].innerHTML = html;
      }
    });
  },
};
</script>