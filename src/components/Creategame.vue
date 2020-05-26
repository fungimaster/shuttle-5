<template>
  <div>
    <b-container>
      <b-row class="justify-content-center" align-h="center">
        <b-col md="6">
          <div v-if="loading" class="d-flex justify-content-center mb-3">
            <b-container>
              <b-row v-if="loading" align-h="center">
                <b-col md="6" class="text-center">
                  <b-spinner
                    big
                    type="grow"
                    class="m-5"
                    style="width: 5rem; height: 5rem;"
                  ></b-spinner>
                  <p>{{ loadingtext }}</p>
                </b-col>
              </b-row>
            </b-container>
          </div>
          <div v-if="!errorMSG && !loading">
            <div>
              <!-- VÄLJA KLUBB -->

              <b-form-group label="Välj klubb från listan:" class="inputField">
                <suggestions
                  v-model="form.course"
                  :options="options"
                  :onInputChange="onCountryInputChange"
                  :onItemSelected="onSearchItemSelected"
                  class="suggestions"
                >
                  <div slot="item" slot-scope="props">
                    <strong> {{ props.item.title }}</strong>
                  </div>
                </suggestions>
              </b-form-group>

              <!--  VÄLJA SLINGA -->
              <div
                v-if="loadingCourse == 1"
                class="d-flex justify-content-center mb-3"
              >
                <b-container>
                  <b-row v-if="loadingCourse == 1" align-h="center">
                    <b-col md="6" class="text-center">
                      <b-spinner
                        big
                        type="grow"
                        class="m-5"
                        style="width: 5rem; height: 5rem;"
                      ></b-spinner>
                      <p>Hämtar slingor...</p>
                    </b-col>
                  </b-row>
                </b-container>
              </div>
              <transition name="fade" v-if="form.course && loadingCourse == 2">
                <b-form-group
                  id="input-group-3"
                  v-if="slingaOptions.length > 0"
                  class="inputField"
                  label="Välj slinga"
                >
                  <b-form-select
                    v-model="form.slinga"
                    :options="slingaOptions"
                    v-on:change="teeAndSlope"
                  ></b-form-select>
                </b-form-group>
                <p v-else>Ingen 18-hålsbana hittad</p>
              </transition>
            </div>

            <!-- VÄLJA TEE -->

            <transition name="fade" mode="out-in" class="inputField">
              <div v-if="form.slinga">
                <div class="col-12 m-0 p-0 mb-3">
                  <b-alert
                    v-if="form.slinga"
                    show
                    class="mt-3 mb-0 small"
                    variant="info"
                    >Era handicap kommer räknas ut exakt med slope mm efter val
                    av tee tillsammans med matchplays regler för hcp-uträkning.
                    Era nya hcp samt slag per hål ser ni i nästa steg.</b-alert
                  >
                </div>
                <b-form-group
                  v-for="(player, index) in players"
                  :key="player.index"
                >
                  <b-row no-gutters>
                    <b-col cols="1" class="teamColor">
                      <div
                        class="teamColor"
                        :class="
                          player.team === 1
                            ? 'teamColorBanner1'
                            : 'teamColorBanner2'
                        "
                      ></div>
                    </b-col>
                    <b-col cols="10">
                      <p class="playerInfo" id="playerName">
                        {{ player.name }} (hcp: {{ player.hcp }})
                      </p>
                    </b-col>
                  </b-row>

                  <b-row no-gutters>
                    <b-col cols="12">
                      <b-form-group id="input-group-6" class="inputField">
                        <!--  v-model="form.tees[index]"
             :options="teeOptions"
              -->
                        <b-form-radio-group
                          v-if="player.gender == 0"
                          v-model="form.checked[index]"
                          v-on:change="
                            getSlopes($event, player.playerId, player.hcp)
                          "
                          :options="teeOptionsMale"
                          buttons
                          button-variant="primary"
                          required
                          class="radioSlinga"
                        >
                        </b-form-radio-group>
                        <b-form-radio-group
                          v-if="player.gender == 1"
                          v-model="form.checked[index]"
                          v-on:change="
                            getSlopes($event, player.playerId, player.hcp)
                          "
                          :options="teeOptionsFemale"
                          buttons
                          button-variant="primary"
                          required
                          class="radioSlinga"
                        >
                        </b-form-radio-group>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-form-group>
              </div>
            </transition>
          </div>
          <div v-else>
            {{ errorMSG }}
          </div>
        </b-col>
        <b-col class="col-12 mt-5 pt-5"> </b-col>

        <footer class="fixed-bottom" md="12">
          <b-row class="teOff" no-gutters>
            <b-col v-if="form.slinga && allTeesSelected" md="12">
              <b-button
                class="teOffButton"
                @click="onSubmit"
                variant="primary"
                size="lg"
                >Tee off!</b-button
              >
            </b-col>
          </b-row>
        </footer>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import Suggestions from "v-suggestions";
import "v-suggestions/dist/v-suggestions.css";
import { globalState } from "../main.js";

export default {
  async beforeMount() {
    this.$store.dispatch("updateUserInfo");
    this.gameID = this.$route.query.id;

    if (!this.gameID) {
      this.errorMSG = "Something went wrong (No ID in call)";
      return;
    }

    //Create dummy data
    this.players = [
      {
        name: "Player 1",
        gender: "0",
        team: 1,
        playerId: "1",
        holes: [
          { hole: 1, strokes: 0, slag: 0 },
          { hole: 2, strokes: 0, slag: 0 },
          { hole: 3, strokes: 0, slag: 0 },
          { hole: 4, strokes: 0, slag: 0 },
          { hole: 5, strokes: 0, slag: 0 },
          { hole: 6, strokes: 0, slag: 0 },
          { hole: 7, strokes: 0, slag: 0 },
          { hole: 8, strokes: 0, slag: 0 },
          { hole: 9, strokes: 0, slag: 0 },
          { hole: 10, strokes: 0, slag: 0 },
          { hole: 11, strokes: 0, slag: 0 },
          { hole: 12, strokes: 0, slag: 0 },
          { hole: 13, strokes: 0, slag: 0 },
          { hole: 14, strokes: 0, slag: 0 },
          { hole: 15, strokes: 0, slag: 0 },
          { hole: 16, strokes: 0, slag: 0 },
          { hole: 17, strokes: 0, slag: 0 },
          { hole: 18, strokes: 0, slag: 0 },
        ],
        hcp: 1.2,
        shcp: null,
        tee: "",
      },
      {
        name: "Player 2",
        gender: "0",
        team: 1,
        playerId: "2",
        holes: [
          { hole: 1, strokes: 0, slag: 0 },
          { hole: 2, strokes: 0, slag: 0 },
          { hole: 3, strokes: 0, slag: 0 },
          { hole: 4, strokes: 0, slag: 0 },
          { hole: 5, strokes: 0, slag: 0 },
          { hole: 6, strokes: 0, slag: 0 },
          { hole: 7, strokes: 0, slag: 0 },
          { hole: 8, strokes: 0, slag: 0 },
          { hole: 9, strokes: 0, slag: 0 },
          { hole: 10, strokes: 0, slag: 0 },
          { hole: 11, strokes: 0, slag: 0 },
          { hole: 12, strokes: 0, slag: 0 },
          { hole: 13, strokes: 0, slag: 0 },
          { hole: 14, strokes: 0, slag: 0 },
          { hole: 15, strokes: 0, slag: 0 },
          { hole: 16, strokes: 0, slag: 0 },
          { hole: 17, strokes: 0, slag: 0 },
          { hole: 18, strokes: 0, slag: 0 },
        ],
        hcp: 20,
        shcp: null,
        tee: "",
      },
      {
        name: "Player 3",
        playerId: "3",
        team: 2,
        gender: "0",
        holes: [
          { hole: 1, strokes: 0, slag: 0 },
          { hole: 2, strokes: 0, slag: 0 },
          { hole: 3, strokes: 0, slag: 0 },
          { hole: 4, strokes: 0, slag: 0 },
          { hole: 5, strokes: 0, slag: 0 },
          { hole: 6, strokes: 0, slag: 0 },
          { hole: 7, strokes: 0, slag: 0 },
          { hole: 8, strokes: 0, slag: 0 },
          { hole: 9, strokes: 0, slag: 0 },
          { hole: 10, strokes: 0, slag: 0 },
          { hole: 11, strokes: 0, slag: 0 },
          { hole: 12, strokes: 0, slag: 0 },
          { hole: 13, strokes: 0, slag: 0 },
          { hole: 14, strokes: 0, slag: 0 },
          { hole: 15, strokes: 0, slag: 0 },
          { hole: 16, strokes: 0, slag: 0 },
          { hole: 17, strokes: 0, slag: 0 },
          { hole: 18, strokes: 0, slag: 0 },
        ],
        hcp: 11,
        shcp: null,
        tee: "",
      },
      {
        name: "Player 4",
        playerId: "4",
        team: 2,
        gender: "1",
        holes: [
          { hole: 1, strokes: 0, slag: 0 },
          { hole: 2, strokes: 0, slag: 0 },
          { hole: 3, strokes: 0, slag: 0 },
          { hole: 4, strokes: 0, slag: 0 },
          { hole: 5, strokes: 0, slag: 0 },
          { hole: 6, strokes: 0, slag: 0 },
          { hole: 7, strokes: 0, slag: 0 },
          { hole: 8, strokes: 0, slag: 0 },
          { hole: 9, strokes: 0, slag: 0 },
          { hole: 10, strokes: 0, slag: 0 },
          { hole: 11, strokes: 0, slag: 0 },
          { hole: 12, strokes: 0, slag: 0 },
          { hole: 13, strokes: 0, slag: 0 },
          { hole: 14, strokes: 0, slag: 0 },
          { hole: 15, strokes: 0, slag: 0 },
          { hole: 16, strokes: 0, slag: 0 },
          { hole: 17, strokes: 0, slag: 0 },
          { hole: 18, strokes: 0, slag: 0 },
        ],
        hcp: 5,
        shcp: null,
        tee: "",
      },
    ];
    try {
      this.axios
        .post("https://admin.matchplay.se/methods/getGameData", {
          id: this.gameID,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.status == "No game found") {
            this.errorMSG = "Something went wrong (No game found)";
          } else {
            this.createPlayers(response.data);
          }
          //Kolla om klubb redan är vald

          if (response.data.club) {
            this.savedclubId = response.data.club;
          }
          if (response.data.loop) {
            this.savedLoopId = response.data.loop;
          }
        })
        .catch((error) => {
          this.errorMSG = "Something went wrong (getGameData failed)";
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }

    try {
      this.axios
        .post("https://admin.matchplay.se/methods/getGolfclubs")
        .then((response) => {
          this.courses = response.data;

          this.courses.forEach((course) => {
            this.courseOptions.push({
              text: course.title,
              value: course.title,
            }),
              this.courseQuery.push({
                title: course.title,
                gitID: course.gitID,
              });
          });
          this.loading = false;
          this.loadPreSelectedData();
        })
        .catch((error) => {
          this.errorMSG = "Something went wrong (getGolfclubs failed)";
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  },

  data() {
    return {
      gameID: "",
      team1: "",
      team2: "",
      displaySlinga: false,
      players: [],
      courses: [],
      loading: true,
      savedclubId: "",
      savedLoopId: "",
      loadingtext: "Hämtar banor...",
      courseOptions: [],
      slingaOptions: [],
      teeOptions: [],
      teeOptionsMale: [],
      teeOptionsFemale: [],
      loadingCourse: 0,
      allTeesSelected: false,
      holesArray: [],

      slopes: [],
      errorMSG: "",
      form: {
        course: "",
        slinga: "",
        checked: [],
        tees: "",
        teesmale: "",
        teesfemale: "",
      },
      show: true,
      test: {},
      query: "",
      courseQuery: [],
      coursePar: 0,
      selectedCourse: null,
      options: {
        placeholder: "Välj klubb för laget",
        inputClass: "form-control ",
      },
    };
  },
  mounted: function () {
    //this.getGolfClubs();
  },
  methods: {
    // Club selected in searchfield
    loadPreSelectedData() {
      if (this.savedclubId) {
        let preSelectedCourse = this.courses.find(
          (course) => course._id === this.savedclubId
        );

        this.loadingCourse = 1;
        this.form.course = preSelectedCourse.title;
        this.getCourse(preSelectedCourse.gitID);
        console.log(this.savedLoopId);
      }
    },
    onSearchItemSelected(item) {
      //Visa spinner
      this.savedLoopId = "";
      this.savedclubId = "";
      this.form.slinga = "";
      this.loadingCourse = 1;
      this.form.course = item.title;
      this.getCourse(item.gitID);
    },
    createPlayers: function (data) {
      this.players[0].name = data.hometeamleadername;
      this.players[0].gitID = data.hometeamleadergolfid;
      this.players[1].name = data.hometeammembername;
      this.players[1].gitID = data.hometeammembergolfid;
      this.players[2].name = data.awayteamleadername;
      this.players[2].gitID = data.awayteamleadergolfid;
      this.players[3].name = data.awayteammembername;
      this.players[3].gitID = data.awayteammembergolfid;

      this.players.forEach((element) => {
        this.axios
          .post(globalState.admin_url + "getPlayerByGolfid", {
            golfid: element.gitID,
          })
          .then((response) => {
            element.hcp = parseFloat(
              response.data.hcp.replace(/,/g, ".")
            ).toFixed(1);
            element.name =
              response.data.firstname + " " + response.data.lastname;
            console.log(response.data);
            element.gender = response.data.gender;
          })
          .catch((error) => {
            this.errorMSG = "Something went wrong (Player not found)";

            console.log(error);
          });
      });

      console.log(this.players);
    },
    // Get info from GIT
    getCourse: function (gitID) {
      this.axios
        .post("https://admin.matchplay.se/methods/getCourseInfoData", {
          id: gitID,
        })
        .then((response) => {
          this.parseCourse(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          this.errorMSG = "Something went wrong (No course found)";
          console.log(error);
        });
    },

    // Hämta alla loops och hål från en bana
    parseCourse: function (course) {
      let parsedLoop = [];
      course.forEach((courseItem) => {
        if (courseItem.IsNineHoleCourse == "false") {
          courseItem.Loops.forEach((loop) => {
            if (Array.isArray(loop)) {
              loop.forEach((item) => {
                let loopItem = {};
                loopItem.value = item.ID;
                loopItem.text = item.Name;
                loopItem.slopes = item.Slopes;
                loopItem.Holes = item.Holes;

                if (loopItem.Holes.length == 18) {
                  parsedLoop.push(loopItem);
                }
              });
            }
          });
        }
      });

      this.slingaOptions = parsedLoop;

      if (this.savedLoopId) {
        this.form.slinga = this.savedLoopId;
        this.teeAndSlope(this.savedLoopId);
      } else if (this.slingaOptions.length == 1) {
        this.form.slinga = this.slingaOptions[0].value;

        this.teeAndSlope(this.slingaOptions[0].value);
      }

      //Dölj spinner och visa slingor
      this.loadingCourse = 2;
    },

    clearCourse: function () {
      this.form.course = "";
      this.form.slinga = "";
      this.slingaOptions = [];
      this.slingaOptions = [];

      this.courses = [];
      this.courseOptions = [];
      this.slingaOptions = [];
      this.teeOptions = [];

      this.teeOptionsMale = [];
      this.teeOptionsFemale = [];
      this.slopes = [];
      this.loadingCourse = 0;
    },

    parseTee: function (course) {
      let parsedLoop = [];
      course.forEach((courseItem) => {
        courseItem.Loops.forEach((loop) => {
          loop.forEach((item) => {
            let loopItem = {};
            loopItem.value = item.ID;
            loopItem.text = item.Name;
            parsedLoop.push(loopItem);
          });
        });
      });

      this.slingaOptions = parsedLoop;
      console.log(this.slingaOptions);
    },
    async onSubmit() {
      console.log(this.holesArray);
      this.loadingtext = "Skapar scorekort";
      this.loading = true;

      this.axios
        .post("https://matchplay.meteorapp.com/methods/updateGame", {
          _id: this.gameID,
          holes: this.holesArray,
          scorecard: this.players,
        })
        .then((response) => {
          console.log(response.data);
          location.href = "scorecard?id=" + this.gameID;
        })
        .catch((error) => {
          //this.player_1_error = "Golfaren hittades inte... prova att skriva in golfid igen.";
          console.log(error);
        });
    },
    onCountryInputChange(query) {
      if (query.trim().length === 0) {
        return null;
      }

      // return the matching countries as an array
      return this.courseQuery.filter((course) => {
        return course.title.toLowerCase().includes(query.toLowerCase());
      });
    },

    getSlopes(id, name, hcp) {
      let tee = this.teeOptions.find((tee) => tee.value === id);

      let parsedSlopeValue = parseFloat(
        tee.slopeValue.replace(/,/g, ".")
      ).toFixed(1);
      let parsedCoursRating = parseFloat(
        tee.courseRating.replace(/,/g, ".")
      ).toFixed(1);

      let slopeRating = this.calculateSlopeRating(
        hcp,
        parsedSlopeValue,
        parsedCoursRating,
        this.coursePar
      );
      let player = this.players.find((player) => player.playerId === name);

      player.shcp = slopeRating;

      player.tee = tee.text;
      this.checkAllTeeSelected();
    },
    checkAllTeeSelected() {
      let player = this.players.find((player) => player.shcp === null);
      if (!player) {
        this.allTeesSelected = true;
      }
    },
    calculateSlopeRating(hcp, slopeValue, courseRating, coursePar) {
      return Math.round(hcp * (slopeValue / 113) + (courseRating - coursePar));
    },

    teeAndSlope(id) {
      //this.selectedSearchItem = item;
      //console.log('selected',item);
      this.teeOptions = [];
      this.teeOptionsMale = [];
      this.teeOptionsFemale = [];
      let result = this.slingaOptions.find((item) => item.value == id);
      console.log(this.slingaOptions);
      console.log(result);
      console.log(id);
      let coursepar = 0;

      result.Holes.forEach((holeItem) => {
        let hole = {};
        hole.name = holeItem[0].Name;
        hole.holeId = holeItem[0].HoleID;
        hole.hole = holeItem[0].Number;
        hole.par = holeItem[0].Par;
        hole.index = holeItem[0].Index;
        hole.slag = [0, 0, 0, 0];
        this.holesArray.push(hole);
        coursepar += parseInt(holeItem[0].Par);
      });

      this.coursePar = coursepar;
      result.slopes.forEach((slopeItem) => {
        let Tee = {};
        if (slopeItem[0].Gender == "1") {
          Tee.text = slopeItem[0].TeeColor;
        } else {
          Tee.text = slopeItem[0].TeeColor;
        }

        Tee.value = slopeItem[0].TeeID + slopeItem[0].Gender;
        Tee.courseRating = slopeItem[0].CourseRating;
        Tee.slopeValue = slopeItem[0].SlopeValue;
        this.teeOptions.push(Tee);
        if (slopeItem[0].Gender == "0") {
          this.teeOptionsMale.push(Tee);
        } else {
          this.teeOptionsFemale.push(Tee);
        }
      });

      //this.form.course = item;
      //this.slingaOptions = []
    },
  },
  computed: {
    slinga() {
      this.courses.forEach((course) => {
        if (course.title === this.form.course) {
          course.slingor.forEach((slinga) => {
            this.slingaOptions.push({
              text: slinga.slinga,
              value: slinga.slinga,
            });
          });
        } else return;
      });
      return this.slingaOptions;
    },
  },
  components: {
    suggestions: Suggestions,
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

* {
  font-family: Eurostile LT Std, Arial, sans-serif;
}
.container {
  padding-top: 40px;
}

/* INPUTFIELD CLUB */
.suggestions {
  text-align: left !important;
}

/* SPELAR OCH TEAM INFO */
.playerInfo {
  margin-bottom: 0;
  text-align: left;
}

#playerName {
  font-weight: 900;
}

.teams {
  margin: 10px;
  margin-left: 0;
  margin-right: 0;
}

.teamColor {
  width: 8px;
  height: 40px;
}

.teamColorBanner1,
.teamColorBanner2 {
  margin-top: 3px;
  height: 15px;
  width: 15px;
  border-radius: 10px;
}

.teamColorBanner1 {
  background-color: $team1;
  border: 3px solid $team1;
}

.teamColorBanner2 {
  background-color: $team2;
  border: 3px solid $team2;
}

/* TRANSITION */

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.8s;
}
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity 0.8s;
}

.radioSlinga {
  display: flex !important;
}

/*  BUTTONS */

.btn.btn-primary.active,
.btn.btn-primary:active {
  background-color: #d77c27 !important;
  /*outline: 0.5px dashed rgba(255, 255, 255, 0.9) !important;*/
  /*outline-offset: -2px !important;*/
  /*transform: scale(0.95) !important;*/
  border: 0 !important;
  outline: none;
}

.btn.btn-primary,
.btn.btn-primary {
  background-color: #074da1 !important;
  border-radius: 40 !important;
  border: 0 !important;
  margin: 1px !important;
}

.btn-primary,
.btn-primary {
  background-color: #074da1 !important;
  border-radius: 40 !important;
  border: 0 !important;
  margin: 1px !important;
}

/* FOOTEr */
.teOffButton {
  margin-top: 10px;
  width: 100%;
  border-radius: 0 !important;
}

.teOff {
  position: absolute;
  bottom: 0;
  width: 100% !important;
}
</style>
