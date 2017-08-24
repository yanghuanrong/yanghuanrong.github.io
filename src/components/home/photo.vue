<template>
  <div class="photo">
    <div class="loading-wrap">
      <loading v-if="loading"></loading>
    </div>
    <div id="listwrap">
      <ul class="photo-list clearfix" id="listUl">
        <li v-for="(item,index) in detail">
          <div class="post-photo">
            <div class="photo-info">
              <span>{{ item.title }}</span>
              <span>{{ item.pic.length }} 张</span>
            </div>
            <img :src="item.pic[0]" alt="">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  let detail = Bmob.Object.extend('photo');
  let query = new Bmob.Query(detail);
  import loading from '@/components/public/loading';

  export default {
    data(){
      return {
        detail:[],
        loading:false,
      }
    },
    created(){
      this.getList();
    },
    methods:{
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

              this.detail.push({
                'id': object.id,
                'title': object.get('title'),
                'type': object.get('type'),
                'pic': object.get('pic'),
                'look': object.get('look'),
                'detail':object.get('detail'),
                'createdAt':object.createdAt
              })
            }
          },
          error: (error) => {
            alert("查询失败: " + error.code + " " + error.message);
          }
        });
      },
    },
    components:{
      loading
    }
  }
</script>

