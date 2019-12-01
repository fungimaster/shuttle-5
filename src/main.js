// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import BootstrapVue from "bootstrap-vue";
import vueHeadful from 'vue-headful';

//global variable
Vue.prototype.$username = 'Logga in'

import App from './App';
//import store from "./store";
import axios from "axios";

window.$ = require('jquery')
window.JQuery = require('jquery')

import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.prototype.axios = axios;

Vue.use(Vuex);

Vue.component('vue-headful', vueHeadful);

const store = new Vuex.Store({
    state: {
        count: 0,
        maproom: '',
        speaker: {},
        conferencename: 'Matchplay 2020',
        docimage: 'https://res.cloudinary.com/dn3hzwewp/image/upload/v1573118127/matchplay/matchplay-new-logo-2020.png'
    },
    getters: {
      //total: state => state.count
    },
    mutations: {
        counterUpdate (state, payload) {
          state.count = payload.count
        },
        speakerUpdate (state, payload) {
          state.speaker = payload.speaker
        },
        maproomUpdate (state, payload) {
          state.maproom = payload.room
        }
    },
    actions: {
      counterUpdate (context, payload) {
          context.commit('counterUpdate', payload)
      },
      speakerUpdate (context, payload) {
          context.commit('speakerUpdate', payload)
      },
      maproomUpdate (context, payload) {
          context.commit('maproomUpdate', payload)
      }
    }
})

/* eslint-disable no-new */
import { mapState, mapMutations } from 'vuex';

new Vue({
  el: '#app',
  store,
  router,
  data: {
    },
  computed: mapState([ 'count' ]),
  methods: {
    increment () {
        this.$store.dispatch('incrementAsync');
    },
    decrement () {
        this.$store.commit('decrement');
    },
    testAction () {
        this.$store.dispatch('actionA').then(() => {

        })
    }
},
  template: '<App/>',
  components: { App }
})
