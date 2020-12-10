<template>
  <div class="d-flex">
    <div class="flex-fill stage-border">
      <div class="mb-2" :style="'height: 10%;'">
        <p class="text-center">Runda 1</p>
      </div>
      <div class="stage-fill stage p-4" :style="'height: 80%;'"></div>
      <div :style="'height: 10%;'"></div>
    </div>

    <div class="flex-fill stage-border">
      <div class="mb-2" :style="'height: 15%;'">
        <p class="text-center">Runda 2</p>
      </div>
      <div class="stage-fill stage p-4" :style="'height: 70%;'"></div>
      <div :style="'height: 15%;'"></div>
    </div>

    <div class="flex-fill stage-border">
      <div class="mb-2" :style="'height: 20%;'">
        <p class="text-center">Runda 3</p>
      </div>
      <div class="stage-fill stage" :style="'height: 60%;'"></div>
      <div :style="'height: 20%;'"></div>
    </div>

    <div class="flex-fill stage-border">
      <div class="mb-2" :style="'height: 25%;'">
        <p class="text-center">Runda 4</p>
      </div>
      <div class="stage-fill stage" :style="'height: 50%;'"></div>
      <div class="" :style="'height: 25%;'"></div>
    </div>

    <div class="flex-fill stage-border">
      <div class="mb-2" :style="'height: 30%;'">
        <p class="text-center">Runda 5</p>
      </div>
      <div class="stage-fill stage" :style="'height: 40%;'"></div>
      <div :style="'height: 30%;'"></div>
    </div>

    <div class="flex-fill stage-border">
      <div class="mb-2" :style="'height: 35%;'">
        <p class="text-center">Runda 6</p>
      </div>
      <div class="stage-fill stage" :style="'height: 30%;'"></div>
      <div class="" :style="'height: 35%;'"></div>
    </div>

    <div class="flex-fill stage-border">
      <div class="mb-2" :style="'height: 40%;'">
        <p class="text-center">Runda 7</p>
      </div>
      <div class="stage-fill stage" :style="'height: 20%;'"></div>
      <div class="" :style="'height: 40%;'"></div>
    </div>

    <div class="flex-fill">
      <div class="mb-2" :style="'height: 45%;'">
        <p class="text-center">FINAL</p>
      </div>
      <div class="stage-fill stage" :style="'height: 10%;'"></div>
      <div class="" :style="'height: 45%;'"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["textColor"],
};
</script>


<style scoped>
.stage {
  border-top-right-radius: 90% 6%;
  border-bottom-right-radius: 90% 6%;
}

.stage-border {
  border-right: 1px dashed #dee2e6 !important;
}

.background {
  background-color: #ffffff45;
}
.stage-fill {
  background-color: rgba(255, 166, 0, 0.7);
}
p {
  font-size: 2vw;
}
</style>