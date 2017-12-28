  // import data from './data/gallery.json';
  import {getGalleryAjax, deleteGalleryAjax} from '../api/ajax_router.js';
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
    watchEvent ({ commit }, item) {
      commit('box/openImageScan', item, { root: true });
    },
    async deleteEvent ({ commit }, {item, callb}) {
      let result = await deleteGalleryAjax({id: item.id});
      if (result.code === 200) callb('success', '图片删除成功');
      else callb('error', '图片删除失败，请联系管理员');
    },
    startEvent ({ commit }) {

    },
    async getHtmlDataEvent ({ commit }) {
      try {
        let result = await getGalleryAjax();
        commit('changeList', result.data.list);
      } catch (err) {
        console.log('这里有可能出错了，检查下： ', err);
      }
    }
  }
};
