<template>
  <b-container
    class="gradient p-3 p-md-5 d-flex justify-content-center"
    :class="isMobile ? 'bg-color' : 'swaying-background'"
    fluid
  >
    <b-row class="pt-4 pb-4">
      <b-col offset-md="3" md="6" sm="12">
        <h2 class="pb-5 text-center review-headline">Återblick Matchplay {{ year }}</h2>

        <div
          class="
            d-flex
            flex-wrap
            justify-content-center
            align-items-center
            bg-color
            rounded
            backdrop
          "
        >
          <div class="p-3 pt-5 p-md-5">
            <div
              class="
                d-flex
                justify-content-center
                align-items-center
                gradient
                pr-3
                pl-3
              "
            >
            <!--
              https://res.cloudinary.com/dn3hzwewp/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:zorro/v1631006181/matchplay/vinnare.jpg
              
              -->
              <b-img
                class="img"
                fluid
                :src="
                  myImages
                    ? myImages
                    : 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:zorro/v1638199895/matchplay/IMG_5205.jpg'
                "
              ></b-img>
            </div>
            <div class="w-100 mt-5">
              <b-row>
                <b-col cols="6">
                  <small class="text-light">Vinnare </small>

                  <div
                    v-for="winner in competition.winners"
                    :key="winner.index"
                  >
                    <small class="d-block color-yellow">{{
                      winner.name
                    }}</small>
                  </div>
                       <small class="text-light">Runner up </small>
                        <small class="d-block color-yellow">
                      TBA
                    </small>
                  <div
                    v-for="second in competition.second"
                    :key="second.index"
                  >
                    <small class="d-block color-yellow">{{
                      second.name
                    }}</small>
                  </div>
                </b-col>
                <b-col cols="6" v-if="total">
                 
                  <small class="text-light"> Birdieligan</small>
                  <div
                    v-for="(birdie, index) in total"
                    :key="birdie.index"
                    class="white-space"
                  >
                    <small class="d-block color-yellow text-overflow"
                      ><span class="text-light"> {{ index + 1 }}.</span>
                      {{ birdie.playername }}</small
                    >
                  </div>
                </b-col>
              </b-row>
              <b-row class="pt-4">
                <b-col cols="6">
                  <small class="text-light"
                    >Antal <br class="custom-br" />
                    <span class="mt-0">Birdies</span>
                  </small>
                  <h1 class="color-yellow">{{ totaltBirdies }}</h1>
                </b-col>
                <b-col cols="6">
                  <small class="text-light"
                    >Spelade <br class="custom-br" />Matcher</small
                  >
                  <h1 class="color-yellow">602</h1>
                </b-col>
              </b-row>
              <b-row class="pt-4" v-if="user && user._id && !loading">
                <b-col cols="6" v-if="playerBirdie">
                  <small class="text-light"
                    >Med {{ playerBirdie }}
                    <span v-if="playerBirdie > 1">gjorda</span>
                    <span v-else> gjord</span> <br class="custom-br" />
                    <span v-if="playerBirdie > 1">birdies</span>
                    <span v-else> birdie</span>
                    är du topp</small
                  >
                  <h1 class="color-yellow" v-if="!loading">
                    {{ getInterval(playerBirdiePercentage) }} %
                  </h1>
                </b-col>
                <b-col cols="6" v-if="hcpCompared">
                  <small class="text-light"
                    >Ditt hcp <br class="custom-br" />
                    tillhör top</small
                  >
                  <h1 class="color-yellow">{{ getInterval(hcpCompared) }} %</h1>
                </b-col>
              </b-row>
              <b-skeleton-wrapper :loading="loading">
                <template #loading>
                  <div class="d-flex justify-content-between">
                    <b-skeleton width="40%"></b-skeleton>
                    <b-skeleton width="40%"></b-skeleton>
                  </div>
                  <div class="d-flex justify-content-between">
                    <b-skeleton width="40%"></b-skeleton>
                    <b-skeleton width="40%"></b-skeleton>
                  </div>
                  <div class="d-flex justify-content-between">
                    <b-skeleton width="40%"></b-skeleton>
                    <b-skeleton width="40%"></b-skeleton>
                  </div>
                </template>
              </b-skeleton-wrapper>
            </div>
          </div>
          <b-button
            variant="light"
            class="d-block align-self-end w-100 rounded-bottom"
            @click="$router.push('/tavlingar/2022')"
            >Gå Till Årssida</b-button
          >
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
import { mapGetters } from "vuex";
import { globalState } from "../main.js";

export default {
  props: ["isMobile", "year", "compid"],
  created() {
    this.competition = this.$store.getters["getCompetition"](this.year);
    //this.getBirdies();
     this.getTotal();
    if (this.user) {
      this.getAchievementDataPlayer();
    }
  },
  mounted() {},
  data() {
    return {
      competition: null,
      totaltBirdies: 1302,
      totalTeams: 412,
      totalPlayers: 824,
      playerBirdie: null,
      playerBirdiePercentage: null,
      loading: false,
      birdies: null,
      total: null
    };
  },
  methods: {
    getAchievementDataPlayer() {
      this.loading = true;
      this.axios
        .post(globalState.admin_url + "getAchievementDataPlayer", {
          competition: this.compid ? this.compid : globalState.compid,
          type: "birdie",
          player: this.user._id,
        })
        .then((response) => {
          this.playerBirdie = response.data;
          this.axios
            .post(globalState.admin_url + "getAchievementStats", {
              competition: globalState.compid,
              type: "birdie",
              number: response.data,
            })
            .then((response) => {
              this.playerBirdiePercentage =
                (response.data / this.totalPlayers) * 100;
              this.loading = false;
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    },
        getTotal() {
      //loading
      this.value = 5;

      this.axios
        .post(globalState.admin_url + "getAchievementTotal", {
          //getclubstoplist
          competition: this.competitionid
            ? this.competitionid
            : globalState.compid,
          //type: "eagle",
          no: 5
        })
        .then((response) => {
         
          this.total = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getBirdies() {
      this.axios
        .post(globalState.admin_url + "getAchievementData", {
          competition: this.compid ? this.compid : globalState.compid,
          type: "birdie",
          no: 5,
        })
        .then((response) => {
          this.birdies = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getInterval(critieria) {
      if (this.loading) {
        return "";
      } else if (critieria <= 1) {
        return "1";
      } else if (critieria <= 5) {
        return "5";
      } else if (critieria <= 10) {
        return "10";
      } else if (critieria <= 20) {
        return "20";
      } else if (critieria <= 30) {
        return "30";
      } else if (critieria <= 40) {
        return "40";
      } else if (critieria <= 50) {
        return "50";
      } else if (critieria <= 60) {
        return "60";
      } else {
        return "70";
      }
    },
  },
  watch: {
    user: {
      handler: function () {
        this.getAchievementDataPlayer();
      },
    },
  },
  computed: {
    ...mapGetters(["user", "competitionHcps"]),

    myImages() {
      if (!this.user) {
        return false;
      }

      let teams = this.user.teams || null;

      if (teams) {
        let games = teams.map((e) => e.games);

        if (!games.length) {
          return false;
        }

        let listsOfImages = games
          .flat()
          .filter((game) => game.imagesurl)
          .map((game) => game.imagesurl.flat())
          .map((imagesurlarray) => [...imagesurlarray]);

        if (!listsOfImages.length) {
          return false;
        }
        const merged = [].concat.apply([], listsOfImages);

        function shuffle(array) {
          var currentIndex = array.length,
            temporaryValue,
            randomIndex;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }

          return array;
        }

        const randomUrl = shuffle(merged)[0];

        const stringToAdd = "w_1000,ar_1:1,c_fill,g_auto,e_art:zorro";

        let spliturl = randomUrl.split("upload/");
        spliturl.splice(1, 0, "upload/" + stringToAdd + "/");
        let urlString = spliturl.join("");
        return urlString;
      }
    },
    addToUrl(url, stringToAdd) {
      if (!url) {
        return;
      }
    },
    hcpCompared() {
      if (!this.user || (!this.user.hcp && this.user.hcp !== 0)) {
        return false;
      }
      const { hcps } = this.$store.getters["getCompetition"](this.year);
      const numberOfHcps = hcps.length;
      const userHcp = this.user.hcp;

      let count = hcps.reduce(function (accumulator, val) {
        if (val.hcp < userHcp) {
          accumulator++;
        }
        return accumulator;
      }, 0);

      return (count / numberOfHcps) * 100;
    },
  },
};
</script>


<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/bootstrap-overwrite.css";

.color-yellow {
  color: #ffde58;
}
.bg-color {
  background-color: #027bfe;
}

.img {
  min-height: 200px;
  margin-top: -5%;
  margin-bottom: -5%;
  min-width: 200px;
}
.backdrop {
  margin-top: -5%;
  margin-bottom: -5%;
}

.swaying-background {
  -webkit-background-size: cover;
  background: rgb(51, 116, 182);
  background: radial-gradient(
    circle,
    rgba(51, 116, 182, 1) 41%,
    rgba(47, 47, 47, 1) 100%
  );
  animation: pulse 4s infinite alternate;
  background-size: 100% 100%;
  position: relative;
}

@-webkit-keyframes pulse {
  0% {
    background-size: 100% 100%;
  }
  100% {
    background-size: 140% 100%;
  }
}

.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
}
.white-space {
  white-space: nowrap;
}

.custom-br {
  display: block;
  margin-top: -10px;
  content: "";
}

.review-headline {
  color: #dac056;
  letter-spacing: 2px;
}
</style>