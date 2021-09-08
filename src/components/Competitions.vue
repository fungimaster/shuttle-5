<template>
  <div>
    <div v-if="!$route.params.competition">
      <div class="hero">
        <b-container>
          <b-row>
            <b-col md="10">
              <h2>Tidigare tävlingar</h2>
            </b-col>
            <b-col md="2" class></b-col>
          </b-row>
        </b-container>
      </div>
      <div
        class="
          wallpaperContainer4
          d-flex
          justify-content-center
          align-items-center
        "
      >
        <b-button
          disabled
          variant="light"
          size="lg"
          @click="$router.push('tavlingar/2022')"
        >
          <span class="text-reset">2022</span>
        </b-button>
      </div>
      <div
        class="
          wallpaperContainer1
          d-flex
          justify-content-center
          align-items-center
        "
      >
        <b-button variant="light" size="lg" to="/tavlingar/2021">
          <span class="text-reset">2021</span>
        </b-button>
      </div>
      <div
        class="
          wallpaperContainer2
          d-flex
          justify-content-center
          align-items-center
        "
      >
        <b-button variant="light" size="lg" to="/tavlingar/2020">
          <span class="text-reset">2020</span>
        </b-button>
      </div>
    </div>

    <router-view v-else :key="$route.params.competition"></router-view>
  </div>
</template>



<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/bootstrap-overwrite.css";

.hero {
  background-image: url("https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_auto,q_auto,e_colorize:50,co_rgb:000000/v1572942209/matchplay/c640cf_402261724c71433c9662662c3114e5b8_mv2_d_4500_3000_s_4_2.jpg");

  background-repeat: no-repeat;
  /*background-position: bottom 30% right 0;*/
  background-size: cover;
  color: #fff;
  padding: 180px 0 180px 0;
  background-position: right 0px top 0px;
  @media (min-width: 320px) {
    padding: 12rem 0 5rem 0;
  }
  @media (min-width: 480px) {
    padding: 8rem 0 8rem 0;
  }
}

.wallpaperContainer1 {
  min-height: 250px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: 50%;
  background-position-y: 50%;
  background-image: url("https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1608122032/matchplay/MPI-1825.jpg");
}

.wallpaperContainer2 {
  min-height: 250px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: 50%;
  background-position-y: 50%;

  background-image: url("https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1573661166/matchplay/Stripe05.jpg");
}
.wallpaperContainer4 {
  min-height: 250px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: 50%;
  background-position-y: 50%;

  background-image: url("https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_auto,q_auto,e_colorize:50,co_rgb:000000/v1573317237/matchplay/Stripe03.jpg");
}
</style>