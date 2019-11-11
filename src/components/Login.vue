<template>
  <div class="sessions-container my-schedule">
    <vue-headful
    :title="doctitle"

    />
    <!---------------------------- SESSIONS --------------------------------------->

    <div class="container">
    
       <b-row class="mb-5 mt-5">
         
              <b-col md="1" class="">
               
              </b-col>
               <b-col md="10" class="">
                 <h2 class="teaser-header orange">Logga in</h2>
                 <br>
               <form action="/action_page.php">
  <div class="form-group">
    <label for="email">E-post</label>
    <input type="email" class="form-control" id="email">
  </div>
  <div class="form-group">
    <label for="pwd">Lösenord:</label>
    <input type="password" class="form-control" id="pwd">
  </div>
  <div class="form-group form-check">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox"> Kom ihåg mig
    </label>
  </div>
  <button type="submit" class="btn btn-primary">Logga in</button>
</form>
              </b-col>
              <b-col md="1" class="">
                  
              </b-col>
            </b-row>

    </div>
    
    
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
