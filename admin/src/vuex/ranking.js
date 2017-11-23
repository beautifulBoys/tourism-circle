
import data from './data/ranking.json';
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
