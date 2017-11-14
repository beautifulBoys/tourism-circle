// import data from './data/chat_room.json';
import io from 'socket.io-client';
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
    noReadMessageNum: 12,
    noReadRoomNum: 1,
    connect: false,
    messageBoxShow: false,
    inputMessageValue: ''
  },
  mutations: {
    messageListEvent (state) {
      state.messageBoxShow = true;
    },
    saveMessage (state, obj) {
      state.messageList.push(obj);
      console.log(state.messageList);
    }
  },
  actions: {
    connectServer ({commit, state, rootState}) {
      console.log(rootState);
      state.httpServer = io.connect('http://10.209.96.67:3003');
      state.httpServer.emit('login', rootState.box.userInfo);
      state.httpServer.on('comming', obj => {
        console.log('comming', obj.message.text);
        commit('saveMessage', obj);
      });
      state.httpServer.on('loginSuccess', obj => { // 1 成功
        if (obj === 1) {
          state.connect = true; // 登录状态
          console.log('聊天室已连接成功');
        }
      });
      state.httpServer.on('logout', obj => {
        commit('saveMessage', obj);
        console.log('退出的人', obj);
      });
      state.httpServer.on('message', obj => {
        console.log(obj);
        state.messageList.push(obj);
      });
    },
    sendMessageEvent ({commit, state, rootState}) {
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
