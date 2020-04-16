<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: Dark)").matches;

    if (prefersDark) {
      document.getElementsByTagName("html")[0].classList.add("darkmode");
    }

    if (this.$cookie.get("school_token")) {
      axios
        .get(`${this.$store.state.url}/school`)
        .then(res => {
          this.$store.commit(
            "admin/changeAccess",
            res.data.data.school.ADMIN_CODE
          );
          this.$store.commit(
            "school/addClass",
            res.data.data.school.CLASS_INFO
          );
          this.$store.commit("school/addName", res.data.data.school.NAME);

          if (res.data.data.school.ADMIN_CODE === this.$cookie.get("access")) {
            axios.defaults.headers.common["access_code"] = this.$cookie.get(
              "access"
            );
            this.$store.commit("admin/changeAdmin", true);
          }
        })
        .catch(() => {
          alert("알 수 없는 오류가 발생했습니다.");
          this.$router.push({ path: "/close" });
        });
    }
  }
};
</script>

<style lang="scss">
@import url("~/assets/style/common.scss");

html {
  font-family: "Noto Sans Korean", sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  font-weight: 400;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
