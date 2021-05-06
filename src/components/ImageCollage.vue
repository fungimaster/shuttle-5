<template>
  <div>
    <LightGallery
      :images="lastXImages"
      :index="index"
      :disable-scroll="true"
      @close="index = null"
    />
    <div class="bg-images p-4">
      <b-row class="m-0">
        <b-col md="3" sm="6" xs="12" class="d-flex flex-column p-1">
          <b-img
            v-for="(thumb, thumbIndex) in columnOne"
            :key=" thumbIndex"
            class="double-tap-no-zoom pointer flex-shrink-1 pt-1 pb-1"
            fluid
            @click="index = thumbIndex"
            :src="addToUrl(thumb.url, 'w_400,q_auto')"
          >
          </b-img>
        </b-col>
        <b-col md="3" sm="6" class="d-none d-sm-flex flex-column p-1">
          <b-img
            v-for="(thumb, thumbIndex) in columnTwo"
            :key="thumbIndex"
            class="double-tap-no-zoom pointer flex-shrink-1 pt-1 pb-1"
            fluid
            @click="index = thumbIndex + oneFourth"
            :src="addToUrl(thumb.url, 'w_300,q_auto')"
          ></b-img>
        </b-col>
        <b-col md="3" sm="12" xs="12" class="d-block d-xs-block d-sm-none p-1 pt-4 justify-content-center">
           <!-- ONE COLUMNS -->
          <h6 class="text-center text-light" @click="index = oneFourth ">
            <span class="material-icons"> touch_app </span> Klicka för att bläddra i bildspelet och se alla bilder...
          </h6>
        </b-col>
        <b-col md="3" sm="12" xs="12" class="d-none d-sm-block d-md-none p-1 pt-4 justify-content-center">
           <!-- TWO COLUMNS -> Different next image -->
          <h6 class="text-center text-light" @click="index = oneFourth * 2">
            <span class="material-icons"> touch_app </span> Klicka för att bläddra i bildspelet och se alla bilder...
          </h6>
        </b-col>
        <b-col md="3" class="d-none d-md-flex flex-column p-1">
          <b-img
            v-for="(thumb, thumbIndex) in columnThree"
            :key="thumbIndex"
            class="double-tap-no-zoom pointer flex-shrink-1 pt-1 pb-1"
            fluid
            @click="index = thumbIndex + oneFourth*2"
            :src="addToUrl(thumb.url, 'w_300,q_auto')"
          ></b-img>
        </b-col>
        <b-col md="3" class="d-none d-md-flex flex-column p-1">
          <b-img
            v-for="(thumb, thumbIndex) in columnFour"
            :key="thumbIndex"
            class="double-tap-no-zoom pointer flex-shrink-1 pt-1 pb-1"
            fluid
            @click="index = thumbIndex + oneFourth*3"
            :src="addToUrl(thumb.url, 'w_300,q_auto')"
          ></b-img>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
 
<script>
import { LightGallery } from "vue-light-gallery";

export default {
  components: {
    LightGallery,
  },
  props: ["images", "numberOfImages", "fill"],
  data() {
    return {
      index: null,
    };
  },
  computed: {
    lastXImages() {
      let number = this.numberOfImages;

      if (this.images.length > number) {
        return this.images.slice(Math.max(this.images.length - number, 1));
      }
      return this.images;
    },
    oneFourth() {
      if (!this.lastXImages) {
        return;
      }
      return Math.ceil(this.lastXImages.length / 4);
    },
    columnOne() {
      if (!this.lastXImages) {
        return;
      }

      return this.lastXImages.slice(0, this.oneFourth);
    },
    columnTwo() {
      if (!this.lastXImages) {
        return;
      }
      return this.lastXImages.slice(this.oneFourth, this.oneFourth * 2);
    },
    columnThree() {
      if (!this.lastXImages) {
        return;
      }
      return this.lastXImages.slice(this.oneFourth * 2, this.oneFourth * 3);
    },
    columnFour() {
      if (!this.lastXImages) {
        return;
      }
      return this.lastXImages.slice(this.oneFourth * 3, this.oneFourth * 4);
    },
  },
  methods: {
    addToUrl(url, stringToAdd) {
      if (!url) {
        return;
      }
      let array = url.split("upload/");
      array.splice(1, 0, "upload/" + stringToAdd + "/");
      let urlString = array.join("");
      return urlString;
    },
  },
};
</script> 

<style scoped>

.bg-images {
  background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1500,q_auto,e_colorize:70,co_rgb:000000/v1608122032/matchplay/MPI-1825.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}

.overlay {
  background: rgba(0, 0, 0, 0.8);
  color: rgba(255, 255, 255, 0.8);
  position: absolute;
  z-index: 1000;
  bottom: 0;
  display: block;
  margin: 0 auto;
  padding: 12px 30px;
  width: 100%;
  box-sizing: border-box;
}
</style> 