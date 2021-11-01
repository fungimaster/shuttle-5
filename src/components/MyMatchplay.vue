<template>
 
<div class="my-matchplay">
    <vue-headful :title="doctitle" />
    <div v-if="loading" class="d-flex justify-content-center mb-3">
        <b-container>
        <b-row align-h="center">
         <b-col md="6" class="text-center">
                 <b-spinner big type="grow" class="m-3" style="width: 5rem; height: 5rem;"></b-spinner>
                 <p class="text-center mb-3"><i class="far fa-robot fa-4x"></i></p>
                 <p>Hämtar lag och matcher...</p>
                 <p hidden class="small">Testa att <a href="/mymatchplay">ladda om sidan</a> om denna sidan fastnar längre än 10 sekunder</p>
                  </b-col>
        </b-row>
        </b-container>
    </div>
    <div v-if="!loading">

        <!---------------------------- LOGIN --------------------------------------->
        <div v-if="showlogin && !showsendreset && !this.$route.query.resetpw">
            <b-container>
                <b-row class="mb-5 mt-5">
                    <b-col md="12" class="mt-3">
                        <h2 class="teaser-header orange">Logga in</h2>
                        <br>
                        <b-form @submit.stop.prevent @submit="login" v-if="showlogin">
                            <b-form-group>
                                <label for="email">E-post</label>
                                <b-input v-model="form.email" inputmode="email" type="email" class="form-control" id="email" placeholder="Ange din e-postadress" value required />
                            </b-form-group>
                            <b-form-group>
                                <label for="pwd">Lösenord</label>
                                <b-input v-model="form.pwd" type="password" class="form-control" id="pwd" placeholder="Ange ditt lösenord" value required />
                            </b-form-group>
                            <b-button type="submit" variant="primary" class="btn blue-bg">
                                <b-spinner v-if="showloginspinner" small type="grow" class="mr-2"></b-spinner>Logga in
                            </b-button>
                            <b-alert v-if="showerror" variant="warning" show class="mt-4 small form-text text-muted">Din e-post eller lösenord stämmer inte, försök igen eller återställ ditt lösenord.</b-alert>
                        </b-form>
                        <div class="mt-4">
                            <small><a href="#" v-on:click="showsendreset = true">Glömt ditt lösenord?</a></small> | <small><router-link
                v-if="!closed"
                to="/register"
              >Anmäl dig</router-link></small>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <!---------------------------- SENDRESET PASSWORD --------------------------------------->
        <div v-if="showlogin && showsendreset && !this.$route.query.resetpw">
            <b-container>
                <b-row class="mb-5 mt-5">
                    <b-col md="12" class="mt-3">
                        <h2 class="teaser-header orange">Skicka email för nytt lösenord</h2>
                        <br>
                        <b-form @submit.stop.prevent>
                            <b-form-group id="input-group-1" label="E-post" label-for="input-1">
                                <b-form-input id="input-1" v-model="sendformreset.email" :state="validateResetEmail" type="email" required placeholder="Skriv den e-postadress du registrerat dig med">
                                </b-form-input>
                            </b-form-group>

                            <b-button v-on:click="sendResetPw()" variant="primary" class="btn blue-bg">
                                <b-spinner v-if="showloginspinner" small type="grow" class="mr-2"></b-spinner>Skicka email om nytt lösenord
                            </b-button>
                            <b-button v-on:click="exitResetPw()" variant="danger" class="btn mt-2 mt-md-0">
                              Avbryt
                            </b-button>
                            <b-alert v-if="showsendreseterror" variant="warning" show class="mt-4 small form-text text-muted">Din e-post stämmer inte, försök igen.</b-alert>
                            <b-alert v-if="showsendresetsuccess" variant="success" show class="mt-4 small form-text text-muted">Ett email har skickats med instruktioner om hur du byter lösenord.</b-alert>
                        </b-form>
                    </b-col>
                </b-row>
            </b-container>
        </div>

        <!---------------------------- RESET PASSWORD --------------------------------------->
        <div v-if="showlogin && this.$route.query.resetpw && !showsendreset">
            <b-container>
                <b-row class="mb-5 mt-5">
                    <b-col md="12" class="mt-3">
                        <h2 class="teaser-header orange">Ange ett nytt lösenord</h2>
                        <br>
                        <b-form @submit.stop.prevent @submit="resetpw">
                            <b-form-group label="Ditt nya lösenord" label-for="input-1">
                                <b-form-input :state="validatePassword1" v-model="formreset.password" type="password" required placeholder="Skapa ett lösenord">
                                </b-form-input>
                                <b-form-invalid-feedback :state="validatePassword1">
                                    Krav på minst 8 tecken
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group label="Skriv ditt lösenord en gång till" label-for="input-1">
                                <b-form-input :state="validatePassword2" v-model="formreset.password2" type="password" required placeholder="Återupprepa lösenordet">
                                </b-form-input>
                                <b-form-invalid-feedback :state="validatePassword2">
                                    Lösenorden stämmer inte...
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-button v-on:click="resetPw()" variant="primary" class="btn blue-bg">
                                <b-spinner v-if="showloginspinner" small type="grow" class="mr-2"></b-spinner>Spara lösenordet
                            </b-button>
                            <b-alert v-if="showsreseterror" variant="warning" show class="mt-4 small form-text text-muted">Tiden för att byta lösenord har gått ut. Begär ett nytt email för att byta lösenord. <a href="/mymatchplay" v-on:click="showsendreset = true">Glömt ditt lösenord?</a></b-alert>
                        </b-form>
                    </b-col>
                </b-row>
            </b-container>
        </div>

        <!---------------------------- LOGGED IN --------------------------------------->
        <div v-if="!showlogin">
            <!---------------------------- STEP 0 --------------------------------------->

            <b-container v-if="team.step === 0">
                <b-row hidden align-h="center" v-if="teams.length === 0 || !teams.length">
                    <b-col md="12" class="text-right">
                        <b-button hidden @click="logoutPrompt" variant="warning" class="mt-3 btn-sm mb-5">Logga ut</b-button>
                    </b-col>
                    <b-col hidden md="12" class="mt-3">
                        <h2 class="teaser-header orange mt-3">Hej {{userdetails.firstname}}</h2>                          
                    </b-col>
                    <b-col hidden md="12" class="mt-3">
                        <h2>Skapa ditt blivande mästarlag</h2>
                        <p v-if="!closed" class="mt-3" >Nu är det dags att skapa ditt lag för matchplay 2022. Klicka på knappen nedan och följ instruktionerna.</p>
                    </b-col>
                    <b-col hidden md="12" class="pt-1 text-center mt-3 mb-5">
                        <b-button variant="primary" class="blue-bg mt-5 mb-3 pulse-button btn-lg" v-on:click="create_team('new')"><i class="material-icons">sports_golf</i> Skapa ditt lag</b-button>
                    </b-col>
                </b-row>
                <b-row hidden align-h="center" class="mb-2">
                    <b-col md="12" class="mt-5">                                             
                        <h2 class="teaser-header">Hej {{userdetails.firstname}}</h2>                    
                    </b-col>
                    <b-col hidden md="6" class="text-right">
                        <b-button v-if="!showteamslist" variant="primary" class="blue-bg btn-sm" v-on:click="create_team('new')"><i class="material-icons smaller">sports_golf</i> Skapa ett lag</b-button>
                    </b-col>
                    <b-col hidden md="12" class="mb-4">
                        <hr>
                    </b-col>
                </b-row>
            </b-container>

            <!-- list of teams --> 
             <b-container>                           
                <b-row align-h="center">                    
                    <b-col class="mt-4 mt-md-5">    
                        <b-alert  variant="warning" class="small">
                            Vi har tyvärr i vår iver att bygga en fantastisk lösning för er gjort lite missar som gör att er match temporärt inte syntes. Det fungerar igen och vi ska försöka att hålla fingrarna i styr framöver.                            
                        </b-alert>      

<b-tabs content-class="mt-3" v-model="tabIndex" no-key-nav>
    <b-tab title-link-class="ml-2" @click="saveTabIndex(0)">
                <template v-slot:title>
                PROFIL
                </template>
                    
                <b-container class="mt-4 mt-md-5" v-if="!loading">                           
                    <b-row hidden>
                        <b-col>
                         <h2 class="teaser-header mt-3">Hej {{userdetails.firstname}}</h2>
                        </b-col>
                    </b-row>                   
                    <b-row align-h="center">
                        <b-col sm="10" lg="6" class="mt-3">
                            
                            <h4><strong>Användaruppgifter</strong></h4>
                            
                                <div class="mt-3">
                                    <div class="">
                                        <b-avatar
                                            variant="warning"
                                            :text="getProfileInitials"
                                            :src="getFaceProfilePic"
                                            size="7rem"
                                            class="mb-2s"
                                            >
                                        </b-avatar>
                                    </div>
                                <br>
            
                        
                            <b-col class="col-12  p-0 mb-4">                                                            
                                <b-form-file
                                accept=".jpg, .png"
                                type="file"
                                id="photo"
                                class="inputfile"
                                v-model="file"
                                />
                                <label class=" d-block w-100" for="photo"
                                ><span class="btn btn-outline-warning"
                                    ><span
                                    style="font-size: 1.5em"
                                    class="material-icons mr-0"
                                    >add_a_photo</span
                                    ></span
                                > 
                                <small v-if="!userinfo.profilepicture">Lägg till en profilbild</small>
                                <small v-else>Uppdatera profilbild</small>
                                
                                </label
                                >
                            </b-col>
                            

                            <b-col v-if="uploading" class="col-12 mb-3">
                                <b-progress height="1rem" variant="secondary" striped animated>           
                                    <b-progress-bar :value="progress">
                                    </b-progress-bar>
                                </b-progress> <samp></samp>
                            </b-col>
                            
                            
                            <label>Namn:</label>
                            <span class="d-inline" v-if="userdetails.firstname">{{userdetails.firstname}} {{userdetails.lastname}}</span>
                            <span v-else><b-skeleton class="d-inline-block mt-1" width="50%"></b-skeleton> </span>    
                            </div>
                            <div>
                            <label>Golf ID:</label>
                                <span class="d-inline" v-if="userdetails.golfid">{{userdetails.golfid}}</span>
                                <span v-else><b-skeleton class="d-inline-block mt-1" width="50%"></b-skeleton> </span>    
                            </div>
                            <div v-if="userdetails.hcp">
                            <label>HCP:</label>
                             <span class="d-inline"><span v-negativeToPostive:arguments="{hcp: userdetails.hcp}">{{ userdetails.hcp }}</span><i id="hcp_help" href="#" tabindex="0" class="fa fa-question-circle ml-2"></i></span>
                                <b-popover target="hcp_help" variant="info" triggers="focus" placement="topright">
                                    <template #title>Information</template>
                                    Din aktuella hcp (inhämtad från GIT idag 05.00).
                                </b-popover>
                            </div>
                            <div>
                            <label>Email:</label>
                                 <span v-if="userdetails.email" class="d-inline">{{userdetails.email}}</span>
                                 <span v-else><b-skeleton class="d-inline-block mt-1" width="50%"></b-skeleton> </span>    
                            </div>
                            <div>
                            <label>Mobilnr:</label>
                                <span v-if="userdetails.mobile" class="d-inline">{{userdetails.mobile}}</span>
                                <span v-else><b-skeleton class="d-inline-block mt-1" width="50%"></b-skeleton> </span>    
                            </div>
                            
                            <div>
                                <label for="input-ref" class="d-inline">Intjänad rabatt:</label>
                                <span v-if="userdetails.referrals" class="d-inline">{{userdetails.referrals*50}} kr</span>
                                <span v-if="userdetails.referrals===0">{{userdetails.referrals}}:-</span>
                                <span v-if="userdetails.referrals > 0">({{userdetails.referrals}} lag)</span>
                                <i id="ref_help" href="#" tabindex="0" class="fa fa-question-circle ml-1"></i>
                                <b-popover target="ref_help" variant="info" triggers="focus" placement="topright">
                                                <template #title>Information</template>
                                                  För varje lag som följt din länk du delat och där ett lag skapas får du 50kr rabatt på nästa års anmälningsavgift.
                                            </b-popover>
                  
                   <b-input v-if="!closed" id="ref_link" class="mt-2" :value="'https://matchplay.se/register?referral='+ userdetails.userId"></b-input>
                   <b-button v-if="!closed" class="mt-3" size="sm" variant="primary" @click="copyLink('ref_link')">Kopiera länk</b-button>
                 
                            </div>



                        </b-col>
                    </b-row>
                    <b-row align-h="center" v-if="teams.length === 0 || !teams.length && !closed">
                          <b-col sm="10" lg="6" class="mt-3">                        
                            <b-button variant="primary" class="blue-bg mt-3" @click="create_team('new')">Skapa ett lag</b-button>
                        </b-col>
                    </b-row>
                     <b-row align-h="center">
                        <b-col sm="10" lg="6" class="mt-5">
                              <h4><strong>Troféer & Statistik</strong><i id="stats_help" href="#" tabindex="0" class="fa fa-question-circle ml-2"></i></h4>
                                <b-popover target="stats_help" variant="info" triggers="focus" placement="topright">
                                                <template #title>Information</template>
                                                  Statistik över spelade matcher mm gäller från och med 2020 och framåt.
                                            </b-popover>
                            <div id="badges" class="badges pt-2 mt-3">
                                 
                                <!-- Registrerat sig -->
                                 <i id="registered" href="#" tabindex="0" class="fas fa-sparkles orange"></i>
                                             <b-popover target="registered" variant="success" triggers="focus" placement="topleft">
                                                <template #title>Trophé</template>
                                                  Registrerat dig på matchplay.se
                                            </b-popover>
                               

                                 <!-- Deltagande lag -->
                                 <i id="numberofteams" href="#" tabindex="0" v-if="userdetails.numberofteams > 0" class="fas fa-star" v-bind:class="{ gold: userdetails.numberofteams > 2, silver: userdetails.numberofteams === 2,bronze: userdetails.numberofteams === 1 }"></i>
                                  <b-popover target="numberofteams" variant="success" triggers="focus" placement="topleft">
                                                <template #title>Trophé</template>
                                                 Deltagit med {{userdetails.numberofteams}} lag i tävlingen (inkl. innevarande år).
                                            </b-popover>

                                 <!-- Ambassador-->                                 
                                 <i id="ambassador" href="#" tabindex="0" v-if="userdetails.isambassador" class="fas fa-award gold"></i>
                                  <b-popover target="ambassador" variant="success" triggers="focus" placement="topleft">
                                                <template #title>Trophé</template>
                                                 Du är en ambassadör för tävlingen! Tack :)
                                            </b-popover>

                                 <!-- First win -->                                         
                                 <i id="firstwin" href="#" tabindex="0" v-if="userdetails.firstwin" class="fas fa-medal gold"></i>
                                  <b-popover target="firstwin" variant="success" triggers="focus" placement="topleft">
                                                <template #title>Trophé</template>
                                                Första matchen vunnen!
                                            </b-popover>
                                

                                <b-container class="mt-4">
                                    <b-row align-h="left">                                 
                                 <b-col class="col-6 col-md-6 text-center p-1">
                                      <div class="stats pt-2 pl-2 pr-2 pb-0" variant="primary">
                                        <label class="d-block">Spelade matcher</label>
                                        <span class="d-inline">{{userdetails.numberofgames}}</span>
                                      </div>
                                 </b-col> 

                                <b-col class="col-6 col-md-6 text-center p-1">
                                      <div class="stats pt-2 pl-2 pr-2 pb-0">
                                        <label class="d-block">Vunna matcher</label>
                                        <span class="d-inline">{{userdetails.numberofwins}}</span>
                                      </div>
                                </b-col> 
                                    </b-row>
                                </b-container>
                     

                                
                                <div hidden>
                                    <hr />
                                Utmärkelser kvar att vinna
<i class="far fa-kiwi-bird"></i>
</div>



                                <!-- <span :id="'badge-teams-'+index" v-for="index in userdetails.numberofteams" :key="index">
                                    <i hidden class="fas fa-badge"></i>
                                <i class="material-icons gold">stars</i>
                                 <b-tooltip :target="'badge-teams-'+index" triggers="hover" placement="top">
                                    Förtjänades för att du deltog i ett lag.
                                </b-tooltip>
                                </span> -->
                               
                            </div>
                        </b-col>
                    </b-row>  

                <!-- MATCH BILDER -->
                    <b-row align-h="center" v-if="myImages">
                        <b-col sm="10" lg="6" class="mt-5">
                              <h4><strong>MINA MATCHBILDER</strong></h4>
                                <app-game-image-gallery v-if="myImages" :images="myImages" align="start" :showAll="true"></app-game-image-gallery>	
                        </b-col>    
                    </b-row>                             
                    
                    <b-row align-h="center" v-if="!showlogin">
                            <b-col sm="10" lg="6" class="mt-4 text-right">
                                <hr />
                                 <h4 hidden><strong>Funktioner</strong></h4>
                    <b-button @click="logoutPrompt" variant="warning" class="btn-sm mt-3 mb-5">Logga ut</b-button>
                            </b-col>
                        </b-row>                    
                </b-container>
             </b-tab>
    <b-tab title-link-class="ml-2" @click="saveTabIndex(1)">
         <template v-slot:title>
      Lag
      </template>    

      <b-modal ref="poll1" id="poll1" title="Undersökning" size="md" no-close-on-backdrop ok-only ok-variant="secondary" ok-title="Cancel">
    <p>Vi blir jätteglada om du skulle vilja svara på denna fråga! <i class="pb-0 mr-2 material-icons red">favorite</i></p>
    <p>
      <strong>{{poll.question}}</strong>
    </p>     
        <b-form-group v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        id="poll_1"
        v-model="poll.poll"
        :options="poll.pollOptions"
        :aria-describedby="ariaDescribedby"
        name="poll_1"
        stacked
      ></b-form-radio-group>
    </b-form-group>         
     <b-button :disabled="hasPoll" class="mt-3" variant="success" block @click="postPoll">Skicka in!</b-button>
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

<b-modal ref="my-modal-reminder" hide-footer="">
    <b-container class="p-1">
     <b-row>
       <b-col>       
             <h2><strong>Påminn din lagkamrat</strong></h2>


        </b-col>
     </b-row>
    </b-container>
    <b-button class="mt-3" variant="outline-danger" block @click="hideModal('my-modal-reminder')">Stäng</b-button>
  </b-modal>

<b-modal ref="my-modal" hide-footer="">
    <b-container class="p-1">
     <b-row>
       <b-col>       
             <h2><strong>Välj reserv</strong></h2>


                                <b-form-group>
                                    <label for="name">Reserv (xxxxxx-xxx)</label>
                                    <b-form-input id="teamreservename" v-model="team.teamreservename" placeholder="Golf id (xxxxxx-xxx)">
                                    </b-form-input>
                                    <b-button @click="checkGolfID(team.teamreservename,'3')" variant="info" size="sm" class="float-right mt-1">
                                        <b-spinner v-if="showspinner_3" small type="grow" class="mr-2"></b-spinner>Sök spelare
                                    </b-button>
                                </b-form-group>
                                <b-alert v-if="team.showplayer3" :variant="team.checkgolfidvariant3" show class="mt-4 small form-text">
                                    Spelare: {{team.player_3_name}}<br>
                                    HCP: {{team.player_3_hcp}}

                                    <b-form-input class="mt-2" v-if="!team.player_3_exists" v-model="team.teamreserveemail" placeholder="E-mail till reserven" required>
                                    </b-form-input>

                                    <p class="mt-2" v-if="!team.player_3_exists">
                                        När du sparar laget kommer vi skicka en inbjudan till din lagkamrat.
                                    </p>
                                    <p hidden class="mt-2" v-if="team.player_3_exists">
                                        {{team.player_3_name}} har ett matchplay-konto och kommer att få en förfrågan via email om att vara med i ditt lag.
                                    </p>
                                   <b-button v-if="team.checkgolfidvariant3 === 'primary'" @click="saveReserve()" variant="success" size="sm" class="float-right mt-3">
                                        Spara
                                    </b-button>
                                    <b-form-input hidden v-model="team.teamreservegolfid" placeholder="Golfid">
                                    </b-form-input>
                                </b-alert>
                            


        </b-col>
     </b-row>
    </b-container>
    <b-button class="mt-3" variant="outline-danger" block @click="hideModal('my-modal')">Stäng</b-button>
  </b-modal>


            <b-container class="mt-3 mt-md-5" v-if="team.step === 0">        
                <b-row align-h="center" v-if="teams.length === 0 || !teams.length || !closed">
                        <b-col md="12" class="mt-2">                       
                            <h2 hidden>Skapa ditt blivande mästarlag</h2>
                            <p v-if="closed" class="mt-3">Om inga lag syns här har något blivit fel med lagkopplingen, se kontaktuppg. längst ner på sidan.</p>
                        
                            <p v-if="!closed && teams.length === 0 || (!teams.length && !closed)" class="mt-3" >Nu är det dags att skapa ditt lag för matchplay 2022. Klicka på knappen nedan och följ instruktionerna.</p>
                        </b-col>
                        <b-col v-if="!closed && teams.length === 0 || (!teams.length && !closed)" md="12" class="pt-1 text-center mt-2 mb-3">
                            <b-button variant="primary" class="blue-bg mt-3 mb-3 pulse-button btn-lg" v-on:click="create_team('new')"><i class="material-icons">sports_golf</i> Skapa ditt lag</b-button>
                        </b-col>
                </b-row>
               
            </b-container>              
            <b-container v-if="showteamslist && team.step === 0" class="">
                <b-row align-h="center">
                    <b-col cols="12" lg="10" class="pl-1 pr-1">
                        <b-alert dismissible  @dismissed="setCookie" v-if="!team.paid && isEarlyBirdie && showEarlyBirdie" show variant="warning" class="text-dark">Glöm inte bort att just nu har vi vårt Early Birdie erbjudande med ett reducerat ordinarie pris med 100 kr.</b-alert>
                    </b-col>
                    <b-col sm="10" lg="6" class="team pl-1 pr-1 pb-2" v-for="(team,idx) in teams" :key="idx">
                        <b-button :id="'delete-team-' + idx" v-if="team.teamleader && !team.paid" @click="removeTeam(team)" variant="" class="btn-sm delete-team"><i class="material-icons">delete</i></b-button>
                        <b-tooltip :target="'delete-team-' + idx" triggers="hover" placement="top">
                            Radera det här laget
                        </b-tooltip>


                        <b-card class="mb-2 team header">
                            <b-card-title class="mt-2">
                                <span v-if="team.type === 'Company'" class="pr-2">{{team.teamname}}</span>
                                <img v-if="team.type === 'Company'" class="mt-2 pt-3 pb-3 mb-4 d-block teamimage" :src="getTeamLogo(team.logourl)">

                                <span v-else class="pr-2 mt-2">Ditt lag</span>                                
                                
                            </b-card-title>
                            <b-card-text class="mt-0">
                             
                                <div class="pt-0 pb-3">
                                    <span :id="'tooltip-teamleader-' + idx">
                                        <i class="material-icons mr-2">person_pin</i>{{team.teamleadername}} (c)
                                        <b-tooltip :target="'tooltip-teamleader-' + idx" triggers="hover" placement="top">
                                            Lagkaptenen för laget
                                        </b-tooltip>
                                    </span>
                                </div>
                                <div v-if="team.teammembername" class="pt-0 pb-3">
                                    <span :id="'tooltip-teammember-' + idx">
                                        <i class="material-icons mr-2">person_pin</i>{{team.teammembername}}
                                        <b-tooltip :target="'tooltip-teammember-' + idx" triggers="hover" placement="top">
                                            Lagmedlem
                                        </b-tooltip>
                                    </span>
                                </div>
                                <div v-if="!team.teammembername && team.teammembergolfid" class="pt-0 pb-3">
                                    <span :id="'tooltip-teammember2-' + idx">
                                        <i class="material-icons mr-2 red">error</i><span v-if="!team.teammembername && team.teammembergolfid">{{team.teammembergolfid}}</span>
                                        <a @click="showHelpReminder()" class="btn btn-secondary btn-sm text-white mr-md-2 pl-0 pr-0"><i class="fas fa-question ml-1 mr-1 mb-1"></i></a>                                                                            
                                        <b-tooltip hidden :target="'tooltip-teammember2-' + idx" triggers="hover" placement="top">
                                            Vi väntar på att din lagkamrat ska registera sig på matchplay.se
                                        </b-tooltip>
                                    </span>
                                     <b-alert v-if="showhelpreminder" show class="small text-left mt-1" variant="info">
                                            Din medspelare ska ha fått ett mail om att registrera ett konto på matchplay.se för att bli kopplad till detta lag. Har medspelaren av olika anledningar inte fått mailet kan du skicka denna <a target="_blank" :href="`https://www.matchplay.se/register?player=player2&golfid=${team.teammembergolfid}&captain=${team.teamleadername}`">länk</a> som påminnelse.
                                    </b-alert>

                                </div>

                                <div v-if="!team.teammembername && !team.teammembergolfid" class="pt-0 pb-3">
                                <div v-if="!team.teammemberemail && !team.teammembergolfid && !closed">
                                     <i class="material-icons mr-0 red">error</i>
                                    <b-button hidden size="sm" v-if="!team.invoice" @click="goToStep(team, 2)" variant="success" class="ml-0">Bjud in lagkamrat</b-button>
                                    <span @click="goToStep(team, 2)" class="invitemember">Bjud in lagkamrat</span>
                                </div>
                                </div>

                                <div v-if="team.teamreservegolfid" class="pt-0 pb-3">
                                     <span :id="'tooltip-teammember3-' + idx">
                                        <i class="material-icons mr-2">person_pin</i>Reserv: 
                                        <span v-if="team.teamreservename">{{team.teamreservename}}</span>
                                        <span v-else>{{team.teamreservegolfid}}</span>                                      
                                        <b-tooltip :target="'tooltip-teammember3-' + idx" triggers="hover" placement="top">
                                            Denna reserv kan väljas när en match ska startas
                                        </b-tooltip>                                                                                
                                    </span>
                                      <a @click="showHelpReserve()" class="btn btn-secondary btn-sm text-white mr-md-2 pl-0 pr-0"><i class="fas fa-question ml-1 mr-1 mb-1"></i></a>  
                                </div>

                                 <div v-if="!team.teamreservegolfid" class="pt-0 pb-3">                                    
                                     <b-button hidden size="sm" variant="success" @click="showModal(team._id)">Välj reservspelare</b-button>
                                      <i class="material-icons">person_pin</i>
                                     <span class="invitemember" @click="showModal(team._id)">Välj reservspelare</span>
                                     <a @click="showHelpReserve()" class="btn btn-secondary btn-sm text-white mr-md-2 pl-0 pr-0"><i class="fas fa-question ml-1 mr-1 mb-1"></i></a>                                     
                                </div>

                                   <b-alert v-if="showhelpreserve" show class="small text-left" variant="info">
                                            Om ditt lag har en reserv tillgänglig för spel kan hemmalaget, när ni träffas innan spel, välja denna person i samband med att tee väljs innan matchen startar. En reserv måste bara väljas <strong>om någon av de ord. lagmedlemmarna</strong> får förhinder.
                                  </b-alert>

                                <div class="pt-0 pb-3">
                                    <span :id="'tooltip-course-' + idx">
                                        <i class="material-icons mr-2">golf_course</i>{{team.coursename}}
                                        <b-tooltip :target="'tooltip-course-' + idx" triggers="hover" placement="top">
                                            Hemmaklubb för matcher
                                        </b-tooltip>
                                    </span>
                                    <div show variant="info" v-if="clubcount > 0" class="small mt-3 mb-0 p-2 m-0">
                                        <hr class="pt-0 mt-0" />                                        
                                         <b-img v-if="clublogo" class="mt-1 mt-md-0 mr-3 mb-2 pb-1 float-left" :src="getClubImage(clublogo)"></b-img>
                                           <p class="mb-0 d-table-cell">{{team.coursename}} representeras just nu av <strong>{{clubcount}}</strong> lag.
                                           <span v-if="team.paid && clubcount > 1"> Välkommen till gänget!</span>
                                           <span v-if="team.paid && clubcount < 2"> Sprid gärna budskapet om Matchplay på din klubb!</span>
                                           <span v-if="!team.paid">({{clubcount+1}} när ert lag är betalt).</span>
                                           </p>
                                        </div>
                                         <b-alert hidden variant="info" v-if="clubcount === 0" class="small mt-3">                                           
                                             {{clubinfo_first}}
                                        </b-alert>
                                </div>

                                <div class="pt-0 pb-0" v-if="!team.paid && !team.invoice">
                                    <span>
                                        <i class="material-icons">create</i>
                                        <span class="invitemember" @click="goToStep(team, 1)">Redigera laget</span>                                        
                                    </span>
                                    <b-alert v-if="team.type==='Private'" show variant="info" class="small mt-3">
                                        Glöm inte att du kan utnyttja tävlingsavgiften som friskvårdsbidrag mot din arbetsgivare. Sedan 2020 godkänns golftävlingar som friskvårdsbidrag. Kvitto erhålls efter betalning.
                                    </b-alert>
                                </div>
                               

                                <div class="pt-0 pb-0" hidden>
                                    <span :id="'tooltip-nextgame-' + idx">
                                        <i class="material-icons mr-2">date_range</i>Väntar på lottning
                                        <b-tooltip :target="'tooltip-nextgame-' + idx" triggers="hover" placement="top">
                                            Nästa match
                                        </b-tooltip>
                                    </span>
                                </div>
                                <div hidden v-if="team.sponsmerch" class="mt-4">
                                    <b-container>
                                        <b-row>
                                            <b-col class="col-6 text-center p-0 m-0">{{getFirstname(team.teamleadername)}} ({{team.sponsmerch.property01}})<br>
                                                 <img :src="`https://res.cloudinary.com/dn3hzwewp/image/upload/w_40,c_scale/v1575307928/matchplay/ping/${team.sponsmerch.item01}.png`">
                                   
                                            </b-col>

                                             <b-col class="col-6 text-center p-0 m-0">{{getFirstname(team.teammembername)}} ({{team.sponsmerch.property02}})<br>
                                                 <img :src="`https://res.cloudinary.com/dn3hzwewp/image/upload/w_40,c_scale/v1575307928/matchplay/ping/${team.sponsmerch.item02}.png`">
                                    
                                            </b-col>
                                        </b-row>
                                    </b-container>
                                   
                                  
                                </div>
                                
                                <div hidden v-if="!team.sponsmerch">
                                    <b-button size="sm" @click="goToStep(team, 3)" variant="success" class="mt-3">Välj tröjor</b-button>
                                </div>
                            </b-card-text>
                            <template v-slot:footer>
                                <p class="mb-0" style="color:green;" v-if="team.paid">
                                    <i class="material-icons mr-1 mb-1">attach_money</i>{{text.paidteam}}
                                    <b-button v-if="team.paidamount>0" @click="getReceipt(team)" variant="success" class="btn-sm float-right"><i class="material-icons mr-1 mb-1">receipt</i>Kvitto</b-button>                                    
                                </p>
                                <p class="mb-0" style="color:red;" v-if="!team.paid">
                                    <i class="material-icons mr-2">money_off</i>{{text.not_paidteam}}                                    
                                    <span style="color:black;" class="small d-block" v-if="team.invoice">
                                        <i class="material-icons mr-2">help_outline</i>(Vi bearbetar din faktura)</span>
                                    <b-button v-if="!team.invoice && !closed" @click="goToStep(team, 3)" variant="success" class="btn-sm float-right">Betala</b-button>
                                </p>                                
                            </template>
                            <b-button hidden variant="primary" class="blue-bg">Redigera lag</b-button>
                        </b-card>
                    </b-col>
                    
                </b-row>
                  
            </b-container>
            <b-row align-h="center pt-2 pb-2" v-if="fetchingPlayerData">
                <b-spinner></b-spinner>
            </b-row>
            
            <!--   -->
            <b-form class="mt-4" v-if="showcreateteam" @submit.stop.prevent @submit="save_state1">

                <!-- STEP 1 -->
                <div v-if="team.step > 0">
                    <b-container class="mb-3 mb-md-5">
                        <b-row align-h="center">
                            <b-col md="6">
                                <b-alert v-if="!fetchingPrevData && !previousteam" class="w-100 mt-2 text-dark" show variant="warning"> 
                                    <b-spinner small></b-spinner> Kollar efter sparade lag.
                                    <small class="d-block">Data från tidigare lag används för autofylla formuläret</small>
                                </b-alert>
                         
                                <div class="d-flex justify-content-center mb-2">   
                                   
                                    <div v-if="previousteam && previousteam.teamleader">
                               
                                         <div class="d-blick border mt-1 p-3 rounded ">
                                               <small> 
                                                  Ditt lag med lagkamrat <strong>{{previousteam.teammembername}}</strong> och hemmaklubb <strong>{{previousteam.coursename}} </strong>finns sparat. 
                                                  Klicka nedan för att använda samma information i årets lag. 
                                                </small>
                                                <b-button class="w-100 mt-2" @click="populateTeamsForm" variant="warning"> 
                                                  Autofyll formuläret! 
                                                </b-button>
                                           
                                         </div>

                                    </div>

                                </div>
                                <b-card class="mt-0 mb-1 pt-0" no-body>
                                    <b-card-header>
                                        Ditt lag<span v-if="team.name != ''">: {{team.name}}</span>                                        
                                        <img class="overview-logo" v-bind:src="team.logo" v-if="team.type === 'Company'" />
                                    </b-card-header>
                                    <b-card-body>
                                        <b-card-text class="mt-1">
                                            <div hidden class="pt-0 pb-3">
                                                <span id="tooltip-teamleader">
                                                    <i class="material-icons mr-2">supervised_user_circle</i> {{userdetails.firstname}} {{userdetails.lastname}}<span v-if="team.player_2_name"> & {{team.player_2_name}}</span>
                                                    <b-tooltip target="tooltip-teamleader" triggers="hover" placement="top">
                                                        Lagmedlemmar
                                                    </b-tooltip>
                                                </span>
                                            </div>

                                            <div v-if="team.type" class="pt-0 pb-1">
                                                <span id="tooltip-team-type">
                                                    <i class="material-icons mr-2">label</i>
                                                    <span v-if="team.type === 'Private'">Privat</span>
                                                    <span v-if="team.type === 'Company'">Företag</span>
                                                    <span v-if="team.type === 'Company' && team.company != ''">: {{team.company}}</span>
                                                    <b-tooltip target="tooltip-team-type" triggers="hover" placement="top">
                                                        Lagtyp
                                                    </b-tooltip>
                                                </span>
                                            </div>

                                            <div v-if="team.course" class="pt-0 pb-2">
                                                <span id="tooltip-course">
                                                    <i class="material-icons mr-2">golf_course</i> {{team.course}}
                                                    <b-tooltip target="tooltip-course" triggers="hover" placement="top">
                                                        Hemmaklubb för matcher
                                                    </b-tooltip>
                                                </span>
                                            </div>
                                            <div v-if="team.shirtPicker.player1.shirt || team.shirtPicker.player2.shirt" class="pt-0 pb-3">
                                                <span id="tooltip-pike">
                                                    <b-img v-if="team.shirtPicker.player1.shirt" class="mr-2" id="shirtimage1" :src="getShirtImg(team.shirtPicker.player1.shirt)"></b-img> {{team.shirtPicker.player1.size}}<br>
                                                    <b-img v-if="team.shirtPicker.player2.shirt" class="mr-2" id="shirtimage1" :src="getShirtImg(team.shirtPicker.player2.shirt)"></b-img> {{team.shirtPicker.player2.size}}
                                                    <b-tooltip target="tooltip-pike" triggers="hover" placement="top">
                                                        Pikétröjor
                                                    </b-tooltip>
                                                </span>
                                            </div>
                                        </b-card-text>
                                        <template v-slot:footer>
                                            <p class="mb-0" style="color:green;" v-if="this.paymentstatus === 'PAID'">
                                                <i class="material-icons mr-2">attach_money</i>{{text.paidteam}}
                                            </p>
                                            <p class="mb-0" style="color:GREY;" v-if="this.paymentstatus != 'PAID'">
                                                <i class="material-icons mr-2">money_off</i>{{text.not_paidteam}}
                                            </p>
                                        </template>
                                    </b-card-body>

                                </b-card>
                            </b-col>
                        </b-row>
                    </b-container>

                    <b-container hidden fluid class="mb-3 pl-0 pr-0">
                        <b-row class="">
                            <b-col class="" style="color:green;" v-if="team.paid">
                                <i class="material-icons mr-2" style="vertical-align: sub;">attach_money</i>{{text.paidteam}}
                            </b-col>
                            <b-col class="" style="color:red;" v-if="!team.paid">
                                <i class="material-icons mr-2" style="vertical-align: sub;">money_off</i>{{text.not_paidteam}}
                            </b-col>
                        </b-row>
                    </b-container>
                </div>
                <div v-if="team.step ===1">

                    <b-container>
                        <b-row align-h="center">
                            <b-col md="6">
                                <b-form-group class="mb-3">
                                    <p v-if="!team.type">Vill du anmäla ett Privatlag eller Företagslag?</p>
                                    <label for="type">Välj lagtyp:</label>
                                    <b-form-select v-bind:disabled="team.is_readonly" id="type" v-model="team.type" :options="teamoptions" :state="validation_type" required>
                                    </b-form-select>
                                </b-form-group>
                                <b-alert show v-if="team.type==='Company'" variant="warning" class="small">                                   
                                <p>I vårt <strong>företagspaket</strong> ({{team.price_company}}:-) för företag ingår:</p>
                                <ol>
                                    <li>
                                        Ett lag i tävlingen
                                    </li>
                                    <li>
                                        Synlighet på resultatsidan med er logo
                                    </li>
                                </ol>
                    
                            
           
     <p class="pt-3"><strong>Faktureras: </strong><span v-if="team.company_big">{{team.price_company2}}:- (exkl. moms)</span>
     <span v-else>{{team.price_company}}:- (exkl. moms)</span>
     </p>
                                </b-alert>
                                         
                                <b-alert show v-if="team.type==='Company_big'" variant="warning" class="small">
                                <p>I vårt STORA företagspaket erbjuder vi följande utöver vårt vanliga företagspaket:</p>
                                 <ol>                                    
                                    <li>
                                        Nätverksträff i slutet av augusti på en golfklubb (bestäms inom kort) inkl. golfspel, bankett och övernattning
                                    </li>                                     
                                    <li>
                                        Synlighet på matchplay.se som företagssponsor
                                    </li>
                                </ol>
                                <p>Pris:{{team.price_company2}}:- (exkl. moms)</p>
                                </b-alert>
                            </b-col>
                        </b-row>
                        <!-- Team name -->
                        <b-row v-if="team.type === 'Company' && !team.is_readonly" align-h="center">
                            <b-col md="6">
                                <b-form-group class="mb-5">
                                    <label for="name">Företagsnamn</label>
                                    <b-form-input id="companyname" v-model="team.company" required placeholder="Skriv in företagsnamnet" :state="validation_companyname">
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group class="mb-5">
                                    <label for="name">Lagnamn</label>
                                    <b-form-input aria-describedby="unique-teamname" @input="checkTeamNameUnique" id="name" v-model="team.name" required placeholder="Skriv in lagnamnet" :state="validation_name">
                                    </b-form-input>
                                    <b-form-invalid-feedback v-if="team.name != ''" id="unique-teamname">
                                        Det här lagnamnet är tyvärr upptaget. Försök med något annat.
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-form-group class="mb-3">
                                    <label for="name">Företagslogga</label>
                                    <b-form-file @input="uploadCloudinary(this)" style="font-size:0.9em;" v-model="team.file" :state="Boolean(team.file)" placeholder="Ladda upp din företagslogga" drop-placeholder="Drop file here..." accept="image/jpeg, image/png, image/gif"></b-form-file>
                                    <b-form-input hidden id="input-logo" v-model="team.logo"></b-form-input>
                                </b-form-group>
                                <b-form-group class="text-center">
                                    <img class="mb-3" v-bind:src="team.logo" v-if="team.type === 'Company'" />
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <!-- Team name END-->

                        <!-- Course -->
                        <b-row align-h="center">
                            <b-col md="6">
                                <b-form-group class="mb-1" v-if="team.type != null && !team.is_readonly">
                                    <label for="query">Välj hemmaklubb för matcher<i v-b-popover.hover.top="'Välj klubben du är medlem i eller som ligger nära där du bor eller tänkt spela dina matcher på. OBS! 9-hålsbanor kan anges som hemmabana men endast 18-hålsbanor kan användas när tävlingen startar och matcher ska avgöras.'" title="Hjälp" class="help material-icons mr-2">help_outline</i></label>
                                    <suggestions v-model="query" id="query" :options="options" :onInputChange="onCountryInputChange" required :onItemSelected="onSearchItemSelected" style="width:100%;">
                                        <div slot="item" slot-scope="props" class="single-item">
                                            <span class="name">{{props.item.title}}</span>
                                        </div>
                                    </suggestions>
                                     <b-alert small show v-if="ninehole" variant="danger" class="mt-3 small">
                                        Denna klubb kan anges som din hemmaklubb men era hemmamatcher måste spelas på en 18-hålsbana! 2 varv på en 9-hålsbana är inte giltigt i tävlingen.
                                     </b-alert>
                                    <b-form-input hidden id="clubid" v-model="team.clubid" readonly placeholder="Id på klubben">
                                    </b-form-input>
                                    <div show variant="info" v-if="query !== '' && clubcount > 0" class="small mt-3 mb-0 m-0 p-3">
                                                                           
                                         <b-img v-if="clublogo" class="mt-1 mr-3 mb-2 pb-0 float-left" :src="getClubImage(clublogo)"></b-img>
                                        <p class="mb-0 d-table-cell">{{query}} representeras just nu av <strong>{{clubcount}}</strong> lag.
                                         ({{clubcount+1}} när ert lag är betalt).
                                        </p>
                                    </div>
                                     <b-alert hidden variant="info" v-if="query !== '' && clubcount === 0" class="small mt-3">                                                                                 
                                        {{clubinfo_first}}
                                     </b-alert>
                                </b-form-group>
                            </b-col>
                        </b-row>

                        <!-- NEXT STATE -->
                        <b-row align-h="center">
                            <b-col md="6" class="mb-4 mt-3">                                
                                <b-button @click.prevent="cancel_team()" size="sm" variant="light"><i class="material-icons">arrow_back_ios</i>Tillbaka</b-button>
                                <b-button v-if="!team.teammembergolfid" :disabled="team.clubid === ''" size="sm" class="mt-0 mt-sm-0 float-right" @click.prevent="next()" variant="success">
                                    <b-spinner v-if="showloginspinner" size="sm" small type="grow" class="mr-2"></b-spinner>Välj lagkamrat<i v-if="!showloginspinner" class="ml-2 material-icons">arrow_forward_ios</i>
                                </b-button>
                                 <b-button v-if="team.teammembergolfid" size="sm" class="mt-0 mt-sm-0 float-right" @click.prevent="update_team()" variant="success">
                                    <b-spinner v-if="showloginspinner" small type="grow" class="mr-2"></b-spinner>Spara<i class="ml-2 material-icons">save</i>
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-container>
                </div>

                <!-- ######################### CHOSE TEAMMATE #####################-->
                <div v-if="team.step === 2">
                    <b-container>
                        <b-row class="mt-4" align-h="center">
                            <b-col md="6">
                                <p v-if="!team.player_2_name">Bjud in en lagkamrat genom att skriva in dennes golf-ID nedan. </p>
                            </b-col>
                        </b-row>

                        <b-row v-if="!team.completemode" align-h="center">
                            <b-col md="6" class="text-center mb-3">
                                <b-button @click.prevent="skipStep()" variant="success" size="sm">
                                    Bjud in en lagkamrat senare<i class="ml-2 material-icons mr-2">arrow_forward_ios</i>
                                </b-button>
                            </b-col>
                        </b-row>

                        <b-row v-if="team.type != null" align-h="center">                           
                            <b-col md="6">
                                <b-form-group>                                    
                                    <label for="name">Lagkamrat:</label>
                                    <b-form-input :state="validation_teammembername" v-model="team.teammembername" inputmode="numeric" pattern="[- +()0-9]+" id="teammembername" placeholder="Golf id (xxxxxx-xxx)" required>
                                    </b-form-input>
                                    <b-button @click="checkGolfID(team.teammembername,'2')" v-if="!team.is_readonly" variant="info" size="sm" class="float-right mt-1">
                                        <b-spinner v-if="showspinner_2" small type="grow" class="mr-2"></b-spinner> <span v-if="showSearchPlayerAlert">Uppdatera spelarinfo</span> <span v-else>Sök spelare</span> 
                                    </b-button>
                                </b-form-group>
                                <b-alert v-if="team.showplayer2" :variant="team.checkgolfidvariant2" show class="mt-4 small form-text">
                                    <span v-if="team.ownid != ''">{{team.ownid}}</span>
                                    <span v-if="team.ownid === ''">
                                        Spelare: {{team.player_2_name}}<br>
                                        HCP: {{team.player_2_hcp}}
                                        <b-form-input class="mt-2" v-if="!team.player_2_exists" id="teammemberemail" v-model="team.teammemberemail" placeholder="E-mail till deltagaren" :state="validation_teammemberemail" required>
                                        </b-form-input>

                                        <p class="mt-2" v-if="!team.player_2_exists">
                                            När du sparar laget kommer vi skicka en inbjudan till din lagkamrat.
                                        </p>

                                        <p class="mt-2" v-if="team.player_2_exists">
                                            {{team.player_2_name}} har ett matchplay-konto och kommer att få en laginbjudan via email.
                                        </p>

                                        <b-form-input hidden v-model="team.teammembergolfid" placeholder="Golfid">
                                        </b-form-input>
                                    </span>
                                </b-alert>
                            </b-col>

                            <!--b-col md="6">
                                <b-form-group>
                                    <label for="name">Reserv (valfri)</label>
                                    <b-form-input v-bind:readonly="team.is_readonly" id="teamreservename" v-model="team.teamreservename" placeholder="Golf id (xxxxxx-xxx)">
                                    </b-form-input>
                                    <b-button @click="checkGolfID(team.teamreservename,'3')" v-if="!team.is_readonly" variant="info" size="sm" class="float-right mt-1">
                                        <b-spinner v-if="showspinner_3" small type="grow" class="mr-2"></b-spinner>Sök spelare
                                    </b-button>
                                </b-form-group>
                                <b-alert v-if="team.showplayer3" :variant="team.checkgolfidvariant3" show class="mt-4 small form-text">
                                    Spelare: {{team.player_3_name}}<br>
                                    HCP: {{team.player_3_hcp}}

                                    <b-form-input class="mt-2" v-if="!team.player_3_exists" v-model="team.teamreserveemail" placeholder="E-mail till reserven" required>
                                    </b-form-input>

                                    <p class="mt-2" v-if="!team.player_3_exists">
                                        När du sparar laget kommer vi skicka en inbjudan till din lagkamrat
                                    </p>
                                    <p class="mt-2" v-if="team.player_3_exists">
                                        {{team.player_3_name}} har ett matchplay-konto och kommer att få en förfrågan via email om att vara med i ditt lag.
                                    </p>
                                    <b-form-input hidden v-model="team.teamreservegolfid" placeholder="Golfid">
                                    </b-form-input>
                                </b-alert>
                            </b-col-->
                        </b-row>
                    </b-container>
                    <b-container v-if="!team.completemode">
                        <b-row align-h="center">
                            <b-col md="6">
                                <b-button @click.prevent="prev()" variant="light"><i class="material-icons">arrow_back_ios</i>Tillbaka</b-button>
                                <b-button :disabled="team.teammembergolfid === ''" class="mt-0 mt-sm-0 float-right" @click.prevent="next()" variant="success">
                                    <b-spinner v-if="showloginspinner" small type="grow" class="mr-2"></b-spinner>Betala<i class="ml-2 material-icons">arrow_forward_ios</i>
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-container>
                    <b-container v-if="team.completemode">
                        <b-row align-h="center">
                            <b-col md="6">
                                <b-button @click.prevent="cancel_team()" variant="light"><i class="material-icons">clear</i> Avbryt</b-button>
                                <b-button :disabled="team.teammembergolfid === ''" class="mt-sm-0 float-right" @click.prevent="next()" variant="success">
                                    <b-spinner v-if="showloginspinner" small type="grow" class="mr-2"></b-spinner> <i class="ml-2 material-icons mr-2">done</i>Klar
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-container>
                </div>
        
                <!-- STEP 3 -->
                <div v-if="team.step === 3">
                    <b-container>
                        <b-row align-h="center">
                            <b-col md="6">
                                <b-form-group class="mb-2" v-if="team.type != null && !team.is_readonly">
                                    <h4>Betalningsalternativ</h4>
                                        <b-form-checkbox
                                            v-if="userdetails.referrals"
                                            id="checkbox-1"
                                            v-model="useDiscount"
                                            name="checkbox-1"
                                            :value="true"
                                            variant="success"
                                            :unchecked-value="false"
                                        >
                                        <strong :class="useDiscount ? 'text-success' : 'text-primary'">Använd intjänad rabatt ({{ userdetails.referrals * 50 }} kr) ?</strong>
                                        </b-form-checkbox>

                                    <b-form-radio v-if="team.type === 'Private'" v-model="team.payment" name="some-radios" value="A">Swish</b-form-radio>
                                    <b-form-radio v-if="team.type === 'Company'" v-model="team.payment" name="some-radios" value="B">Faktura</b-form-radio>
                                    <b-form-radio v-if="team.type === 'Private'" v-model="team.payment" name="some-radios" value="C">Voucher/Kod</b-form-radio>
                                </b-form-group>

                                <b-form-group fluid class="mb-3" v-if="team.payment === 'A'">
                                    <p v-if="team.type==='Private' && !useDiscount && isEarlyBirdie" class="text-success mb-0 mt-1">Early Birdie pris! Ordinaire pris {{price1 + 100}}:-</p>
                                    <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_150/v1575278258/matchplay/swish.png" alt="swish"></b-img>
                                    <span v-if="team.type==='Private' && !useDiscount"> {{team.price_private}} SEK</span>
                                    <span v-if="team.type==='Private' && useDiscount" > 
                                        <span style="text-decoration: line-through;" class="text-danger mr-2">{{team.price_private}}</span>
                                        <strong class="text-success"> {{ team.price_private - userdetails.referrals * 50 }} SEK </strong>
                                    </span>

                                    <span class="d-block small mb-1 text-right red" v-if="team.pricereduc > 0">Du har fått {{team.pricereduc}} kr rabatt!</span>

                                    <vue-tel-input v-model="team.swish.mobile" v-bind="bindProps"></vue-tel-input>

                                    <b-button :disabled="showspinner_swish || team.swish.mobile === ''" show @click="swish()" variant="success" size="lg" class="w-100 float-right mt-3">
                                        <b-spinner v-if="showspinner_swish" small type="grow" class="mr-2"></b-spinner>Betala
                                    </b-button>
                                    <br>
                                    <br>
                                    <br>

                                    <b-alert v-if="showspinner_swish" show class="mt-5 small text-center" variant="primary">
                                        Nu kan du öppna din Swish-app och godkänna betalningen.
                                    </b-alert>

                                </b-form-group>

                                <!-- Invoice -->
                                <b-form-group v-if="team.payment === 'B' && team.type==='Company'">
                                    <label for="name">Fakturauppgifter</label>
                                    <span v-if="team.type==='Company' && !useDiscount">{{team.price_company}} SEK (exkl. moms)</span>
                                     <span v-if="team.type==='Company' && useDiscount" > 
                                        <span style="text-decoration: line-through;" class="text-danger mr-2">{{team.price_company}}</span>
                                        <strong class="text-success"> {{ team.price_company - userdetails.referrals * 50 }} SEK </strong>
                                    </span>

                                    <b-form-input class="mb-2" id="invoicename" name="invoicename" v-model="invoicename" required placeholder="Skriv in ditt namn" :state="validate_invoicename"></b-form-input>
                                    <b-form-input inputmode="numeric" class="mb-2" id="invoiceorgno" name="invoiceorgno" v-model="team.invoice.invoiceorgno" required placeholder="Skriv in organisationsnummer" :state="validate_invoiceorgno"></b-form-input>
                                    <b-form-input class="mb-2" id="invoiceemail" name="invoiceemail" v-model="team.invoice.invoiceemail" required placeholder="Skriv in din email" :state="validate_invoiceemail"></b-form-input>

                                    <b-button show @click="payInvoice()" variant="info" size="sm" class="float-right mt-1">
                                        <b-spinner v-if="showspinner_invoice" small type="grow" class="mr-2"></b-spinner>Skicka in anmälan
                                    </b-button>
                                </b-form-group>

                                <!-- Voucher -->
                                <b-form-group v-if="team.payment === 'C'">
                                    <label for="name">Voucher</label>
                                    <b-form-input @focus="team.validatevoucher = true" aria-describedby="no-voucher" id="voucher" v-model="team.voucher" required placeholder="Skriv in din voucherkod här" :state="validate_voucher">
                                    </b-form-input>
                                    <b-button :disabled="!validate_voucher" show @click="payVoucher()" variant="info" size="sm" class="float-right mt-1">
                                        <b-spinner v-if="showspinner_voucher" small type="grow" class="mr-2"></b-spinner>Betala
                                    </b-button>
                                    <b-form-invalid-feedback v-if="team.voucher != ''" id="no-voucher">
                                        Din voucherkod är inte giltig.
                                    </b-form-invalid-feedback>
                                </b-form-group>

                        
                                <b-row class="mb-5 pt-2">
                                     <b-col cols="5" md="6">
                                         <b-button v-if="team.completemode" @click.prevent="cancel_team()" size="sm" variant="outline-warning"><i class="material-icons">clear</i> Avbryt</b-button>                      
                                    </b-col>
                                    <b-col cols="7" md="6">
                                           <b-button @click.prevent="cancel_team()" variant="outline-info" size="sm" class="float-right">
                                                Betala senare<i class="ml-2 material-icons mr-2">arrow_forward_ios</i>
                                            </b-button>
                                    </b-col>
                                   
                                </b-row>
                             
                                
                                

                            </b-col>
                        </b-row>
                    </b-container>
                </div>

                <!-- STEP 4 -->
                <div v-if="team.step === 5">
                    <b-container>
                        <b-row align-h="center">
                            <b-col v-if="this.paymentstatus === 'PAID'" md="6">
                                <h2 class="text-center"><i class="pb-1 material-icons">favorite_border</i> Tack! <i class="pb-1 material-icons">favorite_border</i></h2>
                                <p>Ditt lag är betalt och klart. Vi återkommer med information om lottning och matcher i god tid innan tävlingen startar!</p>
                                <p>Dela gärna på Facebook för att utmana andra samt ta chansen att vinna fina priser!</p>
                                <p><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https://www.matchplay.se" class="btn blue-bg btn-md text-white mb-3">Dela på Facebook</a></p>
                                <p>Hälsningar Matchplay <i class="pb-0 mr-2 material-icons red">favorite</i></p>
                            </b-col>
                            <b-col v-if="this.paymentstatus === 'DECLINED'" md="6">
                                <h2 class="text-center"><i class="material-icons">eject</i> Du valde att avbryta betalningen</h2>
                                <p>Kontakta oss om det är något som är oklart så hjälper vi till att förklara.</p>
                                <p>Hälsningar<br>Matchplay</p>
                                <div class="text-center mt-5 mb-5">
                                    <b-button @click="team.step = 3">
                                        <i class="material-icons">
                                            settings_backup_restore
                                        </i> Gå tillbaka till<br>Swish-betalningen
                                    </b-button>
                                </div>
                                <hr>

                            </b-col>
                            <b-col v-if="this.paymentstatus === 'ERROR'" md="6">
                                <h2 class="text-center"><i class="material-icons">error</i> Något gick fel</h2>
                                <p>Försök genomföra betalningen vid ett senare tillfälle eller kontakta oss.</p>
                                <p>Hälsningar<br>matchplay</p>
                            </b-col>
                            <b-col v-if="this.paymentstatus === 'INVOICE'" md="6">
                                <h2 class="text-center"><i class="material-icons">favorite_border</i> Tack! <i class="material-icons">favorite_border</i></h2>
                                <p>Ditt lag är anmält och du kommer att få en faktura inom kort. Vi återkommer med information om matcher och leverans av pikéer när fakturan är betald.</p>
                                <p>Hälsningar<br>matchplay</p>
                            </b-col>

                        </b-row>
                        <b-row align-h="center">
                            <b-col v-if="this.paymentstatus != ''" md="6" class="text-center">
                                <b-button href="/Mymatchplay" size="lg" variant="success text-white mt-4">
                                    <i class="material-icons">
                                        done_outline
                                    </i> Klar
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-container>                    
                </div>
            </b-form>
            </b-tab>
             <b-tab title-link-class="ml-2" @click="saveTabIndex(2)">
      <template v-slot:title>
       <i hidden class="far fa-golf-club mr-2"></i>Matcher
      </template>

  <b-container>                           
            <b-row v-if="closed" class="mb-2" align-h="center">
                <b-col sm="12" lg="10" class="m-0 p-0">
                    <app-rounds-grafic
                            class="mt-3"
                            style="height: 50px"
                            linecolor="#808080"
                            opacity="1"
                            stagefill="black"
                            :condensed="true"
                            >
                        </app-rounds-grafic>          
                    </b-col>
            </b-row>
               <b-row v-if="teams.length>0">
    <b-col class="col-12 small pr-0 text-right" v-if="teams[0].status">
    Lagstatus: 
    <span v-if="teams[0].status==='Winner'">Vidare i huvudtävling</span>
    <span v-if="teams[0].status==='Second chance'">Deltar i andra chansen</span>
    <span v-if="teams[0].status==='Defeated'">Utslagna</span>
    </b-col>
</b-row>
                
            <b-row v-if="games.length === 0 || !games.length" align-h="center">
                <b-col sm="10" lg="6">

                    <p class="text-center mt-2 mb-3"><i class="far fa-robot fa-3x"></i></p>                             
                       <div v-if="teamscount>0">
                        <p v-if="team.paid"  class="text-center">
                            Så fort lottningen är klar kommer din nästa match listas här!                            
                        </p>                    
                        <p v-if="!team.paid" class="text-center red">
                            Ditt lag kommer <strong>inte</strong> vara med i lottningen om du inte betalar det...
                        </p>
                       </div>
                       <div v-else>
                           <p>Så fort du skapat ett lag och betalat det kommer ditt lags kommande matcher visas här.</p>
                       </div>  

<hr />
                       <div class="mb-5">
                           <h2 class="mt-4 mb-3">Nyttig information</h2>
                           <p>I väntan på tävlingsstart har vi samlat lite nyttig information för att göra tävlingen ännu enklare och roligare.</p>
                            
                             <h3 class="orange">Vårt digitala scorekort</h3>
            <ScorecardExplainer ></ScorecardExplainer>

                                <h3 class="mt-5">Tips 1 (Ladda upp en bild)</h3>
                                När er match är startad kan ni ta en bild på lagen i en gruppbild som kan postas upp till vår resultatsida så att folk som följer matchen kan se hur kul ni har det :)
                                Tänk dock på Corona och håll bra avstånd.
                            

                                <h3 class="mt-5">Tips 2 (Speltid och plats)</h3>
                                När din match i varje omgång är lottad syns den på denna sidan och är ni lottade som hemmalag, ta så fort som möjligt kontakt med era motståndare för att bestämma spelplats och tid. Det är viktigt att hemmalaget lägger upp tid och plats för matchen så att det blir rätt på resultsidorna på matchplay.se.
                            
                     
                                 <h3 class="mt-4">Tips 3 (Reserv)</h3>
                                Man ska alltid spela med sitt tänkta lag i första hand. Reserv tas in om någon av de ordinarie medlemmarna blir skadad eller sjuk. Ni behöver bara välj en reserv (från lagsidan) när behov uppstår och golfid väljs in innan matchen startar. Då kan hemmalaget välja denna reserv när matchen startas och hcp-uträkningarna blir rätt.
                           
                      
                                 <h3 class="mt-4">Tips 4 (Ha kul!)</h3>
                                Matchspel är en otroligt rolig spelform och med hjälp av vårt digitala scorekort blir det busenkelt att se vilka som vinner resp. hål och leder matchen. Släkt och vänner kan följa matchen från resultatsidan som läggs upp direkt när omgång 1 har lottats. Njut av rundan och må bästa lag vinna!                               
                          
                       </div>                 
                                
                </b-col>
            </b-row>
           

<b-row v-if="games.length > 0 || games.length" align-h="center">

        <b-col sm="10" lg="7" class="team pl-1 pr-1 pb-2 mt-2 mt-md-2 pt-0 pt-md-3" v-for="(game,idx2) in this.games" :key="idx2">
                
             <b-card class="mt-2 mb-0 team header">                            
                            <b-card-text class="mt-0 card-text-team">
                                <span @click="expandGame(idx2)" variant="light" size="sm" class="pointer float-right"><i :id="'gamearrow'+idx2" class="fa fa-chevron-down mt-2 mb-2"></i></span>                  
                                 <h2 @click="expandGame(idx2)" class="pointer mt-1 mb-3 pb-0 pt-1">{{game.roundname || 'Omgång'}}</h2>                                 
                                
                                  <div :id="'game'+idx2" class="hidden">
                                      <hr />
                                  <div class="pt-0 pb-2 mt-0">                                               
                                        <span hidden>
                                            <i class="fas fa-home-alt mr-1 mb-1"></i>                                            
                                             <span v-bind:class="{ winner: game.homescore > 1,loser: game.awayscore > 1 }" style="padding-left:3px;">{{game.hometeamname}}<i class="fas fa-info-square mb-1 ml-2" @click="showModal('home',game)"></i></span>                                                   
                                            
                                        </span>

                                        <div class="mt-0 mb-0" :class="{ 'winner': game.winner && game.hometeam === game.winner, 'loser': game.winner && game.awayteam === game.winner}">
                                            <strong>HEMMALAG</strong><br>
                                            <span class="d-block">{{game.hometeamleadername}} <b-badge pill variant="warning" class="hcp" v-negativeToPostive:arguments="{hcp: game.hometeamleaderhcp}">{{game.hometeamleaderhcp}}</b-badge></span>
                                            <span v-if="game.hometeammembername" class="d-block">{{game.hometeammembername}} <b-badge pill variant="warning" class="hcp" v-negativeToPostive:arguments="{hcp: game.hometeammemberhcp}">{{game.hometeammemberhcp}}</b-badge></span>                                     
                                            <span class="d-block" v-else>Lagkamrat saknas</span>
                                            <span v-if="game.hometeamcoursename"><i>{{game.hometeamcoursename}}</i></span>
                                            <span v-if="!game.hometeamcoursename">Hemmaklubb saknas</span><br>                                        
                                              
                                        </div>

                                   </div>
                                   <div class="pt-0 pb-3 mt-0">                                               
                                        <span hidden>                                            
                                            <i class="fas fa-caravan-alt mr-1 mb-1"></i>
                                             <span v-bind:class="{ winner: game.awayscore > 1,loser: game.homescore > 1 }" style="padding-left:1px;">{{game.awayteamname}}<i class="fas fa-info-square mb-1 ml-2" @click="showModal('away',game)"></i></span>                                                   
                                           
                                        </span>

                                        <div class="mt-0 mb-0 text-right" :class="{ 'winner': game.winner && game.awayteam === game.winner, 'loser': game.winner && game.hometeam === game.winner}">
                                           <strong>BORTALAG</strong><br>
                                           <span class="d-block">{{game.awayteamleadername}} <b-badge pill variant="warning" class="hcp" v-negativeToPostive:arguments="{hcp: game.awayteamleaderhcp}">{{game.awayteamleaderhcp}}</b-badge></span>
                                           <span v-if="game.awayteammembername" class="d-block">{{game.awayteammembername}} <b-badge pill variant="warning" class="hcp" v-negativeToPostive:arguments="{hcp: game.awayteammemberhcp}">{{game.awayteammemberhcp}}</b-badge></span>                                       
                                           <span class="d-block" v-else>Lagkamrat saknas</span>
                                             <span v-if="game.awayteamcoursename"><i>{{game.awayteamcoursename}}</i></span>
                                              <span v-if="!game.awayteamcoursename">Hemmaklubb saknas</span><br>
                                              
                                        </div>

                                   </div>
                                   <div class="pt-0 pb-3 mt-0">    
                                        <span :id="'tooltip-game-distance-'+idx2">
                                            <div>
                                            <i class="fas fa-road mr-1 mb-1" style="float:left;"></i>
                                            </div>
                                             <div style="display:flex;">
                                            <span style="padding-left:4px;">{{game.distance}} km</span>  
                                             </div>                                                 
                                            <b-tooltip :target="'tooltip-game-distance-'+idx2" triggers="hover" placement="top">
                                                Avstånd mellan lagen
                                             </b-tooltip>                                           
                                        </span>
                                   </div>
                                   <div class="pt-0 pb-3 mt-0">                                              
                                       
                                            <i hidden class="fas mr-1 mb-1"></i>
                                             <span v-if="game.status === 'In progress'">
                                                 <div class="ml-1" style="float:left;">
                                                 <b-spinner small type="grow" class="blink red ml-1 mr-2 mb-2"></b-spinner>
                                                 </div>
                                                  <div style="display:flex;padding-left:6px;">
                                                LIVE
                                                  </div>
                                             </span>
                                             <span v-if="game.status === 'Finished'">
                                                 <div>
                                                <i class="fas fa-check mr-1 mb-1" style="float:left;color:#28a745;"></i>
                                                 </div>
                                                  <div style="display:flex;">
                                                <span style="padding-left:6px;">{{game.result}}</span>
                                                  </div>
                                             </span>                                              
                                             <span v-if="game.status === 'Pending'">
                                                 <div>
                                                    <i class="fas fa-circle mr-1 mb-1" style="float:left;color:#ffc107;"></i>
                                                 </div>
                                                 <div style="display:flex;">
                                                 <span style="padding-left:5px;">Matchen har inte startat</span>
                                                 </div>
                                             </span>                                                                                         
                                   </div>
                                    <div class="pt-0 pb-3 mt-0" v-if="game.status === 'Finished' && getgamedate(game.gamedate,'full') !== 'Invalid date' && game.gametime">                                              
                                                 <div>
                                                 <i class="fas fa-clock mr-1 mb-1" style="float:left;"></i>
                                                 </div>
                                                     <div style="display:flex;">
                                                <span style="padding-left:6px;">{{ getgamedate(game.gamedate,'full')}}</span>&nbsp;<span>{{game.gametime}}</span>  
                                                     </div>                                                                                                                       
                                   </div>

                                    <div class="pt-0 pb-3 mt-0" v-if="game.clubname">
                                        <div>                                             
                                                <i class="fas fa-map-marker mr-1 mb-1 pt-1" style="float:left;"></i>
                                        </div>
                                        <div style="display:flex;">
                                                <span style="padding-left:6px;">{{ game.clubname }}</span>
                                        </div>                                                                                                                       
                                   </div>

                                   <div class="pt-0 pb-3 mt-0" v-if="!game.clubname">                
                                        <div>                                
                                                <i class="fas fa-map-marker mr-1 mb-1 pt-1" style="float:left"></i>
                                                </div>
<div style="display:flex;">
                                                <span style="padding-left:4px;">Spelplats ej bestämd</span>     
                                                </div>                                                                                                                   
                                   </div>

                                    <div class="pt-0 pb-3 mt-0" v-if="game.loopname"> 
                                        <div>                                             
                                                <i class="fas fa-directions mr-1 mb-1 pt-1" style="float:left;"></i>
                                        </div>
                                        <div style="display:flex;">
                                                <span style="padding-left:7px;">{{ game.loopname }}</span>        
                                        </div>                                                                                                                
                                   </div>

                                   

                                    <div class="pt-0 pb-0 mt-0 mb-2" v-if="game.status !== 'Finished' && game.gamedate">                                               
                                        <span >
                                            <div>
                                            <i class="fas fa-calendar-week mr-1 mb-1" style="float:left;"></i>
                                            </div>
                                            <div style="display:flex;">
                                            <span style="padding-left:6px;">{{game.gamedate}} / kl {{game.gametime}}</span>   
                                            </div>                                               
                                        </span>                                        
                                   </div>

                                    <div class="pt-0 pb-3 mt-0" v-if="game.status !== 'Finished' && !game.gamedate">                                               
                                        <span :id="'tooltip-game-rounddates-'+idx2">
                                             <div>
                                            <i class="fas fa-calendar-week mr-1 mb-1" style="float:left;"></i>
                                            </div>
                                            <div style="display:flex;">
                                            <span style="padding-left:5px;">Spelas mellan {{getgamedate(game.roundstartdate,'half')}} - {{getgamedate(game.roundenddate,'half')}}</span>                                                   
                                             </div>
                                            <b-tooltip :target="'tooltip-game-rounddates-'+idx2" triggers="hover" placement="top">
                                                Spelomgång, datum
                                             </b-tooltip>
                                            
                                        </span>                                        
                                   </div>
                                   <hr />
                                       <b-container class="m-0 p-0 mt-4 mb-3">
                                     <b-row>
                                         <b-col class="col-8 text-left">
                                              <a hidden :href="`/game?id=${game._id}`" class="btn btn-success btn-md text-white mr-md-2">Visa match</a>
                                              <router-link class="btn btn-success btn-md text-white mr-md-2" v-bind:to="`/game?id=${game._id}`">Visa match</router-link>
                                        <a hidden :href="`/livegame?id=${game._id}`" class="btn btn-info btn-md text-white mr-md-2">Följ match</a>                                        
                                         </b-col>                                                            
                                         <b-col v-if="game.status !== 'Finished'" class="col-4 text-right">
                                             <a hidden @click="showHelpGame()" class="btn btn-secondary btn-md text-white"><i class="fas fa-question mb-1"></i></a>
                                           
                                             <b-button :id="'popover-help-game-'+game._id" href="#" tabindex="0" class="btn btn-secondary btn-md text-white"><i class="fas fa-question mb-1"></i></b-button>
                                             <b-popover :target="'popover-help-game-'+game._id" variant="light" triggers="focus" placement="topleft">
                                                <template #title>Information</template>
                                                 Klicka på visa match för att se kontaktuppgifter till lagkaptenen i laget ni ska möta. Bestäm datum och tid för matchen (hemmalaget bestämmer bana) och boka tid genom t.ex Min Golf Bokning.
                                            </b-popover>
                                         </b-col>
                                         <b-col class="col-12 mt-3">
                                             <p class="small">Hcp för spelarna hämtades in när matchen lottades, vissa avvikelser kan ske men läses in på nytt när matchen startar för aktuell hcp.</p>
                                         </b-col>

                                     </b-row>
                                     <b-row v-if="showhelpgame">
                                         <b-col>
                                             <b-alert show class="small text-left mt-4" variant="info">
                                            Klicka på visa match för att se kontaktuppgifter till lagkaptenen i laget ni ska möta. Bestäm datum och tid för matchen (hemmalaget bestämmer bana) och boka tid genom t.ex Min Golf Bokning.
                                        </b-alert>
                                         </b-col>
                                     </b-row>
                                 </b-container> 
                                    
                                   </div>
                            </b-card-text>
                            <!--  <template  v-slot:footer v-if="game0"> 
                                 
                                                   
                                  
                            </template> -->
                            
             </b-card>

            
        </b-col>
                </b-row>
                  <b-row class="mt-3 mb-2" align-h="center">
                <b-col sm="12" lg="10" class="m-0 p-0  text-right">
                    <b-button @click="showImportantModal" variant="warning" size="sm">
                        Visa viktig information
                    </b-button>
                </b-col>
            </b-row>

  </b-container>

            </b-tab>           
  </b-tabs>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>    

<b-modal ref="referral-modal" hide-footer no-close-on-esc no-close-on-backdrop>
<b-container class="p-1">
   
            <b-row>
                <b-col>
                    <h4>Hjälp oss att sprida budskapet om Sveriges största och roligaste golftävling!</h4>
                    <p>
                        Använd länken nedan för att dela till vänner och bekanta som också älskar golf och som tack för hjälpen ger vi dig <strong>50kr rabatt per lag</strong> som anmäler sig till tävlingen via din länk! Denna rabatt kan du sen använda till anmälningsavgiften för nästa års tävling.
                    </p>
                    <p class="">
                        Länken finns också på din profilflik.
                    </p>
                    <p>
                         <b-input id="ref_link2" class="mt-3" :value="'https://matchplay.se/register?referral='+ userdetails.userId"></b-input>
                   <b-button class="mt-3" size="sm" variant="primary" @click="copyLink('ref_link2')">Kopiera länk</b-button>
                    </p>
                </b-col>
            </b-row>


  
                                   
        </b-container>        
      
      <b-button class="mt-3" variant="outline-danger" block @click="hideModalReferral">Stäng</b-button>      
    </b-modal>


<b-modal ref="important-modal" title="Viktig info" hide-footer no-close-on-esc no-close-on-backdrop>
<b-container class="p-1">
   
            <b-row>
                <b-col>
                   <p>
                       <ol class="small importantlist">
                            <li style="color:red;">
                               Spela coronasäkert: Håll avstånd - inga handslag - låt flaggan stå - följ klubbarnas regler kring avstånd/maxantal etc.
                           </li>
                           <li>
                               Båda lagen är ansvariga för att kontakta sina motståndare för att komma överens om datum för spel. Kontaktuppgifter finns under resp. matchsida. Hemmalaget har fördel av att välja golfbana för spelet.
                           </li>
                           <li>
                               Boka först tid via tex. Min Golf bokning och skriv sedan in datum, tid och plats för matchen på matchsidan. Viktigt för våra resultatsidor!
                           </li>
                           <li>
                               Använd alltid det digitala scorekortet för er match (hemmalaget för score).
                            </li>
                            <li>
                                Ta väldigt gärna en eller flera bilder på laget, spelarna eller vackra golfhål under er match. Dessa bilder skapar en härlig gemenskap och visas på vår start- och resultatsida.
                                <span style="font-size:1.5em;" class="align-middle material-icons mr-0">add_a_photo</span>
                            </li>
                             <b-form-checkbox
                                id="checkbox-1"
                                v-model="status_important"
                                name="checkbox-1"
                                value="accepted"
                                unchecked-value="not_accepted"
                                >
                                Visa inte denna information igen
                                </b-form-checkbox>
                       </ol>
                   </p>
                </b-col>
            </b-row>


  
                                   
        </b-container>        
      
      <b-button class="mt-3" variant="outline-danger" block @click="hideModalImportant">Stäng</b-button>      
    </b-modal>

</div>


</template>

<script>
import {
    tagsMixin
} from '../mixins/tagsMixin';
import Spinner from "./spinner/Spinner";
import Suggestions from 'v-suggestions';
import ScorecardExplainer from "./ScorecardExplainer";
import 'v-suggestions/dist/v-suggestions.css';
import moment from 'moment';
import { globalState } from "../main.js";
import {
    VueTelInput
} from 'vue-tel-input'
//import Map from "./map/Map";  

const simpleDDP = require("simpleddp");
const simpleDDPLogin = require("simpleddp-plugin-login").simpleDDPLogin;

let opts = {
    endpoint: "wss://matchplay.meteorapp.com/websocket",
    SocketConstructor: WebSocket,
    reconnectInterval: 5000
};
import AppRoundsGrafic from "./RoundsGrafic";
import AppGameImageGallery from "./GameImageGallery";
import { mapGetters } from "vuex";


export default {
    name: 'mymatchplay',
    components: {
        'c-spinner': Spinner,
        'suggestions': Suggestions,
        VueTelInput,
        ScorecardExplainer,
        AppRoundsGrafic,
        AppGameImageGallery
    },
     directives: {
		 negativeToPostive: {
        bind(el, bind) {
          let number = parseFloat(bind.value.hcp);

          if (number > 0) {
            return;
          }
          el.innerHTML = "+" + number * -1;
        },
        update(el, bind) {
          let number = parseFloat(bind.value.hcp);

          if (number > 0) {
            el.innerHTML = number;
            return
          }
          el.innerHTML = "+" + number * -1;
        },
        unbind: function () {},
      },
		},
    watch: {
        '$route'(to, from) {
            if (to.path != from.path) {
                this.myscheduleid = this.$route.params.id;
                this.getSchedule();
            }

        }
    },
    data() {
        let clubs = [];
        let countries = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'AndorrA', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, The Democratic Republic of the', 'Cook Islands', 'Costa Rica', 'Cote D\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island and Mcdonald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India'];
        return {
            status_important: false,
            game0: false,
            game1: false,
            game2: false,
            game3: false,
            game4: false,
            game5: false,
            game6: false,
            game7: false,
            game8: false,
            ninehole: false,
            clubinfo_first: 'Du är först ut med ett lag från denna klubb, sprid gärna budskapet om tävlingen på din klubb! Lottning sker mot lag från andra klubbar nära vald klubb för att minimera avstånden och ge er nya golfupplevelser.',
            choosereserve: false,
            closed: globalState.closed,       
            tabIndex: 0,
            games:0,
            teamscount:0,
            gamescount:0,
            showhelpgame: false,
            showhelpreserve: false,
            showhelpreminder: false,
             //POLL
            poll: {
                pollid: '',
                question: '',
                poll: [],
                pollOptions: []
            },
            bindProps: {
                mode: "international",
                defaultCountry: "SE",
                disabledFetchingCountry: false,
                disabled: false,
                disabledFormatting: true,
                placeholder: "Skriv ditt mobilnummer",
                required: true,
                enabledCountryCode: true,
                enabledFlags: true,
                preferredCountries: [],
                onlyCountries: ["SE"],
                ignoredCountries: [],
                autocomplete: "on",
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
            //TYPEAHEAD CLUBS
            query: '',
            countries: countries,
            clubs: clubs,
            selectedClub: null,
            options: {
                placeholder: 'Välj hemmaklubb för laget',
                inputClass: 'form-control course'
            },
            //GENERAL
            userinfo: {},
            teams: 0,
            loading: true,
            paymentstatus: '',
            cloudinary: 'https://res.cloudinary.com/dn3hzwewp/image/upload/',
            isSelected1: false,
            isSelected2: false,
            isSelected3: false,
            isSelected4: false,
            isSelected5: false,
            isSelected6: false,
            isSelected7: false,
            isSelected8: false,
            isSelected9: false,
            isSelected10: false,
            isSelected11: false,
            isSelected12: false,
            isSelected13: false,
            isSelected14: false,

            selectedShirt1: 0,
            selectedShirt2: 0,
            //LOGIN
            showlogin: false,
            showloginspinner: false,
            showerror: false,
            showsreseterror: false,
            showsendreset: false,
            showsendreseterror: false,
            showsendresetsuccess: false,           
            //END    
            //GAMEDETAILS
            gamedetails: {},
            gamedetails2: {
                teamname: '',
                teamleader: '',
                teammember: '',
                teamzip: '',
                teamcity: '',
                teamclub: ''
            },
   
            //TEAM   
             hometeam: false,
             awayteam: false,
    
            text: {
                paidteam: 'Laget är betalt',
                not_paidteam: 'Laget är inte betalt'
            },
            showcreateteam: true,
            showteamslist: false,
            showcreateteamhelper: false,
            showspinner_1: false,
            showspinner_2: false,
            showspinner_3: false,
            showspinner_swish: false,
            showspinner_voucher: false,
            showspinner_invoice: false,
            clubcount: null,
            clublogo: null,
            teamoptions: [{
                    value: null,
                    text: 'Vänligen välj ett alternativ'
                },
                {
                    value: 'Company',
                    text: 'Företag'
                },               
                {
                    value: 'Private',
                    text: 'Privat'
                }
            ],            
            team: {
                step: 0,
                completemode: false,
                voucher: '',
                swish: {
                    mobile: ''
                },
                invoice: {
                    invoicename: '',
                    invoiceorgno: '',
                    invoiceemail: '',
                    marketingpackage: ''
                },
                shirtPicker: {
                    selected: '',
                    gender: 'male',
                    player1: {
                        gender: 'male',
                        shirt: '',
                        size: ''
                    },
                    player2: {
                        gender: 'male',
                        shirt: '',
                        size: ''
                    }
                },
                giveaway: {
                    selected: null,
                    shirtwarning: false,
                    sponsname: '',
                    sponsaddress: '',
                    sponszipcode: '',
                    sponscity: '',
                    setSize1: '',
                    setSize2: '',
                    shirtstate: 1,
                    player1: 'success',
                    player2: 'light',
                    player1header: 'Välj piké till dig själv',
                    player2header: 'Klicka här för att välja till din lagkamrat',
                    showshirtimage: '',
                    shirt1: '',
                    shirt2: '',
                    male: true,
                    female: false,
                    malebutton: 'success',
                    femalebutton: 'light',
                    maleshirtsize1: null,
                    maleshirtsize2: null,
                    maleoptions: [{
                            value: null,
                            text: 'Välj storlek'
                        },
                        {
                            value: 'S',
                            text: 'S'
                        },
                        {
                            value: 'M',
                            text: 'M'
                        },
                        {
                            value: 'L',
                            text: 'L'
                        },
                        {
                            value: 'XL',
                            text: 'XL'
                        },
                        {
                            value: 'XXL',
                            text: 'XXL'
                        },
                        {
                            value: 'XXXL',
                            text: 'XXXL'
                        }
                    ],
                    femaleshirtsize1: null,
                    femaleshirtsize2: null,
                    femaleoptions: [{
                            value: null,
                            text: 'Välj storlek'
                        },
                        {
                            value: '34',
                            text: '34'
                        },
                        {
                            value: '36',
                            text: '36'
                        },
                        {
                            value: '38',
                            text: '38'
                        },
                        {
                            value: '40',
                            text: '40'
                        },
                        {
                            value: '42',
                            text: '42'
                        },
                        {
                            value: '44',
                            text: '44'
                        },
                        {
                            value: '46',
                            text: '46'
                        },
                        {
                            value: '48',
                            text: '48'
                        }
                    ],
                },               
                _id: '',
                price_private: this.price1,
                pricereduc: 0,               
                price_company: this.price2,
                price_company2: this.price3,
                company_big: false,
                checkgolfidvariant2: 'primary',
                checkgolfidvariant3: 'primary',
                showplayer1: false,
                showplayer2: false,
                showplayer3: false,
                ownid: '',
                player_1_name: '',
                player_1_hcp: '',
                player_1_exists: false,
                player_2_name: '',
                player_2_hcp: '',
                player_2_exists: false,
                player_3_name: '',
                player_3_hcp: '',
                player_3_exists: false,
                is_readonly: false,
                type: null,
                file: null,
                logo: null,
                company: '',
                teamname: '',
                clubid: '',
                coursename: '',
                teamnamecompany: '',
                teamleader: '',
                teamleadername: '',
                teammembername: '',
                teammembergolfid: '',
                teammemberemail: '',
                teamreservename: '',
                company: '',
                name: '',
                uniquename: true,
                validatevoucher: true,
                shirts: '',
                payment: 'A',
                paid: ''
            },
            //END
            userdetails: {
                userId: '',
                firstname: '',
                lastname: '',
                lastname: '',
                mobile: '',
                email: '',
                numberofteams: 0,
                numberofwins: 0,
                numberofgames: 0,
                golfid: '',
                hcp: '',
                isambassador: false,
                firstwin: false,
                referrals: 0             
            },
            form: {
                email: '',
                pwd: ''
            },
            formreset: {
                password: '',
                password2: ''
            },
            sendformreset: {
                email: ''
            },
            doctitle: 'Mina sidor',
            file: null,
            progress: 0,
            uploading: false,
            previousteam:null,
            showSearchPlayerAlert: false,
            useDiscount: false,
            fetchingPrevData: false,
            fetchingPlayerData: false,
            showEarlyBirdie: false
        }
    },
    computed: {
        ...mapGetters([
        "price1",
        "price2",
        "price3",
        "price4",
        "isEarlyBirdie",
        "userId",
        "isAuthenticated"
        ]),
        getProfileInitials() {
            if (!this.userinfo.firstname) {
                return
            }
            return this.userinfo.firstname.charAt(0) + this.userinfo.lastname.charAt(0);
            },
        getFaceProfilePic() {
            if (!this.userinfo.profilepicture) {
                return;
            }
            var basepart = "https://res.cloudinary.com/dn3hzwewp";
            var transform = "w_400,h_400,c_fill,g_face/";
            var imagepart = this.userinfo.profilepicture.split("upload/")[1];

            return basepart + "/image/upload/" + transform + imagepart;
        },
        myImages() {
            if (!this.userinfo) {
                return false;
            }

            let teams = this.userinfo.teams || null;

            if (teams) {
                let games = teams.map((e) => e.games);

                if (!games.length) {
                return false;
                }

                let listsOfImages = games
                .flat()
                .filter((game) => game.imagesurl)
                .map((game) => game.imagesurl.flat())
                .map((imagesurlarray) => [...imagesurlarray]);

                if (!listsOfImages.length) {
                return false;
                }
                const merged = [].concat.apply([], listsOfImages);

                return merged;
            }
        },
        hasPoll() {
            if (this.poll == '') return true;
            else return false;
        },
        validateResetEmail() {

            if (this.sendformreset.email.length < 4) {
                return;
            }

            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(this.sendformreset.email).toLowerCase());

        },
        validatePassword1() {
            if (this.formreset.password.length === 0) {
                return;
            }
            return this.formreset.password.length > 7;
        },
        validatePassword2() {
            if (this.formreset.password.length === 0) {
                this.showpasswordsdontmatch = false;
                return;
            }
            return this.formreset.password === this.formreset.password2;
        },
        giveawayname: {
            get() {
                //perform your logic
                let userinfo = localStorage.getItem('userinfo');
                userinfo = JSON.parse(userinfo);
                this.team.giveaway.sponsname = userinfo.firstname + ' ' + userinfo.lastname;
                return userinfo.firstname + ' ' + userinfo.lastname;

            },
            set(newValue) {
                this.team.giveaway.sponsname = newValue;
            }

        },
        invoicename: {
            get() {
                //perform your logic
                let userinfo = localStorage.getItem('userinfo');
                userinfo = JSON.parse(userinfo);
                this.team.invoice.invoicename = userinfo.firstname + ' ' + userinfo.lastname;
                return userinfo.firstname + ' ' + userinfo.lastname;

            },
            set(newValue) {
                this.team.invoice.invoicename = newValue;
            }

        },
        //STEP 1 VALIDATION 
        validation_type() {
            return this.team.type !== null;
        },
        validation_teammembername() {
            if (this.team.teammembername.length === 6) {

                this.team.teammembername = this.team.teammembername + '-'
            }

            return this.team.teammembername.length === 10;
            //return this.team.teammembername.length === 10;
        },
        validation_teammemberemail() {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(this.team.teammemberemail).toLowerCase());
        },
        validation_companyname() {
            return this.team.company !== '';
        },
        validation_name() {
            return this.team.name !== '' && this.team.uniquename;
        },
        validation_query() {
            return this.team.query !== '';
        },
        //STEP 2 VALIDATION
        validate_sponsname() {
            return this.team.giveaway.sponsname !== '';
        },
        validate_sponsaddress() {
            return this.team.giveaway.sponsaddress !== '';
        },
        validate_sponszipcode() {
            return this.team.giveaway.sponszipcode !== '';
        },
        validate_sponscity() {
            return this.team.giveaway.sponscity !== '';
        },
        //STEP 3 VALIDATION
        validate_voucher() {
            return this.team.voucher !== '' && this.team.validatevoucher;
        },
        validate_invoicename() {
            return this.team.invoice.invoicename !== '';
        },
        validate_invoiceorgno() {
            return this.team.invoice.invoiceorgno !== '';
        },
        validate_invoiceemail() {
            const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return reg.test(String(this.team.invoice.invoiceemail).toLowerCase());
        },
        validate_marketingpackage() {
            return this.team.invoice.marketingpackage !== '';
        }
    },
  
    mixins: [tagsMixin],
    methods: {
        setCookie() {
            localStorage.setItem('earlyBirdie2022', '1');
        },
        handleFileUpload() {
        this.uploading = true;
        this.progress = 0;

        const CLOUDINARY_URL =  "https://api.cloudinary.com/v1_1/dn3hzwewp/image/upload";
        const CLOUDINARY_UPLOAD_PRESET = 'cwk6nx1v';
        const url = globalState.admin_url

        this.progress = 20;
        const formData = new FormData();
        formData.append("file", this.file);
		formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        
        this.progress = 30;

        this.axios.post(CLOUDINARY_URL, formData)
            .then((res) =>  {
            this.progress = 60;
            if (res.data.public_id !== "") {
            
                let id = this.userinfo._id
                const obj = {
                    id,
                    imageurl: res.data.secure_url,
                }
                
                this.progress = 80;
                this.axios.post(url+ "updateUserPhoto", obj)
                .then((response) => {

                    const sim_id = localStorage.getItem('userId');
                    this.getPlayerData(sim_id);
                        
                    this.progress = 100;
                    this.uploading = false; 
                    this.$bvToast.toast(
                    "Bilden är uppladdad :)",
                    {
                        title: "Bilden är uppladdad",
                        autoHideDelay: 3000,
                        variant: "success",
                        solid: true,
                    }
                    ); 
                })
                .catch((error) => {
                    this.progress = 0;
                    this.uploading = false;
                    console.log(error);
                });
            }
        })
        },
        expandGame(id) {
            var element = document.getElementById("game"+id);
            var element2 = document.getElementById("gamearrow"+id);
            if (!this['game'+id]) { //false, remove hidden
                element.classList.remove("hidden");
                element2.classList.remove("fa-chevron-down");
                element2.classList.add("fa-chevron-up");
               
            } else {
                element.classList.add("hidden");
                element2.classList.add("fa-chevron-down");
                element2.classList.remove("fa-chevron-up");
            }
            this['game'+id] = !this['game'+id];
            
            /*var element2 = document.getElementById("gamearrow"+id);
            element2.classList.remove("fa-chevron-down");
            element2.classList.add("fa-chevron-up");*/

        },
               showReferralModal() {                      
            this.$refs["referral-modal"].show();
        },
        hideModalReferral() {
            localStorage.setItem('showReferralInfo', 1);
            this.$refs['referral-modal'].hide()
        },
         showImportantModal() {             
            
             if (localStorage.getItem('showImportantInfo')) {
                if (localStorage.getItem('showImportantInfo') === 1 ) {
                    this.status_important = 'accepted';
                }
             }
             
            this.$refs["important-modal"].show();

        },
        hideModalImportant() {
            if (this.status_important) {
                localStorage.setItem('showImportantInfo', 1);
            }
            this.$refs['important-modal'].hide()
        },
        copyLink(elem) {
        /* Get the text field */
        var copyText = document.getElementById(elem);

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");
        this.makeToast('Länken är kopierad till urklipp.', 'success');

        },
           getClubImage(logourl) {      
            return 'https://res.cloudinary.com/dn3hzwewp/image/upload/h_50,q_auto,c_scale/' + logourl;
        },
        getTeamLogo(logourl) {
            if (logourl) {
                var first_url = logourl.split("/upload/").pop();        
                return 'https://res.cloudinary.com/dn3hzwewp/image/upload/h_40,q_auto,c_scale/' + first_url;  
            }
        },
                compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
},
         showPoll() {
            
           
         let url = globalState.admin_url + 'getPoll'              
                
                this.axios.post(url, {
                                         
                        "userid": this.userinfo._id //localStorage.getItem('userId')                    
                                       
                    })
                    .then(response => {
                        
                        if (!response.data.status) {
                            if (response.data.status === false) return;
                            this.poll.question = response.data.question;
                            this.poll.pollid = response.data._id;
                            let i;
                            let opt;
                            //console.log(response.data.options)
                            //new sort for options
                            let newoptions = response.data.options.sort(this.compareValues('sortorder', 'asc'));    
                            //console.log(newoptions)              


                              for (i = 0; i < response.data.options.length; i++) {
                                opt = {};
                                opt.text = response.data.options[i].option;
                                opt.value = response.data.options[i].id;
                                this.poll.pollOptions.push(opt)
                             }

                             //console.log(this.poll.pollOptions)
        
                            this.$refs['poll1'].show();
                        } else {
                            return; //no active poll
                        }

                     

                    })
                    .catch(error => {
                        console.log(error);
                    });  
            
            
           
        },
       postPoll() {

           let url = globalState.admin_url + 'postPoll';
           if (this.poll.pollid == '') return;          
                
                //console.log('vidare');
                

                this.axios.post(url, {
                        "voteid": this.poll.pollid,                 
                        "optionsid": this.poll.poll,      
                        "userid": this.userinfo._id               
                    })
                    .then(response => {
                        this.$refs['poll1'].hide();
                        if (response.data.status === 'error') {                           
                            return;
                        }

                        if (response.data.status === 'success') {
                           //console.log('success')                        
                           this.$refs['poll1'].hide();

                        }

                    })
                    .catch(error => {
                        this.$refs['poll1'].hide();
                        console.log(error);
                    });
            
            

       },
    getTopListClubs(course) {
      //this.clubcount = 0;
      this.axios
        .post("https://matchplay.meteorapp.com/methods/" + "getTopClubs", {
          //getclubstoplist
          competition: globalState.compid,
          course: course       
        })
        .then((response) => {
          if (response.data.length > 0) { 
            this.clubcount = response.data[0].count;
            if (response.data[0].hasOwnProperty('logourl')) {                
                this.clublogo = response.data[0].logourl; 
            }
            
          } else {
              this.clubcount = 0;
              this.clublogo = null;
          }
         
        })
        .catch((error) => {
          console.log(error);          
        });
    },
        getReceipt: function(team) {
                    //console.log(team);
                  
                   let vat = parseInt(team.paidamount * 0.06)
                
                   this.$router.push(
                        {name: 'Receipt',
                        params: { user:team.teamleadername,amount:team.paidamount,vat:vat,comp:team.competitionname }
                        }
                    );
                        
                },
             showHelpReserve: function(){
                if (this.showhelpreserve) {
          this.showhelpreserve = false;         
        } else this.showhelpreserve = true;
        },
 showHelpReminder: function(){
                if (this.showhelpreminder) {
          this.showhelpreminder = false;         
        } else this.showhelpreminder = true;
        },
          showHelpGame: function(){
                if (this.showhelpgame) {
          this.showhelpgame = false;         
        } else this.showhelpgame = true;
        },

        getgamedate: function(gamedate,action) {
             if (action === 'full') {
                return moment(gamedate).format('YYYY-MM-DD')
             } 
             if (action === 'half') {
                 return moment(gamedate).format('D/M')
             }
     },

         getgamedate2: function(finishedat) {
         let gamedate2 = new Date(finishedat);           
         return moment(gamedate2, "YYYY-MM-DD hh:mm").fromNow();   
     },
         saveReserve() {

             if (this.team.teamreserveemail === undefined) {
                 //alert('Skriv in en e-post adress');
                 //return;
             }

             //console.log(this.team._id)
                
                let url = globalState.admin_url + 'updateTeam'              
                
                this.axios.post(url, {
                        "competition": globalState.compid,                        
                        "_id": this.team._id,                       
                        "teamreserveemail": this.team.teamreserveemail,                       
                        "teamreservegolfid": this.team.teamreservegolfid                       
                    })
                    .then(response => {
                        if (response.data.status === 'error') {
                            return;
                        }

                        if (response.data.status === 'ok') {
                           //console.log('success')                        
                           this.hideModal('my-modal');
                           location.reload();

                        }

                    })
                    .catch(error => {
                        console.log(error);
                    });

            
         },
            showModalReminder() {
        
        this.$refs['my-modal-reminder'].show()
      },
         showModal(id) {
          // console.log(id)
            this.team._id = id;
        //this.gamedetails2 = game;
        //console.log(homeaway,game);
        /*
         <span>{{gamedetails2.hometeamname}}</span><br>
             <span>{{gamedetails2.hometeamleadername}}</span> & <span>{{gamedetails2.hometeammembername}}</span><br>
             {{gamedetails2.hometeamzip}} {{gamedetails2.hometeamcity}}<br>                                             
             <span v-if="gamedetails2.hometeamclubname">{{gamedetails2.hometeamclubname}}</span>
             <span v-if="!gamedetails2.hometeamclubname">Padelklubb saknas</span>    
        */        

        this.$refs['my-modal'].show()
      },

          hideModal(ref) {
        this.$refs[ref].hide()
      },
        getFirstname: function(name) {
            if (!name) return;       
           var res = name.split(" ");
           return res[0];
        },
          saveTabIndex: function (index){
            localStorage.setItem('active_tab', index);
        },
        exitResetPw() {
             this.showsendreseterror = false;
             this.showlogin = true;
             this.showsendreset = false;
        },
        sendResetPw() {
            //console.log(this.sendformreset.email);
            this.showsendreseterror = false;
            let url = globalState.admin_url + 'resetPw'
            //let url = 'http://localhost:3000/methods/resetPw'
            this.axios.post(url, {
                    "email": this.sendformreset.email
                })
                .then(response => {
                    if (response.data.status === 'error') {
                        return;
                    } else if (response.data.status === 'ok') {
                        this.showloginspinner = false;
                        this.showlogin = true;
                        this.showsendresetsuccess = true;

                        this.$router.push({
                            path: "/mymatchplay"
                        });
                    } else {
                        this.showsendreseterror = true;

                    }

                })
                .catch(error => {
                    console.log(error);
                });
        },
        resetPw() {
            this.showsreseterror = false;
            const r = confirm('Är du säker på att du vill byta lösenord?');
            if (r == true) {
                let url = globalState.admin_url + 'resetPw'
                //let url = 'http://localhost:3000/methods/resetPw'
                this.axios.post(url, {
                        "token": this.$route.query.resetpw,
                        "pw": this.formreset.password
                    })
                    .then(response => {
                        if (response.data.status === 'error') {
                            return;
                        } else if (response.data.status === 'ok') {
                            this.showloginspinner = false;
                            this.showlogin = true;
                            this.$router.push({
                                path: "/mymatchplay"
                            });
                        } else {
                            this.showsreseterror = true;
                        }

                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                return false;
            }
        },
        removeTeam(team) {
            const r = confirm('Är du säker på att du vill radera ditt lag?');
            if (r == true) {
                let url = globalState.admin_url + 'removeTeam'
                this.axios.post(url, {
                        "id": team._id,
                    })
                    .then(response => {
                        if (response.data.status === 'error') {
                            return;
                        } else if (response.data.status === 'ok') {
                            this.showloginspinner = false;
                            this.getPlayerData();
                            this.teamscount = 0;
                        } else {
                            this.getPlayerData();

                        }

                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                return false;
            }

        },
        setTeamProperties(team) {                  
            this.getGolfClubs();
            this.team.completemode = true;
            this.team._id = team._id;
            this.showcreateteam = true;
            this.team.is_readonly = false;
            this.team.company = team.company;
            this.team.file = team.file;
            this.team.type = team.type;
            this.team.name = team.teamname;
            this.team.player_2_name = team.teammembername;
            this.team.teammembergolfid = team.teammembergolfid;          
            this.team.course = team.coursename;
            this.team.logo = team.logourl;            
            this.query = team.coursename;
            this.team.clubid = team.course;
     

        },
        resetTeamProperties(team) {
            this.team.completemode = false;
            this.team._id = "";
            this.showcreateteam = false;
            this.team.is_readonly = true;
            this.team.type = "";
            this.team.name = "";
            this.team.player_2_name = "";
            this.team.course = "";
            if (this.team.sponsmerch) {
                this.team.shirtPicker.player1.shirt = "";
                this.team.shirtPicker.player2.shirt = "";
                this.team.shirtPicker.player1.size = "";
                this.team.shirtPicker.player2.size = "";
            }

        },
        goToStep(team, step) {
            window.scrollTo(0, 0);
            this.setTeamProperties(team);
            this.team.step = step;
        },
        skipStep() {
            window.scrollTo(0, 0);
            this.team.step++;
        },
        sizeOptions() {
            if (this.team.shirtPicker.gender === 'male') {
                return this.team.giveaway.maleoptions
            } else {
                return this.team.giveaway.femaleoptions

            }
        },
        formatZip(value, event) {

            if (isNaN(event.data)) {

                //var reg = new RegExp(event.data, "g");
                let valuex = value.replace(/a/gi, '');

                return valuex;
            } else if (value.length === 3) {

                return value + ' '
            } else {
                return value;
            }

        },
        checkTeamNameUnique(name) {
            let url = globalState.admin_url + 'checkTeamNameUnique'
            this.axios.post(url, {
                    "competition": globalState.compid,
                    "teamnamecompany": name
                })
                .then(response => {
                    if (response.data.status === 'error') {
                        return;
                    } else if (response.data.status === 'ok') {
                        this.showloginspinner = false;
                        this.team.uniquename = true;

                    } else {
                        this.team.uniquename = false;
                    }

                })
                .catch(error => {
                    console.log(error);
                });
        },
        myChange(evt) {
            const size = evt.target.value
            if (this.team.giveaway.shirtstate === 1) {

                if (this.team.shirtPicker.player1.gender != this.team.shirtPicker.gender) {
                    this.team.shirtPicker.player1.gender = this.team.shirtPicker.gender;
                    this.team.shirtPicker.player1.shirt = '';

                }
                this.team.shirtPicker.player1.size = size;

            } else if (this.team.giveaway.shirtstate === 2) {
                if (this.team.shirtPicker.player2.gender != this.team.shirtPicker.gender) {
                    this.team.shirtPicker.player2.gender = this.team.shirtPicker.gender;
                    this.team.shirtPicker.player2.shirt = '';

                }
                this.team.shirtPicker.player2.size = size;

            }
        },
        shirtState(action) {
            this.team.giveaway.shirtstate = action; //set which player(x) should be updated

            this.clearShirts();
            this['isSelected' + this.team.giveaway['shirt' + action]] = true;

            if (action === 1) {
                this.team.giveaway.player1 = 'success';
                this.team.giveaway.player2 = 'light';
                this.team.giveaway.player1header = 'Välj piké till dig själv';
                this.team.giveaway.player2header = 'Klicka här för att välja till din lagkamrat';
                this.team.giveaway.selected = null;

            }

            if (action === 2) {
                this.team.giveaway.player2 = 'success'
                this.team.giveaway.player1 = 'light'
                this.team.giveaway.player1header = 'Klicka här för att välja till dig själv';
                this.team.giveaway.player2header = 'Välj piké till din lagkamrat';
                this.team.giveaway.selected = null;
            }
        },
        setGender(gender) {
            this.team.shirtPicker.gender = gender;
            if (gender === 'male') {
                this.team.giveaway.sizeoptions = this.team.giveaway.sizeoptions;

            } else {
                this.team.giveaway.sizeoptions = this.team.giveaway.femaleoptions;

            }
            clearShirts();
        },
        clearShirts() {

            var i;
            for (i = 0; i < 15; i++) {
                this["isSelected" + i] = false;
            }
            this.team.giveaway.selected = null;

        },
        getShirtImg(shirt) {
            return 'https://res.cloudinary.com/dn3hzwewp/image/upload/h_30,c_scale,q_auto/v1575307928/matchplay/ping/' + shirt + '.png'
        },

        selectShirt(shirt) {
            this.clearShirts();
            this.team.shirtPicker.selected = shirt;
            if (this.team.giveaway.shirtstate === 1) {

                if (this.team.shirtPicker.player1.gender != this.team.shirtPicker.gender) {
                    this.team.shirtPicker.player1.gender = this.team.shirtPicker.gender;
                    this.team.shirtPicker.player1.size = '';
                }
                this.team.shirtPicker.player1.shirt = shirt;
            } else if (this.team.giveaway.shirtstate === 2) {
                if (this.team.shirtPicker.player2.gender != this.team.shirtPicker.gender) {
                    this.team.shirtPicker.player2.gender = this.team.shirtPicker.gender;
                    this.team.shirtPicker.player2.size = '';
                }
                this.team.shirtPicker.player2.shirt = shirt;
            }
        },
       
        prev() {

            this.team.step--;
            window.scrollTo(0, 0);

            //this.query.options.inputClass = 'is-valid'

        },
        next() {

            let element = '';
            let parentVue = this;

            //Validate step 1 fields
            if (this.team.step === 1) {

                element = document.querySelector("#type");
                if (element.classList.contains("is-invalid")) {
                    return;
                }

                if (this.team.type === 'Company') {
                    element = document.querySelector("#name");
                    if (element.classList.contains("is-invalid")) {
                        return;
                    }
                }

                //COURSE
                var x = document.getElementsByClassName("course");
                var i;
                for (i = 0; i < x.length; i++) {
                    if (x[i].classList.contains("is-invalid")) return;
                    if (x[i].value === '') return;
                }

                //SAVE TEAM BEHIND THE SCENES IF team._id is empty

                this.showloginspinner = true;

                let userinfo = localStorage.getItem('userinfo');
                userinfo = JSON.parse(userinfo);

                let url = '';
                let action = '';

                if (this.team._id === '') { //addteam
                    url = globalState.admin_url + 'addTeam';
                    action = 'add'
                } else {
                    url = globalState.admin_url + 'updateTeam'
                    action = 'update'
                }

                this.axios.post(url, {
                        "competition": globalState.compid,
                        "course": this.team.clubid,
                        "_id": this.team._id,
                        "type": this.team.type,
                        "paid": false,
                        "teamleader": userinfo._id,
                        "teamreserveemail": this.team.teamreserveemail,
                        "teammembergolfid": this.team.teammembergolfid,
                        "teammemberemail": this.team.teammemberemail,
                        "teamreservegolfid": this.team.teamreservegolfid,
                        "company": this.team.company,
                        "teamnamecompany": this.team.name,
                        "uistep": this.team.step,
                        "logourl": this.team.logo
                    })
                    .then(response => {
                        if (response.data.status === 'error') {
                            return;
                        }

                        if (response.data.status === 'ok') {
                            //console.log('Team saved', response.data);
                            if (action === 'add') {
                                parentVue.team._id = response.data._id;
                            }
                            this.showloginspinner = false;
                            this.team.step++;
                            window.scrollTo(0, 0);
                        }

                    })
                    .catch(error => {
                        console.log(error);
                    });

            }

            //VALIDATE STEP 2

            if (this.team.step === 2) {
                element = document.querySelector("#teammembername");
                if (element.classList.contains("is-invalid")) {
                    return;
                }

                element = document.querySelector("#teammemberemail");
                if (element) {
                    if (element.classList.contains("is-invalid")) {
                        return;
                    }
                }
                let url = globalState.admin_url + 'updateTeam'
                this.axios.post(url, {
                        "competition": globalState.compid,
                        "_id": this.team._id,
                        "teammembergolfid": this.team.teammembergolfid,
                        "teammemberemail": this.team.teammemberemail,
                        "uistep": this.team.step
                    })
                    .then(response => {

                        if (response.data.status === 'error') {
                            console.log("error");
                            return;
                        }

                        if (response.data.status === 'ok') {
                            this.showloginspinner = false;
                            if (this.team.completemode) {
                                this.showloginspinner = false;
                                this.team.completemode = false;
                                this.getPlayerData();
                                this.team.step = 0;
                            } else {
                                this.team.step++;
                            }
                            window.scrollTo(0, 0);
                        }

                    })
                    .catch(error => {
                        console.log(error);
                    });

            }

            //VALIDATE STEP 3
            if (this.team.step === 3) {
                this.team.giveaway.shirtwarning = false;

                if (this.team.shirtPicker.player1.shirt === '' || this.team.shirtPicker.player2.shirt === '' || !this.team.shirtPicker.player1.size || !this.team.shirtPicker.player2.size) {
                    this.team.giveaway.shirtwarning = true;
                    return;
                }

                element = document.querySelector("#sponsname");
                if (element.classList.contains("is-invalid")) {
                    return;
                }

                element = document.querySelector("#sponsaddress");
                if (element.classList.contains("is-invalid")) {
                    return;
                }

                element = document.querySelector("#sponszipcode");
                if (element.classList.contains("is-invalid")) {
                    return;
                }

                element = document.querySelector("#sponscity");
                if (element.classList.contains("is-invalid")) {
                    return;
                }

                //SAVE TEAM BEHIND THE SCENES

                this.showloginspinner = true;

                let userinfo = localStorage.getItem('userinfo');
                userinfo = JSON.parse(userinfo);

                let url = '';
                let action = '';

                url = globalState.admin_url + 'updateTeam'
                action = 'update'

                this.axios.post(url, {
                        "competition": globalState.compid,
                        "_id": this.team._id,
                        "sponsormerch": true,
                        "item01": this.team.shirtPicker.player1.shirt,
                        "item02": this.team.shirtPicker.player2.shirt,
                        "property01": this.team.shirtPicker.player1.size,
                        "property02": this.team.shirtPicker.player2.size,
                        "sponsname": this.team.giveaway.sponsname,
                        "sponsaddress": this.team.giveaway.sponsaddress,
                        "sponszipcode": this.team.giveaway.sponszipcode,
                        "sponscity": this.team.giveaway.sponscity,
                        "uistep": this.team.step
                    })
                    .then(response => {

                        if (response.data.status === 'error') {
                            console.log("error");
                            return;
                        }

                        if (response.data.status === 'ok') {
                            this.showloginspinner = false;
                            this.team.step++;
                            window.scrollTo(0, 0);
                        }

                    })
                    .catch(error => {
                        console.log(error);
                    });

            }

        },
        shirtComplete() {
            let element;
            this.team.giveaway.shirtwarning = false;

            if (this.team.shirtPicker.player1.shirt === '' || this.team.shirtPicker.player2.shirt === '' || !this.team.shirtPicker.player1.size || !this.team.shirtPicker.player2.size) {
                this.team.giveaway.shirtwarning = true;
                return;
            }

            element = document.querySelector("#sponsname");
            if (element.classList.contains("is-invalid")) {
                return;
            }

            element = document.querySelector("#sponsaddress");
            if (element.classList.contains("is-invalid")) {
                return;
            }

            element = document.querySelector("#sponszipcode");
            if (element.classList.contains("is-invalid")) {
                return;
            }

            element = document.querySelector("#sponscity");
            if (element.classList.contains("is-invalid")) {
                return;
            }

            //SAVE TEAM BEHIND THE SCENES

            this.showloginspinner = true;

            this.axios.post(globalState.admin_url + 'updateTeam', {
                    "competition": globalState.compid,
                    "_id": this.team._id,
                    "sponsormerch": true,
                    "item01": this.team.shirtPicker.player1.shirt,
                    "item02": this.team.shirtPicker.player2.shirt,
                    "property01": this.team.shirtPicker.player1.size,
                    "property02": this.team.shirtPicker.player2.size,
                    "sponsname": this.team.giveaway.sponsname,
                    "sponsaddress": this.team.giveaway.sponsaddress,
                    "sponszipcode": this.team.giveaway.sponszipcode,
                    "sponscity": this.team.giveaway.sponscity,
                    "uistep": this.team.step
                })
                .then(response => {

                    if (response.data.status === 'error') {
                        console.log("error");
                        return;
                    }

                    if (response.data.status === 'ok') {
                        this.showloginspinner = false;
                        this.team.completemode = false;
                        this.getPlayerData();
                        this.team.step = 0;
                        window.scrollTo(0, 0);
                    }

                })
                .catch(error => {
                    console.log(error);
                });
        },
        getPlayerData(id) {
            this.fetchingPlayerData = true
            
            if (!id) {
                id = this.userinfo._id;
            }
            
            this.axios.post(globalState.admin_url + 'getPlayerData', {
                    "id": id,
                    "competition": globalState.compid
                })
                .then(response => {
                    if (response.data.hasOwnProperty('error')) {
                        console.log("error")
                        return;
                    }
                    let userinfo = response.data;
                    this.userinfo = userinfo;
                    this.teams = this.userinfo.teams;
                    this.teamscount = this.teams.length;                    
                    
                    //console.log(this.teamscount,this.userinfo);
                    if (this.teamcount || this.teams) {
                        this.showteamslist = true;                        
                    } else {
                        this.teamscount = 0;
                    }
                    
                    localStorage.setItem('userinfo', JSON.stringify(userinfo));
                    this.$store.dispatch('setUser', userinfo);
                    this.setuserinfoform();
                    this.fetchingPlayerData = false
                    return;
                })
                .catch(error => {
                    this.fetchingPlayerData = false
                    console.log(error);
                });

        },
        getPrevTeamData(id) { 
            this.axios.post(globalState.admin_url + 'getPlayerData', {
                    "id": id ? id : this.userinfo._id,
                    "competition": globalState.prevcompid
                })
                .then(response => {
                    this.previousteam = response.data.teams[0]
                    this.fetchingPrevData = true
                })
                .catch(error => {
                    console.log(error);
                });

        },
        populateTeamsForm() { 
            this.showSearchPlayerAlert = true
            const team = this.previousteam
            this.team.type = team.type


            if (this.team.type === "Company") {
                this.team.payment = "B"
                this.team.company = team.company
                this.team.logo = team.logourl
                this.team.file = true
                this.team.name = team.teamnamecompany
                this.team.clubid = team.course
                this.team.course = team.coursename
                this.selectedSearchItem = team.coursename
                this.query = team.coursename
                this.team.teammembername = team.teammembergolfid  
                this.invoicename = team.invoicename
                this.team.invoice.invoiceemail = team.invoiceemail
                this.team.invoice.invoiceorgno = team.invoiceorgno

                //timeout in order to put last in call stack so field have time to render
                setTimeout(() => {
                    var x = document.getElementsByClassName("course");
                    var i;
                    for (i = 0; i < x.length; i++) {
                        x[i].classList.add("is-valid");
                        x[i].classList.remove("is-invalid");
                    }
                }, 0);
           
            } else {
                this.team.name = team.teamname
                this.team.clubid = team.course
                this.team.course = team.coursename
                this.selectedSearchItem = team.coursename
                this.query = team.coursename
                this.team.teammembername = team.teammembergolfid  
                
                setTimeout(() => {
                    var x = document.getElementsByClassName("course");
                    var i;
                    for (i = 0; i < x.length; i++) {
                        x[i].classList.add("is-valid");
                        x[i].classList.remove("is-invalid");
                    }
                }, 0);
            }     

        },
        getSwishStatus: function (team) {
            this.axios.post(globalState.admin_url + 'getSwishStatus', {
                    "id": team,
                })
                .then(response => {
                    if (response.data.hasOwnProperty('status')) {
                        if (response.data.status === true) {
                            setTimeout(() => {
                                this.getSwishStatus(team);
                            }, 1000);
                        } else {
                            this.paymentstatus = response.data.paymentstatus;
                            this.showspinner_swish = false;
                            this.team.step = 5;

                        }
                    } else {
                        setTimeout(() => {
                            this.getSwishStatus(team);
                        }, 1000);
                    }

                })
                .catch(error => {
                    if (!error.status) {
                        setTimeout(() => {
                            this.getSwishStatus(team);
                        }, 1000);
                        // network error
                    }
                    console.log(error);
                });
        },
        payVoucher: function () {
            this.showspinner_voucher = true;
            let voucher = this.team.voucher;
            this.axios.post(globalState.admin_url + 'payVoucher', {
                    "competition": globalState.compid,
                    "team": this.team._id,
                    "code": voucher
                })
                .then(response => {
                    if (response.data.status === 'error') {
                        console.log("error");
                        return;
                    } else if (response.data.status === 'ok') {
                        this.showspinner_voucher = false;

                        if (response.data.paymentstatus === "PAID") {
                            this.paymentstatus = response.data.paymentstatus;
                            this.team.validatevoucher = true;
                            this.team.step = 5;

                        } else {
                            this.team.validatevoucher = false;
                        }

                    }

                })
                .catch(error => {
                    console.log(error);
                });
        },
        payInvoice: function () {

            var invprice = this.team.price_company;
            if (this.team.company_big) {
                invprice = this.team.price_company2;
            }
            if (this.useDiscount) {
                invprice = invprice - this.userdetails.referrals * 50
            }

            this.showspinner_invoice = true;
            this.axios.post(globalState.admin_url + 'payInvoice', {
                    //this.axios.post('http://localhost:3000/methods/payInvoice', {
                    "competition": globalState.compid,
                    //"competition": "YmweRj2PeatWfHEdM",
                    "team": this.team._id,
                    //"team": 'ns3ezQPncvt53cTmS',
                    "invoice": true,
                    "invoicename": this.team.invoice.invoicename,
                    "invoiceorgno": this.team.invoice.invoiceorgno,
                    "invoiceemail": this.team.invoice.invoiceemail,
                    "invoiceamount": invprice,
                    "marketingpackage": this.team.invoice.marketingpackage
                })
                .then(response => {
                    if (response.data.status === 'error') {
                        console.log("error");
                        return;
                    } else if (response.data.status === 'ok') {
                        this.showspinner_voucher = false;

                        if (response.data.paymentstatus === "INVOICE") {
                            this.paymentstatus = response.data.paymentstatus;
                            this.team.validatevoucher = true;
                            this.team.step = 5;

                        } else {
                            this.team.validatevoucher = false;
                        }

                    }

                })
                .catch(error => {
                    console.log(error);
                });
        },
        swish: function () {
            this.showspinner_swish = true;
            let mobile = this.team.swish.mobile;
            mobile = mobile.replace(/\s/g, "");
            mobile = mobile.slice(1)
            let amount;
            if (this.team.type === "Private") {
                amount = this.team.price_private;
            }

            if (this.team.type === "Company") {
                amount = this.team.price_company;
            }

            if (this.useDiscount) {
                amount = amount - this.userdetails.referrals * 50
            }
                        
            //if user is Rasmus set amount to 1 sek. 
            if (this.$store.state.userId === "Y6PQXKor9iXxmKyD5") {
                amount = 1
            }

            this.axios.post(globalState.admin_url + 'swish', {
                    "competition": globalState.compid,
                    "team": this.team._id,
                    "amount": amount,
                    "payer": mobile
                })
                .then(response => {
                    setTimeout(() => {
                        this.getSwishStatus(this.team._id);
                    }, 1000);
                })
                .catch(error => {
                    console.log(error);
                    this.showloginspinner = false;

                });
        },

        uploadCloudinary: function () {

            let parentVue = this;

            var CLOUDINARY_URL = '';
            var CLOUDINARY_UPLOAD_PRESET = '';
            var base_url = '';

            CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dn3hzwewp/image/upload';
            CLOUDINARY_UPLOAD_PRESET = 'vnozhel7';
            base_url = 'https://res.cloudinary.com/dn3hzwewp/image/upload/c_thumb,w_200/';

            var formData = new FormData();
            formData.append('file', this.team.file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

            fetch(CLOUDINARY_URL, {
                    method: 'POST',
                    body: formData
                })
                .then(function (response) {

                    return response.json();
                })
                .then(function (data) {
                    //if (data.secure_url !== '') {
                    if (data.public_id !== '') {
                        var uploadedFileUrl = data.secure_url;
                        parentVue.team.logo = uploadedFileUrl;
                    }
                })

        },
        getGolfClubs: function () {
            this.axios
                .post(
                    globalState.admin_url + "getGolfclubs"
                )
                .then(response => {
                    this.clubs = response.data;

                })
                .catch(error => {
                    //this.player_1_error = "Golfaren hittades inte... prova att skriva in golfid igen.";   
                    console.log(error);
                });
        },
        onCountryInputChange(query) {

            if (query.trim().length === 0) {
                var x = document.getElementsByClassName("course");
                var i;
                for (i = 0; i < x.length; i++) {
                    x[i].classList.add("is-invalid");
                    x[i].classList.remove("is-valid");
                }
                return null;
            }
            // return the matching countries as an array
            return this.clubs.filter((club) => {
                return club.title.toLowerCase().includes(query.toLowerCase())
            })
        },
        onSearchItemSelected(item) {

            this.ninehole = false;
            this.selectedSearchItem = item.title;
            this.query = item.title;
            this.team.clubid = item._id;
            this.team.course = item.title;
            if (item.hasOwnProperty('isnineholes')) {
                if (item.isnineholes){
                    this.ninehole = true;               
                }                
            }


            var x = document.getElementsByClassName("course");
            var i;
            for (i = 0; i < x.length; i++) {
                x[i].classList.add("is-valid");
                x[i].classList.remove("is-invalid");
            }
            
            if (this.team.clubid !== '') {
                this.getTopListClubs(this.team.clubid);
            }

        },

        register: function () {
            this.$router.push({
                path: "/"
            });
            var element = this.$refs["register"];
            var top = element.offsetTop;
            window.scrollTo(0, top);
        },
        makeToast(message, variant) {
            this.$bvToast.toast(message, {
                title: 'Meddelande',
                autoHideDelay: 5000,
                appendToast: true,
                variant: variant
            })
        },
        edit_team(eventObj) {

            this.team.teamleader = eventObj.teamleader;

            if (this.team.teamleader) {
                this.team.is_readonly = false;
                this.create_team('edit', eventObj);
            } else {
                this.makeToast('Du är inte vald lagkapten till detta laget. Endast lagkaptenen kan redigera laget.', 'danger');
                this.team.is_readonly = true;
                this.create_team();
            }

        },
        create_team(action, eventObj) {
            this.tabIndex = 1; //lag tab
            this.showcreateteamhelper = false;
            window.scrollTo(0, 0);

            //load clubs to const
            this.getGolfClubs();
            //end

            if (action === 'new') {
                let userinfo = localStorage.getItem('userinfo');
                userinfo = JSON.parse(userinfo);
                this.team.is_readonly = false;
                //this.team = {};
                //this.team.type = 'Private' //remove later
                this.team.teamleadername = userinfo.golfid;
                //this.team.teammembername = '780110-010' //remove later
                //this.team.teamreservename = '780110-001' //remove later
                this.team.step = 1;
            }

            if (action === 'edit') {
                let userinfo = localStorage.getItem('userinfo');
                userinfo = JSON.parse(userinfo);
                this.team.is_readonly = false;
                this.team.type = eventObj.type;
                this.team_id = eventObj._id;
                this.team.step = eventObj.uistep;
                this.team.teamleadername = eventObj.teamleadername;

                //this.team = {};
                //this.team.type = 'Private' //remove later

            }

            this.showteamslist = false;
            this.showcreateteam = true;
        },
        cancel_team() {
            this.resetTeamProperties();
            this.getPlayerData();
            this.showcreateteam = false;
            //this.showteamslist = true;
            this.team.step = 0;
            this.team.completemode = false;
            window.scrollTo(0, 0);
        },
        save_state1(evt) {

            let userinfo = localStorage.getItem('userinfo');
            userinfo = JSON.parse(userinfo);

            this.axios.post(globalState.admin_url + 'addTeam', {
                    "competition": globalState.compid,
                    "course": this.team.clubid,
                    "type": this.team.type,
                    "paid": false,
                    "teamleader": userinfo._id,
                    "teamreserveemail": this.team.teamreserveemail,
                    "teammembergolfid": this.team.teammembergolfid,
                    "teammemberemail": this.team.teammemberemail,
                    "teamreservegolfid": this.team.teamreservegolfid
                })
                .then(response => {

                    if (response.data.status === 'error') {
                        console.log("error")
                        return;
                    }

                    if (response.data.status === 'ok') {
                        this.team.state = 2;
                    }

                })
                .catch(error => {
                    console.log(error);
                });

            window.scrollTo(0, 0);

        },
        save_state2(evt) {
            this.team.state = 3;
        },
        update_team() {

                var url = globalState.admin_url + 'updateTeam'
                this.axios.post(url, {
                        "competition": globalState.compid,
                        "course": this.team.clubid,
                        "_id": this.team._id,
                        "type": this.team.type,
                        "company": this.team.company,
                        "teamnamecompany": this.team.name,
                        "uistep": this.team.step,
                        "logourl": this.team.logo
                    })
                    .then(response => {
                        if (response.data.status === 'error') {
                            return;
                        }

                        if (response.data.status === 'ok') {
                            console.log('Team saved', response.data);
                            this.showloginspinner = false;                           
                            this.cancel_team();
                        }

                    })
                    .catch(error => {
                        console.log(error);
                    });
        },
        save_team(evt) {
            //alert(JSON.stringify(this.team));

            let userinfo = localStorage.getItem('userinfo');
            userinfo = JSON.parse(userinfo);

            this.axios.post(globalState.admin_url + 'addTeam', {
                    "competition": globalState.compid,
                    "course": this.team.clubid,
                    "type": this.team.type,
                    "paid": false,
                    "teamleader": userinfo._id,
                    "teamreserveemail": this.team.teamreserveemail,
                    "teammembergolfid": this.team.teammembergolfid,
                    "teammemberemail": this.team.teammemberemail,
                    "teamreservegolfid": this.team.teamreservegolfid
                })
                .then(response => {

                    if (response.data.hasOwnProperty('error')) {
                        console.log("error")
                        return;
                    }

                    return;
                })
                .catch(error => {
                    console.log(error);
                });

            window.scrollTo(0, 0);

        },
        login(evt) {
            evt.preventDefault();
            this.showloginspinner = true;

            const server = new simpleDDP(opts, [simpleDDPLogin]);

            let password = this.form.pwd;
            let email = this.form.email;
            let parentVue = this;

            // doAsyncOperation1() returns a promise.
            trylogin()
                .then(() => {
                    parentVue.showerror = false;
                    localStorage.setItem('auth_token', server.token);
                    localStorage.setItem('userId', server.userId);
                    parentVue.showloginspinner = false;
                    parentVue.doctitle = 'My matchplay';
                    
                    this.$store.dispatch('setAuthentication', {token: server.token, userId: server.userId})                    
                    this.getPlayerData(server.userId)
                })
                .then((output) => {
                    this.setuserinfoform();
                })
                .then(() => {
                    this.showlogin = false;
                })
                .catch(() => {
                    parentVue.showerror = true;
                    parentVue.showloginspinner = false;
                });

            async function trylogin() { // (1)
                let response = await server.login({
                    password,
                    user: {
                        email
                    }
                });
            }

        },
        isloggedin: function () {

            server.on('login', (m) => {});

        },
        checkGolfID: function (golfid, target) {
            //console.log(golfid,target)
            this.team.ownid = '';
            let userinfo = localStorage.getItem('userinfo');
            userinfo = JSON.parse(userinfo);

            if (golfid === '') return;
            if (!golfid.includes("-")) return;
            if (!golfid.length === 10) return;

            if (target === '2') {
                this.showspinner_2 = true;

                //Check if own golf id search, not accepted
                if (userinfo.golfid === golfid) {
                    this.team.checkgolfidvariant2 = "warning";
                    this.team.ownid = 'Du kan inte söka på ditt eget golf id.';
                    this.team.player_2_name = '';
                    this.team.player_2_hcp = '';
                    this.team.player_2_exists = true;
                    this.team.showplayer2 = true;
                    this.showspinner_2 = false;
                    return;
                }
            }

            if (target === '3') {
                this.showspinner_3 = true;

                //Check if own golf id search, not accepted
                if (userinfo.golfid === golfid) {                    
                    this.team.checkgolfidvariant3 = "warning";
                    this.team.player_3_name = 'Du kan inte söka på ditt eget golf id.'
                    this.team.showplayer3 = true;
                    this.showspinner_3 = false;
                    return;
                }

            }

            this.axios
                .post(
                    globalState.admin_url + "getPlayerByGolfid",
                    //"https://colburn-chat-buxom-tamale.eu-gb.mybluemix.net/get_golfid?golfid=" + golfid,
                    //"http://localhost:3000/get_golfid?golfid=" + golfid1 + '-' + golfid2,
                    {
                        golfid: golfid
                    }
                )
                .then(response => {

                    if (response.data.hasOwnProperty('notingit')) {}

                    if (!response.data.hasOwnProperty('notingit')) {

                        if (target === '2') {
                            this.team.checkgolfidvariant2 = "primary";
                            this.team.showplayer2 = true;
                            this.team.player_2_name = response.data.firstname + ' ' + response.data.lastname;
                            this.team.player_2_hcp = response.data.hcp.replace(/,/g, '.');
                            this.team.teammembergolfid = golfid;
                            this.team.player_2_exists = response.data.exists;

                            this.team.showplayer2 = true;
                            this.showspinner_2 = false;
                            this.team.showplayer2 = true;
                        }

                        if (target === '3') {                            
                            this.team.checkgolfidvariant3 = "primary";
                            this.team.showplayer3 = true;
                            this.team.player_3_name = response.data.firstname + ' ' + response.data.lastname;
                            this.team.player_3_hcp = response.data.hcp.replace(/,/g, '.');
                            this.team.teamreservegolfid = golfid;
                            this.team.player_3_exists = response.data.exists;

                            this.team.showplayer3 = true;
                            this.showspinner_3 = false;
                            this.team.showplayer3 = true;
                            //console.log(this.team.player_3_name,this.team.player_3_hcp)
                        }

                        //this.form.hcp = response.data.hcp.replace(/,/g, '.')

                        //if (response.data.club == 'empty') {
                        //  this.showqualifiedNOCLUB = true;
                        //  return;
                        //}

                        /*
          if (this.form.hcp < 32) {
              this.showqualified = true;
          } else if (this.form.hcp > 32 && this.form.hcp < 36.1 ) {
              this.showqualified32 = true;
          } else if (this.form.hcp > 36.0) {
               this.showqualifiedNOT = true;
          }
          */

                        return;
                    } else {

                        if (target === '2') {
                            this.team.checkgolfidvariant2 = "danger";
                            this.team.player_2_name = 'Hittade inte spelaren';
                            this.team.player_2_hcp = '';
                            this.team.player_2_exists = true;
                            this.showspinner_2 = false;
                            this.team.showplayer2 = true;
                        }

                        if (target === '3') {
                            this.team.checkgolfidvariant3 = "danger";
                            this.team.player_3_name = 'Hittade inte spelaren';
                            this.team.player_3_hcp = '';
                            this.team.player_3_exists = true;
                            this.showspinner_3 = false;
                            this.team.showplayer3 = true;
                        }

                        //this.showAlert();
                        //this.showloadgolfid = false;
                        return;
                    }

                })
                .catch(error => {
                    //this.player_1_error = "Golfaren hittades inte... prova att skriva in golfid igen.";   
                    console.log(error);
                });
        },
        logoutPrompt: function () {
            this.boxTwo = ''
            this.$bvModal.msgBoxConfirm('Vill du verkligen logga ut från matchplay?', {
                    title: 'Logga ut?',
                    size: 'md',
                    buttonSize: 'md',
                    okVariant: 'danger',
                    okTitle: 'Japp, jag är säker',
                    cancelTitle: 'Nej tack',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                .then(value => {
                    if (value) {
                        this.logout();
                    }
                })
                .catch(err => {
                    // An error occurred
                })
        },

        showReserveModal: function() {
           
        },


        logout: function () {

            //const simpleDDP = require("simpleddp");
            //const simpleDDPLogin = require("simpleddp-plugin-login").simpleDDPLogin;

            const server = new simpleDDP(opts, [simpleDDPLogin]);
            let parentVue = this;

            localStorage.setItem('auth_token', '');
            localStorage.setItem('userinfo', '');
            localStorage.setItem('userId', '');

            async function trylogout() { // (1)
                let response = await server.logout(); // (2)
                parentVue.doctitle = 'Logga in';
                parentVue.showlogin = true;
                parentVue.showloginspinner = false;
                parentVue.loading = false;

                parentVue.makeToast('Du är nu utloggad.', 'primary');
                // this.$username = 'Logga in';

                window.scrollTo(0, 0);

            }

            trylogout();

            server.on('logout', () => {
                console.log('User logged out');
            });

            this.$store.dispatch('deleteUserInfo')
            this.$store.dispatch('deleteAuthData')

        },
        setuserinfoform: function () {          
            let userinfo = localStorage.getItem('userinfo');
            if (userinfo) {
                try {
                    //SET KEYS in form                   
                    userinfo = JSON.parse(userinfo);
                   
                    this.userinfo = userinfo;
                    this.userdetails.userId = userinfo._id;
                    this.userdetails.firstname = userinfo.firstname;
                    this.userdetails.lastname = userinfo.lastname;
                    this.userdetails.referrals = userinfo.numberofreferrals;
                    this.$username = this.userdetails.firstname;
                    this.userdetails.numberofteams = userinfo.numberofteams;
                    this.userdetails.golfid = userinfo.golfid;
                    this.userdetails.hcp = userinfo.hcp;
                    this.userdetails.email = userinfo.email;
                    this.userdetails.mobile = userinfo.mobile
                    this.team.swish.mobile = userinfo.mobile
                    if (userinfo.hasOwnProperty('isambassador')) {
                        this.userdetails.isambassador = userinfo.isambassador;
                    } else {
                        this.userdetails.isambassador = false;
                    }
                   
                    if (userinfo.hasOwnProperty('numberofgames')) {
                        this.userdetails.numberofgames = userinfo.numberofgames;
                    } 

                    if (userinfo.hasOwnProperty('numberofwins')) {
                        this.userdetails.numberofwins = userinfo.numberofwins;
                        if (userinfo.numberofwins > 0) {                              
                            this.userdetails.firstwin = true;                            
                        }
                    } 

                    this.games = [];
                    let games = [];

                    //check if user has teams or not
                    if (userinfo.teams) {
                        
                        this.showteamslist = true;
                        this.showcreateteamhelper = false;
                       
                       
                        //this.teams = userinfo.teams.filter((team) => {
                        //    return team.paid || team.invoice
                        //});
                        //this.teams = userinfo.teams;
                        this.teams = this.userinfo.teams;
                        this.teamscount = this.teams.length;

                        if (this.teamscount > 0) {
                            this.team.paid = this.teams[0].paid;
                            
                            //if not paid, show how many teams for chosen club 
                            //if (!this.teams[0].paid) {          
                                this.getTopListClubs(this.teams[0].course);
                            //}

                                //show referral modal if paid team, set cookie
                                if(this.team.paid) {                                 
                                     if (!localStorage.getItem('showReferralInfo')) {                                       
                                        //this.showReferralModal();   //only show in beginning of competition                                       
                                     }    
                                     
                                     //show important modal only if user hasnt set checkbox
                                     if (!localStorage.getItem('showImportantInfo')) {   
                                        this.showImportantModal(); 
                                     }
                                }

                        }



                        //loop teams and get games if any
                        var i;
                        var b;
                        
                        for (i = 0; i < this.teams.length; i++) {
                           if (this.teams[i].games) {   
                                                                                
                            for (b = 0; b < this.teams[i].games.length; b++) {
                                this.games.push(this.teams[i].games[b])
                            }
                            
                            //this.games.sort(this.compareValues('status', 'desc'));                               
                           }
                        }

                        this.gamescount = this.games.length;


                    } else {
                        this.teams = {};
                        this.showcreateteamhelper = true;
                        this.showteamslist = false;
                    }
                    //end check teams

                    this.loading = false;

                } catch (e) {
                    console.log('error')
                    //something went wrong, maybe the token is too old or not valid
                }
            } else {
                                
               
                //this.loading = false;

                this.showlogin = true;
            }

            //console.log(Object.keys(jsonObj));  // returns ["person", "age"]
            //this.userdetails.firstName = myJsonString.firstName;
        }
    },
 compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
},

    updated: function () {
          //scroll to top
        //window.scrollTo(0, 0);
    },
    created() {
        if (localStorage.getItem('earlyBirdie2022') !== '1') {
            this.showEarlyBirdie = true
        }
    const promise = this.$store.dispatch('getCompetition', globalState.compid)
        promise.then(() => {
        this.team.price_private = this.price1
        this.team.price_company = this.price2
        this.team.price_company2 = this.price3
                  
        if (localStorage.getItem('sponsor')) {
            if (localStorage.getItem('sponsor') === 'gm') {
                this.team.pricereduc = 50;            
            } else {
                this.team.pricereduc = 0;
            }
            this.team.price_private =  this.team.price_private-this.team.pricereduc;
        }

    })
        
       this.getGolfClubs();
       
       this.$store.dispatch("tryAutoLogin").then(() => {
            if (this.isAuthenticated) {
            console.log("isAuthenticated")
            console.log(this.$store.state.user)
                
                var sim_id;
                sim_id = localStorage.getItem('userId');
                
                if (!sim_id || sim_id === 'undefined' || sim_id === '') {
                    sim_id = localStorage.setItem('auth_token','');
                    this.showlogin = true;
                    this.loading = false;
                    return;
                }
                
                if (this.$route.query.sim_id) {
                    sim_id = this.$route.query.sim_id;   
                }
                
                this.getPrevTeamData(sim_id)

               

                //check data is in store --> then dont fetch
                if (!this.$store.state.user) {
                    this.getPlayerData(sim_id);
                }

                if (this.$store.state.user) {
                    let userinfo = this.$store.state.user
                    this.userinfo = userinfo;
                    this.teams = this.userinfo.teams;
                    this.teamscount = this.teams.length;                    
                    
                    //console.log(this.teamscount,this.userinfo);
                    if (this.teamcount || this.teams) {
                        this.showteamslist = true;                        
                    } else {
                        this.teamscount = 0;
                    }
                    
                    localStorage.setItem('userinfo', JSON.stringify(userinfo));
                    this.$store.dispatch('setUser', userinfo);
                    this.setuserinfoform();
                    this.loading = false;

                }

                this.tabIndex = Number(localStorage.getItem('active_tab'));     
                
                //INITIATE POLL
                setTimeout(() => {
                    this.showPoll();                        
                }, 1000);
             

            } else {
                this.showlogin = true;
                this.loading = false;
            }
       })
       
    },
    watch: {
        file: {
            handler() {
            if (this.file === null) {
                return
            }
            this.handleFileUpload()
            },
        },
        userId: {
            handler() {
                this.getPrevTeamData(this.userId)
            },
        },
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
@import "../styles/variables.scss";

ol {
    padding-left:1.25em;
}

.importantlist li {
    margin-bottom:0.75em;
}

.pointer {
    cursor:pointer;
}

.badge.hcp {
    font-size:0.7em;
    padding: 0.6em 0.6em 0.3em 0.6em;
    margin-bottom:5px;
}

.card-body {
    padding-bottom:0px !important;
}

.card-text-team {
    font-size:0.90em;
}

.stats {
    // background: lighten($blue, 5%);
    border-radius:0.2em;
    color:#333;
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

h2 {
    font-size:1.2em !important;
}

.badges i {
    font-size:2.3em;
    margin-right:0.1em;
    outline: none;
}
.gold {
    color:#DAA520;
}

.silver {
    color:#c0c0c0
}

.bronze {
    color:#cd7f32;
}

h2.teaser-header {
    font-size:1.4em !important;
}

.teamimage {
    border:1px solid grey;
    background:#FFF;
    padding:0.5em;    
}

.card-body {
    padding: 0.7rem 1.25rem;
}

.card {
    border: 1px solid rgba(0,0,0,.2);
        -webkit-box-shadow: 0px 0px 7px 0px #DBDBDB; 
box-shadow: 0px 0px 7px 0px #DBDBDB;
  
}

.invitemember {
    text-decoration:underline;
    cursor:pointer;
}

.green {
    color:green !important;
}

.red {
    color:red !important;
}

img {
    max-width:70%;
}

.winner {
  color: $success;
}

.red {
    color: red;
}

.result.loser, .loser{
  color: red;
 text-decoration: line-through;
}

.header {
    //background-image: url( https://res.cloudinary.com/dn3hzwewp/image/upload/w_400,o_25/v1583999753/matchplay/Background-8.jpg);
    background-image: url(https://res.cloudinary.com/dn3hzwewp/image/upload/w_800,o_65/v1609862906/matchplay/clean-white-polygon-backgrounds-7.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center right;
   
}

.btn i {
    vertical-align: sub;
}

.file-input~.file-label::after {
    content: 'Välj fil';
}

.help {
    margin-left: 0.5em;
    vertical-align: text-bottom;
}

.team h4 {
    font-size: 1.4em !important;
    min-height: 50px;
}

.team {    
    font-size: 1em;
  
}

.team i {
    vertical-align: bottom;
    text-align: center;
    width:30px;
}

.sessions-container.my-schedule .row.session {
    display: none !important;
}

.sessions-container.my-schedule .row.session {
    opacity: 0.3;
}

.sessions-container.my-schedule .row.session.active {
    display: flex !important;
    opacity: 1;
}

.no-my-schedule {
    margin: 10rem 0;
}

i.big {
    z-index: -1;
    position: absolute;
    font-size: 22rem;
    opacity: 0.2;
    line-height: 7rem;
    margin-left: -11rem;
}

.shirt {
    cursor: pointer;
}

.selected {
    background: #FFFFCC;

}

#male-button,
#female-button {
    background-color: $light;
}

#male-button.btn-male {
    background-color: $success;
    color: #fff;
}

#female-button.btn-female {
    background-color: $success;
    color: #fff;

}

img.overview-logo {
    float: right;
    max-height: 30px;
}

.material-icons.smaller {
    font-size: 20px;
}

.delete-team {
    position: absolute;
    color:#666;
    z-index: 1;
    right: 15px;
    top: 8px;
    border-radius: 50%;
    padding: 5px;
    height: 40px;
    width: 40px;
    background-color: rgba(255,255,255,0.65);
    border-color: #bbb;
}

.pulse-button {

    position: relative;
    /*width: 100px;
  height: 100px;*/
    border: none;
    box-shadow: 0 0 0 0 rgba(105, 179, 254, 1);
    background-color: #69b3fe !important;
    background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/173024/jonathanlarradet_copy.png);
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

.inputfile {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}

.inputfile + label {
	cursor: pointer; /* "hand" cursor */
}

@-webkit-keyframes pulse {
    to {
        box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);
    }
}

@-moz-keyframes pulse {
    to {
        box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);
    }
}

@-ms-keyframes pulse {
    to {
        box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);
    }
}

@keyframes pulse {
    to {
        box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);
    }
}

@media only screen and (max-width: 330px) {
		/* iphone 5/se */

    * {
        font-size:14px;
    }

}

</style>
