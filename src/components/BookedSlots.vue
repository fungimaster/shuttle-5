<template>

<div>

  <b-container class ref="register">
    <b-row class="justify-content-center" align-h="center">
      <b-col md="7" id="register" class="mt-4 mt-md-5">
        <h2 class="teaser-header">Booked pickups</h2>
      </b-col>
       <b-col md="3" id="password" class="mt-4 mt-md-5 text-right">
         <b-form
            @submit.stop.prevent
            @submit="checkPassword"           
          >
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
      <b-col md="7">           
      </b-col>
      
      <b-col md="10" id="register" class="mt-4 mt-md-5">        
       <!-- <b-table striped hover :fields="fields" :items="bookedSlots"></b-table> -->
       
        <!-- v-for="(game,idx2) in games2" :key="idx2" -->


    <b-table striped hover :fields="fields" :items="bookedSlots" responsive="sm">
      <!-- A virtual column -->
      <template #cell(_id)="data">
        {{ data.value._id }}
      </template>

         <!-- A virtual composite column -->
      <template #cell(driver)="data">
        <span v-if="!passwordCheck">
          {{data.item.driver}}
        </span>
         <b-form-select
                v-if="passwordCheck"
                v-model="data.item.driver"
                :options="options_driver"
                v-on:change="onDriverItemSelected($event,bookedSlots[data.index]._id)"
              ></b-form-select>       

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
      day: 'all',
      form: {
        password: null
      },
      passwordCheck: false,
      loading: false,
      bookedSlots: [],
      bookedSlotsOrg: [],
       options_driver: [
        { value: 'No driver', text: "Select driver" ,disabled: false },
        { value: "Arne", text: "Arne" },
        { value: "Joel", text: "Joel" },
        { value: "Åsa", text: "Åsa" },
       ],
      fields: ['pickup_day','pickup_time','name', 'mobile', 'bags', 'persons','driver'],
       options_day: [
        { value: null, text: "Filter on day" ,disabled: true },
        { value: "all", text: "Show whole week" },
        { value: "Monday", text: "Monday 27/5" },
        { value: "Tuesday", text: "Tuesday 27/5" },
        { value: "Wednesday", text: "Wednesday 27/5" },
        { value: "Thursday", text: "Thursday 27/5" },
        { value: "Friday", text: "Friday 27/5" },
        { value: "Saturday", text: "Saturday 27/5" },
        { value: "Sunday", text: "Sunday 27/5" },
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

    this.axios
      .get(globalState.admin_url + "getSchedule")
      .then((response) => {
        this.bookedSlots = response.data;
        console.log(this.bookedSlots)
        this.bookedSlotsOrg = response.data;
        //this.bookedSlots[0].driver = 'arne'

        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  },

  methods: {
      filterDay(day) {
        if (day == 'all') {
          this.bookedSlots = this.bookedSlotsOrg;
          return;
        }
       this.bookedSlots = this.bookedSlotsOrg.filter((booking) => {                 
        if (booking.pickup_day == day) return true;
        });
      },
      checkPassword() {
        if(this.form.password=="borjeadmin") {
          this.passwordCheck = true;
          this.form.password = null;
        }
      },
      updateDriver(driver,id) {
      this.saving = true;
      const dataObj = {driver: driver, _id: id}
      
      
      this.axios
        .post(globalState.admin_url + "updateDriver", dataObj)
        .then((response) => {
          console.log(response);
          
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    onDriverItemSelected(driver,id) {
      this.updateDriver(driver,id);
    }
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
