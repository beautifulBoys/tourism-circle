import md5 from '../lib/md5.js';
import Cookie from 'js-cookie';
import {loginAjax} from '../api/ajax_router.js';
export default {
  namespaced: true,
  state: {
    username: '',
    password: '',
    tip: ''
  },
  mutations: {
    usernameChange (state, n) {
      state.username = n;
    },
    passwordChange (state, n) {
      state.password = n;
    },
    changeList (state, list) {
      state.list = list;
    }
  },
  actions: {
    setUserInfo ({state, commit}) {
      let obj;
      if (Cookie.get('userId') && Cookie.get('username') && Cookie.get('passport')) {
        obj = {
          userId: Cookie.get('userId'),
          username: Cookie.get('username'),
          passport: Cookie.get('passport')
        };
      } else {
        obj = JSON.parse(localStorage.getItem('user'));
      }
      console.log('obj', obj);
      commit('setUserInfo', obj, {root: true});
    },
    async loginEvent ({commit, state}, {success, error}) {
      console.log(state.username, state.password);
      var result = await loginAjax({
        username: state.username,
        password: md5(state.password)
      });
      if (result.code === 200) {
        Cookie.set('passport', result.data.passport, { expires: 1 });
        Cookie.set('userId', result.data.userId, { expires: 1 });
        Cookie.set('username', result.data.username, { expires: 1 });
        localStorage.setItem('user', result.data.toString());
        window.loginStatus = true;
        console.log(result.message);
        success(result.message, result);
      } else {
        state.tip = result.message;
        error(result.message);
      }
    }
  }
};
