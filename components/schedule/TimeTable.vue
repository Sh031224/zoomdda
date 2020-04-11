<template>
  <div class="container">
    <change-grade
      v-if="change_popup"
      @onClose="changeClose"
      :grade="grade"
      :room="room"
    />

    <span class="title">
      <img
        @click="change"
        class="change__img"
        src="~/assets/change.png"
        alt="change"
      />
      {{ grade }}학년 {{ room }}반 시간표
    </span>
    <table v-if="!load">
      <tr class="bn">
        <td class="sd"></td>
        <td class="tt_time">1</td>
        <td class="tt_time">2</td>
        <td class="tt_time">3</td>
        <td class="tt_time">4</td>
        <td class="tt_time">5</td>
        <td class="tt_time">6</td>
        <td class="tt_time">7</td>
      </tr>
      <tr class="bn">
        <td class="sd nn"></td>
        <td class="tt_time clock">08:40~09:30</td>
        <td class="tt_time clock">09:40~10:30</td>
        <td class="tt_time clock">10:40~11:30</td>
        <td class="tt_time clock">11:40~12:30</td>
        <td class="tt_time clock">13:20~14:10</td>
        <td class="tt_time clock">14:20~15:10</td>
        <td class="tt_time clock">15:20~16:10</td>
      </tr>
      <tbody v-for="(day, index) in days" :key="index">
        <tr :class="{ tt_height: true, today: getToday(day) }">
          <td rowspan="4" class="day_of_week">{{ day }}</td>
          <td
            @click="onClick(subject, day, index)"
            class="subject_cell"
            v-for="(subject, index) in getWeek(day)"
            :key="index"
          >
            <span class="tt_subject">{{ subject.SUBJECT }}</span>
            <br />
            <span>{{ subject.TEACHER }}</span>
            <br />
            <a
              target="blank"
              :href="subject.ZOOM_ID"
              v-if="subject.ZOOM_ID"
              class="link"
            >
              줌
            </a>
            <br class="br_" />
            <a
              target="blank"
              :href="subject.CLASSROOM"
              v-if="subject.CLASSROOM"
              class="link"
            >
              클래스룸
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <view-table
      v-if="view"
      @onEdit="openEdit"
      @onClose="viewClose"
      :time_table="editing"
    />
    <edit-table
      v-if="edit"
      @onClose="editClose"
      :time_table="editing"
      :day="select"
      :_class="time"
    />
  </div>
</template>

<script>
import axios from "axios";
import EditTable from "~/components/schedule/EditTable";
import ViewTable from "~/components/schedule/ViewTable";
import ChangeGrade from "~/components/schedule/ChangeGrade";
export default {
  name: "TimeTable",
  components: {
    EditTable,
    ViewTable,
    ChangeGrade
  },
  data() {
    return {
      load: true,
      time_table: {},
      days: ["월", "화", "수", "목", "금"],
      edit: false,
      editing: {},
      select: "",
      time: 0,
      view: false,
      today: new Date(),
      change_popup: false
    };
  },
  computed: {
    grade() {
      return this.$cookie.get("grade");
    },
    room() {
      return this.$cookie.get("room");
    }
  },
  mounted() {
    this.getTimeTable();
  },
  methods: {
    async getTimeTable() {
      try {
        const {
          data: {
            data: { time_table }
          }
        } = await axios.get(
          `${this.$store.state.url}/time-table?grade=${this.grade}&room=${this.room}`
        );
        this.time_table = time_table;
        this.load = false;
      } catch (err) {
        console.log(err);
      }
    },
    getWeek(day) {
      if (day === "월") {
        return this.time_table.MON;
      } else if (day === "화") {
        return this.time_table.TUE;
      } else if (day === "수") {
        return this.time_table.WED;
      } else if (day === "목") {
        return this.time_table.THU;
      } else if (day === "금") {
        return this.time_table.FRI;
      }
    },
    getToday(day) {
      const week = new Array("일", "월", "화", "수", "목", "금", "토");
      if (day === week[this.today.getDay()]) {
        return true;
      }
      return false;
    },
    onClick(obj, day, time) {
      this.editing = obj;
      this.select = day;
      this.time = time;
      this.view = true;
    },
    editClose() {
      this.edit = false;
    },
    viewClose() {
      this.view = false;
    },
    openEdit() {
      this.edit = true;
    },
    change() {
      this.change_popup = true;
    },
    changeClose() {
      this.change_popup = false;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/style/color.scss";

.change__img {
  width: 30px;
  cursor: pointer;
  margin-right: 20px;
  align-self: center;
  @media screen and (max-width: 450px) {
    width: 20px;
  }
  @media screen and (max-width: 350px) {
    width: 15px;
  }
}

.container {
  text-align: center;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $footer-color;
    color: var(--footer-color);
    text-align: center;
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 26px;
    margin-top: 50px;
    @media screen and (max-width: 450px) {
      font-size: 16px;
    }
    @media screen and (max-width: 360px) {
      font-size: 14px;
    }
  }
}

table {
  margin: 0 auto;
  border-collapse: collapse;
  color: $tb-color;
  color: var(--tb-color);
  text-align: center;
  position: relative;
  background-color: $box-color;
  background-color: var(--box-color);
  overflow: scroll;
  table-layout: fixed;
}

.br_ {
  display: none;
  @media screen and (max-width: 450px) {
    display: inline;
  }
}

table,
td,
tr {
  font-size: 16px;
  border: 1px solid $tb-border1;
  border: 1px solid var(--tb-border1);
  word-break: break-all;
  word-wrap: break-word;
  @media screen and (max-width: 610px) {
    font-size: 14px;
  }
  @media screen and (max-width: 450px) {
    font-size: 12px;
  }
  @media screen and (max-width: 360px) {
    font-size: 10px;
  }
}

.today {
  border-width: 3px;
}

.day_of_week {
  background-color: $tb-week;
  background-color: var(--tb-week);
  width: 130px;
  font-size: 17px;
  @media screen and (max-width: 700px) {
    width: auto;
    font-size: 16px;
  }
}

.tt_subject {
  background-color: $sj-bg;
  background-color: var(--sj-bg);
  color: $sj-color;
  color: var(--sj-color);
}

.subject_cell {
  cursor: pointer;
  width: 10px;
  &:hover {
    background-color: $tb-week;
    background-color: var(--tb-week);
  }
}

.tt_time {
  background-color: $tb-week;
  background-color: var(--tb-week);
  width: 100px;
}

.clock {
  @media screen and (max-width: 830px) {
    display: none;
  }
}

.tt_height {
  height: 100px;
}

.nn {
  @media screen and (max-width: 830px) {
    display: none;
  }
}

.sd {
  border: none !important;
  background-color: $sd-color;
  background-color: var(--sd-color);
  @media screen and (max-width: 830px) {
    border: 1px solid $tb-border1 !important;
    border: 1px solid var(--tb-border1) !important;
  }
}
.bn {
  border: none !important;
  @media screen and (max-width: 830px) {
    border: 1px solid $tb-border1 !important;
    border: 1px solid var(--tb-border1) !important;
  }
}
.link {
  color: $btn-blue;
  color: var(--btn-blue);
}
</style>