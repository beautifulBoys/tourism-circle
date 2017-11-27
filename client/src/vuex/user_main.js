import {userMainPageInfoAjax} from '../api/ajax_router.js';
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
    postList: []
  },
  mutations: {
    changeList (state, data) {
      state.headerConfig.title = data.userInfo.username;
      state.userInfo = data.userInfo;
      state.isFriend = data.isFriend;
      state.postList = data.postList;
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
    }
  }
};
