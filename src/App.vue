<template>
  <div id="app">
    
    <!-- <nprogress-container></nprogress-container>
    <div v-if="loadPage" class="spinnerRouting">
      <app-spinner-routing></app-spinner-routing>
    </div>
    <div v-else> -->
      <Top></Top>
      <div class="content">
        <router-view></router-view>
      </div>
      <Footer></Footer>
    <!-- </div> -->
  
  </div>
</template>

<script>
import Top from "./components/Top";
import Footer from "./components/Footer";
import AppSpinnerRouting from "./components/spinner/SpinnerRouting";

import NprogressContainer from "vue-nprogress/src/NprogressContainer";

export default {
  name: "app",
  data() {
    return {
      loadPage: true,
    };
  },
  created() {
    this.$store.dispatch("tryAutoLogin").then(() => {
      if (this.isAuthenticated) {
        var sim_id;
        sim_id = localStorage.getItem("userId");
        if (this.$route.query.sim_id) {
          sim_id = this.$route.query.sim_id;
        }
        this.getPlayerData(sim_id);
        this.tabIndex = Number(localStorage.getItem("active_tab"));
      } else {
        this.showlogin = true;
        this.loading = false;
      }
    });
  },
  mounted() {
    setTimeout(() => {
      this.loadPage = false;
    }, 500);
  },
  components: {
    Top: Top,
    Footer: Footer,
    NprogressContainer,
    AppSpinnerRouting,
  },
  methods: {
    getPlayerData(id) { 
     
      this.axios.post('https://matchplay.meteorapp.com/methods/getPlayerData', {
              "id": id,
              "competition": '8dmNL5K5ypaHbTbEM'
          })
          .then(response => {
              if (response.data.hasOwnProperty('error')) {
                  console.log("error")
                  return;
              }
              let userinfo = response.data;
              localStorage.setItem('userinfo', JSON.stringify(userinfo));
              this.$store.dispatch('setUser', userinfo)
              return;
          })
          .catch(error => {
              console.log(error);
          });
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<style lang="scss">
@import "./styles/variables.scss";

@font-face {
  font-family: "Montserrat";
  src: url("../static/fonts/Montserrat-Regular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Montserrat Light";
  src: url("../static/fonts/Montserrat-Light.ttf") format("truetype");
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: "Montserrat Bold";
  src: url("../static/fonts/Montserrat-Bold.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: "Eurostile LT Std";
  src: url("../static/fonts/EurostileLTStd.ttf") format("truetype");
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: "Eurostile LT Std Demi";
  src: url("../static/fonts/EurostileLTStd-Demi.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: "Eurostile LT Std Bold";
  src: url("../static/fonts/EurostileLTStd-Bold.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: "Tenby Four";
  src: url("../static/fonts/TenbyFour.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}

body {
  font-size: 1.1rem !important;
  font-family: "Eurostile LT Std", Arial, sans-serif !important;
}

strong {
  font-family: "Eurostile LT Std Bold";
}

.jumbotron {
  border-radius: 0;
  background: #F5F5F5;
}

.jumbotron.gradient {
    border-radius: 0;
  color:#FFF;
background: rgb(51,116,182);
background: linear-gradient(49deg, rgba(51,116,182,1) 0%, rgba(47,47,47,1) 100%);  
}

.jumbotron.white {
    border-radius: 0;
  background-color: #fff;
}

.pink {
  color: $pink !important;
}
.blue {
  color: $blue !important;
}
.blue-bg {
  background: $blue !important;
  color: #fff;
}
.blue-light-bg {
  background: $blue-light !important;
}
.green {
  color: $green !important;
}
.green-bg {
  background: $green !important;
}
.green-light-bg {
  background: $green-light !important;
}
.orange {
  color: $orange !important;
}
.orange-bg {
  background-color: $orange !important;
}
.red {
  color: $red !important;
}
.red-bg {
  background-color: $red !important;
}
/* .content {
  margin-top: 100px;
  @media (max-width: 767px) {
    margin-top: 80px;
  }
} */
h1,
h2,
h3,
h4,
h5,
.btn {
  text-transform: uppercase;
}
h1 {
  color: $orange;
  @media (max-width: 767px) {
    font-size: 1.65rem !important;
  }
  @media (max-width: 576px) {
    font-size: 1.45rem !important;
  }
}
h2 {
  @media screen and (max-width: 767px) {
    font-size: 1.4rem !important;
  }
  @media screen and (max-width: 576px) {
    font-size: 1.2rem !important;
  }
}
h3 {
  @media (max-width: 767px) {
    font-size: 1.3rem !important;
  }
  @media (max-width: 576px) {
    font-size: 1.1rem !important;
  }
}
h4 {
  @media (max-width: 767px) {
    font-size: 1.1rem !important;
  }
  @media (max-width: 576px) {
    font-size: 1rem !important;
  }
}
h5 {
  @media (max-width: 767px) {
    font-size: 1rem !important;
  }
  @media (max-width: 576px) {
    font-size: 1.1rem !important;
  }
}
p,
a,
li,
span,
.btn {
  @media (max-width: 767px) {
  }
}
.hidden {
  display: none !important;
}
a,
a:visited {
  color: $blue !important;
  text-decoration: none !important;
}
a:hover {
}
a.text-white {
  color: #fff !important;
}
.btn,
.pointer {
  cursor: pointer;
}
.btn-lg {
  padding: 20px;
}


.pulse-button {
    position: relative;
    /*width: 100px;
  height: 100px;*/
	overflow:hidden;
    //border: none;
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 1);
    background-color: $blue;
    background-size: cover;
    background-repeat: no-repeat;
    cursor: pointer;
    -webkit-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
    -moz-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
    -ms-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
    animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
}

.pulse-button:hover {
    -webkit-animation: none;
    -moz-animation: none;
    -ms-animation: none;
    animation: none;
}

@keyframes spinner-grow {
 0% {
      -webkit-transform: scale(0);
      transform: scale(0);
 }
 50% {
     opacity: 1; 
     -webkit-transform: scale(1);
      transform: scale(1);
 }
}

@-webkit-keyframes pulse {
    to {
        box-shadow: 0 0 0 15px rgba(232, 76, 61, 0);
    }
}

@-moz-keyframes pulse {
    to {
        box-shadow: 0 0 0 15px rgba(232, 76, 61, 0);
    }
}

@-ms-keyframes pulse {
    to {
        box-shadow: 0 0 0 15px rgba(232, 76, 61, 0);
    }
}

@keyframes pulse {
    to {
        box-shadow: 0 0 0 15px rgba(232, 76, 61, 0);
    }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}

i.material-icons {
  vertical-align: middle !important;
}
h2 i.material-icons {
  font-size: 1.2em !important;
}

/*================ MENU ===============*/
nav {
  background: #fff;
  opacity: 0.75;
  @media (max-width: 991px) {
    opacity: 1;
    border-bottom: 1px solid #ddd;
  }
}
a.nav-link {
  text-transform: uppercase;
  font-weight: bold;
  color: #000 !important;
  margin-left: 30px;
}
.navbar-brand.router-link-exact-active {
  fill: $blue;
}
a.router-link-exact-active {
  fill: $blue !important;
}

a.btn.router-link-active {
  color: #FFF !important;
}
a.router-link-active {
  color: $blue !important;
}

/*================ MENU END ===============*/
/*================ TAGS ===============*/
.tags-container .select {
  text-transform: uppercase;
  color: $green;
  cursor: pointer;
}

.tags-container .tags {
  margin: 0 0 2rem 0;
}
.tags-container .tags .col-xs-6 {
  @media (max-width: 576px) {
    width: 50%;
  }
}
.tag {
  font-size: 1rem;
  margin: 2px -13px;
  border: 2px solid $grey-light;
  height: 3em;
  line-height: 3em;
  text-transform: uppercase;
  padding: 0 10px;
  cursor: pointer;
  @media (max-width: 992px) {
    font-size: 0.9rem;
  }
  @media (max-width: 576px) {
    font-size: 0.8rem;
  }
}
.tags-container .select-all {
  margin: 9rem 0 0 0;
  @media (max-width: 576px) {
    margin-top: 0;
  }
}
.tags-container .select-all span {
  text-transform: uppercase;
  margin: 0 10px;
}
.tag.active,
.tag-choosen.active {
  border-color: $pink;
}
.tag-choosen.active.speaker {
  background-color: $pink;
  color: #fff;
}
.tag-choosen {
  white-space: nowrap;
  display: inline-block;
  border: 1px solid #000;
  height: 45px;
  padding: 10px 5px 10px 20px;
  text-transform: uppercase;
  width: auto;
  margin: 0 2px 2px 0;
  cursor: pointer;
  @media (max-width: 992px) {
    padding: 7px 10px 7px 10px;
    height: 40px;
  }
  @media (max-width: 576px) {
    padding: 4px 10px 4px 10px;
    height: 35px;
  }
}
.tag-choosen,
.tags-add {
  font-size: 1rem;
}
.tag-choosen span {
  margin: 0 10px 0 0;
  @media (max-width: 991px) {
    font-size: 0.9rem;
  }
  @media (max-width: 576px) {
    font-size: 0.8rem;
    margin: 0 4px 0 0;
  }
}
.tag-choosen i {
  font-size: 1rem;
  vertical-align: middle;
  @media (max-width: 991px) {
    font-size: 0.9rem;
  }
  @media (max-width: 576px) {
    font-size: 0.8rem;
  }
}
.tags-add i {
  vertical-align: middle;
}
.tags-add {
  display: inline-block;
  border: 1px solid $green;
  width: 45px;
  height: 45px;
  padding: 10px;
  background-color: $green;
  color: #fff;
  cursor: pointer;
  @media (max-width: 991px) {
    padding: 7px;
    height: 40px;
    width: 40px;
  }
  @media (max-width: 576px) {
    padding: 4px;
    height: 35px;
    width: 35px;
  }
}
.loading-tags {
  margin: 10rem 0 60rem 0;
}
.tags-container .confirm-tags {
  margin: 1rem 0 60rem 0;
}
.btn.btn-circle.disabled {
  background-color: $grey-light !important;
}
.btn.btn-circle {
  background-color: $green !important;
  width: 100px;
  height: 100px;
  text-align: center;
  padding: 20px 0;
  font-size: 40px;
  font-weight: bold;
  line-height: 1.428571429;
  border-radius: 50%;
  cursor: pointer;
}
.btn-circle .material-icons {
  color: #fff;
  font-weight: bold;
  font-size: 50px;
}
/*=================== TAGS END ==================*/
/*=================== SESSIONS ==================*/
.session .add-schedule {
  cursor: pointer;
}
.session.active .add-schedule i,
.session.active .time {
  color: $pink;
}
.session.active .add-schedule i.remove {
  display: inline-block;
}
.session.active .add-schedule i.add {
  display: none;
}
.session .add-schedule i.remove {
  display: none;
}
.session .add-schedule i.add {
  display: inline-block;
}
.days span {
  color: #000;
  cursor: pointer;
}
.days span.active {
  color: $pink !important;
}

.session {
  margin: 0 5px 3em 5px;
}
.sessions-container .sessions {
  margin-bottom: 8rem;
}
.session .add-schedule i {
  padding-top: 15px;
}
.session .time h2 {
  font-size: 3.7rem;
  @media (max-width: 1199px) {
    font-size: 2.9rem;
    padding-top: 10px;
  }
  @media (max-width: 991px) {
    font-size: 2rem;
    padding-top: 18px;
  }
  @media (max-width: 767px) {
    font-size: 2.4rem !important;
  }
}
.session .main {
  padding-top: 10px;
}

.alert-dismissible {
    padding-right: 2.5rem;
}

.session .fold-icons,
.session .session-title {
  display: inline-block;
}
.session .fold-icons { 
  display: inline-block;
  width: 3%;
  @media (max-width: 1199px) {
    width: 4%;
  }
  @media (max-width: 991px) {
    width: 5%;
  }
}
.session .session-title {
  width: 97%;
  display: inline-block;
  padding: 3px 0 0 10px;
  @media (max-width: 1199px) {
    width: 96%;
  }
  @media (max-width: 991px) {
    width: 95%;
  }
}

.session .session-info {
  margin-top: 5px;
  padding-top: 5px;
  border-top: 1px dotted #555;
  cursor: pointer;
}
.session .session-text {
  margin: 10px 0 0 15px;
  @media (max-width: 576px) {
    font-size: 1rem;
  }
}
.session .speaker,
.session .room,
.session .material-icons {
  cursor: pointer;
  color: #888;
}
.session .speaker,
.session .room {
  font-size: 13px;
}
.sessions-container .days {
  margin: 1em 0 3em 0 !important;
  @media (max-width: 576px) {
    margin-bottom: 0 !important;
  }
}
.sessions-container .days ul {
  padding: 0;
  list-style-type: none;
}

.sessions-container ul.conference,
.sessions-container ul.workshop {
  list-style: none;
  display: inline-block;
}
.sessions-container .conference li,
.sessions-container .workshop li {
  float: left;
  margin-right: 1em;
  text-transform: uppercase;
}
.sessions-container .days li {
  @media (max-width: 991px) {
    font-size: 1.2rem;
  }
  @media (max-width: 767px) {
    font-size: 1rem;
  }
  @media (max-width: 576px) {
    font-size: 0.7rem;
    margin-right: 0.1rem;
  }
}
.sessions-container .days li span {
  @media (max-width: 991px) {
    font-size: 1.5rem;
  }
  @media (max-width: 767px) {
    font-size: 1.2rem;
  }
  @media (max-width: 576px) {
    font-size: 0.9rem;
    margin-right: 0.5rem;
  }
}
.sessions-container .conference li.session-type,
.sessions-container .workshop li.session-type {
  clear: both;
  color: #888;
  border-top: 1px dotted #888;
  width: 100%;
}
/*=================== SESSIONS END==================*/
/*=================== LINE-UP ==================*/
.lineup .speaker-card {
  margin-bottom: 40px;
}
.lineup .speaker-card .speaker-company {
  font-size: 11px;
  color: #000;
}
.lineup .speaker-card .speaker-name {
  margin: 10px 0 0 0;
  text-transform: uppercase;
}
.speaker-single {
  margin-bottom: 150px;
}
.speaker-single h4 {
  margin-top: 20px;
}
/*=================== LINE-UP END==================*/

button.Cookie--matchplay {
  background: #69b3fe;
  color: #fff !important;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  cursor: pointer;
  margin-top: 1em;
  border: 0;
  padding: 10px 30px;
  text-decoration: none !important;
  line-height: 1.5;
  border-radius: 0.3rem;
}
</style>
