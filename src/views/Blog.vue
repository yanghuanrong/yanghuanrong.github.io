<template>
  <div class="blog" style="overflow: hidden">
    <div class="type">
      <ul>
        <li
          v-for="(item, i) in tag"
          :key="i"
          @click="setType(item)"
          v-hover
          :class="{ active: type === item.label }"
        >
          <span>{{ item.label }}</span>
          <i>{{ item.value }}</i>
        </li>
      </ul>
    </div>
    <div class="list">
      <div class="page-title">
        <h3>
          博客文章
        </h3>
      </div>
      <div>
        <ul class="blog-list">
          <li
            v-for="item in list"
            :key="item.id"
            @click="toDetail(item)"
            v-hover
          >
            <div class="item">
              <div class="time">
                {{ item.tag }}
                <span> | </span>
                {{ item.lastUpdated }}
              </div>
              <div class="title">
                {{ item.title }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { data, tag } from '@blog/data/data.json';
import textFly from '@/components/TextFly.vue';

function query(selector) {
  return Array.from(document.querySelectorAll(selector));
}

export default {
  components: {
    textFly,
  },
  name: 'blog',
  inject: ['reload'],
  data() {
    const tagName = Object.keys(tag).map((k) => ({
      label: k,
      value: tag[k],
    }));

    tagName.unshift({
      label: 'View All',
      value: '',
    });

    return {
      open: true,
      router: true,
      list: [],
      tag: tagName,
    };
  },
  computed: {
    type() {
      return this.$route.query.type || 'View All';
    },
  },
  created() {
    if (this.$route.query.type) {
      this.list = data.filter((item) => {
        if (item.tag === this.$route.query.type) {
          return item;
        }
      });
    } else {
      this.list = data;
    }
  },
  mounted() {
    const observer = new IntersectionObserver(
      (changes) => {
        changes.forEach(function(change) {
          if (change.intersectionRatio === 1) {
            change.target.className = 'show';
          }
        });
      },
      {
        threshold: [0, 1],
      }
    );

    query('.blog-list li').forEach(function(item) {
      observer.observe(item);
    });
  },
  methods: {
    toDetail(item) {
      this.$router.push({ path: '/blog/' + item.id });
    },
    setType(item) {
      if (
        item.label === this.$route.query.type ||
        (!this.$route.query.type && item.label === 'View All')
      ) {
        return;
      }
      if (item.label === 'View All') {
        this.$router.push('/blog');
      } else {
        this.$router.push({
          path: '/blog',
          query: {
            type: item.label,
          },
        });
      }

      setTimeout(() => {
        this.reload();
      }, 800);
    },
  },
};
</script>
