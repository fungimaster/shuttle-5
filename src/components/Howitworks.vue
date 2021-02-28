<template>
  <b-jumbotron id="howitworks" container-fluid class="gradient d-block d-md-block mb-0">
      <b-container>
        <b-row>
          <div class="show-swipe d-flex d-md-none" v-if="swipe_visible">
            <div class="swipe">
    <i class="fa fa-long-arrow-left"></i>
    <i class="fa fa-hand-pointer"></i>
    <i class="fa fa-long-arrow-right"></i>
  </div> 
          </div>
                <div class="col-12 text-left text-md-center">
                   <h1 class="text-white">HUR GÅR DET TILL?</h1>
                  <b-carousel ref="explainer" id="explainer" v-model="slide" :interval="500000" indicators="">
                    <div class="carousel-inner text-left">
                      <div
                        class="carousel-item"
                        v-for="(explain, index) in explainer"
                        :key="explain.message"
                      >
                        <b-row :id="'slide_'+index" align-h="center" class="font-background" :class="explain.icon">
                          <b-col class="col-12 col-md-10 col-lg-8 mb-3 mt-4 mt-md-5 ">
                            <div class="card card-explainer">
                              
                              <div class="card-body p-0">
                                <h3 class="card-title text-left">{{index+1}}. {{explain.title}}
                                    <i hidden v-if="explain.icon" :class="'fa fa-'+explain.icon"></i>
                                </h3>
                                <p
                                  v-html="explain.message"
                                  class="card-text mt-3"
                                ></p>
                                <p hidden v-if="explain.icon" class="text-center"><i :class="'fa fa-'+explain.icon"></i></p>
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
                  <b-button variant="primary" class="text-white" to="/register">
                  Anmälan
                  </b-button>
                </div>
             
            
        
        </b-row>
      </b-container>
</b-jumbotron>
</template>

<script>

export default {
  props: ["number"],
  data() {
    return {
      slide:0,
      swipe_visible: false,
      swipe_show_once: false,
 //explainer
      explainer: [      
        { icon: 'clipboard-check',title:'Anmälan', message: "Steg 1 är att anmäla dig som spelare under 'Anmälan' där du direkt får besked om du är kvalificerad. Du blir sedan inloggad för att påbörja ditt lagbygge. <strong>Inget</strong> förbinder dig att betala för ditt lag i detta läge. Anmälan stänger i slutet av april." },
        { icon: 'user-friends', title: 'Skapa ditt lag', message: "Nu ska du som lagkapten skapa ditt lag och väljer typ av lag (privat/företag) och lagmedlem. Du måste veta din lagkamrats golfid för att kunna välja lagkamrat. I sista steget betalar du med swish (privatpersoner), voucher eller faktura (företag)." },
        { icon: 'dice', title: 'Lottning', message: "Under maj görs lottningen för den första omgången och där det tas hänsyn till att alla lag ska få så kort resa som möjligt. Du kommer få information via mail samt på matchplay.se när lottningen är klar och du kan då se vilket lag ni kommer möta." },
        { icon: 'golf-ball', title: 'Spela matcher', message: "Varje match måste spelas inom den period som anges för den lottande omgången. På matchplay.se kommer du kunna se vilket lag ni ska möta samt kontaktuppgifter. Fram till Sverigefinalen betalar ni själva ev. greenfee. All score förs med vårt digitala scorekort." },
        { icon: 'trophy', title: 'Sverigefinal', message: "2021 gör vi Sverigefinalen dubbelt så stor med åtta lag som spelas den 3-5 september på Allerum Golfklubb, strax utanför Helsingborg. Hotell, frukost, all golf samt en bankett på kvällen ingår." },
        { icon: 'plane-departure', title: 'Finalen', message: "De 2 vinnande lagen i Sverigefinalen åker med Matchplay till Spanska solkusten för att göra upp om titeln. Flyg, hotell och allt spel ingår för de bägge lagen." }
        //{ icon: 'calendar-exclamation', title: 'Sista anmälningsdag', message: "Anmälan och betalning stänger i slutet av april." },
      ],
    };
  },
  mounted: function() {
    //window.addEventListener('scroll', this.scrollListener) 
    const target = document.querySelector('#howitworks');    

    // Next we want to create a function that will be called when that element is intersected
  
    // Next we instantiate the observer with the function we created above. This takes an optional configuration
    // object that we will use in the other examples.
    let options = {  
  threshold: 0.5
}
    const observer = new IntersectionObserver(this.handleIntersection,options);

    // Finally start observing the target element
    observer.observe(target); 

    
  },
 
  methods: {
    handleIntersection(entries,observer,target) {
      if (this.swipe_show_once) return;
      // The callback will return an array of entries, even if you are only observing a single item
      entries.map((entry) => {
        if (entry.isIntersecting) {
          this.swipe_visible = true; //do once
          
           setTimeout(() => {
              this.swipe_visible = false;
              this.swipe_show_once = true;
              const target2 = document.querySelector('#howitworks');              
              observer.unobserve(target2);
            }, 2000); 

        
        } else {
          this.swipe_visible = false;           
          
        }
      });
    },

      prev() {
        this.$refs.explainer.prev()
      },
      next() {     
        this.$refs.explainer.next()
      },
  },

  computed: {

}
};
</script>


<style lang="scss" scoped>


.swipe {
  position:absolute;
  display: inline-block;
  color: #fff;
  font-size:4em;
  text-align:center;  
  vertical-align: top;
  z-index:100;
    margin-top:100px;
  width:90%; 
  -moz-animation-name: swipe;
  -webkit-animation-name: swipe;
  animation-name: swipe;
  -moz-animation-duration: 2700ms;
  -webkit-animation-duration: 2700ms;
  animation-duration: 2700ms;
  -moz-animation-delay: 250ms;
  -webkit-animation-delay: 250ms;
  animation-delay: 250ms;
  -moz-animation-timing-function: linear;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -moz-animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}
.swipe .fa-long-arrow-left,
.swipe .fa-long-arrow-right {
  font-size: 0.65em;
  color: #fff;
}
.swipe .fa-long-arrow-left {
  -moz-transform: scaleX(0.75) skew(20deg) translateY(-0.9em) translateX(1.25em);
  -ms-transform: scaleX(0.75) skew(20deg) translateY(-0.9em) translateX(1.25em);
  -webkit-transform: scaleX(0.75) skew(20deg) translateY(-0.9em) translateX(1.25em);
  transform: scaleX(0.75) skew(20deg) translateY(-0.9em) translateX(1.25em);
}
.swipe .fa-long-arrow-right {
  -moz-transform: scaleX(0.75) skew(20deg) translateY(-0.9em) translateX(-0.95em);
  -ms-transform: scaleX(0.75) skew(20deg) translateY(-0.9em) translateX(-0.95em);
  -webkit-transform: scaleX(0.75) skew(20deg) translateY(-0.9em) translateX(-0.95em);
  transform: scaleX(0.75) skew(20deg) translateY(-0.9em) translateX(-0.95em);
}
.swipe .fa-hand-o-up {
  -moz-transform: scaleY(1.2);
  -ms-transform: scaleY(1.2);
  -webkit-transform: scaleY(1.2);
  transform: scaleY(1.2);
  -moz-animation-name: swipe-rotate;
  -webkit-animation-name: swipe-rotate;
  animation-name: swipe-rotate;
  -moz-animation-duration: 2700ms;
  -webkit-animation-duration: 2700ms;
  animation-duration: 2700ms;
  -moz-animation-delay: 250ms;
  -webkit-animation-delay: 250ms;
  animation-delay: 250ms;
  -moz-animation-timing-function: linear;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -moz-animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

@-moz-keyframes swipe {
  0% {
    -moz-transform: translateX(0);
    transform: translateX(0);
  }
  10% {
    -moz-transform: translateX(-0.1em);
    transform: translateX(-0.1em);
  }
  20% {
    -moz-transform: translateX(0.1em);
    transform: translateX(0.1em);
  }
  30% {
    -moz-transform: translateX(-0.1em);
    transform: translateX(-0.1em);
  }
  40% {
    -moz-transform: translateX(0.1em);
    transform: translateX(0.1em);
  }
  50% {
    -moz-transform: translateX(0);
    transform: translateX(0);
  }
  100% {
    -moz-transform: translateX(0);
    transform: translateX(0);
  }
}
@-webkit-keyframes swipe {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  10% {
    -webkit-transform: translateX(-0.1em);
    transform: translateX(-0.1em);
  }
  20% {
    -webkit-transform: translateX(0.1em);
    transform: translateX(0.1em);
  }
  30% {
    -webkit-transform: translateX(-0.1em);
    transform: translateX(-0.1em);
  }
  40% {
    -webkit-transform: translateX(0.1em);
    transform: translateX(0.1em);
  }
  50% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
@keyframes swipe {
  0% {
    -moz-transform: translateX(0);
    -ms-transform: translateX(0);
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  10% {
    -moz-transform: translateX(-0.1em);
    -ms-transform: translateX(-0.1em);
    -webkit-transform: translateX(-0.1em);
    transform: translateX(-0.1em);
  }
  20% {
    -moz-transform: translateX(0.1em);
    -ms-transform: translateX(0.1em);
    -webkit-transform: translateX(0.1em);
    transform: translateX(0.1em);
  }
  30% {
    -moz-transform: translateX(-0.1em);
    -ms-transform: translateX(-0.1em);
    -webkit-transform: translateX(-0.1em);
    transform: translateX(-0.1em);
  }
  40% {
    -moz-transform: translateX(0.1em);
    -ms-transform: translateX(0.1em);
    -webkit-transform: translateX(0.1em);
    transform: translateX(0.1em);
  }
  50% {
    -moz-transform: translateX(0);
    -ms-transform: translateX(0);
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  100% {
    -moz-transform: translateX(0);
    -ms-transform: translateX(0);
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
@-moz-keyframes swipe-rotate {
  0% {
    -moz-transform: scaleY(1.2) skew(0);
    transform: scaleY(1.2) skew(0);
  }
  10% {
    -moz-transform: scaleY(1.2) skew(5deg);
    transform: scaleY(1.2) skew(5deg);
  }
  20% {
    -moz-transform: scaleY(1.2) skew(-5deg);
    transform: scaleY(1.2) skew(-5deg);
  }
  30% {
    -moz-transform: scaleY(1.2) skew(5deg);
    transform: scaleY(1.2) skew(5deg);
  }
  40% {
    -moz-transform: scaleY(1.2) skew(-5deg);
    transform: scaleY(1.2) skew(-5deg);
  }
  50% {
    -moz-transform: scaleY(1.2) skew(0);
    transform: scaleY(1.2) skew(0);
  }
  100% {
    -moz-transform: scaleY(1.2) skew(0);
    transform: scaleY(1.2) skew(0);
  }
}
@-webkit-keyframes swipe-rotate {
  0% {
    -webkit-transform: scaleY(1.2) skew(0);
    transform: scaleY(1.2) skew(0);
  }
  10% {
    -webkit-transform: scaleY(1.2) skew(5deg);
    transform: scaleY(1.2) skew(5deg);
  }
  20% {
    -webkit-transform: scaleY(1.2) skew(-5deg);
    transform: scaleY(1.2) skew(-5deg);
  }
  30% {
    -webkit-transform: scaleY(1.2) skew(5deg);
    transform: scaleY(1.2) skew(5deg);
  }
  40% {
    -webkit-transform: scaleY(1.2) skew(-5deg);
    transform: scaleY(1.2) skew(-5deg);
  }
  50% {
    -webkit-transform: scaleY(1.2) skew(0);
    transform: scaleY(1.2) skew(0);
  }
  100% {
    -webkit-transform: scaleY(1.2) skew(0);
    transform: scaleY(1.2) skew(0);
  }
}
@keyframes swipe-rotate {
  0% {
    -moz-transform: scaleY(1.2) skew(0);
    -ms-transform: scaleY(1.2) skew(0);
    -webkit-transform: scaleY(1.2) skew(0);
    transform: scaleY(1.2) skew(0);
  }
  10% {
    -moz-transform: scaleY(1.2) skew(5deg);
    -ms-transform: scaleY(1.2) skew(5deg);
    -webkit-transform: scaleY(1.2) skew(5deg);
    transform: scaleY(1.2) skew(5deg);
  }
  20% {
    -moz-transform: scaleY(1.2) skew(-5deg);
    -ms-transform: scaleY(1.2) skew(-5deg);
    -webkit-transform: scaleY(1.2) skew(-5deg);
    transform: scaleY(1.2) skew(-5deg);
  }
  30% {
    -moz-transform: scaleY(1.2) skew(5deg);
    -ms-transform: scaleY(1.2) skew(5deg);
    -webkit-transform: scaleY(1.2) skew(5deg);
    transform: scaleY(1.2) skew(5deg);
  }
  40% {
    -moz-transform: scaleY(1.2) skew(-5deg);
    -ms-transform: scaleY(1.2) skew(-5deg);
    -webkit-transform: scaleY(1.2) skew(-5deg);
    transform: scaleY(1.2) skew(-5deg);
  }
  50% {
    -moz-transform: scaleY(1.2) skew(0);
    -ms-transform: scaleY(1.2) skew(0);
    -webkit-transform: scaleY(1.2) skew(0);
    transform: scaleY(1.2) skew(0);
  }
  100% {
    -moz-transform: scaleY(1.2) skew(0);
    -ms-transform: scaleY(1.2) skew(0);
    -webkit-transform: scaleY(1.2) skew(0);
    transform: scaleY(1.2) skew(0);
  }
}

.card-explainer {
  min-height:240px;
  font-size:0.9em;
  color:#fff;
  border:none;  
}

.font-background:before {
  position: absolute;
  font-family: 'Font Awesome 5 Pro';
  font-size:30vh;
  overflow:hidden;
  text-align:right;
  vertical-align: top;
  width:100%; 
  top:-20px;
  color: rgba(255,255,255,0.07);  
}

.clipboard-check:before {
    content: "\f46c";
}

.user-friends:before {
    content: "\f500";   
}

.dice:before {
    content: "\f522";   
}

.golf-ball:before {
    content: "\f450";   
}

.trophy:before {
    content: "\f091";   
}

.plane-departure:before {
    content: "\f5b0";   
}



.card {
  background:transparent;
}

.card-explainer .fa {  
  color:#FFF;
  font-size:1em;
}

</style>