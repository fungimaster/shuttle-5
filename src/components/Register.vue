<template>
  <b-container class ref="register">
    <b-row class="justify-content-center" align-h="center">
      <b-col md="8" id="register" class="mt-4 mt-md-5">
        <h2 class="teaser-header orange">Anmäl dig som spelare</h2>
        <b-alert !show
          variant="warning small form-text text-muted mb-4"
        >Denna efterhandsregistrering är bara till för spelare som redan är med som lagmedlem i ett lag men som inte har kopplats till ett lag. Efter din registrering kommer du kopplas till rätt lag (baserat på ditt golf-id).</b-alert>
          <p v-if="this.player==='player2' && !closed" class="mb-4">
              Din kompis
              <span v-if="captain" style="font-weight:bold;color:green;">{{captain}}</span> har skapat ett lag i tävlingen och för att
              <strong>göra laget komplett</strong> behöver du registrera dig som spelare här på matchplay! Följ instruktionerna nedan.
            </p>           
        <h2
          class="hidden teaser-header orange"
        >Det är klart du vill vara med i golftävlingen, registrera dig här!</h2>

        <b-row hidden class="mb-2 mt-3">
          <b-col v-if="this.player==='player1'">
            <p>Registreringen består av 4 enkla steg:</p>
            <div v-bind:class="{ stepsuccess: step == 'step1' }">1. Skriv in ditt Golf-ID</div>
            <div v-bind:class="{ stepsuccess: step == 'step2' }">2. Registrera dig som spelare</div>
            <div
              v-bind:class="{ stepsuccess: step == 'step3' }"
            >3. Skapa ditt lag och välj medspelare</div>
            <div v-bind:class="{ stepsuccess: step == 'step4' }">4. Betala (swish/faktura/voucher)</div>
            <hr />

            <b-alert v-if="isAuthenticated" show class="mt-4 small" variant="warning">
              <p>
                Du är redan inloggad och behöver inte skapa ett nytt konto,
               <router-link v-if="isAuthenticated" to="/mymatchplay">                
                Klicka här</router-link> för att hantera ditt lag eller skapa ett nytt.
              </p>
            </b-alert>
          </b-col>

          <b-col v-if="this.player==='player2'">
            <p>
              Din kompis
              <span v-if="captain" style="font-weight:bold;color:green;">{{captain}}</span> har skapat ett lag i tävlingen och för att
              <strong>göra laget komplett</strong> behöver du registrera dig som spelare här på matchplay! Följ instruktionerna nedan.
            </p>
            <hr />
          </b-col>
        </b-row>

        <b-row class="mb-3 mt-0">

          <b-col md="12" class="teaser-content" ref="success" id="success">

            <h5 v-if="showqualified" class="mt-0 mb-4">
              Ditt HCP är under 36 och du kan vara med i tävlingen
            </h5>

            <h5 v-if="showqualified32" class="mt-1 mb-4">
              Ditt HCP är under 36 och du kan vara med i tävlingen.
            </h5>

       
            <b-alert v-if="showqualified32" show class="mt-4 small" variant="warning">
              <h5 class="alert-heading text-dark">Information om HCP reducering</h5>
              <p class="text-dark">Ditt HCP är över 20 och därför vill vi påminna om att högsta HCP i matchspel är 28.0. Skulle ditt lag gemensamt få ett högre HCP än 28.0, kommer spelarna i laget dela på reduceringen. Varmt välkommen till Sveriges roligaste golfturnering!</p>
            </b-alert>

            <h5
              v-if="showqualifiedNOT"
              class="mt-3 mb-4"
            >Tyvärr kan du inte vara med i tävlingen, man måste ha 36 eller lägre...</h5>

            <h5
              v-if="showqualifiedNOCLUB"
              class="mt-3 mb-4"
            >Du verkar inte ha någon klubbtillhörighet, kontakta oss gärna om det inte stämmer!</h5>

            <div class="form-group" v-if="showform1">
              <b-row class="pt-4 pb-4">
                <b-col xs="12" sm="12" class>
                  <h4>Skriv in ditt Golf-ID</h4>
                  <p>Börja med att ange ditt Golf-ID så kontrollerar vi det mot Svenska Golfförbundet.</p>
                  <b-alert
                    hidden
                    show
                    variant="danger"
                  >Vi har just nu problem med kopplingen till GIT men jobbar på en lösning, prova igen lite senare!</b-alert>
                </b-col>
              </b-row>

              <b-form
                inline
                @submit.stop.prevent
                @submit="getGolfId"
                @reset="onReset"
                v-if="showform1"
              >
                <b-input
                  :state="validation"
                  v-model="golfid"
                  inputmode="numeric"
                  pattern="[- +()0-9]+"
                  type="text"
                  size="lg"
                  style="width:200px;"
                  class="form-control mr-1"
                  id="golfid"
                  placeholder="xxxxxx-xxx"
                ></b-input>

                <b-button
                  type="submit"
                  size="md"
                  variant="primary"
                  class="btn blue-bg btn-special ml-0 mt-1 ml-sm-2 mt-sm-0"
                >
                  <b-spinner v-if="showloadgolfid" small type="grow" class="mr-2"></b-spinner>
                  {{ contbutton1 }}                  
                </b-button>
                
                <b-form-invalid-feedback
                  :state="validation"
                  v-if="showhelper"
                >Ange ditt Golf-ID med de 6 första siffrorna i ditt personnummer och sedan 3 siffror efter bindestrecket.</b-form-invalid-feedback>
                <b-form-valid-feedback :state="validation" v-if="showhelper">Ser bra ut!</b-form-valid-feedback>
                <button
                  type="submit"
                  v-on:click="getGolfId()"
                  class="hidden btn blue-bg mt-1"
                >{{ contbutton1 }}</button>
              </b-form>

              <b-alert
                class="mt-4 small form-text text-muted"
                :show="dismissCountDown2"
                variant="warning"
              >
                <p
                  v-if="this.player==='player1'"
                >Du finns redan med i Matchplay som en registrerad spelare. Logga in på knappen nedan för att skapa ett lag för Matchplay 2022!</p>
                <p
                  v-if="this.player==='player2'"
                >Du finns redan med i Matchplay som en registrerad spelare. Logga in på knappen nedan för att ansluta till ett skapat lag!</p>
                <a href="/mymatchplay" class="btn blue-bg text-white mb-3">Logga in</a>
              </b-alert>

              <b-alert
                class="mt-4 small form-text text-muted"
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
  
<hr class="mt-5" />
              <testimonials :number=5 :register=false></testimonials>
            </div>

            <div>
              <b-form @submit="onSubmit" @reset="onReset" v-if="showform2">
                <b-form-group
                  id="input-group-1"
                  label="Ditt Golf-ID"
                  label-for="input-1"
                  label-cols="12"
                  label-cols-lg="2"
                  label-size="sm"
                  class="mb-1"
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
                  label-cols="12"
                  label-cols-lg="2"
                  label-size="sm"
                  class="mb-1"
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
                  label-cols="12"
                  label-cols-lg="2"
                  label-size="sm"
                  class="mb-1"
                >
                  <b-form-input id="lastname" v-model="form.lastname" type="text" required readonly></b-form-input>
                </b-form-group>
                <b-form-group hidden
                  id="input-group-1"
                  label="Medlemsklubb"
                  label-for="input-1"
                  label-cols="12"
                  label-cols-lg="2"
                  label-size="sm"
                >
                  <b-form-input id="club" v-model="form.club" type="text" required readonly></b-form-input>
                </b-form-group>
                <b-form-group
                  hidden
                  id="input-group-1"
                  label="Ditt HCP"
                  label-for="input-1"
                  label-cols="12"
                  label-cols-lg="2"
                  label-size="sm"
                >
                  <b-form-input id="hcp" v-model="form.hcp" type="text" required readonly></b-form-input>
                </b-form-group>
                <hr>
                <!-- <b-form-group  
                  id="input-group-1"
                  label="E-post"
                  label-for="input-1"
                  label-cols="12"
                  label-cols-lg="2"
                  label-size="sm"
                  class="mb-1"
                  >

                 <b-input-group>
                  <b-form-input id="hcp" v-model="form.email" type="text" required readonly></b-form-input>
                  <b-input-group-append>
                    <b-button variant="warning" @click="editEmail = true, form.email = ''"><i class="fas fa-pen"></i></b-button>
                  </b-input-group-append>
                </b-input-group> 
                </b-form-group> -->

                <!-- <b-form-group
                  v-if="!editMobile"
                  id="input-group-1"
                  label="Mobil"
                  label-for="input-1"
                  label-cols="12"
                  label-cols-lg="2"
                  label-size="sm"
                  class="mb-1"
                >
                <b-input-group>
                  <b-form-input id="hcp" v-model="form.mobile" type="text" required readonly></b-form-input>
                   <b-input-group-append>
                    <b-button variant="warning" @click="editMobile = true, form.mobile = ''"><i class="fas fa-pen"></i></b-button>
                  </b-input-group-append>
                </b-input-group>  
                </b-form-group> -->

                <hr class="mt-3 mb-3">

                <b-row v-if="docontinue">
                  <b-col lg="12">
                    <b-alert
                      hidden
                      v-if="docontinue"
                      show
                      class="mt-4 small"
                      variant="primary"
                    >När registreringen är genomförd väljer du att skapa ett lag eller så blir du ihopkopplad med ett befintligt lag där du har blivit vald som lagmedlem.</b-alert>
                    <b-alert
                      hidden
                      show
                      class="mt-4 mb-4 small"
                      variant="primary"
                    >Vi behöver veta lite mer om dig innan du kan gå vidare med registrerigen, vänligen fyll i informationen nedan.</b-alert>
                  </b-col>
                  <b-col class="col-12 col-md-12">
                    <b-form-group
                      id="input-group-mobile"
                      label="Mobilnr"
                      label-for="input-1-mobile"
                      label-cols="12"
                      label-cols-lg="2"
                      label-size="sm"
                      class="mb-1"
                    >
                      <vue-tel-input v-model="form.mobile" v-bind="bindProps"></vue-tel-input>
                    </b-form-group>
                    <b-form-group  
                      id="input-group-1" 
                      label="E-post" 
                      label-for="input-1"
                      label-cols="12"
                      label-cols-lg="2"
                      label-size="sm"
                      class="mb-1"
                      >
                        <b-form-input
                          id="input-1"
                          v-model="form.email"
                          :state="validateEmail"
                          type="email"
                          required
                          placeholder="Skriv din e-postadress"
                        ></b-form-input>
                    </b-form-group>

                    
                    <b-form-group 
                      id="input-group-2" 
                      label="Välj lösenord" 
                      label-for="input-1"
                      label-cols="12"
                      label-cols-lg="2"
                      label-size="sm"
                      class="mb-1"
                      >
                      <b-form-input
                        :state="validatePassword1"
                        v-model="form.password"
                        type="password"
                        required
                        placeholder="Skapa ett lösenord"
                      ></b-form-input>
                      <b-form-invalid-feedback :state="validatePassword1">Krav på minst 8 tecken</b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group
                      id="input-group-3"
                      label="Upprepa lösenordet"
                      label-for="input-1"
                      label-cols="12"
                      label-cols-lg="2"
                      label-size="sm"
                    >
                      <b-form-input
                        :state="validatePassword2"
                        v-model="form.password2"
                        type="password"
                        required
                        placeholder="Återupprepa lösenord"
                      ></b-form-input>
                      <b-form-invalid-feedback :state="validatePassword2">Lösenorden stämmer inte...</b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                 
                </b-row>
                <b-row>
                  <b-col>
                    <b-alert
                      show
                      v-if="showerror"
                      class="mt-4 small"
                      variant="danger"
                    >Det finns redan en användare med denna e-post ({{emailexist}}), om du redan är registrerad kan du logga in uppe till höger, där kan du också få ett nytt lösenord om du har glömt ditt befintliga.</b-alert>
                    <b-button
                      v-if="docontinue"
                      :disabled="showspinnerregisteruser"
                      type="submit"
                      variant="primary"
                      class="btn blue-bg ml-1"
                    >
                      <b-spinner v-if="showspinnerregisteruser" small type="grow" class="mr-2"></b-spinner>Registrera dig
                    </b-button>
                    <b-button type="reset" variant="danger" @click="editMobile = false, editEmail = false">Avbryt</b-button>
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
      </b-col>
    </b-row>
  </b-container>
</template>



<script>
import { mapGetters } from "vuex";
import { tagsMixin } from "../mixins/tagsMixin";
/*import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';*/
import { VueTelInput } from 'vue-tel-input'
import { globalState } from "../main.js";
import Testimonials from "./Testimonials";


export default {
  name: "hello",
components: {   
      //'phone':VuePhoneNumberInput,
     // 'phone':VueTelInput,
      VueTelInput,Testimonials
      },
  data() {
    return {

      //PRICE

      closed: globalState.closed,
   
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
      referral: null,
      captain:'',
      invitegolfid:'',
      player: 'player1',
      step: 'step1',
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
        firstname_hidden: "",
        lastname: "",
        lastname_hidden: "",
        hcp: "",
        club: "",
        email:"",
        email_hidden:"",
        password:"",
        password2:""
      },

      showform1: true,
      showform2:false, //should be default false
      showqualified: false,
      showqualified32: false,
      showqualifiedNOT: false,
      showqualifiedNOCLUB: false,
      editEmail:false,
      editMobile:false
    };
  },
   
  computed: {
    ...mapGetters([      
      "isAuthenticated"
      ]),
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
      


      },      
      validateEmail() {
         
         if (this.form.email.length < 4) {
           return;
         }

         var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return re.test(String(this.form.email_hidden).toLowerCase());
         
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
  created() {
        if (this.$route.query.referral) {
          this.referral = this.$route.query.referral;
        } 

    },
  mounted: function () {
              if (this.$route.query.player) {
                if (this.$route.query.player === 'player2') {
                  this.player = this.$route.query.player;
                }
              }

              if (this.$route.query.captain) {                
                  this.captain = this.$route.query.captain;                
              }

              if (this.$route.query.golfid) {                
                  this.golfid = this.$route.query.golfid;

              }

              
  },
 
  methods: {    
   
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
      this.contbutton1 = 'Vänta';    
      this.dismissCountDown2 = false; //hide you exist alert
      this.showloadgolfid = true;
      this.axios      
        .post( globalState.admin_url + "getPlayerByGolfid", {"golfid": this.golfid})
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

          var xlen = '*';         
          for (var i = 0; i < response.data.firstname.length-3; i++) {
            xlen += '*'
          }

          this.form.firstname = response.data.firstname.substring(0, 2) + xlen;

          xlen = '*';         
          for (var i = 0; i < response.data.lastname.length-3; i++) {
            xlen += '*'
          }
          
          this.form.lastname = response.data.lastname.substring(0, 2) + xlen;


          // xlen = '*';
          // let email = response.data.email
          // for (var i = 0; i < email.length-10; i++) {
          //   xlen += '*'
          // }
          // let emailEnding = email.substring(email.length -6)
          // this.form.email = response.data.email.substring(0, 4) + xlen + emailEnding

          // xlen = '*';
          // let phone = response.data.phone
          // for (var i = 0; i < phone.length-9; i++) {
          //   xlen += '*'
          // }
          // let phoneEnding = phone.substring(phone.length -3)
          // this.form.mobile = response.data.phone.substring(0, 4) + xlen + phoneEnding



          
          
          this.form.firstname_hidden = response.data.firstname;
          this.form.lastname_hidden = response.data.lastname;
          

          this.form.email_hidden = response.data.email;
          this.form.club = response.data.club;
          //this.form.hcp = response.data.hcp;
          this.form.hcp = response.data.hcp.replace(/,/g, '.')

          if (response.data.club == 'empty') {
             this.showqualifiedNOCLUB = true;
             return;
          }

          //var element = this.$refs["success"];
          //var top = element.offsetTop;         
          //window.scrollTo(0,400);
          
//console.log(this.form.hcp)
          if (this.form.hcp < 28.1) {
              this.showqualified = true;
              this.step = 'step2';
              this.docontinue = true;
          } else if (this.form.hcp > 20 && this.form.hcp < 36.1 ) {
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
          this.axios.post(globalState.admin_url + 'userAdd', {           
              //ID: 12345              
              "emails": [
                  {
                      "address": this.form.email
                  }
              ],
              "password": this.form.password,
              "firstname": this.form.firstname_hidden,
              "lastname": this.form.lastname_hidden,                              
              "golfid": this.form.golfid,
              "mobile": this.form.mobile,
              "referral_id": this.referral,
              "hcp": this.form.hcp
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
   localStorage.setItem('userId',server.userId);
   //parentVue.showlogin = false;
   //parentVue.showloginspinner = false;
   //parentVue.doctitle = 'Inloggad';
   //Set params for user
   let userinfo = server.collections.users[0].profile;
   localStorage.setItem('userinfo',JSON.stringify(userinfo));
   this.showspinnerregisteruser = false;
   this.$router.push({ path: "/mymatchplay" });
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
      this.step = 'step1';
      this.$nextTick(() => {
        this.show = true;
      });

      //scroll to correct place on page      p
      var element = this.$refs["register"];
      var top = element.offsetTop;
      window.scrollTo(0, top);
      

    }
  },

};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/variables.scss";

.stepsuccess {
  background: $green-light;
}

img {
  max-width: 100%;
}

@media (max-width: 576px) {
  h2 {
    font-size: 1.2em !important;
  }

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
