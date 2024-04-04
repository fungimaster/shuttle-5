<template>

<div>

  <b-container class ref="register">
    <b-row class="justify-content-center" align-h="center">
      <b-col md="10" id="register" class="mt-4 mt-md-5">
        <h2 class="teaser-header">Booked pickups</h2>        
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
      <b-col md="10" id="register" class="mt-4 mt-md-5">        
        <b-table striped hover :fields="fields" :items="bookedSlots"></b-table>
        <!-- v-for="(game,idx2) in games2" :key="idx2" -->
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
  name: "Booked pickups",
  components: {},
  data() {
    return {
      loading: false,
      bookedSlots: [],
      fields: ['pickup_day','pickup_time','name', 'mobile', 'bags', 'persons'],
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

        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  },

  methods: {},
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
