<template>
  <div class="container">
    <change-grade
      v-if="change_popup"
      @onClose="changeClose"
      :grade="grade"
      :room="room"
    />
    <h1>{{ name }}</h1>
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
      <tr
        v-for="(day, index) in days"
        :key="index"
        :class="{ tt_height: true, today: getToday(index + 1) }"
      >
        <td class="day_of_week">{{ day }}</td>
        <td
          @click="onClick(subject, day, index)"
          :class="{ subject_cell: true, now: getSubject(day, index + 1) }"
          v-for="(subject, index) in getWeek(day)"
          :key="index"
        >
          <span v-if="subject.subject" class="tt_subject">{{
            subject.subject
          }}</span>
          <br />
          <span v-if="subject.teacher">{{ subject.teacher }}</span>
          <br />
          <span class="link_area">
            <a
              target="_blank"
              :href="subject.video_url"
              v-if="subject.video_url"
              class="link"
            >
              <img class="time_img" src="~/assets/zoom.png" alt="video" />
            </a>
            <a
              target="_blank"
              :href="subject.classroom_url"
              v-if="subject.classroom_url"
              class="link"
            >
              <img
                class="time_img"
                src="~/assets/classroom.png"
                alt="classroom"
              />
            </a>
          </span>
        </td>
      </tr>
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
    },
    name() {
      return this.$store.state.school.name;
    }
  },
  mounted() {
    this.getTimeTable();
    this.getDate();
  },
  methods: {
    getDate() {
      this.today = new Date();
      setTimeout(() => {
        this.getDate();
      }, 1000);
    },
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
        this.$router.push({ path: "/select" });
      }
    },
    getWeek(day) {
      if (day === "월") {
        return this.time_table.slice(0, 7);
      } else if (day === "화") {
        return this.time_table.slice(7, 14);
      } else if (day === "수") {
        return this.time_table.slice(14, 21);
      } else if (day === "목") {
        return this.time_table.slice(21, 28);
      } else if (day === "금") {
        return this.time_table.slice(28, 35);
      }
    },
    getToday(idx) {
      if (idx === this.today.getDay()) {
        return true;
      } else if (this.today.getDay() > 5 && idx === 1) {
        return true;
      }
    },
    getRealToday(day) {
      const week = new Array("일", "월", "화", "수", "목", "금", "토");
      if (day === week[this.today.getDay()]) {
        return true;
      }
      return false;
    },
    getSubject(day, time) {
      let end, start;
      if (time === 1) {
        end = { hour: 9, min: 30 };
        start = { hour: 0, min: 0 };
      } else if (time === 2) {
        end = { hour: 10, min: 30 };
        start = { hour: 9, min: 30 };
      } else if (time === 3) {
        end = { hour: 11, min: 30 };
        start = { hour: 10, min: 30 };
      } else if (time === 4) {
        end = { hour: 12, min: 30 };
        start = { hour: 11, min: 30 };
      } else if (time === 5) {
        end = { hour: 14, min: 10 };
        start = { hour: 12, min: 30 };
      } else if (time === 6) {
        end = { hour: 15, min: 10 };
        start = { hour: 14, min: 10 };
      } else if (time === 7) {
        end = { hour: 16, min: 10 };
        start = { hour: 15, min: 10 };
      }
      if (this.today.getDay() > 5 && time === 1 && day === "월") {
        return true;
      } else if (this.getRealToday(day)) {
        if (
          (start.hour < this.today.getHours() ||
            (start.hour === this.today.getHours() &&
              start.min < this.today.getMinutes())) &&
          (end.hour > this.today.getHours() ||
            (end.hour === this.today.getHours() &&
              end.min > this.today.getMinutes()))
        ) {
          return true;
        }
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
  width: 18px;
  cursor: pointer;
  margin-right: 20px;
  align-self: center;
  @media screen and (max-width: 450px) {
    width: 18px;
  }
  @media screen and (max-width: 350px) {
    width: 15px;
  }
}

.link_area {
  margin: 0 auto;
  margin-top: 13px;
  text-align: center;
  display: block;
  width: 60%;
  position: relative;
  @media screen and (max-width: 630px) {
    padding-top: 5px;
  }
}

.time_img {
  width: 100%;
  max-width: 25px;
  margin: 2px;
  @media screen and (max-width: 450px) {
    max-width: 20px;
  }
}

.container {
  text-align: center;
  h1 {
    color: #dfdf13;
    font-size: 19px;
    margin-top: 20px;
  }
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $footer-color;
    color: var(--footer-color);
    text-align: center;
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 16px;
    margin-top: 15px;
    @media screen and (max-width: 450px) {
      font-size: 16px;
    }
    @media screen and (max-width: 360px) {
      font-size: 14px;
    }
  }
}

table {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  border-collapse: collapse;
  color: $tb-color;
  color: var(--tb-color);
  text-align: center;
  position: relative;
  background-color: $box-color;
  background-color: var(--box-color);
  overflow: hidden;
}

.now {
  border: 3px solid rgb(194, 21, 21) !important;
  z-index: 5;
}

table,
td,
tr {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border-collapse: collapse;
  font-size: 14px;
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
  width: 120px;
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
  padding: 5px;
  &:hover {
    background-color: $tb-week;
    background-color: var(--tb-week);
  }
}

.tt_time {
  background-color: $tb-week;
  background-color: var(--tb-week);
  width: 150px;
}

.clock {
  @media screen and (max-width: 830px) {
    display: none;
  }
}

.tt_height {
  height: 100px;
  @media screen and (max-width: 600px) {
    height: 130px;
  }
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
// .link {
//   color: $btn-blue;
//   color: var(--btn-blue);
//   display: inline-block;
//   position: relative;
//   width: 30%;
//   margin: 3px;
//   @media screen and (max-width: 630px) {
//     width: 30%;
//     margin-top: 2px;
//   }
//   @media screen and (max-width: 450px) {
//     width: 40%;
//     margin-top: 2px;
//   }
// }
</style>