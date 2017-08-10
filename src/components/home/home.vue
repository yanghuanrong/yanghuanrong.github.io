<template>
  <div class="blog-list">
    <div class="back-top" @click="backTop" v-if="isBack">Top</div>
    <div>
      <div class="blog-item" v-for="item in detail">
        <p class="source">该话题来自:{{item.type}}</p>
        <div class="blog-title">
          <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
        </div>
        <div class="blog-description">
          <router-link :to="'/detail/'+item.id" class="blog-img" tag="div" v-if="item.pic"
                       :style="item.pic"></router-link>
          <router-link :to="'/detail/'+item.id" class="blog-text" tag="div">
            {{item.detail}}
          </router-link>
        </div>
        <div class="blog-handle">
          <div class="blog-date">{{item.createdAt}}</div>
        </div>
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
        isBack:false,
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
      //查询数据
      getList() {
        this.loading = true;
        query.skip(this.iNow * 4);
        query.limit(4);
        query.find({
          success: (results) => {
            this.loading = false;
            for (let i = 0; i < results.length; i++) {
              let object = results[i];
              let pic = object.get('pic') ? {
                "background-image": `url(${object.get('pic')})`
              } : false;
              this.detail.push({
                'id': object.id,
                'title': object.get('title'),
                'type': object.get('type'),
                'pic': pic,
                'look': object.get('look'),
                'detail': object.get('detail').length > 200 ? object.get('detail').substring(0, 200) + "..." : object.get('detail'),
                'createdAt': object.createdAt
              })
            }
          },
          error: (error) => {
            alert("查询失败: " + error.code + " " + error.message);
          }
        });
      },
      backTop(){
        window.scrollTo(0,0);
        this.isBack = false;
      }
    },
    components: {
      loading
    }
  }
</script>
