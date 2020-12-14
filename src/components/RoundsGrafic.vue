<template>
  <div class="d-flex" v-if="numberOfRounds">
    <div
      class="flex-fill"
      :style="stageBorder"
      v-for="(number, index) in numberOfRounds"
      :key="number.index"
    >
      <!-- Text-diven har en height på 10% så att den alltid står för sig själv -->
      <div class="h-10">
        <!-- Window width under 700px -->
        <p class="text-center" v-if="windowWidth < 1000">
          {{ index === numberOfRounds - 1 ? "FR" : `R${index + 1}` }}
        </p>
        <!-- Window width över 700px -->
        <p class="text-center" v-else>
          {{ index === numberOfRounds - 1 ? "FINAL" : `RUNDA ${index + 1}` }}
        </p>
      </div>
      <div :style="{ height: `${height(index) / 2}%` }"></div>
      <!-- Den gula diven får en height på en andel av tot. antal rundor - 10%  -->
      <div
        v-if="currentRound >= index + 1"
        class="stage-fill stage p-2 d-flex justify-content-center align-items-center"
        :style="[roundCompleted, { height: `${100 - height(index) - 10}%` }]"
      >
        <i class="material-icons icons-size">check_circle</i>
      </div>
      <div
        v-else
        class="stage-fill stage p-2 d-flex justify-content-center align-items-center"
        :style="{ height: `${100 - height(index) - 10}%` }"
      >
        <i
          v-if="index === numberOfRounds - 1"
          class="material-icons icons-size-final"
          >golf_course</i
        >

        <i v-else class="material-icons icons-size invisible">check_circle</i>
      </div>
    </div>
  </div>
</template>

<script>
import { globalState } from "../main.js";

export default {
  created() {
    this.axios
      .post(globalState.admin_url + "getCompetition", {
        id: "nY27A4xfsuLpcNbDA",
      })
      .then((response) => {
        this.numberOfRounds = response.data.numberofrounds;
        this.currentRound = response.data.currentround;
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

  props: ["opacity", "linecolor"],
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
    };
  },
  methods: {
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
      return height;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },

  computed: {
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
.stage {
  border-top-right-radius: 94% 4%;
  border-bottom-right-radius: 94% 4%;
}

.background {
  background-color: #ffffff45;
}
.stage-fill {
  background-color: rgba(255, 166, 0, 0.5);
}

p {
  font-size: 1rem;
}
i {
  font-size: 2rem;
  color: #fff;
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