import {mineAjax} from '../api/ajax_router.js';
import Cookies from 'js-cookie';
export default {
  namespaced: true,
  state: {
    user: {},
    infoList: [
      {path: '/following', text: '关注', num: 0},
      {path: '/friend', text: '好友', num: 0},
      {path: '/follow', text: '粉丝', num: 0}
    ]
  },
  mutations: {
    changeData (state, user) {
      state.user = user;
      state.infoList[0].num = user.followingNum;
      state.infoList[1].num = user.friendNum;
      state.infoList[2].num = user.followNum;
    }
  },
  actions: {
    async getDataEvent ({ commit, state }, {error}) {
      let result = await mineAjax();
      if (result.code === 200) {
        commit('changeData', result.data);
      } else {
        error(result.message);
      }
    },
    async logoutEvent ({ commit, state }) {
      Cookies.remove('userId');
      Cookies.remove('username');
      Cookies.remove('passport');
      localStorage.removeItem('user');
      window.loginStatus = false;
    }
  }
};
