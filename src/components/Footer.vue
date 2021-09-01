<template>
  <footer class="footer">
    <div class="status">© 2012 - {{ year }}</div>
  </footer>
</template>

<script>
export default {
  data() {
    const year = new Date().getFullYear();
    return {
      year,
    };
  },
};
</script>
