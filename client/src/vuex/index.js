import Vuex from 'vuex';
import Vue from 'vue';
import box from './box.js';
import box1 from './box1.js';
import websitChat from './websit_chat.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    box,
    box1,
    websitChat
  }
});
