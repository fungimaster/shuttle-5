<template>
  <div>
    <LightGallery
      :images="lastFourImages"
      :index="index"
      :disable-scroll="true"
      @close="index = null"
    />
    <b-row no-gutters :align-h="align || 'center'">
      <b-col
        cols="4"
        md="2"
        v-for="(thumb, thumbIndex) in lastFourImages"
        :key="thumbIndex"
      >
        <div
          class="image pointer"
          @click="index = thumbIndex"
           :style="{
            backgroundImage: 'url(' + addToUrl(thumb, 'w_200,q_auto') + ')',
            width: '100px',
            height: '80px',
          }"
        
        >
          <span class="overlay" v-if="thumb.title"> {{ thumb.title }} </span>
        </div>
      </b-col>
    </b-row>
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
  props: ["images", "align"],
  data() {
    return {
      index: null,
            windowWidth: window.innerWidth,
    };
  },
  computed: {
      lastFourImages() {
      let images = [...this.images]

          if (this.windowWidth <= 576) {
            images = this.images.map(e => this.addToUrl(e,"w_600,q_auto" ))
          }

          if (images.length > 4) {
            return images.slice(Math.max(this.images.length - 4, 1))
          }
          return images
      }
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
    }
  },

};
</script> 

<style scoped>
.image {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid #ebebeb;
  margin: 5px;
  position: relative;
  border-radius:0.25em;
  max-width:95%;
 
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