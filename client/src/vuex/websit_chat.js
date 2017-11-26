
import io from 'socket.io-client';
export default {
  namespaced: true,
  state: {
    httpServer: null,
    connect: false,
    messageList: [],
    formData: {
      value: ''
    }
  },
  mutations: {
    changeList (state, list) {
      state.list = list;
    }
  },
  actions: {
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
