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
    <b-container fluid flex class="" v-if="!loading">
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

    <!-- INFO TEXT -->
    <b-container v-if="!loading" class="mb-5">
      <b-row class="justify-content-center" align-h="center">
        <b-col class="col-12 mb-2">
          <p hidden>INFORMATION HERE, LANGUAGE? ENGLISH OR SWEDISH?</p>
<h2>Request shuttle service pickup</h2>
<p>Submit a request for pickup at Marina Plaza hotel in Helsingborg for transport to the golf course.</p>
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
                placeholder="Enter your first and last name"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-mobile"
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
             <b-form-select v-model="form.pickup_days" :options="options_days"></b-form-select>
            </b-form-group>

             <b-form-group
              id="input-group-pickup-time"
              label="Pickup time"
              label-for="input-time"
               label-cols="12"
              label-cols-lg="2"
              label-size="sm"
            >
             <b-form-select v-model="form.pickup_time" :options="options_time"></b-form-select>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
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
import { VueTelInput } from 'vue-tel-input';

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
  components: {VueTelInput},
  data() {
    return {
      doctitle: "Shuttle Service",
      loading: true,
      open: true,
      saving: false,     
       options_days: [
          { value: null, text: 'Please select day' },
          { value: 'monday', text: 'Monday 27/5' },
          { value: 'tuesday', text: 'Tuesday 27/5' },
          { value: 'wednesday', text: 'Wednesday 27/5' },
          { value: 'thursday', text: 'Thursday 27/5' },
          { value: 'friday', text: 'Friday 27/5' },
          { value: 'saturday', text: 'Saturday 27/5' },
          { value: 'sunday', text: 'Sunday 27/5' }
        ],
        options_time: [
          { value: null, text: 'Please select timeslot' },
          { value: 'monday', text: 'Monday 27/5' },
          { value: 'tuesday', text: 'Tuesday 27/5' },
          { value: 'wednesday', text: 'Wednesday 27/5' },
          { value: 'thursday', text: 'Thursday 27/5' },
          { value: 'friday', text: 'Friday 27/5' },
          { value: 'saturday', text: 'Saturday 27/5' },
          { value: 'sunday', text: 'Sunday 27/5' }
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
          disabledDialCode: false
        },
        inputOptions: {
          showDialCode: false
        }
      }, 
      form: {
        name: "",
        mobile: "",
        pickup_days: null,
        pickup_time: "",
        bags: null,
        persons: null,
      },
    };
  },
  mounted() {
    // Set default header. e.g, X-API-KEY
    //this.axios.defaults.headers['testAPIkey'] = 'W2spSuQzGd0LKkGIjJlWADsLuNdOPqnybaZ18UIg26VYmLrkQ0dcvpauIO64GYd5';
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
  },
  methods: {
    addPickup() {
      console.log("inne pickup");
      this.saving = true;
      return;

      this.axios
        .post(globalState.admin_url + "addPickup", {
          //getclubstoplist
          firstname: "from node",
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
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

video {
  width: 100%;
}

.video-container iframe {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

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

.black {
  background: #000;
}

.white-bg {
  background: #fff;
}

.timenumbers {
  display: block;
  font-size: 2rem;
  font-weight: 600;
  line-height: 80px;
  margin: 0 auto;
  text-align: center;
  padding-right: 2px;
  @media (min-width: 500px) {
    font-size: 2rem;
  }
}

.timenumbers {
  border-radius: 50%;
  border-width: 5px;
  border-color: rgba(0, 0, 0, 0.3);
  border-style: solid;
  color: #000;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.7);
}

p.timedescription {
  font-size: 1.2rem;
  font-variant: small-caps;
  line-height: 1.5rem;
  margin: 0 auto;
  text-align: center;
  position: relative;
  top: 5px;
  @media (min-width: 500px) {
    font-size: 1rem;
  }
}

@media only screen and (max-width: 768px) {
  .black {
    img {
      max-width: 100px;
      height: auto;
    }
  }
}

.videocontainer {
  position: relative;
  background-color: black;
  height: 75vh;
  min-height: 25rem;
  width: 100%;
  overflow: hidden;
}

.videocontainer video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: 0;
  -ms-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}

.videocontainer .container {
  position: relative;
  z-index: 2;
}

.videocontainer .overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.8;
  z-index: 1;
}
</style>
