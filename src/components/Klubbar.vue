<template>
  <div>
    <vue-headful :title="doctitle" />
    <b-container class="mt-5"    
    >
        <b-row v-if="!loadingclubs && !maxsize">
            <b-col class="col-12">
                <h1 v-if="!maxsize">inomhusanläggningar 2023</h1>
                <h5 v-if="!maxsize" class="mt-4">Följande 
                    <span v-if="loadingclubs">
                        <b-spinner type="grow" small class="ml-0 pl-0 mr-1 mb-1"></b-spinner>                        
                        </span>
                        <span v-else>
                            <strong>{{clubno}}</strong>
                        </span> 
                         inomhusanläggningar finns <strong v-if="!closed">HITTILLS</strong> representerade med deltagande lag i årets tävling</h5>
                   
             </b-col>              
                    </b-row>
                    
                    <b-row v-if="clubno>20 && !maxsize">
                      <b-col>
                        <hr />
                      </b-col>
                       <b-col class="col-12 mt-2">
                    <b-progress height="1.8rem" :value="clubno" :max="31" show-value animated variant="success"></b-progress>
                    <p v-if="!closed" class="mt-1" style="font-size:0.8em;">Just nu har vi deltagande lag från ca {{clubnopercent}}% av de 31 medverkande anläggningarna.</p>
                    <p v-else class="mt-1" style="font-size:0.8em;">I årets tävling har vi deltagande lag från ca {{clubnopercent}}% av de 31 medverkande anläggningarna.</p>
                    </b-col>
                    </b-row>

                   
                      <b-row v-if="!loadingclubs && latestTeam && !maxsize">
                          <b-col>
                            <hr class="mt-2" />
                          </b-col>
                      </b-row>                     
                        <b-row v-if="!loadingclubs && latestTeam && !closed && !maxsize" class="align-items-center h-100">
                            <b-col class="col-3 col-md-2 mx-auto text-center pl-0 pr-0">                              
                                  <b-img class="" :src="getClubImage2(latestTeamLogo)"></b-img> 
                            </b-col>
                             <b-col class="col-7 col-md-10 mx-auto small pl-0 pr-0 text-left">
                                {{latestTeam}}
                             </b-col>
                        </b-row>
                         <b-row v-if="!loadingclubs && latestTeam && !closed && !maxsize">
                          <b-col>
                            <hr />
                          </b-col>
                      </b-row>
                    

                  

                  <b-row v-if="!maxsize">
            <b-col class="col-12 mt-1">
              <b-form
                @submit.stop.prevent
                @submit="searchClub"                
              >
              <b-form-input hidden  @click="searchClub()" v-model="search" placeholder="Sök efter klubb"></b-form-input>            
               <div class="mt-1">
               <span class="abc">
               <b-button v-for="(name,idy) in abc" :key="idy" @click="searchClub(search=name)" class="mb-1 mr-1 btn blue-bg btn-sm" variant="info">
               {{name}}
              </b-button>
               
               <b-button v-if="search!==''" @click="searchClub(search='')" class="d-block ml-0 mb-1 btn btn-sm" variant="warning">
               Återställ
              </b-button>
              
               </span>            
               </div>
              </b-form>
                            
            </b-col>            
        </b-row>        
       
        <b-row v-if="loadingclubs">
            <b-col class="col-12 text-center mt-5 mb-5">
                <b-spinner type="grow" class="spinner-big ml-0 pl-0 mr-1 mb-1"></b-spinner>
            </b-col>
        
        </b-row>
       <b-row id="clubs" v-if="!loadingclubs" align-h="center" class="justify-content-center align-self-center mt-4">
                <b-col v-for="(club,idx) in clubs" :key="idx"
                    class="club col-4 pl-0 pr-0 align-self-center text-center"
                    :class="[!maxsize ? 'col-md-3' : 'col-md-1']"
                >
               <b-img :id="'tooltip-course-' + idx" v-if="club.logourl" class="p-3"
               :class="[!maxsize ? 'p-md-5' : 'p-md-1']"
                :src="getClubImage(club.logourl)"></b-img>               
                <b-tooltip :target="'tooltip-course-' + idx" triggers="hover" placement="top">
                                            {{club.club}} - {{club.count}} lag
                                        </b-tooltip>
               <span>{{club.club}}</span> 
                             
                </b-col>
                
                </b-row>
    </b-container>
  </div>
</template>

<script>


import { globalState } from "../main.js";
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
    name: 'Klubbar',
    data () {
      return {
        maxsize: false,
        closed: globalState.closed,
        compid: globalState.compid,
        doctitle: 'Klubbar med deltagande lag',
        search: '',
        clubs: [],
        clubsAll: [],
        clubno: 0,
        clubnopercent: 0,
        topclub: 0,
        clubcount: 31,        
        loadingclubs: true,
        latestTeam: null,
        latestTeamLogo: null,
        abc: []
      }
    },
     created() {
    this.getLatestTeam();
    this.getTopListClubs(this.clubcount,false);
  },
      mounted: function () {
        //console.log("ROUTE", this.$route.query.resetpw)

  },
  computed: {
    fetchedclubs() {
          return this.$store.getters.clubs
    }
  },
    methods: {
      searchClub() {
        
        if (this.search !== '') {
          this.clubs = this.clubsAll;   
 
            var strToMatch = this.search;

            var filtered = this.clubs.filter(function(p) {
              var clubArray = p.club.split('');
              var clubToMatch = [];
              for(var i = 0; i < strToMatch.length; i++) {
                clubToMatch.push(clubArray[i]);
              }
              return strToMatch.toLowerCase() == clubToMatch.join('').toLowerCase()
            })

            this.clubs = filtered;
            var elmnt = document.getElementById("clubs");
            //elmnt.scrollIntoView();
            const yOffset = -180;
            const y = elmnt.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({ top: y, behavior: "smooth" });

          } else {
            this.clubs = this.clubsAll
          }
      },
      getLatestTeam() {
        if (this.closed) {
          return
        }

   this.axios
       .post(globalState.admin_url + "getLatestPaidTeam", {
          competition: globalState.compid
        })
      .then((response) => {
      
        
          
        if (response.data) {
          
          let paidAt = moment(response.data.paidAt).add(0, 'hour').format()                   
          let regDate = moment(paidAt, "YYYY-MM-DD hh:mm").fromNow();
          let testDate = moment().diff(paidAt, 'hours');

            
            if (!response.data.logourl) {
              this.latestTeamLogo = 'v1573118127/matchplay/matchplay-new-logo-2020.png'; //failover matchplay logo
            } else {
              this.latestTeamLogo = response.data.logourl;
            }
         
          if (testDate < 23) {
            this.latestTeam = 'Ett lag från ' + response.data.coursename + ' anmäldes för ' + regDate + ' sedan av ' + response.data.teamleadername + '.';
          }
          
                      
        }
        
       
        
      })
      .catch((error) => {
        console.log(error);
      }); 
  
      },
       getClubImage(logourl) {
            return 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,q_80,c_scale/' + logourl;
        },  
           getClubImage2(logourl) {
            return 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_100,q_80,c_scale/' + logourl;
        }, 
       getTopListClubs() {        
      this.loadingclubs = true;    

      const handleResponse = (response) => {
        this.$store.dispatch('setClubs', response)
        this.clubno = response.data.length;
        this.clubs = response.data;
        this.clubs = this.clubs.sort(this.compareValues("club", "asc"));
        this.clubsAll = this.clubs;
        //GET ABC
        for(var i = 0; i < this.clubs.length; i++) {
          this.abc.push(this.clubs[i].club.charAt(0));
        }
        const distinctAbc = [...new Set(this.abc)];
        this.abc = distinctAbc;           
        this.clubnopercent = Math.round((this.clubno/31)*100);

        //fix sorting
        distinctAbc.sort( (a, b) => a.localeCompare(b, 'sv', {ignorePunctuation: true}));    

        this.loadingclubs = false;         
      }

      if (this.fetchedclubs) {
          handleResponse(this.$store.state.clubs)
          return
      }
  
      
      this.axios
        .post("https://matchplay.meteorapp.com/methods/" + "getTopClubs", {
          //getclubstoplist
          competition: globalState.compid,
          no: 500,
        })
        .then((response) => {
          handleResponse(response)
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

.jumbotron-1 {
  border:5px solid #e9ecef;
  background: #FFF;
 }

img {
    max-width:85%;
}

.spinner-big {
    width:4em;
    height:4em;
}

.abc .btn {
  min-width: 45px;
}

.special {
  margin-left: -5px !important;
}
</style>
