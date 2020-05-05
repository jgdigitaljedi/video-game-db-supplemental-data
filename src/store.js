import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snack: { status: '', txt: '' },
    currentName: '',
    gameFullData: false
  },
  mutations: {
    setSnack(state, snack) {
      state.snack = snack;
    },
    setCurrentName(state, name) {
      state.currentName = name;
    },
    setGameFullData(state, fullData) {
      state.gameFullData = fullData;
    }
  },
  actions: {}
});
