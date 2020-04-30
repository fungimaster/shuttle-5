<template>
  <div>
    <div v-if="!overview" id="landscape">
      <b-container class="bv-example-row">
        <!--  HEADER  -->

        <b-row class="holeRow pt-4">
          <b-col class="col-2 pr-0 text-left">
            <button
              @click="activeHole--, saveData()"
              class="holeButtons disable-dbl-tap-zoom"
              id="buttonLeft"
              :disabled="activeHole === 1"
            >
              <span class="material-icons">arrow_back_ios</span>
            </button>
          </b-col>

          <b-col class="col-8 text-center p-0">
            <b-row>
              <b-col xs="4" class="pl-2 pr-0 text-right">
                <span class="holepar">Par: {{ par }}</span>
              </b-col>
              <b-col xs="4" class="p-0 pr-1 pl-1">
                <span class="activeHole">{{ activeHole }}</span>
              </b-col>
              <b-col xs="4" class="pl-0 pr-2 text-left">
                <span class="holepar">Index: {{ index }}</span>
              </b-col>
            </b-row>
          </b-col>

          <b-col class="col-2 pl-0 text-right">
            <button
              @click="activeHole++, saveData()"
              class="holeButtons disable-dbl-tap-zoom"
              id="buttonRight"
              :disabled="activeHole === 18"
            >
              <span class="material-icons">arrow_forward_ios</span>
            </button>
          </b-col>
        </b-row>

        <!-- LÄMNADE HÄR FÖR ATT ENKELT KUNNA DUBBELKOLLA ATT SLAG PER SPELARE STÄMMER-->

        <!--  <ul v-for="hole in course" :key="hole.index">
          <li>{{ hole.hole }} : {{ hole.slag }}</li>
				</ul>-->

        <!-- TEAM 1 CONTAINER -->
        <div
          class="team1ScoreCard"
          :class="[
            singleHoleWinner < 0 && displayToast === false ? 'holeWinner' : '',
            singleHoleWinner > 0 && displayToast === false ? 'holeLoser' : ''
          ]"
        >
          <div
            v-for="(player, index) in players.slice(0, 2)"
            :key="player.index"
          >
            <!--  SLAG OCH HCP TEAM 1 -->

            <b-row class="playerRow">
              <div class="teamColor1"></div>
              <b-col xs="6" class="playerNameContainer">
                <p class="playerName">{{ player.name }}</p>

                <div class="playerInfo">
                  <span>SHCP {{ slopedHcpPlayers[index] }}</span>
                  <span :class="{ hideSlag: slag(index) === 0 ? true : false }"
                    >&#9642; SLAG {{ slag(index) }}</span
                  >
                </div>
              </b-col>

              <!-- SCOREBUTTON -->
              <!-- SPELARE 1 -->
              <b-col>
                <div v-if="index === 0">
                  <button
                  class="buttons disable-dbl-tap-zoom"
                    @click="$bvModal.show('modal-1'), (counter = 1)"
                    v-if="
                      currentStrokesList.slice(0, 1)[0] !==
                        currentStrokesList.slice(0, 1)[0]
                    "
                  >
                    -
                  </button>
                  <button
                  class="buttons disable-dbl-tap-zoom"
                    v-else
                    @click="$bvModal.show('modal-1'), (counter = 1)"
                  >
                    {{ currentStrokesList.slice(0, 1)[0] }}
                  </button>
                </div>
                <!-- SPELARE 2 -->
                <div v-if="index === 1">
                  <button
                    @click="$bvModal.show('modal-2'), (counter = 2)"
                  class="buttons disable-dbl-tap-zoom"
                    v-if="
                      currentStrokesList.slice(1, 2)[0] !==
                        currentStrokesList.slice(1, 2)[0]
                    "
                  >
                    -
                  </button>

                  <button
                    @click="$bvModal.show('modal-2'), (counter = 2)"
                    class="btn btn-warning"
                    v-else
                  >
                    {{ currentStrokesList.slice(1, 2)[0] }}
                  </button>
                </div>
              </b-col>
            </b-row>
          </div>
        </div>

        <!-- TEAM 2 CONTAINER -->
        <div
          class="team2ScoreCard"
          :class="[
            singleHoleWinner > 0 && displayToast === false ? 'holeWinner' : '',
            singleHoleWinner < 0 && displayToast === false ? 'holeLoser' : ''
          ]"
        >
          <div
            v-for="(player, index) in players.slice(2, 4)"
            :key="player.index"
          >
            <!--  SLAG OCH HCP TEAM 2 -->
            <b-row class="playerRow">
              <div class="teamColor2"></div>
              <b-col xs="6" class="playerNameContainer">
                <p class="playerName">{{ player.name }}</p>

                <div class="playerInfo">
                  <span>SHCP {{ slopedHcpPlayers[index + 2] }}</span>
                  <span
                    :class="{ hideSlag: slag(index + 2) === 0 ? true : false }"
                    >&#9642; SLAG {{ slag(index + 2) }}</span
                  >
                </div>
              </b-col>
              <!-- SCOREBUTTON -->
              <!-- SPELAR 3 -->
              <b-col>
                <div v-if="index === 0">
                  <button
                    @click="$bvModal.show('modal-3'), (counter = 3)"
                  class="buttons disable-dbl-tap-zoom"
                    v-if="
                      currentStrokesList.slice(2, 3)[0] !==
                        currentStrokesList.slice(2, 3)[0]
                    "
                  >
                    -
                  </button>
                  <button
                    @click="$bvModal.show('modal-3'), (counter = 3)"
                  class="buttons disable-dbl-tap-zoom"
                    v-else
                  >
                    {{ currentStrokesList.slice(2, 3)[0] }}
                  </button>
                </div>
                <!-- SPELAR 4 -->
                <div v-if="index === 1">
                  <button
                  class="buttons disable-dbl-tap-zoom"
                    @click="$bvModal.show('modal-4'), (counter = 4)"
                    v-if="
                      currentStrokesList.slice(3, 4)[0] !==
                        currentStrokesList.slice(3, 4)[0]
                    "
                  >
                    -
                  </button>
                  <button
                    @click="$bvModal.show('modal-4'), (counter = 4)"
                    class="btn btn-warning"
                    v-else
                  >
                    {{ currentStrokesList.slice(3, 4)[0] }}
                  </button>
                </div>
              </b-col>
            </b-row>
          </div>
        </div>

        <!-- SCORING MODAL -->
        <app-scoring
          :players="players"
          :activehole="activeHole"
          :active="active"
          :par="par"
          :indexProp="indexProp"
          :counter="counter"
          :nameCount="nameCount"
          @sendScore="currentStrokes"
          @updateCounter="updateCounter"
        ></app-scoring>

        <!-- NÄSTA HÅL & ÖVERSIKT BUTTONS -->

         <b-row class="mt-3">
              <b-col class="col-6">
            <b-button
              class="btn-md pl-3 pr-3 bottombuttons"
              variant="primary"
              @click="overview = !overview"
            >
              <span class="material-icons">reorder</span> Översikt
            </b-button>
          </b-col>
          <b-col class="col-6 text-right">
            <b-button
              v-if="activeHole < 18"
              id="nextHole"
              class="btn-md pl-3 pr-3 bottombuttons"
              variant="primary"
              @click="activeHole++, saveData(), makeToast('success')"
            >
              Nästa hål
              <span class="material-icons">arrow_forward_ios</span>
            </b-button>
          </b-col>
        </b-row>

        <h4 hidden>{{ dormy }}</h4>
        <h3 hidden>winner declared? {{ winnerDeclared }}</h3>
        <h4
          hidden
          :style="winnerDeclared === true ? 'background-color: red' : 'background-color: white' "
        >
          VINNARE:
          {{ winner }} Resultat: {{ totalWins.totalWins1 }} vs
          {{ totalWins.totalWins2 }}
        </h4>

        <!-- FOOTER - LEADER SECTION -->
        <b-col hidden class="col-4 leaderTeam1 text-right">
          <h4 v-if="leader && !tie">{{ matchScore }}</h4>
        </b-col>

        <b-col hidden class="col-4 leaderTeam2">
          <h4 v-if="!leader && !tie">{{ matchScore * -1 }}</h4>
        </b-col>

        <footer class="fixed-bottom">
          <b-row class="leaderSection" align-v="center" align-h="center">
            <!-- HOME TEAM -->
            <b-col class="col-4 scoreTeam text-left pl-3" :class="{ scoreTeam1: leader && !tie }">
              <span
                style="float:left;"
              >{{getFirstName(players[0].name)}} & {{getFirstName(players[1].name)}}</span>
              <i
                v-if="!tie && winnerDeclared && leader"
                class="material-icons pb-1 pl-1"
              >emoji_events</i>
              <span v-if="!tie && !winnerDeclared">{{dormy1}}</span>
            </b-col>

            <!-- score -->
            <b-col
              class="col-4 text-center score"
              :class="{ leaderRight: leader && !tie, leaderLeft: !leader && !tie, tie: tie, winnerdeclared: winnerDeclared}"
            >
              <span v-if="tie" id="tie">A/S</span>
              <span v-if="!leader && !tie && !winnerDeclared">{{ matchScore * -1 }}UP</span>
              <!-- away leads -->
              <span v-if="!leader && winnerDeclared">{{ matchScore * -1 }}&X</span>
              <!-- home wins -->

              <span v-if="leader && !tie && !winnerDeclared">{{ matchScore }}UP</span>
              <!-- home leads -->
              <span v-if="leader && winnerDeclared">{{ matchScore }}&X</span>
              <!-- home wins -->
            </b-col>

            <!-- away team -->
            <b-col class="col-4 scoreTeam text-right pr-3" :class="{ scoreTeam2: !leader && !tie }">
              <i
                v-if="!tie && winnerDeclared && !leader"
                class="material-icons pb-1 pr-1"
              >emoji_events</i>
              <span
                style="float:right;"
              >{{getFirstName(players[2].name)}} & {{getFirstName(players[3].name)}}</span>
              <span style="clear:right;" v-if="!tie && !winnerDeclared">{{dormy2}}</span>
            </b-col>
          </b-row>
        </footer>
      </b-container>
    </div>

    <!--  LEADER BOARD -->
    <div id="overview" v-if="overview">
      <b-container class="p-0">
        <b-row class="pt-3" align-v="center" align-h="center">
          <!-- HOME TEAM -->
          <b-col class="col-4 scoreTeam text-left pl-3" :class="{ scoreTeam1: leader && !tie }">
            <span
              style="float:left;"
            >{{getFirstName(players[0].name)}} & {{getFirstName(players[1].name)}}</span>
            <i v-if="!tie && winnerDeclared && leader" class="material-icons pb-1 pl-1">emoji_events</i>
            <span v-if="!tie && !winnerDeclared">{{dormy1}}</span>
          </b-col>

          <!-- score -->
          <b-col
            class="col-4 text-center score"
            :class="{ leaderRight: leader && !tie, leaderLeft: !leader && !tie, tie: tie, winnerdeclared: winnerDeclared}"
          >
            <span v-if="tie" id="tie">A/S</span>
            <span v-if="!leader && !tie && !winnerDeclared">{{ matchScore * -1 }}UP</span>
            <!-- away leads -->
            <span v-if="!leader && winnerDeclared">{{ matchScore * -1 }}&X</span>
            <!-- home wins -->

            <span v-if="leader && !tie && !winnerDeclared">{{ matchScore }}UP</span>
            <!-- home leads -->
            <span v-if="leader && winnerDeclared">{{ matchScore }}&X</span>
            <!-- home wins -->
          </b-col>

          <!-- away team -->
          <b-col class="col-4 scoreTeam text-right pr-3" :class="{ scoreTeam2: !leader && !tie }">
            <i
              v-if="!tie && winnerDeclared && !leader"
              class="material-icons pb-1 pr-1"
            >emoji_events</i>
            <span
              style="float:right;"
            >{{getFirstName(players[2].name)}} & {{getFirstName(players[3].name)}}</span>
            <span style="clear:right;" v-if="!tie && !winnerDeclared">{{dormy2}}</span>
          </b-col>
        </b-row>

        <b-row hidden class="leaderBoardPlayers">
          <b-col s="4" class="scoreTeam1">
            <p>{{ team1 }}</p>
          </b-col>
          <div class="leaderTeam1">
            <h4 v-if="leader && !tie">{{ matchScore }}</h4>
          </div>
          <b-col s="2" :class="{ leaderRight: leader, leaderLeft: !leader }">
            <p v-if="tie" id="tie">0</p>

            <div v-if="!tie" :class="{ triangleRight: leader, triangleLeft: !leader }"></div>
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
            <td v-for="hole in course.slice(0, 9)" :key="hole.index">{{ hole.hole }}</td>
            <td v-bold>OUT</td>
          </tr>
          <tr>
            <th>Par:</th>
            <td v-for="hole in course.slice(0, 9)" :key="hole.index">{{ hole.par }}</td>
            <td v-bold>{{ parFirstNine }}</td>
          </tr>

          <!--  SPELARE 1 -->
          <tr v-for="player in players.slice(0, 1)" :key="player.index">
            <th v-initials class="initialsTeam1">{{ player.name }}</th>
            <td
              v-for="holes in player.holes.slice(0, 9)"
              :key="holes.index"
              v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
              v-displayLowestScore:arguments="{
                score: holes.strokes,
                lowestScoreOnHole,
                activeHole,
                course: course,
                player: player,
                draw: singleHoleWinner,
                slag: slag(0)
              }"
            >{{ holes.strokes === 0 ? null : holes.strokes }}</td>
            <td
              v-for="score in playerScoreFrontNine.slice(0, 1)"
              :key="score.index"
              v-bold
            >
              {{ score !== score ? "-" : score }}
            </td>
          </tr>

          <!-- SPELARE 2 -->
          <tr v-for="player in players.slice(1, 2)" :key="player.index">
            <th v-initials class="initialsTeam1">{{ player.name }}</th>
            <td
              v-for="holes in player.holes.slice(0, 9)"
              :key="holes.index"
              v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
              v-displayLowestScore:arguments="{
                score: holes.strokes,
                lowestScoreOnHole,
                activeHole,
                course: course,
                slag: slag(1)
              }"
            >{{ holes.strokes === 0 ? null : holes.strokes }}</td>
            <td
              v-for="score in playerScoreFrontNine.slice(1, 2)"
              :key="score.index"
              v-bold
            >
              {{ score !== score ? "-" : score }}
            </td>
          </tr>

      

          <tr class="emptyRow">
            <td >
              <p></p>
            </td>
          </tr>

          <!-- SPELARE 3 -->
          <tr v-for="player in players.slice(2, 3)" :key="player.index">
            <th v-initials class="initialsTeam2">{{ player.name }}</th>
            <td
              v-for="holes in player.holes.slice(0, 9)"
              :key="holes.index"
              v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
              v-displayLowestScore:arguments="{
                score: holes.strokes,
                lowestScoreOnHole,
                activeHole,
                course: course,
                slag: slag(2)
              }"
            >{{ holes.strokes === 0 ? null : holes.strokes }}</td>
            <td
              v-for="score in playerScoreFrontNine.slice(2, 3)"
              :key="score.index"
              v-bold
            >
              {{ score !== score ? "-" : score }}
            </td>
          </tr>

          <!-- SPELARE 4 -->
          <tr v-for="player in players.slice(3, 4)" :key="player.index">
            <th v-initials class="initialsTeam2">{{ player.name }}</th>
            <td
              v-for="holes in player.holes.slice(0, 9)"
              :key="holes.index"
              v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
              v-displayLowestScore:arguments="{
                score: holes.strokes,
                lowestScoreOnHole,
                activeHole,
                course: course,
                slag: slag(3)
              }"
            >{{ holes.strokes === 0 ? null : holes.strokes }}</td>
            <td
              v-for="score in playerScoreFrontNine.slice(3, 4)"
              :key="score.index"
              v-bold
            >
              {{ score !== score ? "-" : score }}
            </td>
          </tr>
        </table>

        <!--  TABELL HÅL 10-18 -->
        <table class="table18">
          <tr>
            <th>Hole:</th>
            <td v-for="hole in course.slice(9, 18)" :key="hole.index">{{ hole.hole }}</td>
            <td v-bold>IN</td>
            <td v-bold>TOT</td>
          </tr>
          <tr>
            <th>Par:</th>
            <td v-for="hole in course.slice(9, 18)" :key="hole.index">{{ hole.par }}</td>
            <td v-bold>{{ parTotal - parFirstNine }}</td>
            <td v-bold>{{ parTotal }}</td>
          </tr>

          <!-- SPELARE 1 -->
          <tr v-for="player in players.slice(0, 1)" :key="player.index">
            <th v-initials class="initialsTeam1">{{ player.name }}</th>
            <td
              v-for="holes in player.holes.slice(9, 18)"
              :key="holes.index"
              v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
              v-displayLowestScore:arguments="{
                score: holes.strokes,
                lowestScoreOnHole,
                activeHole,
                course: course,
                player: player,
                slag: slag(0)
              }"
            >{{ holes.strokes === 0 ? null : holes.strokes }}</td>
            <td
              v-for="score in playerScoreBackNine.slice(0, 1)"
              :key="score.index"
              v-bold
            >
              {{ score !== score ? "-" : score }}
            </td>
            <td
              v-for="score in playerScoreTotal.slice(0, 1)"
              :key="score.index"
              v-bold
            >
              {{ score !== score ? "-" : score }}
            </td>
          </tr>

          <!-- SPELARE 2 -->
          <tr v-for="player in players.slice(1, 2)" :key="player.index">
            <th v-initials class="initialsTeam1">{{ player.name }}</th>
            <td
              v-for="holes in player.holes.slice(9, 18)"
              :key="holes.index"
              v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
              v-displayLowestScore:arguments="{
                score: holes.strokes,
                lowestScoreOnHole,
                activeHole,
                course: course,
                player: player,
                slag: slag(0)
              }"
            >{{ holes.strokes === 0 ? null : holes.strokes }}</td>
            <td
              v-for="score in playerScoreBackNine.slice(1, 2)"
              :key="score.index"
              v-bold
            >
              {{ score !== score ? "-" : score }}
            </td>
            <td
              v-for="score in playerScoreTotal.slice(1, 2)"
              :key="score.index"
              v-bold
            >
              {{ score !== score ? "-" : score }}
            </td>
          </tr>

         <tr class="emptyRow">
            <td>
              <p ></p>
            </td>
          </tr>
          <!-- SPELARE 3 -->
          <tr v-for="player in players.slice(2, 3)" :key="player.index">
            <th v-initials class="initialsTeam2">{{ player.name }}</th>
            <td
              v-for="holes in player.holes.slice(9, 18)"
              :key="holes.index"
              v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
              v-displayLowestScore:arguments="{
                score: holes.strokes,
                lowestScoreOnHole,
                activeHole,
                course: course,
                player: player,
                slag: slag(0)
              }"
            >{{ holes.strokes === 0 ? null : holes.strokes }}</td>
            <td
              v-for="score in playerScoreBackNine.slice(2, 3)"
              :key="score.index"
              v-bold
            >
              {{ score !== score ? "-" : score }}
            </td>
            <td
              v-for="score in playerScoreTotal.slice(2, 3)"
              :key="score.index"
              v-bold
            >
              {{ score !== score ? "-" : score }}
            </td>
          </tr>

          <!-- SPELARE 4 -->
          <tr v-for="player in players.slice(3, 4)" :key="player.index">
            <th v-initials class="initialsTeam2">{{ player.name }}</th>
            <td
              v-for="holes in player.holes.slice(9, 18)"
              :key="holes.index"
              v-changeNanAndZero:arguments="{
                score: holes.strokes
              }"
              v-displayLowestScore:arguments="{
                score: holes.strokes,
                lowestScoreOnHole,
                activeHole,
                course: course,
                player: player,
                slag: slag(0)
              }"
            >{{ holes.strokes === 0 ? null : holes.strokes }}</td>
            <td
              v-for="score in playerScoreBackNine.slice(3, 4)"
              :key="score.index"
              v-bold
            >
              {{ score !== score ? "-" : score }}
            </td>
            <td
              v-for="score in playerScoreTotal.slice(3, 4)"
              :key="score.index"
              v-bold
            >
              {{ score !== score ? "-" : score }}
            </td>
          </tr>
        </table>

        <!-- BUTTON FÖR MATCH VY -->
        <button class="btn btn-primary" @click="overview = !overview">
          <span class="material-icons">golf_course</span>
          Match Vy
        </button>
        <app-hcp-modal :course-rating="courseRating" :slope-rating="slopeRating" :banans-par="banansPar" :players="players" :slope="slopedHcpPlayers" :slope-handicap-list="slopeHandicapList"></app-hcp-modal>


      </b-container>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { schp, hcpSlope } from "../helpers.js";
import ScoringVue from "./Scoring.vue";
import HcpModalVue from "./HcpModal.vue";


export default {
  components: {
    appScoring: ScoringVue,
    appHcpModal: HcpModalVue
  },
  directives: {
    displayLowestScore(el, bind) {
      // if (bind.value.draw !== 1 && bind.value.draw !== -1) {
      //   return;
      // }

      const activeHole = bind.value.activeHole;
      const slag = bind.value.slag;
      const score = bind.value.score;
      const lowestScore = bind.value.lowestScoreOnHole[activeHole - 1];

      if (score - slag === lowestScore) {
        el.style.backgroundColor = "red";
      }
    },
    changeNanAndZero(el, bind) {
      if (bind.value.score !== bind.value.score) {
        el.innerHTML = "-";
      }
      if (bind.value.score === 0) {
        el.innerHTML = null;
      }
    },
    initials(el) {
      let array = el.innerText.split(" ");
      const intialsArray = array.map(e => e.slice(0, 1));
      el.innerHTML = intialsArray[0] + "." + intialsArray[1];
    },
    bold(el) {
      el.style.fontWeight = "900";
    },
    nullIsStroke(el) {
      console.log(el);
      let newString = string.trim();

      if (newString !== newString) {
        el.innerHTML = "heej";
      } else return;
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
      nameCount: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
      ],
      displayToast: true,
      parData: 0,
      slopedHcpPlayers: [],
      holeWinner: [],
      winnerDeclared: false,
      scoringView: false,
      indexProp: "",
      counter: 1,
      lowestScoreOnHole: [],
      modalVisible: false,
      slopeHandicapList: [],
      dormy1: "",
      dormy2: "",


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
  computed: {
    currentStrokesList() {
      let strokesList = [];
      let strokes = [];
      this.players.forEach(holes => {
        holes.holes.forEach(hole => {
          strokesList.push(hole);
        });
      });
      strokesList.forEach(hole => {
        if (hole.hole === this.activeHole) {
          strokes.push(hole.strokes);
        }
      });

      return strokes;
    },
    totalWins() {
      const { totalWins1, totalWins2, draws } = this.totalHoleWins();

      return { totalWins1, totalWins2, draws };
    },
    winner() {
      const { totalWins1, totalWins2, draws } = this.totalHoleWins();

      const holesPlayed = totalWins1 + totalWins2 - draws;
      const holesLeft = 18 - holesPlayed;

      if (totalWins1 - totalWins2 > holesLeft) {
        return "TEAM 1 är vinnare", (this.winnerDeclared = true);
      }
      if (totalWins2 - totalWins1 > holesLeft) {
        return "TEAM 1 vinnare ", (this.winnerDeclared = true);
      }
      this.winnerDeclared = false;
      return null;
    },

    dormy() {
      const { totalWins1, totalWins2, draws } = this.totalHoleWins();

      const holesPlayed = totalWins1 + totalWins2 + draws;
      const holesLeft = 18 - holesPlayed;

      if (totalWins1 - totalWins2 === holesLeft) {
        return "TEAM 2 är dormy";
      }
      if (totalWins2 - totalWins1 === holesLeft) {
        return "TEAM 1 dormy";
      }

      return null;
    },

     singleHoleWinner() {
      return this.holeWinner[this.activeHole - 1];
    },
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
      //för att kunna skicka till Scoring.vue gör jag även detta:
      this.indexProp = index.index;
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
      const replaceNaN = number => (number !== number ? (number = 99) : number);

      strokes0 = strokes0.map(replaceZero).map(replaceNaN);
      strokes1 = strokes1.map(replaceZero).map(replaceNaN);
      strokes2 = strokes2.map(replaceZero).map(replaceNaN);
      strokes3 = strokes3.map(replaceZero).map(replaceNaN);

      const bestStrokesTeam1 = strokes0.map((num, index) =>
        num <= strokes1[index] ? num : strokes1[index]
      );
      const bestStrokesTeam2 = strokes2.map((num, index) =>
        num <= strokes3[index] ? num : strokes3[index]
      );
      const matchScore = bestStrokesTeam1.map(
        (num, index) => num - bestStrokesTeam2[index]
      );

      //lowestScoreOnHole används för att visa vem som tog hem håler i översikten
      this.lowestScoreOnHole = bestStrokesTeam1.map((num, index) =>
        num <= bestStrokesTeam2[index] ? num : bestStrokesTeam2[index]
      );
      //holeWinner används för att visa hålvinnare.
      this.holeWinner = matchScore;

      matchScore.forEach(subtractedScore => {
        if (subtractedScore != 0) {
          if (subtractedScore > 0) {
            score--;
          } else {
            score++;
          }
        }
      });
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
          name: "Bruce Wayne",
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
            { hole: 18, strokes: 0, slag: 0 }
          ],
          hcp: -5,
          tee: "svart"
        },
        {
          name: "Donald Trump",
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
            { hole: 18, strokes: 0, slag: 0 }
          ],
          hcp: 0,
          tee: "vit"
        },
        {
          name: "Anders Tegnell",
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
            { hole: 18, strokes: 0, slag: 0 }
          ],
          hcp: 5,
          tee: "Gul"
        },
        {
          name: "Joan Jett",
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
            { hole: 18, strokes: 0, slag: 0 }
          ],
          hcp: 10,
          tee: "Blå"
        }
      ];

      //lägger till par på this.player.holes för att komma åt par under översikten
      this.players.forEach(player => {
        player.holes.forEach((hole, index) => {
          hole.par = this.course[index].par;
        });
      });
      //fixar team-namn
      this.team1 = "lag 1"; //data.gameData[0].team;
      this.team2 = "lag 2";
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
  methods: {
    getFirstName(name) {
      return (
        name.split(" ")[0].substring(0, 1) + name.split(" ")[1].substring(0, 1)
      );
    },
 
    updateCounter(count) {
      console.log(count);
      this.counter = count;
    },
    getPar() {
      this.parData = this.course.find(e => e.hole === this.activeHole);
    },
    currentStrokes(player, activehole) {
      const name = player.name + "uniktId";
      const currentIndex = activehole - 1;
      if (this.nameCount[currentIndex].includes(name)) {
        return;
      }
      if (this.nameCount[currentIndex][name] == null) {
        this.nameCount[currentIndex].push(name);
        this.displayToast = true;
      }
      if (this.nameCount[currentIndex].length === 4) {
        this.displayToast = false;
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
            name: "Br W",
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
              { hole: 18, strokes: 0, slag: 0 }
            ],
            hcp: -5
          },
          {
            name: "Donald Trump",
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
              { hole: 18, strokes: 0, slag: 0 }
            ],
            hcp: 0
          },
          {
            name: "Anders Tegnell",
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
              { hole: 18, strokes: 0, slag: 0 }
            ],
            hcp: 5
          },
          {
            name: "Joan Jett",
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
              { hole: 18, strokes: 0, slag: 0 }
            ],
            hcp: 10
          }
        ];
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
      const { slopeHandicapList, newHcpPrel } = schp(
        this.courseRating,
        this.slopeRating,
        this.banansPar
      );

      //detta värde bröts ut för att kunna skickas vidare till
      this.slopeHandicapList = slopeHandicapList;

      this.slopedHcpPlayers = newHcpPrel;
      const value1 = newHcpPrel[0];
      const value2 = newHcpPrel[1];
      const value3 = newHcpPrel[2];
      const value4 = newHcpPrel[3];
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
    },
    totalHoleWins() {
      let totalWins1 = 0;
      let totalWins2 = 0;
      let draws = -1
      
       for (const winner of this.holeWinner) {
         if (winner === 0) {
          draws++
          break
         }
         winner < 0 ? totalWins1++ : totalWins2++;
       }

      return { totalWins1, totalWins2, draws };
    }
  }
};
</script>
<style scoped>
.container {
  /* fix for no padding on scorecard phone */
  padding-top: 0px;
}

.disable-dbl-tap-zoom {
  touch-action: manipulation;
}

.btn-primary .material-icons {
  font-size: 1em;
  vertical-align: bottom;
  margin-bottom: 6px;
}

.holepar {
  font-size: 0.7em;
  line-height: 0;
}

.nav-link:focus,
.nav:focus {
  outline: none !important;
}

.tabs ul.nav-tabs:focus {
  outline: none;
}

.nav > li:focus {
  outline: none !important;
}

.form-control:focus {
  outline: none !important;
}

.form-control > div:focus {
  outline: none;
}

li:focus,
.nav-item:focus,
.nav-item:active {
  outline: none !important;
}

li[role="presentation"]:focus {
  outline: none !important;
}

div[role="group"]:focus {
  outline: none !important;
}

*:focus {
  outline: none;
}

/* leader board */

#overview {
  margin-left: 10px;
  margin-right: 10px;
}

.initialsTeam1 {
  color: #fd9b37;
}
.initialsTeam2 {
  color: #69b3fe;
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

/* leader board      ---> table */

table {
  table-layout: auto;
  text-align: left;
  width: 100%;
  margin: 25px auto;
  /* border-collapse: inherit; */
  font-size: 12px;
}

th,
td {
  border: 1px solid #999;
}

.emptyRow {
  border: none;
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

/* HEADER ROW */
.holeRow {
  margin-bottom: 20px;
  height: 70px;
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

.score {
  line-height: 2.3em;
  letter-spacing: 2px;
}

.holeWinner {
  background: repeating-linear-gradient(
    45deg,
    #ecf5ec,
    #ecf5ec 10px,
    #fff 10px,
    #fff 20px
  );
}
.holeLoser {
  background: repeating-linear-gradient(
    45deg,
    #fceded,
    #fceded 10px,
    #fff 10px,
    #fff 20px
  );
}

.hideSlag {
  visibility: hidden;
}
.classDisplayNone {
  display: none;
}
.team1ScoreCard,
.team2ScoreCard {
  -webkit-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.19);
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  padding: 5px 10px;
}
.team2ScoreCard {
  margin-top: 13px;
}

.strokes {
  padding: 0px;
  font-size: 20px;
}

.teamColor1,
.teamColor2 {
  display: inline-block;
  margin-left: 25px;
  height: 20px;
  width: 20px;
  margin-top: 22px;
  margin-bottom: 20px;
  border-radius: 10px;
}

.teamColor1 {
  border: 3px solid #fd9b37;
  /*background:#fd9b37;*/
}

.teamColor2 {
  border: 3px solid #69b3fe;
  /*background:#69b3fe;*/
}

.holeWinner .teamColor1 {
  background-color: #fd9b37;
}

.holeWinner .teamColor2 {
  background-color: #69b3fe;
}

.playerRow {
  margin-top: 5px;
  margin-bottom: 5px;
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
  color: #585454;
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
  /* border-radius: 50%; */
  width: 77px;
  height: 54px;
  color: white;
  font-weight: 900;
  background-color: #195a3a;
  border: 0;
  font-size: 25px;
}

.btn-success .material-icons,
.btn-warning .material-icons {
  font-size: 1.4em;
  margin-left: -4px;
}

.btn.btn-primary.active,
.btn.btn-primary:active {
  background-color: #195a3a !important;
  transform: scale(0.95) !important;
  border: 0 !important;
  border-color: #195a3a !important;
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
  border-color: #195a3a !important;
}
#nextHole {
  /*
  font-size: 20px;  
  margin-bottom: 10px;
  margin-top: 12px;
   width: 340px; */
}
/* LEADER SECTION  */
.leaderSection {
  /* border-top: 1px solid #333; */
  position: fixed;
  bottom: 0;
  height: 80px;
  width: 100%;
  margin: 0;
  background-color: #fff;
}
.scoreTeam {
  font-size: 0.7em;
}

.scoreTeam span {
  display: block;
}

.scoreTeam1 {
  background: #fd9b37;
  position: relative;
  color: #fff;
  font-weight: 900;
  line-height: 44px;
}

.scoreTeam2 {
  background: #69b3fe;
  position: relative;
  color: #fff;
  font-weight: 900;
  line-height: 44px;
}

.leaderTeam1 {
  /*  background-color: #fd9b37;
  border: 1px #fd9b37 solid; */
  background-color: #fff;
  width: 20px;
  padding: 0;
  border: 0;
}
.leaderTeam2 {
  /* background-color: #69b3fe;
  border: 1px #69b3fe solid; */
  background-color: #fff;
  width: 20px;
  padding: 0;
  border: 0;
}
.scoreTeam1.scoreTeam2,
p {
  font-size: 0.7em;
  /* text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden; */
}

.leaderTeam1 h4 {
  line-height: 3.3;
}
.leaderTeam2 h4 {
  line-height: 3.3;
}
.leaderLeft {
  text-align: right;
  background: #69b3fe;
  color: #fff;
  font-size: 1.1em;
}
.leaderRight {
  text-align: left;
  background: #fd9b37;
  position: relative;
  color: #fff;
  font-weight: 900;
  color: #fff;
  font-size: 1.1em;
}

.leaderRight::after {
  content: "";
  position: absolute;
  left: 100%;
  width: 0;
  height: 0;
  border-top: 22px solid transparent;
  border-bottom: 22px solid transparent;
  border-left: 22px solid #fd9b37;
  clear: both;
}

.leaderLeft::before {
  content: "";
  position: absolute;
  right: 100%;
  width: 0;
  height: 0;
  border-top: 22px solid transparent;
  border-bottom: 22px solid transparent;
  border-right: 22px solid #69b3fe;
  clear: both;
}

.winnerdeclared::before,
.winnerdeclared::after {
  content: none;
}

#tie {
  font-size: 1em;
}
.tie {
  background: #fff;
}

.tie::before,
.tie::after {
  content: "" !important;
}

#landscape {
  height: calc(100vh + 100%);
  min-height: calc(100vh);
}

@media only screen and (max-width: 330px) {
  /* iphone 5/se */

  #landscape {
    min-height: calc(100vh);
  }

  .buttons .btn {
    width: 30px;
    height: 30px;
  }

  .buttons .btn-warning .material-icons {
    font-size: 1.3em;
    margin-left: -7px;
    margin-bottom: 3px;
  }

  .playerInfo {
    font-size: 0.6em;
  }

  .bottombuttons {
    font-size: 0.7em;
  }
}
</style>
