<template>
  <div class="info">
    <vue-headful
      :title="doctitle"

      />
      
    <b-container>
      <b-row class="justify-content-center" align-h="center">
        <b-col sm="6" class="text-center mt-4">
           <b-button @click="goBack()" variant="" class="no-print btn-sm go-back"><i class="material-icons">arrow_back_ios</i></b-button>
          <img
          src="https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,h_100/v1573118127/matchplay/matchplay-new-logo-2020.png"
          alt
        />
        </b-col>
      </b-row>
          <b-row align-h="center">
       <b-col sm="6">     
            <h1 class="mt-5 mb-4 strong">Kvitto Matchplay</h1>
            <h3 class="mb-4">Anmälningsavgift {{ comp }}</h3> 
            <p small>Avgiften avser golftävling i Sverige.</p> <br>          
            <p>Lagkapten: {{ user }}</p>
            <p>Summa: {{ amount }} kr</p>
            <p>Varav moms (6%): {{ vat }} kr</p>
            <p class="mt-5">Matchplay Business AB</p>
            <p>Godkänd för f-skatt</p>
            <p>Momsreg: SE559196723601</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import {tagsMixin} from '../mixins/tagsMixin';

  export default {
    name: 'receipt',
    data () {
      return {
      doctitle: 'Kvitto - ' + this.$store.state.conferencename
      }
    },
    props: ['user','amount','vat','comp'],
   created() {
    
},
   methods: {
      goBack(team) {
           this.$router.push({
                path: "/mymatchplay"
            });
      }
   },
    mixins: [tagsMixin]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../styles/variables.scss";

h1 {
  font-size:1.7em;
}

strong {
  font-family: "Titillium Web Bold";
}

p {
  margin-bottom:0.5em;
}

@media print
{    
    .no-print, .no-print *
    {
        display: none !important;
    }
}

.material-icons {
  padding-left:7px;
  font-size:1.2em;
}

.go-back {
    position: absolute;   
    z-index: 5;
    left: 5%;
    top: 0px;
    border-radius: 50%;
    padding: 5px;
    height: 40px;
    width: 40px;
    background-color: #ccc;
    border-color: #bbb;     
    cursor:pointer;
}


</style>
