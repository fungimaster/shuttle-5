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
              <hr />
            </b-col>
          </b-row>

<b-row no-gutters>
            <b-col md="12" class="gold p-4 text-center" align-self="center">
              
            </b-col>                  
          </b-row>
          <b-row no-gutters >
            
            <b-col md="6" class="gold p-4 text-center" align-self="center">
              
            </b-col>
            <b-col md="6" class="gold p-4 text-center" align-self="center">
           
            </b-col>           
          </b-row>
          
        </b-col>       
      </b-row>
    </b-container>

    <footer class="text-center">
      
      <b-container fluid class="theme-description">
        <b-row>
          <b-col xl="2" class="left"></b-col>
          <b-col>
            <b-container class="mt-5">
              <b-row>
                <b-col xl="2"></b-col>
                <b-col>
                  <b-alert class="small mt-0" show variant="info">
            Send questions about booking (or cancellation) to: <a href="mailto:dormyhbgopen@gmail.com">dormyhbgopen@gmail.com</a>
          </b-alert>
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
import ScrollTopComponent from "./ScrollTopComponent";

export default {
  name: "footer1",
  //components: { CookieLaw },
  components: { ScrollTopComponent },
  data() {
    return {
      email2: "",
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      status: null,
    };
  },
 
  methods: {
   
    isEmailValid: function () {
      return this.email2 == ""
        ? ""
        : this.reg.test(this.email2)
        ? "has-success"
        : "has-error";
    },
  },
  computed: {
    
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


</style>
