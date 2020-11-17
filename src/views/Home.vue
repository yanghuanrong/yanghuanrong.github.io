<template>
  <div class="home">
    2
    <md0></md0>
    <!-- <test></test> -->
    <HelloWorld/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

const components = {
  HelloWorld
}

// const test = 'test'
// components[test] = () => import('@blog/' + test + '.md');

export default {
  name: 'Home',
  components: components
}
</script>
