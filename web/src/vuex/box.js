
import posting from './posting.js';
import personal from './personal.js';
import permission from './permission.js';
import gallery from './gallery.js';
import admin from './admin.js';
import mostest from './mostest.js';
import newest from './newest.js';
import hotest from './hotest.js';
import posted from './posted.js';
import comments from './comments.js';
import likes from './likes.js';
import following from './following.js';
import followers from './followers.js';
import friend from './friend.js';
import ranking from './ranking.js';
import chat from './chat.js';
import allfriend from './allfriend.js';
import header from './header.js';
import Cookie from 'js-cookie';
import {getUserInfoAjax} from '../api/ajax_router.js';

export default {
  namespaced: true,
  state: {
    imageScan: null,
    list: [],
    userInfo: {
      userId: '',
      passport: '',
      username: '',
      avatar: 'https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/tourism-circle/avatar.png'
    },
    loginStatus: false
  },
  mutations: {
    setUserInfo (state, data) {
      state.loginStatus = window.loginStatus;
      state.userInfo.username = data.username;
      state.userInfo.userId = data.userId;
      state.userInfo.passport = data.passport;
      state.userInfo.avatar = data.avatar;
    },
    openImageScan (state, item) {
      state.imageScan.open(item);
    },
    boxInitEvent (state, obj) {
      state.imageScan = obj;
    }
  },
  actions: {
    async getUserInfoEvent ({commit}) {
      try {
        let result = await getUserInfoAjax({userId: Cookie.get('userId')});
        commit('setUserInfo', result.data);
        commit('box/header/avatar', result.data.avatar, {root: true});
        commit('box/chat/setMeInfo', result.data, {root: true});
      } catch (err) {
        console.log(err);
      }
    }
  },
  modules: {
    posting,
    gallery,
    personal,
    permission,
    admin,
    mostest,
    newest,
    hotest,
    posted,
    comments,
    likes,
    following,
    followers,
    friend,
    ranking,
    chat,
    allfriend,
    header
  }
};
