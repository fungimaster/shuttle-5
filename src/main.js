// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import BootstrapVue from "bootstrap-vue";
import vueHeadful from 'vue-headful';
import store from './store/index'


//global variable
Vue.prototype.$username = 'Logga in'

import App from './App';
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

export const globalState = new Vue({
  data: {
    admin_url: 'https://admin.matchplay.se/methods/',
    compid: 'sFAc3dvrn2P9pXHAz',
    closed: false
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
  computed: mapState(['count']),
  methods: {
    increment() {
      this.$store.dispatch('incrementAsync');
    },
    decrement() {
      this.$store.commit('decrement');
    },
    testAction() {
      this.$store.dispatch('actionA').then(() => {

      })
    }
  },
  template: '<App/>',
  components: { App }
})
