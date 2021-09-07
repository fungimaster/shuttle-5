<template>
  <div>
    <div v-if="!flip" class="divider-blue p-sm-4">
      <b-row class="p-4">
        <b-col md="4" sm="12">
          <h1>{{ video.headline }}</h1>
          <p class="text-light">
            {{ video.text }}
          </p>
        </b-col>
        <b-col md="8" sm="12">
          <div
            v-if="!isPlaying"
            class="
              d-flex
              align-items-center
              justify-content-center
              position-relative
            "
          >
            <b-img
              fluid
              :src="
                video.bgimage
                  ? video.bgimage
                  : 'https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1608122032/matchplay/MPI-1825.jpg'
              "
              class="shadow-lg rounded"
            >
            </b-img>
            <b-button
              @click="playVideo"
              variant="light"
              class="position-absolute"
            >
              <i class="material-icons"> play_arrow </i> Spela video</b-button
            >
          </div>

          <div v-else>
            <b-embed
              :src="video.url"
              width="560"
              height="314"
              style="border: none; overflow: hidden"
              scrolling="no"
              frameborder="0"
              allowfullscreen="true"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></b-embed>
          </div>
        </b-col>
      </b-row>
    </div>
    <div v-else class="divider-blue p-sm-4">
      <b-row class="p-4">
        <b-col md="8" sm="12">
          <div
            v-if="!isPlaying"
            class="
              d-flex
              align-items-center
              justify-content-center
              position-relative
              pb-4
            "
          >
            <b-img
              fluid
              :src="
                video.bgimage
                  ? video.bgimage
                  : 'https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_1900,q_70,e_colorize:10,co_rgb:000000/v1608122032/matchplay/MPI-1825.jpg'
              "
              class="shadow-lg rounded"
            >
            </b-img>
            <b-button
              @click="playVideo"
              variant="light"
              class="position-absolute"
            >
              <i class="material-icons"> play_arrow </i> Spela video</b-button
            >
          </div>

          <div v-else>
            <b-embed
              :src="video.url"
              width="560"
              height="314"
              style="border: none; overflow: hidden"
              scrolling="no"
              frameborder="0"
              allowfullscreen="true"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></b-embed>
          </div>
        </b-col>
        <b-col md="4" sm="12">
          <h1>{{ video.headline }}</h1>
          <p class="text-light">
            {{ video.text }}
          </p>
        </b-col>
      </b-row>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    video: {
      type: Object,
      required: true,
    },
    flip: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      isPlaying: false,
    };
  },
  methods: {
    playVideo() {
      this.isPlaying = true;
    },
  },
};
</script>


<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/bootstrap-overwrite.css";

.divider-blue {
  background-color: #2e5783;
  min-height: 350px;
}
</style>