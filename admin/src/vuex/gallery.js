  import data from './data/gallery.json';
export default {
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
