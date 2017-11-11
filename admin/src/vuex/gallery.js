  import data from './data/gallery.json';
export default {
  namespaced: true,
  state: {
    list: data.list
  },
  mutations: {
  },
  actions: {
    watchEvent ({ commit }, item) {
      commit('box/openImageScan', item, { root: true });
    },
    deleteEvent ({ commit }, item) {
      console.log(item);
    },
    startEvent ({ commit }) {

    }
  }
};
