// import data from './data/chat_room.json';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import config from '../config/index.js';
import {webMailSendAjax, messageBoxListAjax, ignoreMessageAjax, friendHandleAjax} from '../api/ajax_router.js';

export default {
  namespaced: true,
  state: {
    httpServer: null,
    avatar: 'https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/tourism-circle/avatar.png',
    messageList: [],
    list: [],
    reason: '',
    formData: {
      value: ''
    },
    chatWindowOpenStatus: false,
    noReadMessageNum: 0,
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
      state.noReadMessageNum = list.length;
    },
    avatar (state, avatar) {
      state.avatar = avatar;
    },
    deleteMessage (state, id) {
      for (let i = 0; i < state.messageBoxList.length; i++) {
        if (id - 0 === state.messageBoxList[i].messageId - 0) {
          state.messageBoxList.splice(i, 1);
          break;
        }
      }
    }
  },
  actions: {
    async webMailSendEvent ({commit}, {messageId, remark, fromId, toId, success, error}) {
      try {
        let result = await webMailSendAjax({messageId, remark, fromId, toId});
        console.log(result);
        if (result.code === 200) success(result.message);
        else if (result.code === 300) error(result.message);
        else console.log('出错了，检查下');
      } catch (err) {
        console.log(err);
      }
    },
    async AgreeOrRefuseEvent ({commit}, {type, messageId, fromId, toId, success, error}) {
      try {
        let result = await friendHandleAjax({messageId, fromId, toId, type});
        if (result.code === 200) {
          success(result.message);
          commit('changeMessageBoxList', result.data);
        } else if (result.code === 300) error(result.message);
        else console.log('出错了，检查下');
      } catch (err) {
        console.log(err);
      }
    },
    async ignoreMessageEvent ({commit}, row) {
      console.log('忽略的', row);
      console.log('忽略的id是：', row.messageId);
      let result = await ignoreMessageAjax({id: row.messageId});
      if (result.code === 200) commit('deleteMessage', row.messageId);
    },
    async getMessageListEvent ({commit, state, rootState}) {
      let result = await messageBoxListAjax();
      commit('changeMessageBoxList', result.data.list);
    },
    connectServer ({commit, state, rootState}) {
      state.httpServer = io.connect(`${config.server_ip}:${config.webChat_port}`);
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
          name: rootState.box.userInfo.username,
          avatar: state.avatar
        },
        message: {
          type: 2,
          text: state.formData.value
        }
      });
      commit('saveMessage', { // 保留聊天记录到本地
        user: {
          id: rootState.box.userInfo.userId,
          name: rootState.box.userInfo.username,
          avatar: state.avatar
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
