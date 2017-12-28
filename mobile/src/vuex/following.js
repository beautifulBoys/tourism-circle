import {myFollowingAjax} from '../api/ajax_router.js';
export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    changeData (state, data) {
      state.list = data.list;
    }
  },
  actions: {
    async getDataEvent ({ commit, state }, {error}) {
      let result = await myFollowingAjax();
      if (result.code === 200) {
        commit('changeData', result.data);
      } else {
        error(result.message);
      }
    }
  }
};
