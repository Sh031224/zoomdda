<template>
  <div id="change_grade">
    <div @click="close" id="change_grade__area" />
    <div id="change_grade__box">
      <div class="form_input">
        <input
          v-model="new_grade"
          @keydown="inputNum(0)"
          @keydown.enter="inputNext(0)"
          type="text"
          maxlength="1"
          required
        />
        <span @click="inputFocus(0)" class="grade_input">학년 <b>*</b></span>
      </div>
      <div class="form_input">
        <input
          v-model="new_room"
          @keydown="inputNum(1)"
          @keydown.enter="inputNext(1)"
          type="text"
          maxlength="1"
          required
        />
        <span @click="inputFocus(1)" class="grade_input">반 <b>*</b></span>
      </div>
      <button @click="close" class="cancel">취소</button>
      <button @click="onSubmit">완료</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    grade: {
      Type: Number,
      required: true
    },
    room: {
      Type: Number,
      required: true
    }
  },
  data() {
    return {
      new_grade: this.grade,
      new_room: this.room
    };
  },
  mounted() {
    document.getElementsByTagName("input")[0].select();
  },
  methods: {
    inputFocus(idx) {
      document.getElementsByTagName("input")[idx].select();
    },
    close() {
      this.$emit("onClose");
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
    onSubmit() {
      if (this.new_grade && this.new_room) {
        this.$cookie.set("grade", this.new_grade, { expires: 365 });
        this.$cookie.set("room", this.new_room, { expires: 365 });
        history.go(0);
      }
    },
    inputNext(idx) {
      if (idx === 0) {
        document.getElementsByTagName("input")[idx + 1].select();
      } else {
        this.onSubmit();
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/style/color.scss";

#change_grade {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  .cancel {
    background-color: #5f6368;
  }
  &__area {
    position: fixed;
    z-index: 9;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  &__box {
    z-index: 100;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: auto;
    background-color: $box-color;
    background-color: var(--box-color);
    box-shadow: 0px 0px 30px #00000065;
    padding: 40px;
    @media screen and (max-width: 520px) {
      width: 300px;
    }
    @media screen and (max-width: 350px) {
      width: 270px;
    }
    button {
      margin-left: 20px;
      display: block;
      width: 60px;
      height: 25px;
      cursor: pointer;
      border: none;
      background-color: $btn-blue;
      border-radius: 3px;
      color: #fff;
      margin-top: 10px;
      float: right;
    }
    .form_input {
      position: relative;
      flex-grow: 1;
      margin-bottom: 30px;
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
        @media screen and (max-width: 350px) {
          height: 30px;
        }
        &:focus {
          outline: none;
          border-color: $in-color2;
          border-color: var(--in-color2);
        }
        &:valid {
          border-color: $in-color2;
          border-color: var(--in-color2);
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
        @media screen and (max-width: 350px) {
          top: 5px;
        }
        b {
          color: #d85a5a;
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
}
</style>