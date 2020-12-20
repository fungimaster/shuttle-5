<template>
  <b-container class="justify-content-center">
    <b-row class="" align-h="center">
      <b-col
        class="col-12 mt-5"
        v-for="(item, index) in testLimited"
        :key="item.message"
      >
        <div class="testimonial justify-content-center">
          <b-row align-h="center">
            <b-col class="col-8 col-md-3 pt-0 mb-3 mb-md-0 text-center">
              <img :src="item.image" />
            </b-col>
            <b-col class="col-12 col-md-8 pt-4">
              <p>"{{item.message}}"</p>
              - {{item.author}}
            </b-col>
          </b-row>
          <hr class="d-block d-md-none mt-5" v-if="index<number-1 && number>1" />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { globalState } from "../main.js";

export default {
  props: ["number"],
  data() {
    return {
      testimonials: [
      { message: 'Som ny inom golfen så var det kul att addera tävlingsmomentet och få känna hur proffsen har det när de puttar för miljonerna. Utöver det så är det ett ypperligt tillfälle att skapa sig nya bekantskaper och prova på nya banor.',
       image: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max/v1607593347/matchplay/ambassador/545144_1080.png',
       author: 'Rasmus Franke / Lydinge GK'},
      { message: 'Jag rekommenderar verkligen att vara med i tävlingen, det är så kul att träffa andra golfare som delar passionen till sporten. Det digitala scorekortet är superenkelt, man ser direkt vilket lag som vinner hålet och hur det står i matchen. Kul att vänner kan följa matchen direkt på sajten.',
       image: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max/v1607953704/matchplay/ambassador/Karl.png',
       author: 'Karl Stjerna / Ljunghusen GK'},
       {
         message: 'Formatet i Matchplay är ett vinnande koncept. Det är få tävlingsformer som är så roliga som bästboll match, där man får spela ihop med en polare och träffa trevliga motståndare! Att komma iväg och spela andra banor än sin egen är också en riktig höjdare och adderar ännu en nivå till matchspelet.',
         image: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max/v1608111888/matchplay/ambassador/IMG_1696.png',
         author: 'Carl Fredrik Klintner / Båstad GK'
       },
       {
         message: 'En tävling som verkligen är värd att deltaga i. Du kommer ut till nya banor och träffar nya människor. Gillar konceptet med bästboll, det är en riktigt rolig spelform, man får en bra lagkänsla! Det digitala scorekortet är ett stort plus, enkelt att använda, resultat direkt och andra kan följa matchen live. Vi spelar gärna i tävlingen igen!',
         author: 'Evelina Losell / Ljungbyhed GK',
         image: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max/v1608219732/matchplay/ambassador/losell.png'
       }
    
    ]
    };
  },
  methods: {
   
  },

  computed: {
    testLimited() {
        return this.testimonials.slice(0, this.number)
    },
    setCol() {
        if (this.number === 1) {
           return "col-12"
        } else {
            return "col-6"
        }
    }
}
};
</script>


<style scoped>
.testimonial {
  font-size: 0.9em;
}

.testimonial img {
  width: 80%;
  height:auto;
}

.testimonial hr {
  border-top: 10px dotted rgba(0, 0, 0, 0.1);
  width: 15%;
  /*padding-top: 0em;
  padding-bottom: 0em;
  margin-top: 1.7em;*/
}
</style>