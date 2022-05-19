<template>
  <div>
    <b-container>
      <b-row class="justify-content-center" align-h="center">
        <b-col md="6">
          <div v-if="!errorMSG && loading" class="d-flex justify-content-center mb-3">
            <b-container>
              <b-row v-if="loading" align-h="center">
                <b-col md="6" class="text-center">
                  <b-spinner big type="grow" class="m-5" style="width: 5rem; height: 5rem;"></b-spinner>
                  <p>{{ loadingtext }}</p>
                  <p hidden v-if="loadingstate===2" class="small">Om du av misstag råkar gå bakåt från scorekortet i en redan påbörjad match med inskriven score kan du enkelt återuppta den i rutan ovanför val av bana.</p>
                </b-col>
              </b-row>
            </b-container>
          </div>
          <div v-if="!errorMSG && !loading">
            <div>

              <!-- check if game in progress, show button to scorecard instead, id of game -->
              <div v-if="gameinprogress">
                <b-alert show variant="danger" class="mb-3 small">
                  Du verkar ha en pågående match, klicka på knappen nedan för att återuppta matchen! Om du vill starta om matchen välj klubb/slinga nedan.
                  <b-button :to="'scorecard?id='+gameID" variant="warning" class="mt-2 text-white" size="sm">Återuppta match</b-button>
                </b-alert>
                
              </div>


              <!-- VÄLJA KLUBB -->

              <b-form-group label="Välj klubb från listan:" class="inputField">
                <suggestions
                  v-model="form.course"
                  :options="options"
                  :onInputChange="clubSelectedInput"
                  :onItemSelected="clubSelected"
                  class="suggestions"
                >
                  <div slot="item" slot-scope="props">
                    <strong>{{ props.item.title }}</strong>
                  </div>
                </suggestions>
                 <b-alert small show v-if="ninehole" variant="danger" class="mt-3">
                                Endast 18-hålsbanor kan användas i tävlingen!
                              </b-alert>
              </b-form-group>

              <!--  VÄLJA SLINGA -->
              <div v-if="loadingCourse == 1" class="d-flex justify-content-center mb-3">
                <b-container>
                  <b-row v-if="loadingCourse == 1" align-h="center">
                    <b-col md="6" class="text-center">
                      <b-spinner big type="grow" class="m-5" style="width: 5rem; height: 5rem;"></b-spinner>
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
                    v-on:change="courseSelected"
                  ></b-form-select>
                </b-form-group>
                <p v-else>Ingen 18-hålsbana hittad</p>
              </transition>
            </div>

            <!-- VÄLJA TEE -->

            <transition name="fade" mode="out-in" class="inputField">
              <div v-if="form.slinga">
                <div class="col-12 m-0 p-0 mb-3">
                  <b-alert dismissible v-if="form.slinga" show class="mt-3 mb-0 small" variant="info">
                    Era handicap kommer räknas ut exakt med slope mm efter val
                    av tee tillsammans med matchplays regler för hcp-uträkning.
                    Era nya hcp samt slag per hål ser ni i nästa steg.
                  </b-alert>
                    <b-alert dismissible v-if="form.slinga" show class="mt-3 mb-0 small" variant="danger">
                    Viktigt: Herrar spelar på klubbens rekommenderade tee för herrar och damer spelar på klubbens rekommenderade tee för damer.
                  </b-alert>
                  <b-alert
                    v-if="form.slinga && max28"
                    show
                    dismissible
                    class="mt-3 mb-0 small"
                    variant="warning"
                  >OBS! Ett lag får max ha 28 tillsammans. Spelarna i laget får sitt hcp reducerat i nästa steg när scorekortet skapas.</b-alert>
                </div>
                <p>Välj tee för spelarna</p>

                <b-form-group v-for="(player, index) in players" :key="player.index">
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
                        {{ player.name }} (hcp:
                        <span v-negativeToPostive:arguments="{hcp: player.hcp}">{{ player.hcp }}</span>)
                      </p>
                      <b-button
                        v-if="player.team == 1 && hometeamreservegolfid"
                        class="btn reservbtn"
                        @click="updatePlayer(index)"
                      >Byt till reserv ({{ hometeamreservegolfid }})</b-button>
                      <b-button
                        v-if="player.team == 2 && awayteamreservegolfid"
                        class="btn reservbtn"
                        @click="updatePlayer(index)"
                      >Byt till reserv ({{ awayteamreservegolfid }})</b-button>
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
                          :size="teeOptionsMale.length >= 5 ? 'sm' : 'md'"
                        ></b-form-radio-group>
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
                          :size="teeOptionsMale.length >= 5 ? 'sm' : 'md'"
                        ></b-form-radio-group>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-form-group>
              </div>
            </transition>
          </div>
          <div v-else>{{ errorMSG }}</div>

          <div class="col-12 m-0 p-0 mb-3" v-if="form.slinga && !loading" md="12">
            <b-button
              v-if="!errorMSG"
              class="teOff btn btn-success btn-sm text-white mt-3 mr-md-2"
              :class="{'pulse-button': allTeesSelected}"
              @click="teeOff"
              variant="primary"
              :disabled="!allTeesSelected"
              size="lg"
            >Tee off!</b-button>
            <div style="height: 100px;">
              <b-alert
                v-if="!errorMSG && !allTeesSelected"
                show
                class="mt-3 mb-0 small"
                variant="info"
              >Välj tee för samtliga spelare</b-alert>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import Suggestions from "v-suggestions";
import "v-suggestions/dist/v-suggestions.css";
import { globalState } from "../main.js";
import { calculateSlopeRating } from '../helpers'

export default {
  directives: {
		 negativeToPostive: {
        bind(el, bind) {
          let number = parseFloat(bind.value.hcp);

          if (number > 0) {
            return;
          }
          el.innerHTML = "+" + number * -1;
        },
        update(el, bind) {
          let number = parseFloat(bind.value.hcp);

          if (number > 0) {
            el.innerHTML = number;
            return
          }
          el.innerHTML = "+" + number * -1;
        },
        unbind: function () {},
      },
		},
  created() {
    //Kolla så att vi har med ett match id i URL:en
    this.gameID = this.$route.query.id;
    if (!this.gameID) {
      this.errorMSG = "Something went wrong (No ID in call)";
      return;
    }

    let userinfo = localStorage.getItem("userinfo");

    if (!userinfo) {
      this.errorMSG =
        "Du saknar behörighet för denna sida. Var vänlig logga in. Du skickas nu vidare till inloggningssidan";
      return setTimeout(() => {
        this.$router.push("MyMatchplay");
      }, 5000);
    }

    userinfo = JSON.parse(userinfo);
    let teams = [...userinfo.teams];
    const url = globalState.admin_url + "getGameData";
    const gameID = {
      id: this.gameID,
    };

    let hometeam = "";
    let authorized = false;
    axios
      .post(url, gameID)
      .then((response) => {
         hometeam = response.data.hometeam;

         


        
        for (const team of teams) {
          if (team._id === hometeam || userinfo.golfid === "780110-015") {
            authorized = true;

            //check if game in progress
            if (response.data.hasOwnProperty('status')) {
              if (response.data.status === 'In progress') {
                this.gameinprogress = true;
              }
            }

          }
        }
      })
      .then(() => {
        if (!authorized) {
          this.errorMSG =
            "Du saknar behörighet att skapa denna match. Du skickas nu vidare till Din sida";
          setTimeout(() => {
            this.$router.push("MyMatchplay");
          }, 5000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
      

  },
  updated() {
      //check max 28
       let team1hcp = parseFloat(this.players[0].hcp) + parseFloat(this.players[1].hcp);
       let team2hcp = parseFloat(this.players[2].hcp) + parseFloat(this.players[3].hcp)
     
      //console.log(team1hcp,team2hcp)
      if (team1hcp > 28 || team2hcp > 28) {
        this.max28 = true;
      }


  },
  beforeMount() {

    //Skapa en array med dummy data som vi sen fyller på med riktigt data

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
        orghcp: 0,
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
        orghcp: 0,
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
        orghcp: 0,
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
        orghcp: 0,
        shcp: null,
        tee: "",
      },
    ];
    //Hämta gamedata med hjälp av id
    try {
      this.axios
        .post(globalState.admin_url + "getGameData", {
          id: this.gameID,
        })
        .then((response) => {
          if (response.data.status == "No game found") {
            this.errorMSG = "Something went wrong (No game found)";
          } else if (response.data.status === "Finished") {
            this.errorMSG = "Matchen är avslutad";
          } else {
            //console.log(response.data);
            this.readGameData(response.data);
            this.createPlayers(response.data);
          }
          //Kolla om klubb redan är vald
        })
        .catch((error) => {
          this.errorMSG = "Something went wrong (getGameData failed)";
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
    //Hämta alla golfklubbar
    try {
      this.axios
        .post(globalState.admin_url + "getGolfclubs")
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
                id: course._id,
              });
          });
          this.loading = false;
          //Ladda sparad data
          if (this.savedclubId) {
            this.loadPreSelectedData();
          }
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
      gameinprogress: false,
      ninehole: false,
      max28: false,
      gameID: "",
      team1: "",
      team2: "",
      hometeamreservegolfid: "",
      awayteamreservegolfid: "",
      displaySlinga: false,
      players: [],
      courses: [],
      loading: true,
      savedclubId: "",
      savedLoopId: "",
      loadingtext: "Hämtar banor...",
      loadingstate: 1,
      courseOptions: [],
      slingaOptions: [],
      teeOptions: [],
      teeOptionsMale: [],
      teeOptionsFemale: [],
      loadingCourse: 0,
      allTeesSelected: false,
      holesArray: [],

      errorMSG: "",
      form: {
        course: "",
        courseID: "",
        loop: "",
        loopname: "",
        slinga: "",
        checked: [],
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
    readGameData: function (data) {
      if (data.club) {
        this.savedclubId = data.club;
      }
      if (data.loop) {
        this.savedLoopId = data.loop;
      }
    },

    loadPreSelectedData() {
      //Hämta den sparade coursen och läs in dess slingor
      let preSelectedCourse = this.courses.find(
        (course) => course._id === this.savedclubId
      );
      if (preSelectedCourse) {
        this.form.courseID = this.savedclubId;
        this.loadingCourse = 1;
        this.form.course = preSelectedCourse.title;
        this.getCourse(preSelectedCourse.gitID);
      }
    },
    clubSelected(item) {
      this.clearTeeSelections();

      this.form.loop = "";
      this.form.loopname = "";

      this.savedLoopId = "";
      this.savedclubId = "";
      this.form.slinga = "";

      //Visa spinner

      this.loadingCourse = 1;
      this.form.course = item.title;
      this.form.courseID = item.id;

      this.getCourse(item.gitID);
    },
    createPlayers: function (data) {
      if (
        data.hometeamleadergolfid &&
        data.hometeammembergolfid &&
        data.awayteamleadergolfid &&
        data.awayteammembergolfid
      ) {
        this.players[0].name = data.hometeamleadername;
        this.players[0].gitID = data.hometeamleadergolfid;
        this.players[1].name = data.hometeammembername;
        this.players[1].gitID = data.hometeammembergolfid;
        this.players[2].name = data.awayteamleadername;
        this.players[2].gitID = data.awayteamleadergolfid;
        this.players[3].name = data.awayteammembername;
        this.players[3].gitID = data.awayteammembergolfid;
        this.hometeamreservegolfid = data.hometeamreservegolfid;
        this.awayteamreservegolfid = data.awayteamreservegolfid;

        this.players.forEach((element) => {
          this.axios
            .post(globalState.admin_url + "getPlayerByGolfid", {
              golfid: element.gitID,
            })
            .then((response) => {                        
                
              element.hcp = parseFloat(
                response.data.hcp.replace(/,/g, ".")
              ).toFixed(1);

              if (response.data.hcp.includes('+')) {                
                element.hcp = -Math.abs(element.hcp)               
              }

              element.orghcp = parseFloat(
                response.data.hcp.replace(/,/g, ".")
              ).toFixed(1);

              

              if (response.data.hcp.includes('+')) {                
               element.orghcp = -Math.abs(element.hcp)
              }

              //TEST
              /*
              if (element.gitID === '780110-015') {
              element.orghcp = 30.6
              element.hcp = 30.6      
              }
              */
              //TEST

              element.name =
                response.data.firstname + " " + response.data.lastname;

              element.gender = response.data.gender;             

            })
            .catch((error) => {
              this.errorMSG = "Something went wrong (Player not found)";

              console.log(error);
            });
        });
      } else {
        this.errorMSG = "Something went wrong (Missin GIT on player)";
      }


    },
    max28perTeam: function (hcp1, hcp2) {
      let newHcp1 = parseFloat(hcp1);
      let newHcp2 = parseFloat(hcp2);
      
      if (newHcp1 + newHcp2 < 28) {
        return { newHcp1, newHcp2 };
      }
      const difference = newHcp1 + newHcp2 - 28;
        newHcp1 = newHcp1 - difference / 2;
        newHcp2 = newHcp2 - difference / 2;

      return { newHcp1, newHcp2 };
    },
    max28perTeamOLD: function (hcp1, hcp2) {
      let newHcp1 = parseFloat(hcp1);
      let newHcp2 = parseFloat(hcp2);

      if (newHcp1 + newHcp2 < 28) {
        return { newHcp1, newHcp2 };
      }

      const substract = newHcp1 + newHcp2 - 28;

      const playerDifference = Math.abs(newHcp1 - newHcp2)
      const newSubtract = playerDifference - substract
      

      if (newHcp1 === newHcp2) {
        newHcp1 = newHcp1 - subtract / 2;
        newHcp2 = newHcp2 - subtract / 2;
      } else {
        if (newHcp1 > newHcp2) {
          if (playerDifference > substract) {
              newHcp1 = newHcp1 - substract
          } else {
            newHcp1 = newHcp1 - playerDifference
            const substractSub = substract - playerDifference
            newHcp1 = newHcp1 - substractSub/2
            newHcp2 = newHcp2 - substractSub/2
          }
        } else {
          if (playerDifference > substract) {
              newHcp2 = newHcp2 - substract
          } else {
            newHcp2 = newHcp2 - playerDifference
            const substractSub = substract - playerDifference
            newHcp1 = newHcp1 - substractSub/2
            newHcp2 = newHcp2 - substractSub/2
          }
        }
      }
      return { newHcp1, newHcp2 };
    },
    updatePlayer: function (index) {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm("Är du säker på att du vill byta till reservspelare.", {
          title: "Byt till reserv?",
          size: "md",
          buttonSize: "md",
          okVariant: "danger",
          okTitle: "Japp, jag är säker",
          cancelTitle: "Nej tack",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
           
            let gitID = "";
            if (index < 2) {
              gitID = this.hometeamreservegolfid;
            } else {
              gitID = this.awayteamreservegolfid;
            }
            if (gitID) {
              this.axios
                .post(globalState.admin_url + "getPlayerByGolfid", {
                  golfid: gitID,
                })
                .then((response) => {
                  this.players[index].hcp = parseFloat(
                    response.data.hcp.replace(/,/g, ".")
                  ).toFixed(1);

                  //fix plus hcp
                  if (response.data.hcp.includes('+')) {                
                    this.players[index].hcp = -Math.abs(this.players[index].hcp)            
                  }

                  this.players[index].orghcp = parseFloat(
                    response.data.hcp.replace(/,/g, ".")
                  ).toFixed(1);

                  //fix plus hcp
                  if (response.data.hcp.includes('+')) {                
                    this.players[index].orghcp = -Math.abs(this.players[index].hcp)            
                  }

                  this.players[index].name =
                    response.data.firstname + " " + response.data.lastname;
                  this.form.checked[index] = null;
                  this.players[index].gender = response.data.gender;
                  this.players[index].tee = "";
                  this.players[index].shcp = null;
                  if (index < 2) {
                    this.players[index].gitID = this.hometeamreservegolfid;
                    this.hometeamreservegolfid = "";
                  } else {
                    this.players[index].gitID = this.awayteamreservegolfid;
                    this.awayteamreservegolfid = "";
                  }
                  this.allTeesSelected = false;
                })
                .catch((error) => {
                  this.errorMSG = "Something went wrong (Player not found)";

                  console.log(error);
                });
            }
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },

    // Get info from GIT
    getCourse: function (gitID) {
      this.axios
        .post("https://admin.matchplay.se/methods/getCourseInfoData", {
          id: gitID,
        })
        .then((response) => {
          this.parseCourse(response.data);
        })
        .catch((error) => {
          //this.errorMSG = "Something went wrong (No course found)";          
          console.log(error);
        });
    },

    // Hämta alla loops och hål från en bana
    parseCourse: function (course) {
      let parsedLoop = [];

      course.forEach((courseItem) => {       
        if (
          courseItem.IsNineHoleCourse == "false" ||
          courseItem.Name === "Björkhagens GK"
        ) {
          
          courseItem.Loops.forEach((loop) => {            
            if (Array.isArray(loop)) {
              loop.forEach((item) => {
                let loopItem = {};                
                loopItem.value = item.ID;
                loopItem.text = item.Name;
                loopItem.slopes = item.Slopes;
                loopItem.Holes = item.Holes;

                if (loopItem.Holes.length == 18 && loopItem.slopes.length > 1) {
                  parsedLoop.push(loopItem);
                }
              });
            }
          });
        }
      });

      this.slingaOptions = parsedLoop;
      //console.log(parsedLoop)
      
      if (this.slingaOptions.length === 0) {
        this.ninehole = true;
        this.loadingCourse = false;
        this.form.course = '';
        return;
      }
      

      this.ninehole = false;

      // Kolla om det finns en sparad slinga i getGameData
      if (this.savedLoopId) {
        //this.form.slinga = this.savedLoopId;
        //this.courseSelected(this.savedLoopId);
        this.form.slinga = this.slingaOptions[0].value;
        this.courseSelected(this.slingaOptions[0].value);
      } else {
        this.form.slinga = this.slingaOptions[0].value;
        this.courseSelected(this.slingaOptions[0].value);
      }

      //Dölj spinner och visa slingor
      this.loadingCourse = 2;
    },

    clearTeeSelections: function () {
      //Klubb
      this.holesArray = [];
      this.teeOptions = [];
      this.teeOptionsMale = [];
      this.teeOptionsFemale = [];
      this.form.checked = [];
      this.players.forEach((player) => {
        player.shcp = null;
      });
      this.allTeesSelected = false;
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
    },
    teeOff() {
      //console.log(this.players);
      let team1hcp = this.max28perTeam(
        this.players[0].hcp,
        this.players[1].hcp
      );
      let team2hcp = this.max28perTeam(
        this.players[2].hcp,
        this.players[3].hcp
      );
      this.players[0].hcp = team1hcp.newHcp1.toFixed(1);
      this.players[1].hcp = team1hcp.newHcp2.toFixed(1);
      this.players[2].hcp = team2hcp.newHcp1.toFixed(1);
      this.players[3].hcp = team2hcp.newHcp2.toFixed(1);

      this.players.forEach((player) => {
        let slopeRating = this.calculateSlopeRating(
          player.hcp,
          player.parsedSlopeValue,
          player.parsedCoursRating,
          this.coursePar
        );
        player.shcp = slopeRating;
      });
         
      this.loadingtext = "Skapar scorekort";
      this.loading = true;
      this.loadingstate = 2;


      this.axios
        .post("https://matchplay.meteorapp.com/methods/updateGame", {
          _id: this.gameID,
          holes: this.holesArray,
          scorecard: this.players,
          status: "Pending",
          club: this.form.courseID,
          clubname: this.form.course,
          loop: this.form.loop,
          loopname: this.form.loopname,
          winner: null
        })
        .then((response) => {
          //console.log(response.data);
          location.href = "scorecard?id=" + this.gameID;
        })
        .catch((error) => {
          //this.player_1_error = "Golfaren hittades inte... prova att skriva in golfid igen.";
          console.log(error);
        });
    },
    clubSelectedInput(query) {
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
      player.parsedSlopeValue = parsedSlopeValue;
      player.parsedCoursRating = parsedCoursRating;

      //console.log(player.shcp);

      player.tee = tee.text;

      this.checkAllTeeSelected();
    },
    checkAllTeeSelected() {
      let player = this.players.find((player) => player.shcp === null);
      if (!player) {
        this.allTeesSelected = true;
        window.scrollTo(0, document.body.scrollHeight);
      } else {
        this.allTeesSelected = false;
      }
    },
    calculateSlopeRating,
    courseSelected(id) {
      //this.selectedSearchItem = item;
      //console.log('selected',item);
      this.clearTeeSelections();
      let result = this.slingaOptions.find((item) => item.value == id);

      let coursepar = 0;
      this.form.loop = result.value;
      this.form.loopname = result.text;

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

>>> .btn.btn-primary.active,
>>> .btn.btn-primary:active {
  background-color: #d77c27 !important;
  /*outline: 0.5px dashed rgba(255, 255, 255, 0.9) !important;*/
  /*outline-offset: -2px !important;*/
  /*transform: scale(0.95) !important;*/
  border: 0 !important;
  outline: none;
}

>>> .btn.btn-primary,
>>> .btn.btn-primary {
  background-color: #074da1 !important;
  border-radius: 40 !important;
  border: 0 !important;
  margin: 1px !important;
  padding-top: 20px;
  padding-bottom: 20px;
}

.reservbtn {
  background-color: #074da1 !important;
  padding: 0px 10px 0px 10px;
  text-transform: none;
  margin-top: 10px;
  margin-bottom: 10px;
}
/* FOOTEr */
.teOffButton {
  margin-top: 10px;
  width: 100%;
  border-radius: 0 !important;
}

.teOff {
  width: 100% !important;
}
</style>
