import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snack: { status: '', txt: '' },
    currentName: ''
  },
  mutations: {
    setSnack(state, snack) {
      state.snack = snack;
    },
    setCurrentName(state, name) {
      state.currentName = name;
    }
  },
  actions: {}
});
