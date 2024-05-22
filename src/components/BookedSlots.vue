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
        <b-col md="3">
          <b-form-select
            v-model="day"
            :options="options_day"
            v-on:change="filterDay($event)"
          ></b-form-select>
        </b-col>
        <b-col md="3">
          <b-form-select
            v-model="driver"
            :options="options_driver"
            v-on:change="filterDriver($event)"
          ></b-form-select>
        </b-col>
        <b-col md="6" class="text-right">
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
                <div class="text-center" >
               <!--   <b-button v-if="passwordCheck" variant="danger" size="sm"
                 @click="deleteSlot(bookedSlots[data.index]._id)"
                 >
                  <i class="fa fa-trash"></i>
                 </b-button> -->
                  <b-button v-if="passwordCheck" variant="danger" size="sm" @click="confirmDelete(bookedSlots[data.index]._id)"><i class="fa fa-trash"></i></b-button>
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
        { value: "Jörgen Ekdahl", text: "Jörgen Ekdahl" },
        { value: "Lars Altemark", text: "Lars Altemark" },
        { value: "Lars G Persson", text: "Lars G Persson" },
        { value: "Lars-Göran Persson", text: "Lars-Göran Persson" },
        { value: "Lars-Gunnar Persson", text: "Lars-Gunnar Persson" },
        { value: "Martin Brolin", text: "Martin Brolin" },
        { value: "Mikael Swahn", text: "Mikael Swahn" },
        { value: "Pär-Olof Olsson", text: "Pär-Olof Olsson" },
        { value: "Paul Andersson", text: "Paul Andersson" },
        { value: "Peter Svensson", text: "Peter Svensson" },
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
        "bags",
        "persons",
        "driver",
        "action"
      ],
      options_day: [
        { value: null, text: "Filter on day", disabled: true },
        { value: "all", text: "Show whole week" },
        { value: "Monday", text: "Monday 27/5" },
        { value: "Tuesday", text: "Tuesday 28/5" },
        { value: "Wednesday", text: "Wednesday 29/5" },
        { value: "Thursday", text: "Thursday 30/5" },
        { value: "Friday", text: "Friday 31/5" },
        { value: "Saturday", text: "Saturday 1/6" },
        { value: "Sunday", text: "Sunday 2/6" },
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
   
    loadTable() {
    this.axios
      .get(globalState.admin_url + "getSchedule")
      .then((response) => {
        this.bookedSlots = response.data;
        //console.log(this.bookedSlots);
        this.bookedSlotsOrg = response.data;
        //this.bookedSlots[0].driver = 'arne'

        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
    },
    confirmDelete(id) {
        
           
        this.$bvModal.msgBoxConfirm('Please confirm that you want to delete this slot.', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            if (value) {
              this.deleteSlot(id)
            }
             
          })
          .catch(err => {
            // An error occurred
          })
      },
    filterDay(day) {
      if (day == "all") {
        this.bookedSlots = this.bookedSlotsOrg;
        
        //if a driver is selected, use that value to filter
        if (this.driver != 'all') {
           this.bookedSlots = this.bookedSlotsOrg.filter((booking) => {
            if (booking.driver == this.driver) return true; 
           })
        }
        return;
      }


      this.bookedSlots = this.bookedSlotsOrg.filter((booking) => {
        console.log(booking)
        if (booking.pickup_day == day) {                    
          if (this.driver != 'all') {            
            if (booking.driver == this.driver) return true;
          } else {                        
            if (booking.pickup_day == day) {             
              return true;
            }
          }
         // return true;
        }
      });
    },

    filterDriver(driver) {
      if (driver == "all") {
        this.bookedSlots = this.bookedSlotsOrg;

       //if a day is selected, use that value to filter
        if (this.day != 'all') {
           this.bookedSlots = this.bookedSlotsOrg.filter((booking) => {
            if (booking.pickup_day == this.day) return true; 
           })
        }

        return;
      }

      this.bookedSlots = this.bookedSlotsOrg.filter((booking) => {
        if (booking.driver == driver) {
          if (this.day != 'all') {
            if (booking.pickup_day == this.day && booking.driver == driver) return true;
          } else {
            if (booking.driver == driver) return true;
          }
         // return true;
        }
      });

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
