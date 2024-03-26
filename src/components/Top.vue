<template>
  <div
    style="position: relat"
    v-if="['Scorecard', 'Receipt'].indexOf($route.name) === -1"
  >
    <b-navbar toggleable="lg" ref="top">
      <b-navbar-brand>
        <router-link class to="/">
           <img           
           
            src="https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,h_70/v1710237483/Allerum/dormy_open_2024.png"
            alt
          />
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse">
        <i class="material-icons"></i>
      </b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav class="text-center">
        <div class="d-lg-none mt-5 mb-2">
          <h1 class="hidden theme">Psyched</h1>
          <p class="hidden text-uppercase">Dormy Open Helsingborg Shuttle Service</p>
        </div>
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-item :to="{path: '/line-up', query: {tags:$route.query.tags, day:$route.query.day}}">Line-up</b-nav-item> -->
                
          <b-nav-item hidden v-if="!closed" to="/register">About</b-nav-item>
                 
         
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { globalState } from "../main.js";

export default {
  name: "top",
  created() {
    //this.getCompanies();
  },
  data() {
    return {    
      
    };
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/variables.scss";

.nav-item {
  font-size: 18px;
  line-height: 33px;
}

.material-icons {
  font-size: 35px;
}
.navbar-light .navbar-toggler .material-icons {
  font-size: 25px;
}
.navbar-light .navbar-toggler[aria-expanded="false"] .material-icons::after {
  content: "menu";
}
.navbar-light .navbar-toggler[aria-expanded="true"] .material-icons::after {
  content: "close";
}
.navbar-light .navbar-toggler {
  border: none !important;
  color: #000;
  font-size: 25px;
}
h1.theme {
  font-size: 1.7rem !important;
}
.navbar-collapse a.nav-link {
  @media (max-width: 991px) {
    margin: 0;
  }
}
.navbar-collapse.show {
  padding-bottom: 2rem;
}

.my-count {
  position: absolute;
  border: 1px solid $pink;
  border-radius: 50%;
  margin: -6px 0 0 0;
  right: 15px;
  width: 30px;
  height: 30px;
  line-height: 1.6rem;
  font-size: 1.1rem;
  font-weight: normal;
  background-color: $pink !important;
  color: #fff;
  @media (max-width: 992px) {
    margin-left: -15px;
    right: auto;
    left: auto;
  }
}

.new {
  vertical-align: top;
  font-size: 0.6em;
  padding-top: 0.6em;
}
</style>
