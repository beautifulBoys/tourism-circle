
import {myStarAjax} from '../api/ajax_router.js';
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
    async getDataEvent ({ commit }, {error}) {
      let result = await myStarAjax();
      if (result.code === 200) commit('changeList', result.data.list);
      else error(result.message);
    }
  }
};
