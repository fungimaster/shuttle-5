<template>
  <div class="sessions-container my-schedule">
    <vue-headful
    :title="doctitle"

    />
    <div v-if="loading" class="d-flex justify-content-center mb-3">
    <b-spinner big type="grow" class="m-5" style="width: 5rem; height: 5rem;"></b-spinner>
    </div>
   
    <div class="container" v-if="!loading">
    
       <b-row class="mb-5 mt-5"> 
         
      <!---------------------------- LOGIN --------------------------------------->
              
               <b-col md="12" class="mt-3" v-if="showlogin">
                 <h2 class="teaser-header orange">Logga in</h2>
                 <br>           


          <b-form @submit.stop.prevent @submit="login" v-if="showlogin">
             <b-form-group>
               <label for="email">E-post</label>
                  <b-input v-model="form.email"
                    inputmode="email"                    
                    type="email"          
                    class="form-control"
                    id="email"
                    placeholder="Ange din e-postadress"
                    value
                    required
                  />       
             </b-form-group>
              <b-form-group>    
                <label for="pwd">Lösenord</label>                  
                  <b-input v-model="form.pwd"
                    type="password"                  
                    class="form-control"                
                    id="pwd"
                    placeholder="Ange ditt lösenord"
                    value
                    required
                  />     
              </b-form-group>
                   <b-button type="submit" variant="primary" class="btn blue-bg"><b-spinner v-if="showloginspinner" small type="grow" class="mr-2"></b-spinner>Logga in</b-button>             
          <b-alert v-if="showerror" variant="warning" show class="mt-4 small form-text text-muted">Din e-post eller lösenord stämmer inte, försök igen eller återställ ditt lösenord.</b-alert>   
                </b-form>
            <div class="mt-4">
            <small><a href="#">Glömt ditt lösenord?</a></small> | <small><a href="/#register">Registrera dig</a></small>
            </div>
              </b-col>        

<!---------------------------- LOGGED IN --------------------------------------->
<b-col md="12" class="" v-if="!showlogin">

<b-container>
  <b-row>
    <b-col md="6">
      <h2 class="teaser-header orange mt-3">Hej {{userdetails.firstname}}!</h2>
    </b-col>
    <b-col md="6" class="text-right pt-1">
      <b-button variant="primary" class="blue-bg mt-2 mb-2" v-if="!showcreateteam" v-on:click="create_team('new')">Skapa nytt lag</b-button>

    </b-col>
  </b-row>
</b-container>

                
<hr>


<!-- list of teams -->
     <b-container v-if="showteamslist" class="">
   <b-row>   
     <b-col sm="6" lg="6" class="team pl-2 pr-2 pb-2" v-for="(team,idx) in teams" :key="idx" >
      <b-card  :title=team.teamname v-on:click="edit_team(team)"        
    img-src="https://res.cloudinary.com/dn3hzwewp/image/upload/c_fill,g_center,h_200,w_508/v1572963227/matchplay/c640cf_76573b7e69c04dc2bb0592399d738a17_mv2_d_4006_3000_s_4_2.jpg"
    img-alt="Image"
    img-top
    tag="article" 
    class="mb-2 team"    
  >
    <b-card-text class="mt-3">    
  
      <div class="pt-0 pb-3">
        <span :id="'tooltip-teamleader-' + idx">
          <i class="material-icons mr-2">person_pin</i>{{team.teamleadername}}     
          <b-tooltip :target="'tooltip-teamleader-' + idx" triggers="hover" placement="top">
            Lagkaptenen för laget
          </b-tooltip>
        </span>
      </div>

      <div class="pt-0 pb-3">
        <span :id="'tooltip-course-' + idx">
          <i class="material-icons mr-2">golf_course</i>{{team.course}}     
          <b-tooltip :target="'tooltip-course-' + idx" triggers="hover" placement="top">
            Hemmaklubb för matcher
          </b-tooltip>
        </span>
      </div>

      <div class="pt-0 pb-0">
        <span :id="'tooltip-nextgame-' + idx">
          <i class="material-icons mr-2">date_range</i>{Next game}     
          <b-tooltip :target="'tooltip-nextgame-' + idx" triggers="hover" placement="top">
            Nästa match
          </b-tooltip>
        </span>
      </div>

      
     
    </b-card-text>
    <template v-slot:footer>       
                <p class="mb-0" style="color:green;" v-if="team.paid">
                   <i class="material-icons mr-2">attach_money</i>{{text.paidteam}}
                </p>
                <p class="mb-0" style="color:red;" v-if="!team.paid">
                   <i class="material-icons mr-2">money_off</i>{{text.not_paidteam}}
                </p>     
      </template>

    <b-button hidden variant="primary" class="blue-bg">Redigera lag</b-button>
  </b-card>
     </b-col>
     
   </b-row>
     </b-container> 


<b-alert show v-if="showcreateteamhelper" class="small mt-4 form-text text-muted">
  För att skapa ett lag trycker du på knappen "Skapa nytt lag" och fyller sedan i uppgifterna, ditt lag blir inte aktivt förrens du har betalat det.
</b-alert>
                   

 <b-form class="mt-4" @submit.stop.prevent @submit="save_team" v-if="showcreateteam">

<!-- PAID HIDDEN -->
           <b-container fluid class="mb-3 pl-0 pr-0">
              <b-row class="">
                <b-col class="" style="color:green;" v-if="team.paid">
                   <i class="material-icons mr-2" style="vertical-align: sub;">attach_money</i>{{text.paidteam}}
                </b-col>
                <b-col class="" style="color:red;" v-if="!team.paid">
                   <i class="material-icons mr-2" style="vertical-align: sub;">money_off</i>{{text.not_paidteam}}
                </b-col>
              </b-row>
           </b-container>

             <b-form-group class="mb-5">
               <label for="type">Typ av lag</label>
                <b-form-select v-bind:disabled="team.is_readonly"
                v-model="team.type" 
                :options="teamoptions"
                required
                ></b-form-select>  
             </b-form-group>


<!-- Team name -->
            <b-form-group class="mb-5" v-if="team.type === 'Company' && !team.is_readonly">
              <label for="name">Lagnamn</label>
               <b-form-input
                id="input-2"
                v-model="team.name"
                required
                placeholder="Skriv in lagnamnet"
              ></b-form-input>
            </b-form-group>

           
 <b-button hidden @click="uploadCloudinary()"  variant="info" size="sm" class="float-right mt-1">Ladda upp</b-button>           
           

 <b-form-group class="mb-5" v-if="team.type === 'Company' && !team.is_readonly">
   <label for="name">Företagslogotyp</label>
             <b-form-file @input="uploadCloudinary()" style="font-size:0.9em;"
      v-model="team.file"
      :state="Boolean(team.file)"
      placeholder="Ladda upp din företagslogga"
      drop-placeholder="Drop file here..."
      accept="image/jpeg, image/png, image/gif"
    ></b-form-file>
   <b-form-input hidden
                id="input-logo"
                v-model="team.logo"
              ></b-form-input>
             
   <img class="mt-2" v-bind:src="team.logo" v-if="team.type === 'Company'"/>
    
    
    
 </b-form-group>

<b-container fluid class="mb-5" v-if="team.type != null">
  <b-row class="">
    <b-col md="4" class="pl-0 pr-0 pr-md-2">
      <b-form-group>
              <label for="name">Lagkapten</label>
               <b-form-input v-bind:readonly="true"
                id="teamleadername"
                v-model="team.teamleadername"                
                placeholder="Golf id (xxxxxx-xxx)"                   
              ></b-form-input>
              <b-button hidden @click="checkGolfID(team.teamleadername,'1')" v-if="!team.is_readonly" variant="info" size="sm" class="float-right mt-1"><b-spinner v-if="showspinner_1" small type="grow" class="mr-2"></b-spinner>Sök spelare</b-button>           
            </b-form-group>

            <b-alert v-if="team.showplayer1" variant="primary" show class="mt-4 small form-text">
            {{team.player_1_name}}
            {{team.player_1_hcp}}
            </b-alert>   

    </b-col>
    <b-col md="4" class="pl-0 pr-0 pl-md-2 pr-md-2">
       <b-form-group>
              <label for="name">Lagmedlem</label>
               <b-form-input v-bind:readonly="team.is_readonly"
                id="teammembername"
                v-model="team.teammembername"
                placeholder="Golf id (xxxxxx-xxx)"
              ></b-form-input>
              <b-button @click="checkGolfID(team.teammembername,'2')" v-if="!team.is_readonly" variant="info" size="sm" class="float-right mt-1"><b-spinner v-if="showspinner_2" small type="grow" class="mr-2"></b-spinner>Sök spelare</b-button>  
            </b-form-group>
           
            <b-alert v-if="team.showplayer2" :variant="team.checkgolfidvariant2" show class="mt-4 small form-text">
            Spelare: {{team.player_2_name}}<br>
            HCP: {{team.player_2_hcp}}
            
            <b-form-input class="mt-2" v-if="!team.player_2_exists"                
                v-model="team.teammemberemail"
                placeholder="E-mail till deltagaren"
                required
              ></b-form-input>

              <p class="mt-2" v-if="!team.player_2_exists">
                När du sparar laget kommer vi skicka en inbjudan till din lagkamrat.
              </p>

              <p class="mt-2" v-if="team.player_2_exists">
                Denna spelaren har ett konto i Matchplay och kommer bli notifierad när du sparar laget.
              </p>
            
            <b-form-input hidden              
                v-model="team.teammembergolfid"
                placeholder="Golfid"
                required
              ></b-form-input>
            
            </b-alert>   

    </b-col>
    <b-col md="4" class="pl-0 pr-0 pl-md-2 pr-md-2">
       <b-form-group>
              <label for="name">Reserv</label>
               <b-form-input v-bind:readonly="team.is_readonly"
                id="teamreservename"
                v-model="team.teamreservename"                
                  placeholder="Golf id (xxxxxx-xxx)"
              ></b-form-input>
               <b-button @click="checkGolfID(team.teamreservename,'3')" v-if="!team.is_readonly" variant="info" size="sm" class="float-right mt-1"><b-spinner v-if="showspinner_3" small type="grow" class="mr-2"></b-spinner>Sök spelare</b-button>  
            </b-form-group>

                      
                        <b-alert v-if="team.showplayer3" :variant="team.checkgolfidvariant3" show class="mt-4 small form-text">
            Spelare: {{team.player_3_name}}<br>
            HCP: {{team.player_3_hcp}}
            
            <b-form-input class="mt-2" v-if="!team.player_3_exists"                
                v-model="team.teamreserveemail"
                placeholder="E-mail till reserven"
                required
              ></b-form-input>

              <p class="mt-2" v-if="!team.player_3_exists">
                När du sparar laget kommer vi skicka en inbjudan till din lagkamrat
                </p>
            
            <b-form-input hidden              
                v-model="team.teamreservenamegolfid"
                placeholder="Golfid"
                required
              ></b-form-input>
            
            </b-alert>
           

    </b-col>
  </b-row>
</b-container>


<!-- Course -->
<b-form-group class="mb-5" v-if="team.type != null && !team.is_readonly">
               <label for="type">Välj hemmaklubb för matcher<i v-b-popover.hover.top="'Välj en klubb som ligger nära där du bor eller tänkt spela dina matcher.'" title="Hjälp" class="help material-icons mr-2">help_outline</i></label>
  <suggestions  
    v-model="query"
    :options="options"
    :onInputChange="onCountryInputChange"
    :onItemSelected="onSearchItemSelected" style="width:100%;">
    <div slot="item" slot-scope="props" class="single-item">
    <span class="name">{{props.item.title}}</span>
  </div>
  </suggestions> 
    <b-form-input hidden
                id="clubid"
                v-model="team.clubid"
                readonly
                placeholder="Id på klubben"
              ></b-form-input>
</b-form-group>

                    <!-- Payment -->
            <b-form-group class="mb-5" v-if="team.type != null && !team.is_readonly">
              <label for="name">Betalningsalternativ</label>
             
      <b-form-radio v-model="team.payment" name="some-radios" value="A">Swish</b-form-radio>
      <b-form-radio v-model="team.payment" name="some-radios" value="B">Faktura (90:- fakturaavgift för privatlag)</b-form-radio>
      <b-form-radio v-model="team.payment" name="some-radios" value="C">Voucher/Kod</b-form-radio>
            </b-form-group>

            <!-- Voucher name -->
            <b-form-group v-if="team.payment === 'C'">
              <label for="name">Voucher</label>
               <b-form-input
                id="input-2"
                v-model="team.voucher"
                required
                placeholder="Skriv in din kod här"
              ></b-form-input>
            </b-form-group>
           
           <b-container fluid class="mb-3" v-if="team.payment === 'A'">
              <b-row class="">
                <b-col class="">
                    Swish logo<br>
                    Swish amount<br>
                    Swish user phone<br>
                    Pay button
                </b-col>
              </b-row>
           </b-container>

           

           
             
             <b-button v-if="!team.is_readonly" type="submit" variant="primary" class="btn blue-bg"><b-spinner v-if="showloginspinner" small type="grow" class="mr-2"></b-spinner>Spara</b-button>             
            <b-button variant="danger" v-if="showcreateteam" class="" v-on:click="cancel_team()">Avbryt</b-button>
                <b-alert v-if="showerror" variant="warning" show class="mt-4 small form-text text-muted">Din e-post eller lösenord stämmer inte, försök igen eller återställ ditt lösenord.</b-alert>   
             </b-form>

                    
<hr>
<b-button @click="logoutPrompt" variant="warning">Logga ut</b-button>                
              </b-col>
             
            </b-row>

    </div>
  
  </div>

</template>

<script>
  import {tagsMixin} from '../mixins/tagsMixin';
  import Spinner from "./spinner/Spinner";
  import Suggestions from 'v-suggestions';
  import 'v-suggestions/dist/v-suggestions.css';
  //import Map from "./map/Map";  

  const simpleDDP = require("simpleddp");
  const simpleDDPLogin = require("simpleddp-plugin-login").simpleDDPLogin;
  
  let opts = {      
        endpoint: "wss://matchplay.meteorapp.com/websocket",
        SocketConstructor: WebSocket,
        reconnectInterval: 5000
    };
 
  export default {
    name: 'mymatchplay',
    components: {
      'c-spinner':Spinner,
      'suggestions':Suggestions    
      //'c-map':Map
    },
    watch:{
      '$route' (to, from){
        if (to.path != from.path) {
          this.myscheduleid = this.$route.params.id;
          this.getSchedule();
        }

      }
    },
    data () {
       let clubs = [];
       let countries = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'AndorrA', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, The Democratic Republic of the', 'Cook Islands', 'Costa Rica', 'Cote D\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island and Mcdonald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India'];
       return {      
        //TYPEAHEAD CLUBS
        query: '',
      countries: countries,
      clubs: clubs,
      selectedClub: null,
      options: {
        placeholder: 'Välj hemmaklubb för laget',
        inputClass: 'form-control'
      },
        //GENERAL
        loading: true,
        //LOGIN
        showlogin: false,
        showloginspinner: false,
        showerror: false,       
        //END       
        //TEAM       
        text: {
          paidteam: 'Laget är betalt',
          not_paidteam: 'Laget är INTE betalt'
        },
        showcreateteam: false,
        showteamslist: false,
        showcreateteamhelper: false, 
        showspinner_1: false,
        showspinner_2: false,
        showspinner_3: false,
        teamoptions: [
          { value: null, text: 'Vänligen välj ett alternativ' },
          { value: 'Company', text: 'Företag' },
          { value: 'Private', text: 'Privat' }
        ],
        team: {
          checkgolfidvariant2: 'primary',
          checkgolfidvariant3: 'primary',
          showplayer1: false,
          showplayer2: false,
          showplayer3: false,
          player_1_name: '',
          player_1_hcp: '',
          player_1_exists: false,
          player_2_name: '',         
          player_2_hcp: '',
          player_2_exists: false,
          player_3_name: '',         
          player_3_hcp: '',
          player_3_exists: false,
          is_readonly: true,     
          type: null,
          file: null,
          logo: null,
          company:'',
          teamname: '',
          clubid:'',
          teamnamecompany: '',
          teamleader: '',
          teamleadername: '',
          teammembername: '',
          teammembergolfid: '',
          teammemberemail: '',
          teamreservename: '',
          name:'',
          shirts:'',
          payment:'',
          paid:''
        },   
        //END
        userdetails: {
          userId: '',
          firstname: '',
          lastname: '',
          mobile: '',
          email: ''
        },
        form: {
          email: '',
          pwd: ''
        },        
        doctitle: 'Logga in'
      }
    },
    computed: {

    },
    created() {
     
    },
    mixins: [tagsMixin],
    methods: {
      
       uploadCloudinary: function() {

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
    .then(function(response) {		
		
		return response.json();
	})
    .then(function(data) {		
      //if (data.secure_url !== '') {
			if (data.public_id !== '') {				
        //var uploadedFileUrl = data.secure_url;
				//console.log(data);
				var uploadedFileUrl = data.public_id;				
       
        parentVue.team.logo = uploadedFileUrl;
			  //console.log(parentVue.team.logo)
				//console.log('file type=' + $scope.data.fileType)
				
			
				
	
				
      }
    })

    },
      getGolfClubs: function() {
          this.axios      
        .post(
            "https://matchplay.meteorapp.com/methods/getGolfclubs"         
        )
        .then(response => {         
          //console.log(response.data);
          this.clubs = response.data;

        })
        .catch(error => {
          //this.player_1_error = "Golfaren hittades inte... prova att skriva in golfid igen.";   
          console.log(error);
        });
      },
      onCountryInputChange (query) {
        if (query.trim().length === 0) {
          return null
        }
        //console.log(query)
        
        // return the matching countries as an array
        return this.clubs.filter((club) => {          
          return club.title.toLowerCase().includes(query.toLowerCase())
        })
      },
    onSearchItemSelected (item) {      
      this.selectedSearchItem = item.title;
      this.query = item.title;
      this.team.clubid = item._id;
    },
      
        register: function() {
               this.$router.push({ path: "/" });
               var element = this.$refs["register"];
               var top = element.offsetTop;
               window.scrollTo(0, top);
        },
        makeToast(message,variant) {        
          this.$bvToast.toast(message, {
            title: 'Meddelande',
            autoHideDelay: 5000,
            appendToast: true,
            variant:variant
          })
      },
      edit_team(eventObj) {
       //console.log(eventObj);

       this.team = eventObj;

       if (this.team.teamleader) {
          this.team.is_readonly=false;
          this.create_team('edit');
       } else {
          this.makeToast('Du är inte vald lagkapten till detta laget. Endast lagkaptenen kan redigera laget.','danger');
          this.team.is_readonly=true;
          this.create_team();
       }

       
      },
    create_team(action) {
      
      this.showcreateteamhelper = false;
      window.scrollTo(0,0);

      //load clubs to const
      this.getGolfClubs();
      //end

      if (action === 'new') {
        let userinfo = localStorage.getItem('userinfo');
        userinfo = JSON.parse(userinfo);
        this.team.is_readonly=false;
        //this.team = {};
        //this.team.type = 'Private' //remove later
        this.team.teamleadername = userinfo.golfid;
        this.team.teammembername = '780110-010' //remove later
        this.team.teamreservename = '780110-001' //remove later
      }
      this.showteamslist = false;
      this.showcreateteam = true;
    },
    cancel_team() {
      this.showcreateteam = false;
      this.showteamslist = true;
       window.scrollTo(0,0);
    },
    save_team(evt) {
        //alert(JSON.stringify(this.team));

                 this.axios.post('https://matchplay.meteorapp.com/methods/addTeam', {
                  "competition": "nyERPG5gcRJrjT3Wc",
                  "course": this.team.clubid,
                  "type": this.team.type,
                  "paid": false,
                  "teamleader": "asdfsf"            
                }
              )
              .then(response => {  
               console.log('save team',response.data)

                if (response.data.hasOwnProperty('error')) {
                  console.log("error")
                  return;
                }
               
               

                return;
              })
              .catch(error => {
                console.log(error);
              });
         window.scrollTo(0,0);
    },     
    login(evt) {      
      evt.preventDefault();         
      this.showloginspinner = true;


      //DDP LOGIN
      //const simpleDDP = require("simpleddp");
      //const simpleDDPLogin = require("simpleddp-plugin-login").simpleDDPLogin;

      const server = new simpleDDP(opts,[simpleDDPLogin]);

      let password = this.form.pwd;
      let email = this.form.email;
      let parentVue = this;
     
 
    // doAsyncOperation1() returns a promise.
trylogin()
.then(() => { 
   console.log('logged in with creds',server.token);      
   parentVue.showerror = false;
   localStorage.setItem('auth_token',server.token);
   parentVue.showlogin = false;
   parentVue.showloginspinner = false;
   parentVue.doctitle = 'My Matchplay';
   //Set params for user
         this.axios.post('https://matchplay.meteorapp.com/methods/getPlayerData', {
                  "id": server.userId                        
                }
              )
              .then(response => {  
               console.log('login',response.data)

                if (response.data.hasOwnProperty('error')) {
                  console.log("error")
                  return;
                }
               
                let userinfo = response.data;
                localStorage.setItem('userinfo',JSON.stringify(userinfo));               
                parentVue.setuserinfoform();

                return;
              })
              .catch(error => {
                console.log(error);
              });
   
})
.then((output) => {
  
})
.catch((err) => {  
  console.log(err)
   console.log('NOT logged in with creds, show error on form');

   parentVue.showerror = true;
   parentVue.showloginspinner = false;
});

    async function trylogin() { // (1)
      let response = await server.login(
        {
        password,
        user: {          
            email
        }
      }
      );   
    }


    },
    isloggedin: function() {

server.on('login',(m)=>{
  console.log('User logged in as', m);
});  

    },
    checkGolfID: function(golfid,target) {
      
      let userinfo = localStorage.getItem('userinfo');
      userinfo = JSON.parse(userinfo);
                
      if (golfid === '') return;
      if (!golfid.includes("-")) return;
      if (!golfid.length === 10) return;
      
      if (target === '2') {
        this.showspinner_2 = true;
        
        //Check if own golf id search, not accepted
        if (userinfo.golfid === golfid) {
           this.team.checkgolfidvariant2 = "warning";
           this.team.player_2_name = 'Du kan inte söka på ditt egna golf id.';
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
           this.team.player_3_name = 'Du kan inte söka på ditt egna golf id.'
           this.team.showplayer3 = true;
           this.showspinner_3 = false;
           return;
        }
              
      }

      this.axios      
        .post(
            "https://matchplay.meteorapp.com/methods/getPlayerByGolfid",
          //"https://colburn-chat-buxom-tamale.eu-gb.mybluemix.net/get_golfid?golfid=" + golfid,
          //"http://localhost:3000/get_golfid?golfid=" + golfid1 + '-' + golfid2,
          {          
              golfid: golfid            
          }
        )
        .then(response => {         
          //console.log(response);

          if (response.data.hasOwnProperty('notingit')) { 
           //console.log('tomt')
          } 

          if (!response.data.hasOwnProperty('notingit')) {  
          
          
          if (target === '2') {
          this.team.checkgolfidvariant2 = "primary";
          this.team.showplayer2 = true;    
          this.team.player_2_name = response.data.firstname + ' ' + response.data.lastname;
          this.team.player_2_hcp = response.data.hcp.replace(/,/g, '.');
          this.team.teammembergolfid = golfid;
          this.team.player_2_exists = response.data.exists;

          this.team.showplayer2 = true;
          this.showspinner_2 = false;          
          this.team.showplayer2 = true;
          }

          if (target === '3') {
          this.team.checkgolfidvariant3 = "primary";
          this.team.showplayer3 = true;    
          this.team.player_3_name = response.data.firstname + ' ' + response.data.lastname;
          this.team.player_3_hcp = response.data.hcp.replace(/,/g, '.');
          this.team.teamreservegolfid = golfid;
          this.team.player_3_exists = response.data.exists;

          this.team.showplayer3 = true;
          this.showspinner_3 = false;          
          this.team.showplayer3 = true;
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
          } else {
           
          if (target === '2') {
            this.team.checkgolfidvariant2 = "danger";
            this.team.player_2_name = 'Hittade inte spelaren';
            this.team.player_2_hcp = '';
            this.team.player_2_exists = true;          
            this.showspinner_2 = false;          
            this.team.showplayer2 = true;
          }
         
                    
          if (target === '3') {
            this.team.checkgolfidvariant3 = "danger";
            this.team.player_3_name = 'Hittade inte spelaren';
            this.team.player_3_hcp = '';
            this.team.player_3_exists =true;
            this.showspinner_3 = false;          
            this.team.showplayer3 = true;
          }
            
            //this.showAlert();
            //this.showloadgolfid = false;
            return;
          }

         

        })
        .catch(error => {
          //this.player_1_error = "Golfaren hittades inte... prova att skriva in golfid igen.";   
          console.log(error);
        });
    },
    logoutPrompt: function() {
      this.boxTwo = ''
        this.$bvModal.msgBoxConfirm('Vill du verkligen logga ut från Matchplay?', {
          title: 'Logga ut?',
          size: 'md',
          buttonSize: 'md',
          okVariant: 'danger',
          okTitle: 'Japp, jag är säker',
          cancelTitle: 'NEJ!',
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

    logout: function() {
      
      //console.log('inne logout')
      //const simpleDDP = require("simpleddp");
      //const simpleDDPLogin = require("simpleddp-plugin-login").simpleDDPLogin;
      
      const server = new simpleDDP(opts,[simpleDDPLogin]);
      let parentVue = this;

      localStorage.setItem('auth_token','');
      localStorage.setItem('userinfo','');

      async function trylogout() { // (1)
        let response = await server.logout(); // (2)
        //console.log(server);
        parentVue.doctitle = 'Logga in';
        parentVue.showlogin = true;
        parentVue.showloginspinner = false;
        parentVue.loading = false;

        
        parentVue.makeToast('Du är nu utloggad.','primary');
        this.$username = 'Logga in';
        
        window.scrollTo(0,0);

      }

      trylogout();

      server.on('logout',()=>{
        console.log('User logged out');
      });
      
    },
    setuserinfoform: function() {
      //console.log('set userinfo form');

    let userinfo = localStorage.getItem('userinfo');
    if (userinfo) {
      //console.log('found ls')
      try {
        //SET KEYS in form        
        userinfo = JSON.parse(userinfo);
        //console.log(userinfo)
        this.userdetails.firstname = userinfo.firstname;

        this.$username = this.userdetails.firstname;
       // console.log(this.$username)

        //check if user has teams or not
        if (userinfo.teams) {
          //console.log('show teams for user: ',userinfo.teams)
          this.showteamslist = true;
          this.showcreateteamhelper = false;
          this.teams = userinfo.teams;
        } else {
          console.log('no teams')
          this.teams = {};
          this.showcreateteamhelper = true;
          this.showteamslist = false;
        }
        //end check teams

         this.loading = false;
       
                
      } catch(e) {
        console.log('error')
      //something went wrong, maybe the token is too old or not valid
      }
    } else {
      console.log('NOT logged in with token, show form')
      this.showlogin = true;
    }
      
      
     
            
      //console.log(Object.keys(jsonObj));  // returns ["person", "age"]
      //this.userdetails.firstName = myJsonString.firstName;
    }
    },

    updated: function() {
    },

mounted: function() {

    const server = new simpleDDP(opts,[simpleDDPLogin]);   
    let parentVue = this;

    let auth_token = localStorage.getItem('auth_token');

    if (auth_token) {    
    trylogin()
    .then(() => { 
      //console.log('logged in with token in local storage',server.token);      
      parentVue.doctitle = 'My Matchplay';            

          this.axios.post('https://matchplay.meteorapp.com/methods/getPlayerData', {
                  "id": server.userId                        
                }
              )
              .then(response => {  
              // console.log('mounted',response.data)

                if (response.data.hasOwnProperty('error')) {
                  console.log("error")
                  return;
                }
               
                let userinfo = response.data;
                localStorage.setItem('userinfo',JSON.stringify(userinfo));               
                parentVue.setuserinfoform();

                return;
              })
              .catch(error => {
                console.log(error);
              });

          
    })
    .then((output) => {
      
    })
    .catch((err) => {  
      console.log('NOT logged in with creds, show error on form')
        this.showlogin = true;
    });
    } else {
      this.showlogin = true;
      this.loading = false;
    }

// doAsyncOperation1() returns a promise.


    async function trylogin() { // (1)
      let response = await server.login({resume:auth_token}); // (2)  
    }

}   
    
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.file-input ~ .file-label::after {
  content: 'Välj fil';
}

.help {
  margin-left:0.5em;
  vertical-align: text-bottom;
}

 .team h4 {
   font-size:1.2em;
   min-height:50px;
 }

  .team {
    cursor: pointer;
    font-size:0.9em;
  }

  .team i {
    vertical-align: bottom;
  }

  .sessions-container.my-schedule .row.session {
    display: none !important;
  }
  .sessions-container.my-schedule .row.session {
    opacity: 0.3;
  }
  .sessions-container.my-schedule .row.session.active {
    display:flex !important;
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

</style>
