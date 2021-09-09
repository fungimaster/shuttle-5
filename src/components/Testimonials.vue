<template>
  <b-container class="justify-content-center p-0 m-0">
    <div class="col-12 text-left text-md-left testimonial p-0 m-0">
      <b-carousel
        ref="testimonals"
        id="testimonials"
        v-model="testimonials_slide"
        :interval="500000"
        indicators=""
      >
        <div class="carousel-inner text-left">
          <div
            class="carousel-item"
            v-for="(item, index) in testRandom"
            :key="item.message"
          >
            <b-row :id="'slide_' + index" align-h="center">
              <b-col
                class="col-12 col-md-10 col-lg-8 mr-0 ml-0 mb-3 mt-4 mt-md-5"
              >
                <div class="card card-testimonial">
                  <img :src="item.image" class="mb-4" style="margin: 0 auto" />
                  <div class="card-body p-0">
                    <p>"{{ item.message }}"</p>
                    - {{ item.author }}
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
        </div>
      </b-carousel>
    </div>
    <div class="col-12 text-center mb-2">
      <b-button :variant="variant ? variant : 'primary'" @click="prev()">
        <i class="fa fa-arrow-left"></i>
      </b-button>
      <b-button :variant="variant ? variant : 'primary'" @click="next()">
        <i class="fa fa-arrow-right"></i>
      </b-button>
      <b-button
        v-if="register"
        :variant="variant ? variant : 'primary'"
        :class="variant === 'light' ? 'text-dark' : 'text-light'"
        @click="$router.push('/register')"
      >
        Anmälan
      </b-button>
    </div>
  </b-container>
</template>

<script>
export default {
  props: {
    number: Number,
    register: Boolean,
    variant: String,
  },
  data() {
    return {
      testimonials_slide: 0,
      testimonials: [
        {
          message:
            "En tävling som verkligen är värd att deltaga i. Du kommer ut till nya banor och träffar nya människor. Gillar konceptet med bästboll, det är en riktigt rolig spelform, man får en bra lagkänsla! Det digitala scorekortet är ett stort plus, enkelt att använda, resultat direkt och andra kan följa matchen live. Vi spelar gärna i tävlingen igen!",
          author: "Evelina Losell / Ljungbyhed GK",
          image:
            "https://res.cloudinary.com/dn3hzwewp/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max/v1608219732/matchplay/ambassador/losell.png",
        },
        {
          message:
            "Som ny inom golfen så var det kul att addera tävlingsmomentet och få känna hur proffsen har det när de puttar för miljonerna. Utöver det så är det ett ypperligt tillfälle att skapa sig nya bekantskaper och prova på nya banor.",
          image:
            "https://res.cloudinary.com/dn3hzwewp/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max/v1607593347/matchplay/ambassador/545144_1080.png",
          author: "Rasmus Franke / Lydinge GK",
        },
        {
          message:
            "Jag rekommenderar verkligen att vara med i tävlingen, det är så kul att träffa andra golfare som delar passionen till sporten. Det digitala scorekortet är superenkelt, man ser direkt vilket lag som vinner hålet och hur det står i matchen. Kul att vänner kan följa matchen direkt på sajten.",
          image:
            "https://res.cloudinary.com/dn3hzwewp/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max/v1607953704/matchplay/ambassador/Karl.png",
          author: "Karl Stjerna / Ljunghusen GK",
        },
        {
          message:
            "Formatet i Matchplay är ett vinnande koncept. Det är få tävlingsformer som är så roliga som bästboll match, där man får spela ihop med en polare och träffa trevliga motståndare! Att komma iväg och spela andra banor än sin egen är också en riktig höjdare och adderar ännu en nivå till matchspelet.",
          image:
            "https://res.cloudinary.com/dn3hzwewp/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max/v1608111888/matchplay/ambassador/IMG_1696.png",
          author: "Carl Fredrik Klintner / Båstad GK",
        },
        {
          message:
            "Golf är en så pass individuell sport på många sätt, så det är himla kul att få möjlighet att spela med en kompis! Jag kan verkligen rekommendera Matchplay som tävling för alla.",
          author: "Philip Widmark / Båstad GK",
          image:
            "https://res.cloudinary.com/dn3hzwewp/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max/v1608533894/matchplay/ambassador/philip.png",
        },
      ],
    };
  },
  methods: {
    prev() {
      this.$refs.testimonals.prev();
    },
    next() {
      this.$refs.testimonals.next();
    },
    shuffle(o) {
      for (
        var j, x, i = o.length;
        i;
        j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
      );
      return o;
    },
  },

  computed: {
    testLimited() {
      return this.testimonials.slice(0, this.number);
    },
    testRandom() {
      return this.shuffle(this.testimonials);
    },
    setCol() {
      if (this.number === 1) {
        return "col-12";
      } else {
        return "col-6";
      }
    },
  },
};
</script>


<style lang="scss" >
@import "../styles/variables.scss";
@import "../styles/bootstrap-overwrite.css";

.testimonial {
  font-size: 0.9em;
}

.carousel-indicators li {
  background-color: #999;
}

.testimonial img {
  width: 30%;
  height: auto;
  @media (max-width: 991px) {
    width: 25%;
  }
  @media (max-width: 576px) {
    width: 50%;
  }
}

.testimonial hr {
  border-top: 10px dotted rgba(0, 0, 0, 0.1);
  width: 15%;
  /*padding-top: 0em;
  padding-bottom: 0em;
  margin-top: 1.7em;*/
}

.card {
  border: none !important;
}

.card-testimonial {
  min-height: 400px;
  font-size: 0.9em;
  color: #333;
  border: none;
  @media (max-width: 991px) {
    min-height: 400px;
  }
  @media (max-width: 576px) {
    min-height: 450px;
  }
}

.card {
  background: transparent;
}

.card-explainer .fa {
  font-size: 4em;
}
</style>