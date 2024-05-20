<template>
  <div>
    <vue-headful :title="doctitle" />
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

    <!-- CONTENT -->
    <b-container hidden flex class="" v-if="!loading">
      <b-jumbotron class="herobg0">
        <b-row align-h="center">
          <b-col
            class="col-12 col-md-12 mt-1 mt-md-4 pt-1 pt-md-2 pb-0 pb-md-0 text-center"
          >
            <h1 class="mb-3 white">SHUTTLE SERVICE</h1>
            <h2 class="mb-3 white">DORMY HELSINGBORG OPEN</h2>
          </b-col>
        </b-row>
      </b-jumbotron>
    </b-container>

    <b-container >
    <b-row class="justify-content-center" align-h="center">
      <b-col md="8" class="mt-5 mt-md-5">     
        <p hidden>INFORMATION HERE, LANGUAGE? ENGLISH OR SWEDISH?</p>
          <h2>Request shuttle service pickup</h2>
          <p class="mt-4 mb-5">
            Submit a request for pickup at <a href="https://maps.app.goo.gl/8udWteUsUJ5djmPK7" target="_blank">Marina Plaza hotel in Helsingborg</a> for
            transport to the golf course. The ride will take approx. 25 minutes and is valid for <strong>player + caddie</strong>.
          </p>
          <b-form 
            @submit.stop.prevent
            @submit="addPickup"
            @reset="onReset"
            v-if="open"
          >
            <b-form-group
              id="input-group-1"
              label="Name"
              label-for="input-name"
              label-cols="12"
              label-cols-lg="2"
              label-size="sm"
            >
              <b-form-input
                id="input-name"
                v-model="form.name"
                :state="validateName"
                placeholder="Enter your first and last name"
                required
              ></b-form-input>
            </b-form-group>

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

            <b-form-group
              id="input-group-pickup-day"
              label="Pickup date"
              label-for="input-date"
              label-cols="12"
              label-cols-lg="2"
              label-size="sm"
            >
              <b-form-select
                v-model="form.pickup_day"
                :options="options_day"
                :state="validateDay"
              ></b-form-select>
            </b-form-group>

            <b-form-group
              id="input-group-pickup-time"
              label="Pickup time"
              label-for="input-time"
              label-cols="12"
              label-cols-lg="2"
              label-size="sm"
            >
              <b-form-select
                v-model="form.pickup_time"
                :options="options_time"
                 :state="validateTime"
              ></b-form-select>
            </b-form-group>

              <b-form-group
              id="input-group-1"
              label="Persons"
              label-for="input-persons"
              label-cols="12"
              label-cols-lg="2"
              label-size="sm"
            >
              <b-form-select
                v-model="form.persons"
                :options="options_persons"
              ></b-form-select>
            </b-form-group>


              <b-form-group
              id="input-group-1"
              label="Bags"
              label-for="input-persons"
              label-cols="12"
              label-cols-lg="2"
              label-size="sm"
            >
              <b-form-select
                v-model="form.bags"
                :options="options_bags"
              ></b-form-select>
            </b-form-group>

          <div class="mt-4 text-center">
            <b-button type="submit" :disabled="saving" size="md" variant="primary">Submit Pickup request</b-button>
            <b-button hidden type="reset" variant="danger">Reset</b-button>
            <b-alert v-if="pickupSuccess" show variant="success" class="small mt-3 mb-3">
              {{successMessage}}
            </b-alert>
          </div>

         

            
          </b-form>
          <b-card hidden class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ form }}</pre>
          </b-card>
      </b-col>
    </b-row>
  </b-container>

   
  </div>
</template>

<script>
import { globalState } from "../main.js";
import { mapGetters } from "vuex";
import moment from "moment";
import { VueTelInput } from "vue-tel-input";

moment.locale("sv");
moment.updateLocale("sv", {
  relativeTime: {
    future: "om %s",
    past: "%s",
    ss: "%d sek",
    m: "1 minut",
    mm: "%d min",
    h: "en timme",
    hh: "%d timmar",
    d: "en dag",
    dd: "%d dagar",
    M: "en månad",
    MM: "%d mån",
    y: "ett år",
    yy: "%d år",
  },
});

export default {
  name: "local",
  components: { VueTelInput },
  data() {
    return {
      doctitle: "Shuttle Service",
      loading: true,
      open: true,
      saving: false,
      pickupSuccess: false,
      successMessage: '',
      options_day: [
        { value: null, text: "Please select day" ,disabled: true },
        { value: "Monday", text: "Monday 27/5" },
        { value: "Tuesday", text: "Tuesday 28/5" },
        { value: "Wednesday", text: "Wednesday 29/5" },
        { value: "Thursday", text: "Thursday 30/5" },
        { value: "Friday", text: "Friday 31/5" },
        { value: "Saturday", text: "Saturday 1/6" },
        { value: "Sunday", text: "Sunday 2/6" },
      ],
      options_time: [
        { value: null, text: "Please select timeslot" ,disabled: true },
        { value: "0600", text: "06:00" },
        { value: "0630", text: "06:30" },
        { value: "0700", text: "07:00" },
        { value: "0730", text: "07:30" },
        { value: "0800", text: "08:00" },
        { value: "0830", text: "08:30" },
        { value: "0900", text: "09:00" },
        { value: "0930", text: "09:30" },
        { value: "1000", text: "10:00" },
        { value: "1030", text: "10:30" },
        { value: "1100", text: "11:00" },
        { value: "1130", text: "11:30" },
        { value: "1200", text: "12:00" },
        { value: "1230", text: "12:30" },
        { value: "1300", text: "13:00" },
        { value: "1330", text: "13:30" },
        { value: "1400", text: "14:00" },
        { value: "1430", text: "14:30" },
        { value: "1500", text: "15:00" }        
      ],
      options_persons: [
        { value: null, text: "Please select number of persons", disabled: true },
        { value: 1, text: "1 person" },
        { value: 2, text: "2 persons" }        
      ],      
      options_bags: [
        
        { value: null, text: "Please select number of bags", disabled: true },
        { value: 0, text: "No bag" },
        { value: 1, text: "1 bag" },
        { value: 2, text: "2 bags" }        
      ],
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
        name: "",
        mobile: "",
        pickup_day: "",
        pickup_time: "",
        bags: 1,
        persons: 1,
      },
    };
  },
  mounted() {
    // Set default header. e.g, X-API-KEY
    //this.axios.defaults.headers['testAPIkey'] = 'W2spSuQzGd0LKkGIjJlWADsLuNdOPqnybaZ18UIg26VYmLrkQ0dcvpauIO64GYd5';

  //set day after tomorrow as default, if not match, set first option as default
  const date = new Date();
  console.log(date)

  },
  created() {
    this.loading = false;
    /* 
  //MONGODB
// Set up Express
const express = require('express');
const app = express();

// Connect to MongoDB with Mongoose
const mongoose = require('mongoose');
const db = 'mongodb+srv://jstenbeck:<password>@cluster0.juxieij.mongodb.net/';

// Set up Schema and Model for collection
const Schema = mongoose.Schema;

const yourSchema = new Schema({
  someKey: String,
  someKey2: String
});

const YourModel = mongoose.model('YourModel', yourSchema);

// Set up the Vue.js Method 
app.get('/getData', (req, res) => {
    YourModel.find({})
    .then(doc => {
      // returns the JSON object with the data
      res.send(doc);
    });
}); */
  },

  computed: {
    ...mapGetters([""]),
    validateName() {

      let validation = false;

      if (this.form.name.length > 3) {
        validation = true;
      }

      return validation;

    },
    validateMobile() {

      let validation = false;

      if (this.form.mobile.length > 3) {
        validation = true;
      }

      return validation;

    },
    validateDay() {
      
      let validation = false;

      if (this.form.pickup_day.length) {
       validation = true;       
      }

      return validation
     
    },
        validateTime() {
      
      let validation = false;

      if (this.form.pickup_time.length) {
       validation = true;       
      }

      return validation
     
    },
  },
  methods: {
    addPickup() {
      this.saving = true;
      const dataObj = this.form;

      if (!this.form.pickup_day.length || !this.form.pickup_time.length) return false;

      this.axios
        .post(globalState.admin_url + "addPickup", dataObj)
        .then((response) => {
          //console.log(response);
          this.successMessage = "Request submitted, see you at Marina Plaza on " + this.form.pickup_day + " at " + this.form.pickup_time +'.';
          this.pickupSuccess = true;
          this.saving = false;
          this.form = {
            name: "",
            mobile: "",
            pickup_day: "",
            pickup_time: "",
            bags: 1,
            persons: 1,
          }
          
          setTimeout(() => {
            //  this.pickupSuccess = false;
          }, 10000);
          
        })
        .catch((error) => {
          //console.log(error);
          this.loading = false;
        });
    },
    onReset(evt) {    
      console.log("reset");
    },

    scrollToAnchorPoint(refName) {
      const el = this.$refs[refName];
      el.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../styles/variables.scss";


.herobg0 {
  background-size: cover !important;
  background-repeat: no-repeat !important;
}

.herobg0 {
  background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1200,q_auto,e_colorize:20,co_rgb:000000/v1711469908/Allerum/dormy_bg_1.jpg);
  //background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1200,q_auto,e_colorize:50,co_rgb:000000/v1634639604/matchplay/241623315_297370888855635_7137633828161165670_n.jpg);
  background-position: right center;
  color: #fff;
}

.images img {
  max-width: 100%;
}

</style>
