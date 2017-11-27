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
    async getDataEvent ({ commit, state }, {error}) {
      let result = await myPostedAjax();
      if (result.code === 200) {
        commit('changeList', result.data.list);
      } else {
        error(result.message);
      }
    }
  }
};
