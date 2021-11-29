<template>
  <div>
    <!-- HEADLINE -->
    <div class="justify-content-center align-self-center">
      <div
        class="
          wallpaperContainer1
          m-0
          d-flex
          justify-content-center
          align-self-center
          p-4
          flex-wrap
        "
        :style="{
          backgroundImage: 'url(' + competition.competitionpictureurl + ')',
        }"
      >
        <div class="p-4 d-flex justify-content-center align-self-center">
          <b-row class="layover">
            <b-col class="p-4" offset-md="3" md="6" sm="12">
              <h2
                class="text-color-light text-center pt-5"
                style="font-size: 3.5rem !important"
              >
                {{ competition.competitionname }}
              </h2>
              <hr />
              <h3 class="w-100" style="font-size: 1.8rem !important">
                MATCHPLAY
              </h3>
              <hr />

              <p class="text-light text-justify">
                {{ competition.presentation }}
              </p>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>

    <!-- WINNERS -->
    <div class="wallpaperContainer1 p-0 m-0" v-if="competition.winners">
      <div class="pt-5 pb-5">
        <h2>Årets Vinnare Spanien</h2>
        <div
          class="text-center text-color-light mt-5"
          v-for="winners in competition.winners"
          :key="winners.index"
        >
          <h2>
            <strong class="mb-0"> {{ winners.name }} </strong>
          </h2>
          <small class="mt-0">{{ winners.club }}</small>
        </div>
        <h3 class="pt-5 mt-5 pb-2" >Årets Sverigefinalvinnare</h3>
        <div
          class="text-center text-color-light "
          v-for="winners in competition.winnersSF"
          :key="winners.index"
        >
        <div>
          <h5 class="mb-0">
            <strong class="mb-0"> {{ winners.name }} </strong>
          </h5>
          <small class="mt-0 mb-5 clear">{{ winners.club }}</small>
        </div>
        </div>
    </div>

     <hr />
        <h3
          class="text-center text-color-light mt-5 mb-4"
          v-if="competition.finalteams"
        >
          Övriga finalister
        </h3>
        <div
          class="text-center text-color-light mt-4"
          v-for="players in competition.finalteams"
          :key="players.index"
        >
          <h5>
            <strong class="mb-0"> {{ players.name }} </strong>
          </h5>
          <small class="mt-0">{{ players.club }}</small>
        </div>
      </div>

    <!-- Price -->
    <div class="wallpaperContainer5" v-if="competition.price">
      <div class="p-sm-4">
        <b-container>
          <b-row class="p-4">
            <b-col offset-md="3" md="6" sm="12">
              <div class="text-center text-color-light mt-5">
                <h2>
                  <strong class="mb-0"> Finalresan </strong>
                </h2>
                <hr />

                <h3 class="mt-0">{{ competition.price.destination }}</h3>
              </div>
              <hr />

              <p class="text-light text-justify p-4">
                <span v-html="competition.price.text"></span>
              </p>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>

    <!-- STATS -->
    <div class="wallpaperContainer2 p-0 m-0">
      <div class="pt-5 pb-5">
        <div v-if="competition.stats">
          <h5 class="mb-3">
            <strong>Anmälda lag:</strong> {{ competition.stats.teams }}
          </h5>
          <h5 class="mb-3">
            <strong> Repr klubbar:</strong> {{ competition.stats.clubs }}
          </h5>
          <h5 class="mb-3">
            <strong> Snittålder:</strong> {{ competition.stats.age }}
          </h5>
          <h5 class="mb-3">
            <strong> Snitthcp:</strong> {{ competition.stats.hcp }}
          </h5>
        </div>
        <h5 class="text-center mt-5"><strong> Topplista klubbar </strong></h5>
        <div class="p-4">
          <podium
            number="10"
            :prevCompetitionId="competition._id"
            class="text-light"
            variant="warning"
          ></podium>
        </div>
      </div>
    </div>
    <div class="wallpaperContainer4 p-0 m-0">
      <div class="p-4 pt-5 pb-5 ml-sm-5 mr-sm-5">
        <b-row>
          <b-col class="p-4" offset-md="3" md="6" sm="12">
            <app-birdie-ligan
              class="text-color-light"
              :competitionid="competition._id"
              :numberofbirdies="10"
            ></app-birdie-ligan>
          </b-col>
        </b-row>
      </div>
    </div>

    <!-- VIDEO  -->
    <app-video-block v-if="competition.video1" :video="competition.video1">
    </app-video-block>

    <!-- IMAGES -->
    <div class="wallpaperContainer3 p-0 m-0" v-if="allGameImages.length">
      <app-image-collage
        class="bg-image-collage d-flex justify-content-center"
        v-if="allGameImages.length"
        :numberOfImages="numberOfImages"
        :imagesInColumn="10"
        :images="allGameImages"
      ></app-image-collage>
    </div>

    <!-- VIDEO 2 -->
    <app-video-block
      v-if="competition.video2"
      :video="competition.video2"
      :flip="true"
    >
    </app-video-block>

    <!-- GO TO INFO -->
    <div class="divider-blue p-4">
      <div class="pt-5 p-2">
        <hr class="text-color-light ml-4 mr-4" />
        <h5 class="text-color-light text-center pt-5">
          Hur fungerar tävlingen?
        </h5>
        <p class="text-light text-center">
          Få svar på alla dina frågor om tävling på under FAQ
        </p>
      </div>

      <div
        class="
          d-flex
          justify-content-center
          align-items-center
          flex-wrap
          pt-5
          pb-4
        "
      >
        <b-button @click="$router.push('/info')" size="lg" variant="light" pill
          >GÅ till Info</b-button
        >
      </div>
      <hr class="text-color-light ml-4 mr-4" />
      <br />
    </div>

    <!-- special1 -->
    <div class="gradient p-0 m-0" v-if="competition.special1">
      <div class="p-sm-4">
        <b-container>
          <b-row class="p-4">
            <b-col md="8" sm="12">
              <div>
                <b-img
                  fluid
                  :src="competition.special1.url"
                  class="shadow-lg rounded mb-4"
                >
                </b-img>
              </div>
            </b-col>
            <b-col md="4" sm="12">
              <p>
                {{ competition.special1.ingress }}
              </p>
              <i class="text-color-light">
                - "{{ competition.special1.text }}"</i
              >
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>

    <!-- special 2 -->
    <div class="gradient p-0 m-0" v-if="competition.special2">
      <div class="p-sm-4">
        <b-container>
          <b-row class="p-4">
            <b-col md="8" sm="12">
              <div>
                <b-img
                  fluid
                  :src="competition.special2.url"
                  class="shadow-lg rounded mb-4"
                >
                </b-img>
              </div>
            </b-col>
            <b-col md="4" sm="12">
              <p>
                {{ competition.special2.ingress }}
              </p>
              <i v-if="competition.special2.text" class="text-color-light">
                "{{ competition.special2.text }}"</i
              >
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>

    <!-- TESTIMONIALS -->
    <div
      class="d-flex justify-content-center divider-blue text-color-light p-4"
    >
      <testimonials
        :number="5"
        :register="!closed"
        variant="light"
      ></testimonials>
    </div>

    <!-- GO TO SIGN UP -->
    <app-call-to-action></app-call-to-action>

    <!-- Henke ⚽️ ⚽️ ⚽️ -->
    <app-henke-larsson> </app-henke-larsson>
  </div>
</template>

<script>
import { globalState } from "../main.js";
import AppImageCollage from "./ImageCollage";
import AppVideoBlock from "./VideoBlock";
import AppBirdieLigan from "./BirdieLigan";
import AppCallToAction from "./CallToAction";
import AppHenkeLarsson from "./HenkeLarsson";
import podium from "./Podium.vue";
import testimonials from "./Testimonials.vue";

export default {
  created() {
    this.setData();
    this.gameImages();
    this.getBirdies();
  },
  components: {
    AppImageCollage,
    AppVideoBlock,
    podium,
    AppBirdieLigan,
    testimonials,
    AppCallToAction,
    AppHenkeLarsson,
  },
  data() {
    return {
      competition: {},
      allGameImages: [],
      birdies: null,
      closed: globalState.closed,
    };
  },
  methods: {
    setData() {
      const competitionYear = this.$route.params.competition;
      if (competitionYear === "2020") {
        this.competition =
          this.$store.getters["getCompetition"](competitionYear);
      } else if (competitionYear === "2021") {
        this.competition =
          this.$store.getters["getCompetition"](competitionYear);
      } else {
        this.$router.push("/tavlingar");
      }
    },
    gameImages() {
      this.axios
        .post(globalState.admin_url + "allGameImages", {
          competition: this.competition._id,
        })
        .then((response) => {
          this.$store.dispatch("setAllImages", response.data);
          this.allGameImages = response.data;
          //create an even number of images for component
          if (response.data.length % 2 == 0) {
            this.numberOfImages = response.data.length;
          } else {
            this.numberOfImages = response.data.length - 1;
          }
          this.loadingimages = false;
        })
        .catch((error) => {
          console.log(error);
          this.loadingimages = false;
        });
    },
    getBirdies() {
      this.axios
        .post(globalState.admin_url + "getAchievementData", {
          //getclubstoplist
          competition: globalState.compid,
          type: "birdie",
          no: 20,
        })
        .then((response) => {
          this.birdies = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    truncate: function (club) {
      let len = 30;
      if (club.length > len) return club.substring(0, len) + "...";
      else return club;
    },
  },
};
</script>


<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/bootstrap-overwrite.css";

hr {
  border-top: 1px solid $light;
}

.layover {
  background-color: rgba(100, 94, 74, 0.724);
  min-height: 500px;
}

.wallpaperContainer1 {
  min-height: 650px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: 50%;
  background-position-y: 50%;
  background-image: url("https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1608122032/matchplay/MPI-1825.jpg");
}

.wallpaperContainer2 {
  min-height: 650px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: 50%;
  background-position-y: 50%;
  background-image: url("https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_auto,q_auto,e_colorize:50,co_rgb:000000/v1572963227/matchplay/c640cf_76573b7e69c04dc2bb0592399d738a17_mv2_d_4006_3000_s_4_2.jpg");
}
.wallpaperContainer3 {
  background-repeat: no-repeat;
  min-height: 650px;
  background-size: cover;
  background-position-x: 50%;
  background-position-y: 50%;
  background-image: url("https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_auto,q_auto,e_colorize:50,co_rgb:000000/v1608219772/matchplay/bg_matchplay.jpg");
}

.wallpaperContainer4 {
  min-height: 650px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: 50%;
  background-position-y: 50%;
  background-image: url("https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_auto,q_auto,e_colorize:50,co_rgb:000000/v1572942209/matchplay/c640cf_402261724c71433c9662662c3114e5b8_mv2_d_4500_3000_s_4_2.jpg");
}
.wallpaperContainer5 {
  min-height: 550px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: 50%;
  background-position-y: 50%;
  background-image: url("https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_auto,q_auto,e_colorize:50,co_rgb:000000/v1631699117/matchplay/background.jpg");
}

.text-color-light {
  color: $light;
}
>>> .card-testimonial {
  color: $light;
  background-color: #2e5783;
}

h2 {
  color: $light;
  letter-spacing: 5px;
  font-size: 4vw;
  text-align: center;
}
h3 {
  color: $light;
  letter-spacing: 5px;
  font-size: 3vw;
  text-align: center;
}
h5 {
  color: $light;
  letter-spacing: 5px;
  font-size: 2vw;
  text-align: center;
}

.divider-blue {
  background-color: #2e5783;
  min-height: 450px;
}
</style>
