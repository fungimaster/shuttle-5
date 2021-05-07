<template>
  <div>
    <LightGallery
      :images="lastXImages"
      :index="index"
      :disable-scroll="true"
      @close="index = null"
    />
    <div class="bg-images p-1 p-md-4">
      <b-row class="m-0">
        <b-col md="3" cols="4" class="d-flex flex-sm-column flex-wrap p-1">
          <b-img
            v-for="(thumb, thumbIndex) in columnOne"
            :key="thumbIndex"
            class="pointer flex-shrink-1 pt-1 pb-1"
            fluid
            @click="index = thumbIndex"
            :src="addToUrl(thumb.url, imageProps)"
          >
          </b-img>
        </b-col>
        <b-col md="3" cols="4" class="d-flex flex-sm-column flex-wrap p-1">

          <b-img
            v-for="(thumb, thumbIndex) in columnTwo"
            :key="thumbIndex"
            class="pointer flex-shrink-1 pt-1 pb-1"
            fluid
            @click="index = thumbIndex + onePart"
            :src="addToUrl(thumb.url, imageProps)"
          ></b-img>
        </b-col>
        <!--   <b-col md="3" sm="12" xs="12" class="d-block d-xs-block d-sm-none p-1 pt-4 justify-content-center">
          <h6 class="text-center text-light" @click="index = onePart ">
            <span class="material-icons"> touch_app </span> Klicka för att bläddra i bildspelet och se alla bilder...
          </h6>
        </b-col> -->
        <!--     <b-col md="3" sm="12" xs="12" class="d-none d-sm-block d-md-none p-1 pt-4 justify-content-center">
          <h6 class="text-center text-light" @click="index = onePart * 2">
            <span class="material-icons"> touch_app </span> Klicka för att bläddra i bildspelet och se alla bilder...
          </h6>
        </b-col> -->
        <b-col md="3" cols="4" class="d-flex flex-sm-column flex-wrap p-1">
          <b-img
            v-for="(thumb, thumbIndex) in columnThree"
            :key="thumbIndex"
            class="pointer flex-shrink-1 pt-1 pb-1"
            fluid
            @click="index = thumbIndex + onePart * 2"
            :src="addToUrl(thumb.url, imageProps)"
          ></b-img>
        </b-col>
        <b-col md="3" class="d-none d-md-flex flex-sm-column flex-wrap p-1">
          <b-img
            v-for="(thumb, thumbIndex) in columnFour"
            :key="thumbIndex"
            class="pointer flex-shrink-1 pt-1 pb-1"
            fluid
            @click="index = thumbIndex + onePart * 3"
            :src="addToUrl(thumb.url, imageProps)"
          ></b-img>
        </b-col>
        <!--   <b-col  cols="12" class="d-block d-sm-block d-md-none p-1 pt-4 justify-content-center">
          <h6 class="text-center text-light" @click="index = onePart * 3">
            <span class="material-icons"> touch_app </span> Klicka för att bläddra i bildspelet och se alla bilder...
          </h6>
        </b-col>  -->
      </b-row>
    </div>
  </div>
</template>
 
<script>
import { LightGallery } from "vue-light-gallery";

export default {
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  components: {
    LightGallery,
  },
  props: ["images", "numberOfImages", "fill"],
  data() {
    return {
      index: null,
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    imageProps() {
      //576px is equivilent to Bootstraps XS/COLS
      if (this.windowWidth <= 576) {
        return "c_crop,h_800,w_800/c_scale,w_400,h_400,q_auto";
      }
      return "w_300,q_auto";
    },
    lastXImages() {
      let number = this.numberOfImages;

      if (this.images.length > number) {
        return this.images.slice(Math.max(this.images.length - number, 1));
      }
      return this.images;
    },
    onePart() {
      if (!this.lastXImages) {
        return;
      }
      if (this.windowWidth <= 768) {
        return Math.ceil(this.lastXImages.length / 3);
      }
      return Math.ceil(this.lastXImages.length / 4);
    },
    columnOne() {
      if (!this.lastXImages) {
        return;
      }

      return this.lastXImages.slice(0, this.onePart).slice(0,6);
    },
    columnTwo() {
      if (!this.lastXImages) {
        return;
      }
      return this.lastXImages.slice(this.onePart, this.onePart * 2).slice(0,6);
    },
    columnThree() {
      if (!this.lastXImages) {
        return;
      }
      return this.lastXImages.slice(this.onePart * 2, this.onePart * 3).slice(0,6);
    },
    columnFour() {
      if (!this.lastXImages) {
        return;
      }
      return this.lastXImages.slice(this.onePart * 3, this.onePart * 4).slice(0,6);
    },
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
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