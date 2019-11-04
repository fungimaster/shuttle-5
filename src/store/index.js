import Vue from "vue";
import Vuex from "vuex";



Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 20
    },
    mutations: {
        increment (state) {
            state.count++
        },
        decrement (state) {
            state.count--
        }
    },
    actions: {
        increment (context) {
            context.commit('increment')
        }
    }
})
