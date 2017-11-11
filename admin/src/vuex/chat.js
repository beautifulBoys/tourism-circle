import ajax from '../api/ajax_router.js';
import data from './data/chat.json';
console.log(ajax);
export default {
  namespaced: true,
  state: {
    list: [],
    inputValue: '',
    formData: {
      value: ''
    },
    connectState: false,
    connectLoading: false
  },
  mutations: {
    changeList (state, list) {
      state.list = list;
    },
    changeConnect (state, status) {
      state.connectState = status;
    },
    changeConnectLoading (state, status) {
      state.connectLoading = status;
    }
  },
  actions: {
    getDataEvent ({ commit, state }) {
      setTimeout(() => {
        commit('changeList', data.list);
      }, 2000);
    },
    sendEvent ({ commit, state }) {
      console.log('已发送');
    },
    connectEvent ({ commit, state }) {
      commit('changeConnectLoading', true);
      setTimeout(() => {
        commit('changeConnect', true);
        commit('changeConnectLoading', false);
      }, 2000);
    }
  }
};
