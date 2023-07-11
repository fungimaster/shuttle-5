<template>
  <div class="d-flex" v-if="numberOfRounds" @click="showRoundsModal" style="cursor:pointer;">
  
    <div
      class="flex-fill"
      :style="stageBorder"
      v-for="(number, index) in numberOfRounds"
      :key="number.index"
    >    
      <!-- Text-diven har en height på 10% så att den alltid står för sig själv -->
      <div class="h-10">
        <!-- Window width under 1000px -->
        <p class="text-center">
          <span>R{{index + 1}}</span>
         <!--  <span v-if="windowWidth < 1000">
            {{
             
              index === numberOfRounds - 1
                ? "F"
                : `R${index + 1}`
            }}
          </span>

          <span v-else>
            {{
             index === numberOfRounds - 1
                ? "FINAL"
                : `R${index + 1}`
            }}
          </span> -->
          <!-- SYMBOLS CONDSNED-->
          <span v-if="condensed">
            <span
              class="d-flex justify-content-center"
              v-if="currentRound === index + 1"
            >
              <b-spinner
                small
                label="Small Spinner"
                type="grow"
                style="color: #fea60173"
                class="d-block ongoing"
              ></b-spinner>
            </span>

            <span v-else class="d-block">
              <em
                class="material-icons d-block complete"
                v-if="currentRound >= index + 1"
                >check_circle</em
              >
              <i
                v-else-if="isDefeated"
                class="material-icons d-inline-block incomplete text-danger"
                >cancel</i
              >
              <i
                v-else-if="index === numberOfRounds - 1"
                class="material-icons d-inline-block incomplete"
                >flight_takeoff</i
              >
              <i
                v-else-if="index === numberOfRounds - 2"
                class="material-icons d-inline-block incomplete"
                >golf_course</i
              >

              <em class="material-icons d-inline-block incomplete" v-else
                >check_circle</em
              >
            </span>
          </span>
        </p>
        <!-- Window width över 700px -->
      </div>

      <div :style="{ height: `${height(index) / 2}%` }"></div>
      <!-- Den gula diven får en height på en andel av tot. antal rundor - 10%  -->

      <!--  NOT CONDENSED  -->
      <div
        v-if="!condensed && currentRound >= index + 1"
        :class="{ 'stage-fill-white': stagefill === 'white' }"
        class="stage-fill stage p-2 d-flex justify-content-center align-items-center"
        :style="[roundCompleted, { height: `${100 - height(index) - 10}%` }]"
      >
       <span v-if="index + 1 === currentRound">
         <b-spinner
                small
                label="Spinner"
                type="grow"
                variant="dark"                
                class="d-block ongoing"
              ></b-spinner>
        </span>
        <i  v-else class="material-icons icons-size">check_circle</i>
        
      </div>
      <div
        v-if="!condensed && currentRound < index + 1"
        :class="{ 'stage-fill-white': stagefill === 'white' }"
        class="stage-fill stage p-2 d-flex justify-content-center align-items-center"
        :style="{ height: `${100 - height(index) - 8}%` }"
      >
        <i
          v-if="index === numberOfRounds - 1"
          class="material-icons icons-size-final"
          >emoji_events</i
        >
       

      </div>
  
    </div>


<b-modal ref="rounds-modal" title="Datum för omgångar" hide-footer no-close-on-esc no-close-on-backdrop>
<b-container class="p-1">
   
            <b-row>
                <b-col>
                   <p>                   
                        <ul class="roundlist">
                          <li v-bind:class="{ active: currentRound === 1}">
                            Omgång 1: 15 aug - 28 aug
                          </li>
                           <li v-bind:class="{ active: currentRound === 2}">
                            Omgång 2: 29 aug - 11 sep
                          </li>
                            <li v-bind:class="{ active: currentRound === 3}">
                            Omgång 3: 12 sep - 21 sep
                          </li>                           
                          <li v-bind:class="{ active: currentRound === 4}">
                            Omgång 4: 22 sep - 28 sep
                          </li>
                          <li v-bind:class="{ active: currentRound === 5}">
                            Omgång 5: 29 sep - 5 okt
                          </li>
                            <li v-bind:class="{ active: currentRound === 6}">
                             Omgång 6: 6 okt - 15 okt
                          </li>                            
                                   <li>
                             Resan till Italien: 22-26 okt
                          </li>                      
                          
                       </ul>                       
                   </p>                   
                </b-col>
            </b-row>


  
                                   
        </b-container>        
      
      <b-button class="mt-3" variant="outline-danger" block @click="hideRoundsModal">Stäng</b-button>      
    </b-modal>

   
    </div>
   
 


</template>

<script>
import { globalState } from "../main.js";
import { mapGetters } from "vuex";

export default {
  created() {
    this.axios
      .post(globalState.admin_url + "getCompetition", {
        id: globalState.compid,
      })
      .then((response) => {

        this.numberOfRounds = response.data.numberofrounds;
        this.currentRound = response.data.currentround ? response.data.currentround : 0
      })
      .catch((error) => {
        console.log(error);
        this.numberOfRounds = false;
      });

    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },

  props: ["opacity", "linecolor", "stagefill", "condensed"],
  data() {
    return {
      round1: true,
      round2: false,
      round3: false,
      round4: false,
      round5: false,
      round6: false,
      round7: false,
      round8: false,
      round9: null,
      numberOfRounds: null,
      currentRound: null,
      windowWidth: window.innerWidth,
      teams: 512,
    };
  },
  methods: {
    showRoundsModal() {
        this.$refs["rounds-modal"].show();
    },
    hideRoundsModal() {
        this.$refs["rounds-modal"].hide();
    },
    numberOfTeams(index) {
      if (index === 0) return this.teams;
      if (index === 1) return this.teams / 2;
      if (index === 2) return this.teams / 4;
      if (index === 3) return this.teams / 8;
      if (index === 4) return this.teams / 16;
      if (index === 5) return this.teams / 32;
      if (index === 6) return 8;
      if (index === 7) return 2;
    },
    height(index) {
      //om index 0, retunera halva index 1 längd.
      if (index === 0) {
        return this.height(1) / 2;
      }

      let onepart = 100 / this.numberOfRounds;
      //Shrink används för plana ut effekten av minskningen.
      let shrinkBy = 0.6;
      let tempHeight = this.numberOfRounds - onepart * (index + 1);
      let height = Math.abs(tempHeight) * shrinkBy;
      height = height * 1.42; //new to decrease the "loss" of teams on the way to the final
      return height;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },

  computed: {
    ...mapGetters(["isDefeated"]),
    roundCompleted() {
      return { backgroundColor: `rgba(255, 166, 0, ${this.opacity}` };
    },
    stageBorder() {
      return `border-right: 1px dashed ${
        this.linecolor ? this.linecolor : "#dee2e6"
      }!important`;
    },
  },
};
</script>


<style scoped>

.active {
  font-family: "Poppins bold";
  font-weight: 600;
}

.roundlist {
  list-style-type:none;
}

.roundlist li {
  margin-bottom:0.25em;
}


.teams-number {
  font-size: 0.7em;
}

.stage {
  border-top-right-radius: 10% 6%;
  border-bottom-right-radius: 10% 6%;
}

.background {
  background-color: #ffffff45;
}

.stage-fill {
  background-color: rgba(255, 166, 0, 0.5);
}

.stage-fill-white {
  background-color: rgba(255, 255, 255, 0.8);
}

p {
  font-size: 1rem;
}
i {
  font-size: 2rem;
  /*color: #fff;*/
  color: #333;
}
.complete {
  margin-top: 0.3rem;
  font-size: 1.1rem;
  color: rgba(255, 166, 0, 1);
}

.incomplete {
  margin-top: 0.3rem;
  font-size: 1rem;
  color: #dfdfdf;
  line-height: 0.35rem;
  border-radius: 100%;
  padding: 0.35rem;
}
.ongoing {
  margin-top: 0.4rem;
}

.icons-size-final {
  font-size: 2rem;
}

@media screen and (max-width: 500px) {
  .icons-size,
  .icons-size-final {
    font-size: 1rem;
    overflow: hidden;
  }
}

.h-10 {
  height: 10%;
}
</style>