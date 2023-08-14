<template>
  <div class="">
    <vue-headful :title="doctitle" />
    <b-container>
      <b-row>
        <b-col xl="1"></b-col>
        <b-col class="col-12 mt-5 mb-3">
          <h1>Finalresa Matchplay 2023</h1>
          <p>
            Vinnande lag i Local Series Stockholm och Local Series Skåne får åka till Golf Le Fonti och tävla mot lag från Matchsplays nationella matchspelstävling i kampen om att bli vinnaren av Matchplay 2023. Matchplay står för flyg, transfer, boende, middag och golf på plats. Finalen spelas mellan 22-26 oktober.
          </p>
        </b-col>
      </b-row>

      <b-row class="mb-5">
         <b-col class="col-12 text-center">
         <video
        class="video-fluid d-block d-md-none"
        src="https://res.cloudinary.com/dn3hzwewp/video/upload/c_fill,w_400,q_auto:eco,so_1.8/v1678972618/matchplay/final2023/Golf_Club_le_fonti__Matchplay_2023.mp4"            
        muted
        loop
        allowfullscreen
        controls
      ></video>
        <video
        class="video-fluid d-none d-md-block"
        src="https://res.cloudinary.com/dn3hzwewp/video/upload/c_fill,w_1200,q_auto:eco,so_1.8/v1678972618/matchplay/final2023/Golf_Club_le_fonti__Matchplay_2023.mp4"            
        muted
        loop
        allowfullscreen
        controls
      ></video>
     </b-col>
      </b-row>

      <b-row>
        <b-col class="col-12">
        <h2>Le Fonti, Italien</h2>
        <p>I år går finalresan till en fantastisk del av Italien, Emilia Romagna, ca 30 min bilresa från Bologna.</p>
        </b-col>
        <b-col class="col-12">
          <div class="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13285.346841988112!2d11.579881095539887!3d44.38011124286867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132b3308b212fb21%3A0x4ee2ce415820bf22!2sGolf%20Club%20le%20Fonti!5e0!3m2!1ssv!2sse!4v1679036931614!5m2!1ssv!2sse" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </b-col>
      </b-row>

      <b-jumbotron container-fluid class="bg-image-collage p-0 mt-5">        
      <app-image-collage
        class="bg-image-collage d-flex justify-content-center"
        v-if="allGameImages.length"
        :numberOfImages="numberOfImages"
        :images="allGameImages"
      ></app-image-collage>
    </b-jumbotron>

     <b-row class="mb-5">       
         <b-col class="col-12 text-center">
         <video
        class="video-fluid d-block d-md-none"        
        src="https://res.cloudinary.com/dn3hzwewp/video/upload/c_fill,w_400,q_auto:eco,so_1.8/v1679038042/matchplay/final2023/Varignana_Istituzionale_2019_Full_Hd.mp4"            
        muted
        loop
        allowfullscreen
        controls
      ></video>
        <video
        class="video-fluid d-none d-md-block"
        src="https://res.cloudinary.com/dn3hzwewp/video/upload/c_fill,w_1200,q_auto:eco,so_1.8/v1679038042/matchplay/final2023/Varignana_Istituzionale_2019_Full_Hd.mp4"            
        muted
        loop
        allowfullscreen
        controls
      ></video>
     </b-col>
      </b-row>

      <b-row class="mb-5">       
         <b-col class="col-12 text-center">
         <video
        class="video-fluid d-block d-md-none"                
        src="https://res.cloudinary.com/dn3hzwewp/video/upload/c_fill,w_400,q_auto:eco,so_1.8/v1679037901/matchplay/final2023/IF_-_Video_Promo-_V2_-_Castel_San_Pietro_Terme.mp4"            
        muted
        loop
        allowfullscreen
        controls
      ></video>
        <video
        class="video-fluid d-none d-md-block"
        src="https://res.cloudinary.com/dn3hzwewp/video/upload/c_fill,w_1200,q_auto:eco,so_1.8/v1679037901/matchplay/final2023/IF_-_Video_Promo-_V2_-_Castel_San_Pietro_Terme.mp4"            
        muted
        loop
        allowfullscreen
        controls
      ></video>
     </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import AppImageCollage from "./ImageCollage";

export default {
  name: "final",
  components: {    
    AppImageCollage
  },
  data() {
    return {     
      doctitle: "Finalresan 2023",
      numberOfImages: 8,
      allGameImages: [
         {title: 'Klubbhus',url: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_1200,q_auto/v1678972630/matchplay/final2023/Clubhouse_aerea.jpg'},
        {title: 'Hål 6',url: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_1200,q_auto/v1678972638/matchplay/final2023/Buca_6.jpg'},
        {title: 'Hål 3',url: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_1200,q_auto/v1678972637/matchplay/final2023/Campo_3.jpg'},
        {title: 'Hål 9',url: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_1200,q_auto/v1678972635/matchplay/final2023/foto_gus_9.jpg'},
        {title: 'Panoramabild golfbanan',url: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_1200,q_auto/v1678972634/matchplay/final2023/PANORAMA.jpg'},
        {title: 'Banan',url: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_1200,q_auto/v1678972631/matchplay/final2023/Campo.jpg'},
        {title: 'Hål 5',url: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_1200,q_auto/v1678972631/matchplay/final2023/Campo_5.jpg'},
        {title: 'Cripta Varignana',url: 'https://res.cloudinary.com/dn3hzwewp/image/upload/w_1200,q_auto/v1679038351/matchplay/final2023/CRIPTA_VARIGNANA.jpg'}
        
        ],
    };
  },
  mounted: function () {
   
  },
  computed: {
  
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../styles/variables.scss";


img, video {
  max-width: 100%;
}

.map iframe {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 400px;
}

.bg-image-collage {
  background: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1500,q_auto,e_colorize:70,co_rgb:000000/v1608122032/matchplay/MPI-1825.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
