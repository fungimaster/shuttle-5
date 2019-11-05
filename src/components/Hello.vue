<template>
  <div>
  <vue-headful
    :title="doctitle"

    />
    <div class="hidden theme text-center">
      <div class="container">    
        <h2 class="when">Matchplay 2020 Johan S</h2>
      </div>
    </div>

    <div class="come">
      <b-container>
        <b-row>
          <b-col xl="1"></b-col>
          <b-col>
            <h2>GÖR SOM HENKE OCH GRANEN, VAR MED I SVERIGES STÖRSTA GOLFTÄVLING FÖR AMATÖRER!</h2>
            <p class="">Matchplay Invitational är en matchspelstävling för par med officiellt handikapp. Par kan vara män, kvinnor eller mix. Tävlingen spelas i Sverige på golfklubbar anslutna till Svenska Golfförbundet. </p>
            <div class="buttons text-center">
              <a href="/line-up" class="btn green-bg btn-lg text-white mb-3">Anmäl ditt lag!</a>
              <a href="/sessions" class="btn green-bg btn-lg text-white mb-3">Läs mer om tävlingen</a>
            </div>
          </b-col>
          <b-col xl="1"></b-col>
        </b-row>
      </b-container>
    </div>


    


    


    <div class="teaser-container">
      <b-container>
        <b-row>
          <b-col xl="1"></b-col>
          <b-col>
            <h2 class="teaser-header pink">A mashup of practical knowledge and wild inspiration</h2>
            <b-row class="mb-5 mt-5">
              <b-col md="6" order-md="2" class="teaser-content">
                <h3 class="green">Challenge</h3>
                <p>Challenge yourself, learn new technical know-hows and explore areas you're not familiar with!</p>
                <p>With 150 sessions, the other challenge will be to choose.</p>
              </b-col>
              <b-col md="6" order-md="1" class="teaser-content">
                <img src="https://res.cloudinary.com/oredev/image/upload/f_auto,w_510/2019/html/challenge">
              </b-col>
            </b-row>

            <b-row class="mb-5 mt-5">
              <b-col md="6" class="teaser-content">
                <h3 class="orange">Connect</h3>
                <p>Social media keeps you connected to your peers. However, there’s no substitution for meeting IRL.</p>
                <p>With 1200 participants, which conversation will you jump in?</p>
              </b-col>
              <b-col md="6" class="teaser-content">
                <img src="https://res.cloudinary.com/oredev/image/upload/f_auto,w_510/2019/html/connect">
              </b-col>
            </b-row>

            <b-row class="mb-5 mt-5">
              <b-col md="6" order-md="2" class="teaser-content">
                <h3 class="red">Experience</h3>
                <p>Break out of your office, open your mind and enjoy good discussions, good food and good coffee!</p>
              </b-col>
              <b-col md="6" order-md="1" class="teaser-content">
                <img src="https://res.cloudinary.com/oredev/image/upload/f_auto,w_510/2019/html/experience" alt="">
              </b-col>
            </b-row>
          </b-col>
          <b-col xl="1"></b-col>
        </b-row>
      </b-container>
    </div>


    

  </div>
</template>

<script>
  import {tagsMixin} from '../mixins/tagsMixin';

  export default {
    name: 'hello',
    data () {
      return {
      doctitle: this.$store.state.conferencename
      }
    },
    mixins: [tagsMixin],
    methods: {
      goRouter: function() {
        this.$router.push({ path: 'line-up' })
      }
    }
  }
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
    background: url(https://res.cloudinary.com/oredev/image/upload/f_auto,q_65/2019/html/background-1.jpg);
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
  .come {
    background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/o_45/v1572940143/matchplay/matchplay_bg.jpg);
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;
    color: #fff;
    padding: 180px 0 180px 0;
    @media (max-width: 767px) {
      padding: 5rem 0 5rem 0;
    }
  }
  .come h2 {
    color: $orange
  }
  .come h2, .come a {
    text-transform: uppercase;
  }
  .come button, .come a {
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
    background: url(https://res.cloudinary.com/oredev/image/upload/f_auto,q_65/v1556786227/2019/html/background-1_lower.jpg);
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
  .personas .start-persona img, .personas .first h2, .personas .last h2 {
    border: 1px solid #fff;
  }
  .personas .start-persona {
    cursor: pointer;
  }
  .personas .first h2, .personas .last h2{
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
  .personas .last h2{
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
    padding: 10rem 0 0 0;
    @media (max-width: 767px) {
      padding: 3rem 0;
    }
  }
  .theme-description {
    margin: 200px 0;
    @media (max-width: 767px) {
      margin: 0;
    }
  }
  .theme-description .stars img{
    @media (max-width: 767px) {
      width: 50px;
    }
  }
  .theme-description h2{
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
