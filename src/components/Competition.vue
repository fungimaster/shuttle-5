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
        <h2>Årets Vinnare</h2>
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
    </div>

    <!-- STATS -->
    <div class="wallpaperContainer2 p-0 m-0" >
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
          <podium number="10" :prevCompetitionId=competition._id class="text-light" variant="warning"></podium>
        </div>
      </div>
    </div>
    <div class="wallpaperContainer4 p-0 m-0">
      <div class="p-4 pt-5 pb-5 ml-sm-5 mr-sm-5">
        <app-birdie-ligan
          class="text-color-light"
          :competitionid="competition._id"
          :numberofbirdies="10"
        ></app-birdie-ligan>
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
    <div class="divider-blue">
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
        class="d-flex justify-content-center align-items-center flex-wrap pt-5"
      >
        <b-button @click="$router.push('/info')" size="lg" variant="light" pill
          >GÅ till Info</b-button
        >
      </div>
        <hr class="text-color-light ml-4 mr-4 mt-5" />
    </div>
    <div class="gradient p-0 m-0" v-if="competition.special">
      <div class="p-sm-4">
        <b-row class="p-4">
          <b-col md="8" sm="12">
            <div>
              <b-img
                fluid
                :src="competition.special.url"
                class="shadow-lg rounded mb-4"
              >
              </b-img>
            </div>
          </b-col>
          <b-col md="4" sm="12">
            <p>
              {{ competition.special.ingress }}
            </p>
            <i class="text-color-light"> - "{{ competition.special.text }}"</i>
          </b-col>
        </b-row>
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
    <div
      class="
        wallpaperContainer2
        pb-4
        m-0
        d-flex
        justify-content-center
        align-items-center
        flex-wrap
      "
    >
      <div>
        <h1 class="text-color-light text-center">
          Vill du vara med i Sveries största och roligaste matchspeltävling?
        </h1>
        <h4 v-if="closed" class="text-warning text-center pt-4">
          Anmälan är stängd och öppnar i december.
        </h4>
        <h6 v-if="closed" class="text-warning text-center p-4">
          Följ oss på
          <a href="https://www.facebook.com/matchplaysweden/" target="_blank"
            >Facebook</a
          >
          för ta del av de nyheter och tävlingar.
        </h6>
        <div class="d-flex justify-content-center pt-4">
          <b-button variant="light" size="lg" pill :disabled="closed"
            >Till anmälan!</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { globalState } from "../main.js";
import AppImageCollage from "./ImageCollage";
import AppVideoBlock from "./VideoBlock";
import AppBirdieLigan from "./BirdieLigan";
import podium from "./Podium.vue";
import testimonials from "./Testimonials.vue";

export default {
  created() {
    if (this.$route.params.competition === "2020") {
      this.competition = {
        _id: "sFAc3dvrn2P9pXHAz",
        competitioninfo:
          "Matchplay är en matchspelstävling för par med officiellt handicap. Par kan vara män, kvinnor eller mix. Tävlingen spelas i Sverige på golfklubbar anslutna till Svenska Golfförbundet.",
        competitionname: "2020",
        competitionpictureurl:
          "https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1200,q_auto,e_colorize:60,co_rgb:000000,e_blur:300/v1617895896/matchplay/bg_matchplay.jpg",
        finallag: [],
        finalteams: null,
        presentation:
          "Matchplay Sweden 2020 avgjordes en solig dag i oktober. Vinnarna fick hänga med på resan Los Naranjos. Som alltid ett stort tack för ert deltagande och återseende nästa år.",
        special: null,
        stats: null,
        video1: {
          bgimage:
            "https://res.cloudinary.com/dn3hzwewp/image/upload/v1631010958/matchplay/Nileskar.png",
          headline: "Intervju med Christiansson & Nileskär",
          text: "",
          url: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fmatchplaysweden%2Fvideos%2F353100142577281%2F&show_text=false&width=560&&autoplay=true&t=0",
        },
        video2: {
          bgimage:
            "https://res.cloudinary.com/dn3hzwewp/image/upload/v1631011152/matchplay/carnorwendin.png",
          headline: "Intervju med Carnor & Wedin",
          text: "",
          url: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fmatchplaysweden%2Fvideos%2F388256685545899%2F&show_text=false&width=560&autoplay=true&t=0",
        },

        winners: [
          {
            club: "",
            name: "Carnor/Wedin",
          },
          {
            club: "",
            name: "Christiansson/ Nileskär",
          },
        ],
      };
    }

    if (this.$route.params.competition === "2021") {
      this.competition = {
        _id: "8dmNL5K5ypaHbTbEM",
        club: "3cyyCoTn46QfhqMRq",
        competitioninfo:
          "Matchplay är en matchspelstävling för par med officiellt handicap. Par kan vara män, kvinnor eller mix. Tävlingen spelas i Sverige på golfklubbar anslutna till Svenska Golfförbundet.",
        competitionname: "2021",
        competitionpictureurl:
          "https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1200,q_auto,e_colorize:60,co_rgb:000000,e_blur:300/v1631006181/matchplay/vinnare.jpg",
        finallag: [],
        finalteams: [
          {
            club: "Vadstena GK",
            name: "Johansson/Gustafsson",
          },
          {
            club: "Bollnäs GK",
            name: "Brosten/Sigvardsson",
          },
          {
            club: "Arninge GK",
            name: "Andersson/Hamilton",
          },
          {
            club: "PGA Sweden National",
            name: "Carlsson/Hall",
          },
          {
            club: "Örebro City GCC",
            name: "Sahlin/Jungander",
          },
          {
            club: "Bokskogen GK/Holms GK",
            name: "Wennolf/Ljungberg",
          },
          {
            club: "Lyckorna GK/Onsjö GK",
            name: "Landberg/Bengtsson",
          },
          {
            club: "Mauritzbergs SI/Göteborgs Golf",
            name: "Söderström/Wakeus",
          },
          {
            club: "Skepparslövs GK",
            name: "Kullberg/Johansson",
          },
          {
            club: "Örebro City GCC",
            name: "Andersson/Berggren",
          },
        ],
        presentation:
          "Matchplay Sweden är avgjort för detta året och vi säger stort grattis till vinnarna! Från Huvudtävlingen till Andra Chansen - ett stort tack för ert deltagande och återseende nästa år.",
        special: {
          ingress:
            "Plötsligt händer det - och här är ett exempel! Martin Ljunggren spelade sin match på Borås Norra bana och på hål 15, ett par 4 så hände det vi många enbart kommer att drömma om. Martin berättar",
          text: "Under gårdagens match mellan mig och Carl Lejon mot Markus Andersson och Peter Lindeberg hade jag lyckan att göra en HIO på hål nummer 15 på Borås norra banan. Slaget skedde med driver och hålet spelades strax över 300 m med tanke på flaggplacering och teeplacering. När vi inte kunde hitta bollen i närheten av green gick jag och tittade i koppen och chocken var total när bollen låg där",
          url: "https://res.cloudinary.com/dn3hzwewp/image/upload/v1631006701/matchplay/hole_in_one.jpg",
        },
        stats: {
          age: 43,
          clubs: 232,
          hcp: 12.2,
          teams: 712,
        },
        video1: {
          bgimage:
            "https://res.cloudinary.com/dn3hzwewp/image/upload/v1631006660/matchplay/videoimage2.png",
          headline: "Live från finaldagen 2021",
          text: "Sverigefinalen 2021 spelades på AlLerums GK. Matcherna gick att följa live på hemsidan och på Facebook publicerades livesändningar likt denna.",
          url: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fmatchplaysweden%2Fvideos%2F2991832374362345%2F&show_text=false&width=560&autoplay=true&t=0",
        },
        video2: {
          bgimage:
            "https://res.cloudinary.com/dn3hzwewp/image/upload/v1631006653/matchplay/videoimage1.png",
          headline: "Dramatik in i det sista!",
          text: "All square in för sista och avgörande hålet! Arvid ligger pin-heigh för en birdieputt och har inga slag på hålet. I andra laget har Jonatan på tre slag en chip på ca 10 meter och inga slag på hålet. Se den dramatiska upplösningen",
          url: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fmatchplaysweden%2Fvideos%2F2779410105631927%2F&show_text=false&width=560&&autoplay=true&t=0",
        },
        winners: [
          {
            club: "Kårsta GK",
            name: "Carlsson/Lindström",
          },
          {
            club: "Borås GK",
            name: "Lind/Fråhn",
          },
        ],
      };
    }
    this.gameImages();
    this.getBirdies();
  },
  components: {
    AppImageCollage,
    AppVideoBlock,
    podium,
    AppBirdieLigan,
    testimonials,
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
