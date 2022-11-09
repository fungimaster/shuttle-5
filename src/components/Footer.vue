<template> 
  <div
    v-if="
      ['Scorecard','Igg', 'CreateGame', 'CreateGame_free', 'Game', 'MyMatchplay', 'Receipt'].indexOf(
        $route.name
      ) === -1">
  
  <ScrollTopComponent>
  <b-button pill class="btn btn-circle blue-bg btn-md">
    <i class="far fa-angle-double-up fa-2x"></i>
  </b-button>
  </ScrollTopComponent>

    <b-container class="sponsors">
      <hr hidden class="mb-5" />

      <b-row>
        <b-col>
          <b-row>
            <b-col>
              <h2>Partners</h2>
            </b-col>
          </b-row>

          <b-row no-gutters>
             <b-col md="6" class="gold p-5 text-center">
              <a href="https://ruff.se/" target="_blank">
                <img
                  src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,q_auto/v1665478570/matchplay/igg/logo_ruff.png"
                  alt
                />
              </a>
            </b-col>
             <b-col md="6" class="gold p-5 text-center">
              <a href="https://indoorgolfgroup.se/" target="_blank">
                <img
                  src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,q_auto/v1663921954/matchplay/igg/logo_igg.png"
                  alt
                />
              </a>
            </b-col>
            <b-col md="6" class="gold p-5 text-center">
              <a href="https://futureitpartner.se/" target="_blank">
                <img
                  src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,q_auto/v1573315610/matchplay/future_logo.png"
                  alt
                />
              </a>
            </b-col>
            <b-col md="6" class="gold p-2 pt-5 text-center">
              <a href="https://colburn.se" target="_blank">
                <img
                  src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_300,q_auto/v1573315623/matchplay/Logo_Colburn.png"
                  alt
                />
              </a>
            </b-col>           
          </b-row>
          <b-row hidden no-gutters>
            <b-col md="4" class="silver p-1 text-center">
              <a href="https://scandic.se/" target="_blank">
                <img
                  src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_150,q_auto/v1614942462/matchplay/sponsors/scandic.png"
                  alt
                />
              </a>
            </b-col>
            <b-col md="4" class="silver p-1 text-center">
              <a href="https://prosak.se" target="_blank">
                <img
                  src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_150,q_auto/v1614942462/matchplay/sponsors/prosak_logo_2016.png"
                  alt
                />
              </a>
            </b-col>
            <b-col md="4" class="silver p-1 mt-2 text-center">
              <a href="https://elgiganten.se" target="_blank">
                <b-img
                  alt="elgiganten"
                  src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_150,q_auto/v1614942462/matchplay/sponsors/Vinn-Elgiganten-Phonehouse.png"
                ></b-img>
              </a>
            </b-col>            
          </b-row>
        </b-col>
        <b-col xl="1"></b-col>
      </b-row>
    </b-container>

    <footer class="text-center">
      
      <vue-cookie-accept-decline
        :ref="'myPanel1'"
        :elementId="'myPanel1'"
        :debug="false"
        :position="'bottom-right'"
        :type="'floating'"
        :disableDecline="true"
        :transitionName="'slideFromBottom'"
        :showPostponeButton="false"
        @clicked-accept="cookieClickedAccept"
        @clicked-decline="cookieClickedDecline"
      >
        <!-- remove @status="cookieStatus" from above -->

        <!-- Optional -->
        <div slot="postponeContent">&times;</div>

        <!-- Optional -->
        <div slot="message">
          Vi använder cookies för att förbättra din användarupplevelse!
          <router-link to="cookies">Läs mer...</router-link>
        </div>

        <!-- Optional -->
        <div slot="declineContent">OPT OUT</div>

        <!-- Optional -->
        <div slot="acceptContent">HELT OK!</div>
      </vue-cookie-accept-decline>
      <b-container fluid class="theme-description">
        <b-row>
          <b-col xl="2" class="left"></b-col>
          <b-col>
            <b-container>
              <b-row>
                <b-col xl="2"></b-col>
                <b-col>
                  <h3>Matchplay Sweden</h3>
                  <div class="hidden newsletter mt-3 mb-5"></div>
                  <br />
                  <p class="hidden">Matchplay AB</p>
                  <p>Ängelholm</p>
                  <p>Telefon: 010 - 522 00 07</p>
                  <p><a href="https://www.facebook.com/matchplaysweden/" target="_blank"><i class="material-icons mr-2">facebook</i>Facebook</a> |
                  <a href="https://www.instagram.com/matchplay_sweden/" target="_blank"><i class="material-icons mr-2">camera_alt</i>Instagram</a></p>
                  <p class="links mb-5">
                    <router-link hidden to="/ping" class>PING</router-link
                    >&nbsp;
                    <router-link to="/info_indoor" class>Om tävlingen</router-link
                    >&nbsp;|
                    <router-link to="/cookies" class>Cookies/Data</router-link>
                  </p>
                </b-col>
                <b-col xl="2"></b-col>
              </b-row>
            </b-container>
          </b-col>

          <b-col xl="2" class="right"></b-col>
        </b-row>
      </b-container>
    </footer>

   </div>

</template>

<script>
//import CookieLaw from "vue-cookie-law";
import VueCookieAcceptDecline from "vue-cookie-accept-decline";
import "vue-cookie-accept-decline/dist/vue-cookie-accept-decline.css";
import ScrollTopComponent from "./ScrollTopComponent";

export default {
  name: "footer1",
  //components: { CookieLaw },
  components: { VueCookieAcceptDecline,ScrollTopComponent },
  data() {
    return {
      email2: "",
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      status: null,
    };
  },
 
  methods: {
    cookieStatus(status) {
      this.status = status;
    },
    cookieClickedAccept() {
      this.status = "accept";
    },
    cookieClickedDecline() {
      this.status = "decline";
    },
    isEmailValid: function () {
      return this.email2 == ""
        ? ""
        : this.reg.test(this.email2)
        ? "has-success"
        : "has-error";
    },
  },
  computed: {
    statusText() {
      return this.status || "No cookie set";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/variables.scss";
.sponsors {
  margin-top: 6rem;
  margin-bottom: 6rem;
}
.sponsors .silver {
  max-width: 50%;
}
.sponsors img {
  max-width: 100%;
  max-height: 110px;
}
.sponsors h2 {
  color: $orange;
}
.sponsors a {
  border: 0px solid #fff;
  display: block;
}
footer {
  margin-top: 0rem;
  padding: 0rem 0 0 0;
  /*  background-image: url(
											    https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,
											    q_69,
											    w_1207/v1572942209/matchplay/c640cf_402261724c71433c9662662c3114e5b8_mv2_d_4500_3000_s_4_2.png
											  ); */
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  @media (max-width: 576px) {
    margin-top: 6rem;
    padding: 5rem 0 2rem 0;
  }
}
footer h2,
footer h3 {
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
  margin-top: 80px;
}
footer .middle {
  padding: 120px 0;
  color: #000;
}
footer .newsletter {
  width: 100%;
  display: inline-block;
}

footer .links a {
  color: #000 !important;
  font-size: 1rem;
}

//cookiebanner
.Cookie--matchplay {
  background: #424851;
  color: #fff;
  padding: 1.25em;
  font-size: 0.9em;
  cursor: pointer;
}
</style>
