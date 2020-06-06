<template>
  <div>
    <vue-headful :title="doctitle" />
    <div class="hidden theme text-center">
      <div class="container">
        <h2 class="when">Matchplay 2020</h2>
      </div>
    </div>

    <div class="hero">      
      <b-container class="d-flex">
        <b-row>
          <b-col class="col-12 col-md-9">            
            <h2>VÄLKOMMEN TILL MATCHPLAY, GOLFTÄVLINGEN FÖR BÅDE PRIVATPERSONER OCH FÖRETAG</h2>
            <p class="mt-3 mt-md-0">Matchplay är en matchspelstävling för par med officiellt handikapp. Par kan vara män, kvinnor eller mix. Tävlingen spelas i Sverige på golfklubbar anslutna till Svenska Golfförbundet.</p>
            <p v-if="!closed">Ta chansen att ta dig till Sverigefinalen och sedan vidare utomlands! Alla deltagare får pikeér från PING.</p>
             <p hidden v-if="closed">I helgen (30-31 maj) lottas första omgången. Den 1 juni startar tävlingen!</p>
            
            <b-alert v-if="closed" show class="mt-4 small" variant="warning">
                Alla matcher är lottade och omgång 1 spelas mellan 1-14 juni!    
                <!-- håll koll via <a href="https://www.facebook.com/pg/matchplaybusines" target="_blank">Facebook</a> och <a href="https://www.instagram.com/matchplaybusiness/" target="_blank">Instagram</a> -->
             </b-alert>

             <div v-if="!closed">
            <h2 class="mb-3">Anmälan stänger om</h2>
            <appCountdown deadline="2020-05-27 18:00:00"></appCountdown>
             </div>

             <b-alert v-if="!closed" show class="mt-4 small" variant="warning">
                Start för tävlingen och sista anmälningsdag är ändrad! Tävlingen startar 1 juni och sista dagen för anmälan är 27:e maj. <a href="https://www.facebook.com/pg/matchplaysweden/posts/?ref=page_internal">Läs mer här</a>
                <span hidden><strong>OBS!</strong> Alla anmälda lag får tröjor från PING men vill man vara säker på att ha dom till matchstart i början av maj så måste man anmäla laget innan 1 april.</span>               
                <!-- håll koll via <a href="https://www.facebook.com/pg/matchplaybusines" target="_blank">Facebook</a> och <a href="https://www.instagram.com/matchplaybusiness/" target="_blank">Instagram</a> -->
             </b-alert>
             <b-alert hidden class="mt-4 small" variant="danger">
                Utvecklarna har kollat på Presidents cup hela natten så releasen blir lite senare under kvällen idag eller eventuellt imorgon förmiddag.
                Håll koll via <a href="https://www.facebook.com/matchplaysweden/" target="_blank">Facebook</a> och <a href="https://www.instagram.com/matchplay_sweden/" target="_blank">Instagram</a>.
             </b-alert>
                       
            <div class="buttons text-left">
              <a v-if="!closed" href="#register" class="btn blue-bg btn-md text-white mt-3 mr-2">Anmälan</a>
              <a href="/mymatchplay" class="btn blue-bg btn-md text-white mt-3">Lag- och matchhantering</a>
              <a href="/register" class="btn btn-warning btn-md text-white mt-3">Efterhandsregistrera spelare</a>
            </div>
          </b-col>
          <b-col class="col-md-3 d-none d-md-block pl-2 justify-content-center align-self-center">           
           <a href="#charity">
            <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/e_colorize,co_rgb:fff/v1576503821/matchplay/badge4.png" title="10% av lagavgiften går till Matchplay Charity"></b-img>            
           </a>

            <b-img hidden src="https://res.cloudinary.com/dn3hzwewp/image/upload/e_colorize,co_rgb:fff/v1573118127/matchplay/matchplay-new-logo-2020.png" alt=""></b-img>
          </b-col>
        </b-row>
      </b-container>
    </div>
<!-- TEMP HIDDEN -->   
    <div class="teaser-container">
      <b-container>
        <b-row>
          <b-col class="mb-3">
            <b-alert hidden class="small" variant="danger">
              <p>
                <h4>Bäste golfare</h4>
Med tanke på det läge vi befinner oss i gällande Coronaviruset och den oro som finns, så vill vi på Matchplay meddela alla våra redan betalda deltagare, samt alla som vill vara med, att <strong>OM någon instans</strong> skulle förklara vår sport golf som ett hot mot virusets framfart och därmed stoppa spel i hela landet i samband med vår start den 1 maj, så kommer <strong>alla få sin deltagaravgift tillbaka</strong>.
Ingen ska känna att man på något sätt chansar med sina pengar för att vi ska kunna genomföra vår härliga tävling. Vi hoppas och tror såklart att golfen istället för att vara en risk för smittspridning, ska vara en sport vi kan <strong>utöva med glädje och spänning</strong> med likasinnade som vanligt.
Vi ses på det kortklippta! <i class="material-icons">favorite</i>
              </p>
            </b-alert>
          </b-col>
        </b-row>
        <b-row>        
          <b-col id="register" ref="register">
            <h2 v-if="!closed" class="teaser-header orange">Anmäl dig som spelare</h2>
            <h2 class="hidden teaser-header orange">Det är klart du vill vara med i golftävlingen, registrera dig här!</h2>
            <b-row class="mb-3 mt-1">
              <b-col md="12" class="teaser-content" ref="success" id="success">
                  <h3 v-if="showqualified" class="mt-3 mb-4">
                    Grattis, du kan vara med i tävlingen <i class="material-icons">tag_faces</i>
                  </h3>

                   <h3 v-if="showqualified32" class="mt-3 mb-4">
                    Grattis, du kan vara med i tävlingen men ditt handicap kommer räknas som 28 i matchspelet. <i class="material-icons">tag_faces</i>
                  </h3>

                  <h3 v-if="showqualifiedNOT" class="mt-3 mb-4">
                    Tyvärr kan du inte vara med i tävlingen, man måste ha 36 eller lägre...
                  </h3>

                   <h3 v-if="showqualifiedNOCLUB" class="mt-3 mb-4">
                    Du verkar inte ha någon klubbtillhörighet, kontakta oss gärna om det inte stämmer!
                  </h3>

                <div class="form-group" v-if="showform1">
                  <b-row class="mt-0 mb-4">
                    
                    
                     <b-col v-if="!closed" xs="12" sm="7">
                       <h4>Alla deltagare får en piké från PING</h4>
                       <b-row>
                         <b-col class="col-7">
                           <p>Tack vare vår sponsor PING förses alla deltagare med en piké när man har anmält sitt lag! <strong>Värde 599:- styck.</strong></p>
                         </b-col>
                         <b-col class="col-5">
                           <router-link to="/ping" class=""><b-img alt="ping" src="https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,h_150/v1575881646/matchplay/ping/ping_shirts.png"></b-img></router-link>
                         </b-col>
                       </b-row>
                       
                     </b-col>                
                    
                      <b-col xs="12" sm="12" class="mt-0 mt-md-0">


                       <h4>Matcher</h4>
                        <p hidden>Inom kort kommer bokade matcher visas här samt annan information om lagen!</p>
                        <b-row v-if="loadinggames">
                          <b-col>
                            <b-spinner small type="grow" class="mr-2"></b-spinner>Hämtar matcher...
                          </b-col>
                        </b-row>
                        <b-row v-if="gamescount === 0 && !loadinggames">
                          <b-col>
                            Inom kort kommer bokade matcher visas här samt annan information om lagen!
                          </b-col>
                        </b-row>

                         <b-row v-if="gamescount > 0" class="">
                          <b-col v-for="(game,idx2) in games" :key="idx2" xs="12" sm="12" class="pt-5 pb-5 pl-md-2 pr-md-2 game" v-bind:class="{ greybg: idx2 % 2 === 0 }">                            
                             <b-row>
                                 <b-col class="gameheader col-12 text-center mb-4">                                                                                                                              
                                   <span v-if="game.clubname">{{game.clubname}}</span>
                                   <span v-if="!game.clubname">Golfklubb saknas</span>
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
                                    <span v-if="game.status === 'In progress'">{{getScore(game.result)}}</span>                                            
                                 </b-col>
                                  <b-col class="awayteam col-5 text-left pl-2 pt-2 pb-2" v-bind:class="{ awayleader: game.status != 'Pending' && (game.result < 0 || game.awayteam == game.winner ) }">
                                   <span>{{lastname(game.awayteamleadername)}}</span>
                                   <span v-if="game.awayteammembername">{{lastname(game.awayteammembername)}}</span>
                                   <span v-if="!game.awayteammembername">EJ REG SPELARE<i class="material-icons ml-1 mb-1 missing">warning</i></span>                                   
                                 </b-col>                                
                             </b-row>
                             <b-row>
                               <b-col class="col-5 pr-0 text-right">
                                <img v-if="game.hometeamtype === 'Company'" class="pt-3 pb-3" :src="`https://res.cloudinary.com/dn3hzwewp/image/upload/h_50,c_scale/matchplay/logos/${game.hometeamlogourl}.png`"></span>
                               </b-col>
                               <b-col class="col-2 p-0 m-0">
                                
                               </b-col>
                               <b-col class="col-5 pl-0 text-left">
                                <img v-if="game.awayteamtype === 'Company'" class="pt-3 pb-3" :src="`https://res.cloudinary.com/dn3hzwewp/image/upload/h_50,c_scale/matchplay/logos/${game.awayteamlogourl}.png`"></span>
                               </b-col>
                             </b-row>
                             <b-row>
                                <b-col class="col-12 text-center mt-4">
                                <span v-if="game.status === 'In progress'"><b-spinner small type="grow" class="mr-2 mb-1 red"></b-spinner>LIVE <span v-if="game.holesleft">efter {{18-game.holesleft}} hål</span></span>
                                   <span v-if="game.status === 'Pending' && game.gamedate"><i class="material-icons mr-2 mb-1">schedule</i>{{getgamedate2(game.gamedate,game.gametime)}}</span>
                                   <span v-if="game.status === 'Finished' && game.finishedAt"><i class="material-icons mr-2 mb-1 green">check_circle_outline</i>{{getgamedate2(game.gamedate)}} sedan</span>
                                </b-col>
                             </b-row>                             
                          </b-col>
                         </b-row>                         
                         
                     </b-col>
                     
                      <b-col hidden xs="12" sm="12" class="mt-5 mt-md-3 mr-0">
                       <h4>Topplista klubbar *</h4>
                        <b-row v-for="(club,idx) in clubs" :key="idx">
                          <b-col class="col-10 mr-0 pr-0">
                              <span class="line">{{idx+1}}. {{truncate(club.club)}}</span>
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
                       <b-row v-if="!closed" class="mt-4 mb-2">
                    <b-col xs="12" sm="12" class="mt-2">
                      <h4>Skriv in ditt Golf-ID</h4>
                      <p>Börja med att ange ditt Golf-ID så hämtar vi en del av informationen automatiskt från Svenska Golfförbundet.</p>
                    <b-alert hidden show variant="danger">
                      Vi har just nu problem med kopplingen till GIT men jobbar på en lösning, prova igen lite senare!
                    </b-alert>
                    </b-col>
                  </b-row>

               <b-form  inline @submit.stop.prevent @submit="getGolfId" @reset="onReset" v-if="showform1 && !closed">
                  <b-input :state="validation" v-model="golfid"
                    inputmode="numeric"
                    pattern="[- +()0-9]+"
                    type="text"
                    size="lg"
                    style="width:200px;"
                    class="form-control mr-1"
                    id="golfid"
                    placeholder="xxxxxx-xxx"
                    value                             
                  />                              
                  
                  <b-input hidden v-model="golfid2"
                    ref="golfid2"
                    inputmode="numeric"
                    pattern="[0-9]*"
                    type="text"
                    style="width:100px;"
                    class="form-control ml-1"                
                    id="golfid2"
                    placeholder="xxx"
                    value
                  />                  
                  <b-button type="submit" size="md" variant="primary" class="btn blue-bg btn-special ml-0 mt-1 ml-sm-2 mt-sm-0"><b-spinner v-if="showloadgolfid" small type="grow" class="mr-2"></b-spinner>{{ contbutton1 }}
                    
                  </b-button>
                  
                   <b-form-invalid-feedback :state="validation" v-if="showhelper">
        Ange ditt Golf-ID med de 6 första siffrorna i ditt personnummer och sedan 3 siffror efter bindestrecket.
      </b-form-invalid-feedback>      
       <b-form-valid-feedback :state="validation" v-if="showhelper">
        Ser bra ut!
      </b-form-valid-feedback>
                  <button type="submit" v-on:click="getGolfId()" class="hidden btn blue-bg mt-1">{{ contbutton1 }}</button>
                </b-form> 
               
               <b-alert class="mt-4 small form-text text-muted"
      :show="dismissCountDown2"
      variant="warning"
     
    >
      <p>Du finns redan med i Matchplay som en registrerad spelare.</p>
       <a href="/mymatchplay" class="btn blue-bg text-white mb-3">Logga in</a>
    </b-alert>   
               
                <b-alert class="mt-4 small form-text text-muted"
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p>Vi kunde tyvärr inte hitta ditt Golf-ID hos Svenska Golfförbundet, var vänlig försök igen.</p>
      <b-progress
        variant="warning"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>                
                   <b-alert v-if="!closed" show class="mt-4 small form-text text-muted">Saknar du ditt Golf-ID ber vi dig kontakta din hemmaklubb för hjälp.</b-alert>                  
                   
                    

                    <div class="col-12 d-block d-md-none justify-content-center align-self-center p-5">           
            <a href="#charity">
            <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/v1576503821/matchplay/badge4.png" alt=""></b-img>            
            </a>
          </div>

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
                    När registreringen är genomförd väljer du att skapa ett lag eller så blir du ihopkopplad med ett befintligt lag där du har blivit vald som lagmedlem.
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

            <b-row class="mb-5 mt-5">
              <b-col md="12" class="teaser-content">
                
                <h3 class="orange mb-3">SÅ HÄR FUNGERAR DET</h3>

<p>Matchplay spelas 2020 i hela Sverige och är en tävling för 2-mannalag (herr, dam eller mixed). Officiellt HCP krävs för att delta. Tävlingsformen är 4-boll, Match/Bästboll. Beroende på antal anmälda lag kommer det bli 6-7 omgångar fram till Sverigefinalen. Varje omgång spelas inom 2 veckor där det vinnande laget går vidare i tävlingen.</p>
<p>Ta er till Sverigefinalen och upplev en magisk helg med Matchplay! Sverigefinalen görs upp på en golfklubb som ligger geografiskt bra till för de kvarvarande fyra lagen. Hotell, frukost, all golf samt en bankett på kvällen ingår. De 2 bästa lagen i Sverigefinalen åker med Matchplay till Spanska solkusten för att göra upp om titeln. Flyg, hotell och allt spel ingår för de bägge lagen.
</p>
  <p>
  Priset för deltagande i tävlingen är 900:-/lag för privatpersoner och 2400:-/lag (exkl. moms) för företag. Varje lag är garanterat minst 2 matcher.
</p>
                <b-container class="mt-5 mb-4">
      <b-row>
          <b-col class="col-12 col-md-4 p-2">            
            <div class="step">
            <i class="material-icons">assignment_turned_in</i>
            <h5>Registrering</h5>
            <p>Börja med att skriva in ditt Golf-ID på matchplay.se där du direkt får besked om du är kvalificerad. Ha din lagkamrats Golf-ID tillhands och önskad modell/storlek på piké. Du blir sedan direkt inloggad för att påbörja ditt lagbygge.</p>
            </div>
          </b-col>

          <b-col class="col-12 col-md-4 p-2"> 
            <div class="step">
            <i class="material-icons">supervised_user_circle</i>
            <h5>Laganmälan</h5>
            <p>Nu ska du som lagkapten skapa ditt lag och väljer typ av lag (privat/företag), lagmedlem och pikeér från PING. Laget blir inte aktivt förrens du har betalat med swish (privatpersoner), voucher eller faktura (företag).</p>
            </div>
          </b-col>

         <b-col class="col-12 col-md-4 p-2">
           <div class="step">
            <i class="material-icons">ballot</i>
            <h5>Lottning</h5>
            <p>I slutet av maj görs lottningen för den första omgången och där det tas hänsyn till att alla lag ska få så kort resa som möjligt. Du kommer få information via mail samt på matchplay.se när lottningen är klar och du kan då se vilket lag ni kommer möta.</p>
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
            <p>Fyra lag tävlar i Sverigefinalen och denna kommer äga rum på en golfklubb som ligger geografiskt bra till för de tävlande 4 lagen. Hotell, frukost, all golf samt en bankett på kvällen ingår.</p>
            </div>
          </b-col>

          <b-col class="col-12 col-md-4 p-2">
            <div class="step">
              <i class="material-icons">flight_takeoff</i>
            <h5>Finalen</h5>
            <p>De 2 vinnande lagen i Sverigefinalen åker med Matchplay till Spanska solkusten för att göra upp om titeln. Flyg, hotell och allt spel ingår för de bägge lagen och på vilken bana finalen spelas blir klart under sommaren 2020 (beroende på utv. av Covid-19).</p>
            </div>
          </b-col>

         <b-col class="col-12 mt-4">
                     <a href="/info" class="btn blue-bg btn-md text-white mb-3">Läs mer här</a>          
         </b-col>

      </b-row>
 </b-container>
              </b-col>
              
            </b-row>
          </b-col>          
          
        </b-row>
      </b-container>
    </div>

<div class="teaser-container" id="charity" ref="charity">
 
 

  <b-container>
<b-row>
   
   <b-col class="mb-3">
<h2 class="teaser-header orange">Matchplay Charity</h2>
   </b-col>
</b-row>

<b-row>
   
  

    <b-col md="5" class="p-5">
       <img src="https://res.cloudinary.com/dn3hzwewp/image/upload/v1576504784/matchplay/charity.png">
    </b-col>
    <b-col md="7">
       <p class="mt-4 mt-md-0 pt-md-4">
         Stiftelsen Matchplay Charity grundades med mål att göra skillnad. Vi vill bidra till att hjälpa människor till bättre livskvalitet, hälsa och välmående. Detta genom att främja fysisk aktivitet och att förebygga psykisk ohälsa. Stiftelsens grundare Andreas Granqvist och Henrik Larsson har länge haft visionen, nu har de satt målen och det är ämnen som de själva har ett brinnande engagemang för. Med er laganmälan bidrar ni med 10% av anmälningsavgiften varje år.
      </p><p><a href="https://matchplaycharity.se/"  target="_blank" class="btn blue-bg btn-md text-white mb-3">Läs mer på vår hemsida</a>          
       </p>
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
import { tagsMixin } from "../mixins/tagsMixin";
/*import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';*/
import { VueTelInput } from 'vue-tel-input'
import FlipCountdown from "./FlipCountdown";

import moment from 'moment';
import VueMoment from 'vue-moment';
import { globalState } from "../main.js";

moment.locale('sv');

moment.updateLocale('sv', {
    relativeTime : {
        future: "om %s",
        past:   "%s",
        ss : '%d sek',
        m:  "1 minut",
        mm: "%d min",
        h:  "en timme",
        hh: "%d timmar",
        d:  "en dag",
        dd: "%d dagar",
        M:  "en månad",
        MM: "%d mån",
        y:  "ett år",
        yy: "%d år"
    }
});



export default {
  name: "hello",
components: {   
      //'phone':VuePhoneNumberInput,
     // 'phone':VueTelInput,
      VueTelInput,
      appCountdown: FlipCountdown

    },
  data() {
    return {

  closed: true,
  leader:'',
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
        onlyCountries: ["SE","NO","DK"],
        ignoredCountries: [],
        autocomplete: "off",
        name: "telephone",
        maxLen: 25,
        wrapperClasses: "",
        inputClasses: "form-control",
        dropdownOptions: {
          disabledDialCode: false
        },
        inputOptions: {
          showDialCode: false
        }
      },
      clubs: 0,
       loadinggames: true,
      game: {},
      games: [],
      gamescount: 0,
      loadinggames: true,
      game1: {},
      games1: [],
      gamescount1: 0,
      loadinggames2: true,
      game2: {},
      games2: [],
      gamescount2: 0,
      showhelper: false,
      //contbutton1: 'Fortsätt till nästa steg',
      docontinue: true,
      contbutton1 : 'Fortsätt',
      showpasswordsdontmatch: false,
      showspinnerregisteruser: false,
      showerror: false, //if user exists when register
      emailexist: '',
      showloadgolfid: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      dismissCountDown2: 0,
      test:'',
      showDismissibleAlert: false,
      golfid: '',
      golfid2: '',
      doctitle: this.$store.state.conferencename,
      form: {       
        golfid: "",
        mobile: "",
        firstname: "",
        lastname: "",
        hcp: "",
        club: "",
        email:"",
        password:"",
        password2:""
      },      
      showform1: true,
      showform2:false, //should be default false
      showqualified: false,
      showqualified32: false,
      showqualifiedNOT: false,
      showqualifiedNOCLUB: false
    };
  },
   
  computed: {

     

      validation() {

      let validated = false;

      var re = /^[- ]*[0-9][- 0-9]*$/;
       if (re.test(this.golfid)) {

        if (this.golfid.length === 6) {
          this.golfid = this.golfid + '-'
          validated = true;
        }

        if (this.golfid.length === 10) {
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
      validateEmail() {
         
         if (this.form.email.length < 4) {
           return;
         }

         var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return re.test(String(this.form.email).toLowerCase());
         
      },
      validatePassword1() {
         if (this.form.password.length === 0) {         
          return;
        }
         return this.form.password.length > 7;
      },
      validatePassword2() {
        if (this.form.password.length === 0) {
          this.showpasswordsdontmatch = false;
          return;
        }
         return this.form.password === this.form.password2;
      }
    },
  mixins: [tagsMixin],
  mounted: function () {
        //console.log("ROUTE", this.$route.query.resetpw)

        this.$store.dispatch('updateUserInfo');
        //this.getTopListClubs();
        this.getGames(); //in progress, finished, pending
  },
 
  methods: {    
  getScore(result) {

    this.leader = '';
    
      if (result > 0) { //home team leads
        this.leader = 'home';
        return result + 'UP';
      }
      if (result < 0) { //away team leads
        this.leader = 'away';       
        return result.substr(1) + 'UP'        
      }
      if (result == 0) { //A/S        
        return 'A/S'
      }
  },
   lastname(thename) {        
        //return thename.split(" ")[1]
        let names = thename.split(" ")
       return names[names.length - 1]
      },
  getgamedate2: function(gamedate,gametime) {
        var gamedate2 = '"' + gamedate + '"' + ' ' + gametime;
        return moment(gamedate2, "YYYY-MM-DD hh:mm").fromNow(); 
     }, 
 getgamedate: function(finishedat) {  
        let gamedate2 = new Date(finishedat);       
        return moment(gamedate2, "YYYY-MM-DD hh:mm").fromNow();  
     },

     truncate: function(club) {
        let len = 30;
        if (club.length > len)
          return club.substring(0,len) + '...';
        else
          return club;
      },
      getGames() {

                //loading
               
                this.gamescount = 0;

                  const today = moment().format("YYYY-MM-DD");
                  const today_h = moment().format("HH:mm");

                  this.axios.post(globalState.admin_url + 'getGamesAdvanced', {                       
                        "competition":"sFAc3dvrn2P9pXHAz",                        
                        "status":"In progress",                       
                        //"from": today + " " + today_h,
                        //"to": today + " 23:59",
                        //"limit": 10
                   
                    })                
               
                    .then(response => {
                        //console.log(response.data)                                                
                        this.games = response.data;                  
                        this.gamescount = this.games.length;

                        //Get finished games
                        let finishedgames = [];
                        this.axios.post(globalState.admin_url + 'getGamesAdvanced', {                       
                        "competition":"sFAc3dvrn2P9pXHAz",
                        "status":"Finished",
                        //"from": today + " " + today_h,
                        //"to": today + " 23:59",
                        "limit": 10
                   
                        })                
                  
                        .then(response => {
                            //console.log(response.data)
                            finishedgames = response.data;
                          
                            this.games = this.games.concat(finishedgames);              
                            this.gamescount = this.games.length;

                            //GET UPCOMING GAMES                           
                              let upcominggames = [];
                              this.axios.post(globalState.admin_url + 'getGamesAdvanced', {                       
                              "competition":"sFAc3dvrn2P9pXHAz",
                              "status":"Pending",
                              //"from": today + " " + today_h,
                              //"to": today + " 23:59",
                              "limit": 10
                        
                              })                
                        
                              .then(response => {
                                  //console.log(response.data)
                                  upcominggames = response.data;
                                
                                  this.games = this.games.concat(upcominggames);          
                                  this.gamescount = this.games.length;
                                  this.loadinggames = false;
                              })
                              .catch(error => {
                                  console.log(error);
                                  this.loadinggames = false;
                              });

                            this.loadinggames = false;
                        })
                        .catch(error => {
                            console.log(error);
                            this.loadinggames = false;
                        });


                        


                    })
                    .catch(error => {
                        console.log(error);
                        this.loadinggames = false;
                    });
      },
   getTopListClubs() {

                //loading
                this.value = 5;
                
                this.axios.post('https://matchplay.meteorapp.com/methods/' + 'getTopClubs', {    //getclubstoplist                   
                        "competition":"sFAc3dvrn2P9pXHAz",
	                      "no":10
                    })
                    .then(response => {
                        //console.log(response.data)                        
                        this.clubs = response.data;                        
                      

                    })
                    .catch(error => {
                        console.log(error);
                    });
      },
     countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      },
      showAlert2() {
        this.dismissCountDown2 = true;
      },
    goRouter: function() {
      this.$router.push({ path: "line-up" });
    },
    getGolfId: function(golfid) {      
      //evt.preventDefault();
      //var golfid1 = document.getElementById("golfid1").value;
      //var golfid2 = document.getElementById("golfid2").value;
      if (this.golfid === '') return;
      this.contbutton1 = 'Hämtar data från SGF';    
      this.dismissCountDown2 = false; //hide you exist alert
      this.showloadgolfid = true;
      this.axios      
        .post(
          //"https://colburn-chat-buxom-tamale.eu-gb.mybluemix.net/get_golfid?golfid=" + golfid1 + '-' + golfid2,
          "https://matchplay.meteorapp.com/methods/getPlayerByGolfid",
          //"http://localhost:3000/get_golfid?golfid=" + golfid1 + '-' + golfid2,
          {
                  "golfid": this.golfid                      
                }
        )
        .then(response => {         
          //console.log(response.data);         

          if (response.data.hasOwnProperty('error')) {
              this.contbutton1 = 'Fortsätt';
              this.showAlert();
              this.showloadgolfid = false;
              return;
          }

         
         if (!response.data.hasOwnProperty('notingit')) {  

          //check if user exists in matchplay admin
          if (response.data.exists) {
            this.contbutton1 = 'Prova igen';    
            this.showAlert2();
            this.showloadgolfid = false;
            return;
          }
          //end check
            
          this.showform1 = false;
          this.showform2 = true;
          this.form.golfid = this.golfid;
          this.form.firstname = response.data.firstname;
          this.form.lastname = response.data.lastname;
          this.form.club = response.data.club;
          //this.form.hcp = response.data.hcp;
          this.form.hcp = response.data.hcp.replace(/,/g, '.')

          if (response.data.club == 'empty') {
             this.showqualifiedNOCLUB = true;
             return;
          }

          var element = this.$refs["success"];
          var top = element.offsetTop;         
          window.scrollTo(0,400);
          
//console.log(this.form.hcp)
          if (this.form.hcp < 28.1) {
              this.showqualified = true;
              this.docontinue = true;
          } else if (this.form.hcp > 28 && this.form.hcp < 36.1 ) {
              this.showqualified32 = true;
              this.docontinue = true;
          } else if (this.form.hcp > 36.0) {
               this.showqualifiedNOT = true;
                this.docontinue = false;
          }

          this.showloadgolfid = false;
          
          //this.contbutton1 = 'Fortsätt till nästa steg';
          this.contbutton1 = 'Fortsätt';
          return;
          } else {
            //console.log('empty');
            this.showAlert();
            this.showloadgolfid = false;
            return;
          }
        })
        .catch(error => {          
          console.log(error);
        });
    },
    onSubmit(evt) {
      evt.preventDefault();

    if (this.form.password != this.form.password2) {
       this.showpasswordsdontmatch = true;
       return;
    }

      this.showerror = false;
      this.showspinnerregisteruser = true;
          this.axios.post('https://matchplay.meteorapp.com/methods/userAdd', {           
              //ID: 12345              
              "emails": [
                  {
                      "address": this.form.email
                  }
              ],
              "password": this.form.password,
              "firstname": this.form.firstname,
              "lastname": this.form.lastname,                              
              "golfid": this.form.golfid,
              "mobile": this.form.mobile
            }
          )
          .then(response => {            
            //$(".speaker-single").slideDown(200);
           
            if (response.data.hasOwnProperty('error')) {
              this.showerror = true;
              this.emailexist = this.form.email;  
              this.showspinnerregisteruser = false;
              return;
            }
           
           

           //try to login the user                           
          this.login();

            return;
          })
          .catch(error => {
            console.log(error);
          });
        



      //alert(JSON.stringify(this.form));
    },
     login() {      
        
      this.showloginspinner = true;     

      //DDP LOGIN
      const simpleDDP = require("simpleddp");
      const simpleDDPLogin = require("simpleddp-plugin-login").simpleDDPLogin;

      let opts = {
          endpoint: "wss://matchplay.meteorapp.com/websocket",
          SocketConstructor: WebSocket,
          reconnectInterval: 5000
      };
      const server = new simpleDDP(opts,[simpleDDPLogin]);

      let password = this.form.password;
      let email = this.form.email;
      let parentVue = this;

    // doAsyncOperation1() returns a promise.
trylogin()
.then(() => { 
   console.log('logged in with creds',server.token);      
   //parentVue.showerror = false;
   localStorage.setItem('auth_token',server.token);
   //parentVue.showlogin = false;
   //parentVue.showloginspinner = false;
   //parentVue.doctitle = 'Inloggad';
   //Set params for user
   let userinfo = server.collections.users[0].profile;
   localStorage.setItem('userinfo',JSON.stringify(userinfo));
   this.showspinnerregisteruser = false;
   this.$router.push({ path: "mymatchplay" });
   //this.setuserinfoform();
})
.then((output) => {
  
})
.catch((err) => {  
   console.log('NOT logged in with creds, show error on form')
   //parentVue.showerror = true;
   //parentVue.showloginspinner = false;
});

    async function trylogin() { // (1)
      let response = await server.login(
        {
        password,
        user: {          
            email
        }
      }
      );   
    }


    },
    onReset(evt) {
      this.showform1 = true;
      this.showform2 = false;
      this.showqualified = false;
      this.showqualified32 = false;
      this.showqualifiedNOT = false;
      this.showqualifiedNOCLUB = false;  
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      this.form.password2 = "";      
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });

      //scroll to correct place on page      p
      var element = this.$refs["register"];
      var top = element.offsetTop;
      window.scrollTo(0, top);
      

    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/variables.scss";

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
    font-size:0.8em;
  }
  
}

.game i.missing {
  font-size:16px;
  color:red;
}

.greybg {
  background: #f6f6f6;
}

.hometeam, .awayteam {
 text-transform: uppercase;
}

.gameheader {
  font-size:1.2em;
  text-transform: uppercase;
}

.box {

  border: none;
   border-radius: .3em;
   padding: 1em 1em 1em 1em;  
   font-size:0.8em;
  
  
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

.hometeam span, .awayteam span {
  display:block;
}

.left-line {
  border-left:1px solid #e6e6e6;
}

img {
  max-width: 100%;
}
.theme {
  padding: 10rem 0 5rem 0;
  margin-top: -100px;
  background: url(
    https://res.cloudinary.com/oredev/image/upload/f_auto,q_65/2019/html/background-1.jpg
  );
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
height:calc(1.5em + 1rem + 8px);
margin-top:0 !important;
}

.hero {
  background: url(
      https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70/v1572963227/matchplay/c640cf_76573b7e69c04dc2bb0592399d738a17_mv2_d_4006_3000_s_4_2.jpg
  );

  background-repeat: no-repeat;
  /*background-position: bottom 30% right 0;*/
  background-size: cover;
  color: #fff;
  padding: 180px 0 180px 0;
  background-position: right 0px top 0px;
  @media (min-width: 320px) {
    padding: 6rem 0 5rem 0;
    /*background-position: bottom 10% right 0;*/
  }
  @media (min-width: 480px) {
    padding: 8rem 0 8rem 0;
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
  background: url(
    https://res.cloudinary.com/oredev/image/upload/f_auto,q_65/v1556786227/2019/html/background-1_lower.jpg
  );
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
  border-radius:0.3em;
  border:1px solid #e1e1e1;
  padding:1em;
  min-height:380px;
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
   font-size:0.8em;
   margin: 20px 0 0 0;
}

.step:hover {
  background:#f6f6f6;
}



@media (max-width: 576px){

h3 {
  font-size: 1.4rem !important;
}

h4 {
    font-size: 1.3rem !important;
}

h5 {
    font-size: 1.1rem !important;
}
}




</style>
