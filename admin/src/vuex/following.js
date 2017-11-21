
import {followingAjax} from '../api/ajax_router.js';
export default {
  namespaced: true,
  state: {
    list: [],
    reason: '',
    mailContent: ''
  },
  mutations: {
    changeList (state, list) {
      state.list = list;
    }
  },
  actions: {
    async getDataEvent ({ commit, state }) {
      let result = await followingAjax();
      commit('changeList', result.data.list);
    }
  }
};
