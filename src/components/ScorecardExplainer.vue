<template>
  <b-container class="justify-content-center p-0 m-0">

      <b-modal id="scorecardImage" ref="scorecardImage" title="Scorekort" v-model="scorecardShow" ok-only size="lg" style="padding-left:-1rem;">
      <p class="text-center">
      <b-img class="scorecard-image" v-if="slides" :src="scorecard_image"></b-img>
      </p>
    </b-modal>



    <div class="col-12 text-left text-md-left scorecardExplainer p-0 m-0">                   
                  <b-carousel ref="scorecardExplainer" id="scorecardExplainer" v-model="scorecard_slide" :interval="500000" indicators="" controls="">
                    <div class="carousel-inner text-left">
                      <div
                        class="carousel-item"
                        v-for="(item, index) in slides"
                        :key="item.message"
                      >
                        <b-row :id="'slide_'+index" align-h="center">
                          <b-col class="col-12 col-md-10 col-lg-8 mr-0 ml-0 mb-3 mt-4 mt-md-5">
                            <div class="card card-testimonial">
                             <img @click="scorecard_image=item.image,$bvModal.show('scorecardImage')" :src="item.image" class="mb-4" style="margin:0 auto;cursor:pointer;" />
                              <div class="card-body p-0">
                               <p>{{item.message}}</p>                               
                              </div>
                            </div>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-carousel>
                </div>
                  <div class="col-12 text-center mb-2">
                  <b-button variant="primary" @click="prev()">
                    <i class="fa fa-arrow-left"></i>
                  </b-button>
                  <b-button variant="primary" @click="next()">
                    <i class="fa fa-arrow-right"></i>
                  </b-button>
                   <b-button v-if="register" variant="primary" class="text-white" to="/register">
                  Anmälan
                  </b-button>
                </div>

  </b-container>
</template>

<script>

export default {
  props: {
    number:  Number,   
    register: Boolean
  },
  data() {
    return {
        scorecard_image: null,
        scorecardShow: false,
       scorecard_slide: 0,
      slides: [
         {
         message: 'När ni har träffats på klubben (eller inomhusanläggning om Indoortävling) och det är dags för spel startar hemmalaget (som ansvarar för att föra score) matchen från indoor.matchplay.se och matchsidan. Aktuell hcp hämtas direkt från GIT och val av tee görs.',
         image: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_380,q_auto/v1613126296/matchplay/scorecard1.jpg'       
       },
       {
         message: 'Era spelhcp räknas ut automatiskt och kan nås från hjälpknappen. Här kan ni se exakt hur vi räknar ut era hcp, tex när laget har mer än 28 i hcp osv.',
         image: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_380,q_auto/v1613126296/matchplay/scorecard_help.jpg'
         
       },  
      { message: 'På översiktssidan ser man alla 18 hål med symboler för score, ev. slag för resp. spelare samt vinnande score. Högst upp ser man vem som leder matchen.',       
       image: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_380,q_auto/v1613126296/matchplay/scorecard2.jpg'
       },
       
      { message: 'På resp. hål förs varje spelares score in genom ett enkelt gränssnitt, det tar i snitt 3-5 sekunder att mata in scoren för ett hål och sedan gå vidare till nästa. Familj och vänner kan följa matchen på indoor.matchplay.se. Behövs särspel efter 18:e hålet vinner laget med lägst sammanlagd hcp.',
        image: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_380,q_auto/v1613126296/matchplay/scorecard3.jpg'
        },
        
       
    
    ]
    };
  },
  methods: {
   prev() {
        this.$refs.scorecardExplainer.prev()
      },
      next() {
        this.$refs.scorecardExplainer.next()
      }      
  },

  computed: {

}
};
</script>


<style lang="scss" scoped>


.scorecard-image {
    width: auto;
    height:70vh;
}

.scorecardExplainer {
  font-size: 0.9em; 
}

.carousel-indicators li {
  background-color:#999;
}

.scorecardExplainer img {
  width: 30%;
  height:auto;
   @media (max-width: 991px) {
     width: 25%;
  }
  @media (max-width: 576px) {
    width: 40%;
  }
}

.card {
  border:none !important;
}

.card-testimonial {
  min-height:600px;
  font-size:0.9em;
  color:#333;
  border:none; 
   @media (max-width: 991px) {
          min-height:450px;
  }
  @media (max-width: 576px) {   
    min-height:480px;
  }
}

.card {
  background:transparent;
}


</style>