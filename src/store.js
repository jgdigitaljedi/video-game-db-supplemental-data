import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snack: { status: '', txt: '' }
  },
  mutations: {
    setSnack(state, snack) {
      console.log('snack', snack);
      state.snack = snack;
    }
  },
  actions: {}
});
