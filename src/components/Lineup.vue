<template>
  <div class="lineup">
    <vue-headful
    :title="doctitle"
    />
    <div v-if="this.status != 'sessions'" class="container tags-container">
      <h1>Pick their brains. Gain their knowledge</h1>
      <h5>Pick your areas of interest below</h5>
      <div v-if="loadtags" class="row justify-content-center loading-tags">
        <c-spinner></c-spinner>
      </div>
      <div v-else>
        <div class="row">
          <div class="col-12 text-right select-all">
            <a v-if="this.tags.length !== this.tagschoosen.length" href="#" v-on:click="selectAllTags()">
              Select all
            </a>
            <span  v-if="this.tagschoosen.length > 0 && this.tags.length !== this.tagschoosen.length"> | </span>
            <a v-if="this.tagschoosen.length > 0" href="#" v-on:click="deselectAllTags()">
              Deselect all
            </a>
          </div>
          <div class="tags row col-12">
            <div class="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-xs-6" v-for="tag in tags">
              <div v-on:click="setTag(tag)" v-bind:class="[setActiveTag(tag)]" class="tag text-center">
                {{tag.org}}
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center confirm-tags">
          <a v-on:click="setStatus('sessions')" v-bind:class="[setActiveNext()]" class="btn btn-circle show-sessions"><i class="material-icons">done</i></a>
        </div>
      </div>

    </div>

    <!---------------------------- SESSIONS --------------------------------------->

    <div v-if="this.status === 'sessions'" class="container">
      <div class="row mt-5">
        <div class="col-12 tags-choosen">
          <div v-on:click="setStatus('tags')" class="tags-add text-center">
            <i class="material-icons">add</i>
          </div>
          <div v-for="tag in tagschoosen" v-on:click="setTag(tag)" class="tag-choosen text-center active">
            <span>{{tag.org}}</span> <i class="material-icons">clear</i>
          </div>
          <div v-if="this.speakername" v-on:click="resetSpeaker()" class="tag-choosen text-center active speaker">
            <span v-if="loadspeakername">
              &nbsp;
            </span>
            <span v-else>
              {{this.speaker.speakerFirstName}} {{this.speaker.speakerLastName}}
            </span>
            <i class="material-icons">clear</i>
          </div>
        </div>
      </div>
      <div v-if="this.speakername" class="speaker-single">

        <div class="row mt-5 justify-content-md-center">
          <div class="col-md-8 col-sm-12 text-center">
            <img v-if="!this.loadspeakername" v-bind:src="'https://res.cloudinary.com/oredev/image/upload/v1/e_grayscale/g_face,r_max,c_thumb,w_220,h_220/' + speaker.speakerImagePuId" alt="" />
            <div v-else>
              <c-spinner></c-spinner>
            </div>

            <h4 class="pink">{{this.speaker.speakerFirstName}} {{this.speaker.speakerLastName}}</h4>
            <p class="text-left">
              {{speaker.speakerBiography}}
            </p>
          </div>
        </div>

        <div v-for="session in this.speaker.speakerSession" v-bind:class="[setActiveSchedule(session.sId)]" class="row justify-content-md-center session">
          <div class="col-md-7 col-12 order-2 order-md-1 main">
            <div class="row">
              <div class="col-6 speaker">
                {{getDay(session.scheduleDay)}} {{session.scheduleTime}}
              </div>
              <div v-on:click="toggleText(session.sId)" class="col-12 session-info">
                <h5><span class="fold-icons"><i :data-id=session.sId class="material-icons hidden align-middle green">unfold_less</i><i :data-id=session.sId class="material-icons align-middle green">unfold_more</i></span> <span class="session-title">{{session.title}}</span></h5>
              </div>
            </div>
            <div :data-id=session.sId class="col-12 session-text hidden">
              <h6>Key takeaways</h6>
              <ul>
                <li v-if="session.takeAway1">{{session.takeAway1}}</li>
                <li v-if="session.takeAway2">{{session.takeAway2}}</li>
                <li v-if="session.takeAway3">{{session.takeAway3}}</li>
                <li v-if="session.takeAway4">{{session.takeAway4}}</li>
              </ul>
              <p>
                {{session.description}}
              </p>
              <div class="open-in-new">
                <a target="_blank" v-if="session.url" v-bind:href="'/sessions/' + session.url">
                  <i class="material-icons">open_in_new</i>
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-1 col-12 order-1 order-md-2 add-schedule"  v-on:click="setSchedule(session.sId, $event)">
            <i class="material-icons h2 align-middle add green">add_circle_outline</i>
            <i class="material-icons h2 align-middle remove pink">remove_circle_outline</i>
          </div>
        </div>
      </div>

      <div v-if="loadspeakers" class="row mt-5 justify-content-center">
        <c-spinner></c-spinner>
      </div>
      <div v-else class="row mt-5">
        <div v-bind:class="[setVisibleSpeakers(speaker.speakerSessionTags)]" class="col-lg-3 col-md-4 col-sm-6 col-xs-6 speaker-card text-center" v-for="speaker in speakers">
          <!--router-link v-bind:to="'/line-up/' + speaker.speakerURL"-->
          <router-link v-bind:to="{name: 'Lineup-single', params: {name: speaker.speakerURL}, query: {tags: $route.query.tags}}">
            <img v-if="speaker.speakerImagePuId" v-bind:src="'https://res.cloudinary.com/oredev/image/upload/v1/e_grayscale/g_face,r_max,c_thumb,w_220,h_220/' + speaker.speakerImagePuId" alt="" />
            <img v-else v-bind:src="'https://res.cloudinary.com/oredev/image/upload/e_grayscale/g_face,r_max,c_thumb,w_220,h_220/cfp/noimage'" alt="" />
            <div class="speaker-info">
              <p class="speaker-name text-center pink">{{speaker.speakerFirstName}} {{speaker.speakerLastName}}</p>
              <p class="speaker-company text-center">{{speaker.speakerCompany}}</p>
            </div>
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {tagsMixin} from '../mixins/tagsMixin'
  import Spinner from "./spinner/Spinner"


  export default {
    name: 'sessions',
    components: {
      'c-spinner':Spinner
    },
    watch:{
      '$route' (to, from){
        if (to.path != from.path) {
          $(".speaker-single").slideUp(200);
          this.loadspeakername = true;
          this.speakername = this.$route.params.name;
          this.getSpeaker();
        }

      }
    },
    data () {
      return {
        speakername: this.$route.params.name,
        speaker: {},
        speakers: [],
        schedule: [],
        day: '',
        loadspeakers: true,
        loadspeakername: true,
        doctitle: '',
        docimage:''
      }
    },
    created() {
      this.getSpeaker();
    },
    mixins: [tagsMixin],
    methods: {
      getSpeaker: function() {
        if (this.speakername) {
          this.axios.get('https://admin.oredev.org/plannedspeaker/' + this.speakername, {
            params: {
              //ID: 12345
            }
          })
          .then(response => {
            this.speaker = response.data.plannedspeakers[0];
            $(".speaker-single").slideDown(200);
            this.loadspeakername = false;
            this.setDocTags();
            return;
          })
          .catch(error => {
            console.log(error);
          });
        }
      },
      resetSpeaker: function() {
        $(".speaker-single").slideUp(200);
        this.loadspeakername = true;
        this.speaker = {};
        this.speakername = '';
        this.$router.push({path:'/line-up', params:{name:''}, query: {tags: this.$route.query.tags}})
        this.setDocTags();
      },
      setVisibleSpeakers: function(tags) {
        let show = false;
        let tagschoosen = this.tagschoosen;
        let containsTag = false;
        if (tagschoosen) {
          if (tags) {
            tags.forEach((tag) => {
              if (tagschoosen.some( element => this.fixTag(element) === tag)) {
                containsTag = true;
              }
            })
          }
        }
        if (containsTag) {
          show = true;
        }
        if (show) {
          return "show"
        }
        else {
          return "hidden"
        }
      },
      setActiveSchedule: function(id) {
        const selSchedule = this.schedule;

        let containsId = false;
        if (selSchedule) {
          containsId = selSchedule.some( element => element === id);
        }
        if (containsId) {
          return "active"
        }
      },
      fetchSpeakers: function () {
        let that = this;
        this.axios.get('https://admin.oredev.org/plannedspeakers/Øredev 2019', {
          params: {
            //ID: 12345
          }
        })
        .then(response => {
          let speakers = response.data.plannedspeakers.map(function(speaker) {
            if (speaker.speakerSessionTags) {
              speaker.speakerSessionTags = speaker.speakerSessionTags.map(function(tag) {
                tag = that.fixTag(tag);
                return tag;
              })
            }

            return speaker
          })
          this.speakers = speakers;
          that.loadspeakers = false;
        })
        .catch(error => {
          console.log(error);
        });

      },
      setStatusShowSpeaker: function() {
        if (this.tagschoosen.length === 0 && this.speakername) {
          this.status = "sessions"
        }
      },
      setDocTags: function() {
        this.doctitle = 'Line up - ' + this.$store.state.conferencename;
      }
    },
    updated: function() {
    },
    mounted:function(){
      this.status = localStorage.getItem('sessionstatus');
      this.day = localStorage.getItem('day');
      this.schedule = JSON.parse(localStorage.getItem('schedule'));
      this.setTagsChoosen();
      this.setStatusShowSpeaker();
      this.setDocTags();
    },
    beforeMount: function() {
      this.fetchSpeakers();
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .lineup .session .add-schedule i {
    @media (max-width: 767px) {
      margin-bottom: -10px;
    }
  }

  .open-in-new {
    text-align: right;
  }
</style>
