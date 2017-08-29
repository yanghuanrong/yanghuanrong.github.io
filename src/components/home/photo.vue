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
            <img :src="item.pic[0].src">
          </div>
        </div>
      </waterfall-slot>
    </waterfall>
    </div>

    <div class="photo-detail" :class="{ active:showImg != '' }">
      <div class="photo-left">
        <div class="photo-list-header">
          <div class="title">{{ title }}</div>
          <div>{{sum}} / {{allsum}}</div>
          <div class="close" @click="closeImg"><i class="icon-close"></i></div>
        </div>
        <div class="photo-list-body" ref="imgWrap">
          <div class="prev" @click="prevImg">
            <i class="icon-angle-left"></i>
          </div>
          <div class="photo-plus-wrap">
            <img :src="showImg" alt="" ref="imgPlus">
          </div>
          <div class="next" @click="nextImg">
            <i class="icon-angle-right"></i>
          </div>
        </div>
        <div class="photo-list-footer">
          <div class="photo-list-scroll" :style="{width:allWidth+'px'}">
            <ul v-for="(item, index) in detail">
              <li v-for="(items, indexs) in item.pic" @click="switchImg(index,indexs)" :class="{active:showImg == items.src}">
                <img :src="items.src" alt="">
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="photo-right"></div>
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
        showImg:"",
        title:"标题",
        allsum:0,
        sum:0,
        parent:null,
        child:null
      }
    },
    created(){
      //获取数据
      this.getList();
    },
    computed:{
      //计算图片列表的宽度
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
      //切换图片
      switchImg(parent,child){
        this.showImg = this.detail[parent].pic[child].src;
        this.title = this.detail[parent].title;
        this.allsum = this.detail[parent].pic.length;
        this.sum = child+1;
        this.parent = parent;
        this.child = child;
      },
      //弹出大图
      showPlus(index){
        this.showImg = this.detail[index].pic[0].src;
        this.title = this.detail[index].title;
        this.allsum = this.detail[index].pic.length;
        this.sum = 1;
        this.parent = index;
        this.child = 0;
        document.body.style="overflow:hidden;";
      },
      //关闭图片
      closeImg(){
        this.showImg = "";
        document.body.style= "";
      },
      nextImg(){

      },
      prevImg(){

      }
    },
    components:{
      loading,
      Waterfall,
      WaterfallSlot
    }
  }
</script>

