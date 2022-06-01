<template>
  <div>
    <h5>Under par challenge</h5>
    <small>Birdie = 1p | Eagle = 2p | HIO = 3p</small>
    <br />
   <div class="list">
    <b-row class="mt-3" >
      <b-col class="col-4 col-md-4 mr-0 pl-0 pl-md-3 pr-0 mb-2">
        <strong>Spelare</strong>
      </b-col>
      <b-col class="col-2 col-md-2 text-center mb-2">
        <strong>Birdies</strong>
      </b-col>
       <b-col class="col-2 col-md-2 text-center mb-2">
        <strong>Eagles</strong>
      </b-col>
       <b-col class="col-2 col-md-2 text-center mb-2">
        <strong>HIO</strong>
      </b-col>
       <b-col class="col-2 col-md-2 text-center mb-2">
        <strong>Poäng</strong>
      </b-col>
    </b-row>

    <b-row
      v-for="(result, index) in total"
      :key="'bird' + index"
      class="mb-2"
      v-bind:class="{ no1: index === 0, no2: index === 1, no3: index === 2 }"
    >
      <b-col
        class="col-4 col-md-4 mr-0 pr-0 pl-1 pl-md-3"
       
      >
        <span class="line"
          >{{ index + 1 }}. {{ truncate(result.playername) }}
          <i v-if="result.hio>0" class="fa fa-award"></i>
          </span
        >
      </b-col>
      <b-col
        class="col-2 col-md-2 text-center"
       
      >
        <span class="line">{{ result.birdie }}</span>
      </b-col>
       <b-col
        class="col-2 col-md-2 text-center"
       
      >
        <span class="line">{{ result.eagle }}</span>
      </b-col>
       <b-col
        class="col-2 col-md-2 text-center"
       
      >
        <span class="line"
        >
        {{ result.hio }}

        </span>
      </b-col>
       <b-col
        class="col-2 col-md-2 text-center"       
      >
        <span class="line">{{ result.total }}</span>
      </b-col>
    </b-row>
  </div>
  </div>
</template>


<script>
import { globalState } from "../main.js";

export default {
  props: ["competitionid", "numberofbirdies", "numberofeagles"],
  created() {
    this.getTotal();
    //this.getBirdies();
    //this.getEagles();
  },
  data() {
    return {
      birdies: null,
      eagles: null,
      total: null,
      extracount: []
    };
  },
  methods: {
    getBirdies() {
      //loading
      this.value = 5;

      //BIRDIES
      this.axios
        .post(globalState.admin_url + "getAchievementData", {
          //getclubstoplist
          competition: this.competitionid
            ? this.competitionid
            : globalState.compid,
          type: "birdie",
          no: this.numberofbirdies ? this.numberofbirdies : 20,
        })
        .then((response) => {
          //console.log(response.data)
          this.birdies = response.data;

          //get eagles
          this.axios
            .post(globalState.admin_url + "getAchievementData", {
              //getclubstoplist
              competition: this.competitionid
                ? this.competitionid
                : globalState.compid,
              type: "eagle",
              no: this.numberofeagles ? this.numberofeagles : 20,
            })
            .then((response) => {
              //console.log(response.data)
              this.eagles = response.data;

              //search in eagle array and match against birdies array
              for (var i = 0; i <  this.eagles.length; i++) {
                //console.log(this.eagles[i])
                var birdies = this.birdies.filter((birdie) => {
                  
                  if (birdie._id === this.eagles[i]._id) return true;
                });
                if (birdies.length>0) {
                  //console.log(birdies,birdies._id)
                  //add eagle (this.eagles[i].eagle) to birdie array
                 //let obj = this.birdies.find(o => o._id === birdies._id);                 
                 let obj = this.birdies.findIndex((player) => player._id === birdies[0]._id);
                 if (obj > -1) {
                   this.birdies[obj].eagle = this.eagles[i].eagle;
                   //this.birdies[obj].total = this.birdies[obj].birdie + this.birdies[obj].eagle
                   this.birdies[obj].total = 100
                 }
                }
              }
             /*   var eagles = this.eagles.filter((eagle) => {
                  if (eagle._id === id) return true;
                });  */


            })
            .catch((error) => {
              console.log(error);
            });

         



        })
        .catch((error) => {
          console.log(error);
        });
    },

    getTotal() {
      //loading
      this.value = 5;

      this.axios
        .post(globalState.admin_url + "getAchievementTotal", {
          //getclubstoplist
          competition: this.competitionid
            ? this.competitionid
            : globalState.compid,
          //type: "eagle",
          no: 20
        })
        .then((response) => {
         
          this.total = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    truncate: function (club) {
      let len = 30;
      if (club.length > len) return club.substring(0, len) + "...";
      else return club;
    },
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/variables.scss";

.no1 {
  background-color: $gold;
  padding-top:0.5em;
  padding-bottom:0.25em;
}
.greybg {
 background: #f6f6f6;
  //border-radius: 0.3em;
  //-webkit-box-shadow: 0px 0px 7px 0px #DBDBDB; 
  //box-shadow: 0px 0px 7px 0px #DBDBDB;
}

.list .row {
  border-bottom:1px solid grey;
  padding-bottom:0.25em;
}

.hio {
    background: $gold;
    color:#000;
    padding-top:5px;   
    border: 1px solid grey;
}

 @media (max-width: 475px) {
    .list {
      font-size:0.6em;
    }
  }

</style>
