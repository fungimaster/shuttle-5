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
              pb-0 pb-md-0
              text-center">
            <h1 class="mb-3 white">32 LAG</h1>
            <h1 class="mb-3 white">6 MATCHER*</h1>
            <h1 class="mb-0 white">FINAL I ITALIEN</h1>
           
          </b-col>

           <b-col            
            class="col-12 col-md-6 mt-4 mb-3 mb-md-4 text-center"
            id="countdown"
          >
            <h4 class="mb-2 mb-md-3">Sista anmälningsdag 20 aug.</h4>
            <p>
              Missa inte att anmäla ert lag till årets roligaste golftävling, anmälan stänger 20 maj 23.59.
            </p>
            <b-row align-h="center mt-4">
              <b-col class="col-3 p-0">
                <span id="days" class="blink-fast red days timenumbers"
                  >01</span
                >
                <p class="timeRefDays timedescription">dagar</p>
              </b-col>
              <b-col class="col-3 p-0">
                <span id="hours" class="hours timenumbers">00</span>
                <p class="timeRefHours timedescription">timmar</p>
              </b-col>
              <b-col class="col-3 p-0">
                <span id="minutes" class="minutes timenumbers">00</span>
                <p class="timeRefMinutes timedescription">minuter</p>
              </b-col>
              <b-col hidden class="col-3 p-0">
                <span id="seconds" class="seconds timenumbers">00</span>
                <p class="timeRefSeconds timedescription">sekunder</p>
              </b-col>
            </b-row>
          </b-col>

          <b-col class="col-md-10">
          
            <div class="hidden mt-5 text-center">
              <div class="text-center" v-if="closed"><h3>- Anmälan till tävlingen är nu stängd -</h3></div>
               <b-button
                v-if="closed"
                variant="primary"
                to="results"
                size="md"
                class="btn"
                >Följ årets matcher</b-button
              >
             <a href="/register" class="btn btn-primary btn-lg text-white"
                >Anmäl ditt lag</a
              >
              <p class="mt-3">* Alla utslagningsmatcher spelas i ditt lokalområde</p>
            </div>
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

     <!-- INFO TEXT -->
    <b-container v-if="!loading" class="mb-5">
       <b-row class="justify-content-center" align-h="center">
        <b-col class="col-12 mb-2">
        <p><strong>Matchplay Local Series</strong> är en matchspelstävling med <strong>32 startande lag</strong> och där det vinnande laget från respektive Local Series (Stockholm och Malmö) gör upp om titeln i en matchspelsserie mellan 22-26 oktober på Golf Le Fonti i Bologna, Italien.</p>
<p>De sex grundomgångarna spelas mellan datumen 21 augusti och 15 oktober. Vinnaren i omgång sex från respektive Local Series får åka till den italienska finalen.</p>
<p>En av uppsidorna i Local Series är att resandet till en match inte är för långt. Vi försöker att styra upp alla matcher på ett sätt där deltagarna inte behöver åka mer än 50km för att spela sin match.</p>
<p>Förlorande lag i första omgången går automatiskt till Andra Chansen, ett nytt matchspelsträd, där vinnande laget vinner en weekend i Portugal. 
Genom Andra Chansen så är alla lag som deltar i Matchplay Local Series garanterade minst två matcher.</p>
<p hidden>
Vinnande lag i Local Series Stockholm och Local Series Malmö får åka till Golf Le Fonti och tävla om titeln i Matchplay Local Series 2023. Matchplay står för flyg, transfer, boende, middag och golf på plats. Finalen spelas mellan 22-26 oktober.
</p>
<p>Priset för ett lag är endast <strong>450:-</strong> och ni betalar enkelt med swish.</p>

 <a href="/register" class="btn btn-primary text-white mt-2"
                >Anmäl ditt lag</a
              >

        </b-col>
      </b-row>
    </b-container>

    <b-container v-if="!loading" class="mt-5 mb-4">
   <b-row>
          <b-col class="col-12 mb-3 mt-5">
            <h3>Omgångar 2023</h3>
            <app-rounds-grafic
              class="mt-3"
              style="height: 300px"
              linecolor="#808080"
              opacity="1"
              stagefill="black"
              :condensed="false"
            ></app-rounds-grafic>
            <p class="small text-right mt-2">
              <i>Klicka på diagrammet ovan för att se omgångsdatum.</i>
            </p>
          </b-col>
        </b-row>
 </b-container>
   
    <!-- REGISTER -->
   <!--  <b-container ref="register" v-if="!loading && !closed" class="mb-5">
      <b-row class="justify-content-center" align-h="center">
        <b-col class="col-12 mb-2">
          <register :igg="true"></register>
        </b-col>
      </b-row>
    </b-container> -->

  <!-- FINALRESAN -->

 <b-container ref="final" v-if="!loading && !closed" class="mb-5">
  <b-row class="mt-5">
    <b-col class="col-12">
      <hr class="mb-5" />
      <h2></h2>
        <p>
         Vinnaren i Local Series Stockholm och Local Series Malmö får åka till Golf Le Fonti och tävla om titeln i Matchplay Local Series 2023. Matchplay står för flyg, transfer, boende, middag och golf på plats. Finalen spelas mellan 22-26 oktober.
        </p>
    </b-col>
     <b-col class="col-12 text-center">
         <video
        class="video-fluid d-block d-md-none"
        src="https://res.cloudinary.com/dn3hzwewp/video/upload/c_fill,w_400,q_auto:eco,so_1.8/v1678972618/matchplay/final2023/Golf_Club_le_fonti__Matchplay_2023.mp4"            
        muted
        loop
        allowfullscreen
        controls
      ></video>
        <video
        class="video-fluid d-none d-md-block"
        src="https://res.cloudinary.com/dn3hzwewp/video/upload/c_fill,w_1200,q_auto:eco,so_1.8/v1678972618/matchplay/final2023/Golf_Club_le_fonti__Matchplay_2023.mp4"            
        muted
        loop
        allowfullscreen
        controls
      ></video>
     </b-col>
     <b-col class="col-12 mt-4 text-center">
      <router-link
              class="btn btn-success btn-md text-white mt-2 mr-2"
              to="/final"
            >
              <i class="pb-1 mr-2 material-icons">flight</i>Läs mer om resan här
            </router-link>
     </b-col>
  </b-row>
 </b-container>

    <!-- HOW IT WORKS -->
   <howitworks :headline="'Så här fungerar tävlingen'"  v-if="!loading" />




  </div>
</template>

<script>
import { globalState } from "../main.js";
import { mapGetters } from "vuex";
import register from "./Register";
import Howitworks from "./Howitworks";
import moment from "moment";
import Podium from "./Podium";
import AppRoundsGrafic from "./RoundsGrafic";


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
  components: { register, Howitworks,Podium, AppRoundsGrafic },
  data() {
    return {
      latestTeam: null,      
      showTopClubs: globalState.showTopClubs,
      compid: globalState.compid,
      price_private: this.price_1,
      doctitle: "Matchplay Local Series 2023",
      loading: true,
      closed: globalState.closed,
      clubs: [],
    };
  },
  mounted() {
   
  },
  created() {
    this.axios
      .post(globalState.admin_url + "getGolfclubs", {
        id: globalState.compid,
      })
      .then((response) => {
        //this.parseCourse(response.data);
        // console.log(response.data);
        this.clubs = response.data;

        //LOAD COMP DATA
        const promise = this.$store.dispatch(
          "getCompetition",
          globalState.compid
        );
        promise.then(() => {
          (this.price_private = this.price1), (this.loading = false), this.countdown() ;
        });
      })
      .catch((error) => {
        // this.errorMSG = "Something went wrong (No course found)";
        console.log(error);
      });

  
    this.latestTeam = null;
/*     this.getlatestteam('iHv4PtxyoTHLJQSJZ');    
    this.getlatestteam('NPiNmtGS9RZ9ry7zY');    
    this.getlatestteam('9SPfjtNpvKenZCmDB');    */
    
  },

  
  computed: {
    ...mapGetters(["price1"]),
  },
  methods: {
    countdown() {      
      let parentvue = this;

      const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

      let closedate = "August 20, 2023 23:59:59",
        //let closedate = "March 25, 2021 17:21:00",
        countDown = new Date(closedate).getTime(),
        x = setInterval(function () {
          let now = new Date().getTime(),
            distance = countDown - now;
          if (document.getElementById("days")) {            
            (document.getElementById("days").innerText = Math.floor(
              distance / day
            )),
              (document.getElementById("hours").innerText = Math.floor(
                (distance % day) / hour
              )),
              (document.getElementById("minutes").innerText = Math.floor(
                (distance % hour) / minute
              )),
              (document.getElementById("seconds").innerText = Math.floor(
                (distance % minute) / second
              ));
          } else {
            clearInterval(x);
          }
          //do something later when date is reached
          if (distance < 0) {
            parentvue.closed = true;
            clearInterval(x);
          }
          //seconds
        }, 0);
    },
       getlatestteam(compid) {  
      this.axios
        .post(globalState.admin_url + "getLatestPaidTeam", {
          competition: compid
        })
        .then((response) => {
          if (response.data) {

            if (!response.data.paidAt) return; //no correct return
            
            let paidAt = moment(response.data.paidAt).add(0, "hour").format();            
            let test = moment().diff(paidAt, "hours");
            let regDate = moment(paidAt, "YYYY-MM-DD hh:mm").fromNow();
         
            if (test < 23) {               
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

video {
  width:100%;
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
  background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1200,q_auto,e_colorize:20,co_rgb:000000/v1688979170/matchplay/local/Golf_Le_Fonti_picture.jpg);
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
