<template>
  <div class="photo">
    <div class="loading-wrap">
      <loading v-if="loading"></loading>
    </div>
    <div id="listwrap">
    <waterfall :line-gap="200" :watch="detail" :grow="grow">
      <!-- each component is wrapped by a waterfall slot -->
      <waterfall-slot
        v-for="(item, index) in detail"
        :width="item.pic[0].w"
        :height="item.pic[0].h"
        :order="index"
        :key="item.id"
        :data-id="item.id"
        :data-index="index"
      >
        <div class="post-photo" @click="showPlus(index)">
          <div class="photo-info">
            <span>{{ item.title }}</span>
            <span>{{ item.pic.length }} 张</span>
          </div>
          <div class="photo-img">
            <img :src="item.pic[0].src" alt="">
          </div>
        </div>
      </waterfall-slot>
    </waterfall>
    </div>

    <div class="photo-detail" v-if="showImg != ''">
      <div class="photo-left">
        <div class="photo-list-header">top</div>
        <div class="photo-list-body">
          <img :src="showImg" alt="">
        </div>
        <div class="photo-list-footer">
          <div class="photo-list-scroll" :style="{width:allWidth+'px'}">
            <ul v-for="(item, index) in detail">
              <li v-for="(items, indexs) in item.pic" @click="clickImg(index,indexs)" :class="{active:showImg == items.src}">
                <img :src="items.src" alt="">
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="photo-right">1231</div>
    </div>

  </div>
</template>

<script>
  let detail = Bmob.Object.extend('photo');
  let query = new Bmob.Query(detail);
  import loading from '@/components/public/loading';
  import Waterfall from 'vue-waterfall/lib/waterfall';
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot';

  export default {
    data(){
      return {
        detail:[],
        grow: [2, 2, 3, 2],
        loading:false,
        showImg:""
      }
    },
    created(){
      this.getList();
    },
    computed:{
      allWidth(){
        let iNow = 0;
        for(let i=0; i<this.detail.length; i++){
          iNow += this.detail[i].pic.length
        }
        return iNow * 110
      }
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
      clickImg(parent,child){
        this.showImg = this.detail[parent].pic[child].src;
      },
      showPlus(index){
        console.log(1)
        this.showImg = this.detail[index].pic[0].src;
      }
    },
    components:{
      loading,
      Waterfall,
      WaterfallSlot
    }
  }
</script>

