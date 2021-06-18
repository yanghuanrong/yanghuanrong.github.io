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
        <li v-for="(item) in list" :key="item.id" @click="toDetail(item)">
          <div class="item">
            <div class="time">
              {{ item.tag }}
              <span> | </span>
              {{ item.lastUpdated }}
            </div>
            <div
              class="title"
            >
              {{item.title}}
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="type">
      <ul>
        <li class="active">
          <span>View All</span>
        </li>
        <li v-for="(item, i) in tag" :key="i">
          <span>{{item.label}}</span>
          <i>{{item.value}}</i>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import { data, tag } from "@blog/data/data.json";
import textFly from "@/components/TextFly.vue";

function query(selector) {
  return Array.from(document.querySelectorAll(selector));
}

export default {
  components: {
    textFly,
  },
  name: "blog",
  data() {
    const tagName = Object.keys(tag).map((k) => ({
      label: k,
      value: tag[k]
    }))
    
    return {
      open: true,
      active: null,
      router: true,
      list: data,
      tag: tagName

    };
  },
  mounted(){
    const observer = new IntersectionObserver(
      (changes) => {
        changes.forEach(function(change) {
          if(change.intersectionRatio === 1) {
            change.target.className = 'show'
          }
        });
      },
      {
        threshold: [0, 1]
      }
    );

    query('.blog-list li').forEach(function (item) {
      observer.observe(item);
    });
  },
  methods: {
    toDetail(item) {
      this.$router.push({ path: '/blog/' + item.id});
    },
  }
};
</script>
