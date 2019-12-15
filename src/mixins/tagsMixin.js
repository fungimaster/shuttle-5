export const tagsMixin = {
  data() {
    return {
      revertmyschedule: '',
      myscheduleid: '',
      tags: {},
      tagschoosen: [],
      status: '',
      loadtags: true,
      schedule: [],
      schedulecount: 0,
      showRoom: '',
      day: '',
      firstname:'Logga in'
    }
  },
  methods: {
    revertSchedule: function() {
      localStorage.setItem('myscheduleid', this.revertmyschedule);
      this.myscheduleid = this.revertmyschedule;
      this.revertmyschedule = '';
      localStorage.setItem('revertmyschedule', '');
      this.$router.push({name: 'MySchedule-id', params:{id:this.myscheduleid}});
      this.getSchedule();

    },
    getSchedule: function(revert) {
      let that = this;
      let lookupid = false;
      const nochange = this.$route.query.nochange;
      if(localStorage.getItem('revertmyschedule')) {
        this.revertmyschedule = localStorage.getItem('revertmyschedule');
      }

      if(revert) {
        lookupid = revert;
        this.myscheduleid = revert;
      }

      else if(!localStorage.getItem('revertmyschedule') && nochange === 'true' && localStorage.getItem('myscheduleid') != "" && (localStorage.getItem('myscheduleid') != this.$route.params.id)){
        this.revertmyschedule = localStorage.getItem('myscheduleid');
        localStorage.setItem('revertmyschedule', this.revertmyschedule);
        localStorage.setItem('myscheduleid', '');
        this.myscheduleid = '';
        lookupid = this.$route.params.id

      }

      else if(this.$route.params.id && nochange === 'true') {
        lookupid = this.$route.params.id;
        this.myscheduleid = '';
        localStorage.setItem('myscheduleid', '');
      }
      else if(this.$route.params.id) {
        lookupid = this.$route.params.id;

        this.myscheduleid = this.$route.params.id;
        localStorage.setItem('myscheduleid', this.$route.params.id);
        this.fetchSessions();
      }
      else if(localStorage.getItem('myscheduleid')) {
        lookupid = localStorage.getItem('myscheduleid');
        this.myscheduleid = localStorage.getItem('myscheduleid');
      }
      else if (!this.$route.params.id) {
        lookupid = false;
        return false
      }
      this.axios.get('https://admin.oredev.org/myschedule/' + lookupid)
      .then(response => {
        localStorage.setItem('schedule', JSON.stringify(response.data.schedules[0].sessions));
        this.schedule = response.data.schedules[0].sessions;
        this.schedulecount = this.schedule.length;
        that.$store.dispatch('counterUpdate', {count:that.schedulecount});
        that.loadsessions = false;
        return;
      })
      .catch(error => {
        console.log(error);
      });
    },
    updateSchedule: function() {
      if (!localStorage.getItem('myscheduleid')) {
       return false;
      }
      this.myscheduleid = localStorage.getItem('myscheduleid');
      this.axios.post('https://admin.oredev.org/methods/updateSchedule', {
        sessions: JSON.parse(localStorage.getItem('schedule')),
        scheduleid: this.myscheduleid
      })
      .then(function (response) {
        if(!localStorage.getItem('myscheduleid')) {
         localStorage.setItem('myscheduleid', response.data.id);
        }

      })
      .catch(function (error) {
        console.log(error);
      });

    },
    setUrlHasch: function(trigger) {
      let tagschoosen;

      // select all on first visit
      if (localStorage.getItem('tagschoosen') === null) {
        if (!this.$route.query.tags) {
          this.selectAllTags()
          this.setStatus('sessions')
        }
      }
      tagschoosen = JSON.parse(localStorage.getItem('tagschoosen'))

      let day = 'day3';
      if (!localStorage.getItem('day')) {
        localStorage.setItem('day', day);
        this.day = day;
      }

      if (trigger === "mounted" && this.$route.query.tags) {
        if (this.$route.query.day) {
          day = this.$route.query.day
          localStorage.setItem('day', day)
          this.day = day;
        }
        if (this.$route.query.tags) {
          let tagsArr = this.$route.query.tags.split("_");
          if (this.tags.filter) {
            this.tagschoosen = this.tags.filter((e) => {
              return tagsArr.includes(e.fixed)
            })
          }
          localStorage.setItem('tagschoosen', JSON.stringify(this.tagschoosen));
          this.setStatus('sessions')
        }
      }

      else {
        if (localStorage.getItem('day')) {
          day = localStorage.getItem('day');
          this.day = day;
        }

        if (tagschoosen) {
          let fixedTags = []
          fixedTags = tagschoosen.map((tag) => {
            return tag.fixed
          })
          this.$router.push({ path: this.$route.path, query: { tags: fixedTags.join("_"), day: day } })
        }
        else {
          this.$router.push({ path: this.$route.path, query: { tags: '', day: day } })
        }
      }



    },
    setTag: function (eventObj) {
      // `this` inside methods points to the Vue instance
      // `event` is the native DOM event
      //event = this.fixTag(event);
      let event = {};
      if (typeof (eventObj) === "string") {
        event.org = eventObj;
        event.fixed = this.fixTag(eventObj);
      }
      else if (typeof (eventObj) === "object") {
        event.org = eventObj.org;
        event.fixed = eventObj.fixed;
      }


      if (event) {
        if (this.tagschoosen.length > 0) {
          var a = [];
          a = JSON.parse(localStorage.getItem('tagschoosen'));
          const exists = a.find(function (e) {
            return e.org === event.org
          })
          if (exists) {
            a = a.filter(function (value, index, self) {
              return value.org != event.org;
            });
          }
          else {
            a.push(event);
            a = a.filter(function (value, index, self) {
              return self.indexOf(value) === index;
            });
          }
          localStorage.setItem('tagschoosen', JSON.stringify(a));
        }
        else {
          var a = [];
          a.push(event);
          localStorage.setItem('tagschoosen', JSON.stringify(a));
        }
      }
      this.tagschoosen = a;
      if (this.tagschoosen.length === 0) {
        this.setStatus('tags');
      }
      this.setUrlHasch("tag");
    },
    deselectAllTags: function () {
      localStorage.setItem('tagschoosen', []);
      this.tagschoosen = [];
      this.setUrlHasch("none");
    },
    selectAllTags: function () {
      localStorage.setItem('tagschoosen', JSON.stringify(this.tags));
      this.tagschoosen = this.tags;
      this.setUrlHasch("all");
    },
    setActiveTag: function (tag) {
      //tag = this.fixTag(tag);
      const selTags = this.tagschoosen;
      const containsTag = selTags.some(element => element.org === tag.org);
      if (containsTag) {
        return "active"
      }
    },
    setActiveNext: function () {
      if (this.tagschoosen.length === 0) {
        return "disabled"
      }
    },
    setTagsChoosen: function () {
      if (localStorage.getItem('tagschoosen')) {
        var tagschoosen = [];
        tagschoosen = JSON.parse(localStorage.getItem('tagschoosen'));
        this.tagschoosen = tagschoosen;
      }
    },
    setStatus: function (status) {
      localStorage.setItem('sessionstatus', status);
      this.status = status;
    },
    fetchTags: function () {
      let that = this;
      this.axios.get('https://admin.oredev.org/plannedtags/Øredev 2019', {
        params: {
          //ID: 12345
        }
      })
        .then(response => {

          this.tags = response.data.map(function (tag) {
            let e = {}
            e.org = tag;
            e.fixed = that.fixTag(tag)
            return e;
          });
          this.loadtags = false;
          this.setUrlHasch("mounted");

        })
        .catch(error => {
          console.log(error);
        });
    },
    fixTag: function (tagObj) {
      let tag = ''
      if (tagObj.org) {
        tag = tagObj.org;
      }
      else {
        tag = tagObj;
      }
      tag = tag.replace(/\./g, '');
      tag = tag.replace(/ & /g, '-');
      tag = tag.replace(/ /g, '-');
      tag = tag.replace(/#/g, ' ');
      return tag
    },
    getDay: function (day) {
      switch (day) {
        case "0":
          day = "Sunday";
          break;
        case "1":
          day = "Monday";
          break;
        case "2":
          day = "Tuesday";
          break;
        case "3":
          day = "Wednesday";
          break;
        case "4":
          day = "Thursday";
          break;
        case "5":
          day = "Friday";
          break;
        case "6":
          day = "Saturday";
      }
      return day;
    },
    showSpeaker: function (speaker) {
      //this.showSpeaker = speaker;
      if (speaker) {
        this.axios.get('https://admin.oredev.org/plannedspeaker/' + speaker, {
          params: {
            //ID: 12345
          }
        })
          .then(response => {
            this.$store.dispatch('speakerUpdate', { speaker: response.data.plannedspeakers[0] });
            this.$root.$emit('bv::show::modal', 'speaker', '#btnShow')

            return;
          })
          .catch(error => {
            console.log(error);
          });
      }



      //this.$store.dispatch('speakerUpdate', {speaker:speaker});
      //this.$root.$emit('bv::show::modal', 'speaker', '#btnShow')
    },
    showMap: function (room) {
      this.showRoom = room;
      this.$store.dispatch('maproomUpdate', { room: room });
      this.$root.$emit('bv::show::modal', 'map', '#btnShow')
    },
    setSchedule: function (id, event) {
      if (id) {
        if (localStorage.getItem('schedule')) {
          var a = [];
          a = JSON.parse(localStorage.getItem('schedule'));
          const exists = a.find(function (e) {
            return e === id
          })

          if (exists) {
            a = a.filter(function (value, index, self) {
              return value != id;
            });
          }
          else {
            a.push(id);
            a = a.filter(function (value, index, self) {
              return self.indexOf(value) === index;
            });
          }
          localStorage.setItem('schedule', JSON.stringify(a));
        }
        else {
          var a = [];
          a.push(id);
          localStorage.setItem('schedule', JSON.stringify(a));
        }
        this.schedule = a;
        this.schedulecount = this.schedule.length;

        const counterPos = $('.my-count').offset();
        const eventPos = $(event.target).offset();
        const that = this;
        $(event.target).clone().prependTo('body').css({ position: 'absolute', top: eventPos.top, left: eventPos.left }).removeClass('remove add').animate({ top: counterPos.top, left: counterPos.left }, 500, function () {
          $(this).remove();
          $(".my-count").animate({ width: '100px', height: '100px', fontSize: '4rem', lineHeight: '5.5rem' }).animate({ width: '30px', height: '30px', fontSize: '1.1rem', lineHeight: '1.6rem' });
          that.$store.dispatch('counterUpdate', { count: that.schedulecount });
        });
        this.updateSchedule();
      }
    },
    setActiveSchedule: function (id) {
      const selSchedule = this.schedule;

      let containsId = false;
      if (selSchedule) {
        containsId = selSchedule.some(element => element === id);
      }
      if (containsId) {
        return "active"
      }
    },
    toggleText: function (id) {
      $('div[data-id="' + id + '"]').toggle(100).removeClass('hidden');
      $('i[data-id="' + id + '"]').toggle().removeClass('hidden');
    },
  },
  mounted: function () {
    if (localStorage.getItem('schedule')) {
      this.schedule = JSON.parse(localStorage.getItem('schedule'));
    }
    this.schedulecount = this.schedule.length;
    this.$store.dispatch('counterUpdate', {count:this.schedule.length});
    //console.log("MIXIN MOUNTED")
   

    

  },
  beforeMount: function () {
    if (this.$route.name === "Lineup" || this.$route.name === "Sessions") {
      this.fetchTags();
    }

  }
}
