  import data from './data/gallery.json';
export default {
  namespaced: true,
  state: {
    list: data.list
  },
  getters: {
    cardsCount (state) {
      return 1;
    }
  },
  mutations: {
    create (state) {

    }
  },
  actions: {
    startEvent ({ commit }) {

    }
  }
};
