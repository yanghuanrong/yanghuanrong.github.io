<template>
  <div v-on="$listeners" ref="textFly">
    <transition-group
      tag="div"
      v-on:enter="enter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
    >
      <span v-show="move" v-for="(item, i) in list" :key="item + i">{{
        item
      }}</span>
    </transition-group>
  </div>
</template>

<script>
function random(min, max) {
  return Math.random() * (max - min) + min;
}

function cssText(off) {
  const x = off ? random(-500, 500) : 0;
  const y = off ? random(-500, 500) : 0;
  const z = off ? random(-500, 500) : 0;
  const c = off ? random(2, 1) : 1;
  const o = off ? 0 : 1;
  const s = random(1, 2);
  const d = random(0, 0.2);
  return `transform: translate3d(${x}px, ${y}px, ${z}px) scale(${c});
            opacity: ${o};
            display: inline-block;
            transition:all ${s}s ease ${d}s;`;
}
let iStartTop;
export default {
  name: "textFly",
  props: {
    text: String,
    value: Boolean,
  },
  data() {
    return {
      list: [],
      num: 0,
      move: true,
    };
  },
  watch: {
    value(val) {
      this.move = val;
    },
  },
  created() {
    this.list = this.text.split("");
  },
  methods: {
    enter: function (el, done) {
      el.style.cssText = cssText(!this.move);
    },
    beforeLeave: function (el) {
      el.style.cssText = cssText(this.move);
      this.num++;
    },
    leave: function (el, done) {
      el.style.cssText = cssText(!this.move);
      el.addEventListener("transitionend", () => {
          if (this.num === this.list.length) {
            this.num = 0;
            this.$emit("move");
          }
        },
        false
      );
    },
  },
};
</script>