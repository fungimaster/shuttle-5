<template>
  <div class="wallpaperContainer1 p-4 m-0">
    <b-container>
      <div class="d-flex justify-content-center align-items-center flex-wrap ">
        <h1 class="text-color-light text-center call-to-action p-3 p-md-5 ">
          SVERIGES ROLIGASTE GOLFTÄVLING FÖR PAR
        </h1>
        <div class="d-flex justify-content-center">
          <p class="text-center text-light pt-3 pb-4 w-75">
            Matchplay är Sveriges roligaste Matchplay tävling med lag från hela
            Sverige, <strong>digitalt scorekort</strong>, matchbilder och
            förstås fina priser.
          </p>
        </div>

        <h4 v-if="closed" class="text-warning text-center pt-4">
          Anmälan är stängd och öppnar i januari 2023.
        </h4>
        <h6 v-if="closed" class="text-warning text-center p-4">
          Följ oss på
          <a href="https://www.facebook.com/matchplaysweden/" target="_blank"
            >Facebook</a
          >
          för ta del av de nyheter och tävlingar.
        </h6>
        <div class="d-flex justify-content-center pt-4" v-if="!closed">
          <b-button
            variant="outline-warning"
            size="lg"
            pill
            :disabled="closed"
            @click="$router.push('/register')"
          >
            <strong class="button-action">Till anmälan!</strong>
          </b-button>
        </div>
      </div>
      <b-row hidden align-v="center" class="text-center stats pt-4">
        <b-col md="4" cols="12" class="pt-3">
          <h5>1904</h5>
          <small class="text-light">Golfälskande deltagare</small>
        </b-col>
        <b-col md="4" cols="12" class="pt-3">
          <h5>2486</h5>
          <small class="text-light">Birdies</small>
        </b-col>
        <b-col md="4" cols="12" class="pt-3">
          <h5>12.1</h5>
          <small class="text-light">I Snitthcp</small>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<script>
import { globalState } from "../main.js";

export default {
  data() {
    return {
      closed: globalState.closed,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/bootstrap-overwrite.css";
@import url("https://fonts.googleapis.com/css2?family=Fjalla+One&family=Staatliches&display=swap");

.wallpaperContainer1 {
  min-height: 800px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: 50%;
  background-position-y: 50%;
  background-image: url("https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_auto,q_auto,e_colorize:60,co_rgb:000000/v1572963227/matchplay/c640cf_76573b7e69c04dc2bb0592399d738a17_mv2_d_4006_3000_s_4_2.jpg");
}

.text-color-light {
  color: $light;
}

.call-to-action {
  font-family: "Staatliches", cursive;
  letter-spacing: 11px;
  font-size: 3.5rem;
}

.stats h5 {
  font-family: "Staatliches", cursive;
  color: $orange;
  letter-spacing: 5px;
  font-size: 3rem;
  margin-bottom: 0px;
}
.button-action {
  font-family: "Staatliches", cursive;
  letter-spacing: 5px;
  font-size: 2rem;
  margin-bottom: 0px;
}
</style>
