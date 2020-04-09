<template>
  <div class="schedule">
    <footer>
      <a href="https://github.com/Sh031224" target="blank">
        © 2020. Sh031224. All rights reserved.
      </a>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "~/assets/style/color.scss";

.schedule {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: $bg-color;
  background-color: var(--bg-color);
}
footer {
  text-align: center;
  a {
    color: $footer-color;
    color: var(--footer-color);
    font-size: 14px;
    text-decoration: none;
  }
}
</style>
