import Vuex from 'vuex';
import Vue from 'vue';
import posting from './posting.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    posting
  }
});
