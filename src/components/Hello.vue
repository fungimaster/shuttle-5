<template>
  <div>
    <vue-headful :title="doctitle" />
    <div class="hidden theme text-center">
      <div class="container">
        <h2 class="when">Matchplay 2021</h2>
      </div>
    </div>

    <b-modal
      ref="earlyBirdie"
      id="earlyBirdie"
      title="Early Birdie?"
      size="md"
      ok-only
      ok-variant="secondary"
      ok-title="Cancel"
    >
      <p>Bland de första 50 registrerade och betalda lagen lottar vi ut en golfweekend till Lydinge Resort (Skåne) med 3-rätters middag, övernattning och greenfee för 2 personer.</p>
      <p>Det vinnande laget meddelas per mail samt på våra sociala konton.</p>
      <p class="text-center d-block d-md-none">
        <img
          src="https://res.cloudinary.com/dn3hzwewp/image/upload/h_200/v1608315326/matchplay/Early_Birdie_2021_mobil.jpg"
        />
      </p>
      <p class="text-center d-none d-md-block">
        <img
          src="https://res.cloudinary.com/dn3hzwewp/image/upload/h_300/v1608315326/matchplay/Early_Birdie_2021_mobil.jpg"
        />
      </p>
      <b-button class="mt-3" block @click="$bvModal.hide('earlyBirdie')">Tack för infon!</b-button>
      <template #modal-footer="{ ok, cancel, hide }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button hidden size="sm" variant="success" @click="ok()">OK</b-button>
        <b-button hidden size="sm" variant="danger" @click="cancel()">Tack för infon!</b-button>
        <!-- Button with custom close trigger value -->
        <b-button hidden size="sm" variant="outline-secondary" @click="hide('forget')">Forget it</b-button>
      </template>
    </b-modal>

    <!--     <b-modal ref="scorecard" v-model="modalShow" ok-only size="lg">
      <router-view> </router-view>
    </b-modal>-->

    <div class="hero herobg0" ref="slider">
      <b-container class="pl-4 pr-4">
        <b-row align-h="center">
          <b-col class="col-12 col-md-12 mt-4">
            <h2>VÄLKOMMEN TILL MATCHPLAY 2021, GOLFTÄVLINGEN FÖR BÅDE PRIVATPERSONER OCH FÖRETAG</h2>
          </b-col>

          <b-col v-if="!closed" class="col-12 col-md-6 mt-4 mb-3 mb-md-4 text-center" id="countdown">
            <h4 class="mb-3 mb-md-4">Anmälan stänger om:</h4>
            <b-row align-h="center">
            <b-col hidden class="col-4 col-md-4 p-0">
              <span id="days" class="blink-fast red days timenumbers">01</span>
          <p class="timeRefDays timedescription">dag</p>
            </b-col>
            <b-col class="col-4 col-md-4 p-0">
              <span id="hours" class="blink-fast red hours timenumbers">00</span>
          <p class="timeRefHours timedescription">timmar</p>
            </b-col>
            <b-col class="col-4 col-md-4 p-0">
              <span id="minutes" class="minutes timenumbers">00</span>
          <p class="timeRefMinutes timedescription">minuter</p>
            </b-col>
            <b-col class="col-4 p-0">
              <span id="seconds" class="seconds timenumbers">00</span>
          <p class="timeRefSeconds timedescription">sekunder</p>
            </b-col>
            </b-row>
          </b-col>

          <b-col class="col-12 col-md-8">
            <p v-if="!closed" class="mt-3 mt-md-0">
             Omgång 1 startar  <strong>söndagen den 2 maj</strong> och pågår till  <strong>söndagen den 30 maj</strong> (ändrat för att fler i mellersta och norra Sverige ska kunna delta pga av kall vinter/vår).
              <b-alert hidden variant="info" class="small mt-3">Lag från mer än 50% av Sveriges golfklubbar finns nu representerade i tävlingen!</b-alert>              
            </p>
            <p
              class="mt-3 mt-md-0"
            >Matchplay är en matchspelstävling för par med officiellt handicap. Par kan vara män, kvinnor eller mix. Tävlingen spelas i Sverige på golfklubbar anslutna till Svenska Golfförbundet.</p>
            <p
              v-if="!closed"
            >Tävlingen spelas mellan maj-september i olika omgångar fram till Sverigefinalen och sedan vidare utomlands!</p>
            <p hidden v-if="!closed">2020 spelades 358 matcher på nästan 100 golfklubbar.</p>
            <p
              hidden
              v-if="closed"
            >I helgen (30-31 maj) lottas första omgången. Den 1 juni startar tävlingen!</p>
           
            <div class="buttons text-left">
              <router-link
                v-if="!closed && !isAuthenticated"
                class="btn blue-bg btn-md text-white mt-2 mr-2"
                to="/register"
              >Anmälan</router-link>
              <a
                hidden
                v-if="!isAuthenticated"
                href="/register"
                class="btn blue-bg btn-md text-white mt-2 mr-2"
              >Anmälan</a>
              <a
                v-if="!isAuthenticated && !closed"
                href="#more"
                class="btn blue-bg btn-md text-white mt-2 mr-2"
              >Vill du veta mer?</a>

            <div v-if="closed" class="mt-3 mb-3">
              <b-row>
                <b-col class="col-7 col-md-12 pr-0 pr-md-3">
              <h3 class="">Statistik 2021</h3>
              Anmälda lag: <strong>712</strong><br>
              Repr. klubbar: <strong>232</strong><br>
              Snitthcp: <strong>12.1</strong><br>
              Snittålder: <strong>42.8 år</strong><br>
              
                </b-col>
                <b-col class="col-5 col-md-12 pl-0 pl-md-3">
                  <b-button to="/results" class="text-white mt-5 mt-md-3" variant="primary" size="sm">Följ årets matcher</b-button>
                </b-col>
              </b-row>
            </div>

              <p v-if="closed && !isAuthenticated">Anmälan till årets tävling har tyvärr stängt, välkommen tillbaka nästa år, anmälan öppnar i december 2021.</p>
              <router-link
                v-if="isAuthenticated"
                class="btn blue-bg btn-md text-white mt-2 mr-2"
                to="/mymatchplay"
              >Lag- och matchhantering</router-link>
              <a
                hidden
                v-if="isAuthenticated"
                href="/mymatchplay"
                class="btn blue-bg btn-md text-white mt-2"
              >Lag- och matchhantering</a>
              <a
                hidden
                href="/register"
                class="btn btn-warning btn-md text-white mt-2"
              >Efterhandsregistrera spelare</a>
            </div>

            <!-- ALERTS FRÅN BACKEND -->
            <b-alert
              class="mt-4 smaller"
              :variant="message.variant"
              show
              v-for="message in messages"
              :key="message.index"
            >
              <h6><strong>{{message.title}}</strong></h6>
              <span v-html="message.message"></span>
            </b-alert>

          </b-col>
          

          <b-col class="col-12 d-block d-md-none pl-2 justify-content-center align-self-center p-5">
            <b-img
              src="https://res.cloudinary.com/dn3hzwewp/image/upload/e_colorize,co_rgb:fff/v1573118127/matchplay/matchplay-new-logo-2020.png"
              alt
            ></b-img>
          </b-col>        


          <b-col
            class="col-md-4 d-none d-md-block pl-2 justify-content-center align-self-center p-3"
          >
            <b-img
              src="https://res.cloudinary.com/dn3hzwewp/image/upload/e_colorize,co_rgb:fff/v1573118127/matchplay/matchplay-new-logo-2020.png"
              alt
            ></b-img>
          </b-col> 
        </b-row>
      </b-container>
    </div>
    <!-- TEMP HIDDEN -->

    <b-jumbotron container-fluid class="white mb-0">
      <b-container>
        <b-row v-if="!isAuthenticated">
            <b-col hidden v-if="closed" class="col-12">
              <h1>Statistik 2021</h1>
              Anmälda lag: 523<br>
              Snittålder: 43<br>
              Snitthcp: 12.2<br>


            </b-col>
          <b-col v-if="closed" class="col-12">
            <p
              class="mt-3 mt-md-0"
            >Matchplay är en matchspelstävling för par med officiellt handicap. Par kan vara män, kvinnor eller mix. Tävlingen spelas i Sverige på golfklubbar anslutna till Svenska Golfförbundet.</p>
            <p
            >Tävlingen spelas mellan maj-september i olika omgångar fram till Sverigefinalen och sedan vidare utomlands!</p>
          </b-col>
          <b-col v-if="!closed" class="col-12">
            <h1 v-if="!closed" class="teaser-header orange mb-3 text-left text-md-center">Anmäl ditt lag till Matchplay 2021</h1>
            <p>Hela tävlingen är numera digitaliserad där vi kontrollerar Golf-ID, hcp, slope mm för att kunna applicera våra hcputräkningar inför varje match. Ni använder vårt digitala scorekort för att föra score och vänner/familj kan följa matcherna live!</p>
            <p>Sista anmälningsdag är den <strong>30 april</strong> och tävlingens första omgång börjar den <strong>2 maj</strong> och slutar den <strong>30 maj</strong>.</p>
            <p>
              Anmälningskostnad per lag är
              <strong>{{price1}} kr</strong> för privatpersoner och
              <strong>{{price2}} kr</strong> (exkl. moms) för företag.
            </p>
            <b-alert show variant="info" class="mt-3 mb-3 small">Glöm inte att anmälningsavgiften kan användas som <strong>friskvårdsbidrag</strong>. Golftävlingar är godkända som bidrag sedan 2020. <strong>Kvitto</strong> erhålls automatiskt efter betalning.</b-alert>
            <router-link class="btn blue-bg btn-md text-white mt-2 mr-2" to="/register">
              <i class="pb-1 mr-2 material-icons">thumb_up</i>Steg 1 - Skriv in ditt Golf-ID
            </router-link>
          </b-col>
        </b-row>
                     
        <b-row v-if="isAuthenticated && user">
          <b-col class="col-12">
            <h3 class="teaser-header orange mb-3">Hej {{user.firstname}}!</h3>

            <p v-if="user.teams">
              Du kan hantera ditt lag 
              <router-link to="/mymatchplay">här</router-link>. Lycka till i tävlingen!
            </p>
            <div v-if="user.teams">
              <div v-if="user.teams.length>0">
                <!-- kommande match -->
                <div v-if="user.teams[0].games.length>0">
                  <div v-if="user.teams[0].games[0].status === 'Pending'">
                    <p>
                      Din nästa match: {{user.teams[0].games[0].gamedate}} {{user.teams[0].games[0].gametime}}
                      <span
                        v-if="user.teams[0].games[0].clubname"
                      >på {{user.teams[0].games[0].clubname}}.</span>
                      <span v-else>.</span>
                    </p>
                  </div>
                </div>
                <!-- pågående match -->
                <div v-if="user.teams[0].games.length>0">
                  <div v-if="user.teams[0].games[0].status === 'In progress'">
                    <p>
                      Du har en pågående match!
                      <b-button
                        @click="getScorecard(user.teams[0].games[0]._id)"
                        show
                        variant="primary"
                        class="pulse-button mt-2 mt-md-0"
                      >Visa scorekortet</b-button>
                    </p>
                  </div>
                </div>
         
              </div>
            </div>
            <p
              v-if="!user.teams"
            >Du har ännu inget lag i Sveriges roligaste golftävling, skapa ett på knappen nedan.</p>
            <div v-if="user.teams">
              <p v-if="!user.teams[0].paid">
                Anmälningskostnad per lag är
                <strong>{{price1}} kr</strong> för privatpersoner och
                <strong>{{price2}} kr</strong> (exkl. moms) för företag.
              </p>
            </div>
            <router-link
              v-if="!user.teams"
              class="btn blue-bg btn-md text-white mt-2 mr-2"
              to="/mymatchplay"
            >Skapa ett lag</router-link>
          </b-col>
        </b-row>

        <b-row v-if="closed">
          <b-col class="col-12 mb-3 mt-3">
              <app-rounds-grafic
              class="mt-3"
              style="height: 300px"
              linecolor="#808080"
              opacity="1"
              stagefill="black"
              :condensed="false"
            ></app-rounds-grafic>
          </b-col>
        </b-row>

         <b-row v-if="closed">
          <b-col class="col-12 mb-3 mt-4">
            <h3>Spela coronasäkert</h3>
            <p>
            Vår underbara sport kan bedrivas säkert som sällskapsspel. Vi är utomhus, utan kontakt, med stora ytor att röra oss på. 
            </p>
            <p>Att tänka på inför matchstart:</p>
            <ul>
              <li>
              håll avstånd
              </li>
               <li>
              inga handslag
              </li>
               <li>
              låt flaggan stå
              </li>
                <li>
              följ klubbarnas regler kring avstånd/maxantal etc.
              </li>
            </ul>
          </b-col>
         </b-row>

        <hr v-if="!closed" class="mt-4 mb-4 mt-md-5 mb-md-4" />
        <b-row align-h="center">
          <b-col v-if="latestTeam && !closed" class="col-12 col-md-6">
            <b-row align-h="center" class="align-items-center h-100">
                             <b-col class="col-3 mx-auto text-center text-md-right pl-0 pr-0">                              
                                  <b-img class="" :src="getClubImage2(latestTeamLogo)"></b-img> 
                            </b-col>
                             <b-col class="col-7 small mx-auto pl-0 pr-0 text-left">
                                {{latestTeam}} <router-link to="/klubbar">Lag från mer än 50% av Sveriges golfklubbar är nu representerade i tävlingen!</router-link>.
                             </b-col>
                            </b-row>
                            <hr class="d-block d-md-none" /> 
          </b-col>
          <b-col class="col-12 col-md-6 p-0 mt-2 mt-md-0">           
          <b-col class="col-12 mt-3">
            <a
              class="btn orange-bg btn-md text-white mt-2 mr-md-2"
              href="https://www.facebook.com/matchplaysweden/"
              target="_blank"
            >
              <i class="material-icons mr-2">facebook</i>Facebook
            </a>
            <a
              class="btn orange-bg btn-md text-white mt-2"
              href="https://www.instagram.com/matchplay_sweden/"
              target="_blank"
            >
              <i class="material-icons mr-2">camera_alt</i>Instagram
            </a>
          </b-col>
           <b-col class="col-12 mt-2">           
            <p class="mt-4 small">
              Se till att följa oss på våra
              <strong>sociala medier</strong> för nyheter och tävlingar!
            </p>
          </b-col>
          </b-col>

        </b-row>

        <b-row v-if="showTopClubs && !closed">
          <b-col class="col-12 mt-3">
            <hr />
            <h3 class="white mb-3 mt-4 pt-2">Topp 3 anmälda lag</h3>
            <podium number="3"></podium>
             <a                
                href="#podium2"
                class="btn blue-bg btn-sm text-white mt-4"
              >Se fler klubbar</a>
          </b-col>
        </b-row>
      </b-container>
    </b-jumbotron>

     <howitworks v-if="!closed && (!isAuthenticated || !user)"></howitworks>
    
    <b-jumbotron v-if="!closed" container-fluid class="white mb-0">
      <b-container>
        <b-row>
          <b-col class="col-12 text-left text-md-center">
            <h1 class="orange">Deltagarröster från 2020</h1>
            <testimonials :number=5 :register=true></testimonials>
          </b-col>
        </b-row>
      </b-container>
    </b-jumbotron>

    <b-jumbotron container-fluid class="gradient mb-3">
      <b-container class="mb-4 mt-4">      
        <b-row align-h="center">
          <b-col class="col-12 col-md-10 col-lg-10">
            <b-row align-h="center">
          <b-col class="col-12 col-md-12">
            <h1 class="mb-5 text-white text-left text-md-center">Dubbelt så stor Sverigefinal</h1>            
          </b-col>
            </b-row>
            <b-row align-h="center">
          <b-col class="col-12 col-md-8">
            <p>Åtta lag går till Sverigefinalen som spelas 3-5 september på Allerum Golfklubb, strax utanför Helsingborg. Hotell inklusive frukost, inspel, semifinal och för de fyra vinnande lagen blir det final på söndagen. Bankett på lördagskvällen för de 8 deltagande lagen. De två lagen som vinner respektive match på söndagen blir bjudna på den stora finalen på Los Naranjos i Spanien.</p>
          </b-col>
          <b-col class="col-12 col-md-4 text-center mt-3 mt-md-0">
            <img
              src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_150,e_colorize:100,co_rgb:FFFFFF/v1599032379/matchplay/logo.png"
            />
          </b-col>
            </b-row>
        </b-col>
        </b-row>
      </b-container>
    </b-jumbotron>

    <b-jumbotron v-if="showTopClubs" container-fluid class="white" id="podium2">
      <b-container>
        <b-row>
          <b-col class="col-12">
            <h3 class="teaser-header orange mb-4">Anmälda lag per klubb</h3>
            <podium></podium>
          </b-col>
        </b-row>
      </b-container>
    </b-jumbotron>

    <b-jumbotron v-if="!closed" container-fluid class="white mb-3">
      <b-container>
        <b-row>
          <b-col class="col-12">
            <h1 class="mb-4 teaser-header orange text-left text-md-center">Finalparen från Matchplay 2020 klara för Spanien</h1>
            <p>
              Vi säger stort grattis till våra finalpar som är klara för den stora Matchplayfinalen på Los Naranjos i Spanien mellan den 7-11 februari 2021.
              <span
                class="red"
              >Pga av Corona och inställda flyg kommer finalen 2020 spelas samtidigt som finalen för 2021 avgörs (7-11 nov).</span>
            </p>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="col-12 col-md-6">
            <img
              class
              :src="`https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_400,q_auto/v1603714880/matchplay/matchplay_final1.jpg`"
            />
            <p class="mt-1">Joel Carnor & Emma Wedin</p>
            <a
              target="_blank"
              class="btn blue-bg btn-md text-white mt-0"
              href="https://fb.watch/1mv7rhBfNC/"
            >länk till segerintervju</a>
          </b-col>
          <b-col class="col-12 col-md-6 pt-3 pt-md-0">
            <img
              class
              :src="`https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_400,q_auto/v1603714880/matchplay/matchplay_final2.jpg`"
            />
            <p class="mt-1">Kim Christiansson & Martin Nileskär</p>
            <a
              target="_blank"
              class="btn blue-bg btn-md text-white mt-0"
              href="https://fb.watch/1mveFbmDox/"
            >länk till segerintervju</a>
          </b-col>
        </b-row>
      </b-container>
    </b-jumbotron>

    <b-jumbotron v-if="!isAuthenticated && !closed" container-fluid class="gradient mb-0" id="more">
      <b-container>
        <b-row>
          <b-col class="col-12 mt-4">
            <h1 class="mb-5 text-white text-left text-md-center">Matchplay 2021</h1>
            <p>Matchplay spelas 2021 i hela Sverige och är en tävling för 2-mannalag (herr, dam eller mixed). Officiellt HCP krävs för att delta. Tävlingsformen är 4-boll, Match/Bästboll. Beroende på antal anmälda lag kommer det bli 6-7 omgångar fram till Sverigefinalen. Varje omgång spelas inom 2 veckor (undantag 1:a omgången som är 4 veckor) där det vinnande laget går vidare i tävlingen.</p>
            <p>Matcherna lottas med hänsyn till geografiskt läge och i de inledande omgångarna kan ni räkna med att få möta lag från närliggande golfklubbar. Ju längre man kommer i tävlingen (ungefär från omgång 4), och beroende på var man bor i Sverige, kan resorna bli lite längre. Hemmalaget bokar golftid och lagen står själva för ev. greenfee fram till Sverigefinalen.</p>
            <p>Sverigefinalen görs upp 3-5 september mellan de åtta bästa lagen på Allerum Golfklubb strax utanför Helsingborg. Hotell, frukost, all golf samt en bankett på kvällen ingår. De 2 bästa lagen i Sverigefinalen åker med Matchplay till Spanska solkusten för att göra upp om titeln. Flyg, hotell och allt spel ingår för de bägge lagen.</p>
            <p>Priset för deltagande i tävlingen är {{price1}}:-/lag för privatpersoner och {{price2}}:-/lag (exkl. moms) för företag. Varje lag är garanterat minst 2 matcher.</p>

            <app-rounds-grafic
              hidden
              class="mt-5"
              style="height: 300px"
              linecolor="#808080"
              opacity="1"
              stagefill="white"
            ></app-rounds-grafic>
            <p
              class="mt-3 small"
              style="font-style:italic;"
            >Denna visualisering kommer visa aktuell rond fram till finalen. Efter varje rond halveras antal lag då förlorarna blir utslagna. Förlorande lag i omgång 1 går till andra chansen.</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="col-12 mt-3">
            <b-button variant="primary" class="text-white" to="/register">
                  Anmälan
                  </b-button>
                  <b-button variant="primary" class="text-white" to="/info">
                  FAQ
                  </b-button>
          </b-col>
        </b-row>
     
      </b-container>
    </b-jumbotron>

     <b-jumbotron v-if="!closed && !isAuthenticated" container-fluid class="white mb-0">
      <b-container>
        <b-row>
          <b-col class="col-12 text-left text-md-center mt-4 mb-4">
            <h1 class="orange">Vårt digitala scorekort</h1>
            <ScorecardExplainer ></ScorecardExplainer>
          </b-col>
        </b-row>
      </b-container>
    </b-jumbotron>
     

  </div>
</template>



<script>
import { mapGetters } from "vuex";
import { tagsMixin } from "../mixins/tagsMixin";
import AppRoundsGrafic from "./RoundsGrafic";
import Testimonials from "./Testimonials";
import Howitworks from "./Howitworks";
import ScorecardExplainer from "./ScorecardExplainer";
import Podium from "./Podium";
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

let options = {};



export default {
  mounted() {
  this.countdown();
  },
  created() {

    if (this.$route.query.sponsor === 'gm') {
      localStorage.setItem('sponsor','gm');     
    }
     

    //this.getTopListClubs();

    /* setTimeout(() => {
    this.showModal();                        
  }, 2000); */
 /*  var i;
  for (i = 0; i < this.images.length; i++) {
  this.preloadImage(this.images[i])
  } */

   //BG CHANGE 
  var bg_change = setInterval(this.changeBg, 8000);

   if (!localStorage.getItem('morethan50')) {
    this.makeToast();
    localStorage.setItem('morethan50',1)
   }

  if (!globalState.compid) {
    return  
  } else {
    this.axios
      .post(globalState.admin_url + "getCompetition", {id: globalState.compid})
      .then((response) => {

        //show modal if gamedate is today
/* 
        if (this.isAuthenticated && this.user) {
            if (this.user.teams) {
              if (this.user.teams[0].games) {
                for (var i = 0; i < this.user.teams[0].games.length; i++) {
                  if (this.user.teams[0].games[i].status==='Pending' || this.user.teams[0].games[i].status==='In progress') {
                      if (this.user.teams[0].games[i].hasOwnProperty('gamedate') && this.user.teams[0].games[i].hasOwnProperty('gametime')) {                        
                        var gamedate2 = '"' + this.user.teams[0].games[i].gamedate + '"' + " " + this.user.teams[0].games[i].gametime;
                        //let gametime = this.getgamedate2(this.user.teams[0].games[i].gamedate,this.user.teams[0].games[i].gametime);
                        var utcStart = new moment(gamedate2, "YYYY-MM-DDTHH:mm").utc();
                        //console.log(utcStart)
                        let test = moment().diff(utcStart, 'hours');
                        console.log(test);
         
                        if (test > -24 && test < 0) {
                          //this.showModal();
                          console.log('kommande match');
                          return;
                        }
                        if (test >= 0 && this.user.teams[0].games[i].status==='In progress') {
                          //this.showModal();
                          console.log('pågående match');
                          return;
                        }  
                        
                      }
                  }
                }
                
               
              }
            }
        } */
        
        //end
        
        if (!response.data.competitionmessages.length) {
          return
        }
        this.messages = response.data.competitionmessages
          .sort((a, b) => new Date(a.sortorder) - new Date(b.sortorder))
          .filter((message) => message.active === true )
      })
      .catch((error) => {
        console.log(error);
      }); 
  }     

  //Show latest team toast

  //let latestTeam = localStorage.getItem('latestTeam');
  this.latestTeam = null;
    
   this.axios
      .post(globalState.admin_url + "getLatestPaidTeam")
      .then((response) => {
          
        if (response.data) {
          
          let paidAt = moment(response.data.paidAt).add(0, 'hour').format()          
          let test = moment().diff(paidAt, 'hours');
          let regDate = moment(paidAt, "YYYY-MM-DD hh:mm").fromNow();
          //this.toast('b-toaster-top-center',response.data, paidAt);
          
          if (test < 23) {
         
            //if (paidAt !== latestTeam) {

            if (!response.data.logourl) {
              this.latestTeamLogo = 'v1573118127/matchplay/matchplay-new-logo-2020.png'; //failover matchplay logo
            } else {
              this.latestTeamLogo = response.data.logourl;
            }

            this.latestTeam = 'Ett lag från ' + response.data.coursename + ' anmäldes för ' + regDate + ' sedan av ' + response.data.teamleadername + '.';
            } else {            
              this.latestTeam = null;
            }
            //localStorage.setItem('latestTeam',paidAt);  

                //OLD TOAST, MOVED TO HERO
                /* setTimeout(() => {
                  this.toast('b-toaster-top-center',response.data, paidAt);
                  localStorage.setItem('latestTeam',paidAt);                  
                }, 1500);  */
              
              
            //}
        }
        
       
        
      })
      .catch((error) => {
        console.log(error);
      }); 
  
    
  },
  watch: {
    $route(newVal, oldVal) {
      immediate: true, (this.modalShow = newVal.meta && newVal.meta.modalShow);
    },
    modalShow: {
      handler: function () {
        if (this.modalShow === false) {
          this.$router.push({ path: "/" });
        }
      },
    },
  },
  name: "hello",
  components: {
    //'phone':VuePhoneNumberInput,
    // 'phone':VueTelInput,    ,
    AppRoundsGrafic, Testimonials, Podium, Howitworks, ScorecardExplainer
  },
  data() {
    return {
      latestTeam: null,
      latestTeamLogo: null,
      slide: 0,
      sliding: null,
      messages: null,
      showTopClubs: globalState.showTopClubs,
      modalShow: false,
      closed: globalState.closed,
      leader: "",     
       //IMAGES
      images: [
           // 'https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_auto,q_auto,e_colorize:10,co_rgb:000000/v1608122032/matchplay/MPI-1825.jpg',
            //'https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_auto,q_auto,e_colorize:10,co_rgb:000000/v1572963227/matchplay/c640cf_76573b7e69c04dc2bb0592399d738a17_mv2_d_4006_3000_s_4_2.jpg',
            //'https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_auto,q_auto,e_colorize:40,co_rgb:000000/v1608219772/matchplay/bg_matchplay.jpg',
            //'https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_auto,q_auto,e_colorize:50,co_rgb:000000/v1608122570/matchplay/IMG_1232.jpg'
            ],
      bgImageCount: 0,
      clubs: 0,
      birdies: 0,    
      showhelper: false,  
      doctitle: this.$store.state.conferencename,
      price1: globalState.price1,
      price2: globalState.price2
    };
  },

  computed: {
        ...mapGetters([
      "user",
      "isAuthenticated",
    ]) 
  },
  mixins: [tagsMixin],
  
  methods: {
    makeToast(append = false) {
        this.toastCount++
        this.$bvToast.toast('Lag från mer än 50% av Sveriges golfklubbar finns nu representerade i Matchplay 2021!', {
          title: 'Deltagarrekord!',
          autoHideDelay: 5000,
          variant:'success',
          appendToast: append
        })
      },

    countdown() {

      let parentvue = this;

  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

      let closedate = "April 30, 2021 23:59:00",
      //let closedate = "March 25, 2021 17:21:00",
      countDown = new Date(closedate).getTime(),
      x = setInterval(function() {    

        let now = new Date().getTime(),
        distance = countDown - now;
        if (document.getElementById("days")) {
          document.getElementById("days").innerText = Math.floor(distance / (day)),
          document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
          document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
          document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);
        } else {
          clearInterval(x);
        }
        //do something later when date is reached
        if (distance < 0) {         
          parentvue.closed = true;
          clearInterval(x);
        }
        //seconds
      }, 0)
  },

    getClubImage2(logourl) {
            return 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_100,q_80,c_scale/' + logourl;
      }, 
     getScorecard(id) {
      location.href = "scorecard?id=" + id;
    },
    getgamedate2: function (gamedate, gametime) {
      var gamedate2 = '"' + gamedate + '"' + " " + gametime;
      //var newdate = moment(gamedate2, "YYYY-MM-DD hh:mm").fromNow();
      var utcStart = new moment(gamedate2, "YYYY-MM-DDTHH:mm").utc();
      //console.log(utcStart)
      //console.log(moment(utcStart, "YYYY-MM-DD hh:mm").fromNow())
      return moment(utcStart, "YYYY-MM-DD hh:mm").fromNow();
    },
    preloadImage(url)
    {
      var img=new Image();
      img.src=url;
    },
    showModal() {
      //if (localStorage.getItem('earlyBirdie2021') !== '2')
      this.$refs['earlyBirdie'].show();
      //localStorage.setItem('earlyBirdie2021', '2');
    },
    toast(toaster,data, paidAt, append = false) {    
    //set delay 2-3 sekunder...
    let regDate = moment(paidAt, "YYYY-MM-DD hh:mm").fromNow();

    let logourl;
    if (!data.logourl) {
      logourl = 'v1573118127/matchplay/matchplay-new-logo-2020.png'; //failover matchplay logo
    } else {
      logourl = data.logourl;
    }

    const h = this.$createElement;
     const vNodesMsg = h(
          'p',
          { class: ['text-center', 'mb-0'] },
          [
            h('b-img', { class: ['text-center','d-block','toast-image', 'mb-3'], props: { src: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,q_80,c_scale/'+logourl } }),
            'Ett lag från ' + data.coursename + ' anmäldes för ' + regDate + ' sedan av ' + data.teamleadername + '.'
          ]
        )
//'Ett lag från ' + data.coursename + ' anmäldes för ' + regDate + ' sedan av ' + data.teamleadername + '.'
    this.$bvToast.toast([vNodesMsg], {
      title: `Nyanmälda lag till Matchplay 2021`,
      toaster: toaster,
      autoHideDelay: 6000,
      solid: true,         
      appendToast: append
    })

    },

    goRouter: function () {
      this.$router.push({ path: "line-up" });
    },      
    
    changeBg() {
      var element = this.$refs["slider"];
      if (!element) return;

      if (this.bgImageCount === 2) {
        this.bgImageCount = -1;
        element.classList.remove("herobg2");
      } else {        
  element.classList.remove("herobg"+this.bgImageCount);
      }
    
     this.bgImageCount += 1;
      element.classList.add("herobg"+this.bgImageCount);
      
    
      //console.log('count',this.bgImageCount);

     return;
     //'https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:50,co_rgb:000000/v1608122447/matchplay/IMG_1527.jpg',
            
            //console.log(this.bgImageCount,this.images.length);

            if (this.bgImageCount === this.images.length) {
              this.bgImageCount = 0;
            }
            var elem = this.$refs["slider"];
            if (elem) {
            //var randomNumber = Math.floor(Math.random() * this.images.length);            
            //var bgImg = 'url(' + this.images[randomNumber] + ')';
            var bgImg = 'url(' + this.images[this.bgImageCount] + ')';
            
            if (this.bgImageCount === 3) {
              elem.style.backgroundPosition = 'right center';
            } else {
               elem.style.backgroundPosition = 'center center';
            }

           
            elem.style.backgroundImage = bgImg;
            this.bgImageCount += 1;

            }

    },
    
  },

};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/variables.scss";


.stats {
    background: lighten($blue, 5%);
    border-radius:0.2em;
    color:#FFF;
    border: 1px solid darken(#999, 3%);
}

.stats label {
    font-size:0.7em;
    text-transform:uppercase;
    border-bottom: 1px solid white;
}

.stats span {
    font-size:2em;
}

                .timenumbers {
                    display: block;
                    font-size: 2rem;
                    font-weight: 600;
                    line-height:100px;
                    margin: 0 auto;
                    text-align: center;
                    @media (min-width: 500px) {
                        font-size:2rem;
                    }
                }

                .timenumbers {
                  border-radius:50%;
                  border-width: 5px;
                  border-color: rgba(0,0,0,0.3);
                  border-style: solid;
                  color:#000;
                  width:100px;
                  height:100px;
                  background: rgba(255,255,255,0.7);
                  
                 
                }

                p.timedescription {
                    font-size: 1.2rem;
                    font-variant: small-caps;
                    line-height: 1.5rem;
                    margin: 0 auto;
                    text-align: center;
                    position: relative;
                    top: 5px;
                     @media (min-width: 500px) {
                        font-size:1rem;
                    }
                }


.toast-image {
  max-width: 100px;
  margin: 0 auto;
}

.no1 {
  background-color: $gold;
}

p.inactive-round {
  text-decoration: line-through;
}

.smaller {
  font-size: 0.9em;
}

.result {
  line-height: 4em;
}

.homeleader {
  background-color: $team1;
}

.awayleader {
  background-color: $team2;
}

.red {
  color: red;
}

.green {
  color: #33cc33 !important;
}

.game {
  @media (max-width: 575px) {
    font-size: 0.8em;
  }
}

.game i.missing {
  font-size: 16px;
  color: red;
}

.greybg {
  background: #f6f6f6;
  border-radius: 0.3em;
}

.hometeam,
.awayteam {
  text-transform: uppercase;
}

.gameheader {
  font-size: 1.2em;
  text-transform: uppercase;
}

.box {
  border: none;
  border-radius: 0.3em;
  padding: 1em 1em 1em 1em;
  font-size: 0.8em;

  /*
    border-radius: .3em;
    border: none;
     background-color: #0f70b7;
    color: #fff;   
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: cover;
    box-shadow: 2px 2px 5px 0 rgba(0,0,0,.27);*/
}

.hometeam span,
.awayteam span {
  display: block;
}

.left-line {
  border-left: 1px solid #e6e6e6;
}

img {
  max-width: 100%;
}
.theme {
  padding: 10rem 0 5rem 0;
  margin-top: -100px;
  background: url(https://res.cloudinary.com/oredev/image/upload/f_auto,q_65/2019/html/background-1.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  /*height: 900px;*/
  @media (max-width: 1450px) {
    /*height: 650px;*/
    padding: 8rem 0 3rem 0;
  }
  @media (max-width: 1200px) {
    /*height: 600px;*/
  }
  @media (max-width: 991px) {
    /*height: 480px;*/
    padding: 5rem 0 3rem 0;
  }
  @media (max-width: 767px) {
    margin-top: -20px;
    background-size: 150%;

    padding: 1.5rem 0 1.5rem 0;
    /*padding-bottom: 40px;*/
  }
  @media (max-width: 575px) {
    background-size: 200%;
    overflow: hidden;
  }
}
.theme .container {
  @media (max-width: 575px) {
    width: 100%;
    padding: 0;
    margin: 0;
  }
}
.theme img {
  /*margin-top: 200px;*/
  width: 80%;
  @media (max-width: 2000px) {
    /*margin-top: 130px;*/
    width: 65%;
  }
  @media (max-width: 1450px) {
    /*margin-top: 130px;*/
    width: 60%;
  }
  @media (max-width: 991px) {
    /*margin-top: 100px;*/
    width: 80%;
  }
  @media (max-width: 767px) {
    /*margin-top: 30px;*/
    width: 100%;
  }
  @media (max-width: 575px) {
    width: 120% !important;
    max-width: 120% !important;
    margin-left: -10%;
  }
}
.theme h2 {
  color: #fff;
  margin: 40px 0 0 0;
  @media (max-width: 767px) {
    font-size: 1.3rem;
    margin-top: 30px;
  }
  @media (max-width: 567px) {
    font-size: 1rem;
  }
}

.btn-special {
  height: calc(1.5em + 1rem + 8px);
  margin-top: 0 !important;
}

.bg1,
.bg2 {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right 0px top 50%;
  height: 200px;
  width: 100%;
}

.bg1 {
  background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1200,q_70,e_colorize:30,co_rgb:000000/v1572963227/matchplay/c640cf_76573b7e69c04dc2bb0592399d738a17_mv2_d_4006_3000_s_4_2.jpg);
}

.bg2 {
  background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1200,q_70,e_colorize:30,co_rgb:000000/v1608122032/matchplay/MPI-1825.jpg);
}

.hero {
  //background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1572963227/matchplay/c640cf_76573b7e69c04dc2bb0592399d738a17_mv2_d_4006_3000_s_4_2.jpg);
  //background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1608122032/matchplay/MPI-1825.jpg);
  //background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1608122246/matchplay/22092018-MGZ_1827.jpg);
  //background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:50,co_rgb:000000/v1608122447/matchplay/IMG_1527.jpg);
  //background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1200,q_70,e_colorize:50,co_rgb:000000/v1608122570/matchplay/IMG_1232.jpg);
  background-repeat: no-repeat;
  /*background-position: bottom 30% right 0;*/
  background-size: cover;
  color: #fff;
  padding: 180px 0 180px 0;
  background-position: right center;
  @media (min-width: 320px) {
    padding: 2rem 0 2rem 0;
    /*background-position: bottom 10% right 0;*/
  }
  @media (min-width: 480px) {
    padding: 6rem 0 6rem 0;
    /*background-position: bottom 0% left 0;*/
  }
  @media (min-width: 768px) {
    /*background-position: bottom 32% right 0;*/
  }

  @media (min-width: 992px) {
    /*background-position: bottom 51% right 0;*/
  }

  @media (min-width: 1200px) {
    /*background-position: bottom 55% right 0;*/
  }

  -webkit-transition: all 1s linear;
  -moz-transition: all 1s linear;
  -ms-transition: all 1s linear;
  -o-transition: all 1s linear;
  transition: all 1s linear;
}

.hero2 {
  //background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1572963227/matchplay/c640cf_76573b7e69c04dc2bb0592399d738a17_mv2_d_4006_3000_s_4_2.jpg);
  //background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1608122032/matchplay/MPI-1825.jpg);
  //background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1608122246/matchplay/22092018-MGZ_1827.jpg);
  //background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:50,co_rgb:000000/v1608122447/matchplay/IMG_1527.jpg);
  background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1200,q_70,e_colorize:50,co_rgb:000000/v1608122570/matchplay/IMG_1232.jpg);
  background-repeat: no-repeat;
  /*background-position: bottom 30% right 0;*/
  background-size: cover;
  color: #fff;
  padding: 180px 0 180px 0;
  background-position: right 0px top 50%;
  @media (min-width: 320px) {
    padding: 2rem 0 5rem 0;
    /*background-position: bottom 10% right 0;*/
  }
  @media (min-width: 480px) {
    padding: 6rem 0 6rem 0;
    /*background-position: bottom 0% right 0;*/
  }
  @media (min-width: 768px) {
    /*background-position: bottom 32% right 0;*/
  }

  @media (min-width: 992px) {
    /*background-position: bottom 51% right 0;*/
  }

  @media (min-width: 1200px) {
    /*background-position: bottom 55% right 0;*/
  }
}

.herobg0, .herobg1, .herobg2 {
  background-size: cover !important;
   background-repeat: no-repeat !important;
}

.herobg0 {
   background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1200,q_auto,e_colorize:50,co_rgb:000000/v1608122570/matchplay/IMG_1232.jpg);
   background-position: right center;
}

.herobg1 {
  background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1200,q_auto,e_colorize:50,co_rgb:000000/v1608219772/matchplay/bg_matchplay.jpg);
   background-position: center center;
}

.herobg2 {
  background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1200,q_auto,e_colorize:50,co_rgb:000000/v1608122032/matchplay/MPI-1825.jpg);
  background-position: center center;
}

.hero h2 {
  color: #fff;
  font-family: "Eurostile LT Std Demi", Arial, sans-serif;
  font-weight: normal;
  font-style: normal;
}

.step {
  border-radius: 0.3em;
  border: 1px solid #e1e1e1;
  padding: 1em;
  min-height: 380px;
  text-align: center;
}

.step i {
  font-size: 3em;
  text-align: center;
  margin: 0 0 20px 0;
  color: #fd9b37;
}

.step p {
  text-align: left;
  font-size: 0.8em;
  margin: 20px 0 0 0;
}

.step:hover {
  background: #f6f6f6;
}

@media (max-width: 576px) {
  h3 {
    font-size: 1.3rem !important;
  }

  h4 {
    font-size: 1.1rem !important;
  }

  h5 {
    font-size: 1.2rem !important;
  }

  .step {
    min-height: auto;
  }

  h5 {
    font-size: 1rem !important;
  }
}

@media (max-width: 767px) {
  .small-tabs {
    font-size: 0.8em;
  }
}
</style>
