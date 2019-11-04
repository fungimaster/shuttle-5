<template>
  <div>
  <vue-headful
    :title="doctitle"

    />
    <div class="theme text-center">
      <div class="container">
        <img src="https://res.cloudinary.com/oredev/image/upload/2019/html/tema-1.svg" alt="">
        <h2 class="when">Matchplay 2020</h2>
      </div>

    </div>


    <div class="come">
      <b-container>
        <b-row>
          <b-col xl="1"></b-col>
          <b-col>
            <h2>COME TO ØREDEV AND REJUVENATE YOUR WORK, YOUR PROCESS, AND YOUR PERSONAL JOURNEY</h2>
            <p class="">Øredev is the perfect blend, with one day of in-depth pre-conference workshops and three days of sessions, you will get tons of inspiration and learning to keep you creating your best work all year long.</p>
            <div class="buttons text-center">
              <a href="/line-up" class="btn green-bg btn-lg text-white mb-3">Meet with experts</a>
              <a href="/sessions" class="btn green-bg btn-lg text-white mb-3">Sharpen your skills</a>
            </div>
          </b-col>
          <b-col xl="1"></b-col>
        </b-row>
      </b-container>
    </div>


    <div class="ticket">
      <div class="top">
      </div>
      <b-container fluid>
        <b-row>
          <b-col xl="3" class="text-center mb-5">
            <img src="https://res.cloudinary.com/oredev/image/upload/v1556786228/2019/html/icon-skull.svg" alt=""><img src="https://res.cloudinary.com/oredev/image/upload/v1556786228/2019/html/icon-skull.svg" alt=""><img src="https://res.cloudinary.com/oredev/image/upload/v1556786228/2019/html/icon-skull.svg" alt="">
          </b-col>
          <b-col class="mb-5">
            <b-container>
              <b-row>
                <b-col xl="1"></b-col>
                <b-col>
                  <h2>GROUP DEAL</h2>
                  <p>The more the merrier, bring all your friends and colleagues for the best experience and the best price!</p>
                  <a href="/tickets" class="btn green-bg btn-lg text-white mt-4">Get my ticket</a>
                </b-col>
                <b-col xl="1"></b-col>
              </b-row>
            </b-container>
          </b-col>
          <b-col xl="3" class="text-center">
            <img src="https://res.cloudinary.com/oredev/image/upload/v1556786228/2019/html/icon-skull.svg" alt=""><img src="https://res.cloudinary.com/oredev/image/upload/v1556786228/2019/html/icon-skull.svg" alt=""><img src="https://res.cloudinary.com/oredev/image/upload/v1556786228/2019/html/icon-skull.svg" alt="">
          </b-col>
        </b-row>
      </b-container>
      <div class="bottom">
      </div>
    </div>


    <div class="personas">
      <b-row no-gutters>
        <b-col xl="3" md="4" class="first">
          <h2 class="green-bg text-white">Enhance your expertise in...</h2>
        </b-col>
        <b-col @click="[setTag('Android'), setStatus('sessions'), $router.push({ path: 'line-up' })]" xl="3" sm="4">
          <div class="square start-persona">
            <span class="green-bg text-white">Android</span>
            <img src="https://res.cloudinary.com/oredev/image/upload/h_1020/f_auto,ar_1:1,c_crop,e_grayscale,g_face:center,w_620,z_1/2018_speakers/v-m-gonda-gmail-com" alt="">
          </div>
        </b-col>
        <b-col @click="[setTag('AR & VR'), setStatus('sessions'), $router.push({ path: 'line-up' })]" xl="3" sm="4">
          <div class="square start-persona">
            <span class="green-bg text-white">AR & VR</span>
            <img src="https://res.cloudinary.com/oredev/image/upload/w_620/f_auto,ar_1:1,c_crop,e_grayscale,g_face:center,h_620,z_1/2018_speakers/jimmy-apeoholic-se" alt="">
          </div>
        </b-col>
        <b-col @click="[setTag('Architecture'), setStatus('sessions'), $router.push({ path: 'line-up' })]" xl="3" sm="4">
          <div class="square start-persona">
            <span class="green-bg text-white">Architecture</span>
            <img src="https://res.cloudinary.com/oredev/image/upload/h_1000/f_auto,ar_1:1,c_crop,e_grayscale,g_face:center,w_620,z_1/2018_speakers/marianne-bellotti-gmail-com" alt="">
          </div>
        </b-col>

        <b-col @click="[setTag('Data Science'), setStatus('sessions'), $router.push({ path: 'line-up' })]" xl="3" sm="4">
          <div class="square start-persona">
            <span class="green-bg text-white">Data Science</span>
            <img src="https://res.cloudinary.com/oredev/image/upload/h_1520/f_auto,ar_1:1,c_crop,e_grayscale,g_face:center,w_620,z_1/2018_speakers/dalyag-gmail-com" alt="">
          </div>
        </b-col>
        <b-col @click="[setTag('Polyglot & Fringe'), setStatus('sessions'), $router.push({ path: 'line-up' })]" xl="3" sm="4">
          <div class="square start-persona">
            <span class="green-bg text-white">Polyglot & Fringe</span>
            <img src="https://res.cloudinary.com/oredev/image/upload/h_620/f_auto,ar_1:1,c_crop,e_grayscale,g_face:center,w_620,z_1/2018_speakers/hello-brooklynzelenka-com" alt="">
          </div>
        </b-col>
        <b-col @click="[setTag('JVM'), setStatus('sessions'), $router.push({ path: 'line-up' })]" xl="3" sm="4">
          <div class="square start-persona">
            <span class="green-bg text-white">JVM</span>
            <img src="https://res.cloudinary.com/oredev/image/upload/h_1020/f_auto,ar_1:1,c_crop,e_grayscale,g_face:center,w_620,z_1/2018_speakers/mail-hadihariri-com" alt="">
          </div>
        </b-col>
        <b-col @click="[setTag('.NET'), setStatus('sessions'), $router.push({ path: 'line-up' })]" xl="3" sm="4">
          <div class="square start-persona">
            <span class="green-bg text-white">.NET</span>
            <img src="https://res.cloudinary.com/oredev/image/upload/h_920/f_auto,ar_1:1,c_crop,e_grayscale,g_face:center,w_620,z_1/2018_speakers/tpeczek-gmail-com" alt="">
          </div>
        </b-col>

        <b-col @click="[setTag('People & Teams'), setStatus('sessions'), $router.push({ path: 'line-up' })]" xl="3" sm="4">
          <div class="square start-persona">
            <span class="green-bg text-white">People & Teams</span>
            <img src="https://res.cloudinary.com/oredev/image/upload/h_1100/f_auto,ar_1:1,c_crop,e_grayscale,g_face:center,w_620,z_1/2018_speakers/julia-lagom-solutions" alt="">
          </div>
        </b-col>
        <b-col @click="[setTag('Quality & Test'), setStatus('sessions'), $router.push({ path: 'line-up' })]" xl="3" sm="4">
          <div class="square start-persona">
            <span class="green-bg text-white">Quality & Test</span>
            <img src="https://res.cloudinary.com/oredev/image/upload/h_650/f_auto,ar_1:1,c_crop,e_grayscale,g_face:center,w_620,z_1/2018_speakers/n8ebel-goobar-io" alt="">
          </div>
        </b-col>
        <b-col @click="[setTag('Security'), setStatus('sessions'), $router.push({ path: 'line-up' })]" xl="3" sm="4">
          <div class="square start-persona">
            <span class="green-bg text-white">Security</span>
            <img src="https://res.cloudinary.com/oredev/image/upload/h_1900/f_auto,ar_1:1,c_crop,e_grayscale,g_face:center,w_620,z_1/2018_speakers/r-rdegges-com" alt="">
          </div>
        </b-col>
        <b-col @click="[setTag('Web'), setStatus('sessions'), $router.push({ path: 'line-up' })]" xl="3" sm="4">
          <div class="square start-persona">
            <span class="green-bg text-white">Web</span>
            <img src="https://res.cloudinary.com/oredev/image/upload/h_820/f_auto,ar_1:1,c_crop,e_grayscale,g_face:center,w_620,z_1/2018_speakers/traumverloren-gmail-com" alt="">
          </div>
        </b-col>
        <b-col @click="[setTag('Keynote'), setStatus('sessions'), $router.push({ path: 'line-up' })]" xl="3" sm="4">
          <div class="square start-persona">
            <span class="green-bg text-white">Keynote</span>
            <img src="https://res.cloudinary.com/oredev/image/upload/h_920/f_auto,ar_1:1,c_crop,e_grayscale,g_face:center,w_620,z_1/2018_speakers/cecilia-rheologica-com" alt="">
          </div>
        </b-col>
        <b-col @click="[setTag('DevOps'), setStatus('sessions'), $router.push({ path: 'line-up' })]" xl="3" sm="4">
          <div class="square start-persona">
            <span class="green-bg text-white">DevOps</span>
            <img src="https://res.cloudinary.com/oredev/image/upload/h_620/f_auto,ar_1:1,c_crop,e_grayscale,g_face:center,w_620,z_1/2018_speakers/carlos-apache-org" alt="">
          </div>
        </b-col>
        <b-col @click="[setTag('Cloud'), setStatus('sessions'), $router.push({ path: 'line-up' })]" xl="3" sm="4">
          <div class="square start-persona">
            <span class="green-bg text-white">Cloud</span>
            <img src="https://res.cloudinary.com/oredev/image/upload/h_1700/f_auto,ar_1:1,c_crop,e_grayscale,g_face:center,w_620,z_3/2018_speakers/robin-moffatt-me" alt="">
          </div>
        </b-col>
        <b-col xl="3" md="4" class="last">
          <h2 class="green-bg text-white">Meet experts, nurture your curiosity, dare to marvel</h2>
        </b-col>
      </b-row>
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


    <b-container fluid class="theme-description">
      <b-row>
        <b-col xl="2" class="left">
        </b-col>
        <b-col>
          <b-container>
            <b-row>
              <b-col xl="1"></b-col>
              <b-col class="stars">
                <img src="https://res.cloudinary.com/oredev/image/upload/v1556786227/2019/html/icon-star.jpg" alt="">
                <img src="https://res.cloudinary.com/oredev/image/upload/v1556786227/2019/html/icon-star.jpg" alt="">
                <img src="https://res.cloudinary.com/oredev/image/upload/v1556786227/2019/html/icon-star.jpg" alt="">
                <img src="https://res.cloudinary.com/oredev/image/upload/v1556786227/2019/html/icon-star.jpg" alt="">
                <img src="https://res.cloudinary.com/oredev/image/upload/v1556786227/2019/html/icon-star.jpg" alt="">
                <h2 class="mt-3">Psyched</h2>
                <p>Although Freud died long before GitHub, assembly, and Twitter, we want to argue that several of his theories are expressed in the ways we develop tech, and in the tech itself.</p>

                <p>We like to think of software as something completely rational, unbiased, running on cold-hearted machines. But our minds that design and write the programs come loaded with a  hefty set of issues. This year, our keynote speakers will reflect on topics such as cognitive aspects of software design, the drives behind the development of tech, morality and biases in AI, etc.</p>

                <p>Technology changes but we are bringing it into the world using the same brains that were around 1,000 years ago, even 10,000. We are not implying Freud was right about everything. We simply want to explore technology from the vantage point of psychology, morality, and philosophy. We the curious!</p>
              </b-col>
              <b-col xl="1"></b-col>
            </b-row>
          </b-container>
        </b-col>
        <b-col xl="2" class="right">
        </b-col>
      </b-row>
    </b-container>

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
    background: url(https://res.cloudinary.com/oredev/image/upload/f_auto,q_65/v1556784443/2019/html/background-start-2.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    color: #fff;
    padding: 180px 0 180px 0;
    @media (max-width: 767px) {
      padding: 5rem 0 5rem 0;
    }
  }
  .come h2 {
    color: $pink
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
