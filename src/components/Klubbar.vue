<template>
  <div>
    <vue-headful :title="doctitle" />
    <b-container class="mt-5">
        <b-row>
            <b-col class="col-12">
                <h1>Repr. golfklubbar 2021</h1>
                <h5>Följande 
                    <span v-if="loadingclubs">
                        <b-spinner type="grow" small class="ml-0 pl-0 mr-1 mb-1"></b-spinner>                        
                        </span>
                        <span v-else>
                            <strong>{{clubno}}</strong>
                        </span> 
                         golfklubbar finns representerade med deltagande lag i årets tävling!</h5>
            </b-col>
        </b-row>
        <b-row v-if="loadingclubs">
            <b-col class="col-12 text-center mt-5 mb-5">
                <b-spinner type="grow" class="spinner-big ml-0 pl-0 mr-1 mb-1"></b-spinner>
            </b-col>
        
        </b-row>
       <b-row v-if="!loadingclubs" align-h="center" class="justify-content-center align-self-center mt-4">
                <b-col v-for="(club,idx) in clubs" :key="idx"
                    class="col-4 col-md-3 pl-0 pr-0 align-self-center text-center"
                >
               <b-img v-if="club.logourl" class="p-3 p-md-5" :src="getClubImage(club.logourl)"></b-img>
               <span v-if="!club.logourl">{{club.club}}</span>
                </b-col>
                
                </b-row>
    </b-container>
  </div>
</template>

<script>

import { globalState } from "../main.js";

  export default {
    name: 'Klubbar',
    data () {
      return {       
        doctitle: 'Klubbar med deltagande lag',
        clubs: [],
        clubno: 0,
        topclub: 0,
        clubcount: 450,        
        loadingclubs: true  
      }
    },
     created() {
    this.getTopListClubs(this.clubcount,false);
  },
      mounted: function () {
        //console.log("ROUTE", this.$route.query.resetpw)

  },
    methods: {
       getClubImage(logourl) {
            return 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,q_80,c_scale/' + logourl;
        },    
       getTopListClubs() {        
      this.loadingclubs = true;       
      this.axios
        .post("https://matchplay.meteorapp.com/methods/" + "getTopClubs", {
          //getclubstoplist
          competition: globalState.compid,
          no: 500,
        })
        .then((response) => {
          this.clubs = response.data;
          this.clubno = response.data.length;
          this.clubs = this.clubs.sort(this.compareValues("club", "asc"));          
          this.loadingclubs = false;         
        })
        .catch((error) => {
          console.log(error);
          this.loadingclubs = false;
        });
    },
        compareValues(key, order = "asc") {
      return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
          return 0;
        }

        const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
        const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return order === "desc" ? comparison * -1 : comparison;
      };
    }
    }      
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
    max-width:80%;
}

.spinner-big {
    width:4em;
    height:4em;
}
</style>
