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
            <p
              class
            >Matchplay är en matchspelstävling för par med officiellt handikapp. Par kan vara män, kvinnor eller mix. Tävlingen spelas i Sverige på golfklubbar anslutna till Svenska Golfförbundet.</p>
            
             <b-alert show class="mt-4 small" variant="warning">
                Anmälan för 2020 års tävling öppnar i mitten av december 2019, håll utkik här på sidan för mer info!
                <!-- håll koll via <a href="https://www.facebook.com/pg/matchplaybusines" target="_blank">Facebook</a> och <a href="https://www.instagram.com/matchplaybusiness/" target="_blank">Instagram</a> -->
             </b-alert>
                       
            <div class=" hidden buttons text-left">
              <a href="#register" class="btn blue-bg btn-lg text-white mb-3">Anmäl ditt lag</a>
              <a href="/login" class="btn blue-bg btn-lg text-white mb-3">Hantera ditt lag här</a>
            </div>
          </b-col>
          <b-col class="col-md-3 d-none d-md-block pl-5 justify-content-center align-self-center">
            <img src="https://res.cloudinary.com/dn3hzwewp/image/upload/e_colorize,co_rgb:fff/v1573118127/matchplay/matchplay-new-logo-2020.png" alt="">
          </b-col>
        </b-row>
      </b-container>
    </div>
<!-- TEMP HIDDEN -->   
    <div class="teaser-container" id="register">
      <b-container>
        <b-row>
         
          <b-col>
            <h2 class="hidden teaser-header orange">Anmäl ditt lag här!</h2>
            <h2 class="teaser-header orange">Tills registreringen öppnar kan du kolla om du är kvalificerad att delta i tälvlingen</h2>
            <b-row class="mb-3 mt-3">
              <b-col md="12" class="teaser-content">
                  <h3 v-if="showqualified" class="mt-3 mb-4">
                    Grattis, du kan vara med i tävlingen <i class="material-icons">tag_faces</i>
                  </h3>

                   <h3 v-if="showqualified32" class="mt-3 mb-4">
                    Grattis, du kan vara med i tävlingen men ditt handicap kommer räknas som 32 <i class="material-icons">tag_faces</i>
                  </h3>

                  <h3 v-if="showqualifiedNOT" class="mt-3 mb-4">
                    Tyvärr kan du inte vara med i tävlingen, man måste ha 36 eller lägre...
                  </h3>

                   <h3 v-if="showqualifiedNOCLUB" class="mt-3 mb-4">
                    Du verkar inte ha någon klubbtillhörighet, kontakta oss gärna om det inte stämmer!
                  </h3>

                <div class="form-group" v-if="showform1">
                  <b-row class="mb-2">
                    <b-col xs="12" sm="12">
                      <p>Börja med att ange ditt golf id så hämtar vi en del av informationen automatiskt från Svenska Golfförbundet.</p>
                    </b-col>
                  </b-row>

               <b-form inline @submit.stop.prevent @submit="getGolfId" @reset="onReset" v-if="showform1">
                  <b-input :state="validation" v-model="golfid1"
                    inputmode="numeric"
                    pattern="[0-9]*"
                    type="text"
                    style="width:140px;"
                    class="form-control mr-1"
                    id="golfid1"
                    placeholder="xxxxxx"
                    value
                  />                              
                  -
                  <b-input :state="validation2" v-model="golfid2"
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
                  <b-button type="submit" variant="primary" class="btn blue-bg ml-0 mt-1 ml-sm-2 mt-sm-0"><b-spinner v-if="showloadgolfid" small type="grow" class="mr-2"></b-spinner>{{ contbutton1 }}
                    
                  </b-button>
                  
                   <b-form-invalid-feedback :state="validation" v-if="showhelper">
        Ange ditt Golf ID med de 6 första siffrorna i ditt personnummer och sedan 3 siffror efter bindestrecket.
      </b-form-invalid-feedback>      
       <b-form-valid-feedback :state="validation" v-if="showhelper">
        Ser bra ut!
      </b-form-valid-feedback>
                  <button type="submit" v-on:click="getGolfId()" class="hidden btn blue-bg mt-1">{{ contbutton1 }}</button>
                </b-form> 
                <b-alert class="mt-4 small form-text text-muted"
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p>Vi kunde tyvärr inte hitta ditt Golf ID hos Svenska Golfförbundet, var vänlig försök igen.</p>
      <b-progress
        variant="warning"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>                
                   <b-alert show class="mt-4 small form-text text-muted">Saknar du ditt golfid ber vi dig kontakta din hemmaklubb för hjälp. OBS! Vi sparar inga uppgifter genom att fortsätta.</b-alert>                  
                   
                </div>

                <div>
                  <b-form @submit="onSubmit" @reset="onReset" v-if="showform2">
                    <b-form-group
                      id="input-group-1"
                      label="Ditt Golf ID"
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

                    <b-form-group hidden
                      id="input-group-3"
                      label="Välj hemmaklubb för matcher"
                      label-for="input-3"
                      label-cols="4"
                      label-cols-lg="2"
                      label-size="sm"
                    >
                      <b-form-select id="input-3" v-model="form.food" :options="foods" required></b-form-select>
                    </b-form-group>

 <b-form-group hidden
                      id="input-group-1"
                      label="Ange ett lösenord för att hantera din användare"
                      label-for="input-1"
                      label-cols="6"
                      label-cols-lg="4"
                      label-size="sm"
                    >
                      <b-form-input id="pwd" v-model="form.hcp" type="password" required></b-form-input>
                                      <b-form-text id="password-help-block">
      Your password must be 8-20 characters long, contain letters and numbers, and must not
      contain spaces, special characters, or emoji.
    </b-form-text>
                    </b-form-group>
   
                    <b-button hidden type="submit" variant="primary" class="btn blue-bg ml-1">Fortsätt till betalning</b-button>
                    <b-button type="reset" variant="danger">Sök igen</b-button>
                  </b-form>
                  <b-card class="mt-3 hidden" header="Form Data Result">
                    <pre class="m-0">{{ form }}</pre>
                  </b-card>
                </div>

                <div class="hidden" id="golfid_result" style="margin-top:20px;"></div>
              </b-col>
            </b-row>

            <b-row class="hidden mb-5 mt-5">
              <b-col md="6" class="teaser-content">
                <h3 class="orange">Connect</h3>
                <p>Social media keeps you connected to your peers. However, there’s no substitution for meeting IRL.</p>
                <p>With 1200 participants, which conversation will you jump in?</p>
              </b-col>
              <b-col md="6" class="teaser-content">
                <img
                  src="https://res.cloudinary.com/dn3hzwewp/image/upload/f_auto,w_510/v1572940143/matchplay/matchplay_bg.jpg"
                />
              </b-col>
            </b-row>
          </b-col>
          <b-col xl="1"></b-col>
        </b-row>
      </b-container>
    </div>

<div class="teaser-container hidden" id="teaser1">
 
 

  <b-container>
<b-row>
   
   <b-col class="mb-3">
<h2 class="teaser-header orange">TÄVLINGSINFORMATION</h2>
   </b-col>
</b-row>

<b-row>
   
  

    <b-col md="5">
       <img src="https://res.cloudinary.com/dn3hzwewp/image/upload/v1573661281/matchplay/henke-granen.png">
    </b-col>
    <b-col md="7">
       <p class="mt-4 mt-md-0">
         2020 är året då Matchplay utvecklas digitalt och går ifrån den tradionella regionsindelningen och istället görs lottningen med hänsyn till avstånd så att alla i varje omgång får möta ett lag som är närmast geografiskt. 2020 är också tävlingen ihopslagen med Matchplay Business så privatpersoner och företag spelar tillsammans. Priset för ett lag med privatpersoner är 900:- och för företag kostar det 2900:-. Det finns även möjlighet att lägga till olika sponsorpaket för synbarhet och marknadsföring under tävlingen.
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
import { tagsMixin } from "../mixins/tagsMixin";

export default {
  name: "hello",
  data() {
    return {
      showhelper: false,
      //contbutton1: 'Fortsätt till nästa steg',
      contbutton1 : 'Kvalificerad?',
      showloadgolfid: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      golfid1: '',
      golfid2: '',
      doctitle: this.$store.state.conferencename,
      form: {
        golfid: "",
        firstname: "",
        lastname: "",
        hcp: "",
        club: "",
        food: null,
        checked: []
      },
      foods: [
        { text: "Select One", value: null },
        "Carrots",
        "Beans",
        "Tomatoes",
        "Corn"
      ],
      showform1: true,
      showform2: false,
      showqualified: false,
      showqualified32: false,
      showqualifiedNOT: false,
      showqualifiedNOCLUB: false
    };
  },
  computed: {
      validation() {
        if (this.golfid1.length === 6) {
          this.$refs.golfid2.$el.focus()
        }
        return this.golfid1.length === 6;
        //return this.golfid1.length === 6 && this.golfid2.length === 3;
      },
       validation2() {        
        return this.golfid2.length === 3;
      }
    },
  mixins: [tagsMixin],
  methods: {
     countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      },
    goRouter: function() {
      this.$router.push({ path: "line-up" });
    },
    getGolfId: function(golfid) {      
      //evt.preventDefault();
      var golfid1 = document.getElementById("golfid1").value;
      var golfid2 = document.getElementById("golfid2").value;
      if (golfid1 === '' || golfid2 === '') return;
      this.contbutton1 = 'Hämtar data från SGF';     
      this.showloadgolfid = true;
      this.axios      
        .get(
          "https://colburn-chat-buxom-tamale.eu-gb.mybluemix.net/get_golfid?golfid=" + golfid1 + '-' + golfid2,
          //"http://localhost:3000/get_golfid?golfid=" + golfid1 + '-' + golfid2,
          {
            params: {
              //ID: 12345
            }
          }
        )
        .then(response => {         
          //console.log(response.data);         

          if (response.data != 'error') {  
            
          this.showform1 = false;
          this.showform2 = true;
          this.form.golfid = golfid1+'-'+golfid2;
          this.form.firstname = response.data.firstname;
          this.form.lastname = response.data.lastname;
          this.form.club = response.data.club;
          //this.form.hcp = response.data.hcp;
          this.form.hcp = response.data.hcp.replace(/,/g, '.')

          if (response.data.club == 'empty') {
             this.showqualifiedNOCLUB = true;
             return;
          }
          
//console.log(this.form.hcp)
          if (this.form.hcp < 32) {
              this.showqualified = true;
          } else if (this.form.hcp > 32 && this.form.hcp < 36.1 ) {
              this.showqualified32 = true;
          } else if (this.form.hcp > 36.0) {
               this.showqualifiedNOT = true;
          }

          this.showloadgolfid = false;
          
          //this.contbutton1 = 'Fortsätt till nästa steg';
          this.contbutton1 = 'Kvalificerad?';
          return;
          } else {
            //console.log('empty');
            this.showAlert();
            this.showloadgolfid = false;
            return;
          }
        })
        .catch(error => {          
          console.log(error);
        });
    },
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      this.showform1 = true;
      this.showform2 = false;
      this.showqualified = false;
      this.showqualified32 = false;
      this.showqualifiedNOT = false;
      this.showqualifiedNOCLUB = false;  
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];      
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/variables.scss";

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

.hero {
  background: url(
    https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_2390/v1572963227/matchplay/c640cf_76573b7e69c04dc2bb0592399d738a17_mv2_d_4006_3000_s_4_2.jpg
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
  padding: 6rem 0 0 0;
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
</style>
