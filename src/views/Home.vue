<template>
  <div class="home">
    2
    <test></test>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import test from '@blog/test.md'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    test
  }
}
</script>
