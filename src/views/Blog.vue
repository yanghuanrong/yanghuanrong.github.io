<template>
  <div class="blog" style="overflow: hidden">
        <div class="container">
    <ul class="blog-list">
      <li v-for="(item, i) in list" :key="item.title">
          <div class="time">
            <span class="year">{{ item.year }}</span>
            <span class="day">{{ item.day }}</span>
          </div>
          <div
            class="title"
            :class="{ active: active === i }"
            @click="toDetail(item, i, $event)"
          >
            <text-fly
              :text="item.title"
              v-model="item.move"
              @move="end"
            ></text-fly>
        </div>
      </li>
    </ul>
          </div>
  </div>
</template>

<script>
import { data } from "@blog/data/data.json";
import textFly from "@/components/TextFly.vue";

export default {
  components: {
    textFly,
  },
  name: "blog",
  data() {
    const list = data.map((item, i) => {
      const time = item.date.split(".");
      item.year = `${time[0]}.${time[1]}`;
      item.day = time[2];
      item.move = true;
      return item;
    });
    return {
      open: true,
      active: null,
      router: true,
      list: list,
    };
  },
  methods: {
    end() {
      const item = this.list[this.active];
      this.$router.push({ name: "detail", params: { id: item.blogName } });
      this.router = true;
    },
    toDetail(item, i, e) {
      if (!this.router) return;
      this.router = false;
      item.move = false;
      this.active = i;
    },
  },
  activated() {
    this.$nextTick(() => {
      this.router = true;
      if (this.active === null) {
        return;
      }
      this.list[this.active].move = true;
    });
  },
};
</script>
