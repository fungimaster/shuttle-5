<template>
  <div class="sessions-container">
  <vue-headful :title="doctitle"/>
    <div v-if="this.sessionname" class="session-single container mb-5">
      <div class="row mt-5 justify-content-md-center">
        <div class="col-md-8 col-sm-12 text-center">
          <h1 class="mt-3 mb-3">{{this.session.sessionTitle}}</h1>
          <div class="text-left session-text">
            <h5>Key takeaways</h5>
            <ul>
              <li v-if="session.sessionKeyTakeAway1">{{session.sessionKeyTakeAway1}}</li>
              <li v-if="session.sessionKeyTakeAway2">{{session.sessionKeyTakeAway2}}</li>
              <li v-if="session.sessionKeyTakeAway3">{{session.sessionKeyTakeAway3}}</li>
              <li v-if="session.sessionKeyTakeAway4">{{session.sessionKeyTakeAway4}}</li>
            </ul>
            <p>
              {{session.sessionDescription}}
            </p>
          </div>
          <a v-if="session.sessionSpeakerURL" v-bind:href="'/line-up/' + session.sessionSpeakerURL">
            <img class="mt-4" v-if="session.sessionSpeakerImagePuId" v-bind:src="'https://res.cloudinary.com/oredev/image/upload/v1/e_grayscale/g_face,r_max,c_thumb,w_220,h_220/' + session.sessionSpeakerImagePuId" alt="" />
          </a>
          <h5 class="mt-4"><a v-if="session.sessionSpeakerURL" v-bind:href="'/line-up/' + session.sessionSpeakerURL">{{this.session.sessionSpeakerName}}</a></h5>
        </div>
      </div>
    </div>
    <div v-if="this.status != 'sessions'" class="container tags-container">
      <h1>Sharpen your skills. Explore</h1>
      <h5>Pick your topics of interest below</h5>
      <div v-if="loadtags" class="row justify-content-center loading-tags">
        <c-spinner></c-spinner>
      </div>
      <div v-else>
        <div class="row">
          <div class="col-12 text-right select-all">
            <span class="select" v-if="this.tags.length !== this.tagschoosen.length" v-on:click="selectAllTags()">
              Select all
            </span>
            <span  v-if="this.tagschoosen.length > 0 && this.tags.length !== this.tagschoosen.length"> | </span>
            <span class="select" v-if="this.tagschoosen.length > 0" v-on:click="deselectAllTags()">
              Deselect all
            </span>
          </div>
          <div class="tags row col-12">
            <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6" v-for="tag in tags">
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
        </div>
      </div>
      <div class="row">
        <div class="col-12 days">
          <ul class="workshop">
            <li><span v-on:click="setDay('day2')" v-bind:class="setActiveDay('day2')" id="DayLink-2" class="h2" role="button">Tuesday</span></li>
            <li class="session-type">Workshop</li>
          </ul>
          <ul class="conference">
            <li><span v-on:click="setDay('day3')" v-bind:class="setActiveDay('day3')" id="DayLink-3" class="h2" role="button">Wednesday</span></li>
            <li><span v-on:click="setDay('day4')" v-bind:class="setActiveDay('day4')" id="DayLink-4" class="h2" role="button">Thursday</span></li>
            <li><span v-on:click="setDay('day5')" v-bind:class="setActiveDay('day5')" id="DayLink-5" class="h2" role="button">Friday</span></li>
            <li class="session-type">Conference</li>
          </ul>

        </div>
      </div>
      <div class="sessions row">
        <div v-if="loadsessions" class="col-12 mt-5 justify-content-center text-center">
          <c-spinner></c-spinner>
        </div>
        <div v-else class="container">
          <div v-bind:class="[setVisibleSchedule(session.sessionTagMain, session.sessionTags, session.sessionScheduleDay), setActiveSchedule(session._id), session.sessionTagMain, session.sessionTags, 'day'+session.sessionScheduleDay]" class="row session" v-for="session in sessions">
            <div class="col-md-2 col-10 order-1 order-md-1  time">
              <h2>{{session.sessionScheduleTime}}</h2>
            </div>
            <div class="col-md-9 col-12 order-12 order-md-2 main">
              <div class="row">
                <div class="col-8 speaker" v-on:click="showSpeaker(session.sessionSpeakerURL)">
                  <i class="material-icons align-middle green">person</i> {{session.sessionSpeakerName}}
                </div>
                <div class="col-4 text-right room" v-on:click="showMap(session.sessionScheduleRoom)">
                  {{session.sessionScheduleRoom}} <i class="material-icons align-middle green">place</i>
                </div>
                <div v-on:click="toggleText(session._id)" class="col-12 session-info">
                  <h5><span class="fold-icons"><i :data-id=session._id class="material-icons hidden align-middle green">unfold_less</i><i :data-id=session._id class="material-icons align-middle green">unfold_more</i></span> <span class="session-title">{{session.sessionTitle}}</span></h5>

                </div>
              </div>
              <div :data-id=session._id class="col-md-12 session-text hidden">
                <h6>Key takeaways</h6>
                <ul>
                  <li v-if="session.sessionKeyTakeAway1">{{session.sessionKeyTakeAway1}}</li>
                  <li v-if="session.sessionKeyTakeAway2">{{session.sessionKeyTakeAway2}}</li>
                  <li v-if="session.sessionKeyTakeAway3">{{session.sessionKeyTakeAway3}}</li>
                  <li v-if="session.sessionKeyTakeAway4">{{session.sessionKeyTakeAway4}}</li>
                </ul>
                <p>
                  {{session.sessionDescription}}
                </p>
                <div class="open-in-new">
                  <a target="_blank" v-if="session.sessionURL" v-bind:href="'/sessions/' + session.sessionURL">
                    <i class="material-icons">open_in_new</i>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-1 col-2 order-2 order-md-3 add-schedule text-sm-right" v-on:click="setSchedule(session._id, $event)">
              <i class="material-icons h2 align-middle add green">add_circle_outline</i>
              <i class="material-icons h2 align-middle remove pink">remove_circle_outline</i>
            </div>
          </div>
        </div>
      </div>

    </div>

    <c-map></c-map>
  </div>
</template>

<script>
  import {tagsMixin} from '../mixins/tagsMixin';
  import Spinner from "./spinner/Spinner";
  import Map from "./map/Map";

  export default {
    name: 'sessions',
    components: {
      'c-spinner':Spinner,
      'c-map':Map
    },
    watch:{
      $route (to, from){
        console.log("route");
        this.sessionname = this.$route.params.name;
        console.log(this.sessionname);
        this.getSession();
      }
    },
    data () {
      return {
        sessions: [],
        loadsessions: true,
        doctitle: 'Sessions - ' + this.$store.state.conferencename,
        sessionname: this.$route.params.name,
        session: {},
      }
    },
     created() {
      this.getSession();
    },
    mixins: [tagsMixin],
    methods: {
      getSession: function() {
        if (this.sessionname) {
          this.axios.get('https://admin.oredev.org/plannedsession/' + this.sessionname, {
            params: {
              //ID: 12345
            }
          })
          .then(response => {
            this.session = response.data.plannedsessions[0];
            console.log(this.session)
            //$(".speaker-single").slideDown(200);
            //this.loadspeakername = false;
            //this.setDocTags();
            return;
          })
          .catch(error => {
            console.log(error);
          });
        }
      },
      setVisibleSchedule: function(tag, tags, day) {
        let show = false;
        let tagschoosen = this.tagschoosen;

        let containsTag = false;
        if (tagschoosen) {
          containsTag = tagschoosen.some( element => this.fixTag(element) === tag);
        }

        if (tags && !containsTag) {
          tags.forEach((tag) => {
            if (tagschoosen.some( element => this.fixTag(element) === this.fixTag(tag))) {
              containsTag = true;
            }
          })
        }
        if (containsTag && this.day === 'day' + day) {
          show = true;
        }
        if (show) {
          return "show"
        }
        else {
          return "hidden"
        }
      },
      setDay: function(day) {
        if (!day) {
          day = "day3"
        }
        localStorage.setItem('day', day);
        this.day = day;
        this.setUrlHasch("day");
      },
      setActiveDay: function(day) {
        const selDay = this.day;
        if (day === selDay) {
          return "active"
        }
      },
      fetchSessions: function () {
        let that = this;
        this.axios.get('https://admin.oredev.org/plannedschedules/Øredev 2019', {
          params: {
            //ID: 12345
          }
        })
        .then(response => {
          let sessions = response.data.plannedsessions.map(function(session) {
            if (session.sessionTags) {
              session.sessionTags = session.sessionTags.map(function(tag) {
                tag = that.fixTag(tag);
                return tag;
              })
            }

            session.sessionTagMain = that.fixTag(session.sessionTagMain);
            return session
          })
          this.sessions = sessions;
          that.loadsessions = false;
        })
        .catch(error => {
          console.log(error);
        });

      }
    },
    updated: function() {
    },
    mounted:function(){
      this.status = localStorage.getItem('sessionstatus');
      this.day = localStorage.getItem('day');
      this.setTagsChoosen();
      //this.setDay(this.$route.hash.replace("#", ""));
    },
    beforeMount: function() {
      this.fetchSessions();
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .open-in-new {
    text-align: right;
  }
</style>
