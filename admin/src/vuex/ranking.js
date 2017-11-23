
import {rankingAjax} from '../api/ajax_router.js';
export default {
  namespaced: true,
  state: {
    list: [
      {
        title: '分享排行榜',
        arr: []
      },
      {
        title: '粉丝排行榜',
        arr: []
      },
      {
        title: '关注排行榜',
        arr: []
      },
      {
        title: '好友排行榜',
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
    async getDataEvent ({ commit, state }) {
      let result = await rankingAjax();
      commit('changeList', result.data);
    }
  }
};
