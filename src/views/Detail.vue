<template>
  <div class="blog">
    <div class="container">
      <component :is="component"></component>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      component: ""
    }
  },
  created(){
    const id = this.$route.params.id
    if(id){
      this.component = id
    } else {
      this.$router.back()
    }
  }  
}
</script>