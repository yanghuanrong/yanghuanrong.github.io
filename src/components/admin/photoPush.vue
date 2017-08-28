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
        <input type="text" class="title" v-model="title" @keyup="input">
      </div>
      <div class="photo-row">
        <p>作品描述</p>
        <textarea placeholder="说说拍摄经历" rows="4" v-model="content" @keyup="input"></textarea>
      </div>
      <div class="photo-row">
        <p>添加作品</p>
        <div class="btn-wraper" style="position: relative;" id="container">
          <ul class="file-list clearfix">
            <li v-for="(item, index) in momentImg">
              <div class="progress">
                <div class="progress-wrap">
                  <span :class="{ active:callbackImg[index] }"></span>
                </div>
              </div>
              <img :src="item" alt="">
            </li>
            <li id="pickfiles" class="add-img"><i class="icon-add"></i></li>
          </ul>
        </div>
      </div>
      <div class="photo-row">
        <button class="submit" :disabled="!commit" :class="{active:commit}" @click="push">发布</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        momentImg: [],
        callbackImg: [],
        commit:false,
        title:"",
        content:"",
      }
    },
    //从父组件中获取作者
    props: {
      Authid: {
        type: String
      }
    },
    mounted() {
      var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4', //上传模式,依次退化
        browse_button: 'pickfiles', //上传选择的点选按钮，**必需**
        uptoken: 'T6D-Sh74Dp7-1N_gZ2X14MY_PORKAXuhyh7ucawg:nVoiO4H4aV10k2woXnliqyZ9-oo=:eyJzY29wZSI6IndlYnMiLCJkZWFkbGluZSI6NDYzODg3NzI2MSwicmV0dXJuQm9keSI6IntcImtleVwiOiAkKGtleSksIFwiaGFzaFwiOiAkKGV0YWcpLCBcIndcIjogJChpbWFnZUluZm8ud2lkdGgpLCBcImhcIjogJChpbWFnZUluZm8uaGVpZ2h0KX0ifQ==',
        domain: 'http://ov0xnpdna.bkt.clouddn.com/', //bucket 域名，下载资源时用到，**必需**
        get_new_uptoken: false, //设置上传文件的时候是否每次都重新获取新的token
        container: 'container', //上传区域DOM ID，默认是browser_button的父元素，
        max_file_size: '10mb', //最大文件体积限制
        flash_swf_url: 'Moxie.swf', //引入flash,相对路径
        max_retries: 3, //上传失败最大重试次数
        dragdrop: false, //开启可拖曳上传
        drop_element: 'container', //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb', //分块上传时，每片的体积
        auto_start: true, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
          'FilesAdded': (up, files) => {
            for (let file of files) {
              let image = new Image();
              let preloader = new mOxie.Image();
              preloader.onload = () => {
                preloader.downsize(150, 150);
                this.momentImg.push(preloader.getAsDataURL());
              };
              preloader.load(file.getSource());
            }
          },
          'Key': (up, file) => {
            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
            // 该配置必须要在 unique_names: false , save_key: false 时才生效
            let time = new Date().getTime();
            let key = time + ".jpg";
            return key
          },
          'FileUploaded': (up, file, info) => {
            let domain = up.getOption('domain');
            let res = JSON.parse(info.response);
            let sourceLink = domain + res.key; //获取上传成功后的文件的Url
            this.callbackImg.push({
              src:sourceLink,
              w:res.w,
              h:res.h
            });
            this.input();
          },
        }
      });
    },
    methods:{
      input() {
        this.commit = this.title && this.callbackImg.length>0 ? true : false;
      },
      push(){
        let photo = Bmob.Object.extend('photo');
        let diary = new photo();
        diary.set('title', this.title);
        diary.set('detail', this.content);
        diary.set('pic', this.callbackImg);
        diary.set('look', 0);

        var post = Bmob.Object.createWithoutData("User", this.Authid);
        diary.set("user", post);

        diary.save(null, {
          success: (res) => {
            console.log(res)
            alert("发布成功")
          },
          error: (gameScore, error) => {
            alert("发布失败")
          }
        });
      }
    }
  }
</script>
