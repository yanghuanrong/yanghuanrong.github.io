<template>
  <div class="blog" style="overflow: hidden">
    <div class="container intro">
      <div class="sectionheader flex flex-column">
        <h3>
          博客文章
        </h3>
      </div>
    </div>

    <div class="container">
      <ul class="blog-list">
        <li v-for="(item, i) in list" :key="item.title" @click="toDetail(item)">
          <div class="time">
            <span>{{ item.lastUpdated }}</span>
          </div>
          <div
            class="title"
            :class="{ active: active === i }"
          >
            {{item.title}}
          </div>
        </li>
      </ul>
    </div>

    <div class="type">
      <ul>
        <li class="active">
          <span>View All</span>
        </li>
        <li>
          <span>Vue</span>
          <i>5</i>
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
    return {
      open: true,
      active: null,
      router: true,
      list: data,
    };
  },
  methods: {
    toDetail(item) {
      this.$router.push({ name: "detail", params: { id: item.blogName } });
    },
  }
};
</script>
