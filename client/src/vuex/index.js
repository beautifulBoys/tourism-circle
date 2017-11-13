import Vuex from 'vuex';
import Vue from 'vue';
import box from './box.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    box
  }
});

export default store;
