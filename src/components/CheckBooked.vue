<template>
  <div>
    <b-container>
      <b-row class="justify-content-center" align-h="center">
        <b-col md="12" class="mt-4 mt-md-5">
          <h2 class="teaser-header">Check your pickups</h2>
        </b-col>                     
      </b-row>
      <b-row class="justify-content-center" align-h="center">
         <b-col md="8" class="mt-4 mt-md-5">
             <b-form 
            @submit.stop.prevent
            @submit="check"           
          >
      
            <b-form-group
              id="input-group-mobile"
              :state="validateMobile"
              label="Mobile number"
              label-for="input-1-mobile"
              label-cols="12"
              label-cols-lg="2"
              label-size="sm"
            >
              <vue-tel-input
                v-model="form.mobile"
                v-bind="bindProps"
              ></vue-tel-input>
            </b-form-group>


          <div class="mt-4 text-center">
            <b-button type="submit" size="md" variant="primary">Check your pickups</b-button>
          </div>
        

            
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
import { VueTelInput } from "vue-tel-input";

export default {
  name: "BookedPickups",
  components: {VueTelInput},
  data() {
    return {        
      dataUpdated: false,     
      passwordCheck: false, //false default
      loading: false,
      bookedSlots: [],
      bookedSlotsOrg: [],     
        bindProps: {
        mode: "international",
        defaultCountry: "SE",
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: false,
        placeholder: "Type your mobile number",
        required: true,
        enabledCountryCode: false,
        enabledFlags: true,
        preferredCountries: [],
        onlyCountries: [],
        ignoredCountries: [],
        autocomplete: "off",
        name: "telephone",
        maxLen: 25,
        wrapperClasses: "",
        inputClasses: "form-control",
        dropdownOptions: {
          disabledDialCode: false,
        },
        inputOptions: {
          showDialCode: false,
        },
      },
      form: {       
        mobile: "",       
      },
      fields: [
        "pickup_day",
        "pickup_time",
        "name",
        "mobile",
        "bags",
        "persons",
      ]
    };
  },

  computed: {
    ...mapGetters([]),
        validateMobile() {

      let validation = false;

      if (this.form.mobile.length > 3) {
        validation = true;
      }

      return validation;

    },
  },
  mixins: [tagsMixin],
  created() {},
  mounted: function () {
    //this.loading = true;
    //this.loadTable();
  },

  methods: {
     stripDay(day) {
      return day.substring(2);
    },
    check() {
      
      const dataObj = this.form;
        this.loading = true;

      this.axios
        .post(globalState.admin_url + "getScheduleUser", dataObj)
        .then((response) => {
          //console.log(response);
         this.bookedSlots = response.data;
        //console.log(this.bookedSlots);
        this.bookedSlotsOrg = response.data;
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
