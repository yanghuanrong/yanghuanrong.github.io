<template>
  <div class="admin">
    <div class="header">
      <div class="wrap flex">
        <h4>写文章
          <small>好记性，不如烂笔头</small>
        </h4>
        <div>
          <button class="submit" :disabled="!commit" :class="{active:commit}" @click="push">发布</button>
        </div>
      </div>
      <div class="bar">
        <div class="more">
          <span class="menu"><i class="icon-more"></i></span>

        </div>
      </div>
    </div>

    <div class="wrap edit-detail">
      <div class="photo">
        <div class="cover-wrap">
          <i class="icon-cover"></i>
          <input type="file" class="cover-upload" name="upload_file" accept=".jpeg, .jpg, .png" @change="upload">
        </div>
      </div>

      <div class="edit-title-wrap">
        <div class="input-title">
          <input type="text" class="detail-title" placeholder="请输入标题" v-model="title" @keyup="input">
        </div>

        <div class="select-type">
          <select v-model="select" @change="input">
            <option value="" disabled>请选择</option>
            <option v-for="item in type" :value="item">{{item}}</option>
          </select>
        </div>

      </div>
      <quill-editor class="editor-container"
                    v-model="content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @change="onEditorChange($event)">
      </quill-editor>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        Authid:'',
        title: '',
        content: '',
        pic: '',
        commit: false,
        type:['vue','js','css','html','react'],
        select:"",
        editorOption: {
          placeholder: '请输入正文',
        }
      }
    },
    created() {
      var currentUser = Bmob.User.current();
      if (!currentUser) {
        this.$router.push('/login');
        return;
      }
      this.Authid = currentUser.id
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    methods: {
      loginOut() {
        Bmob.User.logOut();
        this.$router.push('/');
      },
      input() {
        this.commit = this.title && this.content && this.select ? true : false;
      },
      onEditorChange({editor, html, text}) {
        this.input();
        this.content = html
      },
      upload(e){
        //查询文章
        let detail = Bmob.Object.extend("detail");
        let query = new Bmob.Query(detail);

        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        let img = new Image();
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function(e){
          let mb = (e.total/1024)/1024;
          if(mb>= 2){
            alert('文件大小大于2M');
            return;
          }

          let uploadfile = new Bmob.File("logo.jpg", files[0]);
          uploadfile.save().then(function(obj) {
            console.log(obj.url())
          }, function(error) {
            console.log(error)
          });;

          console.log(this.result);
        }
      },
      push() {
        let detail = Bmob.Object.extend('detail');
        let diary = new detail();
        diary.set('title', this.title);
        diary.set('detail', this.content);
        diary.set('pic', this.pic);
        diary.set('look', 0);
        diary.set('type', this.select);

        var post = Bmob.Object.createWithoutData("User", this.Authid);
        diary.set("user", post);

        diary.save(null, {
          success: (res) => {
            console.log(res)
          },
          error: (gameScore, error) => {
            alert("发布失败")
          }
        });
      }
    }
  }
</script>

<style>

</style>
