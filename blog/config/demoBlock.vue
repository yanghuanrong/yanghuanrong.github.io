<template>
  <div class="demo-block">
    <div class="source">
      <div class="browser">
        <div class="browser-bar">
          <div class="dot">
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div class="address">
            <span>https://github.com/yanghuanrong</span>
          </div>
        </div>
        <div class="browser-body">
          <div class="description" v-if="$slots.default">
            <slot></slot>
          </div>
          <slot name="source"></slot>
        </div>
      </div>
    </div>
    <div class="meta" ref="meta">
      <div class="highlight">
        <slot name="highlight"></slot>
      </div>
    </div>
    <div class="background" :style="{background: backColr}"></div>
  </div>
</template>

<script type="text/babel">
import hljs from "highlight.js";
import "./highlight.css";
import "./demoBlock.less";

export default {
  data(){
    function randomColor(){
      const s = (Math.random() * 0xfffff * 1000000).toString(16)
      return '#' + s.slice(0, 6)
    }

    return {
      backColr: randomColor()
    }
  },

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