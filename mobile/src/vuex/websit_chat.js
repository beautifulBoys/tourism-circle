
import io from 'socket.io-client';
import config from '../config/index.js';
import {mineAjax} from '../api/ajax_router.js';
export default {
  namespaced: true,
  state: {
    httpServer: null,
    connect: false,
    scroll: null,
    messageList: [],
    sendInputValue: '',
    avatar: 'https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/tourism-circle/avatar.png'
  },
  mutations: {
    initScroll (state, fn) {
      state.scroll = fn;
    },
    changeSendValue (state, value) {
      state.sendInputValue = value;
    },
    changeList (state, list) {
      state.list = list;
    },
    changeStatus (state, status) {
      state.connect = status;
    },
    saveMessage (state, obj) {
      state.messageList.push(obj);
    },
    setAvatar (state, str) {
      state.avatar = str;
    }
  },
  actions: {
    async getUserInfo ({commit, state, rootState}) {
      try {
        let result = await mineAjax();
        commit('setAvatar', result.data.avatar);
      } catch (err) {}
    },
    connectServer ({commit, state, rootState}) {
      state.httpServer = io.connect(config.server_ip + ':' + config.webChat_port);
      state.httpServer.emit('login', {
        ...rootState.userInfo,
        avatar: state.avatar
      });
      state.httpServer.on('comming', obj => {
        commit('saveMessage', obj);
      });
      state.httpServer.on('loginSuccess', obj => { // 1 成功
        if (obj === 1) {
          commit('changeStatus', true); // 登录状态
          console.log('聊天室已连接成功');
        }
      });
      state.httpServer.on('logout', obj => {
        commit('saveMessage', obj);
      });
      state.httpServer.on('message', obj => {
        console.log(obj);
        state.messageList.push(obj);
        setTimeout(state.scroll);
      });
    },
    sendMessageEvent ({commit, state, rootState}, {success}) {
      if (!state.sendInputValue) return;
      console.log(rootState.userInfo);
      state.httpServer.emit('message', { // 推送聊天记录到服务器
        user: {
          id: rootState.userInfo.userId,
          name: rootState.userInfo.username,
          avatar: state.avatar
        },
        message: {
          type: 2,
          text: state.sendInputValue
        }
      });
      commit('saveMessage', { // 保留聊天记录到本地
        user: {
          id: rootState.userInfo.userId,
          name: rootState.userInfo.username,
          avatar: state.avatar
        },
        message: {
          type: 3,
          text: state.sendInputValue
        }
      });
      success();
    }
  }
};
