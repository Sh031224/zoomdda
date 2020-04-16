<template>
  <div id="view_table">
    <div @click="close" id="view_table__area" />
    <div id="view_table__box">
      <div id="view_table_input">
        <p class="empty" v-if="empty">정보가 없습니다.</p>
        <p v-if="time_table.subject">
          <b>과목</b><br />{{ time_table.subject }}
        </p>
        <p v-if="time_table.teacher">
          <b>담당교사</b><br />{{ time_table.teacher }}
        </p>
        <p v-if="time_table.description">
          <b>상세설명</b><br />{{ time_table.description }}
        </p>
        <p v-if="time_table.video_url || time_table.classroom_url">
          <b>링크 바로가기</b>
          <br />
          <a
            target="blank"
            :href="time_table.video_url"
            v-if="time_table.video_url"
            class="link"
          >
            <img class="zoom_img" src="~/assets/zoom.png" alt="video" />
          </a>
          &nbsp; &nbsp;
          <a
            target="blank"
            :href="time_table.classroom_url"
            v-if="time_table.classroom_url"
            class="link"
          >
            <img
              class="classroom_img"
              src="~/assets/classroom.png"
              alt="classroom"
            />
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
      return this.$store.state.admin.admin;
    }
  },
  data() {
    return {
      empty: false
    };
  },
  mounted() {
    if (
      !this.time_table.classroom_url &&
      !this.time_table.description &&
      !this.time_table.subject &&
      !this.time_table.teacher &&
      !this.time_table.video_id
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

.zoom_img {
  width: 40px;
  margin-top: 10px;
}

.classroom_img {
  margin-top: 10px;
  width: 40px;
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
    text-align: left;
    b {
      font-size: 18px;
      color: $red;
      color: var(--red);
    }
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