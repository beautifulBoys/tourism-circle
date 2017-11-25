import Vuex from 'vuex';
import Vue from 'vue';
import box from './box.js';
import box1 from './box1.js';
import sitChat from './sit_chat.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    box,
    box1,
    sitChat
  }
});

export default store;
