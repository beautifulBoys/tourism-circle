
import {followsAjax} from '../api/ajax_router.js';
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
      let result = await followsAjax();
      if (result.code === 200) {
        commit('changeList', result.data.list);
      } else {
        console.log(result);
      }
    }
  }
};
