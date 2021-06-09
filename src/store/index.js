import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    clubs: null,
    companies: null,
    maproom: "",
    speaker: {},
    conferencename: "Matchplay 2021",
    docimage:
      "https://res.cloudinary.com/dn3hzwewp/image/upload/v1573118127/matchplay/matchplay-new-logo-2020.png",
    userInfo: "Logga in",
    token: null,
    user: null,
    userId: null,
    games1: [],
    games2: [],
    games3: [],
    clublogosurl: null,
    images: null
  },
  getters: {
    getAllImages(state) {
      return state.images
    },
    isAuthenticated(state) {
      return state.token !== null;
    },
    getClubLogosUrls(state) {
      return state.clublogosurl
    },
    getGames1(state) {
      return state.games1;
    },
    getGames2(state) {
      return state.games2;
    },
    getGames3(state) {
      return state.games3;
    },
    numberOfGames3(state) {
      return state.games3.length;
    },
    userId(state) {
      return state.userId;
    },
    user(state) {
      return state.user;
    },
    clubs(state) {
      return state.clubs;
    },
    companies(state) {
      return state.companies;
    },
    isDefeated(state) {
      if (state.user && state.user.teams) {
        let status = state.user.teams[0].status;
        if (status === "Defeated") {
          return true;
        }
        return false;
      }
      return false;
    },
  },
  mutations: {
    SET_AUTHENTICATION: (state, { token, userId }) => {
      state.token = token;
      state.userId = userId;
    },
    SET_CLUBS: (state, payload) => {
      state.clubs = payload;
    },
    SET_COMPANIES: (state, payload) => {
      state.companies = payload;
    },
    //live
    SET_GAMES1: (state, payload) => {
      state.games1 = payload;
    },
    //upcmoing games
    SET_GAMES2: (state, payload) => {
      state.games2 = payload;
    },
    //played matches
    SET_GAMES3: (state, payload) => {
      state.games3 = payload;
    },
    SET_ALL_IMAGES: (state, payload) => {
      state.images = payload;
    },
    SET_USER: (state, payload) => {
      state.user = payload;
    },
    DELETE_USER: (state) => {
      state.user = null;
    },
    DELETE_AUTH_DATA: (state) => {
      state.token = null;
      state.userId = null;
    },
    SET_CLUBLOGOSURL: (state, payload) => {
      state.clublogosurl = payload;
    },
  },
  actions: {
    setClubsLogourl: ({ commit }, payload) => {
      commit("SET_CLUBLOGOSURL", payload);
    },
    deleteUserInfo: ({ commit }) => {
      commit("DELETE_USER");
    },
    deleteAuthData: ({ commit }) => {
      commit("DELETE_AUTH_DATA");
    },
    setAuthentication: ({ commit }, { token, userId }) => {
      commit("SET_AUTHENTICATION", { token, userId });
    },
    setClubs: ({ commit }, payload) => {
      commit("SET_CLUBS", payload);
    },
    setCompanies: ({ commit }, payload) => {
      commit("SET_COMPANIES", payload);
    },
    //live matches
    setGames1: ({ commit }, payload) => {
      commit("SET_GAMES1", payload);
    },
    setGames2: ({ commit }, payload) => {
      commit("SET_GAMES2", payload);
    },
    //played matches
    setGames3: ({ commit }, payload) => {
      commit("SET_GAMES3", payload);
    },
    setAllImages: ({ commit }, payload) => {
      commit("SET_ALL_IMAGES", payload);
    },
    setUser: ({ commit }, payload) => {
      commit("SET_USER", payload);
    },
    tryAutoLogin: ({ commit }) => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        return;
      }
      const userId = localStorage.getItem("userId");
      commit("SET_AUTHENTICATION", {
        token,
        userId,
      });
    },
  },
});
