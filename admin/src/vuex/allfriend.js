
import {allUserListAjax} from '../api/ajax_router.js';

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
      try {
        let result = await allUserListAjax();
        commit('changeList', result.data.list);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
