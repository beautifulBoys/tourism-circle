import Vuex from 'vuex';
import Vue from 'vue';
import box from './box.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    box
  }
});
