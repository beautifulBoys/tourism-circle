import Vuex from 'vuex';
import Vue from 'vue';
import box from './box.js';
import box1 from './box1.js';
import box2 from './box2.js';
import websitChat from './websit_chat.js';
import login from './login.js';
import userMain from './user_main.js';
import chat from './chat.js';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: {
    userInfo: {
      userId: '',
      passport: '',
      username: ''
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo.userId = obj.userId;
      state.userInfo.passport = obj.passport;
      state.userInfo.username = obj.username;
    },
    changeList (state, list) {
      state.list = list;
    }
  },
  actions: {
    getDataEvent ({ commit, state }) {
    }
  },
  modules: {
    box,
    box1,
    box2,
    websitChat,
    login,
    userMain,
    chat
  }
});
