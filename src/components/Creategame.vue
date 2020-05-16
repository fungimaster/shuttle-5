<template>
  <div>
    <b-container>
      <b-row no-gutters>
        <b-col md="12">
          <div v-if="!errorMSG">
            <div>
              <!-- VÄLJA KLUBB -->
              <b-button
                class="teOffButton"
                @click="clearCourse"
                variant="primary"
                size="sm"
                >clear</b-button
              >
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
              <transition name="fade" v-if="form.course">
                <b-form-group
                  id="input-group-3"
                  class="inputField"
                  label="Välj slinga"
                >
                  <b-form-radio-group
                    v-model="form.slinga"
                    :options="slingaOptions"
                    v-on:change="teeAndSlope"
                    buttons
                    button-variant="primary"
                    required
                    class="radioSlinga"
                  >
                  </b-form-radio-group>
                </b-form-group>
              </transition>
            </div>

            <!-- VÄLJA TEE -->

            <transition name="fade" mode="out-in" class="inputField">
              <div v-if="form.slinga" class="teams">
                <b-form-group
                  v-for="(player, index) in players"
                  :key="player.index"
                >
                  <b-row no-gutters>
                    <b-col cols="1" class="teamColor">
                      <div
                        class="teamColor"
                        :class="
                        player.team === team1
                          ? 'teamColorBanner1'
                          : 'teamColorBanner2'
                      "
                      ></div>
                    </b-col>
                    <b-col cols="10">
                      <p class="playerInfo" id="playerName">
                        {{ player.name }} (hcp: {{player.hcp}}, slopehcp:
                        {{Number((player.slopehcp).toFixed(1))}})
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
                          v-model="form.tees[index]"
                          v-on:change="getSlopes($event, player.playerId, player.hcp)"
                          :options="teeOptionsMale"
                          buttons
                          button-variant="primary"
                          required
                          class="radioSlinga"
                        >
                        </b-form-radio-group>
                        <b-form-radio-group
                          v-if="player.gender == 1"
                          v-model="form.tees[index]"
                          v-on:change="getSlopes($event, player.playerId, player.hcp)"
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
            {{errorMSG}}
          </div>
        </b-col>
        <b-col class="col-12 mt-5 pt-5"> </b-col>

        <footer class="fixed-bottom" md="12">
          <b-row class="teOff" no-gutters>
            <b-col v-if="form.slinga" md="12">
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
import {globalState} from '../main.js'

export default {
  async beforeMount() {

    this.gameID = this.$route.query.id;

    if (!this.gameID)
    {
      this.errorMSG ="Something went wrong (No ID in call)"
     return;
    }
    try {

         this.axios
                .post(
                    "https://admin.matchplay.se/methods/getGameData",{
                      id: this.gameID
                      }
                )
                .then(response => {

                    if(response.data.status == "No game found")
                    {
                      this.errorMSG ="Something went wrong (No game found)"
                    }
else
                    {
    this.createPlayers(response.data);
                    }

                })
                .catch(error => {
                     this.errorMSG ="Something went wrong (getGameData failed)"
                    console.log(error);
                });


    } catch (e) {
      console.log(e);
    }

    try {

         this.axios
                .post(
                    "https://admin.matchplay.se/methods/getGolfclubs"
                )
                .then(response => {
                    this.courses = response.data;

                    this.courses.forEach(course => {
                      this.courseOptions.push({
                        text: course.title,
                        value: course.title
                      }),
                        this.courseQuery.push(
                          {
                            title: course.title,
                            gitID: course.gitID

                          }
                          );
                    });

                })
                .catch(error => {
this.errorMSG ="Something went wrong (getGolfclubs failed)"
                    //this.player_1_error = "Golfaren hittades inte... prova att skriva in golfid igen.";   
                    console.log(error);
                });





    } catch (e) {
      console.log(e);
    }
    this.players = [
    {
      "name": "Bruce Wayne",
      "gender":"0",
      "playerId": "1",
      "holes": [
        { "hole": 1, "strokes": 0, "slag": 0 },
        { "hole": 2, "strokes": 0, "slag": 0 },
        { "hole": 3, "strokes": 0, "slag": 0 },
        { "hole": 4, "strokes": 0, "slag": 0 },
        { "hole": 5, "strokes": 0, "slag": 0 },
        { "hole": 6, "strokes": 0, "slag": 0 },
        { "hole": 7, "strokes": 0 , "slag": 0},
        { "hole": 8, "strokes": 0 , "slag": 0},
        { "hole": 9, "strokes": 0, "slag": 0 },
        { "hole": 10, "strokes": 0, "slag": 0 },
        { "hole": 11, "strokes": 0 , "slag": 0},
        { "hole": 12, "strokes": 0 , "slag": 0},
        { "hole": 13, "strokes": 0 , "slag": 0},
        { "hole": 14, "strokes": 0 , "slag": 0},
        { "hole": 15, "strokes": 0 , "slag": 0},
        { "hole": 16, "strokes": 0 , "slag": 0},
        { "hole": 17, "strokes": 0 , "slag": 0},
        { "hole": 18, "strokes": 0 , "slag": 0}
      ],
      "hcp": 1.2,
      "slopehcp":0
    },
    {
      "name": "Donald Trump",
      "gender":"0",
       "playerId": "2",
      "holes": [
        { "hole": 1, "strokes": 0, "slag": 0 },
        { "hole": 2, "strokes": 0, "slag": 0 },
        { "hole": 3, "strokes": 0, "slag": 0 },
        { "hole": 4, "strokes": 0, "slag": 0 },
        { "hole": 5, "strokes": 0, "slag": 0 },
        { "hole": 6, "strokes": 0, "slag": 0 },
        { "hole": 7, "strokes": 0 , "slag": 0},
        { "hole": 8, "strokes": 0 , "slag": 0},
        { "hole": 9, "strokes": 0, "slag": 0 },
        { "hole": 10, "strokes": 0, "slag": 0 },
        { "hole": 11, "strokes": 0 , "slag": 0},
        { "hole": 12, "strokes": 0 , "slag": 0},
        { "hole": 13, "strokes": 0 , "slag": 0},
        { "hole": 14, "strokes": 0 , "slag": 0},
        { "hole": 15, "strokes": 0 , "slag": 0},
        { "hole": 16, "strokes": 0 , "slag": 0},
        { "hole": 17, "strokes": 0 , "slag": 0},
        { "hole": 18, "strokes": 0 , "slag": 0}
      ],
      "hcp": 20,
         "slopehcp":0
    },
    {
      "name": "Anders Tegnell",
       "playerId": "3",
       "gender":"0",
      "holes": [
        { "hole": 1, "strokes": 0, "slag": 0 },
        { "hole": 2, "strokes": 0, "slag": 0 },
        { "hole": 3, "strokes": 0, "slag": 0 },
        { "hole": 4, "strokes": 0, "slag": 0 },
        { "hole": 5, "strokes": 0, "slag": 0 },
        { "hole": 6, "strokes": 0, "slag": 0 },
        { "hole": 7, "strokes": 0 , "slag": 0},
        { "hole": 8, "strokes": 0 , "slag": 0},
        { "hole": 9, "strokes": 0, "slag": 0 },
        { "hole": 10, "strokes": 0, "slag": 0 },
        { "hole": 11, "strokes": 0 , "slag": 0},
        { "hole": 12, "strokes": 0 , "slag": 0},
        { "hole": 13, "strokes": 0 , "slag": 0},
        { "hole": 14, "strokes": 0 , "slag": 0},
        { "hole": 15, "strokes": 0 , "slag": 0},
        { "hole": 16, "strokes": 0 , "slag": 0},
        { "hole": 17, "strokes": 0 , "slag": 0},
        { "hole": 18, "strokes": 0 , "slag": 0}
      ],
      "hcp": 11,
         "slopehcp":0
    },
    {
      "name": "Joan Jett",
       "playerId": "4",
       "gender":"1",
      "holes": [
        { "hole": 1, "strokes": 0, "slag": 0 },
        { "hole": 2, "strokes": 0, "slag": 0 },
        { "hole": 3, "strokes": 0, "slag": 0 },
        { "hole": 4, "strokes": 0, "slag": 0 },
        { "hole": 5, "strokes": 0, "slag": 0 },
        { "hole": 6, "strokes": 0, "slag": 0 },
        { "hole": 7, "strokes": 0 , "slag": 0},
        { "hole": 8, "strokes": 0 , "slag": 0},
        { "hole": 9, "strokes": 0, "slag": 0 },
        { "hole": 10, "strokes": 0, "slag": 0 },
        { "hole": 11, "strokes": 0 , "slag": 0},
        { "hole": 12, "strokes": 0 , "slag": 0},
        { "hole": 13, "strokes": 0 , "slag": 0},
        { "hole": 14, "strokes": 0 , "slag": 0},
        { "hole": 15, "strokes": 0 , "slag": 0},
        { "hole": 16, "strokes": 0 , "slag": 0},
        { "hole": 17, "strokes": 0 , "slag": 0},
        { "hole": 18, "strokes": 0 , "slag": 0}
      ],
      "hcp": 5,
         "slopehcp":0
    }
    ]

    /* try {
      const response = await axios.get("http://localhost:8080/Scorecard");

      const data = response.data[response.data.length - 1];
      this.players = data.gameData;

      this.team1 = data.gameData[0].team;
      data.gameData.forEach(element => {
        if (element.team != this.team1) {
          this.team2 = element.team;
        }
      });
    } catch (e) {
      console.log(e);
    } */
  },

  data() {
    return {
      gameID:"",
      team1: "",
      team2: "",
      displaySlinga: false,
      players: [],
      courses: [],
      courseOptions: [],
      slingaOptions: [],
      teeOptions: [],
      teeOptionsMale: [],
      teeOptionsFemale: [],
      holesArray: [],
      slopes:[],
      errorMSG: "",
      form: {
        course: "",
        slinga: "",
        checked: [],
        tees: '',
        teesmale: '',
        teesfemale:'',
      },
      show: true,
      test: {},
      query: "",
      courseQuery: [],
      coursePar: 0,
      selectedCourse: null,
      options: {
        placeholder: "Välj klubb för laget",
        inputClass: "form-control "
      }
    };
  },
     mounted: function () {
      //this.getGolfClubs();
    },
  methods: {

    // Club selected in searchfield
      onSearchItemSelected(item) {

  this.form.course = item.title;
      this.getCourse(item.gitID);
    },
  createPlayers: function(data){

                    this.players[0].name = data.hometeamleadername;
                    this.players[0].gitID = data.hometeamleadergolfid;
                    this.players[1].name = data.hometeammembername;
                    this.players[1].gitID = data.hometeammembergolfid;
                    this.players[2].name = data.awayteamleadername;
                    this.players[2].gitID = data.awayteamleadergolfid;
                    this.players[3].name = data.awayteammembername;
                    this.players[3].gitID = data.awayteammembergolfid;


                    this.players.forEach(element => {

                       this.axios.post(
                    globalState.admin_url + "getPlayerByGolfid", {
                      golfid: element.gitID
                    }
                )
                .then(response => {

                  element.hcp = parseFloat(response.data.hcp.replace(/,/g, ".")).toFixed(1);

                  element.gender = response.data.gender



                })
                .catch(error => {
                    //this.player_1_error = "Golfaren hittades inte... prova att skriva in golfid igen.";   
                    console.log(error);
                });

                    });

               console.log(this.players);
},
    // Get info from GIT
     getCourse: function (gitID) {

            this.axios
                .post(
                    "https://admin.matchplay.se/methods/getCourseInfoData", {
                      id: gitID
                    }
                )
                .then(response => {


                    this.parseCourse(response.data);
                    console.log(response.data);


                })
                .catch(error => {
                    //this.player_1_error = "Golfaren hittades inte... prova att skriva in golfid igen.";   
                    console.log(error);
                });
        },


         // Hämta alla loops och hål från en bana
        parseCourse: function(course)
        {
          let parsedLoop = [];
          course.forEach(courseItem => {

            if(courseItem.IsNineHoleCourse == "false")
            {
            courseItem.Loops.forEach(loop => {

            loop.forEach( item => {
                let loopItem = {};
                loopItem.value = item.ID;
                loopItem.text = item.Name;
                loopItem.slopes = item.Slopes;
                loopItem.Holes = item.Holes;
                parsedLoop.push(loopItem);
                });
               });
          }
          });



        this.slingaOptions = parsedLoop;

        },


        clearCourse: function() { //not used right now, might be needed...
          this.form.course = '';
          this.form.slinga = '';
          this.slingaOptions = [];
           this.slingaOptions = [];

      this.courses= [];
      this.courseOptions = [];
      this.slingaOptions = [];
      this.teeOptions =  [];
      this.slopes = [];

        },


          parseTee: function(course)
        {
          let parsedLoop = [];
          course.forEach(courseItem => {
            courseItem.Loops.forEach(loop => {

            loop.forEach( item => {
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


         getGolfClubs: function () {
            this.axios
                .post(
                    "https://matchplay.meteorapp.com/methods/getGolfclubs"
                )
                .then(response => {
                    this.clubs = response.data;

                })
                .catch(error => {
                    //this.player_1_error = "Golfaren hittades inte... prova att skriva in golfid igen.";   
                    console.log(error);
                });
        },
    async onSubmit() {

console.log(this.holesArray);
    this.axios
                .post(
                    "https://matchplay.meteorapp.com/methods/updateGame", {
                      _id: this.gameID,
                      holes:this.holesArray
                    }
                )
                .then(response => {
                   console.log(response.data);
                    location.href = "scorecard?id="+this.gameID;

                })
                .catch(error => {
                    //this.player_1_error = "Golfaren hittades inte... prova att skriva in golfid igen.";   
                    console.log(error);
                });


  /*{ hole: 1, par: 5, index: 18, slag: [0, 0, 0, 0] },
        { hole: 2, par: 3, index: 12, slag: [0, 0, 0, 0] },
        { hole: 3, par: 3, index: 11, slag: [0, 0, 0, 0] },
        { hole: 4, par: 4, index: 1, slag: [0, 0, 0, 0] },
        { hole: 5, par: 4, index: 5, slag: [0, 0, 0, 0] },
        { hole: 6, par: 5, index: 16, slag: [0, 0, 0, 0] },
        { hole: 7, par: 4, index: 17, slag: [0, 0, 0, 0] },
        { hole: 8, par: 3, index: 8, slag: [0, 0, 0, 0] },
        { hole: 9, par: 4, index: 9, slag: [0, 0, 0, 0] },
        { hole: 10, par: 3, index: 14, slag: [0, 0, 0, 0] },
        { hole: 11, par: 4, index: 13, slag: [0, 0, 0, 0] },
        { hole: 12, par: 3, index: 2, slag: [0, 0, 0, 0] },
        { hole: 13, par: 4, index: 6, slag: [0, 0, 0, 0] },
        { hole: 14, par: 3, index: 3, slag: [0, 0, 0, 0] },
        { hole: 15, par: 5, index: 7, slag: [0, 0, 0, 0] },
        { hole: 16, par: 3, index: 10, slag: [0, 0, 0, 0] },
        { hole: 17, par: 4, index: 15, slag: [0, 0, 0, 0] },
        { hole: 18, par: 3, index: 4, slag: [0, 0, 0, 0] }*/
/*
      const playerTee = [
        { name: this.players[0].name, tee: this.form.checked[0] },
        { name: this.players[1].name, tee: this.form.checked[1] },
        { name: this.players[2].name, tee: this.form.checked[2] },
        { name: this.players[3].name, tee: this.form.checked[3] }
      ];

      const createGameInfo = [
        { course: this.form.course[this.form.slinga.length - 1] },
        { slinga: this.form.slinga[this.form.slinga.length - 1] },
        { playerTee: playerTee }
      ];

      const data = {
        createGameInfo
      };
      */
/*
      try {
        let response = await axios.post(
          "http://localhost:3000/creategame",
          data
        );
        console.log("saved data", response);
        console.log(data);
      } catch (e) {
        error => console.log(error);
      } */
    },
    onCountryInputChange(query) {

      if (query.trim().length === 0) {
        return null;
      }

      // return the matching countries as an array
      return this.courseQuery.filter(course => {
        return course.title.toLowerCase().includes(query.toLowerCase());
      });
    },


    getSlopes (id,name, hcp) {





    let tee = this.teeOptions.find(tee => tee.value === id);


  let parsedSlopeValue = parseFloat(tee.slopeValue.replace(/,/g, ".")).toFixed(1);
  let parsedCoursRating = parseFloat(tee.courseRating.replace(/,/g, ".")).toFixed(1);


console.log("HPC: " +hcp);
console.log("Slope: " +parsedSlopeValue)
console.log("Course Raing: " +parsedCoursRating)
console.log("Banans Par:"  +this.coursePar)


    let slopeRating =   this.calculateSlopeRating(hcp, parsedSlopeValue,parsedCoursRating,this.coursePar);
    let player = this.players.find(player => player.playerId === name );

    player.slopehcp = slopeRating;


    },

    calculateSlopeRating (hcp, slopeValue, courseRating, coursePar){

      return Math.round(hcp * (slopeValue / 113) + (courseRating - coursePar));
    },

    teeAndSlope(id) {
      //this.selectedSearchItem = item;
     //console.log('selected',item);

       let result = this.slingaOptions.find(item => item.value == id);
           let coursepar = 0;

           result.Holes.forEach(holeItem => {
             let hole = {};
             hole.name = holeItem[0].Name;
             hole.holeId = holeItem[0].HoleID;
             hole.hole = holeItem[0].Number;
              hole.par = holeItem[0].Par;
              hole.index = holeItem[0].Index;
              hole.slag = [0,0,0,0];
               this.holesArray.push(hole);
             coursepar += parseInt(holeItem[0].Par);

           });


           this.coursePar = coursepar;
        result.slopes.forEach(slopeItem => {

          let Tee = {};
          if(slopeItem[0].Gender == "1")
          {

            Tee.text = slopeItem[0].TeeColor
          }
          else {
            Tee.text = slopeItem[0].TeeColor
          }



          Tee.value = slopeItem[0].TeeID+slopeItem[0].Gender;
          Tee.courseRating = slopeItem[0].CourseRating;
          Tee.slopeValue = slopeItem[0].SlopeValue;
 this.teeOptions.push(Tee);
            if(slopeItem[0].Gender == "0")
          {


          this.teeOptionsMale.push(Tee);

          }
          else {
            this.teeOptionsFemale.push(Tee);
          }

        });



      //this.form.course = item;
       //this.slingaOptions = []

    }



  },
  computed: {


    slinga() {
      this.courses.forEach(course => {
        if (course.title === this.form.course) {
          course.slingor.forEach(slinga => {
              this.slingaOptions.push({
                text: slinga.slinga,
                value: slinga.slinga
              });

          });
        } else return;
      });
      return this.slingaOptions;
    }
  },
  components: {
    suggestions: Suggestions
  }
};
</script>

<style>
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

.teamColorBanner1 {
  margin-top: 25px;
  height: 15px;
  width: 15px;
  background-color: white;
  border-radius: 10px;
  border: 3px solid #fd9b37;
}

.teamColorBanner2 {
  margin-top: 25px;
  height: 15px;
  width: 15px;
  background-color: white;
  border-radius: 10px;
  border: 3px solid #69b3fe;
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
