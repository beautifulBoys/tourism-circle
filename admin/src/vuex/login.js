export default {
  namespaced: true,
  state: {
    user: {
      passport: '',
      userId: ''
    }
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
    startEvent ({ commit }, info) {

    }
  }
};
