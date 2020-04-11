<template>
  <section id="select_box">
    <h1>DGSW</h1>
    <h3>시작하기</h3>
    <div id="form">
      <div class="form_input">
        <input
          @keydown="inputNum(0)"
          v-model="grade"
          type="text"
          maxlength="1"
          required
        />
        <span @click="inputFocus(0)" class="grade_input">학년</span>
      </div>
      <div class="form_input">
        <input
          @keydown="inputNum(1)"
          v-model="room"
          type="text"
          maxlength="1"
          required
        />
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
  methods: {
    onSubmit() {
      if (this.setState()) {
        if (this.teacher) {
          if (this.access === this.$store.state.access) {
            this.$cookie.set("access", this.access, { expires: 365 });
            axios.defaults.headers.common.access_code = this.access;
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
        this.$swal("오류", "학년 또는 반을 입력해주세요.", "error");
      }
    },
    setState() {
      if (this.grade && this.room) {
        return true;
      }
      return false;
    },
    setCookie() {
      this.$cookie.set("grade", this.grade, { expires: 365 });
      this.$cookie.set("room", this.room, { expires: 365 });
    },
    inputNum(idx) {
      const obj = document.getElementsByTagName("input")[idx];
      const number = obj.value.replace(/[^1-3]/g, "");
      if (idx === 0) {
        this.grade = number;
      } else {
        this.room = number;
      }
      obj.value = number;
    },
    inputFocus(idx) {
      document.getElementsByTagName("input")[idx].focus();
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/style/color.scss";

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