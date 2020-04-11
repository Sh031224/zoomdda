<template>
  <div id="select">
    <select-box />
    <footer>
      <a href="https://github.com/Sh031224" target="blank">
        © 2020. Sh031224. All rights reserved.
      </a>
    </footer>
  </div>
</template>

<script>
import SelectBox from "~/components/select/SelectBox";
export default {
  name: "Select",
  components: {
    SelectBox
  }
};
</script>

<style lang="scss">
@import "~/assets/style/color.scss";

#select {
  min-height: 100vh;
  display: flex;
  display: -webkit-box;
  display: -ms-flexbox;
  flex-direction: column;
  -ms-flex-direction: column;
  -webkit-box-orient: vertical;
  text-align: center;
  background-color: $bg-color;
  background-color: var(--bg-color);
  &::before,
  &::after {
    min-height: 30px;
    display: block;
    content: "";
    height: 50%;
    flex-grow: 1;
  }
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
