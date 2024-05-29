<template>
  <div>
    <b-container class ref="register">
      <b-row class="justify-content-center" align-h="center">
        <b-col md="9" id="register" class="mt-4 mt-md-5">
          <h2 class="teaser-header">Booked pickups</h2>
        </b-col>
        <b-col md="3" id="password" class="mt-4 mt-md-5 text-right">
          <b-form @submit.stop.prevent @submit="checkPassword">
            <b-form-input
              v-if="!passwordCheck"
              id="input-password"
              v-model="form.password"
              placeholder="Enter admin password"
            ></b-form-input>
          </b-form>
        </b-col>
      </b-row>
    </b-container>

    <!-- LOADING -->
    <b-container v-if="loading">
      <b-row>
        <b-col class="col-12 mt-5 mb-5 p-5 text-center">
          <span v-if="loading">
            <b-spinner type="grow" class="p-5"></b-spinner><br />
            Loading, please wait...
          </span>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-if="!loading">
      <b-row class="justify-content-center" align-h="center">
        <b-col md="3" class="mt-1">
          <b-form-select
            v-model="day"
            :options="options_day"
            v-on:change="filterDay($event)"
          ></b-form-select>
        </b-col>
        <b-col md="3" class="mt-1">
          <b-form-select
            v-model="driver"
            :options="options_driver"
            v-on:change="filterDriver($event)"
          ></b-form-select>
        </b-col>
         <b-col md="3" class="mt-2">
             <b-form-checkbox v-model="hide_old" @click="loadTable();" name="check-button" switch>
      Hide old bookings
    </b-form-checkbox>
         </b-col>
       
        <b-col md="3" class="text-right mt-1">
          <b-button
            @click="loadTable()"
            variant="secondary"
            size="sm"
            v-b-tooltip.hover
            title="Refresh data"
          >
            <i class="fa fa-arrows-rotate"></i>
          </b-button>
        </b-col>

         <b-col md="12" class="text-right">
          <span v-if="dataUpdated" class="small text-success"
            >Data updated</span
          >
        </b-col>

        <b-col md="12" id="register" class="mt-4 mt-md-5">
          <!-- <b-table striped hover :fields="fields" :items="bookedSlots"></b-table> -->

          <!-- v-for="(game,idx2) in games2" :key="idx2" -->

          <b-table
            striped
            hover
            :fields="fields"
            :items="bookedSlots"
            responsive="sm"
          >
            <!-- A virtual column -->
            <template #cell(_id)="data">
              {{ data.value._id }}
            </template>

            <template #cell(pickup_day)="data">
              {{ stripDay(data.item.pickup_day) }}
            </template>

            <!-- A virtual composite column -->
            <template #cell(driver)="data">
              <span v-if="!passwordCheck">
                {{ data.item.driver }}
              </span>
              <b-form-select
                class="selectDriver"
                v-if="passwordCheck"
                v-model="data.item.driver"
                :options="options_driver"
                v-on:change="
                  onDriverItemSelected(
                    $event,
                    bookedSlots[data.index]._id,
                    data.index
                  )
                "
              ></b-form-select>
            </template>

            <template #cell(action)="data">
              <div class="text-center" style="min-width: 100px">
                <!--   <b-button v-if="passwordCheck" variant="danger" size="sm"
                 @click="deleteSlot(bookedSlots[data.index]._id)"
                 >
                  <i class="fa fa-trash"></i>
                 </b-button> -->
                <span v-if="passwordCheck">
                  <b-button
                    variant="danger"
                    size="sm"
                    @click="confirmDelete(bookedSlots[data.index]._id)"
                    ><i class="fa fa-trash"></i
                  ></b-button>
                  <b-button
                    v-if="bookedSlots[data.index].comment"
                    v-b-tooltip.hover
                    :title="bookedSlots[data.index].comment"
                    variant="success"
                    size="sm"
                    @click="showCommentModal(bookedSlots[data.index]._id)"
                    ><i class="fa fa-comment"></i
                  ></b-button>
                  <b-button
                    v-else
                    variant="secondary"
                    size="sm"
                    @click="showCommentModal(bookedSlots[data.index]._id)"
                    ><i class="fa fa-comment"></i
                  ></b-button>
                </span>

                <span v-if="!passwordCheck">
                  <i
                    v-if="bookedSlots[data.index].comment"
                    v-b-tooltip.hover
                    :title="bookedSlots[data.index].comment"
                    class="fa fa-comment text-success"
                  ></i>
                </span>
              </div>
            </template>

            <!-- Optional default data cell scoped slot -->
            <template #cell()="data">
              {{ data.value }}
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>

    <b-modal id="modalPopover" title="Modal with Popover" ok-only>
      <p>
        This
        <b-button v-b-popover="'Popover inside a modal!'" title="Popover"
          >Button</b-button
        >
        triggers a popover on click.
      </p>
      <p>
        This <a href="#" v-b-tooltip title="Tooltip in a modal!">Link</a> will
        show a tooltip on hover.
      </p>
    </b-modal>
  </div>
</template>



<script>
import { mapGetters } from "vuex";
import { tagsMixin } from "../mixins/tagsMixin";
import { globalState } from "../main.js";

export default {
  name: "BookedPickups",
  components: {},
  data() {
    return {
      hide_old: true,
      comment: "my comment",
      day: "all",
      driver: "all",
      form: {
        password: null,
      },
      dataUpdated: false,
      passwordCheck: false, //false default
      loading: false,
      bookedSlots: [],
      bookedSlotsOrg: [],
      options_driver: [
        { value: "all", text: "No driver", disabled: false },
        { value: "Ammi Brink", text: "Ammi Brink" },
        { value: "Anders Lövstedt", text: "Anders Lövstedt" },
        { value: "Anders Malmros", text: "Anders Malmros" },
        { value: "Bengt Karlsson", text: "Bengt Karlsson" },
        { value: "Bertil Andersson", text: "Bertil Andersson" },
        { value: "Birgitta Grytt", text: "Birgitta Grytt" },
        { value: "Börje Sjöholm", text: "Börje Sjöholm" },
        { value: "Fredrik Granholm", text: "Fredrik Granholm" },
        { value: "Göran Leghammar", text: "Göran Leghammar" },
        { value: "Göran Stenberg", text: "Göran Stenberg" },
        { value: "Gunnar Brink", text: "Gunnar Brink" },
        { value: "Hans Karlsson", text: "Hans Karlsson" },
        { value: "Harald Nabseth", text: "Harald Nabseth" },
        { value: "Jonny Wiik", text: "Jonny Wiik" },
        { value: "Jörgen Ekdahl", text: "Jörgen Ekdahl" },
        { value: "Lars Altemark", text: "Lars Altemark" },
        { value: "Lars Persson", text: "Lars Persson" },
        { value: "Lars G Persson", text: "Lars G Persson" },
        { value: "Lars-Göran Persson", text: "Lars-Göran Persson" },
        { value: "Lars-Gunnar Persson", text: "Lars-Gunnar Persson" },
        { value: "Martin Brolin", text: "Martin Brolin" },
        { value: "Mikael Swahn", text: "Mikael Swahn" },
        { value: "Per-Olof Olsson", text: "Per-Olof Olsson" },
        { value: "Pär-Olof Olsson", text: "Pär-Olof Olsson" },
        { value: "Paul Andersson", text: "Paul Andersson" },
        { value: "Peter Svensson", text: "Peter Svensson" },
        { value: "Richard Sandström", text: "Richard Sandström" },
        { value: "Roger Blohm", text: "Roger Blohm" },
        { value: "Ronny Könsberg", text: "Ronny Könsberg" },
        { value: "Stefan Löfkvist", text: "Stefan Löfkvist" },
        { value: "Stefan Thereström", text: "Stefan Thereström" },
        { value: "Stig Larsson", text: "Stig Larsson" },
        { value: "Stig Persson", text: "Stig Persson" },
        { value: "Thomas Akner", text: "Thomas Akner" },
        { value: "Thomas Holm", text: "Thomas Holm" },
        { value: "Tommy Olsson", text: "Tommy Olsson" },
        { value: "Åke Vad Jensen", text: "Åke Vad Jensen" },
        { value: "Åse Altemark", text: "Åse Altemark" },
        { value: "Reserv 1", text: "Reserv 1" },
        { value: "Reserv 2", text: "Reserv 2" },
        { value: "Reserv 3", text: "Reserv 3" },
      ],
      fields: [
        "pickup_day",
        "pickup_time",
        "name",
        "mobile",
        "persons",
        "bags",
        "driver",
        "action",
      ],
      options_day: [
      //  { value: null, text: "Filter on day", disabled: true },
        { value: "all", text: "Show whole week" },
        { value: "1 Monday", text: "Monday 27/5" },
        { value: "2 Tuesday", text: "Tuesday 28/5" },
        { value: "3 Wednesday", text: "Wednesday 29/5" },
        { value: "4 Thursday", text: "Thursday 30/5" },
        { value: "5 Friday", text: "Friday 31/5" },
        { value: "6 Saturday", text: "Saturday 1/6" },
        { value: "7 Sunday", text: "Sunday 2/6" },
      ],
    };
  },

  computed: {
    ...mapGetters([]),
  },
  mixins: [tagsMixin],
  created() {},
  mounted: function () {
    this.loading = true;   
    this.loadTable();

  },

  methods: {
    stripDay(day) {
      return day.substring(2);
    },
    getDaysUpToToday(today) {
        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let daysBeforeToday = [];

    // Justera today om dagen är söndag, den borde vara 6 istället för 0
    if (today === 0) {
        today = 6;  // Söndag som det sista indexet
    } else {
        today -= 1; // Förskjut för att matcha den nya arraykonfigurationen
    }

    for (let i = 0; i < today; i++) {
        daysBeforeToday.push(daysOfWeek[i]);
    }

    return daysBeforeToday;
    },
    loadTable() {
      this.loading = true;
      this.axios
        .get(globalState.admin_url + "getSchedule")
        .then((response) => {
          this.bookedSlots = response.data;
          //console.log(this.bookedSlots);
          this.bookedSlotsOrg = response.data;
          //this.bookedSlots[0].driver = 'arne'

           //set driver from local storage
            if (localStorage.getItem("driver")) {
              this.driver = localStorage.getItem("driver");
              this.filterDriver(this.driver);
            }

          //FILTER OUT OLD PICKUPS
          if (this.hide_old) {
            const todayNumeric = new Date().getDay(); 
            const days = this.getDaysUpToToday(todayNumeric);          

            for (var i = 0; i < days.length;i++) {
              //console.log('hide ' + days[i])

              this.bookedSlots = this.bookedSlots.filter((booking) => {
                //console.log('found: ' + booking.pickup_day,days[i])
              if (this.stripDay(booking.pickup_day) != days[i]) return true; 
              })

            }
          }
          //END FILTER OUT

          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    confirmDelete(id) {
      this.$bvModal
        .msgBoxConfirm("Please confirm that you want to delete this slot.", {
          title: "Please Confirm",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.deleteSlot(id);
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },
    showCommentModal(id) {
      const h = this.$createElement;
      // More complex structure

      const messageVNode = h("div", { class: ["foobar"] }, [
        h("b-form-textarea", {
          props: {
            id: "textarea",
            rows: "3",
            maxRows: "6",
          },
        }),
      ]);

      this.$bvModal
        .msgBoxConfirm([messageVNode], {
          title: "Add comment",
          size: "sm",
          buttonSize: "sm",
          okVariant: "success",
          okTitle: "Save",
          cancelTitle: "Cancel",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.addComment(id, document.getElementById("textarea").value);
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },
    addComment(id, comment) {
      this.saving = true;
      const dataObj = { comment: comment, _id: id };

      this.axios
        .post(globalState.admin_url + "addComment", dataObj)
        .then((response) => {
          //console.log(response);
          this.dataUpdated = true;
          this.loadTable();
          setTimeout(() => {
            this.dataUpdated = false;
          }, 3000);
        })
        .catch((error) => {
          //console.log(error);
          this.loading = false;
        });
    },
    filterDay(day) {
      if (day == "all") {
        this.bookedSlots = this.bookedSlotsOrg;

        //if a driver is selected, use that value to filter
        if (this.driver != "all") {
          this.bookedSlots = this.bookedSlotsOrg.filter((booking) => {
            if (booking.driver == this.driver) return true;
          });
        }
        return;
      }

      day = this.stripDay(day);

      this.bookedSlots = this.bookedSlotsOrg.filter((booking) => {
        if (this.stripDay(booking.pickup_day) == day) {
          if (this.driver != "all") {
            if (booking.driver == this.driver) return true;
          } else {
            if (this.stripDay(booking.pickup_day) == day) {
              return true;
            }
          }
          // return true;
        }
      });
    },

    filterDriver(driver) {
      if (driver == "all") {
        localStorage.setItem("driver", 'all');
        this.bookedSlots = this.bookedSlotsOrg;

        //if a day is selected, use that value to filter

        if (this.day != "all") {
          this.bookedSlots = this.bookedSlotsOrg.filter((booking) => {
            if (this.stripDay(booking.pickup_day) == this.stripDay(this.day))
              return true;
          });
        }
        this.filterOutOld();
        return;
      }

      localStorage.setItem("driver", driver);
    
      this.bookedSlots = this.bookedSlotsOrg.filter((booking) => {
        if (booking.driver == driver) {    
          //save local storage for driver to keep selection
                    
          if (this.day != "all") {
            if (
              this.stripDay(booking.pickup_day) == this.stripDay(this.day) &&
              booking.driver == driver
            )
              return true;
          } else {
            if (booking.driver == driver) return true;
          }
          // return true;          
        }
      });
      this.filterOutOld();
    },
    filterOutOld() {
          //FILTER OUT OLD PICKUPS
          if (this.hide_old) {
            const todayNumeric = new Date().getDay(); 
            const days = this.getDaysUpToToday(todayNumeric);          

            for (var i = 0; i < days.length;i++) {
              //console.log('hide ' + days[i])

              this.bookedSlots = this.bookedSlots.filter((booking) => {
                //console.log('found: ' + booking.pickup_day,days[i])
              if (this.stripDay(booking.pickup_day) != days[i]) return true; 
              })

            }
          }
          //END FILTER OUT
    },
    checkPassword() {
      if (this.form.password == "borjeadmin") {
        this.passwordCheck = true;
        this.form.password = null;
      }
    },
    updateDriver(driver, id) {
      this.saving = true;
      const dataObj = { driver: driver, _id: id };

      this.axios
        .post(globalState.admin_url + "updateDriver", dataObj)
        .then((response) => {
          //console.log(response);
          this.dataUpdated = true;
          setTimeout(() => {
            this.dataUpdated = false;
          }, 3000);
        })
        .catch((error) => {
          //console.log(error);
          this.loading = false;
        });
    },

    deleteSlot(id) {
      this.saving = true;
      const dataObj = { _id: id };

      this.axios
        .post(globalState.admin_url + "deleteSlot", dataObj)
        .then((response) => {
          //console.log(response);
          this.dataUpdated = true;
          this.loadTable();
          setTimeout(() => {
            this.dataUpdated = false;
          }, 3000);
        })
        .catch((error) => {
          //console.log(error);
          this.loading = false;
        });
    },

    onDriverItemSelected(driver, id, index) {
      this.updateDriver(driver, id, index);
    },
  },
      watch: {
      hide_old(newValue, oldValue) {
        this.loadTable();
      }
    }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/variables.scss";

.stepsuccess {
  background: $green-light;
}

img {
  max-width: 100%;
}

.selectDriver {
  min-width: 200px;
}


@media (max-width: 576px) {
  h2 {
    font-size: 1.2em !important;
  }

  h3 {
    font-size: 1.4rem !important;
  }

  h4 {
    font-size: 1.3rem !important;
  }

  h5 {
    font-size: 1.1rem !important;
  }
}


</style>
