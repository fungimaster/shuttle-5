// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import BootstrapVue from "bootstrap-vue";
import vueHeadful from 'vue-headful';
import store from './store/index'
import NProgress from 'vue-nprogress'



//global variable
Vue.prototype.$username = 'Logga in'

import App from './App';
import axios from "axios";

window.$ = require('jquery')
window.JQuery = require('jquery')

import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueEllipseProgress from 'vue-ellipse-progress';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.prototype.axios = axios;

Vue.use(Vuex);
Vue.use(NProgress)
Vue.use(VueEllipseProgress);
 
const nprogress = new NProgress()

Vue.component('vue-headful', vueHeadful);

export const globalState = new Vue({
  data: {
    admin_url: 'https://eu-central-1.aws.data.mongodb-api.com/app/application-0-yrdjw/endpoint/',  
  }
})


/* eslint-disable no-new */
import { mapState, mapMutations } from 'vuex';

new Vue({
  el: '#app',
  store,
  router,
  nprogress,
  computed: mapState(['count']),
  template: '<App/>',
  components: { App }
})


