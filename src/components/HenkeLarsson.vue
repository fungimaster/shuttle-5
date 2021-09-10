<template>
  <div class="cont position-relative w-100">
    <div class="photo below"></div>
    <div class="photo below2"></div> 
 
    <div class="text-container float-right ">
      <p class="pr-3">
        Matchplay är en matchspelstävling för par med officiellt handicap. Par
        kan vara män, kvinnor eller mix. Tävlingen spelas i Sverige på
        golfklubbar anslutna till Svenska Golfförbundet.
      </p>
      <b-img class="logo" fluid src="https://res.cloudinary.com/dn3hzwewp/image/upload/v1573118127/matchplay/matchplay-new-logo-2020.png"></b-img>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import "../styles/variables.scss";

.cont {
  min-height: 600px;
}

.text-container {
  display: inline-block;
  float: right;
  position: relative;
  width: 60%;
  margin-top: 30%;
}

.circle {
  width: 150px;
  height: 150px;
  position: absolute;
  background-image: url(https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_140/v1631188277/matchplay/pngfind.com-golf-png-105571.png);

  z-index: -100;

  top: 600px;
}


.photo.below {
  clip-path: none;
  z-index: -1000;
  background-color: rgba(209, 155, 39, 0.2);
  background-blend-mode: lighten;
  width: 90%;
  opacity: 1;
  position: absolute;
  top: 150px;
  left: 30px;
}
 .photo.below2 {
  clip-path: none;
  z-index: -2000;
  background-color: rgba(14, 104, 179, 0.2);
  background-blend-mode: lighten;
  width: 100%;
  opacity: 1;
  position: absolute;
  top: 0px;
} 

.photo {
  width: 100%;
  height: 500px;
  background-image: url(https://res.cloudinary.com/dn3hzwewp/image/upload/e_colorize:70,co_rgb:eeeeee/v1573316365/matchplay/Henke.png);
  background-size: cover;
  z-index: 20;
  position: relative;
  background-size: 472px;
  background-repeat: no-repeat;
  background-position: -100px -11px;
}

.logo {
    width: 40%; 
     @media (max-width: 576px) {
    width: 90%;
  }
}
</style>
