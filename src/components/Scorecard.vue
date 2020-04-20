<template>
  <div>
    <div id="landscape" v-if="!overview">
      <b-container class="bv-example-row">
        <!--  HEADER  -->

        <b-row class="holeRow pt-4">
          <b-col class="col-2 pr-0">
            <button
              @click="activeHole--, saveData()"
              class="holeButtons"
              id="buttonLeft"
              :disabled="activeHole === 1"
              v-if="activeHole > 1"
            >
              <span class="material-icons">
                arrow_back_ios
              </span>
            </button>
          </b-col>
            
            <b-col class="col-8 text-center p-0">
              <b-row>
                <b-col xs="4">
                   <span class="holepar">Par: {{ par }}</span>

                </b-col>
                 <b-col xs="4">
                   <span class="activeHole">{{ activeHole }}</span>
                </b-col>
                 <b-col xs="4">
                  <span class="holepar">Index: {{ index }}</span>
                </b-col>
              </b-row>       
            </b-col>

            <b-col class="col-2 pl-0">
            <button
              @click="activeHole++, saveData()"
              class="holeButtons"
              id="buttonRight"
              :disabled="activeHole === 18"
              v-if="activeHole < 18"
            >
             <span class="material-icons">
                arrow_forward_ios
              </span>
            </button>
          </b-col>
        </b-row>

        <!-- LÄMNADE HÄR FÖR ATT ENKELT KUNNA DUBBELKOLLA ATT SLAG PER SPELARE STÄMMER-->

      <!--  <ul v-for="hole in course" :key="hole.index">
          <li>{{ hole.hole }} : {{ hole.slag }}</li>
        </ul> -->

        <!--  SCORECARD RUTOR  -->
        <!--  TEAM 1 -->
        <div class="team1ScoreCard">
          <div
            v-for="(player, index) in players.slice(0, 2)"
            :key="player.index"
          >
            <b-row class="playerRow">
              <div class="teamColor1"></div>
              <b-col xs="6" class="playerNameContainer">
                <p class="playerName">{{ player.name }}</p>
                <!-- <p class="playerTotalScore">(0)</p> -->

                <!--  SLAG OCH HCP TEAM 1 -->
                <div class="playerInfo">
                  <span>SHCP {{ slopedHcpPlayers[index] }} </span>
                 <!--  <span>HCP {{ player.hcp }} </span> -->
                  <span :class="{ hideSlag: slag(index) === 0 ? true : false }">
                    &#9642; SLAG {{ slag(index) }}
                  </span>
                </div>
              </b-col>
              <b-col cols="5">
                <!--  STROKES SECTION -->
                <div
                  class="buttons"
                  v-for="holes in player.holes"
                  :key="holes.index"
                  :class="
                    holes.hole != activeHole
                      ? { classDisplayNone: active }
                      : null
                  "
                >
                  <!-- MINUS-KNAPP TEAM 1-->
                  <button
                    :disabled="holes.strokes === 0"
                    @click="holes.hole === activeHole ? holes.strokes-- : null"
                    class="btn btn-warning"
                  >
                    <i class="material-icons">remove</i>
                  </button>
                  <!-- Visar antal slag per spelare i team 1 -->
                  <span v-if="holes.strokes == 0">-</span>
                  <span v-else class="strokes">{{ holes.strokes }}</span>

                  <!-- PLUS-KNAPP TEAM 1-->
                  <button
                    @click="
                      holes.hole === activeHole ? holes.strokes++ : null,
                        currentStrokes(player)
                    "
                    @click.once="holes.strokes = par"
                    class="btn btn-warning"
                  >
                    <i class="material-icons">add</i>
                  </button>
                </div>
              </b-col>
            </b-row>
          </div>
        </div>
        <!-- TEAM 2 -->
        <div class="team2ScoreCard">
          <div
            v-for="(player, index) in players.slice(2, 4)"
            :key="player.index"
          >
            <b-row class="playerRow">
              <div class="teamColor2"></div>

              <b-col xs="6" class="playerNameContainer">
                <p class="playerName">{{ player.name }}</p>
                <!--  SLAG OCH HCP TEAM 2 -->
                <div class="playerInfo">
                   <span>SHCP {{ slopedHcpPlayers[index+2] }} </span>
                  <!-- <span>HCP {{ player.hcp }}</span> -->

                  <span
                    :class="{ hideSlag: slag(index + 2) === 0 ? true : false }"
                  >
                    &#9642; SLAG {{ slag(index + 2) }}
                  </span>
                </div>
              </b-col>
              <b-col cols="5">
                <!--  STROKES SECTION -->
                <div
                  class="buttons"
                  v-for="holes in player.holes"
                  :key="holes.index"
                  :class="
                    holes.hole != activeHole
                      ? { classDisplayNone: active }
                      : null
                  "
                >
                  <!-- MINUS-KNAPP TEAM 2 -->
                  <button
                    :disabled="holes.strokes === 0"
                    @click="holes.hole === activeHole ? holes.strokes-- : null"
                    class="btn btn-warning"
                  >
                    <i class="material-icons">remove</i>
                  </button>

                  <!-- Visar antal slag per spelare i team 1 -->
                  <span v-if="holes.strokes == 0">-</span>
                  <span v-else class="strokes">{{ holes.strokes }}</span>

                  <!-- PLUS-KNAPP TEAM 2-->
                  <button
                    @click="
                      holes.hole === activeHole ? holes.strokes++ : null,
                        currentStrokes(player)
                    "
                    @click.once="holes.strokes = par"
                    class="btn btn-warning"
                  >
                    <i class="material-icons">add</i>
                  </button>
                </div>
              </b-col>
            </b-row>
          </div>
        </div>

        <!-- NÄSTA HÅL & ÖVERSIKT BUTTONS -->
        <button
          id="nextHole"
          class="btn btn-primary"
          @click="activeHole++, saveData(), makeToast('success')"
        >
          Nästa hål
        </button>
        <button class="btn btn-primary" @click="overview = !overview">
          Översikt
        </button>

        <!-- FOOTER - LEADER SECTION -->
        <footer class="fixed-bottom">
          <b-row class="leaderSection">
            <b-col s="4" class="scoreTeam1">
              <p>{{ team1 }}</p>
            </b-col>
            <div class="leaderTeam1">
              <h4 v-if="leader && !tie">{{ matchScore }}</h4>
            </div>
            <b-col s="2" :class="{ leaderRight: leader, leaderLeft: !leader }">
              <p v-if="tie" id="tie">A/S</p>

              <div
                v-if="!tie"
                :class="{ triangleRight: leader, triangleLeft: !leader }"
              ></div>
            </b-col>
            <div class="leaderTeam2">
              <h4 v-if="!leader && !tie">{{ matchScore * -1 }}</h4>
            </div>
            <b-col s="4" class="scoreTeam2">
              <p>{{ team2 }}</p>
            </b-col>
          </b-row>
        </footer>
      </b-container>
    </div>

    <!--  LEADER BOARD -->
    <div id="overview" v-if="overview">
      <b-container>
        <b-row class="leaderBoardPlayers">
          <b-col s="4" class="scoreTeam1">
            <p>{{ team1 }}</p>
          </b-col>
          <div class="leaderTeam1">
            <h4 v-if="leader && !tie">{{ matchScore }}</h4>
          </div>
          <b-col s="2" :class="{ leaderRight: leader, leaderLeft: !leader }">
            <p v-if="tie" id="tie">0</p>

            <div
              v-if="!tie"
              :class="{ triangleRight: leader, triangleLeft: !leader }"
            ></div>
          </b-col>
          <div class="leaderTeam2">
            <h4 v-if="!leader && !tie">{{ matchScore * -1 }}</h4>
          </div>
          <b-col s="4" class="scoreTeam2">
            <p>{{ team2 }}</p>
          </b-col>
        </b-row>

        <!--  TABELL HÅL 1-9 -->
        <table class="table9">
          <tr>
            <th>Hole:</th>
            <td v-for="hole in course.slice(0, 9)" :key="hole.index">
              {{ hole.hole }}
            </td>
            <td v-bold>OUT</td>
          </tr>
          <tr>
            <th>Par:</th>
            <td v-for="hole in course.slice(0, 9)" :key="hole.index">
              {{ hole.par }}
            </td>
            <td v-bold>
              {{ parFirstNine }}
            </td>
          </tr>

          <!--  SPELARE 1 -->
          <tr v-for="player in players.slice(0, 1)" :key="player.index">
            <th v-initials>{{ player.name }}</th>

            <td
              v-for="holes in player.holes.slice(0, 9)"
              :key="holes.index"
              v-scoreColor:arguments="{
                slag: holes.strokes,
                par: holes.par
              }"
            >
              {{ holes.strokes === 0 ? null : holes.strokes }}
            </td>
            <td
              v-for="score in playerScoreFrontNine.slice(0, 1)"
              :key="score.index"
              v-bold
            >
              {{ score }}
            </td>
          </tr>

          <!-- SPELARE 2 -->
          <tr v-for="player in players.slice(1, 2)" :key="player.index">
            <th v-initials>{{ player.name }}</th>
            <td
              v-for="holes in player.holes.slice(0, 9)"
              :key="holes.index"
              v-scoreColor:arguments="{
                slag: holes.strokes,
                par: holes.par
              }"
            >
              {{ holes.strokes === 0 ? null : holes.strokes }}
            </td>
            <td
              v-for="score in playerScoreFrontNine.slice(1, 2)"
              :key="score.index"
              v-bold
            >
              {{ score }}
            </td>
          </tr>

          <!-- SPELARE 3 -->
          <tr v-for="player in players.slice(2, 3)" :key="player.index">
            <th v-initials>{{ player.name }}</th>
            <td
              v-for="holes in player.holes.slice(0, 9)"
              :key="holes.index"
              v-scoreColor:arguments="{
                slag: holes.strokes,
                par: holes.par
              }"
            >
              {{ holes.strokes === 0 ? null : holes.strokes }}
            </td>
            <td
              v-for="score in playerScoreFrontNine.slice(2, 3)"
              :key="score.index"
              v-bold
            >
              {{ score }}
            </td>
          </tr>

          <!-- SPELARE 4 -->
          <tr v-for="player in players.slice(3, 4)" :key="player.index">
            <th v-initials>{{ player.name }}</th>
            <td
              v-for="holes in player.holes.slice(0, 9)"
              :key="holes.index"
              v-scoreColor:arguments="{
                slag: holes.strokes,
                par: holes.par
              }"
            >
              {{ holes.strokes === 0 ? null : holes.strokes }}
            </td>
            <td
              v-for="score in playerScoreFrontNine.slice(3, 4)"
              :key="score.index"
              v-bold
            >
              {{ score }}
            </td>
          </tr>
        </table>

        <!--  TABELL HÅL 10-18 -->
        <table class="table18">
          <tr>
            <th>Hole:</th>
            <td v-for="hole in course.slice(9, 18)" :key="hole.index">
              {{ hole.hole }}
            </td>
            <td v-bold>IN</td>
            <td v-bold>TOT</td>
          </tr>
          <tr>
            <th>Par:</th>
            <td v-for="hole in course.slice(9, 18)" :key="hole.index">
              {{ hole.par }}
            </td>
            <td v-bold>
              {{ parTotal - parFirstNine }}
            </td>
            <td v-bold>
              {{ parTotal }}
            </td>
          </tr>

          <!-- SPELARE 1 -->
          <tr v-for="player in players.slice(0, 1)" :key="player.index">
            <th v-initials>{{ player.name }}</th>
            <td
              v-for="holes in player.holes.slice(9, 18)"
              :key="holes.index"
              v-scoreColor:arguments="{
                slag: holes.strokes,
                par: holes.par
              }"
            >
              {{ holes.strokes === 0 ? null : holes.strokes }}
            </td>
            <td
              v-for="score in playerScoreBackNine.slice(0, 1)"
              :key="score.index"
              v-bold
            >
              {{ score }}
            </td>
            <td
              v-for="score in playerScoreTotal.slice(0, 1)"
              :key="score.index"
              v-bold
            >
              {{ score }}
            </td>
          </tr>

          <!-- SPELARE 2 -->
          <tr v-for="player in players.slice(1, 2)" :key="player.index">
            <th v-initials>{{ player.name }}</th>
            <td
              v-for="holes in player.holes.slice(9, 18)"
              :key="holes.index"
              v-scoreColor:arguments="{
                slag: holes.strokes,
                par: holes.par
              }"
            >
              {{ holes.strokes === 0 ? null : holes.strokes }}
            </td>
            <td
              v-for="score in playerScoreBackNine.slice(1, 2)"
              :key="score.index"
              v-bold
            >
              {{ score }}
            </td>
            <td
              v-for="score in playerScoreTotal.slice(1, 2)"
              :key="score.index"
              v-bold
            >
              {{ score }}
            </td>
          </tr>

          <!-- SPELARE 3 -->
          <tr v-for="player in players.slice(2, 3)" :key="player.index">
            <th v-initials>{{ player.name }}</th>
            <td
              v-for="holes in player.holes.slice(9, 18)"
              :key="holes.index"
              v-scoreColor:arguments="{
                slag: holes.strokes,
                par: holes.par
              }"
            >
              {{ holes.strokes === 0 ? null : holes.strokes }}
            </td>
            <td
              v-for="score in playerScoreBackNine.slice(2, 3)"
              :key="score.index"
              v-bold
            >
              {{ score }}
            </td>
            <td
              v-for="score in playerScoreTotal.slice(2, 3)"
              :key="score.index"
              v-bold
            >
              {{ score }}
            </td>
          </tr>

          <!-- SPELARE 4 -->
          <tr v-for="player in players.slice(3, 4)" :key="player.index">
            <th v-initials>{{ player.name }}</th>
            <td
              v-for="holes in player.holes.slice(9, 18)"
              :key="holes.index"
              v-scoreColor:arguments="{
                slag: holes.strokes,
                par: holes.par
              }"
            >
              {{ holes.strokes === 0 ? null : holes.strokes }}
            </td>
            <td
              v-for="score in playerScoreBackNine.slice(3, 4)"
              :key="score.index"
              v-bold
            >
              {{ score }}
            </td>
            <td
              v-for="score in playerScoreTotal.slice(3, 4)"
              :key="score.index"
              v-bold
            >
              {{ score }}
            </td>
          </tr>
        </table>

        <!-- BUTTON FÖR MATCH VY -->
        <button class="btn btn-primary" @click="overview = !overview">
          Match Vy
        </button>
      </b-container>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { schp, hcpSlope } from "../helpers.js";

export default {
  async beforeMount() {
    try {
      //hämtar data och lägger det i this.player
      /*
      const response = await axios.get("http://localhost:3000/scorecard");
      const data = response.data[response.data.length - 1];
      this.players = data.gameData;
      */

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
      "hcp": -5
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
      "hcp": 0
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
      "hcp": 5
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
      "hcp": 10
    }
    ]


      //lägger till par på this.player.holes för att komma åt par under översikten
      this.players.forEach(player => {
        player.holes.forEach((hole, index) => {
          hole.par = this.course[index].par;
        });
      });
      //fixar team-namn
      this.team1 = 'lag 1'//data.gameData[0].team;
      this.team2 = 'lag 2'
      /* data.gameData.forEach(element => {
        if (element.team != this.team1) {
          this.team2 = 'lag 2'//element.team;
        }
      }); */
      this.schp();
    } catch (e) {
      console.log(e);
    }
  },
  data() {
    return {
      active: true,
      players: [],
      activeHole: 1,
      team1: [],
      team2: [],
      overview: false,
      nameCount: [],
      displayToast: true,
      parData: 0,
      slopedHcpPlayers: [],
      //Fiktiv data nedan
      course: [
        { hole: 1, par: 5, index: 18, slag: [0, 0, 0, 0] },
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
        { hole: 18, par: 3, index: 4, slag: [0, 0, 0, 0] }
      ],
      courseRating: 69.9,
      slopeRating: 129,
      banansPar: 70
    };
  },
  methods: {
    getPar() {
      this.parData = this.course.find(e => e.hole === this.activeHole);
    },
    currentStrokes(player) {
      const name = player.name;
      if (this.nameCount.includes(name)) {
        return;
      }
      if (this.nameCount[name] == null) {
        this.nameCount.push(name);
      }
      if (this.nameCount.length === 4) {
        this.displayToast = false;
        this.nameCount = [];
      }
    },
    async loadData() {
      try {
        /*
        let response = await axios.get("http://localhost:3000/scorecard");
        const data = response.data[response.data.length - 1];
        this.players = data.gameData;
        */
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
      "hcp": -5
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
      "hcp": 0
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
      "hcp": 5
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
      "hcp": 10
    }
    ]
      } catch (e) {
        console.log(e);
      }
    },
    async saveData() {
      const data = {
        gameData: this.players
      };
      try {
        let response = await axios.post(
          "http://localhost:3000/scorecard",
          data
        );
        console.log("saved data", response);
      } catch (e) {
        error => console.log(error);
      }
    },
    async schp() {
      const schpTemp = schp(
        this.courseRating,
        this.slopeRating,
        this.banansPar
      );
      this.slopedHcpPlayers = schpTemp;
      const value1 = schpTemp[0];
      const value2 = schpTemp[1];
      const value3 = schpTemp[2];
      const value4 = schpTemp[3];
      this.assignSlagPerIndex(value1, 0);
      this.assignSlagPerIndex(value2, 1);
      this.assignSlagPerIndex(value3, 2);
      this.assignSlagPerIndex(value4, 3);
      const sortedByHole = this.course.sort((a, b) => a.hole - b.hole);
      this.course = sortedByHole;
    },
    hcpSlope() {
      hcpSlope();
    },
    assignSlagPerIndex(value, playerIndex) {
      const sortedByIndex = this.course.sort((a, b) => a.index - b.index);
      for (let i = 0; i < value; i++) {
        if (i === 18) {
          value = value - i;
          i = 0;
        }
        sortedByIndex[i].slag[playerIndex]++;
      }
      return sortedByIndex;
    },
    slag(index) {
      let slag = this.course.find(e => e.hole === this.activeHole);
      return slag.slag[index];
    },
    listOfStrokesList() {
      
      let listOfStrokesList = [];
      const holes = this.players.map(player => player.holes);
      holes.forEach(e => {
        listOfStrokesList.push(e.map(hole => hole.strokes));
      });
      
      return listOfStrokesList;
    },
    strokes(index) {
      const listOfStrokesList = this.listOfStrokesList();
      return listOfStrokesList[index];
    },
    makeToast(variant = null) {
      if (this.displayToast === false) {
        this.displayToast = true;
        return;
      }
      this.activeHole--;
      this.$bvToast.toast("Fyll i resultat på alla spelare", {
        title: "Varning",
        autoHideDelay: 3000,
        variant: variant,
        solid: true
      });
    }
  },
  computed: {
    par() {
      let par = this.course.find(e => e.hole === this.activeHole);
      return par.par;
    },
    parFirstNine() {
      const par = this.course.map(hole => hole.par);
      par.splice(9, 18);
      const parTotal = par.reduce((a, b) => a + b, 0);
      return parTotal;
    },
    parTotal() {
      const par = this.course.map(hole => hole.par);
      const parTotal = par.reduce((a, b) => a + b, 0);
      return parTotal;
    },
    index() {
      let index = this.course.find(e => e.hole === this.activeHole);
      //return "Index: " + index.index;
      return index.index;
    },
    playerScoreTotal() {
      const strokesTotal = [];
      const strokes = this.listOfStrokesList();
      strokes.forEach(e => {
        strokesTotal.push(e.reduce((a, b) => a + b));
      });
      return strokesTotal;
    },
    playerScoreFrontNine() {
      const strokesTotal = [];
      const strokes = this.listOfStrokesList();
      strokes.forEach(e => e.splice(9, 18));
      strokes.forEach(e => {
        strokesTotal.push(e.reduce((a, b) => a + b));
      });
      return strokesTotal;
    },
    playerScoreBackNine() {
      const strokesTotal = [];
      const strokes = this.listOfStrokesList();
      strokes.forEach(e => e.splice(0, 9));
      strokes.forEach(e => {
        strokesTotal.push(e.reduce((a, b) => a + b));
      });
      return strokesTotal;
    },
    matchScore() {
      //  för att få bort ett error-meddelande när sidan laddas.
      if (this.players.length === 0) {
        return;
      }
      let score = 0;
      const strokes = this.listOfStrokesList();

      let slag = this.course.filter(element => element.slag);

      const getSlagPlayers = (array, index) => {
        const newArray = [];
        array.forEach(element => {
          newArray.push(element.slag[index]);
        });
        return newArray;
      };

      // slag för varje spelare.
      const slag0 = getSlagPlayers(slag, 0);
      const slag1 = getSlagPlayers(slag, 1);
      const slag2 = getSlagPlayers(slag, 2);
      const slag3 = getSlagPlayers(slag, 3);

      //Skapar enskilda poänglistor
      let strokes0SlagNotCalc = strokes.slice(0, 1);
      let strokes1SlagNotCalc = strokes.slice(1, 2);
      let strokes2SlagNotCalc = strokes.slice(2, 3);
      let strokes3SlagNotCalc = strokes.slice(3, 4);

      strokes0SlagNotCalc = strokes0SlagNotCalc[0];
      strokes1SlagNotCalc = strokes1SlagNotCalc[0];
      strokes2SlagNotCalc = strokes2SlagNotCalc[0];
      strokes3SlagNotCalc = strokes3SlagNotCalc[0];

      //
      const subtractSlagFromScore = (scoreArray, slagArray) => {
        let newArray = [];
        scoreArray.forEach((element, index) => {
          newArray.push(element - slagArray[index]);
        });
        return newArray;
      };

      let strokes0 = subtractSlagFromScore(strokes0SlagNotCalc, slag0);
      let strokes1 = subtractSlagFromScore(strokes1SlagNotCalc, slag1);
      let strokes2 = subtractSlagFromScore(strokes2SlagNotCalc, slag2);
      let strokes3 = subtractSlagFromScore(strokes3SlagNotCalc, slag3);

      const replaceZero = number => (number <= 0 ? (number = 99) : number);
      strokes0 = strokes0.map(replaceZero);
      strokes1 = strokes1.map(replaceZero);
      strokes2 = strokes2.map(replaceZero);
      strokes3 = strokes3.map(replaceZero);

      const bestStrokesTeam1 = strokes0.map((num, index) =>
        num <= strokes1[index] ? num : strokes1[index]
      );
      const bestStrokesTeam2 = strokes2.map((num, index) =>
        num <= strokes3[index] ? num : strokes3[index]
      );
      const matchScore = bestStrokesTeam1.map(
        (num, index) => num - bestStrokesTeam2[index]
      );
      matchScore.forEach(subtractedScore => {
        if (subtractedScore != 0) {
          if (subtractedScore > 0) {
            score--;
          } else {
            score++;
          }
        }
      });
      console.log(score)
      return score;
    },
    leader() {
      let leader = true;
      this.matchScore > 0 ? (leader = true) : (leader = false);
      return leader;
    },
    tie() {
      let tie = undefined;
      this.matchScore === 0 ? (tie = true) : (tie = false);
      return tie;
    }
  },
  directives: {
    initials(el) {
      let array = el.innerText.split(" ");
      const intialsArray = array.map(e => e.slice(0, 1));
      el.innerHTML = intialsArray[0] + "." + intialsArray[1];
    },
    bold(el) {
      el.style.fontWeight = "900";
    },
    scoreColor(el, bind) {
      if (bind.value.slag === 0) {
        return;
      }
      //birdie
      if (bind.value.slag === bind.value.par - 1) {
        el.style.backgroundColor = "#e63a3a";
        el.style.color = "white";
      }
      //eagle
      if (bind.value.slag === bind.value.par - 2) {
        el.style.backgroundColor = "#b70000";
        el.style.color = "white";
      }
      //albatross & kondor
      if (
        bind.value.slag === bind.value.par - 3 ||
        bind.value.slag === bind.value.par - 4
      ) {
        el.style.backgroundColor = "#8a0b0b";
        el.style.color = "white";
      }
      //hole in one
      if (bind.value.slag === 1) {
        el.style.backgroundColor = "goldenrod";
      }
      //bogey
      if (bind.value.slag === bind.value.par + 1) {
        el.style.backgroundColor = "#69b3fe";
        el.style.color = "white";
      }
      //double-bogey
      if (bind.value.slag === bind.value.par + 2) {
        el.style.backgroundColor = "#0a81f7";
        el.style.color = "white";
      }
      //tripple-bogey and above
      if (bind.value.slag === bind.value.par + 3) {
        el.style.backgroundColor = "#063e76";
        el.style.color = "white";
      }
    }
  }
};
</script>
<style scoped>

.holepar {
  font-size:0.7em;
  line-height: 0;
}

.nav-link:focus, .nav:focus {
    outline: none !important;
}

.tabs ul.nav-tabs:focus {
    outline: none;
}

.nav>li:focus {
    outline: none !important;
}

.form-control:focus {
    outline: none !important;
}

.form-control > div:focus {
    outline: none;
}

li:focus, .nav-item:focus, .nav-item:active {
    outline: none !important;
}

li[role=presentation]:focus {
    outline: none !important;
}

div[role=group]:focus {
    outline: none !important;
}

*:focus {
    outline: none;
}

/* leader board */
#landscape {
  min-height: 670px;
  min-width: 353px;
}
#overview {
  margin-left: 10px;
  margin-right: 10px;
}
table {
  table-layout: auto;
  text-align: left;
  width: 100%;
  margin: 25px auto;
  border-collapse: collapse;
}
tr:nth-child(even) {
  background: #f0f0f2;
}
tr:nth-child(1) {
  background: #195a3a;
  color: white;
}
tr:nth-child(2) {
  background: #195a3a;
  color: white;
}
td {
  padding: 3px;
  text-align: center;
}
.leaderBoardStrokes {
  margin: 4px;
  background-color: white;
  color: black;
  width: 30px;
  text-align: center;
}
.leaderBoardPlayers {
  margin-top: 40px;
  text-align: left;
  background: #195a3a;
  color: white;
  border-radius: 4px;
  padding-top: 20px;
  border-bottom: black solid 1px;
}
.leaderBoardNames {
  margin: 4px;
  list-style-type: symbols;
}
.btn-danger {
  font-size: 12px;
}
.btn-danger {
  font-size: 12px;
}
/* HEADER ROW */
.holeRow {
  margin-bottom: 20px;
  height: 80px;
  padding-top: 20px;
  background-color: #195a3a;
  color: white;
  font-size: 20px;
}
.activeHole {
  border-top: 0;  
  font-weight: 900;  
  font-size: 1.8em;
  line-height: 1;
}
.par {
  float: left;
}
.holeRow p {
  margin-top: 15%;
}
/*  SCORE CARD  */
.hideSlag {
  visibility: hidden;
}
.classDisplayNone {
  display: none;
}
.team1ScoreCard {
  margin: 5px;
  -webkit-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.19);
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  padding: 10px;
}
.team2ScoreCard {
  margin: 5px;
  margin-top: 13px;
  -webkit-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.19);
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  padding: 10px;
}
.strokes {
  padding: 0px;
  font-size: 20px;
}
.teamColor1 {
  display: inline-block;
  margin-left: 25px;
  background-color: #ffffff;
  height: 15px;
  width: 15px;
  margin-top: 25px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 3px solid #fd9b37;
}
.teamColor2 {
  display: inline-block;
  margin-left: 25px;
  background-color: #fff;
  height: 15px;
  width: 15px;
  margin-top: 25px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 3px solid #69b3fe;
}
.playerRow {
  margin-top: 10px;
  margin-bottom: 10px;
}
.playerName {
  font-weight: 900;
  text-align: left;
  line-height: 16px;
  font-size: 16px;
  margin-top: 17px;
  margin-bottom: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.playerNameContainer {
  overflow: hidden;
}
.playerInfo {
  color: #ababab;
  font-size: 12px;
  margin-bottom: 5px;
  margin-top: 10px;
  text-align: left;
  line-height: 1px;
}
.playerTotalScore {
  margin-top: 8px !important;
  text-align: left;
  font-size: 10px;
}
/* SCORE-CARD BUTTONS */
.holeButtons {
  background: 0;
  border: 0;
  font-weight: 900;
  font-size: 25px;
}
#buttonLeft {
  float: left;
  color: white;
}
#buttonRight {
  float: right;
  color: white;
}
.buttons {
  margin-top: 15px;
}
.btn-warning,
.btn-success {
  border-radius: 50%;
  width: 37px;
  height: 37px;
  color: white;
  font-weight: 900;
  background-color: #195a3a;
  border: 0; 
}

.btn-success .material-icons, .btn-warning .material-icons {
    font-size: 1.4em;    
    margin-left: -4px;
}

.btn.btn-primary.active,
.btn.btn-primary:active {
  background-color: #195a3a !important;
  transform: scale(0.95) !important;
  border: 0 !important;
}
.btn-warning,
.btn-warning:hover,
.btn-warning:active,
.btn-warning:visited,
.btn-warning:focus,
.btn-warning:disabled {
  background-color: #195a3a !important;
  color: white !important;
  border: 0 !important;
  box-shadow: 0 !important;
}
.btn-warning:focus,
.btn-warning.focus {
  box-shadow: 0 !important;
}
.btn.btn-primary,
.btn-btn-primary:disabled {
  background-color: #195a3a !important;
  border-radius: 50px !important;
  box-shadow: 0 !important;
}
#nextHole {
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 12px;
  width: 340px;
}
/* LEADER SECTION  */
.leaderSection {
  color: white;
  position: fixed;
  height: 50px;
  bottom: 0;
  width: 100%;
  margin: 0;
}
.scoreTeam1 {
  min-width: 90px;
  background-color: #195a3a;
  padding: 0;
  padding-left: 10px;
  border: 0;
  border: 1px #195a3a solid;
  overflow: hidden;
}
.scoreTeam2 {
  min-width: 90px;
  background-color: #195a3a;
  padding: 0;
  border: 0;
  border: 1px #195a3a solid;
  overflow: hidden;
}
.leaderTeam1 {
  background-color: #195a3a;
  width: 20px;
  padding: 0;
  border: 0;
  border: 1px #195a3a solid;
}
.leaderTeam2 {
  background-color: #195a3a;
  width: 20px;
  padding: 0;
  border: 0;
  border: 1px #195a3a solid;
}
.scoreTeam1.scoreTeam2,
p {
  font-size: 16px;
  margin: auto;
  margin-top: 15px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.leaderTeam1 h4 {
  line-height: 3.3;
}
.leaderTeam2 h4 {
  line-height: 3.3;
}
.leaderLeft {
  width: 30px;
  padding: 0;
  background-color: #195a3a;
  border: 0;
  border: 1px #195a3a solid;
}
.leaderRight {
  width: 30px;
  padding: 0;
  background-color: #195a3a;
  border: 0;
  border: 1px #195a3a solid;
}
.triangleRight {
  width: 0;
  height: 0;
  margin-top: 20px;
  border-style: solid;
  border-width: 0px 10px 10px 10px;
  border-color: transparent transparent white transparent;
  background-color: #195a3a;
}
.triangleLeft {
  float: right;
  margin-top: 20px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0px 10px 10px 10px;
  border-color: transparent transparent white transparent;
  background-color: #195a3a;
}
#tie {
  margin-top: 10px;
  font-size: 20px;
  border: 1px #195a3a solid;
  line-height: unset;
}
</style>
