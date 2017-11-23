
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

export default {
  namespaced: true,
  state: {
    imageScan: null,
    list: [],
    userInfo: {
      userId: '',
      passport: '',
      username: ''
    },
    loginStatus: false
  },
  mutations: {
    getUserInfo (state) {
      state.loginStatus = window.loginStatus;
      state.userInfo.username = Cookie.get('username');
      state.userInfo.userId = Cookie.get('userId');
      state.userInfo.passport = Cookie.get('passport');
    },
    openImageScan (state, item) {
      state.imageScan.open(item);
    },
    boxInitEvent (state, obj) {
      state.imageScan = obj;
    }
  },
  actions: {

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
