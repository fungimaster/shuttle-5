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
        <b-row align-h="center">
          <b-col class="col-12 col-md-12
              mt-1 mt-md-4
              pt-1 pt-md-2
              pb-0 pb-md-3
              text-center">
            <h1 class="mb-3 white">Välkommen till Matchplay Indoor 2023</h1>

            <h4 class="mb-3 white">
              Golftävlingen för både privatpersoner och företag
            </h4>
          </b-col>

          <b-col class="col-md-10">
            <p>
              Matchplay skapar ännu en tävling för alla som vill hålla svingen
              och tävlandet vid liv under de mörka månaderna. Mellan 1 januari
              och 15 april 2023 spelas tävlingen på
              <strong>{{ clubs.length }}</strong> olika inomhusanläggningar
              runtom i Sverige.
            </p>
            <p class="mt-5 text-center">
              <b-button
                variant="primary"
                @click="scrollToAnchorPoint('register')"
                size="md"
                class="btn-igg"
                >Anmäl ditt lag nu för endast {{ price_private }} kr</b-button
              >
            </p>
            <p class="mt-3 text-center">
              <b-button
              hidden
                variant="primary"
                @click="scrollToAnchorPoint('clubs')"
                size="md"
                class="btn-igg"
                >Se våra {{ clubs.length }} anläggningar</b-button
              >
               <b-button              
                variant="primary"
                to="/prisbord"
                size="md"
                class="btn-igg"
                >Utforska prisbordet!</b-button
              >
            </p>
          </b-col>
         
        </b-row>
      </b-jumbotron>
    </b-container>

  <b-container v-if="latestTeam && !closed && !loading" class="mt-5">
        <b-row align-h="center" class="mt-5 mb-5">
          <b-col  class="col-12 col-md-6">
            <b-row align-h="center" class="align-items-center h-100">
              <b-col class="col-3 mx-auto text-center text-md-right pl-0 pr-0">
                <b-img class="" :src="getClubImage2(latestTeamLogo)"></b-img>
              </b-col>
              <b-col class="col-7 small mx-auto pl-0 pr-0 text-left">
                {{ latestTeam }}
              </b-col>
            </b-row>
          </b-col>
        </b-row>
         <hr class="mt-5" v-if="latestTeam" />
  </b-container>

    <b-container v-if="!loading" class="mt-5">
       <keytakeaways2></keytakeaways2>
       <hr class="mt-5" />
    </b-container>

 <b-container fluid v-if="!loading" class="no-padding hidden">
     
      <video style="max-width:100%;"      
         controls
          muted="muted"
          loop="loop"
        >
          <source            
            src="https://res.cloudinary.com/dn3hzwewp/video/upload/q_auto,vc_h265/v1666169001/matchplay/igg/Matchplay_Indoor_Homepage_movie_v2.mp4"
            type="video/mp4"
          />
        </video>

  <!-- <b-embed type="video" aspect="16by9" controls  muted="muted">    
    <source src="https://res.cloudinary.com/dn3hzwewp/video/upload/q_auto,vc_h265/v1666166321/matchplay/igg/Matchplay_Indoor_Homepage_movie.mp4" type="video/mp4">
  </b-embed> -->

 </b-container>


    <b-container fluid v-if="!loading" class="hidden">
        <b-jumbotron fluid style="background:#000;">
       <div class="videocontainer">       
       <video
          playsinline="playsinline"
          autoplay="autoplay"
          muted="muted"
          loop="loop"
        >
          <source
            src="https://res.cloudinary.com/dn3hzwewp/video/upload/q_auto,vc_h265/v1666166321/matchplay/igg/Matchplay_Indoor_Homepage_movie.mp4"
            type="video/mp4"
          />
        </video>
       </div>
        </b-jumbotron>
    </b-container>


    <!-- REGISTER -->
    <b-container ref="register" v-if="!loading" class="mb-5">
      <b-row class="justify-content-center" align-h="center">
        <b-col class="col-12 mb-2">
          <register :igg="true"></register>
        </b-col>
      </b-row>
    </b-container>

    <!-- RUFF/IGG -->
    <b-container fluid class="no-padding black" v-if="!loading">
      <b-jumbotron fluid style="background:#000;">
        <b-row>
          <b-col class="text-center col-6">
            <b-img
              src="https://res.cloudinary.com/dn3hzwewp/image/upload/v1665478570/matchplay/igg/-_RUFF-Text-White.png"
            >
            </b-img>
          </b-col>
          <b-col col="6" class="text-center col-6">
            <!-- e_colorize,co_rgb:fff -->
            <b-img
              src="https://res.cloudinary.com/dn3hzwewp/image/upload/v1665597995/matchplay/igg/logo_igg_white.png"
            >
            </b-img>
          </b-col>
        </b-row>
      </b-jumbotron>
    </b-container>

    <!-- ANLÄGGNINGAR -->
    <b-container class="pt-3"  v-if="!loading">
      <b-row
        ref="clubs"
        class="justify-content-center mt-3 mb-5"
        align-h="center"
      >
        <b-col class="col-12 col-md-12">
          <h2 class="mb-4">Anslutna inomhusanläggningar</h2>
          <b-badge
            class="p-2 m-2 indoor"
            variant="secondary"
            v-for="club in clubs"
            :key="club.index"
          >
            {{ club.title }}
          </b-badge>
        </b-col>
        <b-col class="hidden col-12 col-md-4 mt-5 mt-md-0 pt-5">
          <b-img
            rounded="circle"
            src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_500,h_500,c_fill,g_south_east,q_70/v1665562700/matchplay/igg/_DSC7827.jpg"
            src2="https://res.cloudinary.com/dn3hzwewp/image/upload/w_500,h_500,c_fill,g_south_west,q_70/v1663921938/matchplay/igg/DSC00224.jpg"
            fluid
          ></b-img>
        </b-col>
      </b-row>
    </b-container>


    <!-- HOW IT WORKS -->
   <howitworks2 :headline="'Så här fungerar tävlingen'"  v-if="!loading" />

    <!-- RUFF/IGG -->
    <b-container fluid class="no-padding mt-5" v-if="!loading">
      <b-jumbotron fluid style="background:#fff;">
        <b-row>
          <b-col class="text-center col-12">
            <h2 class="mb-5">Vill du veta mer innan du bestämmer dig?</h2>
          <b-button variant="primary"
                size="lg"
                class="btn-igg"
                to="/info_indoor">
            Läs vår FAQ
          </b-button>
           <b-button              
                variant="primary"
                to="/prisbord"
                size="md"
                class="btn-igg"
                >Prisbordet!</b-button
              >
          </b-col>
        </b-row>
      </b-jumbotron>
    </b-container>

    <!-- BILDER ANLÄGGNINGAR -->
    <b-container fluid class="no-padding images" v-if="!loading">
      <b-jumbotron fluid class="">
        <b-row>
          <b-col class="text-center col-12 col-md-6">
            <b-img
              src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_500/v1665562702/matchplay/igg/_DSC7983.jpg"
            >
            </b-img>
          </b-col>
          <b-col col="6" class="text-center col-12 col-md-6 mt-3 mt-md-0">
            <!-- e_colorize,co_rgb:fff -->
            <b-img
              src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_500/v1663921938/matchplay/igg/DSC09580.jpg"
            >
            </b-img>
          </b-col>
        </b-row>
         <b-row class="mt-3 mt-md-4">
          <b-col class="text-center col-12 col-md-6">
            <b-img
              src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_500/v1665562700/matchplay/igg/_DSC7041.jpg"
            >
            </b-img>
          </b-col>
          <b-col col="6" class="text-center col-12 col-md-6 mt-3 mt-md-0">
            <!-- e_colorize,co_rgb:fff -->
            <b-img
              src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_500/v1663921938/matchplay/igg/DSC00420.jpg"
            >
            </b-img>
          </b-col>
        </b-row>
          <b-row class="mt-3 mt-md-4">
          <b-col class="text-center col-12 col-md-6">
            <b-img
              src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_500/v1665562702/matchplay/igg/_DSC7053.jpg"
            >
            </b-img>
          </b-col>
          <b-col col="6" class="text-center col-12 col-md-6 mt-3 mt-md-0">
            <!-- e_colorize,co_rgb:fff -->
            <b-img
              src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_500/v1663921937/matchplay/igg/DSC00015.jpg"
            >
            </b-img>
          </b-col>
        </b-row>
      </b-jumbotron>
    </b-container>
   



  </div>
</template>

<script>
import { globalState } from "../main.js";
import { mapGetters } from "vuex";
import register from "./Register";
import Howitworks2 from "./Howitworks2";
import Keytakeaways2 from './KeyTakeaways2.vue';
import moment from "moment";

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
  name: "indoor",
  components: { register, Howitworks2,Keytakeaways2 },
  data() {
    return {
      latestTeam: null,
      compid: globalState.compid_igg,
      price_private: this.price_1,
      doctitle: "Matchplay Indoor 2023",
      loading: true,
      closed: globalState.closed,
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

    this.latestTeam = null;
    this.getlatestteam();
  },

  mounted() {},
  computed: {
    ...mapGetters(["price1"]),
  },
  methods: {
       getlatestteam() {
      this.axios
        .post(globalState.admin_url + "getLatestPaidTeam", {
          competition: globalState.compid_igg
        })
        .then((response) => {
          if (response.data) {
            let paidAt = moment(response.data.paidAt).add(0, "hour").format();
            let test = moment().diff(paidAt, "hours");
            let regDate = moment(paidAt, "YYYY-MM-DD hh:mm").fromNow();
            //this.toast('b-toaster-top-center',response.data, paidAt);
            //console.log(response.data)
            if (test < 23) {
              //if (paidAt !== latestTeam) {
               
              if (!response.data.logourl) {
                this.latestTeamLogo =
                  "v1573118127/matchplay/matchplay-new-logo-2020.png"; //failover matchplay logo
              } else {
                this.latestTeamLogo = response.data.logourl;
              }

              this.latestTeam =
                "Ett lag från " +
                response.data.coursename +
                " anmäldes för " +
                regDate +
                " sedan av " +
                response.data.teamleadername +
                ".";
            } else {
              this.latestTeam = null;
            }

          
            //localStorage.setItem('latestTeam',paidAt);

            //OLD TOAST, MOVED TO HERO
            /* setTimeout(() => {
                  this.toast('b-toaster-top-center',response.data, paidAt);
                  localStorage.setItem('latestTeam',paidAt);                  
                }, 1500);  */

            //}
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
        getClubImage2(logourl) {
      return (
        "https://res.cloudinary.com/dn3hzwewp/image/upload/w_100,q_80,c_scale/" +
        logourl
      );
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
  background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1200,q_auto,e_colorize:50,co_rgb:000000/v1663921938/matchplay/igg/DSC09580.jpg);
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
