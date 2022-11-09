<template>
  <div class="prisbord">
    <vue-headful :title="doctitle" />
    <b-container>
      <b-row class="mt-5">
        <b-col class="col-12 text-center">
          <h1 class="mb-4">Prisbordet</h1>

            <b-button
                variant="primary"
                @click="scrollToAnchorPoint('main')"
                size="md"
                class="btn-igg"
                >Huvudtävlingen</b-button
              >

               <b-button
                variant="primary"
                @click="scrollToAnchorPoint('second')"
                size="md"
                class="btn-igg"
                >Andra chansen</b-button
              >

            <p class="mt-5">
                Att vinna alla sina matcher tills ni är endast 7 lag kvar, det är såklart en utmaning och den ska belönas rejält! Men Matchplay
vill även belöna de som faller precis innan och därför har vi tagit fram ett fint prisbord till lag fram mot Sverigefinalen.
            </p>

        </b-col>

      </b-row>

      <b-row class="mt-3" ref="main">
        <b-col class="col-12 text-center">
             <hr />
          <h2 class="mb-3 mt-4">Huvudtävlingen</h2>
          <!-- 14-8 -->
          <div class="mb-3">
            <b-badge variant="danger" class="p-2 mb-3"> 14-8 plats </b-badge>
            <p class="mb-1">
              <strong v-b-tooltip.hover title="Lagbiljett till nästa års tävling helt gratis!">Freeplay</strong> för kommande Matchplay Indoor +
              <strong>presentkort</strong> Out Of Bounds på 500kr.
            </p>
            <span class="high">värde ca 1000kr/lag</span>
          </div>

          <hr />
          <!-- 7-2 -->
          <div class="mt-4">
            <b-badge variant="danger" class="p-2 mb-3"> 7-2 plats </b-badge>
            <p class="mb-1">
              Spelar Sverigefinal 15-16 april på Nacka Indoor med
              <strong>allt spel betalt + hotell och middag.</strong> Valfri
              tävling <strong>Golfhäftet Trophy</strong> eller
              <strong>Under Par Challenge</strong> 2023 med sitt lag + strumpor
              från LannerSocks.
            </p>
            <span class="high">värde ca 2500-5000kr/lag</span>
          </div>

          <hr />
          <!-- 1 -->
          <div class="mt-4">
            <b-badge variant="danger" class="p-2 mb-3"> 1 plats </b-badge>
            <p class="mb-1">
              Laget åker med Matchplay Sweden <strong>utomlands 2023 där flyg, hotell och golf ingår.</strong>
            </p>
            <span class="high">värde ca 14000kr/lag</span>
          </div>
        </b-col>
      </b-row>

      <b-row class="mt-5 mb-5" ref="second">
        <b-col class="col-12 text-center">
            <hr class="supersep" />
       </b-col>
      </b-row>

        <!-- ANDRA CHANSEN -->
        <b-row class="mt-3">
        <b-col class="col-12 text-center">
          <h2 class="mb-3">Andra chansen</h2>
          <!-- 32-17 -->
          <div class="mb-3">
            <b-badge variant="danger" class="p-2 mb-3"> 32-17 plats </b-badge>
            <p class="mb-1">
              <strong>Mössor</strong> + <strong>Handdukar</strong> från GAG.
            </p>
            <span class="high">värde ca 320kr/lag</span>
          </div>

          <hr />
          <!-- 16-2 -->
          <div class="mt-4">
            <b-badge variant="danger" class="p-2 mb-3"> 16-2 plats </b-badge>
            <p class="mb-1">
             <strong>Kvalfinal</strong> på Nacka Indoor med <strong>allt spel betalt</strong>
              <strong>Mössor</strong> + <strong>Handdukar</strong> från GAG samt <strong>Golfhäftet PLUS</strong> under 2023.
            </p>
            <span class="high">värde ca 1800kr/lag</span>
          </div>

          <hr />
          <!-- 1 -->
          <div class="mt-4">
            <b-badge variant="danger" class="p-2 mb-3"> 1 plats </b-badge>
            <p class="mb-1">
             Vinnare tar plats i <strong>Sverigefinalens kvart</strong> samt vinner <strong>Golfhäftet PLUS</strong> under 2023.
            </p>
            <span class="high">värde ca 1800kr/lag</span>
            <div class="mt-3">
            <span class="high2 p-2">med chans på mycket mer!</span>
            </div>
          </div>
        </b-col>
      </b-row>


    </b-container>
  </div>
</template>

<script>
import { globalState } from "../main.js";

export default {
  name: "prizes",
  components: {},
  data() {
    return {
      doctitle: "Prisbordet Matchplay Indoor",
    };
  },
  mounted: function () {},
  computed: {},
  methods: {
      scrollToAnchorPoint(refName) {
      const el = this.$refs[refName];
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../styles/variables.scss";

.prisbord {
  span.high {
    color: $orange;
  }

  .supersep {
    border-top:1em solid $orange;
  }

  span.high2 {
    color:#FFF;
    background: $orange;
  }

  .badge {
    font-size: 1.4em;
  }

  h1,
  h2,
  h3,
  h4 {
    color: #000 !important;
  }

  h1 {
    font-size: 3em !important;
  }

  h2 {
    font-size: 2em !important;
  }

  img {
    max-width: 100%;
  }
}
</style>
