<template>
  <b-container>
    <b-row class="mt-5 mb-4">
      <b-col
        class="col-12 mt-3"
        v-bind:class="{ 'col-md-6': number>1 }"
        v-for="(item, index) in testLimited"
        :key="item.message"
      >
        <div class="testimonial">
          <b-row>
            <b-col class="col-3 pt-3">
              <img :src="item.image" />
            </b-col>
            <b-col class="col-9">
              <p>"{{item.message}}"</p>
              - {{item.author}}
            </b-col>
          </b-row>
          <hr class="d-block d-md-none" v-if="index===0 && number>1" />
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
       image: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max/v1607593347/matchplay/ambassador/545144_1080.jpg',
       author: 'Rasmus Franke / Lydinge GK'},
      { message: 'Jag rekommenderar verkligen att vara med i tävlingen, det är så kul att träffa andra golfare som delar passionen till sporten. Det digitala scorekortet är superenkelt, man ser direkt vilket lag som vinner hålet och hur det står i matchen. Kul att vänner kan följa matchen direkt på sajten.',
       image: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max/v1607953704/matchplay/ambassador/Karl.png',
       author: 'Karl Stjerna / Ljunghusen GK'},
    
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
  width: 100%;
}

.testimonial hr {
  border-top: 10px dotted rgba(0, 0, 0, 0.1);
  width: 10%;
  padding-top: 0em;
  padding-bottom: 0em;
  margin-top: 1.7em;
}
</style>