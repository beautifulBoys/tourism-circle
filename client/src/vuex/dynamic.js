import {getPostAjax} from '../api/ajax_router.js';
export default {
  namespaced: true,
  state: {
    travel: []
  },
  mutations: {
    changeList (state, list) {
      state.travel = list;
    }
  },
  actions: {
    async getDataEvent ({ commit, state }, {type, success, error}) {
      let result = await getPostAjax({type});
      if (result.code === 200) {
        success(result.message);
        commit('changeList', result.data.list);
      } else {
        error(result.message);
      }
    }
  }
};
