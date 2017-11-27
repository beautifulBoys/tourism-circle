import {rankingAjax} from '../api/ajax_router.js';
export default {
  namespaced: true,
  state: {
    list: [
      {
        title: '分享',
        arr: []
      },
      {
        title: '粉丝',
        arr: []
      },
      {
        title: '关注',
        arr: []
      },
      {
        title: '好友',
        arr: []
      }
    ]
  },
  mutations: {
    changeList (state, data) {
      state.list[0].arr = data.postList;
      state.list[1].arr = data.followsList;
      state.list[2].arr = data.followingList;
      state.list[3].arr = data.friendList;
    }
  },
  actions: {
    async getDataEvent ({ commit, state }, {error}) {
      let result = await rankingAjax();
      if (result.code === 200) {
        commit('changeList', result.data);
      } else {
        error(result.message);
      }
    }
  }
};
