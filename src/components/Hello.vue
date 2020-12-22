<template>  
    <div>       

    <vue-headful :title="doctitle" />
    <div class="hidden theme text-center">
      <div class="container">
        <h2 class="when">Matchplay 2021</h2>
      </div>
    </div>

    <b-modal ref="earlyBirdie" id="earlyBirdie" title="Early Birdie?" size="md" ok-only ok-variant="secondary" ok-title="Cancel">
    <p>
      Bland de första 50 registrerade och betalda lagen lottar vi ut en golfweekend till Lydinge Resort (Skåne) med 3-rätters middag, övernattning och greenfee för 2 personer.</p><p>Det vinnande laget meddelas per mail samt på våra sociala konton.
    </p>
    <p class="text-center d-block d-md-none">      
      <img src="https://res.cloudinary.com/dn3hzwewp/image/upload/h_200/v1608315326/matchplay/Early_Birdie_2021_mobil.jpg" />
    </p>   
    <p class="text-center d-none d-md-block">      
      <img src="https://res.cloudinary.com/dn3hzwewp/image/upload/h_300/v1608315326/matchplay/Early_Birdie_2021_mobil.jpg" />
    </p>
     <b-button class="mt-3" block @click="$bvModal.hide('earlyBirdie')">Tack för infon!</b-button>
     <template #modal-footer="{ ok, cancel, hide }">      
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-button hidden size="sm" variant="success" @click="ok()">
        OK
      </b-button>
      <b-button hidden size="sm" variant="danger" @click="cancel()">
        Tack för infon!
      </b-button>
      <!-- Button with custom close trigger value -->
      <b-button hidden size="sm" variant="outline-secondary" @click="hide('forget')">
        Forget it
      </b-button>
    </template>
  </b-modal>


     <b-modal ref="scorecard" v-model="modalShow" ok-only size="lg">
      <router-view> </router-view>
    </b-modal>
       
    <div class="hero" ref="slider">      
      <b-container class="d-flex pl-4 pr-4">
 
        <b-row>
          <b-col class="col-12 col-md-12 mt-4">            
            <h2>VÄLKOMMEN TILL MATCHPLAY 2021, GOLFTÄVLINGEN FÖR BÅDE PRIVATPERSONER OCH FÖRETAG</h2>
          </b-col>
      
          <b-col class="col-12 col-md-8">
            <p class="mt-3 mt-md-0">Matchplay är en matchspelstävling för par med officiellt handikapp. Par kan vara män, kvinnor eller mix. Tävlingen spelas i Sverige på golfklubbar anslutna till Svenska Golfförbundet.</p>
            <p v-if="!closed">Tävlingen spelas mellan maj-september i olika omgångar fram till Sverigefinalen och sedan vidare utomlands!</p>
            <p hidden v-if="!closed">2020 spelades 358 matcher på nästan 100 golfklubbar.</p>
             <p hidden v-if="closed">I helgen (30-31 maj) lottas första omgången. Den 1 juni startar tävlingen!</p>
            
             <div class="buttons text-left">
                <router-link v-if="!closed && !isAuthenticated" class="btn blue-bg btn-md text-white mt-2 mr-2" to="/register">Anmälan</router-link>
              <a hidden v-if="!isAuthenticated" href="/register" class="btn blue-bg btn-md text-white mt-2 mr-2">Anmälan</a>
              <a v-if="!isAuthenticated" href="#more" class="btn blue-bg btn-md text-white mt-2 mr-2">Vill du veta mer?</a>
              <router-link v-if="isAuthenticated" class="btn blue-bg btn-md text-white mt-2 mr-2" to="/mymatchplay">Lag- och matchhantering</router-link>
              <a hidden v-if="isAuthenticated" href="/mymatchplay" class="btn blue-bg btn-md text-white mt-2">Lag- och matchhantering</a>
              <a hidden href="/register" class="btn btn-warning btn-md text-white mt-2">Efterhandsregistrera spelare</a>
            </div>
            
            <!-- ALERTS FRÅN BACKEND -->
            <b-alert class="mt-4 smaller" :variant=message.variant show v-for="message in messages" :key=message.index> <h6>{{message.title}} </h6>  <span v-html="message.message"></span></b-alert>



            <b-alert  class="mt-4 smaller" variant="warning">
                Tävlingen startar den 3:e maj 2021 men anmäl ditt lag redan nu!                
                För mer uppdaterad information håll koll på <a href="https://www.facebook.com/matchplaysweden/" target="_blank">Facebook</a> och <a href="https://www.instagram.com/matchplay_sweden/" target="_blank">Instagram</a>.
             </b-alert>

            <b-alert v-if="closed" hidden class="mt-4 small" variant="warning">
                Alla matcher är lottade och omgång 1 spelas mellan 1-14 juni!  <a href="#games">Se matcher längre ner!</a>
                <!-- håll koll via <a href="https://www.facebook.com/pg/matchplaybusines" target="_blank">Facebook</a> och <a href="https://www.instagram.com/matchplaybusiness/" target="_blank">Instagram</a> -->
             </b-alert>

              <b-alert v-if="closed" hidden class="mt-4 small" variant="warning">
                Omgång 2 lottas under måndagen den 15 juni, håll utkik här på hemsidan eller på <a href="https://www.facebook.com/matchplaysweden/">facebook</a> för uppdateringar om nya matcher och speldatum för nästa omgång!
                <!-- håll koll via <a href="https://www.facebook.com/pg/matchplaybusines" target="_blank">Facebook</a> och <a href="https://www.instagram.com/matchplaybusiness/" target="_blank">Instagram</a> -->
             </b-alert>


              <b-alert v-if="closed" hidden class="mt-4 small" variant="warning">
                Omgång 3 lottas under måndagen den 6 juli, håll utkik här på hemsidan eller på <a href="https://www.facebook.com/matchplaysweden/">facebook</a> för uppdateringar om nya matcher och speldatum för nästa omgång!
                <!-- håll koll via <a href="https://www.facebook.com/pg/matchplaybusines" target="_blank">Facebook</a> och <a href="https://www.instagram.com/matchplaybusiness/" target="_blank">Instagram</a> -->
             </b-alert>

             <b-alert v-if="closed" hidden class="mt-4 small" variant="warning">
                Omgång 3 (huvudtävlingen och andra chansen) spelas mellan 6/7 - 19/7. <a href="#games">Se matcher längre ner!</a>
                Nyheter och aktuell info om tävlingen ses bäst på vår <a href="https://www.facebook.com/matchplaysweden/">facebooksida</a>.
                <!-- håll koll via <a href="https://www.facebook.com/pg/matchplaybusines" target="_blank">Facebook</a> och <a href="https://www.instagram.com/matchplaybusiness/" target="_blank">Instagram</a> -->
             </b-alert>

              <b-alert v-if="closed" hidden class="mt-4 small" variant="warning">
                Omgång 4 (huvudtävlingen och andra chansen) spelas mellan 20/7 - 3/8. <a href="#games">Se matcher längre ner!</a>
                Nyheter och aktuell info om tävlingen ses bäst på vår <a href="https://www.facebook.com/matchplaysweden/">facebooksida</a>.
                <!-- håll koll via <a href="https://www.facebook.com/pg/matchplaybusines" target="_blank">Facebook</a> och <a href="https://www.instagram.com/matchplaybusiness/" target="_blank">Instagram</a> -->
             </b-alert>

              <b-alert v-if="closed" hidden class="mt-4 small" variant="warning">
                Omgång 5 (huvudtävlingen och andra chansen) spelas mellan 4/8 - 18/8. <a href="#games">Se matcher längre ner!</a>
                Nyheter och aktuell info om tävlingen ses bäst på vår <a href="https://www.facebook.com/matchplaysweden/">facebooksida</a>.
                <!-- håll koll via <a href="https://www.facebook.com/pg/matchplaybusines" target="_blank">Facebook</a> och <a href="https://www.instagram.com/matchplaybusiness/" target="_blank">Instagram</a> -->
             </b-alert>

              <b-alert v-if="closed" hidden class="mt-4 small" variant="warning">
                <strong>8 lag</strong> återstår nu i resp spår av tävlingen (HT och AC). Omgång 6 (huvudtävlingen och andra chansen) spelas mellan 19/8 - 2/9. <a href="#games">Se matcher längre ner!</a>
                Nyheter och aktuell info om tävlingen ses bäst på vår <a href="https://www.facebook.com/matchplaysweden/">facebooksida</a>.
                <!-- håll koll via <a href="https://www.facebook.com/pg/matchplaybusines" target="_blank">Facebook</a> och <a href="https://www.instagram.com/matchplaybusiness/" target="_blank">Instagram</a> -->
             </b-alert>

              <b-alert v-if="closed" hidden class="mt-4 small" variant="warning">
                <strong>4 lag</strong> återstår nu i resp spår av tävlingen (HT och AC). Omgång 7 (huvudtävlingen och andra chansen) spelas mellan 1/9 - 15/9. <a href="#games">Se matcher längre ner!</a>
                <br><br>Omgång 8 (Sverigefinalen) spelas på Allerum GK 23-24 oktober. Se mer info längre ner.
                Nyheter och aktuell info om tävlingen ses bäst på vår <a href="https://www.facebook.com/matchplaysweden/">facebooksida</a>.
                <!-- håll koll via <a href="https://www.facebook.com/pg/matchplaybusines" target="_blank">Facebook</a> och <a href="https://www.instagram.com/matchplaybusiness/" target="_blank">Instagram</a> -->
             </b-alert>

              <b-alert v-if="closed" hidden class="mt-4 small" variant="warning">
                <p><strong>Lagen som är vidare till Sverigefinalen är nu utsedda!</strong></p><p> I huvudtävlingen är CARNOR/WEDIN och IDLING/ANDERSSON vidare. I andra chansen är CHRISTIANSSON/NILESKÄR och THURESON/DAHL vidare.</p>
                Se mer info om Sverigefinalen längre ner. Nyheter och aktuell info om tävlingen ses bäst på vår <a href="https://www.facebook.com/matchplaysweden/">facebooksida</a>.
                <!-- håll koll via <a href="https://www.facebook.com/pg/matchplaybusines" target="_blank">Facebook</a> och <a href="https://www.instagram.com/matchplaybusiness/" target="_blank">Instagram</a> -->
             </b-alert>

              <b-alert v-if="closed" show class="mt-4 small" variant="warning">
                <h4>LAGEN TILL FINALEN I SPANIEN ÄR KLARA</h4>Efter 358 spelade matcher på nästan 100 golfklubbar runtom i Sverige har vi nu korat vinnarna till Spanienfinalen!<br>Grattis till Joel Carnor/Emma Wedin samt Kim Christiansson/Martin Nileskär! Se mer info längre ner om vinnarna och finalresan.
                <!-- håll koll via <a href="https://www.facebook.com/pg/matchplaybusines" target="_blank">Facebook</a> och <a href="https://www.instagram.com/matchplaybusiness/" target="_blank">Instagram</a> -->
             </b-alert>
           
             <div hidden v-if="!closed" class="mt-4">
            <h3 class="mb-3 text-center">Anmälan stänger om</h3>
            <appCountdown deadline="2021-04-30 23:59:00"></appCountdown>
             </div>

             <b-alert v-if="!closed" hidden class="mt-4 small" variant="warning">
                Start för tävlingen och sista anmälningsdag är ändrad! Tävlingen startar 1 juni och sista dagen för anmälan är 27:e maj. <a href="https://www.facebook.com/pg/matchplaysweden/posts/?ref=page_internal">Läs mer här</a>
                <span hidden><strong>OBS!</strong> Alla anmälda lag får tröjor från PING men vill man vara säker på att ha dom till matchstart i början av maj så måste man anmäla laget innan 1 april.</span>               
                <!-- håll koll via <a href="https://www.facebook.com/pg/matchplaybusines" target="_blank">Facebook</a> och <a href="https://www.instagram.com/matchplaybusiness/" target="_blank">Instagram</a> -->
             </b-alert>
             <b-alert hidden class="mt-4 small" variant="danger">
                Utvecklarna har kollat på Presidents cup hela natten så releasen blir lite senare under kvällen idag eller eventuellt imorgon förmiddag.
                Håll koll via <a href="https://www.facebook.com/matchplaysweden/" target="_blank">Facebook</a> och <a href="https://www.instagram.com/matchplay_sweden/" target="_blank">Instagram</a>.
             </b-alert>

      
           
          </b-col>

           <b-col class="col-12 d-block d-md-none pl-2 justify-content-center align-self-center p-5">           
          
            <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/e_colorize,co_rgb:fff/v1573118127/matchplay/matchplay-new-logo-2020.png" alt=""></b-img>
          </b-col>
       
       
          <b-col class="col-md-4 d-none d-md-block pl-2 justify-content-center align-self-center p-3">           
          
            <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/e_colorize,co_rgb:fff/v1573118127/matchplay/matchplay-new-logo-2020.png" alt=""></b-img>
          </b-col>
         
        

        </b-row>
       
       

   
     
    

      </b-container>
    </div>
<!-- TEMP HIDDEN -->  

<b-jumbotron container-fluid class="white">    
      <b-container >
        <b-row v-if="!isAuthenticated">
          <b-col class="col-12">        
            <h3 v-if="!closed" class="teaser-header orange mb-3">Anmäl ditt lag till Matchplay 2021</h3>
            <p>Hela tävlingen är numera digitaliserad där vi kontrollerar Golf-ID, hcp, slope mm för att kunna applicera våra hcputräkningar inför varje match. Ni använder vårt digitala scorekort för att föra score och vänner/familj kan följa matcherna live!</p>
            <p>Anmälningskostnad per lag är <strong>{{price1}} kr</strong> för privatpersoner och <strong>{{price2}} kr</strong> (exkl. moms) för företag.</p>
            <router-link class="btn blue-bg btn-md text-white mt-2 mr-2" to="/register"><i class="pb-1 mr-2 material-icons">thumb_up</i>Steg 1 - Kontroll av Golf-ID</router-link>
          </b-col>
        </b-row>

        <b-row v-if="isAuthenticated && user">
          <b-col class="col-12">
            <h3 class="teaser-header orange mb-3">Hej {{user.firstname}}!</h3>
            <p v-if="user.teams">Du har redan skapat ett lag och kan hantera det  <router-link to="/mymatchplay">här</router-link>. Lycka till i tävlingen!</p>
            <p v-if="!user.teams">Du har ännu inget lag i Sveriges roligaste golftävling, skapa ett på knappen nedan.</p>            
            <p v-if="!user.teams[0].paid">Anmälningskostnad per lag är <strong>{{price1}} kr</strong> för privatpersoner och <strong>{{price2}} kr</strong> (exkl. moms) för företag.</p>           
            <router-link v-if="!user.teams" class="btn blue-bg btn-md text-white mt-2 mr-2" to="/mymatchplay">Skapa ett lag</router-link>
          </b-col>
        </b-row>

        <b-row>
          <b-col class="col-12 mt-3">
            <hr />    
            <p class="mt-4">Se till att följa oss på våra <strong>sociala medier</strong> för nyheter och tävlingar kring tävlingen!</p>
          </b-col>
          <b-col class="col-12">
            <a class="btn orange-bg btn-md text-white mt-2 mr-md-2" href="https://www.facebook.com/matchplaysweden/" target="_blank"><i class="material-icons mr-2">facebook</i>Facebook</a>
            <a class="btn orange-bg btn-md text-white mt-2" href="https://www.instagram.com/matchplay_sweden/" target="_blank"><i class="material-icons mr-2">camera_alt</i>Instagram</a>
          </b-col>
        </b-row>



      </b-container>
</b-jumbotron>

 <b-jumbotron container-fluid>
   <b-container>
     <h3 class="teaser-header orange mb-3">Dubbelt så stor Sverigefinal</h3>
               <b-row>
                 <b-col class="col-12 col-md-8">
              <p>Åtta lag går till Sverigefinalen som spelas 3-5 september på Allerum Golfklubb, strax utanför Helsingborg. Hotell inklusive frukost, inspel, semifinal och för de fyra vinnande lagen blir det final på söndagen. Bankett på lördagskvällen för de 8 deltagande lagen. De två lagen som vinner respektive match på söndagen blir bjudna på den stora finalen på Los Naranjos i Spanien.</p>
                 </b-col>
                 <b-col class="col-12 col-md-4 text-center mt-3 mt-md-0">
                   <img src="https://res.cloudinary.com/dn3hzwewp/image/upload/h_200/v1599032379/matchplay/logo.png" />
                 </b-col>
               </b-row>
   </b-container>
  </b-jumbotron>

  <b-jumbotron container-fluid class="white">
   <b-container>    
               <b-row>
                 <b-col class="col-12">
                   <h3 class="orange">Varför tycker du om att tävla med Matchplay?</h3>
               <testimonials number=5></testimonials>
                 </b-col>
               </b-row>
   </b-container>
  </b-jumbotron>

  <b-jumbotron hidden container-fluid >
   <b-container>    
               <b-row>
                 <b-col class="col-12">
                    <h3 class="teaser-header orange mb-4">Anmälda lag per klubb</h3>
               <podium></podium>
                 </b-col>
               </b-row>
   </b-container>
  </b-jumbotron>

  <b-jumbotron container-fluid >
   <b-container>    
               <b-row>
                 <b-col class="col-12">
                    <h3 class="teaser-header orange">Finalparen från Matchplay 2020 klara för Spanien</h3>
                       <p>Vi säger stort grattis till våra finalpar som är klara för den stora Matchplayfinalen på Los Naranjos i Spanien mellan den 7-11 februari 2021.<br>
                       </p>                       
                 </b-col>
               </b-row>
               <b-row>
                 <b-col class="col-12 col-md-6">                         
                          <img class="" :src="`https://res.cloudinary.com/dn3hzwewp/image/upload/v1603714880/matchplay/matchplay_final1.png`">
                          <p class="mt-1">Joel Carnor & Emma Wedin</p><a target="_blank"  class="btn blue-bg btn-md text-white mt-0" href="https://fb.watch/1mv7rhBfNC/">länk till segerintervju</a>
                       </b-col>
                         <b-col class="col-12 col-md-6 pt-3 pt-md-0">                         
                          <img class="" :src="`https://res.cloudinary.com/dn3hzwewp/image/upload/v1603714880/matchplay/matchplay_final2.png`">
                         <p class="mt-1">Kim Christiansson & Martin Nileskär</p><a target="_blank" class="btn blue-bg btn-md text-white mt-0" href="https://fb.watch/1mveFbmDox/">länk till segerintervju</a>
                       </b-col>
               </b-row>
   </b-container>
  </b-jumbotron>

  <b-jumbotron container-fluid class="white">
   <b-container>    
               <b-row>
                 <b-col class="col-12">
                    <h3 class="orange">SÅ HÄR FUNGERAR DET</h3>
              <p>Matchplay spelas 2021 i hela Sverige och är en tävling för 2-mannalag (herr, dam eller mixed). Officiellt HCP krävs för att delta. Tävlingsformen är 4-boll, Match/Bästboll. Beroende på antal anmälda lag kommer det bli 6-7 omgångar fram till Sverigefinalen. Varje omgång spelas inom 2 veckor där det vinnande laget går vidare i tävlingen.</p>
                <p>Ta er till Sverigefinalen och upplev en magisk helg med Matchplay 3-5 september 2021! Sverigefinalen görs upp mellan de åtta bästa lagen på Allerum Golfklubb strax utanför Helsingborg. Hotell, frukost, all golf samt en bankett på kvällen ingår. De 2 bästa lagen i Sverigefinalen åker med Matchplay till Spanska solkusten för att göra upp om titeln. Flyg, hotell och allt spel ingår för de bägge lagen.
                </p>
                <p>
                  Priset för deltagande i tävlingen är {{price1}}:-/lag för privatpersoner och {{price2}}:-/lag (exkl. moms) för företag. Varje lag är garanterat minst 2 matcher.
                </p>


                 <app-rounds-grafic hidden class="mt-5" style="height: 300px" linecolor="#808080" opacity="1"></app-rounds-grafic>

                 </b-col>
               </b-row>
                 <b-row class="mt-5">
          <b-col class="col-12 col-md-4 p-2">            
            <div class="step">
            <i class="material-icons">assignment_turned_in</i>
            <h5>Registrering</h5>
            <p>Börja med att skriva in ditt Golf-ID på matchplay.se där du direkt får besked om du är kvalificerad. Ha din lagkamrats Golf-ID tillhands. Du blir sedan direkt inloggad för att påbörja ditt lagbygge.</p>            
            </div>
          </b-col>

          <b-col class="col-12 col-md-4 p-2"> 
            <div class="step">
            <i class="material-icons">supervised_user_circle</i>
            <h5>Laganmälan</h5>
            <p>Nu ska du som lagkapten skapa ditt lag och väljer typ av lag (privat/företag) och lagmedlem. Laget blir inte aktivt förrens du har betalat med swish (privatpersoner), voucher eller faktura (företag).</p>
            </div>
          </b-col>

         <b-col class="col-12 col-md-4 p-2">
           <div class="step">
            <i class="material-icons">ballot</i>
            <h5>Lottning</h5>
            <p>Under maj görs lottningen för den första omgången och där det tas hänsyn till att alla lag ska få så kort resa som möjligt. Du kommer få information via mail samt på matchplay.se när lottningen är klar och du kan då se vilket lag ni kommer möta.</p>
            </div>
          </b-col>

          <b-col class="col-12 col-md-4 p-2">
            <div class="step">
              <i class="material-icons">sports_golf</i>
            <h5>Spela matcher</h5>
            <p>Varje match måste spelas inom den period som anges för den lottande omgången. På matchplay.se kommer du kunna se vilket lag ni ska möta samt kontaktuppgifter. När tid och plats är avgjord spelas matchen inom den tidsram som sätts. Använd vårt digitala scorekort där all information räknas ut automatiskt som HCP mm.</p>
            </div>
          </b-col>

          <b-col class="col-12 col-md-4 p-2">
            <div class="step">
              <i class="material-icons">golf_course</i>
            <h5>Sverigefinal</h5>
            <p>2021 gör vi Sverigefinalen dubbelt så stor med åtta lag som spelas den 3-5 september på Allerum Golfklubb, strax utanför Helsingborg. Hotell, frukost, all golf samt en bankett på kvällen ingår.</p>
            </div>
          </b-col>

          <b-col class="col-12 col-md-4 p-2">
            <div class="step">
              <i class="material-icons">flight_takeoff</i>
            <h5>Finalen</h5>
            <p>De 2 vinnande lagen i Sverigefinalen åker med Matchplay till Spanska solkusten för att göra upp om titeln. Flyg, hotell och allt spel ingår för de bägge lagen.</p>
            </div>
          </b-col>

         <b-col class="col-12 mt-4">
           <router-link class="btn blue-bg btn-md text-white mt-2 mr-2" to="/register">Anmälan</router-link>
           <router-link class="btn blue-bg btn-md text-white mt-2 mr-2" to="/info">Läs mer här</router-link>
                     <a hidden v-if="!closed" href="/register" class="btn blue-bg btn-md text-white mr-2">Anmälan</a>        
                     <a hidden href="/info" class="btn blue-bg btn-md text-white">Läs mer här</a>
         </b-col>

      </b-row>
   </b-container>
  </b-jumbotron>

  </div>
</template>



<script>
import { mapGetters } from "vuex";
import { tagsMixin } from "../mixins/tagsMixin";
import FlipCountdown from "./FlipCountdown";
import AppRoundsGrafic from "./RoundsGrafic";
import Testimonials from "./Testimonials";
import Podium from "./Podium";
import { globalState } from "../main.js";

let options = {};



export default {
  created() {

    //this.getTopListClubs();

    /* setTimeout(() => {
    this.showModal();                        
  }, 2000); */
  var i;
  for (i = 0; i < this.images.length; i++) {
  this.preloadImage(this.images[i])
  }

   //BG CHANGE 
   var bg_change = setInterval(this.changeBg, 7000);

  //this.toast('b-toaster-top-right');

  if (!globalState.compid) {
    return  
  } else {
    this.axios
      .post(globalState.admin_url + "getCompetition", {id: globalState.compid})
      .then((response) => {
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
    appCountdown: FlipCountdown,
    AppRoundsGrafic, Testimonials, Podium
  },
  data() {
    return {
      messages: null, 
      modalShow: false,
      closed: false,
      leader: "",
       //IMAGES
      images: [
            'https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1608122032/matchplay/MPI-1825.jpg',
            'https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1572963227/matchplay/c640cf_76573b7e69c04dc2bb0592399d738a17_mv2_d_4006_3000_s_4_2.jpg',
            'https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:40,co_rgb:000000/v1608219772/matchplay/bg_matchplay.jpg',
            'https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:50,co_rgb:000000/v1608122570/matchplay/IMG_1232.jpg'
            ],

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
    toast(toaster, append = false) {    
    
    this.$bvToast.toast(`Early Birdie är över, vinnarna av en golfweekend meddelas per mail samt på Facebook/Instagram. Följ oss där för fler tävlingar och utlottningar fram till tävlingsstart i maj!`, {
      title: `Early Birdie`,
      toaster: toaster,
      autoHideDelay: 12000,
      solid: true,         
      appendToast: append
    })

    localStorage.setItem('earlyBirdie2021_1','1')

    },

    goRouter: function () {
      this.$router.push({ path: "line-up" });
    },      
    
    changeBg() {
     
     //'https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:50,co_rgb:000000/v1608122447/matchplay/IMG_1527.jpg',

            var images2=['https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1608122032/matchplay/MPI-1825.jpg',
            'https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1572963227/matchplay/c640cf_76573b7e69c04dc2bb0592399d738a17_mv2_d_4006_3000_s_4_2.jpg',
            'https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:40,co_rgb:000000/v1608219772/matchplay/bg_matchplay.jpg',
            'https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:50,co_rgb:000000/v1608122570/matchplay/IMG_1232.jpg'

            ];

            var elem = this.$refs["slider"];
            if (elem) {
            var randomNumber = Math.floor(Math.random() * this.images.length);
            var bgImg = 'url(' + this.images[randomNumber] + ')';
            //elem.style.opacity = 100;
            elem.style.backgroundImage = bgImg;
            }

    },
    
  },

};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/variables.scss";

.jumbotron {
  border-radius:0;
}

.jumbotron.white {
  background-color:#fff;
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

.bg1, .bg2 {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right 0px top 50%;
  height:200px;
  width:100%;
}

.bg1 {
  background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1572963227/matchplay/c640cf_76573b7e69c04dc2bb0592399d738a17_mv2_d_4006_3000_s_4_2.jpg);
}

.bg2 {
  background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1608122032/matchplay/MPI-1825.jpg);
}

.hero {
  //background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1572963227/matchplay/c640cf_76573b7e69c04dc2bb0592399d738a17_mv2_d_4006_3000_s_4_2.jpg);
  //background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1608122032/matchplay/MPI-1825.jpg);
  //background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1608122246/matchplay/22092018-MGZ_1827.jpg);
  //background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:50,co_rgb:000000/v1608122447/matchplay/IMG_1527.jpg);
  background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:50,co_rgb:000000/v1608122570/matchplay/IMG_1232.jpg);
  background-repeat: no-repeat;
  /*background-position: bottom 30% right 0;*/
  background-size: cover;
  color: #fff;
  padding: 180px 0 180px 0;
  background-position: center center;
  @media (min-width: 320px) {
    padding: 2rem 0 5rem 0;
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
  
  -webkit-transition: all 1.5s ease-in-out;
  -moz-transition: all 1.5s ease-in-out;
  -ms-transition: all 1.5s ease-in-out;
  -o-transition: all 1.5s ease-in-out;
  transition: all 1.5s ease-in-out;

}





.hero2 {
  //background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1572963227/matchplay/c640cf_76573b7e69c04dc2bb0592399d738a17_mv2_d_4006_3000_s_4_2.jpg);
  //background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1608122032/matchplay/MPI-1825.jpg);
  //background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1608122246/matchplay/22092018-MGZ_1827.jpg);
  //background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:50,co_rgb:000000/v1608122447/matchplay/IMG_1527.jpg);
  background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:50,co_rgb:000000/v1608122570/matchplay/IMG_1232.jpg);
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

.come {
  /*background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_2390/v1572963227/matchplay/c640cf_76573b7e69c04dc2bb0592399d738a17_mv2_d_4006_3000_s_4_2.jpg);*/
  background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/v1573316365/matchplay/Henke.png);

  background-repeat: no-repeat;
  /*background-position: bottom 30% right 0;*/
  background-size: contain;
  color: #fff;
  padding: 180px 0 180px 0;
  background-position: right 0px bottom;
  @media (min-width: 320px) {
    padding: 15rem 0 5rem 0;
    /*background-position: bottom 10% right 0;*/
  }
  @media (min-width: 480px) {
    padding: 12rem 0 5rem 0;
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
.hero h2 {
  color: #fff;
  font-family: "Eurostile LT Std Demi", Arial, sans-serif;
  font-weight: normal;
  font-style: normal;
}

.come h2,
.come a {
  text-transform: uppercase;
}
.come button,
.come a {
  padding: 20px;
  margin: 0 10px;
}

.come .buttons {
  margin: 40px 0 0 0;
}
.ticket h2 {
  text-transform: uppercase;
  display: inline-block;
  color: $pink;
}
.ticket img {
  display: inline-block;
  margin: 0 10px;
}

.ticket .top {
  background: url(https://res.cloudinary.com/oredev/image/upload/f_auto,q_65/v1556786227/2019/html/background-1_lower.jpg);
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: cover;
  width: 100%;
  height: 300px;
  @media (max-width: 767px) {
    height: 5rem;
  }
}
.ticket .bottom {
  background: url(https://res.cloudinary.com/oredev/image/upload/v1556786227/2019/html/backround-1-top.jpg);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  width: 100%;
  height: 300px;
  @media (max-width: 767px) {
    height: 5rem;
  }
}
.personas {
  max-width: 2650px;
}
.personas .start-persona img,
.personas .first h2,
.personas .last h2 {
  border: 1px solid #fff;
}
.personas .start-persona {
  cursor: pointer;
}
.personas .first h2,
.personas .last h2 {
  width: 100%;
  height: 100%;
  padding: 40px;
  text-transform: uppercase;
  font-size: 3.2rem;
  @media (max-width: 1700px) {
    font-size: 2.1rem;
  }
  @media (max-width: 1200px) {
    font-size: 1.5rem;
  }
}
.personas .last h2 {
  font-size: 2.7rem;
  @media (max-width: 1700px) {
    font-size: 1.8rem;
  }
  @media (max-width: 1200px) {
    font-size: 1.2rem;
  }
}
.personas img {
  max-width: 100%;
}
.personas span {
  border-left: 1px solid #fff;
  border-top: 1px solid #fff;
  position: absolute;
  padding: 15px;
  text-transform: uppercase;
}
.teaser-container {
  padding: 3rem 0 0 0;
  @media (max-width: 767px) {
    padding: 3rem 0;
  }
  @media (max-width: 575px) {
    padding: 2rem 0;
  }
}
.theme-description {
  margin: 200px 0;
  @media (max-width: 767px) {
    margin: 0;
  }
}
.theme-description .stars img {
  @media (max-width: 767px) {
    width: 50px;
  }
}
.theme-description h2 {
  color: $pink;
}
.theme-description .middle {
  padding: 4rem 0;
}
.theme-description .left {
  background: url(https://res.cloudinary.com/oredev/image/upload/q_65/2019/html/left);
  background-repeat: no-repeat;
  background-position: right center;
  background-size: cover;
}
.theme-description .right {
  background: url(https://res.cloudinary.com/oredev/image/upload/q_65/2019/html/right);
  background-repeat: no-repeat;
  background-position: left center;
  background-size: cover;
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
    font-size: 1.4rem !important;
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
