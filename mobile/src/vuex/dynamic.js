
export default {
  namespaced: true,
  state: {
    wayList: [
      {id: 'newest', text: '最新动态'},
      {id: 'hotest', text: '最热动态'},
      {id: 'mostest', text: '最多评论'}
    ],
    wayIndex: 'newest'
  },
  mutations: {
    changeWayIndex (state, item) {
      state.wayIndex = item.id;
    }
  },
  actions: {
  }
};
