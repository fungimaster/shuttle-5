<template>
  <div class="igg">
    <vue-headful :title="doctitle" />
    <!-- LOADING -->
    <b-container v-if="loading">
      <b-row>
        <b-col class="col-12 mt-5 mb-5 p-5 text-center">
          <span v-if="loading">
            <b-spinner type="grow" class="p-5"></b-spinner>
          </span>
        </b-col>
      </b-row>
    </b-container>

    <!-- CONTENT -->
    <b-container fluid class="no-padding" v-if="!loading">
      <b-jumbotron fluid class="herobg0">
        <h1 class="mb-3 white">Välkommen till Matchplay Indoor 2023</h1>
        <h4 class="mb-3 white">
          Golftävlingen för både privatpersoner och företag
        </h4>
        <p>
          Matchplay skapar ännu en tävling för alla som vill hålla svingen och
          tävlandet vid liv under de mörka månaderna. Mellan 1 januari och 15
          april 2023 spelas tävlingen på {{ clubs.length }} olika inomhusanläggningar runtom i
          Sverige.
        </p>
        <p class="mt-5 text-center">
          <b-button variant="primary" @click="scrollToAnchorPoint('register')" size="md" class="btn-igg"
            >Anmäl ditt lag nu för endast {{ price_private }} kr</b-button
          >
        </p>
        <p class="mt-3 text-center">
          <b-button variant="primary" @click="scrollToAnchorPoint('clubs')" size="md" class="btn-igg"
            >Se våra {{ clubs.length }} anläggningar</b-button
          >
        </p>
      </b-jumbotron>
    </b-container>

    <b-container ref="register" v-if="!loading">
      <b-row class="justify-content-center" align-h="center">
        <b-col class="col-12 mb-2">
          <register :igg="true"></register>
        </b-col>
      </b-row>
      <hr>

      <b-row ref="clubs" class="justify-content-center mt-5 mb-5" align-h="center">
        <b-col class="col-12 col-md-6">
           <h2 class="mb-4">Indoor Golf Center</h2>
          <b-badge
            class="p-2 m-2"
            variant="secondary"
            v-for="club in clubs"
            :key="club.index"
          >
            {{ club.title }}
          </b-badge>
        </b-col>
        <b-col class="col-12 col-md-4 mt-5 mt-md-0 pt-5">
          <b-img
            rounded="circle"
            src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_500,h_500,c_fill,g_south_west,q_70/v1663921938/matchplay/igg/DSC00224.jpg"
            fluid
          ></b-img>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { globalState } from "../main.js";
import { mapGetters } from "vuex";
import register from "./Register";

export default {
  name: "igg",
  components: { register },
  data() {
    return {
      compid: globalState.compid_igg,
      price_private: this.price_1,
      doctitle: "IGG 2023",
      loading: true,
      closed_igg: globalState.closed_igg,
      clubs: [],
    };
  },
  created() {
    this.axios
      .post(globalState.admin_url + "getGolfclubs", {
        id: globalState.compid_igg,
      })
      .then((response) => {
        //this.parseCourse(response.data);
        // console.log(response.data);
        this.clubs = response.data;

        //LOAD COMP DATA
        const promise = this.$store.dispatch(
          "getCompetition",
          globalState.compid_igg
        );
        promise.then(() => {
          (this.price_private = this.price1), (this.loading = false);
        });
      })
      .catch((error) => {
        // this.errorMSG = "Something went wrong (No course found)";
        console.log(error);
      });

    //TEST GET COURSES
    /*     this.axios
      .post(globalState.admin_url + "getIndoorCourses", {
        id: globalState.compid_igg,
      })
      .then((response) => {
        //this.parseCourse(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // this.errorMSG = "Something went wrong (No course found)";
        console.log(error);
      }); */

    //
  },

  mounted() {},
  computed: {
    ...mapGetters(["price1"]),
  },
  methods: {
        scrollToAnchorPoint(refName) {
            const el = this.$refs[refName]
            el.scrollIntoView({ behavior: 'smooth'})
        }
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
  background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1200,q_auto,e_colorize:50,co_rgb:000000/v1663921938/matchplay/igg/DSC09580.jpg);
  //background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1200,q_auto,e_colorize:50,co_rgb:000000/v1634639604/matchplay/241623315_297370888855635_7137633828161165670_n.jpg);
  background-position: right center;
  color: #fff;
}

@media only screen and (max-width: 768px) {
}
</style>
