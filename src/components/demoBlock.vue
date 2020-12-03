<template>
  <div class="demo-block">
    <div class="splitter">
      <span>demo</span>
      <hr />
    </div>
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

import { stripScript, stripStyle, stripTemplate } from "./util.js";
export default {
  mounted() {
    this.$nextTick(() => {
      const blocks = document.querySelectorAll("pre code:not(.hljs)");
      Array.prototype.forEach.call(blocks, hljs.highlightBlock);
    });
  },
};
</script>
