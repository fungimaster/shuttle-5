<template>
  <div>
    <b-container>
      <b-row no-gutters>
        <b-col md="12">
          <div>
            <p hidden>{{ slinga }}</p>
             <p hidden>{{ tees }}</p>
          
            <!-- VÄLJA KLUBB -->
             <b-button hidden
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
                  <strong> {{ props.item }}</strong>
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
                      {{ player.name }} (hcp: {{player.hcp}})
                    </p>
                    <p class="playerInfo">
                      Spelar från tee {{ form.checked[index] }}
                    </p>
                  </b-col>
                </b-row>

                <b-row no-gutters>
                  <b-col cols="12">

                   
                     <b-form-group
                id="input-group-6"
                class="inputField"                
              >
             
             <!--  v-model="form.tees[index]"
             :options="teeOptions"
              -->
                <b-form-radio-group   
                  v-model="form.tees[index]"
                  :options="teeOptions"              
                  buttons
                  button-variant="primary"
                  required
                  class="radioSlinga"                  
                >
                <div hidden>
               <b-form-radio v-model="form.checked[index]" value="40"
                          ></b-form-radio
                        >
                </div>
                </b-form-radio-group>
              </b-form-group>               
               
                    <b-form-group hidden>
                      <b-form-radio-group
                        buttons
                        button-variant="primary"
                        required
                      >
                        <b-form-radio v-model="form.checked[index]" value="40"
                          >Tee 40</b-form-radio
                        >
                        <b-form-radio v-model="form.checked[index]" value="49"
                          >Tee 49</b-form-radio
                        >
                        <b-form-radio v-model="form.checked[index]" value="52"
                          >Tee 52</b-form-radio
                        >
                        <b-form-radio v-model="form.checked[index]" value="57"
                          >Tee 57</b-form-radio
                        >
                        <b-form-radio v-model="form.checked[index]" value="60"
                          >Tee 60</b-form-radio
                        >
                      </b-form-radio-group>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-form-group>
            </div>
          </transition>
        </b-col>

        <footer class="fixed-bottom" md="12">
          <b-row class="teOff" no-gutters>
            <b-col v-if="form.slinga" md="12">
              <b-button
                :disabled="form.checked.length < 4"
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

export default {
  async beforeMount() {
    try {

         this.axios
                .post(
                    "https://matchplay.meteorapp.com/methods/getGolfclubs"
                )
                .then(response => {
                    //this.courses = response.data;

                    //example data
                    this.courses = 
                    [
                      {
                      "title": "Allerum",
                      "slingor": [{"slinga": "Ängsbanan","tees":"vit,svart,gul,blå"},{"slinga": "Parkbanan 9+9","tees":"gul,röd"} ],
                     
                      }
                    ]
                    

                    this.courses.forEach(course => {
                      this.courseOptions.push({
                        text: course.title,
                        value: course.title
                      }),
                        this.courseQuery.push(course.title);
                    });

                })
                .catch(error => {
                    //this.player_1_error = "Golfaren hittades inte... prova att skriva in golfid igen.";   
                    console.log(error);
                });
      
      /*
      const response = await axios.get("https://matchplay.meteorapp.com/methods/getGolfclubs");
      const data = response.data[response.data.length - 1];
      this.courses = data.Courses;
      */

      

    } catch (e) {
      console.log(e);
    }

    this.players = [
    {
      "name": "Bruce Wayne",
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
      "hcp": 1.2
    },
    {
      "name": "Donald Trump",
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
      "hcp": 20
    },
    {
      "name": "Anders Tegnell",
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
      "hcp": 11
    },
    {
      "name": "Joan Jett",
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
      "hcp": 5
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
      team1: "",
      team2: "",
      displaySlinga: false,
      players: [],
      courses: [],
      courseOptions: [],
      slingaOptions: [],
      teeOptions: [],
      form: {
        course: "",
        slinga: "",
        checked: [],
        tees: ''
      },
      show: true,
      test: {},
      query: "",
      courseQuery: [],
      selectedCourse: null,
      options: {
        placeholder: "Välj klubb för laget",
        inputClass: "form-control "
      }
    };
  },
     mounted: function () {
      this.getGolfClubs();
    },
  methods: {
        clearCourse: function() { //not used right now, might be needed...
          this.form.course = '';
          this.form.slinga = '';
          this.slingaOptions = [];
          
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

      try {
        let response = await axios.post(
          "http://localhost:3000/creategame",
          data
        );
        console.log("saved data", response);
        console.log(data);
      } catch (e) {
        error => console.log(error);
      }
    },
    onCountryInputChange(query) {

      if (query.trim().length === 0) {
        return null;
      }
      // return the matching countries as an array
      return this.courseQuery.filter(course => {
        return course.toLowerCase().includes(query.toLowerCase());
      });
    },
   
    onSearchItemSelected(item) {
      //this.selectedSearchItem = item;
     //console.log('selected',item);
      this.form.course = item;
       this.slingaOptions = [] 
       
    }
  },
  computed: {
    tees() {
      //console.log('tees computed')
      this.teeOptions = []
        this.courses.forEach(course => {
          if (course.title === this.form.course) {
            
            course.slingor.forEach(slinga => {
              //console.log(slinga.slinga, this.form.slinga)
              if (slinga.slinga === this.form.slinga) {
              //console.log('show',slinga.tees, slinga.tees.length)
                const tees = slinga.tees.split(",");
                var i;
                for (i = 0; i < tees.length; i++) {
                    this.teeOptions.push({
                       text: tees[i],
                       value: tees[i]
                  });
                }
                
              }
              
            })

          }
      });
      console.log(this.teeOptions)
       return this.teeOptions;
    },

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
  padding-top:40px;
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
