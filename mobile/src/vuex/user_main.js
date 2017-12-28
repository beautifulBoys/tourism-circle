import {userMainPageInfoAjax, addFriendAjax, sendWebMailAjax, toFollowAjax, deleteFollowingAjax} from '../api/ajax_router.js';
export default {
  namespaced: true,
  state: {
    headerConfig: {
      left: '返回',
      title: ''
    },
    userInfo: {
      username: '',
      desc: '',
      avatar: ''
    },
    isFriend: false,
    isFollowing: false,
    postList: []
  },
  mutations: {
    changeList (state, data) {
      state.headerConfig.title = data.userInfo.username;
      state.userInfo = data.userInfo;
      state.isFriend = data.isFriend;
      state.isFollowing = data.isFollowing;
      state.postList = data.postList;
    },
    changeIsFollowing (state, status) {
      state.isFollowing = status;
    }
  },
  actions: {
    async getDataEvent ({ commit, state }, {id, error}) {
      let result = await userMainPageInfoAjax({id});
      if (result.code === 200) {
        commit('changeList', result.data);
      } else {
        error(result.message);
      }
    },
    async webMailEvent ({ commit, state }, {to, remark, cbb, error}) {
      let result = await sendWebMailAjax({to, remark});
      if (result.code === 200) {
        cbb(result.message);
      } else {
        error(result.message);
      }
    },
    async toFollowEvent ({ commit, state }, {id, cbb}) {
      let result = await toFollowAjax({id});
      if (result.code === 200) {
        cbb(result.message);
        commit('changeIsFollowing', true);
      } else {
        cbb(result.message);
      }
    },
    async deleteFollowingEvent ({ commit, state }, {id, cbb}) {
      let result = await deleteFollowingAjax({id});
      if (result.code === 200) {
        cbb(result.message);
        commit('changeIsFollowing', false);
      } else {
        cbb(result.message);
      }
    },
    async addFriendEvent ({ commit, state }, {to, remark, cbb}) {
      let result = await addFriendAjax({to, remark});
      if (result.code === 200) {
        cbb(result.message);
      } else {
        cbb(result.message);
      }
    }
  }
};
