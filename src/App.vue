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
import { globalState } from "./main.js";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";


export default {
  name: "app",
  data() {
    return {
      loadPage: true,
    };
  },
  created() {

    
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

  },
  computed: {
     ...mapGetters([]),
  
  },
};
</script>

<style lang="scss">
@import "./styles/variables.scss";

button {
  touch-action: manipulation !important; 
}

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
  font-family: "Poppins";
  src: url("../static/fonts/Poppins-Medium.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: "Poppins SemiBold";
  src: url("../static/fonts/Poppins-SemiBold.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: "Prompt";
  src: url("../static/fonts/Prompt-Regular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Prompt SemiBold";
  src: url("../static/fonts/Prompt-SemiBold.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}





body {
  font-size: 1.1rem !important;
  font-family: "Prompt", Arial, sans-serif !important;
}

strong {
   font-family: "Prompt SemiBold";   
}

.jumbotron {
  border-radius: 0;
  background: #F5F5F5;
}

.jumbotron.gradient, div.gradient {
    border-radius: 0;
  color:#FFF;
background: rgb(51,116,182);
background: linear-gradient(49deg, rgba(51,116,182,1) 0%, rgba(47,47,47,1) 100%);  
}

.jumbotron.white {
    border-radius: 0;
  background-color: #fff;
}

table thead th {
  font-family: 'Prompt SemiBold';
}

table td {
  vertical-align: middle !important;  
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

  font-size:3.5rem;
  
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


@-moz-keyframes blink {0%{opacity:1;} 50%{opacity:0.5;} 100%{opacity:1;}} /* Firefox */
@-webkit-keyframes blink {0%{opacity:1;} 50%{opacity:0.5;} 100%{opacity:1;}} /* Webkit */
@-ms-keyframes blink {0%{opacity:1;} 50%{opacity:0.5;} 100%{opacity:1;}} /* IE */
@keyframes blink {0%{opacity:1;} 50%{opacity:0.5;} 100%{opacity:1;}} /* Opera */

.blink {
    //text-align:center;
    -moz-transition:all 0.5s ease-in-out;
    -webkit-transition:all 0.5s ease-in-out;
    -o-transition:all 0.5s ease-in-out;
    -ms-transition:all 0.5s ease-in-out;
    transition:all 0.5s ease-in-out; 
    -moz-animation:blink normal 1.5s infinite ease-in-out; /* Firefox */
    -webkit-animation:blink normal 1.5s infinite ease-in-out; /* Webkit */
    -ms-animation:blink normal 1.5s infinite ease-in-out; /* IE */
    animation:blink normal 1.5s infinite ease-in-out; /* Opera */
  
}


@-moz-keyframes blink-fast {0%{opacity:1;} 50%{opacity:0.5;} 100%{opacity:1;}} /* Firefox */
@-webkit-keyframes blink-fast {0%{opacity:1;} 50%{opacity:0.5;} 100%{opacity:1;}} /* Webkit */
@-ms-keyframes blink-fast {0%{opacity:1;} 50%{opacity:0.5;} 100%{opacity:1;}} /* IE */
@keyframes blink-fast {0%{opacity:1;} 50%{opacity:0.5;} 100%{opacity:1;}} /* Opera */

.blink-fast {
    //text-align:center;
    -moz-transition:all 0.2s ease-in-out;
    -webkit-transition:all 0.2s ease-in-out;
    -o-transition:all 0.2s ease-in-out;
    -ms-transition:all 0.2s ease-in-out;
    transition:all 0.2s ease-in-out; 
    -moz-animation:blink normal 1.2s infinite ease-in-out; /* Firefox */
    -webkit-animation:blink normal 1.2s infinite ease-in-out; /* Webkit */
    -ms-animation:blink normal 1.2s infinite ease-in-out; /* IE */
    animation:blink normal 1.2s infinite ease-in-out; /* Opera */
  
}


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


//TABLE
 /* 
	Max width before this PARTICULAR table gets nasty
	This query will take effect for any screen smaller than 760px
	and also iPads specifically.
	*/



  .table-responsive-sm {
    overflow-x:visible;
  }

  

	@media 
	only screen and (max-width: 560px),
	(min-device-width: 320px) and (max-device-width: 560px)  {
	
		/* Force table to not be like tables anymore */
		table, thead, tbody, th, td, tr { 
			display: block; 
		}

    .table td {
      padding-top: 1.4em !important;
        padding-left: 1em !important;
    }
		
		/* Hide table headers (but not display: none;, for accessibility) */
		thead tr { 
			position: absolute;
			top: -9999px;
			left: -9999px;
		}
		
		tr { border: 1px solid #ccc; 
    margin-bottom:1em;}
		
		td { 
			/* Behave  like a "row" */
			border: none;
			border-bottom: 1px solid #eee; 
			position: relative;
			padding-left: 50%; 
		}
		
		td:before { 
			/* Now like a table header */
      font-weight: 500;
			position: absolute;
        top: 2px;
        left: 6px;
        width: 45%;
        padding-right: 10px;
        white-space: nowrap;
        font-size: 0.85em;
        font-family: "Prompt SemiBold";
		}
		
		/*
		Label the data
		*/
		td:nth-of-type(1):before { content: "Day"; }
		td:nth-of-type(2):before { content: "Time"; }
		td:nth-of-type(3):before { content: "Name"; }
		td:nth-of-type(4):before { content: "Mobile"; }
		td:nth-of-type(5):before { content: "Persons"; }
		td:nth-of-type(6):before { content: "Bags"; }
		td:nth-of-type(7):before { content: "Driver"; }
		td:nth-of-type(8):before { content: "Action"; }
	}
	
	
	
	
  


</style>
