<template>
  <div>
    <div class="header">
      <div class="wrap flex">
        <h4>发照片
          <!--<small>最美不过夕阳红</small>-->
        </h4>
        <div>
        </div>
      </div>
    </div>

    <div class="wrap">
      <div class="photo-row">
        <p>标题</p>
        <input type="text" class="title">
      </div>
      <div class="photo-row">
        <p>标题</p>
        <textarea placeholder="说说拍摄经历"></textarea>
      </div>
      <input type="file">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    //从父组件中获取作者
    props: {
      Authid: {
        type: String
      }
    },
    created() {
      console.log(this.Authid)
    },
  }
</script>
