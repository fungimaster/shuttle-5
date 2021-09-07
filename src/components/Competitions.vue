<template>
  <div>
    <div v-if="!$route.params.competition">
      <div class="hero">
        <b-container>
          <b-row>
            <b-col md="10">
              <h2>Tidigare tävlingar</h2>
              <p>Länkar till de senaste tävlingar hittar du nedan</p>
            </b-col>
            <b-col md="2" class></b-col>
          </b-row>
        </b-container>
      </div>
      <div class="m-4 p-4">
        <b-row>
          <b-col md="10">
            <a @click="$router.push('tavlingar/2021')">
              <h3>Matchplay 2021</h3>
            </a>
          </b-col>
          <b-col md="2" class></b-col>
        </b-row>
      </div>
      <hr />
    </div>

    <router-view v-else></router-view>
  </div>
</template>



<style scoped>
.hero {
  background: url("https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_auto/v1572963227/matchplay/matchplay_bg.jpg");

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
</style>