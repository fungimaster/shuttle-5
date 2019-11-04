<template>
  <div class="sessions-container my-schedule">
    <vue-headful
    :title="doctitle"

    />
    <!---------------------------- SESSIONS --------------------------------------->

    <div class="container">
      <div class="row mt-5 mb-5">
        <div class="col-12">
          <h1>My schedule</h1>
          <div v-if="schedulecount > 0">
            <a class="green-bg btn text-white" v-if="!this.myscheduleid"  v-b-modal.saveschedule><i class="material-icons align-middle">cloud_upload</i> Save my schedule</a>
            <a class="green-bg btn text-white" v-if="this.revertmyschedule != ''"  v-on:click="revertSchedule()""><i class="material-icons align-middle">cloud_download</i> Revert to my schedule</a>
          </div>
        </div>
      </div>
      <div class="sessions">
        <div v-if="schedulecount === 0" class="row justify-content-center no-my-schedule">
          <div class="text-center">
            <i class="material-icons h2 align-middle add green big">add_circle_outline</i>
            <h2>Oops!</h2>
            <p>
              Looks like you didn't add any sessions to your schedule yet, but don't worry,<br>just go to <b-link to="/sessions">Sessions</b-link> and use the <i class="material-icons h2 align-middle add green">add_circle_outline</i> to get started!
            </p>
          </div>

        </div>
        <div v-else>

          <div v-if="loadsessions" class="row mt-5 justify-content-center">
            <c-spinner></c-spinner>
          </div>
          <div v-else>
            <div  v-for="session in mySessions">
              <h2 v-if="session.showDay">{{session.showDay}}</h2>
              <div v-bind:class="[setVisibleSchedule(session.sessionTagMain, session.sessionTags, session.sessionScheduleDay), setActiveSchedule(session._id), session.sessionTagMain, session.sessionTags, 'day'+session.sessionScheduleDay]" class="row session">
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
    <b-modal fluid centered size="md" ref="speaker" id="saveschedule" class="" title="Save my schedule" hide-footer>
    <div v-if="!this.myscheduleid">
     <b-form @submit="saveSchedule">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="You will receive an email with a link to your schedule"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        >
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
     </div>
     <div v-if="this.myscheduleid">
       <strong>Thanks for saving your schedule</strong>
       <p>Please have a look in your inbox.</p>
     </div>
    </b-modal>
  </div>
</template>

<script>
  import {tagsMixin} from '../mixins/tagsMixin';
  import Spinner from "./spinner/Spinner";
  import Map from "./map/Map";

  export default {
    name: 'myschedule',
    components: {
      'c-spinner':Spinner,
      'c-map':Map
    },
    watch:{
      '$route' (to, from){
        if (to.path != from.path) {
          this.myscheduleid = this.$route.params.id;
          this.getSchedule();
        }

      }
    },
    data () {
      return {
        form: {
          email: ''
        },
        sessions: [],
        mySessions: [],
        day: '',
        loadsessions: true,
        doctitle: 'My Schedule - ' + this.$store.state.conferencename,
      }
    },
    created() {
      this.getSchedule();
    },
    mixins: [tagsMixin],
    methods: {
      shareSchedule: function(url) {
        var dummy = document.createElement("input");
        document.body.appendChild(dummy);

        dummy.setAttribute("id", "dummy_id");
        document.getElementById("dummy_id").value=url;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
      },
      saveSchedule: function(evt) {
        evt.preventDefault()
        
        if(!this.form.email) {
          return false;
        }
        let that = this;

        this.axios.post('https://admin.oredev.org/methods/createSchedule', {
          sessions: JSON.parse(localStorage.getItem('schedule')),
          email: this.form.email
        })
        .then(function (response) {
          if(!localStorage.getItem('myscheduleid')) {
           localStorage.setItem('myscheduleid', response.data.id);
           that.myscheduleid = response.data.id;

          }
        })
        .catch(function (error) {
          console.log(error);
        });

      },
      setVisibleSchedule: function(tag, tags, day) {
        let show = false;
        let tagschoosen = this.tagschoosen;

        let containsTag = false;
        if (tagschoosen) {
          containsTag = tagschoosen.some( element => element === tag);
        }
        if (tags && !containsTag) {
          tags.forEach((tag) => {
            if (tagschoosen.some( element => element === tag)) {
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
        localStorage.setItem('day', day);
        this.day = day;
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
          this.fetchMySessions();

          that.loadsessions = false;
        })
        .catch(error => {
          console.log(error);
        });

      },
      fetchMySessions: function () {
        let mySessionsTmp = this.sessions.filter(session => {
          return this.schedule.includes(session._id);
        });

        mySessionsTmp.map(function(session, i, arr) {

          if (i === 0) {
            session.showDay = this.getDay(session.sessionScheduleDay)
            return session;
          }
          else if (session.sessionScheduleDay != arr[i-1].sessionScheduleDay) {
            session.showDay = this.getDay(session.sessionScheduleDay)
            return session;
          }
          else {
            return session;
          }
        }, this)
        this.mySessions = mySessionsTmp;

      }
    },
    updated: function() {
    },
    mounted:function(){
      this.status = localStorage.getItem('sessionstatus');
      this.day = localStorage.getItem('day');
      this.setTagsChoosen();
    },
    beforeMount: function() {
      this.fetchSessions();
      this.getSchedule();
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sessions-container.my-schedule .row.session {
    display: none !important;
  }
  .sessions-container.my-schedule .row.session {
    opacity: 0.3;
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
    margin-left: -11rem;
  }

</style>
