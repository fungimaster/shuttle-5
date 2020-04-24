<template>
  <div>
    <b-button v-b-modal.modal-1> {{ currentStrokes }}</b-button>

    <b-modal id="modal-1" title="BootstrapVue">
      <div v-for="(player, index) in players.slice(0, 1)" :key="player.index">
        <h1>{{ player.name }}</h1>
        <div
          v-for="holes in player.holes"
          :key="holes.index"
          class="buttons"
          :class="
            holes.hole != activehole ? { classDisplayNone: active } : null
          "
        >
          <!-- Visar antal slag per spelare i team 1 -->
          <h1 v-if="holes.strokes == 0">-</h1>
          <h1 v-else class="strokes">{{ holes.strokes }}</h1>

          <b-container>
            <b-row>
              <b-col>
                <button
                  class="btn btn-warning"
                  @click="
                    holes.hole === activehole ? (holes.strokes = 1) : null,
                      sendScore(player)
                  "
                >
                  1
                </button>
                <button
                  class="btn btn-warning"
                  @click="
                    holes.hole === activehole ? (holes.strokes = 2) : null,
                      sendScore(player)
                  "
                >
                  2
                </button>
                <button
                  class="btn btn-warning"
                  @click="
                    holes.hole === activehole ? (holes.strokes = 3) : null,
                      sendScore(player)
                  "
                >
                  {{ par === 3 ? "Par" : null }}
                  {{ par - 1 === 3 ? "Birdie" : null }}
                  {{ par + 1 === 3 ? "Bogey" : null }}

                  3
                </button>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <button
                  class="btn btn-warning"
                  @click="
                    holes.hole === activehole ? (holes.strokes = 4) : null,
                      sendScore(player)
                  "
                >
                  {{ par === 4 ? "par" : null }}
                  {{ par - 1 === 4 ? "Birdie" : null }}
                  {{ par + 1 === 4 ? "Bogey" : null }}
                  {{ par + 2 === 4 ? "Double Bogey" : null }}

                  4
                </button>
                <button
                  class="btn btn-warning"
                  @click="
                    holes.hole === activehole ? (holes.strokes = 5) : null,
                      sendScore(player)
                  "
                >
                  {{ par === 5 ? "par" : null }}
                  {{ par - 1 === 5 ? "Birdie" : null }}
                  {{ par + 1 === 5 ? "Bogey" : null }}
                  {{ par + 2 === 5 ? "Double Bogey" : null }}

                  5
                </button>
                <button
                  class="btn btn-warning"
                  @click="
                    holes.hole === activehole ? (holes.strokes = 6) : null,
                      sendScore(player)
                  "
                >
                  {{ par === 6 ? "par" : null }}
                  {{ par - 1 === 6 ? "Birdie" : null }}
                  {{ par + 1 === 6 ? "Bogey" : null }}
                  {{ par + 2 === 6 ? "Double Bogey" : null }}
                  6
                </button></b-col
              >
            </b-row>

            <b-row>
              <b-col>
                <button
                  class="btn btn-warning"
                  @click="
                    holes.hole === activehole ? (holes.strokes = 7) : null,
                      sendScore(player)
                  "
                >
                  {{ par === 7 ? "par" : null }}
                  {{ par - 1 === 7 ? "Birdie" : null }}
                  {{ par + 1 === 7 ? "Bogey" : null }}
                  {{ par + 2 === 7 ? "Double Bogey" : null }}
                  7
                </button>
                <button
                  class="btn btn-warning"
                  @click="
                    holes.hole === activehole ? (holes.strokes = 8) : null,
                      sendScore(player)
                  "
                >
                  8
                </button>
                <button
                  class="btn btn-warning"
                  @click="
                    holes.hole === activehole ? (holes.strokes = 9) : null,
                      sendScore(player)
                  "
                >
                  9
                </button></b-col
              >
            </b-row>
          </b-container>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ["players", "activehole", "active", "par"],
  computed: {
    currentStrokes() {
      let strokes = [];
      this.players.forEach((holes) => {
        holes.holes.forEach((hole) => {
          strokes.push(hole);
        });
      });
      console.log(strokes);
      return strokes;
    },
  },
  methods: {
    sendScore(...args) {
      this.$emit("sendScore", args);
    },
  },
};
</script>

<style scoped>
.classDisplayNone {
  display: none;
}
</style>
