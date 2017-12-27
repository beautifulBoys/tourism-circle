
import io from 'socket.io-client';
export default {
  namespaced: true,
  state: {
    httpServer: null,
    connect: false,
    messageList: [],
    sendInputValue: ''
  },
  mutations: {
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
    }
  },
  actions: {
    connectServer ({commit, state, rootState}) {
      state.httpServer = io.connect('http://10.209.96.67:3004');
      state.httpServer.emit('login', rootState.userInfo);
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
      });
    },
    sendMessageEvent ({commit, state, rootState}, {success}) {
      if (!state.sendInputValue) return;
      console.log(rootState.userInfo);
      state.httpServer.emit('message', { // 推送聊天记录到服务器
        user: {
          id: rootState.userInfo.userId,
          name: rootState.userInfo.username
        },
        message: {
          type: 2,
          text: state.sendInputValue
        }
      });
      commit('saveMessage', { // 保留聊天记录到本地
        user: {
          id: rootState.userInfo.userId,
          name: rootState.userInfo.username
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
