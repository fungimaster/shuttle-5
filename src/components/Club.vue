<template>
  <div class="ping">
    <vue-headful :title="doctitle" />
    <b-container>
      <b-row>
        <b-col xl="1"></b-col>
        <b-col class="col-12 mt-5 mb-3">
          <h1>Uträkning av potentiella intäkter</h1>
          <p
            class="mt-3"
          >Använd vårt verktyg nedan för att se hur antal lag som använder er klubb som hemmabana påverkar era eventuella intäkter till klubben. Beräknad intäkt är vad vi tror att Matchplays greenfeegäster hos er kommer bidra till.</p>
        </b-col>
      </b-row>

      <b-row>
        <b-col class="col-12 col-md-6">
          <span class="d-block">Antal lag ({{teams}})</span>
          <custom-slider min="1" max="100" v-model="teams" hideLabel="true" />
          <span class="d-block">Genomsnittlig greenfee maj-sep ({{price}})</span>
          <custom-slider min="300" max="1200" v-model="price" step="50" hideLabel="true" />
          <h5 hidden class>LAG: {{teams}}</h5>
          <h5 hidden class>GREENFEE SNITT: {{price}}</h5>
          <h5 class>GÄSTER: {{players}} | MATCHER: {{games}}</h5>
          <h5 hidden class>MATCHER:</h5>
          <h5 class>LAGBILJETT 2022*: {{tickets}}</h5>
          <small>*För var 10:e lag som väljer er klubb som hemmabana erhåller ni 1 lagbiljett till Matchplay 2022 som ni tex. kan använda till era prisbord under tävlingar under 2021.</small>
        </b-col>
        <b-col class="col-12 col-md-6 text-center mt-md-0 mt-3">
          <div class="databox">
            <h4 class>BERÄKNAD INTÄKT</h4>
            <span class="profit">{{calcprofit}}:-</span>
            <hr />
            <h4 class>KICKBACK*</h4>
            <span class="profit">{{calckickback}}:-</span>
            <span
              class="small mt-3 d-block text-left"
            >*För att erhålla kickback (50:-/lag) för anmälda lag till er klubb vill vi att ni publicerar ungefär 1 inlägg per vecka i era sociala medier fram till anmälningsstoppet i slutet av april. Ni får bild och text från oss.</span>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col class="col-12 col-md-12 mt-4 mb-3">
          <h4 hidden>Grunddata</h4>

          <span hidden class>Snittpris greenfee (maj-september):</span>
          <b-form-input
            hidden
            style="width:25%;"
            v-model="price"
            @keypress="isNumber($event)"
            placeholder="Snittpris greenfee 18 hål"
          ></b-form-input>

          <b-alert
            show
            variant="warning"
            class="mt-3 small"
          >Om ni får {{teams}} lag att välja er klubb som hemmaklubb i Matchplay 2021 beräknar vi att ni kommer få {{players}} nya gäster som besöker er anläggning. Vi beräknar att ca {{games}} matcher kommer spelas på er anläggning och att er snittgreenfee i perioden maj-september är {{price}} kr.</b-alert>
        </b-col>

        <b-col hidden class="col-12 col-md-5 mt-5 mb-3">
          <div hidden class="extra">
            <h4>Extra</h4>
            <b-form-checkbox
              class="mt-3"
              id="inspel"
              v-model="inspel"
              name="checkbox-1"
              value="1"
              unchecked-value="0"
            >Inspelsrunda (20%)</b-form-checkbox>
            <b-form-checkbox
              id="lunch"
              v-model="lunch"
              name="checkbox-1"
              value="1"
              unchecked-value="0"
            >Lunch (50%)</b-form-checkbox>
            <b-form-checkbox
              id="range"
              v-model="range"
              name="checkbox-1"
              value="1"
              unchecked-value="0"
            >Rangebollar (80%)</b-form-checkbox>
            <b-form-checkbox
              id="golfbil"
              v-model="golfbil"
              name="checkbox-1"
              value="1"
              unchecked-value="0"
            >Golfbil (15%)</b-form-checkbox>
            <b-form-checkbox
              id="shop"
              v-model="shop"
              name="checkbox-1"
              value="1"
              unchecked-value="0"
            >Golfshop (10%)</b-form-checkbox>
            <b-form-checkbox
              id="kiosk"
              v-model="kiosk"
              name="checkbox-1"
              value="1"
              unchecked-value="0"
            >Kiosk (70%)</b-form-checkbox>
            <p class="mt-3">
              <small>Procenten är en beräkning på ett rimligt snitt av spelare som kommer utnyttja utbudet på er klubb.</small>
            </p>
          </div>
        </b-col>

        <b-col class="col-12 mt-3">
          <hr class="mb-5" />
          <h3>Tips på att få fler lag från er golfklubb</h3>
          <p>Det finns flera sätt som ni kan nyttja för att få fler spelare från er klubb att välja att vara med i tävlingen, nedan listar vi några av de vanligaste:</p>
          <ul>
            <li>Be att få en kostnadsfri rollup från oss!</li>
            <li>Skriv ut vår A4 pdf med information om tävlingen att sätta i receptionen</li>
            <li>Lägg ut en länk till tävlingen på er hemsida</li>
            <li>Dela anmälningsstart i era sociala kanaler</li>
          </ul>
        </b-col>

        <b-col xl="1"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

import CustomSlider from "vue-custom-range-slider";
  // import the styling, css or scss
  import "vue-custom-range-slider/dist/vue-custom-range-slider.css";
  export default {
    name: 'club',
   components: {
     CustomSlider
  },
    data () {
      return {
          text:'',
          players:20,
          teams: 10,
          inspel_count: 0,
          lunch_count: 0,
          games:0,
          tickets: 1,
          price: 500,
          calc:0,
          calckickback:0,
          inspel:0,
          lunch:1,
          golfbil:0,
          shop: 0,
          range: 1,
          kiosk:1,
          circle_size:0,
        doctitle: 'Uträkning intäkter'
      }
    },
      mounted: function () {
        //console.log("ROUTE", this.$route.query.resetpw)

        this.$store.dispatch('updateUserInfo');
  },
    computed: {
        calcprofit() {
            var inspel_value = 0;
            var lunch_value = 0;
            var range_value = 0;
            var golfbil_value = 0;
            var shop_value = 0;
            var kiosk_value = 0;
                        
            var games = 0;
            this.players = this.teams * 2;
            this.games = parseInt((this.teams / 2) * 2.5);
            this.calckickback = this.teams * 50; //50 = peng per lag

            this.tickets = parseInt(this.teams/10);

            var basevalue = this.players * (this.price);
            var round2 = basevalue * 1;
            var round3 = round2 + (basevalue * 0.5);
            var round4 = round3 + (basevalue * 0.25);
            var sum = basevalue;
            
            if (this.inspel == 1) {
                sum = sum * 1.2; //20% spelar inspel
                this.inspel_count = sum;
            }

            if (this.lunch == 1) {
                inspel_value = ((this.games*2) * 100) * 0.5; //50% äter lunch
            }

            if (this.range == 1) {
                range_value = ( (this.games*2) * 25) * 0.8; //80% köper bollar på rangen
            }

            if (this.golfbil == 1) {
                golfbil_value = ( (this.games*2) * 500) * 0.15; //15% hyr bil
            }

            if (this.shop == 1) {
                shop_value = ( (this.games*2) * 300) * 0.10; //10% handlar i shopen
            }

            if (this.kiosk == 1) {
                kiosk_value = ( (this.games*2) * 50) * 0.70; //70% handlar i kiosken
            }


            return sum + inspel_value + lunch_value + range_value + golfbil_value + shop_value + kiosk_value;
        }
    },
    methods: {     
    } 
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../styles/variables.scss";

// override variables like this:
$label-color: #000;
$slider-track-background: $orange;
$slider-track-height: 8px;

// import the styling,
@import "vue-custom-range-slider/dist/vue-custom-range-slider.scss";

.slider__track {
  background: $orange !important;
}

.slider__input::-webkit-slider-thumb {
  background: #000;
}

.slider {
  margin-top: 10px !important;
}

.circle {
  position: relative;
  display: block;
  color: #222;
  text-align: center;
  height: 10em;
  width: 10em;
  border-radius: 50%;
  display: inline-block;
}

.circle:after {
  display: block;
  padding-bottom: 100%;
  width: 100%;
  height: 0;
  border-radius: 50%;
  background: radial-gradient(#fff, #fd9b37);
  border: 2px solid #666;
  content: "";
}

.circle__inner {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.circle__wrapper {
  display: table;
  width: 100%;
  height: 100%;
}

.circle__content {
  display: table-cell;
  padding: 1em;
  vertical-align: middle;
  padding-top: 1.3em;
}

.profit {
  font-size: 1.9em !important;
}

.databox {
  border-radius: 0.25em;
  padding: 1em;
  background: rgb(246, 246, 246);
  background: linear-gradient(
    342deg,
    rgba(246, 246, 246, 1) 21%,
    rgba(125, 125, 125, 0.8211659663865546) 100%
  );
}

@media only screen and (max-width: 768px) {
  .circle {
    height: 6em;
    width: 6em;
  }

  .circle__content {
    font-size: 2em;
  }

  .profit {
    font-size: 1.4em !important;
  }
}

.slider {
  width: 100%;
}

img {
  max-width: 100%;
}
</style>
