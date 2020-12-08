<template>
  <div class="blog">
    <div class="container">
      <component :is="component" @hook:mounted="mountedHooK"></component>
    </div>
  </div>
</template>

<script>
import hljs from "highlight.js";
import "@/style/highlight.css";

export default {
  data() {
    return {
      component: "",
    };
  },
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.component = id;
    } else {
      this.$router.back();
    }
  },
  methods: {
    mountedHooK(){
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
    }
  },
};
</script>