<template>
  <div>
    <b-modal fluid centered size="xl" ref="map" id="map" class="text-center" v-bind:title="'Room: ' + $store.state.maproom" hide-footer>
      <img class="map" v-bind:src="'https://res.cloudinary.com/oredev/image/upload/2019/html/map-' + $store.state.maproom + '.png'" alt="">
    </b-modal>

    <b-modal fluid centered size="md" ref="speaker" id="speaker" class="" v-bind:title="$store.state.speaker.speakerFirstName + ' ' + $store.state.speaker.speakerLastName" hide-footer>
      <div class="text-center">
        <img class="mt-3 mb-4" v-bind:src="'https://res.cloudinary.com/oredev/image/upload/w_750/w_500,h_500,c_crop,g_face,r_max/w_220/' + $store.state.speaker.speakerImagePuId" alt="" />

      </div>
      <p class="speaker-bio">{{$store.state.speaker.speakerBiography}}</p>
    </b-modal>
  </div>

</template>

<script>
  import {tagsMixin} from '../../mixins/tagsMixin';

  export default {
    name: 'map',
    data () {
      return {
      }
    },
    mixins: [tagsMixin]
  }
</script>

<style scoped>
  img.map {
    width: 100%;
  }
  .speaker-bio {
    font-size: 1rem;
  }

</style>
