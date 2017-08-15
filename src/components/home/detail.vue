<template>
  <div class="detail-wrap">
    <div class="loading-wrap">
      <loading v-if="loading"></loading>
    </div>
    <div class="detail-body" v-if="!loading">
      <div class="close" @click="close"><i class="icon-close"></i></div>
      <div class="detail-img" v-if="detail.pic" :style="detail.pic"></div>
      <h1 class="detail-title">{{detail.title}}</h1>
      <div class="detail-author" v-if="detail.author">
        <img :src="detail.author.photo"/> {{detail.author.name}} - {{detail.createdAt}}
      </div>
      <div class="detail-article" v-html="detail.detail"></div>
      <div class="detail-look">
        <span>{{detail.look}}</span>
        <p>人气</p>
      </div>
      <div class="column-title">
        <span>{{message.length}}条评论</span>
        <i></i>
      </div>
      <dl class="detail-msg">
        <dt><img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2401881700,2342273471&fm=58"/></dt>
        <dd>
          <input type="text" placeholder="填写姓名" v-model="name" @keyup="input"/>
          <textarea rows="3" id="msg" v-model="contont" @keyup="input"></textarea>
          <div class="detail-btn">
            <button class="submit" :disabled="!commit" :class="{active:commit}" @click="push">评论</button>
          </div>
        </dd>
      </dl>
      <div class="detail-msg-list">
        <dl v-for="item in message">
          <dt><img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2401881700,2342273471&fm=58"/></dt>
          <dd>
            <span>{{item.createdAt}}</span>
            <b>{{item.name}}</b>
            <p>{{item.contont}}</p>
          </dd>
        </dl>
      </div>
    </div>
  </div>

</template>

<script type="text/javascript">
  import loading from '@/components/public/loading'

  export default {
    name: "detail",
    data() {
      return {
        detailId: "",
        loading: true,
        post: null,
        detail: {},
        name: "",
        contont: "",
        commit: false,
        message: [],
      }
    },
    created() {
      //获取文章id
      this.fetchData();

      //查询文章
      let detail = Bmob.Object.extend("detail");
      let query = new Bmob.Query(detail);
      query.include("user");
      query.get(this.detailId, {
        success: (object) => {
          //浏览次数增加
          let look = object.get('look') + 1 ;
          object.set('look', look);
          object.save();

          let pic = object.get('pic') ? {
            "background-image": `url(${object.get('pic')})`
          } : false;

          //赋值渲染数据
          this.detail = {
            'id': object.id,
            'title': object.get('title'),
            'type': object.get('type'),
            'pic': pic,
            'look':look,
            'detail': object.get('detail'),
            'createdAt': object.createdAt,
            'author': {
              'photo': object.get('user').attributes.photo,
              'name': object.get('user').attributes.name,
            }
          };

          this.loading = false;
        },
        error: (object, error) => {
        }
      });

      //查询评论
      let message = Bmob.Object.extend("message");
      let diary = new Bmob.Query(message);
      diary.equalTo("detail", this.$route.params.id);
      diary.find({
        success: (results) => {
          for (let i = 0; i < results.length; i++) {
            let res = results[i];
            this.message.push({
              'createdAt': res.createdAt,
              'name': res.get('name'),
              'contont': res.get('contont')
            })
          }
        },
        error: (error) => {
          alert("查询失败: " + error.code + " " + error.message);
        }
      });
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData() {
        this.detailId = this.$route.params.id;
      },
      close() {
        this.$router.push('/home');
      },
      //判断是否可以提交
      input() {
        this.commit = this.name && this.contont ? true : false ;
      },
      //提交评论
      push() {
        let msg = Bmob.Object.extend('message');
        let diary = new msg();
        diary.set('name', this.name);
        diary.set('contont', this.contont);
        let post = Bmob.Object.createWithoutData('detail', this.$route.params.id);
        diary.set('detail', post);
        diary.save(null, {
          success: (res) => {
            this.message.push({
              'createdAt': res.createdAt,
              'name': res.get('name'),
              'contont': res.get('contont')
            })
            this.contont = "";
            this.commit = false;
          },
          error: (gameScore, error) => {
          }
        });
      }
    },
    components: {
      loading
    }

  }
</script>
