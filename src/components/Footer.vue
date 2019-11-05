<template>
  <div>
    <b-container class="sponsors">
      <b-row>
        <b-col xl="1"></b-col>
        <b-col>
          <b-row>
            <b-col>
              <h2>Partners</h2>
            </b-col>
          </b-row>

          <b-row no-gutters>
            <b-col md="4" class="gold">
              <a href="https://www.axis.com/en" target="_blank">
                <img src="https://res.cloudinary.com/oredev/image/upload/2019/sponsors/axis" alt="">
              </a>
            </b-col>
            <b-col md="4" class="gold">
              <a href="https://www.ikea.com/"  target="_blank">
                <img src="/static/partners/ikea.png" alt="" />
              </a>
            </b-col>
            <b-col md="4" class="gold">
              <b-row no-gutters>
                <b-col md="6" class="silver">
                  <a href="https://ravendb.net/" target="_blank">
                    <img src="https://res.cloudinary.com/oredev/image/upload/2019/sponsors/ravendb" alt="">
                  </a>
                </b-col>
                <b-col md="6" class="silver">
                  <a href="https://malmo.se/" target="_blank">
                    <img src="https://res.cloudinary.com/oredev/image/upload/2019/sponsors/malmostad" alt="">
                  </a>
                </b-col>
                <b-col md="6" class="silver">
                  <a href="https://www.holmbergs.com/" target="_blank">
                    <img src="https://res.cloudinary.com/oredev/image/upload/2019/sponsors/holmbergs.png" alt="">
                  </a>
                </b-col>
                <b-col md="6" class="silver">
                  <a href="https://www.malmomassan.se/en/" target="_blank">
                    <img src="https://res.cloudinary.com/oredev/image/upload/2019/sponsors/malmomassan" alt="">
                  </a>
                </b-col>
              </b-row>
            </b-col>
          </b-row>

          <b-row no-gutters>
            <b-col md="4" class="gold">
              <b-row no-gutters>
                <b-col md="6" class="silver">
                  <a href="https://www.oreilly.com" target="_blank">
                    <img src="https://res.cloudinary.com/oredev/image/upload/2019/sponsors/oreilly" alt="">
                  </a>
                </b-col>
                <b-col md="6" class="silver">
                  <a href="https://open.spotify.com/show/1gXqSrlHmdqOZTmiMo19mR?si=gEEFJ8CpRWqpUTKzwXGo-Q" target="_blank">
                    <img src="https://res.cloudinary.com/oredev/image/upload/2019/sponsors/kodsnack" alt="">
                  </a>
                </b-col>
                <b-col md="6" class="silver">
                  <a href="https://developer.ibm.com/" target="_blank">
                    <img src="https://res.cloudinary.com/oredev/image/upload/2019/sponsors/ibm" alt="">
                  </a>
                </b-col>
                <b-col md="6" class="silver">
                  <a href="https://www.datormagazin.se" target="_blank">
                    <img src="https://res.cloudinary.com/oredev/image/upload/2019/sponsors/datormagazin" alt="">
                  </a>
                </b-col>
              </b-row>
            </b-col>
            <b-col md="4" class="gold">
              <a href="https://solace.com" target="_blank">
                <img src="https://res.cloudinary.com/oredev/image/upload/2019/sponsors/solace" alt="">
              </a>
            </b-col>
            <b-col md="4" class="gold">
              <a href="https://azure.microsoft.com/sv-se/"  target="_blank">
                <img src="https://res.cloudinary.com/oredev/image/upload/2019/sponsors/microsoft.png" alt="">
              </a>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col md="4" class="gold">
              <b-row no-gutters>
                <b-col md="6" class="silver">
                  <a href="https://www.youtube.com/channel/UCT0bL2CQIk1eANeXk57mxaA" target="_blank">
                    <img src="https://res.cloudinary.com/oredev/image/upload/2019/sponsors/nighthacking" alt="">
                  </a>
                </b-col>
                <b-col md="6" class="silver">
                  <a href="https://www.jayway.com/"  target="_blank">
                    <img src="https://res.cloudinary.com/oredev/image/upload/2019/sponsors/jayway" alt="">
                  </a>
                </b-col>
                <b-col md="6" class="silver">
                  <a href="https://www.devexpress.com"  target="_blank">
                    <img src="https://res.cloudinary.com/oredev/image/upload/2019/sponsors/devexpress" alt="">
                  </a>
                </b-col>
              </b-row>
            </b-col>
          </b-row>

          
        </b-col>
        <b-col xl="1"></b-col>
      </b-row>
    </b-container>

    <footer class="text-center text-white">
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
                  <h2>2019</h2>
                  <div class="newsletter mt-3 mb-5">
                    <form class="subscribe" name="SubscriberForm" action="http://www.anpdm.com/public/process-subscription-form.aspx?formId=424B50407448465D4671" method="post" target="_blank" id="newsletterForm">

                      <div class="input-group mb-3">
                        <input required type="email" class="form-control" placeholder="Subscribe to newsletter" aria-label="Subscribe to newsletter" name="pf_Email" value="" id="email" v-model="email">
                        <div class="input-group-append">
                          <input type="submit" name="Submit" id="NewsletterSubmit" class="input-group-text green-bg text-white" value=">">
                        </div>
                      </div>


                      <!--input type="submit" id="NewsletterSubmit" value="Submit"alt="Subscribe" name="Submit"-->

                      <!-- Do not change name or type on submit button, to change visible text, change text for "value" -->
                      <input type="hidden" name="pf_FormType" value="OptInForm">
                      <input type="hidden" name="pf_OptInMethod" value="SingleOptInMethod">
                      <input type="hidden" name="pf_CounterDemogrFields" value="0">
                      <input type="hidden" name="pf_CounterMailinglists" value="1">
                      <input type="hidden" name="pf_AccountId" value="10083">
                      <input type="hidden" name="pf_ListById" value="1">
                      <input type="hidden" name="pf_Version" value="2">
                      <input type="hidden" name="pf_MailinglistName1" value="200918">
                    </form>
                  </div>
                  <p>Matchplay AB</p>
                  <p>Ängelholm</p>                  
                  <p>Phone: +46(0)70 111 22 33</p>
                  <p class="links mb-5">
                    <router-link to="/about" class="">Om Matchplay</router-link>
                    -
                    <router-link to="/code-of-conduct" class="">Code of conduct</router-link>                    
                    –
                    <router-link to="/partnership" class="">Partnership</router-link>
                    -
                    <router-link to="/privacy-policy" class="">Privacy Policy</router-link>
                    -
                    <router-link to="/convince-your-boss" class="">Convince your boss</router-link>

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
  export default {
    name: 'footer',
    data () {
      return {
        email: '',
        reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      }
    },
    methods: {
      isEmailValid: function() {
        return (this.email == "")? "" : (this.reg.test(this.email)) ? 'has-success' : 'has-error';
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
  }
  .sponsors h2 {
    color: $pink;
  }
  .sponsors a{
    background-color: #f5f5f5;
    border: 1px solid #fff;
    display: block;
  }
  footer {
    margin-top: 12rem;
    padding: 10rem 0 0 0;
    background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1807/v1572942209/matchplay/c640cf_402261724c71433c9662662c3114e5b8_mv2_d_4500_3000_s_4_2.png);
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

</style>
