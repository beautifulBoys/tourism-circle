import {postingAjax, galleryAjax} from '../api/ajax_router.js';
export default {
  namespaced: true,
  state: {
    imgList: []
  },
  mutations: {
    changeList (state, list) {
      state.list = list;
    }
  },
  actions: {
    async sendEvent ({ commit, state }, {obj, success, error}) {
      let result = await postingAjax(obj);
      if (result.code === 200) {
        success(result.message);
      } else {
        error(result.message);
      }
    },
    async getDataEvent ({ commit, state }, {cbb}) {
      let result = await galleryAjax();
      cbb(result.message);
      if (result.code === 200) commit('changeList', result.data.list);
    }
  }
};
