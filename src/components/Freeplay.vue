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
              <h4>Tidigare matcher</h4>
              <p>lista tidigare matcher här</p>
          </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import { globalState } from "../main.js";
import { mapGetters } from "vuex";

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
                this.axios.post(globalState.admin_url + 'getPlayerData', {
                    "id": userinfo._id,
                    "competition": "r3HP8Kw62z2qfZhkr",
                    "freeplay": true
                })
                .then(response => {
                    if (response.data.hasOwnProperty('error')) {
                        console.log("error")
                        return;
                    }                  
                    console.log(response.data);                                 
                  
                })
                .catch(error => {
                    console.log(error);
                });
      //END

  },
 
  data() {
    return {
      
    };
  },
  mounted: function () {
   
  },
  methods: {
  
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

</style>
