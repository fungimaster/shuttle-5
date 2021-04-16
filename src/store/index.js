import Vue from "vue";
import Vuex from "vuex";



Vue.use(Vuex);

export default new Vuex.Store({

    state: {
      count: 0,
      clubs: null, 
      maproom: '',
      speaker: {},
      conferencename: 'Matchplay 2021',
      docimage: 'https://res.cloudinary.com/dn3hzwewp/image/upload/v1573118127/matchplay/matchplay-new-logo-2020.png',
      userInfo: "Logga in",
      token: null,
      user: null,
      userId: null
  
    },
    getters: {
        isAuthenticated(state) {
            return state.token !== null;
          },
        userId(state) {
            return state.userId 
        },
        user(state) {
            return state.user 
        },
        clubs(state) {
            return state.clubs 
        },

    },
    mutations: {
      SET_AUTHENTICATION: (state, { token, userId }) => {
        state.token = token
        state.userId = userId
      },
      SET_CLUBS: (state, payload) => {
        state.clubs = payload
      },
      SET_USER: (state, payload) => {
        state.user = payload
      },
      DELETE_USER: (state) => {
        state.user = null
      },
      DELETE_AUTH_DATA: (state) => {
        state.token = null
        state.userId = null
      },
    },
    actions: {
      deleteUserInfo: ({commit}) => {
        commit('DELETE_USER')
      },
      deleteAuthData: ({commit}) => {
        commit('DELETE_AUTH_DATA')
      },
      setAuthentication: ({commit}, {token, userId}) => {
        commit('SET_AUTHENTICATION', {token, userId})
      },
      setUser: ({commit}, payload) => {
        commit('SET_USER', payload)
      },
      setClubs: ({commit}, payload) => {
        commit('SET_CLUBS', payload)
      },
      tryAutoLogin: ({ commit }) => {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          return;
        }
        const userId = localStorage.getItem("userId");
        commit("SET_AUTHENTICATION", {
          token,
          userId
        });
      }
  
    }
  })
  