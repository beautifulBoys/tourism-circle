
import {myPostedAjax} from '../api/ajax_router.js';
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
    async getDataEvent ({ commit, state }) {
      let result = await myPostedAjax();
      commit('changeList', result.data.list);
    }
  }
};
