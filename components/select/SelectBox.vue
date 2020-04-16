<template>
  <section id="select_box">
    <h1>시작하기</h1>
    <h3>아래 정보를 입력해주세요.</h3>
    <div id="form">
      <div class="form_input">
        <input v-model="grade" type="number" required />
        <span @click="inputFocus(0)" class="grade_input">학년</span>
      </div>
      <div class="form_input">
        <input v-model="room" type="number" required />
        <span @click="inputFocus(1)" class="grade_input">반</span>
      </div>
      <label id="teacher_check">
        <input v-model="teacher" type="checkbox" name="teacher" />
        <span>선생님 입니다.</span>
      </label>
      <div class="underline"></div>
      <transition name="fade">
        <div v-if="teacher" class="form_input">
          <input
            id="access_code_input"
            class="input_red"
            type="text"
            v-model="access"
            required
          />
          <label for="access_code_input" class="grade_input">인증 코드</label>
        </div>
      </transition>
    </div>
    <button @click="onSubmit">다음</button>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "SelectBox",
  data() {
    return {
      grade: "",
      room: "",
      teacher: false,
      access: ""
    };
  },
  computed: {
    admin_code() {
      return this.$store.state.admin.access;
    },
    class() {
      return this.$store.state.school.class;
    }
  },
  mounted() {
    if (this.$cookie.get("grade")) {
      this.grade = this.$cookie.get("grade");
    }
    if (this.$cookie.get("room")) {
      this.room = this.$cookie.get("room");
    }
  },
  methods: {
    onSubmit() {
      if (this.setState()) {
        if (this.teacher) {
          if (this.access === this.admin_code) {
            this.$cookie.set("access", this.access, { expires: 365 });
            axios.defaults.headers.common.access_code = this.access;
            this.$store.state.admin.admin = true;
            this.setCookie();
            this.$router.push({ path: "/" });
          } else {
            this.$swal("오류", "인증 코드가 다릅니다.", "error");
          }
        } else {
          this.setCookie();
          this.$router.push({ path: "/" });
        }
        this.setCookie();
      } else {
        this.$swal("오류", "올바른 학년 또는 반을 입력해주세요.", "error");
      }
    },
    setState() {
      if (
        this.grade > 0 &&
        this.grade <= Object.keys(this.class).length &&
        this.room > 0 &&
        this.room <= this.class[this.grade].length
      ) {
        return true;
      } else {
        return false;
      }
    },
    setCookie() {
      this.$cookie.set("grade", this.grade, { expires: 365 });
      this.$cookie.set("room", this.room, { expires: 365 });
    },
    inputFocus(idx) {
      document.getElementsByTagName("input")[idx].focus();
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/style/color.scss";

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.underline {
  width: 100%;
  height: 20px;
}

.input_red {
  border-color: $in-red !important;
  border-color: var(--in-red) !important;
}

#select_box {
  align-self: center;
  background-color: $box-color;
  background-color: var(--box-color);
  padding: 20px 40px;
  border: 1px solid $tb-border1;
  border: 1px solid var(--tb-border1);
  border-radius: 5px;
  position: relative;
  width: 350px;
  height: 450px;
  @media screen and (max-width: 450px) {
    width: 300px;
  }
  @media screen and (max-width: 320px) {
    width: 280px;
  }
  h1 {
    color: #dfdf13;
    text-align: center;
  }
  h3 {
    margin-top: 10px;
    text-align: center;
    font-weight: 400;
    font-size: 17px;
    color: $footer-color;
    color: var(--footer-color);
  }
  #form {
    margin-top: 20px;
    flex-grow: 1;
    position: relative;
  }
  #teacher_check {
    text-align: left;
    color: $in-color;
    color: var(--in-color);
    span {
      margin-left: 5px;
    }
  }
  button {
    position: absolute;
    display: block;
    width: 70px;
    height: 30px;
    cursor: pointer;
    border: none;
    background-color: $btn-blue;
    border-radius: 3px;
    color: #fff;
    right: 40px;
    bottom: 50px;
    margin-top: 20px;
  }
  .form_input {
    position: relative;
    flex-grow: 1;
    margin-bottom: 20px;
    input {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      border: 1px solid $tb-border1;
      border: 1px solid var(--tb-border1);
      padding: 7px 11px;
      text-align: left;
      font-size: 1em;
      color: $in-color;
      color: var(--in-color);
      background-color: $box-color;
      background-color: var(--box-color);
      @media screen and (max-width: 450px) {
        font-size: 0.8em;
      }
      &:focus {
        outline: none;
        border-width: 2px;
      }
      &:valid {
        border-width: 2px;
      }
    }
    .grade_input {
      position: absolute;
      top: 6px;
      left: 13px;
      transition: 0.2s ease all;
      background-color: $box-color;
      background-color: var(--box-color);
      color: $in-color;
      color: var(--in-color);
      font-size: 1em;
      @media screen and (max-width: 450px) {
        font-size: 0.8em;
        top: 7px;
      }
    }
    input:focus ~ .grade_input {
      position: absolute;
      top: -14px;
      left: 13px;
      @media screen and (max-width: 450px) {
        top: -10px;
      }
    }
    input:valid ~ .grade_input {
      position: absolute;
      top: -14px;
      left: 13px;
      @media screen and (max-width: 450px) {
        top: -10px;
      }
    }
  }
}
</style>