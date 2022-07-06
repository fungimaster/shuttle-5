<template>
  <div class="container-fluid">
      <div class="row">
   <b-col class="col-2 pr-0 pl-0 pb-0 pt-0" v-for="(image,idx) in allGameImages" :key="'A'+ idx">
       <b-img           
            class="pointer align-self-start myimage"
            fluid            
            :src="addToUrl(image.url, imageProps)"
          >
          </b-img>
   </b-col>
      </div>
   
  </div>
</template>

<script>
import AppImageCollage from "./ImageCollage";
import { globalState } from "../main.js";

export default {
  name: 'Images',
  

  components: {
    
    AppImageCollage
    
  },
  data() {
    return {
      loadingimages: true,
      loadingstats: true,
      allGameImages:[],
      numberOfImages: 0      
    };
  },
   computed: {
    imageProps() {
      //576px is equivilent to Bootstraps XS/COLS
      if (this.windowWidth <= 576) {
        return "c_fill,h_800,w_800/w_150,h_150,q_auto";
      }
      //return "c_thumb,w_200,q_auto,g_faces";
      return "ar_1:1,c_fill,g_auto,w_200"
    }
    },
  mounted() {
    this.gameImages();
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
    
      gameImages() {
      if (this.getAllImages) {
        //create an even number of images for component
        this.allGameImages = this.getAllImages        
          if(this.allGameImages.length % 2 == 0) {
              this.numberOfImages = this.allGameImages.length
          } else {
             this.numberOfImages = this.allGameImages.length -1
          }
        return
      }

      this.axios
        .post(globalState.admin_url + "allGameImages", {competition: 'hXcmBwqmfWC2tYcxR'})
        .then((response) => {
          this.$store.dispatch('setAllImages', response.data)
          this.allGameImages = response.data
          //create an even number of images for component
          if(response.data.length % 2 == 0) {
              this.numberOfImages = response.data.length
          } else {
             this.numberOfImages = response.data.length -1
          }
          this.loadingimages = false;
        })
        .catch((error) => {
          console.log(error);
          this.loadingimages = false;
        });
    }
   }

};
</script>


<style lang="scss">
@import "../styles/variables.scss";

img.myimage {
    width:100%;
    height:auto;
}

</style>
