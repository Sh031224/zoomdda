<template>
  <div id="schedule">
    <header></header>
    <time-table />
    <footer>
      <a href="https://github.com/Sh031224" target="blank">
        © 2020. Sh031224. All rights reserved.
      </a>
      <nuxt-link v-if="!admin" to="/select">
        <span>&nbsp; Admin Login</span>
      </nuxt-link>
    </footer>
  </div>
</template>

<script>
import TimeTable from "~/components/schedule/TimeTable";
export default {
  name: "schedule",
  computed: {
    admin() {
      return this.$store.state.admin.admin;
    }
  },
  components: {
    TimeTable
  }
};
</script>

<style lang="scss">
@import "~/assets/style/color.scss";

html {
  background-color: $bg-color;
  background-color: var(--bg-color);
}

footer {
  text-align: center;
  padding: 1rem;
  a {
    color: $footer-color;
    color: var(--footer-color);
    font-size: 0.8em;
    text-decoration: none;
  }
}
</style>
