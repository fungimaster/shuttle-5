<template>
  <b-row>
    <b-col class="col-12 col-md-4 text-center">
      <b-card
        title="Endast 495:-/lag"
        img-src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max/v1665562702/matchplay/igg/Kopia_av__DSC2604.jpg"
        img-alt="Image"
        img-top
        tag="article"
        class="mb-2"
      >
        <b-card-text> Ett lag i tävlingen kostar endast <strong>495:-</strong> och ni får <strong>20% rabatt</strong> på simulatorhyran för era matcher. </b-card-text>
      </b-card>
    </b-col>
    <!-- COL 2 -->
    <b-col class="col-12 col-md-4 text-center">
      <b-card
        title="Golfresa utomlands"
        img-src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max/v1572942209/matchplay/c640cf_402261724c71433c9662662c3114e5b8_mv2_d_4500_3000_s_4_2.jpg"
        img-alt="Image"
        img-top
        tag="article"
        class="mb-2"
      >
        <b-card-text>
          Vinnarna av finalen följer med Matchplay Sweden på en <strong>fantastisk golfresa</strong> utomlands hösten 2023.
        </b-card-text>
      </b-card>
    </b-col>

    <!-- COL 3 -->
    <b-col class="col-12 col-md-4 text-center">
      <b-card
        title="Fina erbjudanden"
        img-src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max/v1665562702/matchplay/igg/_DSC7053.jpg"
        img-alt="Image"
        img-top
        tag="article"
        class="mb-2"
      >
        <b-card-text>
          Förutom <strong>20% rabatt</strong> på er simulatorhyra kommer ni få fina <strong>erbjudanden</strong> från alla våra samarbetspartners.
           <b-button             
                v-if="!closed"    
                variant="primary"
                class="mt-2"
                to="/prisbord"
                size="md"
                style="color:#FFF !important"
                >Utforska prisbordet!</b-button
              >
        </b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { globalState } from "../main.js";
export default {  
  data() {
    return {    
      closed: globalState.closed,
    };
  },
  mounted: function () {
  
  },

  methods: {

  },

  computed: {},
};
</script>


<style lang="scss" scoped>
.card {

border:none;

h4 {
  font-size:1.5em !important;
}

img {
  max-height:150px;
  max-width: 150px;
  margin:0 auto;

}
}


</style>