<template>
  <div id="view_table">
    <div @click="close" id="view_table__area" />
    <div id="view_table__box">
      <div id="view_table_input">
        <p class="empty" v-if="empty">정보가 없습니다.</p>
        <p v-if="time_table.SUBJECT">과목 : {{ time_table.SUBJECT }}</p>
        <p v-if="time_table.TEACHER">담당교사 : {{ time_table.TEACHER }}</p>
        <p v-if="time_table.CHAPTER">Chapter : {{ time_table.CHAPTER }}</p>
        <p v-if="time_table.TOPIC">주제 : {{ time_table.TOPIC }}</p>
        <p v-if="time_table.DESCRIPTION">
          상세설명 : {{ time_table.DESCRIPTION }}
        </p>
        <p v-if="time_table.ZOOM_ID">
          <a
            target="blank"
            :href="time_table.ZOOM_ID"
            v-if="time_table.ZOOM_ID"
            class="link"
          >
            줌
          </a>
        </p>
        <p v-if="time_table.CLASSROOM">
          <a
            target="blank"
            :href="time_table.CLASSROOM"
            v-if="time_table.CLASSROOM"
            class="link"
          >
            클래스룸
          </a>
        </p>
      </div>
      <button class="btn_cancel" @click="close">닫기</button>
      <button @click="onClick" v-if="admin">수정</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewTable",
  props: {
    time_table: {
      Type: Object,
      required: true
    }
  },
  computed: {
    admin() {
      return this.$store.state.admin;
    }
  },
  data() {
    return {
      empty: false
    };
  },
  mounted() {
    if (
      !this.time_table.CHAPTER &&
      !this.time_table.CLASSROOM &&
      !this.time_table.DESCRIPTTION &&
      !this.time_table.SUBJECT &&
      !this.time_table.TEACHER &&
      !this.time_table.TOPIC &&
      !this.time_table.ZOOM_ID
    )
      this.empty = true;
  },
  methods: {
    close() {
      this.$emit("onClose");
    },
    onClick() {
      this.$emit("onEdit");
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/style/color.scss";

.btn_cancel {
  background-color: #5f6368 !important;
  left: 40px;
}

#view_table {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  &__area {
    position: fixed;
    z-index: 9;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .empty {
    text-align: center;
    color: $in-color;
    color: var(--in-color);
  }
  p {
    color: $tb-color;
    color: var(--tb-color);
    margin-bottom: 20px;
  }
  &__box {
    z-index: 10;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: auto;
    min-height: 400px;
    background-color: $box-color;
    background-color: var(--box-color);
    box-shadow: 0px 0px 30px #00000065;
    padding: 40px;
    padding-bottom: 90px;
    @media screen and (max-width: 520px) {
      width: 300px;
    }
    button {
      position: absolute;
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
      right: 40px;
      bottom: 40px;
    }
  }
}
</style>