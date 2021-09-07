<template>
  <div>
    <h5 >Birdieligan</h5>

    <b-row class="mt-3">
      <b-col class="col-10 col-md-10 mr-0 pr-0 mb-2">
        <strong>Spelare</strong>
      </b-col>
      <b-col class="col-2 col-md-2 text-right mb-2">
        <strong>Antal</strong>
      </b-col>
    </b-row>

    <b-row
      v-for="(birdie, index) in birdies"
      :key="'bird' + index"
      class="mb-2"
      v-bind:class="{ greybg: index % 2 === 0 }"
    >
      <b-col
        class="col-10 col-md-10 mr-0 pr-0"
        v-bind:class="{ no1: index === 0, no2: index === 1, no3: index === 2 }"
      >
        <span class="line"
          >{{ index + 1 }}. {{ truncate(birdie.playername) }}</span
        >
      </b-col>
      <b-col
        class="col-2 col-md-2 text-right"
        v-bind:class="{ no1: index === 0, no2: +index === 1, no3: index === 2 }"
      >
        <span class="line">({{ birdie.birdie }})</span>
      </b-col>
    </b-row>
  </div>
</template>


<script>
import { globalState } from "../main.js";


export default {
    props: ['competitionid', "numberofbirdies"],
  created() {
    this.getBirdies();
  },
  data() {
      return {
          birdies: null
      }
  },
  methods: {
    getBirdies() {
      //loading
      this.value = 5;

      this.axios
        .post(
          globalState.admin_url + "getAchievementData",
          {
            //getclubstoplist
            competition: this.competitionid ? this.competitionid : globalState.compid,
            type: "birdie",
            no: this.numberofbirdies ? this.numberofbirdies : 20,
          }
        )
        .then((response) => {
          this.birdies = response.data;
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
  },
};
</script>