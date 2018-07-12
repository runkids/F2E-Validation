import Vue from 'vue';
import Vuex from 'vuex';
import signUp from './modules/signUp';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    signUp,
  },
});
