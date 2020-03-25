<template>
  <div>   
    <b-container class="sponsors">
       <hr class="mb-5">
       
      <b-row>
       
        <b-col>
          <b-row>
            <b-col>
              <h2>Partners</h2>
            </b-col>
          </b-row>

          <b-row no-gutters>
            <b-col md="4" class="gold p-5 text-center">
              <a href="https://futureitpartner.se/" target="_blank">
                <img src="https://res.cloudinary.com/dn3hzwewp/image/upload/v1573315610/matchplay/future_logo.png" alt="">
              </a>
            </b-col>           
            <b-col md="4" class="gold p-2 pt-5 text-center">
              <a href="https://colburn.se" target="_blank">
                <img src="https://res.cloudinary.com/dn3hzwewp/image/upload/v1573315623/matchplay/Logo_Colburn.png" alt="">
              </a>
            </b-col>
             <b-col md="4" class="gold p-5 mt-2 text-center">
              <a href="https://eu.ping.com/sv-se"  target="_blank">
                <b-img alt="ping" src="https://res.cloudinary.com/dn3hzwewp/image/upload/v1575464479/matchplay/ping/logo.svg"></b-img>
              </a>
            </b-col>
            
             

 

          </b-row>
          
        </b-col>
        <b-col xl="1"></b-col>
      </b-row>
    </b-container>

    <footer class="text-center text-white">
      <cookie-law theme="matchplay"
      buttonText='OKEJ'  
      buttonClass="Cookie--matchplay"            
      >
       <div slot="message">
    Denna site använder cookies för att förbättra din användarupplevelse. <router-link to="cookies">Läs mer om cookies här.</router-link>
  </div>
      </cookie-law>
      <b-container fluid class="theme-description">
        <b-row>
          <b-col xl="2" class="left">
          </b-col>
          <b-col>
            <b-container>
              <b-row>
                <b-col xl="2"></b-col>
                <b-col>
                  <h3>Matchplay Sweden</h3>                 
                  <div class="hidden newsletter mt-3 mb-5">
                    
                  </div>
                  <br>
                  <p class="hidden">Matchplay AB</p>
                  <p>Ängelholm</p>                  
                  <p>Telefon: 010 - 522 00 07</p>
                  <p class="links mb-5">
                    <router-link to="/ping" class="">PING</router-link> |  
                    <router-link to="/info" class="">Om tävlingen</router-link> |  
                    <router-link to="/cookies" class="">Cookies/Data</router-link>                 
                  </p>
                </b-col>
                <b-col xl="2"></b-col>
              </b-row>
            </b-container>
          </b-col>

          <b-col xl="2" class="right">
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>

<script>
 import CookieLaw from 'vue-cookie-law'
  export default {    
    name: 'footer',
    components: { CookieLaw },
    data () {
      return {
        email2: '',
        reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      }
    },
    methods: {
      isEmailValid: function() {
        return (this.email2 == "")? "" : (this.reg.test(this.email2)) ? 'has-success' : 'has-error';
      }
    },
    updated: function() {
    },
    mounted:function(){

    },
    beforeMount: function() {
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../styles/variables.scss";
  .sponsors {
    margin-top: 6rem;
    margin-bottom: 6rem;
  }
  .sponsors .silver{
    max-width: 50%;
  }
  .sponsors img {
    max-width: 100%;
    max-height: 110px;
  }
  .sponsors h2 {
    color: $orange;
  }
  .sponsors a{
    
    border: 0px solid #fff;
    display: block;
  }
  footer {
    margin-top: 12rem;
    padding: 10rem 0 0 0;
    background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,q_69,w_1207/v1572942209/matchplay/c640cf_402261724c71433c9662662c3114e5b8_mv2_d_4500_3000_s_4_2.png);
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;
    @media (max-width: 576px) {
      margin-top: 6rem;
      padding: 5rem 0 2rem 0;
    }
  }
  footer h2, footer h3 {
    text-transform: uppercase;
    margin: 0;
  }
  footer h2 {
    font-size: 2.7rem;
    margin-bottom: 30px;
    @media (max-width: 767px) {
      font-size: 2rem;
      margin-bottom: 10px;
    }
    @media (max-width: 576px) {
      font-size: 1.7rem;
    }
  }
  footer h3 {
    font-size: 2rem;
    @media (max-width: 767px) {
      font-size: 1.4rem;
    }
    @media (max-width: 576px) {
      font-size: 1.1rem;
    }
  }
  footer p {
    font-weight: bold;
  }
  footer p.links {
    margin-top: 80px;;
  }
  footer .middle{
    padding: 120px 0;
    color: #fff;
  }
  footer .newsletter {
    width: 100%;
    display: inline-block;
  }
  footer .left {
    
  }
  footer .right {
    
  }
  footer .links a {
    color: #fff !important;
    font-size: 1rem
  }

 //cookiebanner
 .Cookie--matchplay {
    background: #424851;
    color: #fff;
    padding: 1.25em;
    font-size:0.9em;
    cursor:pointer;
 }
 



</style>
