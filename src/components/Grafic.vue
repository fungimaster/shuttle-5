<template>
  <div class="d-flex">
    <div class="flex-fill" :style="stageBorder">
      <div class="mb-2 h-10">
        <p class="text-center">R1</p>
      </div>
      <div
        v-if="round1"
        class="stage-fill stage p-2 d-flex justify-content-center align-items-center h-80"
        :style="roundCompleted"
      >
        <i class="material-icons icons-size">check_circle</i>
      </div>
      <div v-else class="stage-fill stage p-2 h-80">
        <i class="material-icons icons-size invisible">check_circle</i>
      </div>
    </div>

    <div class="flex-fill" :style="stageBorder">
      <div class="mb-2 h-15">
        <p class="text-center">R2</p>
      </div>
      <div
        id
        v-if="round2"
        class="stage-fill stage p-2 d-flex justify-content-center align-items-center h-70"
        :style="roundCompleted"
      >
        <i class="material-icons icons-size">check_circle</i>
      </div>
      <div v-else class="stage-fill stage p-2 h-70">
        <i class="material-icons icons-size invisible">check_circle</i>
      </div>
    </div>

    <div class="flex-fill" :style="stageBorder">
      <div class="mb-2 h-20">
        <p class="text-center">R3</p>
      </div>
      <div
        v-if="round3"
        class="stage-fill stage p-2 d-flex justify-content-center align-items-center h-60"
        :style="roundCompleted"
      >
        <i class="material-icons icons-size">check_circle</i>
      </div>
      <div v-else class="stage-fill stage p-2 h-60">
        <i class="material-icons icons-size invisible">check_circle</i>
      </div>
    </div>

    <div class="flex-fill" :style="stageBorder">
      <div class="mb-2 h-25">
        <p class="text-center">R4</p>
      </div>
      <div
        v-if="round4"
        class="stage-fill stage p-2 d-flex justify-content-center align-items-center h-50"
        :style="roundCompleted"
      >
        <i class="material-icons icons-size">check_circle</i>
      </div>
      <div v-else class="stage-fill stage p-2 h-50">
        <i class="material-icons icons-size invisible">check_circle</i>
      </div>
    </div>

    <div class="flex-fill" :style="stageBorder">
      <div class="mb-2 h-30">
        <p class="text-center">R5</p>
      </div>
      <div
        v-if="round5"
        class="stage-fill stage p-2 d-flex justify-content-center align-items-center h-40"
        :style="roundCompleted"
      >
        <i class="material-icons icons-size">check_circle</i>
      </div>
      <div v-else class="stage-fill stage p-2 h-40">
        <i class="material-icons icons-size invisible">check_circle</i>
      </div>
    </div>

    <div class="flex-fill" :style="stageBorder">
      <div class="mb-2 h-35">
        <p class="text-center">R6</p>
      </div>
      <div
        v-if="round6"
        class="stage-fill stage p-2 d-flex justify-content-center align-items-center h-30"
        :style="roundCompleted"
      >
        <i class="material-icons icons-size">check_circle</i>
      </div>
      <div v-else class="stage-fill stage p-2 h-30">
        <i class="material-icons icons-size invisible">check_circle</i>
      </div>
    </div>

    <div class="flex-fill" :style="stageBorder">
      <div class="mb-2 h-40">
        <p class="text-center">R7</p>
      </div>
      <div
        v-if="round7"
        class="stage-fill stage p-2 d-flex justify-content-center align-items-center h-20"
        :style="roundCompleted"
      >
        <i class="material-icons icons-size">check_circle</i>
      </div>
      <div v-else class="stage-fill stage p-2 h-20">
        <i class="material-icons icons-size invisible">check_circle</i>
      </div>
    </div>

    <div class="flex-fill" :style="stageBorder">
      <div class="mb-2 h-45">
        <p class="text-center">FR</p>
      </div>
      <div
        v-if="round8"
        class="stage-fill stage p-2 d-flex justify-content-center align-items-center h-10"
        :style="roundCompleted"
      >
        <i class="material-icons icons-size-final">golf_course</i>
      </div>
      <div
        v-else
        id="runda8false"
        class="stage-fill stage p-2 d-flex justify-content-center align-items-center h-10"
      >
        <i class="material-icons icons-size-final">golf_course</i>
      </div>
    </div>

    <div HIDDEN class="flex-fill" :style="stageBorder">
      <div class="mb-2 h-47">
        <p class="text-center">FR</p>
      </div>
      <div
        v-if="round9"
        class="stage-fill stage p-2 d-flex justify-content-center align-items-center h-6"
      >
        <i class="material-icons icons-size">golf_course</i>
      </div>
      <div
        v-else
        class="stage-fill stage p-2 d-flex justify-content-center align-items-center h-6"
      >
        <i class="material-icons icons-size">golf_course</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    };
  },
  computed: {
    roundCompleted() {
      return `background-color: rgba(255, 166, 0, ${this.opacity})`;
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
  border-top-right-radius: 90% 6%;
  border-bottom-right-radius: 90% 6%;
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
  font-size: 1.3rem;
}

@media screen and (max-width: 500px) {
  .icons-size,
  .icons-size-final {
    font-size: 1rem;
  }
}

.h-80 {
  height: 80%;
}
.h-70 {
  height: 70%;
}
.h-60 {
  height: 60%;
}
.h-50 {
  height: 50%;
}
.h-47 {
  height: 47%;
}
.h-45 {
  height: 45%;
}
.h-40 {
  height: 40%;
}
.h-35 {
  height: 35%;
}
.h-30 {
  height: 30%;
}
.h-25 {
  height: 25%;
}
.h-20 {
  height: 20%;
}
.h-15 {
  height: 15%;
}
.h-10 {
  height: 10%;
}
.h-6 {
  height: 6%;
}
</style>