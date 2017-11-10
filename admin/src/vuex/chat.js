import ajax from '../api/ajax_router.js';
import data from './data/chat.json';
console.log(ajax);
export default {
  namespaced: true,
  state: {
    list: [],
    inputValue: '',
    connectState: false
  },
  mutations: {
    changeList (state, list) {
      state.list = list;
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
    }
  }
};
