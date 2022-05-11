<template>
  <div>
    <div class="text-center mb-2">
      <small class="d-block"
        >{{ formatDateShort(roundstartdate) }} -
        {{ formatDateShort(roundenddate) }}</small
      >
    </div>

    <vue-meeting-selector
      class="simple-example__meeting-selector pb-3"
      v-model="meeting"
      :date="date"
      :loading="loading"
      :meetings-days="meetingsDays"
      @next-date="nextDate"
      @previous-date="previousDate"
      :calendarOptions="calendarOptions"
      :multi="true"
    >
      <template #header="{ meetings }">
        <div class="title">
          <b-button
            :variant="isWeekend(meetings) ? 'danger' : 'warning'"
            class="p-1 dateButton"
            @click="selectMeeting(meetings)"
          >
      
            <small class="d-block day"> {{ dateSanitizerWeekday(meetings) }}</small>
            <span class="d-block">
              {{ dateSanitizerDay(meetings) }}
            </span>
            <small class="d-block month">
              {{ dateSanitizerMonth(meetings) }}
            </small>
          </b-button>
        </div>
      </template>

      <template #meeting="{ meeting }">
        <div
          v-if="meeting.date"
          class="meeting shadow-sm"
          :class="meetingSelectedClass(meeting)"
          @click="selectMeeting(meeting)"
        >
          {{ formatDate(meeting.date) }}
        </div>
        <div v-else class="meeting--empty">&mdash;</div>
      </template>

      <template #button-previous>
        <b-button
          @click="previousDate"
          :disabled="disableBack"
          variant="outline-primary"
          class="p-1"
          pill
        >
          <i class="fa fa-arrow-left"></i>
        </b-button>
      </template>

 

      <template #button-next class="text-danger">
           <b-button
              @click="nextDate"
              :disabled="disableFront"
              variant="outline-primary"
              class="p-1 "
              pill
            >
              <i class="fa fa-arrow-right"></i>
            </b-button>
     

     

      </template> 
      
    
    </vue-meeting-selector>

    <small
      v-for="date in proposedDates"
      :key="date.index"
      :value="date.value"
      class="d-block text-left text-uppercase position-relative pl-4 pt-1"
    >
      <i class="material-icons">event_available</i>
      <span>{{ formatDateLong(date) }}</span>
      <span class="float-right mr-3" @click="selectMeeting(date)">
        <i class="material-icons h6">close</i>
      </span>
      <hr class="underline" />
    </small>

    <b-button variant="outline-primary" size="sm" @click="confirmDates"
      ><small>Skicka datum</small></b-button
    >
    <b-button
      :disabled="!meeting.length"
      variant="danger"
      class="ml-1"
      size="sm"
      @click="clearDates"
      ><small>Rensa datum</small></b-button
    >
  </div>
</template>

<script>
import VueMeetingSelector from "vue-meeting-selector";
import moment from "moment";
import { globalState } from "../main.js";

moment.locale("sv");

moment.updateLocale("sv", {
  relativeTime: {
    future: "om %s",
    past: "%s",
    ss: "%d sek",
    m: "1 minut",
    mm: "%d min",
    h: "en timme",
    hh: "%d timmar",
    d: "en dag",
    dd: "%d dagar",
    M: "en månad",
    MM: "%d mån",
    y: "ett år",
    yy: "%d år",
  },
});

export default {
  name: "App",
  components: {
    VueMeetingSelector,
  },
  props: ["roundstartdate", "roundenddate"],
  data() {
    return {
      date: new Date(),
      loading: true,
      calendarOptions: {
        limit: 3,
      },
      meeting: [],
      numberOfDays: 5,
      daysToDisplayEnd: 5,
      daysToDisplayStart: 0,
      allDays: null,
    };
  },
  methods: {
    saveDates() {
      let gameid = this.$route.query.id;
      if (!gameid) {
        this.$bvToast.toast("Error", {
          title: "Något gick fel",
          autoHideDelay: 5000,
          variant: "danger",
          solid: true,
        });
        return;
      }
      const data = {
        _id: gameid,
        proposeddates: this.proposedDates,
      };
      this.axios
        .post(globalState.admin_url + "updateGame", data)
        .then(() => {
          this.axios
            .post(globalState.admin_url + "getGameData", {
              id: gameid,
            })
            .then((response) => {
              const obj = {
                gamedate: response.data.gamedate,
                gametime: response.data.gametime,
                proposeddates: this.proposedDates,
              };
              this.$emit("updateDate", obj);
              this.$bvToast.toast(
                "Du kommer få ett mail när bortalaget svarat på tiderna.",
                {
                  title: "Datum är skickade",
                  autoHideDelay: 5000,
                  variant: "success",
                  solid: true,
                }
              );
            });
        })
        .catch((error) => {
          this.progress = 0;
          this.uploading = false;
          console.log(error);
        });
    },
    confirmDates() {
      this.$bvModal
        .msgBoxConfirm("Datum skickas till bortalaget. Ok?")
        .then((value) => {
          if (!value) {
            return;
          }
          this.saveDates();
        })
        .catch((err) => {
          // An error occurred
        });
    },
    clearDates() {
      this.$bvModal
        .msgBoxConfirm("Ta bort alla valda datum?")
        .then((value) => {
          if (!value) {
            return;
          }
          this.meeting = [];
        })
        .catch((err) => {
          // An error occurred
        });
    },
    meetingSelectedClass(meeting) {
      if (!this.meeting) {
        return "";
      }

      if (this.meeting.includes(meeting)) {
        return "meeting--selected";
      }
      return "";
    },
    selectMeeting(meeting) {
      let checker = (arr, target) => target.every((v) => arr.includes(v));

      if (meeting.slots) {
        if (checker(this.meeting, meeting.slots)) {
          this.meeting = this.meeting.filter((e) => !meeting.slots.includes(e));
          return;
        }

        this.meeting.push(...meeting.slots);
        return;
      }

      if (!this.meeting.includes(meeting)) {
        this.meeting.push(meeting);
      } else {
        const index = this.meeting.indexOf(meeting);
        this.meeting.splice(index, 1);
      }
    },
    nextDate() {
      this.loading = true;

      this.daysToDisplayStart += this.numberOfDays;
      this.daysToDisplayEnd += this.numberOfDays;
      this.loading = false;
    },
    previousDate() {
      this.loading = true;

      this.daysToDisplayStart -= this.numberOfDays;
      this.daysToDisplayEnd -= this.numberOfDays;

      this.loading = false;
    },
    formatDate(date) {
      const currentHour = moment(date).format("HH");

      if (currentHour >= 3 && currentHour < 12) {
        return "FM";
      } else if (currentHour >= 12 && currentHour < 15) {
        return "EM";
      } else {
        return "KV.";
      }
    },
    formatDateLong(date) {
      const timeOfday = this.formatDate(date.date);
      return moment(date.date).format("ddd DD MMM - ") + timeOfday;
    },

    dateSanitizerDay(date) {
      return moment(date.date).format("DD");
    },
    dateSanitizerWeekday(date) {
      return moment(date.date).format("ddd");
    },
    dateSanitizerMonth(date) {
      return moment(date.date).format("MMM");
    },
    formatDateShort(date) {
      return moment(date).format("D/M");
    },
    isWeekend(date) {
      const dayOfWeek = moment(date.date).isoWeekday();
      if (dayOfWeek === 6 || dayOfWeek === 7) {
        return true;
      }
      return false;
    },
  },
  async created() {
    const today = moment(new Date());
    const start = this.roundstartdate;
    const end = this.roundenddate;

    var getDaysBetweenDates = function (startDate, endDate) {
      var now = startDate.clone();
      let dates = [];

      while (now.isSameOrBefore(endDate)) {
        dates.push(now.toJSON());
        now.format("YYYY-MM-DD");
        now.add(1, "days");
      }
      return dates;
    };
    var getHoursBetweenDates = function (startDate, endDate) {
      var now = startDate.clone();
      let dates = [];

      while (now.isSameOrBefore(endDate)) {
        dates.push({ date: now.toJSON() });
        now.format("YYYY-MM-DD");
        now.add(5, "hour");
      }
      return dates;
    };

    const startDate = moment(start);
    const endDate = moment(end);

    const dateList = getDaysBetweenDates(startDate, endDate);

    const filtred = dateList
      .filter((date) => moment(date).isAfter(today, "day"))
      .reduce((array, date) => {
        const start = moment(date).add(6, "hours");
        const end = moment(date).add(20, "hours");

        const hours = getHoursBetweenDates(start, end);

        const obj1 = {
          date: date,
          slots: hours,
        };
        array.push(obj1);
        return array;
      }, []);

    this.allDays = filtred;

    this.loading = false;
  },
  computed: {
    meetingsDays: {
      get() {
        return this.allDays.slice(
          this.daysToDisplayStart,
          this.daysToDisplayEnd
        );
      },
      set() {
        return this.allDays.slice(
          this.daysToDisplayStart,
          this.daysToDisplayEnd
        );
      },
    },
    disableFront() {
      const copy = this.allDays.slice(
        this.daysToDisplayStart + this.numberOfDays,
        this.daysToDisplayEnd + this.numberOfDays
      );

      if (!copy.length) {
        return true;
      }
      return false;
    },
    disableBack() {
      const copy = this.allDays.slice(
        this.daysToDisplayStart - this.numberOfDays,
        this.daysToDisplayEnd - this.numberOfDays
      );

      if (!copy.length) {
        return true;
      }
      return false;
    },
    proposedDates() {
      return this.meeting.sort(
        (a, b) =>
          moment(a.date).format("YYYYMMDD") - moment(b.date).format("YYYYMMDD")
      );
    },
  },
};
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";

>>> .tab__pagination__button {
  display: none;
}
.slots-example {
  &__meeting-selector {
    max-width: 542px;
  }
}
.title {
  margin: 0 5px;
}
.meeting {
  display: inline-block;
  padding: 6px;
  margin: 5px 4px;
  border: solid 2px #ffda6e;
  border-radius: 4px;
  font-size: 0.9rem;
  color: black;
  cursor: pointer;
  &--selected {
    background-color: #ffda6e;
    color: eee;
  }
  &--empty {
    display: inline-block;
    padding: 5px;
    margin: 5px 0;
    cursor: not-allowed;
  }
}
.button-pagination {
  border: none;
  padding: 0;
  width: 30px;
}
// since our scss is scoped we need to use ::v-deep
::v-deep .loading-div {
  top: 32px !important;
}

.underline {
  margin-top: 4px;
  margin-bottom: 6px;
}

.dateButton {
  line-height: 1;
  font-weight: 800;
  font-size: 1.1rem !important;
}
.dateButton:hover {
  color: white !important;
}

.day,
.month {
  font-size: 0.7rem;
  line-height: 1.2;
  font-weight: 200;
}



</style>

