<template>
  <div>
    <b-modal id="modal-1" title ok-only>
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link active" @click="showData = true, showExplanation = false">Slope</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="showData = false, showExplanation = true">Förklaring</a>
        </li>
      </ul>

      <b-container class="container">
        <div v-if="showData">
          <b-row class="explanation">
            <b-col cols="4"></b-col>
            <b-col cols="2" v-for="player in players" class="playerData">
              <h5 v-initials>{{player.name}}</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="explanation">
              <p>Exakt Hcp</p>
            </b-col>
            <b-col cols="2" v-for="player in players" class="playerData">
              <p>{{player.hcp}}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="explanation">
              <p>Max 28 Hcp</p>
            </b-col>
            <b-col cols="2" v-for="player in players" class="playerData">
              <p>{{player.hcp > 28 ? 28 : player.hcp }}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="explanation">
              <p>Tee</p>
            </b-col>
            <b-col cols="2" v-for="player in players" class="playerData">
              <p>{{player.tee}}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="explanation">
              <p>Slope Hcp</p>
            </b-col>
            <b-col cols="2" v-for="hcpslope in slopeHandicapList" class="playerData">
              <p>{{hcpslope > 28 ? 28 : hcpslope}}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="explanation">
              <p>10% reducering</p>
            </b-col>
            <b-col cols="2" v-for="hcpslope in slopeHandicapList" class="playerData">
              <p>{{hcpslope > 28 ? 28 * 0.9: hcpslope * 0.9}}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="explanation">
              <p
                v-if="slopeHandicapList[getIndexOfLowest] * 0.9 < 0"
              >Lägg till {{slopeHandicapList[getIndexOfLowest] * 0.9 * -1}}, nolla lägsta hcp ({{slopeHandicapList[getIndexOfLowest] * 0.9 * -1}}) och avrunda till närmsta heltal</p>
              <p
                v-else
              >Dra av {{slopeHandicapList[getIndexOfLowest] * 0.9}}, nolla lägsta hcp ({{slopeHandicapList[getIndexOfLowest] * 0.9}}) och avrunda till närmsta heltal</p>
            </b-col>
            <b-col cols="2" v-for="singleSlope in slope" class="playerData">
              <p>{{ singleSlope }}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="explanation">
              <p>Nytt spel Hcp</p>
            </b-col>
            <b-col cols="2" v-for="singleSlope in slope" class="playerData">
              <p>{{ singleSlope }}</p>
            </b-col>
          </b-row>
        </div>

        <div class="explanation" v-if="showExplanation">
          <b-row>
            <b-col cols="6" class="explanation">
              <h5>Uträkning</h5>
              <p>Spelarens exakta handicap</p>
              <p>* (slope / 113)</p>
              <p>+ (CR – Banans par)</p>
              <p>= Slope</p>
            </b-col>
            <b-col cols="3" class="playerData">
              <h5>Exempel A</h5>
              <p>HCP:{{exactHcpPlayerA}}</p>
              <p>Course rating:{{courseRating}}</p>
              <p>Slope rating:{{slopeRating}}</p>
              <p>Banans rating:{{banansPar}}</p>
              <strong>Slope {{slopeA}}</strong>
            </b-col>
            <b-col cols="3" class="playerData">
              <h5>Exempel B</h5>
              <p>HCP:{{exactHcpPlayerB}}</p>
              <p>Course rating:{{courseRating}}</p>
              <p>Slope rating:{{slopeRating}}</p>
              <p>Banans rating:{{banansPar}}</p>
              <strong>Slope {{slopeB}}</strong>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6" class="explanation">
              <p>Efter att slopen {{slope}} räknats in reduceras respektive spelares HCP med 10%</p>
            </b-col>
            <b-col cols="3" class="playerData">
              <p>{{slopeA}} - 10% =</p>
              <strong>{{ slopeA * 0.9}}</strong>
            </b-col>
            <b-col cols="3" class="playerData">
              <p>{{slopeB}} - 10% =</p>
              <strong>{{ slopeB * 0.9}}</strong>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6" class="explanation">
              <p>De tre spelarna med högst reducerat spelhandicap får i matchen slag motsvarande skillnaden till den spelaren som har lägst spelhandicap. Avrundning till närmaste heltal (uppåt vid 0.5, 1.5, 2.5 osv). Spelaren med lägst reducerat spelhandicap spelar med 0 i spelhandicap.</p>
            </b-col>
            <b-col cols="3" class="playerData">
              <p>{{ slopeA * 0.9}} - 1.8 =</p>
              <strong>{{ Math.round(slopeA - (slopeA*0.1) - 1.8)}}</strong>
            </b-col>
            <b-col cols="3" class="playerData">
              <p>{{ slopeB * 0.9}} - 1.8 =</p>
              <strong>0</strong>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </b-modal>
    <button class="btn btn-primary" v-b-modal.modal-1>Hur räknas slope ut?</button>
  </div>
</template>

<script>
export default {
  props: [
    "courseRating",
    "slopeRating",
    "banansPar",
    "players",
    "slope",
    "slopeHandicapList"
  ],
  data() {
    return {
      exactHcpPlayerA: 21.1,
      exactHcpPlayerB: 1.8,
      tee: 57,
      showExplanation: false,
      showData: true
    };
  },
  method: {},
  computed: {
    slopeA() {
      return Math.round(
        this.exactHcpPlayerA * (this.slopeRating / 113) +
          (this.courseRating - this.banansPar)
      );
    },
    slopeB() {
      return Math.round(
        this.exactHcpPlayerB * (this.slopeRating / 113) +
          (this.courseRating - this.banansPar)
      );
    },
    getIndexOfLowest() {
      let smallestHCP = 999;
      this.slope.forEach(hcp => {
        if (hcp < smallestHCP) {
          smallestHCP = hcp;
        }
      });
      const index = this.slope.findIndex(hcp => hcp === smallestHCP);
      return index;
    }
  },
  directives: {
    initials(el) {
      //Om namnet eller initialerna är tre tecken långt tillsammans, så görs inga initialer.
      if (el.innerText.length === 3) {
        return;
      }
      let array = el.innerText.split(" ");
      const intialsArray = array.map(e => e.slice(0, 1));
      el.innerHTML = intialsArray[0] + "." + intialsArray[1];
    }
  }
};
</script>

<style scoped>
.container {
  font-size: 11px;
}

.explanation {
  background-color: #074da1;
  color: white;
}

.playerData {
  background-color: #d77c27;
  color: white;
  border-bottom: solid 1px white;
}

p,
h5 {
  margin-top: 1em;
}

.btn.btn-primary,
.btn-btn-primary:disabled {
  background-color: #195a3a !important;
  border-radius: 50px !important;
  box-shadow: 0 !important;
}

.btn.btn-primary.active,
.btn.btn-primary:active {
  background-color: #195a3a !important;
  transform: scale(0.95) !important;
  border: 0 !important;
}

.nav-item {
  cursor: pointer;
}
</style>
