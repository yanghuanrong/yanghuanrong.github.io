<template>
  <div class="blog-wrap">
    <div class="banner">
      <div></div>
    </div>
    <div class="back-top" @click="backTop" v-if="isBack">
      <i class="icon-angle-up"></i>
    </div>

    <div class="blog-list">
      <div class="title-wrap">
        <p class="title">日记</p>
        <p class="subtitle">diary</p>
      </div>

      <div class="blog-item" v-for="item in detail">
        <router-link :to="'/detail/'+item.id" class="wrap position-rel" tag="div">
          <div class="blog-description">
            <div class="blog-date">
              <p class="md">{{item.md}}</p>
              <p class="year">{{item.year}}</p>
            </div>
            <div class="blog-content">
              <div class="blog-title">{{item.title}}</div>
              <div class="blog-text">{{item.detail}}</div>
            </div>
          </div>
          <div class="blog-icon"><i class="icon-angle-right"></i></div>
        </router-link>
      </div>
    </div>

    <div class="loading" v-if="loading">
      <loading></loading>
    </div>
  </div>
</template>

<script type="text/javascript">
  let detail = Bmob.Object.extend('detail');
  let query = new Bmob.Query(detail);
  import loading from '@/components/public/loading'

  export default {
    data() {
      return {
        detail: [],
        iNow: 0,
        scroll: 0,
        loading: false,
        isBack: false,
      }
    },
    //组件进入的时候设置滚动条
    activated() {
      window.scrollTo(0, this.scroll)
    },
    //组件离开的时候记录滚动条，并重置滚动条
    deactivated() {
      this.scroll = document.body.scrollTop;
      setTimeout(function () {
        window.scrollTo(0, 0)
      }, 1000)
    },
    //初次渲染数据
    created() {
      this.getList();
    },
    //滚动到底部加载更多数据
    mounted() {
      let sw = true;
      window.addEventListener('scroll', () => {
        if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
          if (sw) {
            sw = false;
            this.iNow++;
            this.getList();
          }
        }
        this.isBack = document.body.scrollTop > 300 ? true : false;
      });
    },
    methods: {
      //去掉所有的html标记
      delHtmlTag(str) {
        return str.replace(/<[^>]+>/g, "");
      },
      //查询数据
      getList() {
        this.loading = true;
        query.descending("createdAt");
        query.limit(10);
        query.skip(this.iNow * 10);
        query.find({
          success: (results) => {
            this.loading = false;
            for (let i = 0; i < results.length; i++) {
              let object = results[i];
              let detail = this.delHtmlTag(object.get('detail'));
              let year = object.createdAt.substring(0,4);
              let md = object.createdAt.substring(5,10);
              this.detail.push({
                'id': object.id,
                'title': object.get('title'),
                'type': object.get('type'),
                'look': object.get('look'),
                'detail': detail.length > 70 ? detail.substring(0, 70) + "..." : detail,
                'year': year,
                'md':md
              })
            }
          },
          error: (error) => {
            alert("查询失败: " + error.code + " " + error.message);
          }
        });
      },
      backTop() {
        window.scrollTo(0, 0);
        this.isBack = false;
      }
    },
    components: {
      loading
    }
  }
</script>
