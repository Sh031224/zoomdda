<template>
  <div id="school-loading" aria-live="polite" role="status">
    <div>Loading...</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      school: parseInt(this.$router.currentRoute.query.school)
    };
  },
  mounted() {
    this.getSchool();
    setTimeout(() => {
      this.getSchoolInfo();
    }, 300);
  },
  methods: {
    async getSchoolInfo() {
      await axios
        .get(`${this.$store.state.url}/school`)
        .then(res => {
          this.$store.commit(
            "admin/changeAccess",
            res.data.data.school.ADMIN_CODE
          );
          this.$store.commit("admin/changeAdmin", false);
          this.$store.commit(
            "school/addClass",
            res.data.data.school.CLASS_INFO
          );
          this.$store.commit("school/addName", res.data.data.school.NAME);
          this.$router.push({ path: "/select" });
        })
        .catch(error => {
          console.log(error);

          alert("알 수 없는 오류가 발생했습니다.");
          this.$router.push({ path: "/close" });
        });
    },
    async getSchool() {
      axios
        .get(`${this.$store.state.url}/auth?school=${this.school}`)
        .then(res => {
          axios.defaults.headers.common["school-token"] =
            res.data.data["school-token"];
          this.$cookie.set("school_token", res.data.data["school-token"], {
            expires: 365
          });
        })
        .catch(() => {
          alert("학교에서 알려준 URL로 접속해주세요.");
          this.$router.push({ path: "/close" });
        });
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/style/color.scss";
@import "~/assets/style/loading.scss";
</style>