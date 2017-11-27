
import io from 'socket.io-client';
export default {
  namespaced: true,
  state: {
    httpServer: null,
    connect: false,
    headerConfig: {
      left: '返回',
      title: '机器人',
      right: '设置'
    },
    meInfo: {
      username: '',
      avatar: 'https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/tourism-circle/avatar.png',
      userId: 0
    },
    hotTemplate: {
      userInfo: {
        username: '',
        avatar: '',
        userId: 0
      },
      list: []
    },
    hotChatObjIndex: 100,
    hotChatObj: {
      '100': {
        userInfo: {
          username: '机器人',
          avatar: 'https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/tourism-circle/robot.png',
          userId: 100
        },
        list: [
          {
            type: 1,
            message: '你好，我是机器人小助手，请问有什么可以帮你的吗？'
          }
        ]
      }
    }
  },
  mutations: {
    setMeInfo (state, obj) {
      state.meInfo.userId = obj.userId - 0;
      state.meInfo.username = obj.username;
    },
    addUserToHotChatList (state, obj) {
      console.log(obj);
      state.hotTemplate = {
        userInfo: {
          username: obj.username,
          avatar: obj.avatar,
          userId: obj.id
        },
        list: []
      };
      state.hotChatObj[obj.id] = state.hotTemplate;
      state.hotChatObjIndex = obj.id;
      state.headerConfig.title = obj.username;
      console.log(state.hotChatObj);
    },
    changeChatUserIndex (state, key) {
      state.hotChatObjIndex = key;
      state.headerConfig.title = state.hotChatObj[state.hotChatObjIndex].userInfo.username;
    },
    saveMessage (state, obj) {
      state.hotChatObj[state.hotChatObjIndex].list.push(obj);
    }
  },
  actions: {
    userInfoInit ({ commit, rootState }) {
      commit('setMeInfo', rootState.userInfo);
    },
    connectEvent ({ commit, state }) {
      state.httpServer = io.connect('http://10.209.96.67:3003');
      state.httpServer.emit('login', {
        fromId: state.meInfo.userId - 0,
        toId: state.hotChatObjIndex - 0,
        username: state.meInfo.username
      });
      state.httpServer.on('loginSuccess', obj => { // 1 成功
        if (obj === 1) {
          state.connect = true; // 登录状态
          console.log('聊天室已连接成功');
        }
      });
      state.httpServer.on('logout', obj => {
        console.log(obj);
      });
      state.httpServer.on('message', obj => {
        console.log(obj);
        commit('saveMessage', obj);
      });
    },
    sendMessageEvent ({commit, state}, obj) {
      commit('saveMessage', obj);
      state.httpServer.emit('message', { // 推送聊天记录到服务器
        fromId: state.meInfo.userId - 0,
        toId: state.hotChatObjIndex - 0,
        message: obj.message
      });
    }
  }
};
