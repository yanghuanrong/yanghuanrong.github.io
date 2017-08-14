<template>
	<div class="admin">
    <div class="header">
      <div class="wrap flex">
        <h3>写文章 <small>好记性，不如烂笔头</small></h3>
      </div>
      <div class="bar">
        <div>
          <button class="submit" :disabled="!commit" :class="{active:commit}" @click="push">发布</button>
        </div>
        <div class="more">
          <span class="menu"><i class="icon-more"></i></span>

        </div>
      </div>
    </div>

    <div class="wrap edit-detail">
      <div class="photo">
        <div class="cover-wrap">
          <i class="icon-cover"></i>
          <input type="file" class="cover-upload" name="upload_file" accept=".jpeg, .jpg, .png">
        </div>
      </div>

      <input type="text" class="detail-title" placeholder="请输入标题" v-model="title" >

      <quill-editor class="editor-container"
                    v-model="content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @change="onEditorChange($event)"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
      </quill-editor>

    </div>

	</div>
</template>

<script>
	export default {
    data () {
      return {
        title:'',
        content: '',
        commit:false,
        editorOption: {
          placeholder: '请输入正文',
        }
      }
    },
		created() {
			var currentUser = Bmob.User.current();
			if(!currentUser) {
				this.$router.push('/login');
				return;
			}
		},
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
      // you can use current editor object to do something(quill methods)
      console.log('this is current quill instance object', this.editor)
    },
		methods: {
			loginOut() {
				Bmob.User.logOut();
				this.$router.push('/');
			},
      input() {
        this.commit = this.title && this.content ? true : false ;
      },
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      onEditorChange({ editor, html, text }) {
        this.input()
        this.content = html
      },
      push(){
			  console.log(this.title,this.content)
      }
		}
	}
</script>

<style>

</style>
