<template>
  <b-container
    class="gradient p-3 p-md-5 d-flex justify-content-center"
    :class="isMobile ? 'bg-color' : 'swaying-background'"
    fluid
  >
    <b-row class="pt-4 pb-4">
      <b-col offset-md="3" md="6" sm="12">
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
              <b-img
                class="img"
                fluid
                :src="
                  myImages
                    ? myImages
                    : 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:zorro/v1631006181/matchplay/vinnare.jpg'
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
                </b-col>
                <b-col cols="6" v-if="birdies">
                  <small class="text-light"> Birdie Ligan</small>
                  <div v-for="(birdie, index) in birdies" :key="birdie.index" class="white-space">
                    <small class="d-block color-yellow text-overflow"
                      ><span class="text-light"> {{ index + 1 }}.</span>
                      {{ birdie.playername }}</small
                    >
                  </div>
                </b-col>
              </b-row>
              <b-row class="pt-4" >
                <b-col cols="6">
                  <small class="text-light">Antal <br> Birdies</small>
                  <h1 class="color-yellow">{{ totaltBirdies }}</h1>
                </b-col>
                <b-col cols="6">
                  <small class="text-light">Spelade <br />matcher</small>
                  <h1 class="color-yellow">1054</h1>
                </b-col>
              </b-row>
              <b-row class="pt-4" v-if="user && userId">
                <b-col cols="6" v-if="playerBirdie">
                  <small class="text-light"
                    >Med {{ playerBirdie }}
                    <span v-if="playerBirdie > 1">birdies</span>
                    <span v-else> birdie</span> <br />
                    är du topp</small
                  >
                  <h1 class="color-yellow" v-if="!loading">
                    {{ getInterval(playerBirdiePercentage) }} %
                  </h1>
                </b-col>
                <b-col cols="6" v-if="hcpCompared">
                  <small class="text-light"
                    >Ditt Hcp <br />
                    tillhör top</small
                  >
                  <h1 class="color-yellow">{{ getInterval(hcpCompared) }} %</h1>
                </b-col>
              </b-row>
            </div>
          </div>
          <b-button
            variant="light"
            class="d-block align-self-end w-100 rounded-bottom"
            @click="$router.push('/tavlingar/2021')"
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
  props: ["isMobile", "year"],
  created() {
    this.competition = this.$store.getters["getCompetition"](this.year);
    this.getBirdies();
  },
  mounted() {
    if (this.userId) {
      this.getAchievementDataPlayer();
    }
  },
  data() {
    return {
      competition: null,
      totaltBirdies: 2486,
      totalTeams: 712,
      totalPlayers: 1424,
      playerBirdie: null,
      playerBirdiePercentage: null,
      loading: true,
      birdies: null,
    };
  },
  methods: {
    getAchievementDataPlayer() {
      this.axios
        .post(globalState.admin_url + "getAchievementDataPlayer", {
          competition: globalState.compid,
          type: "birdie",
          player: this.userId,
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
    getBirdies() {
      this.axios
        .post(globalState.admin_url + "getAchievementData", {
          competition: this.competitionid
            ? this.competitionid
            : globalState.compid,
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
  computed: {
    ...mapGetters(["userId", "user", "competitionHcps"]),

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
      if (!this.user || !this.user.hcp) {
        return false
      }
      const { hcps } = this.$store.getters["getCompetition"](this.year);
      const numberOfHcps = hcps.length
      const userHcp = this.user.hcp;


      let count = hcps.reduce(function (accumulator, val) {
        if (val.hcp > userHcp) {
          accumulator++;
        }
        return accumulator;
      }, 0);
      
    
      return (count / numberOfHcps) * 100
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
  -webkit-animation: pulse 4s infinite alternate;
  animation: pulse 4s infinite alternate;
  background-size: 100% 100%;
  position: relative;
}

@-webkit-keyframes pulse {
  0% {
    background-size: 100% 100%;
  }
  100% {
    background-size: 120% 100%;
  }
}

.text-overflow {
        overflow: hidden;
    text-overflow: ellipsis;
}
.white-space {
            white-space: nowrap;
}
</style>