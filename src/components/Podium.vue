<template>
<b-container class="justify-content-center">
    <b-row align-h="center">
        <b-col class="col-12 col-md-12 pl-0 pr-0">

              <b-container class="justify-content-center">
                <b-row v-for="(club,idx) in clubsLimited" :key="idx" align-h="center" class="justify-content-center align-self-center">
                <b-col
                    class="col-12 col-md-5 pl-0 pr-0 align-self-center"
                >
               <b-img v-if="club.logourl" class="mr-2 mb-2 pt-1" :src="getClubImage(club.logourl)"></b-img>
               {{club.club}}

                </b-col>
                 <b-col
                    class="col-12 col-md-7 pl-0 pr-0 pb-4 pb-md-3 mt-md-3 mt-0"                    
                >                
                <b-progress height="1.4rem" :value="club.count" :max="topclub" show-value animated variant="success"></b-progress>
                
                </b-col>
                </b-row>
              </b-container>        

            <b-container hidden class="justify-content-center">
                <b-row class="" align-h="center" align-v="end">
                <b-col
                    class="col-4 pt-4 text-center box-shadow-3d"        
                    v-for="(club,idx) in clubs" :key="idx"
                    v-bind:class="{ 'order-2': idx === 0, 'order-1': idx === 1, 'order-3': idx === 2 }"
                >
                <div class="podium"       
                >
                    <span class="line d-block pb-1">{{truncate(club.club)}}</span>
                    <span class="line d-block">{{truncate(club.count)}}</span>
                </div>
                    
                </b-col>
                </b-row>
            </b-container>
        </b-col>
        <b-col v-if="!number" class="col-12 pl-0 pt-3">
             <b-button size="sm" v-on:click="getTopListClubs(clubcount+5)" variant="primary">Se fler klubbar<b-spinner v-if="loadingclubs" small type="grow" class="ml-1 pl-0"></b-spinner></b-button>
             <b-button size="sm" v-if="clubcount > 10" v-on:click="getTopListClubs(10)" variant="warning">Nollställ</b-button>
        </b-col>
    </b-row>
</b-container>
 
</template>

<script>
import { globalState } from "../main.js";

export default {
  props: ["number"],
  data() {
    return {
        clubs: [],
        clubno: 0,
        topclub: 0,
        clubcount: 10,
        loadingclubs: true
    };
  },
  created() {
    this.getTopListClubs(this.clubcount);
  },
  computed: {
    progress1: function (count) {
        return count/this.topclub;
    },
  },
  methods: {
     getClubImage(logourl) {
            return 'https://res.cloudinary.com/dn3hzwewp/image/upload/h_40,q_100,c_fill,ar_1:1,g_auto/' + logourl;
        },
      progress(count) {        
        return count/this.topclub;
    },
      truncate: function (club) {
      let len = 30;
      if (club.length > len) return club.substring(0, len) + "...";
      else return club;
    },
       getTopListClubs(number) {    
      this.loadingclubs = true;  
      this.clubcount = number;
      this.axios
        .post("https://matchplay.meteorapp.com/methods/" + "getTopClubs", {
          //getclubstoplist
          competition: globalState.compid,
          no: number,
        })
        .then((response) => {         
          this.clubs = response.data;
          this.topclub = this.clubs[0].count;
          this.loadingclubs = false;
        })
        .catch((error) => {
          console.log(error);
          this.loadingclubs = false;
        });
    }
  },

  computed: {
    clubsLimited() {
        return this.clubs.slice(0, this.number)
    }
}
};
</script>


<style scoped>

.podium {
    font-size:0.8em;
}

.order-2 {
    background: #FFD700;
    height:160px;
}

.order-1 {
    background: #C0C0C0;
    height:120px;
}

.order-3 {
    background: #cd7f32;
    height:80px;
}

.box-shadow-3d{
    /*transform: perspective(600px) rotateY(25deg);   */
}


.testimonial hr {
  border-top: 10px dotted rgba(0, 0, 0, 0.1);
  width: 15%;
  /*padding-top: 0em;
  padding-bottom: 0em;
  margin-top: 1.7em;*/
}
</style>