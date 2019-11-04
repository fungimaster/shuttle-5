<template>
  <div class="sessions-container my-schedule">
  <vue-headful
    :title="doctitle"

    />
    <!---------------------------- SESSIONS --------------------------------------->

    <div class="container">
      <div class="row mt-5 mb-5">
        <div class="col-12">
          <h1>Search result</h1>

        </div>
      </div>
      <div class="sessions">
        <div>

          <div v-if="loadsessions" class="row mt-5 justify-content-center">
            <c-spinner></c-spinner>
          </div>
          <div v-else>
            <div  v-for="session in sessions">
              <h2 v-if="session.showDay">{{session.showDay}}</h2>
              <div class="row session">
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
    name: 'search',
    components: {
      'c-spinner':Spinner,
      'c-map':Map
    },
    watch:{
      $route (to, from){
        //this.query = this.$route.params.query;
        //this.fetchSessions();
      }
    },
    data () {
      return {
        sessions: [],
        query: this.$route.params.query,
        day: '',
        loadsessions: true,
        doctitle: 'Search - ' + this.$store.state.conferencename
      }
    },
    //mixins: [tagsMixin],
    methods: {
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
          let query = that.query;
          query = query.toLowerCase();
          query = decodeURIComponent(query);
          query = query.split(' ');
          sessions = sessions.filter(function(s) {
            let title = s.sessionTitle.toLowerCase();
            return title.includes(that.query);
          })
          this.sessions = sessions;
          that.loadsessions = false;
          console.log(this.sessions);
        })
        .catch(error => {
          console.log(error);
        });

      }
    },
    updated: function() {
    },
    mounted:function(){
    },
    beforeMount: function() {
      this.fetchSessions();
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sessions-container.my-schedule .row.session {
  }
  .sessions-container.my-schedule .row.session {
  }
  .sessions-container.my-schedule .row.session.active {
    display:flex !important;
    opacity: 1;
}

  .no-my-schedule {
    margin: 10rem 0;
  }
  i.big {
    z-index: -1;
    position: absolute;
    font-size: 22rem;
    opacity: 0.2;
    line-height: 7rem;
    margin-left: -12rem;
  }

</style>
