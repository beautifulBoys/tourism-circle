import ajax from '../api/ajax_router.js';
import data from './data/mostest.json';
console.log(ajax);
export default {
  namespaced: true,
  state: {
    list: []
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
      }, 1000);
    }
  }
};
