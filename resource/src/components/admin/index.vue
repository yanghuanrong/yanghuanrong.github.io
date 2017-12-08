<template>
  <div class="admin">
    <div class="bar">
      <div class="more">
        <span class="menu" @click.stop="menuShow"><i class="icon-more"></i></span>
        <div class="menu-list" :class="{ active:menu }" @click.stop="menuShow">
          <ul>
            <router-link to="/detailPush" tag="li">发文章</router-link>
            <router-link to="/photoPush" tag="li">发照片</router-link>
            <li>关于我</li>
            <li>所有文章</li>
            <li>管理评论</li>
            <li @click="loginOut"><i class="icon-exit"></i> 退出</li>
          </ul>
        </div>
      </div>
    </div>

    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view :Authid="Authid"></router-view>
      </keep-alive>
    </transition>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        Authid:'',
        menu: false,
      }
    },
    created() {
      //判断是否登录，没有登录则返回登录地址
      let currentUser = Bmob.User.current();
      if (!currentUser) {
        this.$router.push('/login');
        return;
      }
      //记录登录objid
      this.Authid = currentUser.id
    },
    mounted() {
      document.onclick = e => {
        this.menu = false
      }
    },
    methods: {
      //退出登录
      loginOut() {
        Bmob.User.logOut();
        this.$router.push('/');
      },
      //菜单显示
      menuShow() {
        this.menu = true;
      },

    }
  }
</script>

<style>

</style>
