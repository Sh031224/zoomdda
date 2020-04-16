<template>
  <div id="school-loading" aria-live="polite" role="status">
    <div>Loading...</div>
  </div>
</template>

<script>
export default {
  mounted() {
    self.close();
  }
};
</script>

<style lang="scss">
@import "~/assets/style/color.scss";
@import "~/assets/style/loading.scss";
</style>
