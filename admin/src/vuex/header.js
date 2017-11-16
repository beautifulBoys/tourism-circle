// import data from './data/chat_room.json';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import {messageBoxListAjax, ignoreMessageAjax} from '../api/ajax_router.js';

export default {
  namespaced: true,
  state: {
    httpServer: null,
    messageList: [],
    list: [],
    reason: '',
    formData: {
      value: ''
    },
    chatWindowOpenStatus: false,
    noReadMessageNum: 12,
    noReadRoomNum: 0,
    connect: false,
    messageBoxShow: false,
    inputMessageValue: '',

    messageBoxList: []
  },
  mutations: {
    logout (state, cb) {
      Cookies.remove('userId');
      Cookies.remove('username');
      Cookies.remove('passport');
      window.loginStatus = false;
    },
    messageBoxShowEvent (state, status) {
      state.messageBoxShow = status;
    },
    saveMessage (state, obj) {
      state.messageList.push(obj);
      console.log(state.noReadRoomNum);
    },
    changeNoReadRoomNum1 (state) {
      if (!state.chatWindowOpenStatus) state.noReadRoomNum++;
    },
    changeNoReadRoomNum0 (state) {
      state.noReadRoomNum = 0;
    },
    changeChatWindowOpenStatus (state, status) {
      state.chatWindowOpenStatus = status;
    },
    changeMessageBoxList (state, list) {
      state.messageBoxList = list;
    }
  },
  actions: {
    async ignoreMessageEvent ({commit}, row) {
      console.log('忽略的', row);
      console.log('忽略的id是：', row.messageId);
      let result = await ignoreMessageAjax({id: row.messageId});
      commit('changeMessageBoxList', result.data.list);
    },
    async getMessageListEvent ({commit, state, rootState}) {
      let result = await messageBoxListAjax();
      commit('changeMessageBoxList', result.data.list);
    },
    connectServer ({commit, state, rootState}) {
      state.httpServer = io.connect('http://10.209.96.67:3003');
      state.httpServer.emit('login', rootState.box.userInfo);
      state.httpServer.on('comming', obj => {
        commit('saveMessage', obj);
        commit('changeNoReadRoomNum1');
      });
      state.httpServer.on('loginSuccess', obj => { // 1 成功
        if (obj === 1) {
          state.connect = true; // 登录状态
          console.log('聊天室已连接成功');
        }
      });
      state.httpServer.on('logout', obj => {
        commit('saveMessage', obj);
        commit('changeNoReadRoomNum1');
      });
      state.httpServer.on('message', obj => {
        console.log(obj);
        commit('changeNoReadRoomNum1');
        state.messageList.push(obj);
      });
    },
    sendMessageEvent ({commit, state, rootState}) {
      if (!state.formData.value) return;
      state.httpServer.emit('message', { // 推送聊天记录到服务器
        user: {
          id: rootState.box.userInfo.userId,
          name: rootState.box.userInfo.username
        },
        message: {
          type: 2,
          text: state.formData.value
        }
      });
      commit('saveMessage', { // 保留聊天记录到本地
        user: {
          id: rootState.box.userInfo.userId,
          name: rootState.box.userInfo.username
        },
        message: {
          type: 3,
          text: state.formData.value
        }
      });

      state.formData.value = '';
    }
  }
};
