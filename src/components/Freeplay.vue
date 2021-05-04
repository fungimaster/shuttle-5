<template>
  <div>

    <b-container>
      <b-row class="justify-content-center" align-h="center">
        <b-col md="12" class="mt-4 mt-md-5">         
                <h1>Freeplay</h1>                
                <p>Prova att spela en match precis så som Matchplays matcher fungerar. All data kring hcp, bana, slope hämtas från Golfens IT-system.</p>
                <ol>
                    <li>Välj spelare (golfid)</li>
                    <li>Välj bana</li>
                    <li>Välj tee</li>
                </ol>
                <b-button v-if="isAuthenticated" variant="primary" class="text-white" to="/creategame_free">1. Välj spelare / Starta match</b-button>                
                 <b-alert v-if="!isAuthenticated" show class="mt-4 small" variant="danger">
              <p>
                För att kunna använda vårt scorekort för matchspel behöver man ett konto på matchplay. Är du deltagare i årets tävling är det bara att logga in, annars skapa ett gratis konto (du behöver inte skapa ett lag i årets tävling).
                <br><br><router-link to="mymatchplay">Logga in</router-link> | <router-link to="register">Skapa konto</router-link>
              </p>
            </b-alert>
        </b-col>        
      </b-row>
      <b-row v-if="isAuthenticated" class="justify-content-center mt-4" align-h="center">
          <b-col md="12">
            <hr class="mt-2 mb-4" />
              <h2>Tidigare matcher</h2>
              
              <!-- freeplay game -->
              <b-card v-for="(game,idx1) in games" :key="idx1" class="mb-2 team">
                <template v-slot:header>
                  <b-card-title class="mt-2">
                    <strong>{{game.clubname}}</strong>
                    - {{game.loopname}}
                  </b-card-title>       
                </template>      

                <b-row>
                  <b-col class="col-5 p-0 m-0 text-right">
                    <span class="d-block team1">{{game.hometeamleader.name}}<br>{{game.hometeammember.name}}</span>
                  </b-col>
                  <b-col class="col-2 text-center small p-0 m-0">
                    <strong>vs</strong>
                  </b-col>
                  <b-col class="col-5 p-0 m-0">
                    <span class="d-block team2">{{game.awayteamleader.name}}<br>{{game.awayteammember.name}}</span>
                  </b-col>
                </b-row>

                <b-row class="mt-4">
                 <b-col class="col-5 p-0 m-0 text-right">                  
                    <span v-if="game.winner==='home'" class="winnerhome">Vinnare: Hemmalag</span>                   
                  </b-col>
                  <b-col class="col-2 text-center small p-0 m-0">                 
                  </b-col>
                 <b-col class="col-5 p-0 m-0">   
                    <span v-if="game.winner==='away'" class="winneraway">Vinnare: Bortalag</span>
                  </b-col>
                </b-row>

                  

               
                <template v-slot:footer>
                                <span class="small d-block">Startades för {{getgamedate(game.createdAt)}} sedan</span>                       
                            </template>                         
              </b-card>
              <!-- end -->

          </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import { globalState } from "../main.js";
import { mapGetters } from "vuex";

import moment from "moment";
import VueMoment from "vue-moment";

moment.locale("sv");

moment.updateLocale("sv", {
  relativeTime: {
    future: "om %s",
    past: "%s",
    ss: "%d sek",
    m: "1 minut",
    mm: "%d min",
    h: "en timme",
    hh: "%d timmar",
    d: "en dag",
    dd: "%d dagar",
    M: "en månad",
    MM: "%d mån",
    y: "ett år",
    yy: "%d år",
  },
});

export default {
  directives: {	
		},
  created() {
  
  },
  updated() {
     

  },
  mounted() {
 
      let userinfo = localStorage.getItem('userinfo');
      if (userinfo)
      userinfo = JSON.parse(userinfo);
     
      //TEST get games
                this.axios.post(globalState.admin_url + 'freeplay', {
                    "golfid": userinfo.golfid                  
                })
                .then(response => {
                    if (response.data.hasOwnProperty('error')) {
                        console.log("error")
                        return;
                    }                  
                    console.log(response.data);
                    this.games = response.data.games;                          
                  
                })
                .catch(error => {
                    console.log(error);
                });
      //END

  },
 
  data() {
    return {
      games: []
    };
  }, 
  methods: {
   getgamedate: function (date) {
      let gamedate2 = new Date(date);
      return moment(gamedate2, "YYYY-MM-DD hh:mm").fromNow();      
    }
  },
  computed: {
  ...mapGetters([      
      "isAuthenticated"
      ])
  },
  components: {
   
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.team {
  font-size:0.8em;
}

.team1 {
		border-left: 5px solid #fd9b37;
	}

.team2 {
	border-right: 5px solid #69b3fe;
}

.winnerhome {
  background: #fd9b37;
  padding:0.5em;
}

.winneraway {
  background: #69b3fe;
  padding:0.5em;
}

</style>
