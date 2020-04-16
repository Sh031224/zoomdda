<template>
  <div id="edit_table">
    <div @click="close" id="edit_table__area" />
    <div id="edit_table__box">
      <div class="form_input">
        <input v-model="subject" type="text" required />
        <span @click="inputFocus(0)" class="grade_input">과목</span>
      </div>
      <div class="form_input">
        <input v-model="teacher" type="text" required />
        <span @click="inputFocus(1)" class="grade_input">교사</span>
      </div>
      <div class="form_input">
        <input v-model="description" type="text" required />
        <span @click="inputFocus(2)" class="grade_input">설명</span>
      </div>
      <div class="form_input">
        <input v-model="zoom_id" type="text" required />
        <span @click="inputFocus(3)" class="grade_input">실시간</span>
      </div>
      <div class="form_input">
        <input v-model="classroom" type="text" required />
        <span @click="inputFocus(4)" class="grade_input">클래스룸</span>
      </div>
      <button @click="close" class="cancel">취소</button>
      <button @click="onSubmit">완료</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EditTable",
  props: {
    time_table: {
      Type: Object,
      required: true
    },
    _class: {
      Type: Number,
      required: true
    },
    day: {
      Type: String,
      required: true
    }
  },
  computed: {
    grade() {
      return parseInt(this.$cookie.get("grade"));
    },
    room() {
      return parseInt(this.$cookie.get("room"));
    }
  },
  data() {
    return {
      classroom: this.time_table.classroom_url,
      description: this.time_table.description,
      subject: this.time_table.subject,
      teacher: this.time_table.teacher,
      zoom_id: this.time_table.video_url,
      day_of_week: ""
    };
  },
  mounted() {
    if (this.day === "월") {
      this.day_of_week = 0;
    } else if (this.day === "화") {
      this.day_of_week = 1;
    } else if (this.day === "수") {
      this.day_of_week = 2;
    } else if (this.day === "목") {
      this.day_of_week = 3;
    } else if (this.day === "금") {
      this.day_of_week = 4;
    }
  },
  methods: {
    nullCheck() {
      if (this.undefine(this.subject)) this.subject = "";
      if (this.undefine(this.teacher)) this.teacher = "";
      if (this.undefine(this.description)) this.description = "";
      if (this.undefine(this.zoom_id)) this.zoom_id = "";
      if (this.undefine(this.classroom)) this.classroom = "";
    },
    inputFocus(idx) {
      document.getElementsByTagName("input")[idx].focus();
    },
    undefine(value) {
      if (value === undefined) return true;
      return false;
    },
    onSubmit() {
      this.nullCheck();
      axios
        .post(`${this.$store.state.url}/time-table`, {
          school_idx: 0,
          grade: this.grade,
          room: this.room,
          day: this.day_of_week,
          _class: this._class + 1,
          subject: this.subject,
          teacher: this.teacher,
          description: this.description,
          video_url: this.zoom_id,
          classroom_url: this.classroom
        })
        .then(res => {
          history.go(0);
        })
        .catch(error => {
          console.log(error.response);

          this.$emit("onClose");
          this.$swal("오류", "권한이 없습니다.", "error");
        });
    },
    close() {
      this.$emit("onClose");
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/style/color.scss";

#edit_table {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
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
    z-index: 10;
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