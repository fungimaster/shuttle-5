<template>
<b-container>
 <vue-headful :title="doctitle" />
 <b-modal ref="scorecard" title="Scorekort - Match" v-model="modalShow" ok-only size="lg" style="padding-left:-1rem;">
      <router-view class="" style="margin-left:-1rem;margin-right:-1rem;"> </router-view>
    </b-modal>

       <b-modal id="lightbox" ref="lightbox" title="Bild" ok-only size="xl" style="padding-left:-1rem;">
      <p class="text-center">
      <b-img class="lightbox-image" v-if="lightbox_image" :src="formatImage2(lightbox_image)"></b-img>
      </p>
    </b-modal>

      <b-tabs content-class="mt-3" v-model="tabIndex" no-key-nav class="mt-4 mt-md-5">
                          <b-tab title-link-class="ml-2">
                            <template v-slot:title>
                             <span class="d-none d-sm-block"><b-spinner v-if="gamescount > 0" small type="grow" class="ml-0 pl-0 mr-1 mb-1 red"></b-spinner>LIVE <span v-if="updating1"><b-spinner small class="ml-1 mr-1 mb-1"></b-spinner></span><span v-else>({{gamescount}})</span></span>
                             <span class="d-sm-none small-tabs"><i class="fal fa-heart-rate"></i> <span v-if="updating1"><b-spinner small class="ml-1 mr-1 mb-1"></b-spinner></span><span v-else>({{gamescount}})</span></span>
                            </template> 
                            <!-- IN PROGRESS GAMES -->
                      <b-col xs="12" sm="12" class="mt-4 mt-md-4">


                       <h4>Pågående matcher</h4>
                        <p hidden>Inom kort kommer bokade matcher visas här samt annan information om lagen!</p>
                       
                        <b-row hidden v-if="loadinggames">
                          <b-col>
                            <b-spinner small type="grow" class="class mr-2"></b-spinner>Hämtar matcher...
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

                         <b-row class="mt-2 mb-4">
                           <b-col>
                              <form v-on:submit.prevent="search">
                                <input type="text" id="searchfield" class="form-control filterfield" placeholder="Sök på spelarnamn eller klubb">
                                <b-button @click="gamesarray='games',search()" variant="success" class="mt-1 ml-2 btn-sm">Sök</b-button>
                                <b-button @click="gamesarray='games',cancelsearch()" variant="danger" class="mt-1 btn-sm">Rensa</b-button>
                              </form>
                           </b-col>
                         </b-row>

                         <b-row v-if="gamescount > 0" class="">
                          <b-col v-for="(game,idx1) in games" :key="idx1" xs="12" sm="12" class="pt-3 pb-3 pl-md-2 pr-md-2 game mb-3" :class="idx1 % 2 === 0 ? 'whitebg' : 'whitebg'">                
                             <b-row>
                                 <b-col class="gameheader col-12 text-center mb-4">
                                   <img v-if="game.logourl" class="" :src="getClubLogo(game.logourl)">                                                                                                                         
                                   <span v-if="game.clubname">{{game.clubname}}</span>
                                   <span v-if="!game.clubname">Golfklubb saknas</span>
                                    <span class="small d-block" v-if="game.roundname">{{game.roundname}}</span>
                                    <hr class="mt-3 mb-1" />
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
                               <img v-if="game.hometeamtype === 'Company'" class="pt-3 pb-3" :src="getLogoImage(game.hometeamlogourl)">
                               </b-col>
                               <b-col class="col-2 p-0 m-0">
                                
                               </b-col>
                               <b-col class="col-5 pl-0 text-left">
                                <img v-if="game.awayteamtype === 'Company'" class="pt-3 pb-3" :src="getLogoImage(game.awayteamlogourl)">
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
                                 <div class="p-2">
                                 </div>
                                </b-col>
                             </b-row>   
                              <!-- AppGamesImageGallery takes an array of images and returns thumbnails and lightbox  -->
                              <app-game-image-gallery v-if="game.imagesurl" :images="game.imagesurl"></app-game-image-gallery>               
                          </b-col>
                         </b-row>                                         
                     </b-col>
                     <!-- END In progress games -->
                          </b-tab>
                          <b-tab title-link-class="ml-2">
                             <template v-slot:title>
                              <span class="d-none d-sm-block">KOMMANDE <span v-if="updating2"><b-spinner small class="ml-1 mr-1 mb-1"></b-spinner></span><span v-else>({{gamescount2}})</span></span>
                              <span class="d-sm-none small-tabs"><i class="fal fa-hourglass"></i> <span v-if="updating2"><b-spinner small class="ml-1 mr-1 mb-1"></b-spinner></span><span v-else>({{gamescount2}})</span></span>
                            </template> 
                             <!-- PENDING GAMES -->
                      <b-col xs="12" sm="12" class="mt-4 mt-md-4">

                        <span class="float-right" style="cursor:pointer;" v-on:click="getGamesPending('not-initial')"><i class="far fa-sync-alt"></i></span>
                       <h4>Kommande (bokade) <span v-if="updating2"><b-spinner small type="grow" class="blink ml-2 mr-1 mb-1 red"></b-spinner>...</span></h4>
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
                                   <img v-if="game.logourl" class="" :src="getClubLogo(game.logourl)">                                                                                                                              
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
                                <img v-if="game.hometeamtype === 'Company'" class="pt-3 pb-3" :src="getLogoImage(game.hometeamlogourl)">
                               </b-col>
                               <b-col class="col-2 p-0 m-0">
                                
                               </b-col>
                               <b-col class="col-5 pl-0 text-left">
                                <img v-if="game.awayteamtype === 'Company'" class="pt-3 pb-3" :src="getLogoImage(game.awayteamlogourl)">
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
                           
                            <b-button v-if="currentRound>0" size="sm" class="mt-2 mt-md-0" v-on:click="getGamesFinished('button','Omgång 1')" variant="primary">Omgång 1</b-button>                           
                            <b-button v-if="currentRound>1" size="sm" class="mt-2 mt-md-0" v-on:click="getGamesFinished('button','Omgång 2')" variant="primary">Omgång 2</b-button> 
                            <b-button v-if="currentRound>2" size="sm" class="mt-2 mt-md-0" v-on:click="getGamesFinished('button','Omgång 3')" variant="primary">Omgång 3</b-button>
                            <b-button hidden size="sm" class="mt-2 mt-md-0" v-on:click="getGamesFinished('button','Omgång 4')" variant="primary">Omgång 4</b-button>
                            <b-button hidden size="sm" class="mt-2 mt-md-0" v-on:click="getGamesFinished('button','Omgång 5')" variant="primary">Omgång 5</b-button>
                            <b-button hidden size="sm" class="mt-2 mt-md-0" v-on:click="getGamesFinished('button','Omgång 6')" variant="primary">Omgång 6</b-button>
                            <b-button hidden size="sm" class="mt-2 mt-md-0" v-on:click="getGamesFinished('button','Omgång 7')" variant="primary">Omgång 7</b-button>
                            <b-button hidden size="sm" class="mt-2 mt-md-0" v-on:click="getGamesFinished('button','Sverigefinal')" variant="primary">Sverigefinal</b-button>
                            
                            
                                                
                            <b-button hidden size="sm" v-on:click="getGamesFinished('button','Omgång 3')" variant="primary">Omgång 2 AC</b-button>                            
                          </b-col>
                        </b-row>

                         <b-row v-if="loadinggames3">
                          <b-col>
                            <b-spinner small type="grow" class="mr-2"></b-spinner>Hämtar matcher...
                          </b-col>
                        </b-row>

                         <b-row class="mt-2 mb-4">
                           <b-col>
                              <form v-on:submit.prevent="search">
                                <input type="text" id="searchfield3" class="form-control filterfield" placeholder="Sök på spelarnamn eller klubb">
                                <b-button @click="gamesarray='games3',search()" variant="success" class="mt-1 ml-2 btn-sm">Sök</b-button>
                                <b-button @click="gamesarray='games3',cancelsearch()" variant="danger" class="mt-1 btn-sm">Rensa</b-button>
                              </form>
                           </b-col>
                         </b-row>
                       

                         <b-row v-if="gamescount3 > 0" class="">
                          <b-col v-for="(game,idx1) in games3" :key="idx1" xs="12" sm="12" class="pt-3 pb-3 pl-md-2 pr-md-2 game" v-bind:class="{ greybg: idx1 % 2 === 0 }">                            
                             <b-row>
                                 <b-col class="gameheader col-12 text-center mb-4"> 
                                   <img v-if="game.logourl" class="" :src="getClubLogo(game.logourl)">                                                                                                                                  
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
                                <img v-if="game.hometeamtype === 'Company'" class="pt-3 pb-3" :src="getLogoImage(game.hometeamlogourl)">
                               </b-col>
                               <b-col class="col-2 p-0 m-0">
                                
                               </b-col>
                               <b-col class="col-5 pl-0 text-left">
                                <img v-if="game.awayteamtype === 'Company'" class="pt-3 pb-3" :src="getLogoImage(game.awayteamlogourl)">
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
                     
                          <!-- end -->


                        </b-tabs>
                        <hr class="mt-5" />
</b-container>
</template>



<script>
import { mapGetters } from "vuex";
import { tagsMixin } from "../mixins/tagsMixin";
import AppGameImageGallery from "./GameImageGallery";
/*import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';*/

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
  name: 'Resultat',
  created() {

    if (!globalState.compid) {
    return  
  } else {
    this.axios
      .post(globalState.admin_url + "getCompetition", {id: globalState.compid})
      .then((response) => {
        this.currentRound = response.data.currentround;      
        this.active_round =  this.currentRound;
      })
      .catch((error) => {
        console.log(error);
      }); 
  }   

    this.getGamesInprogress('initial');


    
  },
 watch: {
    $route(newVal, oldVal) {
      immediate: true, (this.modalShow = newVal.meta && newVal.meta.modalShow);
    },
    modalShow: {
      handler: function () {
        if (this.modalShow === false) {
          this.$router.push({ path: "/results" });
        }
      },
    },
  },  
  components: {
    AppGameImageGallery
    
  },
  data() {
    return {
      gamesarray:'games',
      lightbox_image: null,
      doctitle: 'Resultat',
      currentRound: null,
      messages: null, 
      modalShow: false,
      closed: false,
      clubs: 0,
      birdies: 0,
      //IN PROGRESS GAMES
      loadinggames: true,
      updating1: true,
      game: {},
      games: [],
      gamesOrg: [],
      gamescount: 0,

      //TABS
      tabIndex: 0,
      price1: globalState.price1,
      price2: globalState.price2,
      active_round: "Omgång 1",     
      //PENDING GAMES
      loadinggames2: true,
      updating2: true,
      game2: {},
      games2: [],
      games2Org: [],
      gamescount2: 0,
      hasnextgame: false,
      nextgame: {},

      //FINISHED GAMES
      loadinggames3: true,
      updating3: true,
      game3: {},
      games3: [],
      games3Org: [],
      gamescount3: 0,

      team: {
        winner: 0,
        secondchance: 0,
        defeated: 0,
        total: 0,
      },
      searchfield: "",
      showDismissibleAlert: false      
     
    };
  },

  computed: {
        ...mapGetters([
      "user",
      "isAuthenticated",
      "getGames1",
      "getGames2",
      "getGames3"
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
    search: function() {  
      let searchfield;
     if (this.gamesarray==='games')
       searchfield = 'searchfield';

     if (this.gamesarray==='games2')
       searchfield = 'searchfield2';

     if (this.gamesarray==='games3')
       searchfield = 'searchfield3';
     
    let searchvalue = document.getElementById(searchfield).value.toLowerCase();
     this[this.gamesarray] = this[this.gamesarray+'Org'].filter(function(game) {
       //console.log(searchvalue,game.hometeamname.includes(searchvalue.toLowerCase()))
	    return game.hometeamleadername.toLowerCase().includes(searchvalue.toLowerCase()) || game.hometeammembername.toLowerCase().includes(searchvalue.toLowerCase()) || game.awayteamleadername.toLowerCase().includes(searchvalue.toLowerCase()) || game.awayteammembername.toLowerCase().includes(searchvalue.toLowerCase()) || game.clubname.toLowerCase().includes(searchvalue.toLowerCase())
     });
     this[this.gamesarray+'count'] = this[this.gamesarray].length
  },
  cancelsearch: function() {
    let searchfield;
     if (this.gamesarray==='games')
       searchfield = 'searchfield';

     if (this.gamesarray==='games2')
       searchfield = 'searchfield2';

     if (this.gamesarray==='games3')
       searchfield = 'searchfield3';
    let searchvalue = document.getElementById(searchfield);
    searchvalue.value = '';
    this[this.gamesarray] = this[this.gamesarray+'Org'];
    this[this.gamesarray+'count'] = this[this.gamesarray].length;
  },
     formatImage2(image) {
       var first_url = image.split("/upload/").pop();      
       
      return 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,g_auto,c_fill/' + first_url;      
    },
    formatImage(image) {
       var first_url = image.split("/upload/").pop();      
       
      return 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_80,ar_1:1,c_fill,g_auto/' + first_url;      
    },
      getLogoImage(logourl) {      
            var first_url = logourl.split("/upload/").pop();           
            return 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_200,q_auto,c_scale/' + first_url;
            },
            getClubLogo(logourl) {                     
            return 'https://res.cloudinary.com/dn3hzwewp/image/upload/h_50,q_auto,c_scale/' + logourl;
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

      const handleResponse = () =>  {
        this.games = this.games.filter((game) => {
          if (!game.winner) return true;
        });
        this.gamescount = this.games.length;
        this.gamesOrg = this.games;
        //console.log("getGamesInprogress ->  this.games",  this.games)
        this.loadinggames = false;
        this.updating1 = false;
      } 

      //* check if data in stores. Then skip fetch.
      if (this.getGames1.length) {
          this.games = this.getGames1
          handleResponse()
          //do not return here in order to get up to date live reults
      }

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

      this.axios
        .post(globalState.admin_url + "getGamesAdvanced", {
          competition: globalState.compid,
          status: "In progress",
          //"from": today + " " + today_h,
          //"to": today + " 23:59",
          limit: 20,
        })
        .then((response) => {
          this.games = response.data;
          this.$store.dispatch('setGames1', this.games)
          handleResponse()   
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

      const handleResponse = () => {
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
      }

      //* check if data in stores. Then skip fetch.
      if(this.getGames2.length) {
        this.games2 = this.getGames2
        handleResponse()
        return
      }

        //LOAD FINISHED
        if (type === "initial") {
          this.updating3 = true;
          this.getGamesFinished("loader", this.active_round);
        }
 
      this.axios
        .post(globalState.admin_url + "getGamesAdvanced", {
          competition: globalState.compid,
          status: "Pending",
          from: today + " " + today_h,
          //"to": today + " 23:59",
          //"limit": 20
        })
        .then((response) => {
          this.games2 = response.data;
          this.$store.dispatch('setGames2', this.games2)
          handleResponse()
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

      options["competition"] = globalState.compid;
      options["status"] = "Finished";
      if (round === "all") {
        delete options["roundname"];
      } else {
        options["roundname"] = round;
      }

      const today = moment().format("YYYY-MM-DD");
      const today_h = moment().format("HH:mm");

      const handleResponse = () => {
          this.gamescount3 = this.games3.length;
          this.loadinggames3 = false;
          this.updating3 = false;

          //RELOAD IN PROGRESS (INITATOR)
          setTimeout(() => {
            this.updating1 = false;
            this.getGamesInprogress("not-initial"); //in progress
          }, 60000);
      }

      //* check if data in stores. Then skip fetch.
      if(this.getGames3.length) {
        this.games3 = this.getGames3
        handleResponse()
        return
      }

      this.axios
        .post(globalState.admin_url + "getGamesAdvanced", options)
        .then((response) => {
          let finishedgames = response.data;
          let games3 = finishedgames.sort(
            this.compareValues("finishedAt", "desc")
          );
          this.games3 = games3
          this.$store.dispatch('setGames3', games3)
          handleResponse()
       
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
          competition: globalState.compid,
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
              competition: globalState.compid,
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
                  competition: globalState.compid,
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
          competition: globalState.compid,
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
          competition: globalState.compid,
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
            competition: globalState.compid,
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
            competition: globalState.compid,
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
    }
  
 
     
  },

};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/variables.scss";

.filterfield {
  width:50%;
  float:left;
}

.lightbox-image {
      
   max-width:90%;
   max-height:70vh;
   border-radius:0.25em;
    
}

.scorecard_image {
  max-width:80%;
  cursor:pointer;
}

.modal-body {
padding:0rem !important;
}

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

.result.homeleader {
  border-top-right-radius: 0.25em;
  border-bottom-right-radius: 0.25em;
}

.awayleader {
  background-color: $team2;  
}

.result.awayleader {
  border-top-left-radius: 0.25em;
  border-bottom-left-radius: 0.25em;
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

.game img {
  max-width:90%;
}

.game i.missing {
  font-size: 16px;
  color: red;
}

.greybg {
 background: #f6f6f6;
  border-radius: 0.3em;
  -webkit-box-shadow: 0px 0px 7px 0px #DBDBDB; 
  box-shadow: 0px 0px 7px 0px #DBDBDB;
}

.whitebg {
  border: 1px solid #f6f6f6;
  border-radius: 0.3em;
  -webkit-box-shadow: 0px 0px 7px 0px #DBDBDB; 
  box-shadow: 0px 0px 7px 0px #DBDBDB;
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
}

.hometeam span,
.awayteam span {
  display: block;
}

.left-line {
  border-left: 1px solid #e6e6e6;
}




</style>
