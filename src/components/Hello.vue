<template>
  <div>
    <vue-headful :title="doctitle" />
    <div class="hidden theme text-center">
      <div class="container">
        <h2 class="when">Matchplay 2021</h2>
      </div>
    </div>

    
    
    <b-modal size="lg" ref="earlyBirdie" id="earlyBirdie" title="Early Birdie?" ok-only>
    <p>
      Ta chansen och <strong>vinn 2 dussin bollar</strong> från TaylorMade! De första 50 registrerade (och betalda) lagen har chansen att vinna.</p><p>Det vinnande laget meddelas per mail samt på våra sociala konton.
    </p>
    <p class="text-center d-block d-md-none">      
      <img src="https://res.cloudinary.com/dn3hzwewp/image/upload/h_150/v1608120643/matchplay/tp5.jpg" />
    </p>   
    <p class="text-center d-none d-md-block">      
      <img src="https://res.cloudinary.com/dn3hzwewp/image/upload/h_300/v1608120643/matchplay/tp5.jpg" />
    </p>     
  </b-modal>

    <div class="hero">      
      <b-container class="d-flex">
       
        <b-row>
          <b-col class="col-12 col-md-12 mt-4">            
            <h2>VÄLKOMMEN TILL MATCHPLAY 2021, GOLFTÄVLINGEN FÖR BÅDE PRIVATPERSONER OCH FÖRETAG</h2>
          </b-col>
      
          <b-col class="col-12 col-md-8">
            <p class="mt-3 mt-md-0">Matchplay är en matchspelstävling för par med officiellt handikapp. Par kan vara män, kvinnor eller mix. Tävlingen spelas i Sverige på golfklubbar anslutna till Svenska Golfförbundet.</p>
            <p v-if="!closed">Tävlingen spelas maj-september i olika omgångar fram till Sverigefinalen och sedan vidare utomlands!</p>
            <p hidden v-if="!closed">2020 spelades 358 matcher på nästan 100 golfklubbar.</p>
             <p hidden v-if="closed">I helgen (30-31 maj) lottas första omgången. Den 1 juni startar tävlingen!</p>
            
             <div class="buttons text-left">
                <router-link class="btn blue-bg btn-md text-white mt-2 mr-2" to="/register">Anmälan</router-link>
              <a hidden v-if="!closed" href="/register" class="btn blue-bg btn-md text-white mt-2 mr-2">Anmälan</a>
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
      <b-container class="d-flex">
<div v-if="!isAuthenticated">
            <h3 v-if="!closed" class="teaser-header orange mb-3">Anmäl ditt lag till Matchplay 2021</h3>
            <p>Hela tävlingen är numera digitaliserad där vi kontrollerar Golf-ID, hcp, slope mm för att kunna applicera våra hcputräkningar inför varje match. Ni använder vårt digitala scorekort för att föra score och vänner/familj kan följa matcherna live!</p>
            <p>Anmälningskostnad per lag är <strong>{{price1}} kr</strong> för privatpersoner och <strong>{{price2}} kr</strong> (exkl. moms) för företag.</p>
            <a hidden v-if="!closed" href="/register" class="btn blue-bg btn-md text-white mt-2 mb-3 mr-2"><i class="pb-1 mr-2 material-icons">thumb_up</i>Steg 1 - Kontroll av Golf-ID</a>
             <router-link class="btn blue-bg btn-md text-white mt-2 mr-2" to="/register"><i class="pb-1 mr-2 material-icons">thumb_up</i>Steg 1 - Kontroll av Golf-ID</router-link>
            </div>

            <div v-if="isAuthenticated && user">
            <h3 class="teaser-header orange mb-3">Hej {{user.firstname}}!</h3>
            <p v-if="user.teams">Du har redan skapat ett lag och kan hantera det <a href="/mymatchplay">här</a>. Lycka till i tävlingen!</p>
            <p v-if="!user.teams">Du har ännu inget lag i Sveriges roligaste golftävling, skapa ett på knappen nedan.</p>
            <p>Anmälningskostnad per lag är <strong>{{price1}} kr</strong> för privatpersoner och <strong>{{price2}} kr</strong> (exkl. moms) för företag.</p>
            <a hidden href="/mymatchplay" class="btn blue-bg btn-md text-white mt-2 mb-3 mr-2">Skapa ett lag</a>            
             <router-link class="btn blue-bg btn-md text-white mt-2 mr-2" to="/mymatchplay">Skapa ett lag</router-link>
            </div>
      </b-container>
</b-jumbotron>

 <b-jumbotron container-fluid>
   <b-container>
     <h3 class="teaser-header orange mb-3">Dubbelt så stor Sverigefinal</h3>
               <b-row>
                 <b-col class="col-12 col-md-8">
              <p>Dubbelt så stor FINALHELG! Åtta lag går till Sverigefinalen som spelas i september på Allerum Golfklubb, strax utanför Helsingborg. Hotell inklusive frukost, inspel, semifinal och förhoppningsvis final. Bankett på lördagkvällen ingår också.</p>
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
               <testimonials number=3></testimonials>
                 </b-col>
               </b-row>
   </b-container>
  </b-jumbotron>

  


    <div class="teaser-container">
      <b-container> 
         <b-row hidden>
          <b-col class="col-12 mt-4 mb-4">

             <app-rounds-grafic style="height: 220px" opacity="0.85"></app-rounds-grafic>
                 
          </b-col>
        </b-row>       
        <b-row>    
            
          <b-col id="register" ref="register">
            
<hr hidden class="mt-3 mt-md-5" />



            
            <b-row class="mb-3 mt-1">

              <b-col md="12" class="teaser-content">
                 
                <div class="form-group">
              

                  <b-row class="mt-0 mb-4">
                                      
                     <b-col class="col-12 mt-3">                        
                       <h3 class="teaser-header orange">Finalparen från Matchplay 2020 klara för Spanien</h3>
                       <p>Vi säger stort grattis till våra finalpar som är klara för den stora Matchplayfinalen på Los Naranjos i Spanien mellan den 7-11 februari 2021.<br>
                       </p>
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
                       

                       </b-col>
                       
         
                     <b-col hidden class="col-12 col-md-3 mt-5 mb-4 text-center">
                       <img class="pt-3 pb-3" :src="`https://res.cloudinary.com/dn3hzwewp/image/upload/v1599032379/matchplay/logo.png`">
                     </b-col>
                     <b-col hidden class="col-12 col-md-9 mt-5 mb-4">
                       <h3>Sverigefinal på Allerum GK</h3>
                       <p>Sverigefinalen (omgång 8) går av stapeln mellan den 23e och 24e oktober på Allerum GK som ligger strax norr om Helsingborg. De <strong>fyra</strong> finallagen kommer att spela på Ängsbanan som är en öppen ängs- och parkbana med flera inslag av vatten och ruff. Spelare kan välja på att spela banan från 4800-6300 meter. Sex olika längder finns; 48, 51, 54, 57, 60 och 63. <a target="_blank" href="http://www.allerumgk.nu/">Länk till Allerum GKs hemsida.</a>
                         </p><p>Följ finalmatcherna här och på Facebook! 
                       </p>

                       </b-col>
                   


                     <!-- tabs games -->
                    <b-col hidden xs="12" sm="12" class="mt-4 mt-md-2">
                        <b-tabs content-class="mt-3" v-model="tabIndex" no-key-nav>
                          <b-tab disabled title-link-class="ml-2">
                            <template v-slot:title>
                             <span class="d-none d-sm-block"><b-spinner v-if="gamescount > 0" small type="grow" class="ml-0 pl-0 mr-1 mb-1 red"></b-spinner>LIVE <span v-if="updating1"><b-spinner small class="ml-1 mr-1 mb-1"></b-spinner></span><span v-else>({{gamescount}})</span></span>
                             <span class="d-sm-none small-tabs"><i class="fal fa-heart-rate"></i> <span v-if="updating1"><b-spinner small class="ml-1 mr-1 mb-1"></b-spinner></span><span v-else>({{gamescount}})</span></span>
                            </template> 
                            <!-- IN PROGRESS GAMES -->
                      <b-col xs="12" sm="12" class="mt-4 mt-md-4">


                       <h4>Pågående matcher</h4>
                        <p hidden>Inom kort kommer bokade matcher visas här samt annan information om lagen!</p>
                        <b-row v-if="loadinggames">
                          <b-col>
                            <b-spinner small type="grow" class="mr-2"></b-spinner>Hämtar matcher...
                          </b-col>
                        </b-row>
                        <b-row v-if="gamescount === 0 && !loadinggames">
                          <b-col class="col-12 mt-3">
                            
                            <p v-if="hasnextgame && gamescount === 0">
                              <strong>Nästa match:</strong> {{lastname(nextgame.hometeamleadername)}} & {{lastname(nextgame.hometeammembername)}} vs {{lastname(nextgame.awayteamleadername)}} & {{lastname(nextgame.awayteammembername)}}
                               {{getgamedate2(nextgame.gamedate,nextgame.gametime)}} på <span v-if="nextgame.clubname">{{nextgame.clubname}}</span><span v-if="!nextgame.clubname">Golfklubb saknas</span>.
                             </p>
                            <p v-if="!nextgame">Just nu pågår inga matcher... men när matcher spelas kan dom följas live här!</p>                             
                            <p>OBS! Sidan laddas om automatiskt när en match startar.</p>
                          </b-col>
                         
                        </b-row>
                        
                         <b-row v-if="gamescount > 0" class="mt-2 mb-2">
                           <b-col>
                             <small>Sidan uppdateras automatiskt...</small>
                           </b-col>
                         </b-row>

                         <b-row v-if="gamescount > 0" class="">
                          <b-col v-for="(game,idx1) in games" :key="idx1" xs="12" sm="12" class="pt-3 pb-3 pl-md-2 pr-md-2 game" v-bind:class="{ greybg: idx1 % 2 === 0 }">                            
                             <b-row>
                                 <b-col class="gameheader col-12 text-center mb-4">                                                                                                                              
                                   <span v-if="game.clubname">{{game.clubname}}</span>
                                   <span v-if="!game.clubname">Golfklubb saknas</span>
                                    <span class="small d-block" v-if="game.roundname">{{game.roundname}}</span>
                                 </b-col>
                             </b-row>
                             <b-row>                              
                                 <b-col class="hometeam col-5 text-right pr-2 pt-2 pb-2" v-bind:class="{ homeleader: game.status != 'Pending' && (game.result > 0 || game.hometeam == game.winner)}">
                                   <span hidden v-if="game.hometeamtype === 'Company'">{{game.hometeamcompany}}</span>
                                   <span v-if="!game.actuallyplaying[0]">{{lastname(game.hometeamleadername)}}</span>
                                   <span v-if="game.actuallyplaying[0]">{{lastname(game.actuallyplaying[0])}}</span>

                                   <span v-if="!game.actuallyplaying[0]">{{lastname(game.hometeammembername)}}</span>
                                   <span v-if="game.actuallyplaying[0]">{{lastname(game.actuallyplaying[1])}}</span>
                                   <span hidden v-if="game.hometeammembername">{{lastname(game.hometeammembername)}}</span>
                                   <span hidden v-if="!game.hometeammembername && !game.actuallyplaing"><i class="material-icons mr-1 mb-1 missing">warning</i>EJ REG SPELARE</span>                                   
                                 </b-col>
                                  <b-col class="col-2 m-0 p-0 text-center result" v-bind:class="{ homeleader: game.status != 'Pending' && (game.result > 0 || game.hometeam == game.winner ), awayleader: game.status != 'Pending' && (game.result < 0 || game.awayteam == game.winner ) }">                                    
                                    <span v-if="game.result && game.status === 'Finished'">{{game.result}}</span>          
                                    <span v-if="game.status === 'Pending'">vs</span>        
                                    <span v-if="game.status === 'In progress'">{{getScore(game.result,game.status)}}</span>                                            
                                 </b-col>
                                  <b-col class="awayteam col-5 text-left pl-2 pt-2 pb-2" v-bind:class="{ awayleader: game.status != 'Pending' && (game.result < 0 || game.awayteam == game.winner ) }">
                                   <span v-if="!game.actuallyplaying[0]">{{lastname(game.awayteamleadername)}}</span>
                                   <span v-if="game.actuallyplaying[0]">{{lastname(game.actuallyplaying[2])}}</span>  

                                   <span v-if="!game.actuallyplaying[0]">{{lastname(game.awayteammembername)}}</span>
                                   <span v-if="game.actuallyplaying[0]">{{lastname(game.actuallyplaying[3])}}</span>                                         

                                   <span hidden v-if="game.awayteammembername">{{lastname(game.awayteammembername)}}</span>
                                   <span hidden v-if="!game.awayteammembername && !game.actuallyplaing">EJ REG SPELARE<i class="material-icons ml-1 mb-1 missing">warning</i></span>                                   
                                 </b-col>                                
                             </b-row>
                             <b-row>
                               <b-col class="col-5 pr-0 text-right">
                                <img v-if="game.hometeamtype === 'Company'" class="pt-3 pb-3" :src="`https://res.cloudinary.com/dn3hzwewp/image/upload/h_50,c_scale/matchplay/logos/${game.hometeamlogourl}.png`">
                               </b-col>
                               <b-col class="col-2 p-0 m-0">
                                
                               </b-col>
                               <b-col class="col-5 pl-0 text-left">
                                <img v-if="game.awayteamtype === 'Company'" class="pt-3 pb-3" :src="`https://res.cloudinary.com/dn3hzwewp/image/upload/h_50,c_scale/matchplay/logos/${game.awayteamlogourl}.png`">
                               </b-col>
                             </b-row>
                             <b-row>
                                <b-col class="col-12 text-center mt-4">
                                <span v-if="game.status === 'In progress' && !game.winner"><b-spinner small type="grow" class="mr-2 mb-1 red"></b-spinner>LIVE <span v-if="game.holesleft">efter {{18-game.holesleft}} hål</span>                              
                                </span>                                                                
                                   <span v-if="game.status != 'Finished' && game.winner && game.gamedate"><i class="material-icons mr-2 mb-1">schedule</i>{{game.gamedate}} | {{game.gametime}}</span>
                                   <span v-if="game.status === 'Pending' && game.gamedate"><i class="material-icons mr-2 mb-1">schedule</i>{{getgamedate2(game.gamedate,game.gametime)}}</span>
                                   <span v-if="game.status === 'Finished' && game.finishedAt"><i class="material-icons mr-2 mb-1 green">check_circle_outline</i>{{getgamedate2(game.gamedate)}} sedan</span>
                                   <span v-if="game.status != 'Finished'"> | <router-link  @click="modalShow = !modalShow"  :to="`viewer?id=${game._id}`">   <i class="fal fa-list"></i> scorekort </router-link></span>
                                </b-col>
                             </b-row>                             
                          </b-col>
                         </b-row>                                         
                     </b-col>
                     <!-- END In progress games -->
                          </b-tab>
                          <b-tab disabled title-link-class="ml-2">
                             <template v-slot:title>
                              <span class="d-none d-sm-block">KOMMANDE <span v-if="updating2"><b-spinner small class="ml-1 mr-1 mb-1"></b-spinner></span><span v-else>({{gamescount2}})</span></span>
                              <span class="d-sm-none small-tabs"><i class="fal fa-hourglass"></i> <span v-if="updating2"><b-spinner small class="ml-1 mr-1 mb-1"></b-spinner></span><span v-else>({{gamescount2}})</span></span>
                            </template> 
                             <!-- PENDING GAMES -->
                      <b-col xs="12" sm="12" class="mt-4 mt-md-4">

                        <span class="float-right" style="cursor:pointer;" v-on:click="getGamesPending('not-initial')"><i class="far fa-sync-alt"></i></span>
                       <h4>Kommande (bokade) <span v-if="updating2"><b-spinner small type="grow" class="ml-2 mr-1 mb-1 red"></b-spinner>...</span></h4>
                        <p hidden>Inom kort kommer bokade matcher visas här samt annan information om lagen!</p>
                        <b-row v-if="loadinggames2">
                          <b-col>
                            <b-spinner small type="grow" class="mr-2"></b-spinner>Hämtar matcher...
                          </b-col>
                        </b-row>
                        <b-row v-if="gamescount2 === 0 && !loadinggames2">
                          <b-col>
                          Just nu finns inga fler planerade matcher, återkom efter nästa lottning! Matcherna visas här när starttid bokats mellan lagen.
                          </b-col>
                        </b-row>

                         <b-row v-if="gamescount2 > 0" class="">
                          <b-col v-for="(game,idx2) in games2" :key="idx2" xs="12" sm="12" class="pt-3 pb-3 pl-md-2 pr-md-2 game" v-bind:class="{ greybg: idx2 % 2 === 0 }">                            
                             <b-row>
                                 <b-col class="gameheader col-12 text-center mb-4">                                                                                                                              
                                   <span v-if="game.clubname">{{game.clubname}}</span>
                                   <span v-if="!game.clubname">Golfklubb saknas</span>
                                     <span class="small d-block" v-if="game.roundname">{{game.roundname}}</span>
                                 </b-col>
                             </b-row>
                             <b-row>                              
                                 <b-col class="hometeam col-5 text-right pr-2 pt-2 pb-2" v-bind:class="{ homeleader: game.status != 'Pending' && (game.result > 0 || game.hometeam == game.winner)}">
                                   <span hidden v-if="game.hometeamtype === 'Company'">{{game.hometeamcompany}}</span>
                                   <span>{{lastname(game.hometeamleadername)}}</span>
                                   <span v-if="game.hometeammembername">{{lastname(game.hometeammembername)}}</span>
                                   <span v-if="!game.hometeammembername"><i class="material-icons mr-1 mb-1 missing">warning</i>EJ REG SPELARE</span>                                   
                                 </b-col>
                                  <b-col class="col-2 m-0 p-0 text-center result" v-bind:class="{ homeleader: game.status != 'Pending' && (game.result > 0 || game.hometeam == game.winner ), awayleader: game.status != 'Pending' && (game.result < 0 || game.awayteam == game.winner ) }">                                    
                                    <span v-if="game.result && game.status === 'Finished'">{{game.result}}</span>          
                                    <span v-if="game.status === 'Pending'">vs</span>        
                                    <span v-if="game.status === 'In progress'">{{getScore(game.result,game.status)}}</span>                                            
                                 </b-col>
                                  <b-col class="awayteam col-5 text-left pl-2 pt-2 pb-2" v-bind:class="{ awayleader: game.status != 'Pending' && (game.result < 0 || game.awayteam == game.winner ) }">
                                   <span>{{lastname(game.awayteamleadername)}}</span>
                                   <span v-if="game.awayteammembername">{{lastname(game.awayteammembername)}}</span>
                                   <span v-if="!game.awayteammembername">EJ REG SPELARE<i class="material-icons ml-1 mb-1 missing">warning</i></span>                                   
                                 </b-col>                                
                             </b-row>
                             <b-row>
                               <b-col class="col-5 pr-0 text-right">
                                <img v-if="game.hometeamtype === 'Company'" class="pt-3 pb-3" :src="`https://res.cloudinary.com/dn3hzwewp/image/upload/h_50,c_scale/matchplay/logos/${game.hometeamlogourl}.png`">
                               </b-col>
                               <b-col class="col-2 p-0 m-0">
                                
                               </b-col>
                               <b-col class="col-5 pl-0 text-left">
                                <img v-if="game.awayteamtype === 'Company'" class="pt-3 pb-3" :src="`https://res.cloudinary.com/dn3hzwewp/image/upload/h_50,c_scale/matchplay/logos/${game.awayteamlogourl}.png`">
                               </b-col>
                             </b-row>
                             <b-row>
                                <b-col class="col-12 text-center mt-4">
                                <span v-if="game.status === 'In progress' && !game.winner"><b-spinner small type="grow" class="mr-2 mb-1 red"></b-spinner>LIVE <span v-if="game.holesleft">efter {{18-game.holesleft}} hål</span>                              
                                </span>                                                                
                                   <span v-if="game.status === 'Pending' && game.gamedate"><i class="material-icons mr-2 mb-1">schedule</i>{{getgamedate2(game.gamedate,game.gametime)}}</span>
                                </b-col>
                             </b-row>                             
                          </b-col>
                         </b-row> 

                                           
                         
                     </b-col>
                          </b-tab>
                           <b-tab title-link-class="ml-2">
                              <template v-slot:title>
                             <span class="d-none d-sm-block">SPELADE <span v-if="updating3"><b-spinner small class="ml-1 mr-1 mb-1"></b-spinner></span><span v-else>({{gamescount3}})</span></span>
                             <span class="d-sm-none small-tabs"><i class="fal fa-check"></i> <span v-if="updating3"><b-spinner small class="ml-1 mr-1 mb-1"></b-spinner></span><span v-else>({{gamescount3}})</span></span>
                            </template> 
                                   <!--FINISHED GAMES -->
                      <b-col xs="12" sm="12" class="mt-4 mt-md-4">

                        <span class="float-right" style="cursor:pointer;" v-on:click="updategames()"><i class="far fa-sync-alt"></i></span>
                       <h4>Spelade - {{active_round}} <span v-if="updating3"><b-spinner small type="grow" class="ml-2 mr-1 mb-1 red"></b-spinner>...</span><span v-else>({{gamescount3}})</span></h4>
                        <p hidden>Inom kort kommer bokade matcher visas här samt annan information om lagen!</p>
                       
                        <b-row class="mb-4 mt-4">
                          <b-col>
                             <b-button hidden size="sm" v-on:click="updategames()" variant="primary">update</b-button>
                            <b-button hidden size="sm" v-on:click="getGamesFinished('button','all')" variant="primary">Alla</b-button>
                           
                            <b-button size="sm" class="mt-2 mt-md-0" v-on:click="getGamesFinished('button','Omgång 1')" variant="primary">Omgång 1</b-button>                           
                            <b-button size="sm" class="mt-2 mt-md-0" v-on:click="getGamesFinished('button','Omgång 2')" variant="primary">Omgång 2</b-button> 
                            <b-button size="sm" class="mt-2 mt-md-0" v-on:click="getGamesFinished('button','Omgång 3')" variant="primary">Omgång 3</b-button>
                            <b-button size="sm" class="mt-2 mt-md-0" v-on:click="getGamesFinished('button','Omgång 4')" variant="primary">Omgång 4</b-button>
                            <b-button size="sm" class="mt-2 mt-md-0" v-on:click="getGamesFinished('button','Omgång 5')" variant="primary">Omgång 5</b-button>
                            <b-button size="sm" class="mt-2 mt-md-0" v-on:click="getGamesFinished('button','Omgång 6')" variant="primary">Omgång 6</b-button>
                            <b-button size="sm" class="mt-2 mt-md-0" v-on:click="getGamesFinished('button','Omgång 7')" variant="primary">Omgång 7</b-button>
                            <b-button size="sm" class="mt-2 mt-md-0" v-on:click="getGamesFinished('button','Sverigefinal')" variant="primary">Sverigefinal</b-button>
                            
                            <form hidden v-on:submit.prevent="search">
                              <input type="text" id="searchfield" class="form-control" placeholder="Sök på namn/klubb">
                              <b-button @click="search()" variant="success" class="mt-2 btn-sm">Sök</b-button>
                              <b-button @click="cancelsearch()" variant="danger" class="mt-2 btn-sm">Rensa</b-button>
                            </form>  
                                                
                            <b-button hidden size="sm" v-on:click="getGamesFinished('button','Omgång 3')" variant="primary">Omgång 2 AC</b-button>                            
                          </b-col>
                        </b-row>

                         <b-row v-if="loadinggames3">
                          <b-col>
                            <b-spinner small type="grow" class="mr-2"></b-spinner>Hämtar matcher...
                          </b-col>
                        </b-row>
                       

                         <b-row v-if="gamescount3 > 0" class="">
                          <b-col v-for="(game,idx1) in games3" :key="idx1" xs="12" sm="12" class="pt-3 pb-3 pl-md-2 pr-md-2 game" v-bind:class="{ greybg: idx1 % 2 === 0 }">                            
                             <b-row>
                                 <b-col class="gameheader col-12 text-center mb-4">                                                                                                                              
                                   <span v-if="game.clubname">{{game.clubname}}</span>
                                   <span v-if="!game.clubname">Golfklubb saknas</span>
                                     <span class="small d-block" v-if="game.roundname">{{game.roundname}}</span>
                                 </b-col>
                             </b-row>
                             <b-row>                              
                                 <b-col class="hometeam col-5 text-right pr-2 pt-2 pb-2" v-bind:class="{ homeleader: game.status != 'Pending' && (game.result > 0 || game.hometeam == game.winner)}">
                                   <span v-if="!game.actuallyplaying[0]">{{lastname(game.hometeamleadername)}}</span>
                                   <span v-if="game.actuallyplaying[0]">{{lastname(game.actuallyplaying[0])}}</span>

                                   <span v-if="!game.actuallyplaying[0]">{{lastname(game.hometeammembername)}}</span>
                                   <span v-if="game.actuallyplaying[0]">{{lastname(game.actuallyplaying[1])}}</span>
                                                                
                                 </b-col>
                                  <b-col class="col-2 m-0 p-0 text-center result" v-bind:class="{ homeleader: game.status != 'Pending' && (game.result > 0 || game.hometeam == game.winner ), awayleader: game.status != 'Pending' && (game.result < 0 || game.awayteam == game.winner ) }">                                    
                                    <span v-if="game.result && game.status === 'Finished'">{{getScore(game.result,game.status)}}</span>         
                                                             
                                 </b-col>
                                  <b-col class="awayteam col-5 text-left pl-2 pt-2 pb-2" v-bind:class="{ awayleader: game.status != 'Pending' && (game.result < 0 || game.awayteam == game.winner ) }">
                                   <span v-if="!game.actuallyplaying[0]">{{lastname(game.awayteamleadername)}}</span>
                                   <span v-if="game.actuallyplaying[0]">{{lastname(game.actuallyplaying[2])}}</span>  

                                   <span v-if="!game.actuallyplaying[0]">{{lastname(game.awayteammembername)}}</span>
                                   <span v-if="game.actuallyplaying[0]">{{lastname(game.actuallyplaying[3])}}</span>                                       
   
                                 </b-col>                                
                             </b-row>
                             <b-row>
                               <b-col class="col-5 pr-0 text-right">
                                <img v-if="game.hometeamtype === 'Company'" class="pt-3 pb-3" :src="`https://res.cloudinary.com/dn3hzwewp/image/upload/h_50,c_scale/matchplay/logos/${game.hometeamlogourl}.png`">
                               </b-col>
                               <b-col class="col-2 p-0 m-0">
                                
                               </b-col>
                               <b-col class="col-5 pl-0 text-left">
                                <img v-if="game.awayteamtype === 'Company'" class="pt-3 pb-3" :src="`https://res.cloudinary.com/dn3hzwewp/image/upload/h_50,c_scale/matchplay/logos/${game.awayteamlogourl}.png`">
                               </b-col>
                             </b-row>
                             <b-row>
                                <b-col class="col-12 text-center mt-4">                                    
                                   <span v-if="game.status === 'Finished' && game.finishedAt"><i class="material-icons mr-2 mb-1 green">check_circle_outline</i>{{getgamedate(game.finishedAt)}} sedan</span>
                                    <span v-if="game.result != 'W/O'"> | <router-link  @click="modalShow = !modalShow"  :to="`viewer?id=${game._id}`">   <i class="fal fa-list"></i> scorekort </router-link></span>
                                </b-col>
                             </b-row>                             
                          </b-col>
                         </b-row>                                         
                     </b-col>
                          </b-tab>

                            <!-- topplista klubbar... -->
                        <b-tab title-link-class="ml-2">
                             
                             <template v-slot:title>
                             <span class="d-none d-sm-block">STATISTIK</span>
                              <span class="d-sm-none small-tabs"><i class="fal fa-chart-line"></i></span>
                            </template> 
                                                                
                      <b-col xs="12" sm="12" class="mt-4 mt-md-4">


                       <h4 hidden>STATISTIK</h4>
                      
                      <b-row hidden class="mt-4 mb-4">
                        <b-col class="col-12 col-md-3">
                          Antal lag:  {{team.total}}
                        </b-col>
                         <b-col class="col-12 col-md-3">
                          <span class="green">Kvarvarande lag: {{team.winner}}</span>
                        </b-col>
                         <b-col class="col-12 col-md-3">
                          <span class="orange">Andra chansen: {{team.secondchance}}</span>
                        </b-col>
                         <b-col class="col-12 col-md-3">
                          <span class="red">Utslagna: {{team.defeated}}</span>
                        </b-col>
                      </b-row>
                     
                      <hr hidden>

                          <h5 class="mt-3">
                         Birdieligan
                        </h5>

                        <b-row class="mt-3">                         
                             <b-col class="col-10 col-md-10 mr-0 pr-0 mb-2">
                               <strong>Spelare</strong>
                             </b-col>
                          <b-col class="col-2 col-md-2 text-right mb-2">          
                            <strong>Antal</strong>
                          </b-col>                                
                        </b-row>
                      
                        <b-row v-for="(birdie,index) in birdies" :key="'bird'+index" class="mb-2" v-bind:class="{ greybg:index% 2 === 0 }">
                            <b-col class="col-10 col-md-10 mr-0 pr-0" v-bind:class="{no1:index=== 0, no2: index === 1, no3: index === 2 }">
                              <span class="line" >{{index+1}}. {{truncate(birdie.playername)}}</span>
                            </b-col>
                            <b-col class="col-2 col-md-2 text-right" v-bind:class="{no1:index=== 0, no2: +index === 1, no3: index === 2 }">          
                              <span class="line">({{birdie.birdie}})</span>
                            </b-col>                         
                         </b-row>

                         <hr>

                        <h5 class="mt-4">
                          Toppklubbar (spelade matcher)
                        </h5>
                       <p class="mt-3">
                         Vilka golfklubbar kommer in på <strong>topp-20-listan</strong> över spelade matcher på sina banor? Se nedan <i class="fal fa-smile"></i>                         
                       </p>                                     
                        <b-row class="mt-3">                          
                             <b-col class="col-10 col-md-10 mr-0 pr-0 mb-2">
                               <strong>Golfklubb</strong>
                             </b-col>
                          <b-col class="col-2 col-md-2 text-right mb-2">          
                            <strong>Antal</strong>
                          </b-col>                                
                        </b-row>
                         <b-row v-for="(club,idx) in clubs" :key="idx" class="mb-2" v-bind:class="{ greybg: idx % 2 === 0 }">
                          <b-col class="col-10 col-md-10 mr-0 pr-0" v-bind:class="{no1: idx === 0, no2: idx === 1, no3: idx === 2 }">
                              <span class="line" >{{idx+1}}. {{truncate(club.club)}}</span>
                          </b-col>
                          <b-col class="col-2 col-md-2 text-right" v-bind:class="{no1: idx === 0, no2: idx === 1, no3: idx === 2 }">          
                            <span class="line">({{club.count}})</span>
                          </b-col>                         
                        </b-row>
                      
                       
                                        

                      
                                      
                     </b-col>
                          </b-tab>
                          <!-- end -->

                          <!-- träd... -->
                        <b-tab title-link-class="ml-2">
                             
                             <template hidden v-slot:title>
                             <span hidden class1="d-none d-sm-block"><i class="fal fa-sitemap green mr-2"></i>TRÄD</span>
                              <span hidden class="d-sm-none small-tabs"><i class="fal fa-sitemap green"></i></span>
                            </template> 
                             
                                   <!--FINISHED GAMES -->
                      <b-col hidden xs="12" sm="12" class="mt-4 mt-md-4">


                       <h4>Spelarträd <span v-if="updating1"><b-spinner small type="grow" class="ml-2 mr-1 mb-1 red"></b-spinner>...</span></h4>
                       <p class="mt-3">Då matcherna i första hand lottas med hänsyn till närmsta avstånd mellan lagen kan vi inte visa ett spelarträd men på denna sida kommer successivt mer information komma ut
                         med information om antal lag i omgångar mm.
                       </p>
                        <b-row class="mt-4">
                          <b-col class="col-6">
                            <h5 class="mb-4">HUVUDTÄVLINGEN</h5>
                            <p class="inactive-round">Omgång 1 = 240 lag</p>
                            <p class="active-round">Omgång 2 = 122 lag</p>
                            <b-alert show class="mt-4 p-2 smaller">
                              Pga av olika omständigheter har 2 lag flyttats upp från andra chansen till huvudtävlingen.
                            </b-alert>
                          </b-col>
                          <b-col class="col-6">
                            <h5 class="mb-4">ANDRA CHANSEN</h5>
                            <p>Omgång 2 AC = 118 lag</p>                          
                          </b-col>
                        </b-row>
                      
                        
                                        

                      
                                      
                     </b-col>
                          </b-tab>
                          <!-- end -->


                        </b-tabs>
                    </b-col>
                    
                      

                     
                     
                      <b-col hidden xs="12" sm="12" class="mt-5 mt-md-3 mr-0">
                       <h4>Topplista klubbar *</h4>
                        <b-row v-for="(club,idx0) in clubs" :key="idx0">
                          <b-col class="col-10 mr-0 pr-0">
                              <span class="line">{{idx0+1}}. {{truncate(club.club)}}</span>
                          </b-col>
                          <b-col hidden class="col-2 text-right">                           
                          <span class="line">({{club.count}})</span>
                          </b-col>
                        </b-row>
                        <b-col class="text-left mt-2">
                          <small>*Flest anmälda lag per klubb</small>
                        </b-col>                         
                     </b-col>
                  </b-row>
                       <b-row hidden v-if="!closed" class="mt-4 mb-2">
                   
                  </b-row>
 

                </div>

                <div>
                  <b-form @submit="onSubmit" @reset="onReset" v-if="showform2">
                    <b-form-group
                      id="input-group-1"
                      label="Ditt Golf-ID"
                      label-for="input-1"
                      label-cols="4"
                      label-cols-lg="2"
                      label-size="sm"
                    >
                      <b-form-input
                        id="golfid"
                        v-model="form.golfid"
                        type="text"
                        label="Enter your name"
                        required
                        readonly
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      id="input-group-1"
                      label="Förnamn"
                      label-for="input-1"
                      label-cols="4"
                      label-cols-lg="2"
                      label-size="sm"
                    >
                      <b-form-input
                        id="firstname"
                        v-model="form.firstname"
                        type="text"
                        required
                        readonly
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      id="input-group-1"
                      label="Efternamn"
                      label-for="input-1"
                      label-cols="4"
                      label-cols-lg="2"
                      label-size="sm"
                    >
                      <b-form-input
                        id="lastname"
                        v-model="form.lastname"
                        type="text"
                        required
                        readonly
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      id="input-group-1"
                      label="Medlemsklubb"
                      label-for="input-1"
                      label-cols="4"
                      label-cols-lg="2"
                      label-size="sm"
                    >
                      <b-form-input id="club" v-model="form.club" type="text" required readonly></b-form-input>
                    </b-form-group>
                    <b-form-group
                      id="input-group-1"
                      label="Ditt HCP"
                      label-for="input-1"
                      label-cols="4"
                      label-cols-lg="2"
                      label-size="sm"
                    >
                      <b-form-input id="hcp" v-model="form.hcp" type="text" required readonly></b-form-input>
                    </b-form-group> 

                  <b-row v-if="docontinue">
                    <b-col lg="12">
                       <b-alert v-if="docontinue" show class="mt-4 small" variant="primary">
                    När registreringen är genomförd väljer du att skapa ett lag eller så blir du ihopkopplad med ett befintligt lag där du har blivit vald som lagmedlem. Betalning av laget sker i nästa steg, du förbinder dig <strong>inte</strong> att skapa ett lag bara för att du registrerar dig som spelare!
                  </b-alert>
                       <b-alert hidden show class="mt-4 mb-4 small" variant="primary">
                    Vi behöver veta lite mer om dig innan du kan gå vidare med registrerigen, vänligen fyll i informationen nedan.
                  </b-alert>
                    </b-col>
                    <b-col lg="8">
                       <b-form-group
                      id="input-group-mobile"
                      label="Mobilnr"
                      label-for="input-1-mobile"
                      size='lg'
                      >
                      <vue-tel-input v-model="form.mobile" v-bind="bindProps"
                      ></vue-tel-input>
                      
                      </b-form-group>
                      <b-form-group
                      id="input-group-1"
                      label="E-post"
                      label-for="input-1"
                      >
                      <b-form-input
                      id="input-1"
                      v-model="form.email"
                      :state="validateEmail"
                      type="email"
                      required
                      placeholder="Skriv din e-postadress"
                      >
                      </b-form-input>
                      
                      </b-form-group>
                        <b-form-group
                      id="input-group-2"
                      label="Ditt nya lösenord"
                      label-for="input-1"
                      >
                      <b-form-input
                     :state="validatePassword1"
                      v-model="form.password"
                      type="password"
                      required
                      placeholder="Skapa ett lösenord"
                      >
                      </b-form-input>
                      <b-form-invalid-feedback :state="validatePassword1">
                        Krav på minst 8 tecken
                      </b-form-invalid-feedback>
                      </b-form-group>
                           <b-form-group
                      id="input-group-3"
                      label="Skriv ditt lösenord en gång till"
                      label-for="input-1"
                      >
                      <b-form-input
                     :state="validatePassword2"
                      v-model="form.password2"
                      type="password"
                      required
                      placeholder="Återupprepa lösenordet"
                      >
                      </b-form-input>
                      <b-form-invalid-feedback :state="validatePassword2">
                        Lösenorden stämmer inte...
                      </b-form-invalid-feedback>
                      </b-form-group>
                      
                    </b-col>
                    <b-col lg="4" class="d-none d-md-block">
                      <b-card img-src="https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_300/v1573661281/matchplay/henke-granen.png"
                      img-top
                      tag="article"
                      
                      class="mt-2 mb-2"
                      >
                      <b-card-text>
                        Kul att du vill vara med i golftävlingen, hoppas vi ses!<br><i>Henke & Granen</i></b-card-text>
                      </b-card>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                  <b-alert show v-if="showerror" class="mt-4 small"  variant="danger">Det finns redan en användare med denna e-post ({{emailexist}}), om du redan är registrerad kan du logga in uppe till höger, där kan du också få ett nytt lösenord om du har glömt ditt befintliga.</b-alert>
                    <b-button v-if="docontinue" :disabled="showspinnerregisteruser" type="submit" variant="primary" class="btn blue-bg ml-1"><b-spinner v-if="showspinnerregisteruser" small type="grow" class="mr-2"></b-spinner>Registrera dig</b-button>
                    <b-button type="reset" variant="danger">Avbryt</b-button>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col class="d-block d-md-none">
                      <b-card img-src="https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_300/v1573661281/matchplay/henke-granen.png"
                      img-top
                      tag="article"
                      
                      class="mt-3 mb-2"
                      >
                      <b-card-text>
                        Kul att du vill vara med i golftävlingen, hoppas vi ses!<br><i>Henke & Granen</i></b-card-text>
                      </b-card>
                    </b-col>
                  </b-row>
                  </b-form>
                  
                  <b-card class="mt-3 hidden" header="Form Data Result">
                    <pre class="m-0">{{ form }}</pre>
                  </b-card>
                </div>

                <div class="hidden" id="golfid_result" style="margin-top:20px;"></div>
              </b-col>
            </b-row>

            <b-row class="mb-5 mt-0" id="more" ref="more">
              <b-col md="12" class="teaser-content">
                <hr />
                <h3 class="orange mb-3 mt-5">SÅ HÄR FUNGERAR DET</h3>

                <p>Matchplay spelas 2021 i hela Sverige och är en tävling för 2-mannalag (herr, dam eller mixed). Officiellt HCP krävs för att delta. Tävlingsformen är 4-boll, Match/Bästboll. Beroende på antal anmälda lag kommer det bli 6-7 omgångar fram till Sverigefinalen. Varje omgång spelas inom 2 veckor där det vinnande laget går vidare i tävlingen.</p>
                <p>Ta er till Sverigefinalen och upplev en magisk helg med Matchplay! Sverigefinalen görs upp mellan de åtta bästa lagen på Allerum Golfklubb strax utanför Helsingborg. Hotell, frukost, all golf samt en bankett på kvällen ingår. De 2 bästa lagen i Sverigefinalen åker med Matchplay till Spanska solkusten för att göra upp om titeln. Flyg, hotell och allt spel ingår för de bägge lagen.
                </p>
                <p>
                  Priset för deltagande i tävlingen är {{price1}}:-/lag för privatpersoner och {{price2}}:-/lag (exkl. moms) för företag. Varje lag är garanterat minst 2 matcher.
                </p>


                 <app-rounds-grafic hidden class="mt-5" style="height: 300px" linecolor="#808080" opacity="1"></app-rounds-grafic>


    <b-container class="mt-5 mb-4">
      <b-row>
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
            <p>2021 gör vi Sverigefinalen dubbelt så stor med åtta lag som spelas i september på Allerum Golfklubb, strax utanför Helsingborg. Hotell, frukost, all golf samt en bankett på kvällen ingår.</p>
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
              </b-col>
              
            </b-row>
          </b-col>          
          
        </b-row>
      </b-container>
    </div>


<div class="teaser-container hidden" id="teaser1">
 
  <b-container>
<b-row>
  <b-col md="7">
        <p class="mt-4 mt-md-0">
         Matchplay spelas av 2-mannalag (herrlag, damlag eller mixade lag) bestående av medlemmar från klubbar anslutna till Svenska Golfförbundet. Alla deltagare måste ha ett officiellt HCP för att deltaga. Handicapgränsen är högst 32,0/spelare. Deltagare kan anmäla sig om man har högre HCP än 32, men kan aldrig tillhandahålla högre än 32 i spel. Man spelar från den tee SGF tävlingsbestämmelser säger på slopad bana. Kontrollera ovan om du är kvalificerad att delta i tävlingen!
       </p>
    </b-col>     
     <b-col md="5" class="order-first order-md-last">
       <img src="https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_972/v1572940143/matchplay/matchplay_bg.jpg">
    </b-col>
</b-row>
      </b-container>
</div>

<div class="teaser-container hidden" id="teaser1">
 
  <b-container>
<b-row>
    
     <b-col md="5">
       <img src="https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_972/v1572942209/matchplay/c640cf_402261724c71433c9662662c3114e5b8_mv2_d_4500_3000_s_4_2.jpg">
    </b-col> 
    <b-col md="7">
        <p class="mt-4 mt-md-0">
         Lottning kommer att ske den 24 april 2020 för hela Sverige. Matchplay har prioriteringar i lottningen som faller: 1. geografisk tillhörighet, 2. HCP i laget. Detta ger inte enbart kortare resor under det tidiga skedet av tävlingen, utan även en mer rättvis fördelning över lagens respektive HCP. Så fort lottningen är klar finns spelarträdet på hemsidan. I spelarträdet kommer ni kunna se vilket lag ni ska möta samt se statistik över avgjorda matcher.
       </p>
    </b-col>
    
</b-row>
      </b-container>
</div>

  </div>
</template>



<script>
import { mapGetters } from "vuex";
import { tagsMixin } from "../mixins/tagsMixin";
/*import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';*/
import { VueTelInput } from "vue-tel-input";
import FlipCountdown from "./FlipCountdown";
import AppRoundsGrafic from "./RoundsGrafic";
import Testimonials from "./Testimonials";

import moment from "moment";
import VueMoment from "vue-moment";
import { globalState } from "../main.js";

moment.locale("sv");

let options = {};

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
  created() {
  if (!globalState.compid) {
    return     
    
    this.axios
        .post(globalState.admin_url + "getCompetition", globalState.compid)
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
    // 'phone':VueTelInput,
    VueTelInput,
    appCountdown: FlipCountdown,
    AppRoundsGrafic, Testimonials
  },
  data() {
    return {
      messages: null, 
      modalShow: false,
      closed: false,
      leader: "",
      bindProps: {
        mode: "international",
        defaultCountry: "SE",
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: false,
        placeholder: "Skriv ditt mobilnummer",
        required: true,
        enabledCountryCode: false,
        enabledFlags: true,
        preferredCountries: [],
        onlyCountries: ["SE", "NO", "DK"],
        ignoredCountries: [],
        autocomplete: "off",
        name: "telephone",
        maxLen: 25,
        wrapperClasses: "",
        inputClasses: "form-control",
        dropdownOptions: {
          disabledDialCode: false,
        },
        inputOptions: {
          showDialCode: false,
        },
      },
      clubs: 0,
      birdies: 0,
      //IN PROGRESS GAMES
      loadinggames: true,
      updating1: true,
      game: {},
      games: [],
      gamescount: 0,

      //TABS
      tabIndex: 0,
      price1: globalState.price1,
      price2: globalState.price2,
      active_round: "Sverigefinal",     
      //PENDING GAMES
      loadinggames2: true,
      updating2: true,
      game2: {},
      games2: [],
      gamescount2: 0,
      hasnextgame: false,
      nextgame: {},

      //FINISHED GAMES
      loadinggames3: true,
      updating3: true,
      game3: {},
      games3: [],
      gamescount3: 0,

      team: {
        winner: 0,
        secondchance: 0,
        defeated: 0,
        total: 0,
      },
      searchfield: "",

      showhelper: false,
      //contbutton1: 'Fortsätt till nästa steg',
      docontinue: true,
      contbutton1: "Fortsätt",
      showpasswordsdontmatch: false,
      showspinnerregisteruser: false,
      showerror: false, //if user exists when register
      emailexist: "",
      showloadgolfid: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      dismissCountDown2: 0,
      test: "",
      showDismissibleAlert: false,
      golfid: "",
      golfid2: "",
      doctitle: this.$store.state.conferencename,

      form: {
        golfid: "",
        mobile: "",
        firstname: "",
        lastname: "",
        hcp: "",
        club: "",
        email: "",
        password: "",
        password2: "",
      },
      showform1: true,
      showform2: false, //should be default false
      showqualified: false,
      showqualified32: false,
      showqualifiedNOT: false,
      showqualifiedNOCLUB: false,
    };
  },

  computed: {
        ...mapGetters([
      "user",
      "isAuthenticated",
    ]),
    validation() {
      let validated = false;

      var re = /^[- ]*[0-9][- 0-9]*$/;
      if (re.test(this.golfid)) {
        if (this.golfid.length === 6) {
          this.golfid = this.golfid + "-";
          validated = true;
        }

        if (this.golfid.length === 10) {
          validated = true;
        } else {
          validated = false;
        }
      }

      return validated;

      /*
       var re = /^[- +()]*[0-9][- +()0-9]*$/;
       console.log(re.test(this.golfid))
       return re.test(this.golfid)

        if (this.golfid.length === 6) {
          this.golfid = this.golfid + '-'
        }

         return this.golfid.length === 10;

       */
    },
    validateEmail() {
      if (this.form.email.length < 4) {
        return;
      }
    },
    validateEmail() {
      if (this.form.email.length < 4) {
        return;
      }

      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(this.form.email).toLowerCase());
    },
    validatePassword1() {
      if (this.form.password.length === 0) {
        return;
      }
      return this.form.password.length > 7;
    },
    validatePassword2() {
      if (this.form.password.length === 0) {
        this.showpasswordsdontmatch = false;
        return;
      }
      return this.form.password === this.form.password2;
    },
  },
  mixins: [tagsMixin],
  
  methods: {
     showModal() {       
        if (localStorage.getItem('earlyBirdie2021') !== '1') 
          this.$refs['earlyBirdie'].show();
          //localStorage.setItem('earlyBirdie2021', '1');
                  
      },
      hideModal() {
        this.$refs['earlyBirdie'].hide()
      },
    search: function () {
      let searchvalue = document
        .getElementById("searchfield")
        .value.toLowerCase();
      console.log("inne", searchvalue);
      console.log(this.games);
      this.games = this.games.filter(function (game) {
        //console.log(searchvalue,game.hometeamname.includes(searchvalue.toLowerCase()))
        console.log(searchvalue);
        return (
          game.hometeamname.toLowerCase().includes(searchvalue.toLowerCase()) ||
          game.awayteamname.toLowerCase().includes(searchvalue.toLowerCase())
        );
      });
      //this.gamescount = this.games.length
    },
    cancelsearch: function () {
      let searchvalue = document.getElementById("searchfield");
      searchvalue.value = "";
      this.games = this.gamesOrg;
      this.gamescount = this.games.length;
    },
    compareValues(key, order = "asc") {
      return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
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
    },
    getScore(result, status) {
      this.leader = "";

      if (result === "W/O") {
        return "W/O";
      }

      if ((result === "0&0" || result === "0") && status != "In progress") {
        //särspelat
        return "SÄRSPEL";
      }

      if (result === "1&0") {
        //särspelat
        return "1UP";
      }

      if (result === "2&0") {
        return "2&1";
      }
      if (result === "3&0") {
        return "3&2";
      }

      if (result === "4&0" || (result === "4" && status === "Finished")) {
        return "4&3";
      }

      if (result === "5&0" || (result === "5" && status === "Finished")) {
        return "5&4";
      }

      if (result === "6&0" || (result === "6" && status === "Finished")) {
        return "5&4";
      }

      if (result === "4&2") {
        return "4&3";
      }

      if (result.includes("&") || result.includes("UP")) {
        return result;
      }

      if (result > 0) {
        //home team leads
        this.leader = "home";
        return result + "UP";
      }
      if (result < 0) {
        //away team leads
        this.leader = "away";
        return result.substr(1) + "UP";
      }
      if (result == 0) {
        //A/S
        return "A/S";
      }
    },
    lastname(thename) {
      if (thename) {
        let names = thename.split(" ");
        return names[names.length - 1];
      } else {
        return "SAKNAS*****";
      }
    },
    getgamedate2: function (gamedate, gametime) {
      var gamedate2 = '"' + gamedate + '"' + " " + gametime;
      return moment(gamedate2, "YYYY-MM-DD hh:mm").fromNow();
    },
    getgamedate: function (finishedate) {
      let gamedate2 = new Date(finishedate);
      return moment(gamedate2, "YYYY-MM-DD hh:mm").fromNow();
      //var gamedate2 = '"' + gamedate + '"' + ' ' + gametime; //return moment(gamedate2, "YYYY-MM-DD hh:mm").add(3, 'hours').fromNow();
    },

    truncate: function (club) {
      let len = 30;
      if (club.length > len) return club.substring(0, len) + "...";
      else return club;
    },
    getGamesInprogress(type) {
      //loading

      this.loadinggames = true;
      this.updating1 = true;

      //this.gamescount = 0;

      const today = moment().format("YYYY-MM-DD");
      const today_h = moment().format("HH:mm");

      this.axios
        .post(globalState.admin_url + "getGamesAdvanced", {
          competition: "sFAc3dvrn2P9pXHAz",
          status: "In progress",
          //"from": today + " " + today_h,
          //"to": today + " 23:59",
          limit: 20,
        })

        .then((response) => {
          //console.log(response.data)
          this.games = response.data;
          //console.log("getGamesInprogress ->  this.games",  this.games)

          this.games = this.games.filter((game) => {
            if (!game.winner) return true;
          });
          this.gamescount = this.games.length;

          //console.log("getGamesInprogress ->  this.games",  this.games)
          this.loadinggames = false;
          this.updating1 = false;

          //LOAD PENDING if initial
          if (type === "initial") {
            this.updating2 = true;
            this.getGamesPending("initial");
          } else {
            //RELOAD IN PROGRESS (INITATOR)
            //NOT USED UNTIL NEXT MATCHPLAY 2021
            /* setTimeout(() => {
                          this.updating1 = false;                   
                          this.getGamesInprogress('not-initial'); //in progress                          
                        }, 60000);   */
          }
        })
        .catch((error) => {
          console.log(error);
          setTimeout(() => {
            this.updating1 = false;
            this.getGamesInprogress("not-initial"); //in progress
          }, 30000);
          this.updating1 = false;
          this.loadinggames = false;
        });
    },
    getGamesPending(type) {
      //loading

      //this.gamescount = 0;
      this.updating2 = true;

      const today = moment().format("YYYY-MM-DD");
      //const today_h = moment().format("HH:mm");
      const today_h = moment().subtract(25, "minutes").format("HH:mm"); //add a few minutes so it will keep as pending before moving to in progress

      this.axios
        .post(globalState.admin_url + "getGamesAdvanced", {
          competition: "sFAc3dvrn2P9pXHAz",
          status: "Pending",
          from: today + " " + today_h,
          //"to": today + " 23:59",
          //"limit": 20
        })

        .then((response) => {
          //console.log(response.data)
          this.games2 = response.data;
          this.gamescount2 = this.games2.length;

          this.loadinggames2 = false;
          this.updating2 = false;

          //get next game in line
          if (this.gamescount2 > 0) {
            this.hasnextgame = true;
            this.nextgame = this.games2[0];
          } else {
            this.hasnextgame = false;
          }

          //LOAD FINISHED
          if (type === "initial") {
            this.updating3 = true;
            this.getGamesFinished("loader", this.active_round);
          }
        })
        .catch((error) => {
          console.log(error);
          this.loadinggames2 = false;
        });
    },
    updategames() {
      this.updating1 = false;
      this.getGamesFinished("loader", this.active_round);
    },
    getGamesFinished(origin, round) {
      //loading

      this.updating3 = true;

      if (origin === "loader") {
        //if (localStorage.getItem('active_round') !== null) {
        if (localStorage.hasOwnProperty("active_round")) {
          this.active_round = localStorage.getItem("active_round");
        }
      }

      if (origin === "button") {
        //set saved filter
        localStorage.setItem("active_round", round);
        this.active_round = round;
      } //this.classoptions = localStorage.getItem('active_round'); //console.log(this.classoptions) //if (this.classoptions === 'null' || this.classoptions === null) { //  delete options['roundname']; //} else { // options["roundname"] = this.classoptions; //}

      options["competition"] = "sFAc3dvrn2P9pXHAz";
      options["status"] = "Finished";
      if (round === "all") {
        delete options["roundname"];
      } else {
        options["roundname"] = round;
      }

      const today = moment().format("YYYY-MM-DD");
      const today_h = moment().format("HH:mm");

      this.axios
        .post(globalState.admin_url + "getGamesAdvanced", options)

        .then((response) => {
          let finishedgames = response.data;
          this.games3 = finishedgames.sort(
            this.compareValues("finishedAt", "desc")
          );
          this.gamescount3 = this.games3.length;
          this.loadinggames3 = false;
          this.updating3 = false;

          //RELOAD IN PROGRESS (INITATOR)
          setTimeout(() => {
            this.updating1 = false;
            this.getGamesInprogress("not-initial"); //in progress
          }, 60000);
        })
        .catch((error) => {
          console.log(error);
          this.loadinggames3 = false;
        });
    },
    getGames() {
      //loading

      this.gamescount3 = 0;

      const today = moment().format("YYYY-MM-DD");
      const today_h = moment().format("HH:mm");

      this.axios
        .post(globalState.admin_url + "getGamesAdvanced", {
          competition: "sFAc3dvrn2P9pXHAz",
          status: "Finished",
          //"from": today + " " + today_h,
          //"to": today + " 23:59",
          //"limit": 10
        })

        .then((response) => {
          //console.log(response.data)
          this.games = response.data;
          this.gamescount = this.games.length;

          //Get finished games
          let finishedgames = [];
          this.axios
            .post(globalState.admin_url + "getGamesAdvanced", {
              competition: "sFAc3dvrn2P9pXHAz",
              status: "Finished",
              //"from": today + " " + today_h,
              //"to": today + " 23:59",
              limit: 15,
            })

            .then((response) => {
              //console.log(response.data)
              finishedgames = response.data;

              finishedgames = finishedgames.sort(
                this.compareValues("gamedate", "desc")
              );

              this.games = this.games.concat(finishedgames);
              this.gamescount = this.games.length;

              //GET UPCOMING GAMES
              let upcominggames = [];
              this.axios
                .post(globalState.admin_url + "getGamesAdvanced", {
                  competition: "sFAc3dvrn2P9pXHAz",
                  status: "Pending",
                  from: today + " " + today_h,
                  to: today + " 23:59",
                  //"limit": 10
                })

                .then((response) => {
                  //console.log(response.data)
                  upcominggames = response.data;

                  this.games = this.games.concat(upcominggames);
                  this.gamescount = this.games.length;
                  this.loadinggames = false;
                })
                .catch((error) => {
                  console.log(error);
                  this.loadinggames = false;
                });

              this.loadinggames = false;
            })
            .catch((error) => {
              console.log(error);
              this.loadinggames = false;
            });
        })
        .catch((error) => {
          console.log(error);
          this.loadinggames = false;
        });
    },
    getTeamsCount() {
      //loading

      this.axios
        .post("https://matchplay.meteorapp.com/methods/" + "getTeamsCount", {
          //getclubstoplist
          competition: "sFAc3dvrn2P9pXHAz",
        })
        .then((response) => {
          //console.log(response.data)
          this.team.total = response.data.total;
          this.team.defeated = response.data.defeated;
          this.team.secondchance = response.data.secondchance;
          this.team.winner = response.data.winner;
          //this.clubs = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTopListClubs() {
      //loading
      this.value = 5;

      this.axios
        .post("https://matchplay.meteorapp.com/methods/" + "getTopClubs", {
          //getclubstoplist
          competition: "sFAc3dvrn2P9pXHAz",
          no: 40,
        })
        .then((response) => {
          //console.log(response.data)
          this.clubs = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTopListClubsPlayed() {
      //loading
      this.value = 5;

      this.axios
        .post(
          "https://matchplay.meteorapp.com/methods/" + "getTopClubsPlayed",
          {
            //getclubstoplist
            competition: "sFAc3dvrn2P9pXHAz",
            no: 99,
          }
        )
        .then((response) => {
          //console.log(response.data)
          this.clubs = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getBirdies() {
      //loading
      this.value = 5;

      this.axios
        .post(
          "https://matchplay.meteorapp.com/methods/" + "getAchievementData",
          {
            //getclubstoplist
            competition: "sFAc3dvrn2P9pXHAz",
            type: "birdie",
            no: 20,
          }
        )
        .then((response) => {
          this.birdies = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    showAlert2() {
      this.dismissCountDown2 = true;
    },
    goRouter: function () {
      this.$router.push({ path: "line-up" });
    },
    getGolfId: function (golfid) {
      //evt.preventDefault();
      //var golfid1 = document.getElementById("golfid1").value;
      //var golfid2 = document.getElementById("golfid2").value;
      if (this.golfid === "") return;
      this.contbutton1 = "Hämtar data från SGF";
      this.dismissCountDown2 = false; //hide you exist alert
      this.showloadgolfid = true;
      this.axios
        .post(
          //"https://colburn-chat-buxom-tamale.eu-gb.mybluemix.net/get_golfid?golfid=" + golfid1 + '-' + golfid2,
          "https://matchplay.meteorapp.com/methods/getPlayerByGolfid", //"http://localhost:3000/get_golfid?golfid=" + golfid1 + '-' + golfid2,
          {
            golfid: this.golfid,
          }
        )
        .then((response) => {
          //console.log(response.data);

          if (response.data.hasOwnProperty("error")) {
            this.contbutton1 = "Fortsätt";
            this.showAlert();
            this.showloadgolfid = false;
            return;
          }

          if (!response.data.hasOwnProperty("notingit")) {
            //check if user exists in matchplay admin
            if (response.data.exists) {
              this.contbutton1 = "Prova igen";
              this.showAlert2();
              this.showloadgolfid = false;
              return;
            }
            //end check
            this.showform1 = false;
            this.showform2 = true;
            this.form.golfid = this.golfid;
            this.form.firstname = response.data.firstname;
            this.form.lastname = response.data.lastname;
            this.form.club = response.data.club; //this.form.hcp = response.data.hcp;
            this.form.hcp = response.data.hcp.replace(/,/g, ".");

            if (response.data.club == "empty") {
              this.showqualifiedNOCLUB = true;
              return;
            }

            var element = this.$refs["success"];
            var top = element.offsetTop;
            window.scrollTo(0, 400);
            //console.log(this.form.hcp)
            if (this.form.hcp < 28.1) {
              this.showqualified = true;
              this.docontinue = true;
            } else if (this.form.hcp > 28 && this.form.hcp < 36.1) {
              this.showqualified32 = true;
              this.docontinue = true;
            } else if (this.form.hcp > 36.0) {
              this.showqualifiedNOT = true;
              this.docontinue = false;
            }

            this.showloadgolfid = false; //this.contbutton1 = 'Fortsätt till nästa steg';
            this.contbutton1 = "Fortsätt";
            return;
          } else {
            //console.log('empty');
            this.showAlert();
            this.showloadgolfid = false;
            return;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSubmit(evt) {
      evt.preventDefault();

      if (this.form.password != this.form.password2) {
        this.showpasswordsdontmatch = true;
        return;
      }

      this.showerror = false;
      this.showspinnerregisteruser = true;
      this.axios
        .post("https://matchplay.meteorapp.com/methods/userAdd", {
          //ID: 12345
          emails: [
            {
              address: this.form.email,
            },
          ],
          password: this.form.password,
          firstname: this.form.firstname,
          lastname: this.form.lastname,
          golfid: this.form.golfid,
          mobile: this.form.mobile,
        })
        .then((response) => {
          //$(".speaker-single").slideDown(200);
          if (response.data.hasOwnProperty("error")) {
            this.showerror = true;
            this.emailexist = this.form.email;
            this.showspinnerregisteruser = false;
            return;
          } //try to login the user
          this.login();

          return;
        })
        .catch((error) => {
          console.log(error);
        }); //alert(JSON.stringify(this.form));
    },
    login() {
      this.showloginspinner = true; //DDP LOGIN
      const simpleDDP = require("simpleddp");
      const simpleDDPLogin = require("simpleddp-plugin-login").simpleDDPLogin;

      let opts = {
        endpoint: "wss://matchplay.meteorapp.com/websocket",
        SocketConstructor: WebSocket,
        reconnectInterval: 5000,
      };
      const server = new simpleDDP(opts, [simpleDDPLogin]);

      let password = this.form.password;
      let email = this.form.email;
      let parentVue = this; // doAsyncOperation1() returns a promise.

      trylogin()
        .then(() => {
          //console.log('logged in with creds',server.token);
          //parentVue.showerror = false;
          localStorage.setItem("auth_token", server.token); //parentVue.showlogin = false; //parentVue.showloginspinner = false; //parentVue.doctitle = 'Inloggad'; //Set params for user
          let userinfo = server.collections.users[0].profile;
          localStorage.setItem("userinfo", JSON.stringify(userinfo));
          this.showspinnerregisteruser = false;
          this.$router.push({ path: "mymatchplay" }); //this.setuserinfoform();
        })
        .then((output) => {})
        .catch((err) => {
          //console.log('NOT logged in with creds, show error on form')
          //parentVue.showerror = true;
          //parentVue.showloginspinner = false;
        });

      async function trylogin() {
        // (1)
        let response = await server.login({
          password,
          user: {
            email,
          },
        });
      }
    },
    onReset(evt) {
      this.showform1 = true;
      this.showform2 = false;
      this.showqualified = false;
      this.showqualified32 = false;
      this.showqualifiedNOT = false;
      this.showqualifiedNOCLUB = false;
      evt.preventDefault(); // Reset our form values
      this.form.email = "";
      this.form.password = "";
      this.form.password2 = ""; // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      }); //scroll to correct place on page      p

      var element = this.$refs["register"];
      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
  },
  mounted() {
    this.showModal();   
    //this.getTopListClubs();
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/variables.scss";

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
  background-position: right 0px top 50%;
  @media (min-width: 320px) {
    padding: 2rem 0 5rem 0;
    /*background-position: bottom 10% right 0;*/
  }
  @media (min-width: 480px) {
    padding: 4rem 0 4rem 0;
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
