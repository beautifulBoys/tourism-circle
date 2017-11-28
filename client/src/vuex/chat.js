
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
    scrollFunc: null, // 滚动条置底方法
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
      noReadNum: 0,
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
        noReadNum: 3,
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
    logout (state, obj) { // {userId}
      for (let key in state.hotChatObj) {
        if (obj.userId - 0 === key - 0) {
          state.hotChatObj[key].list.push({
            type: 2,
            message: '对方已离线'
          });
          break;
        }
      }
    },
    onlined (state, obj) { // {userId: 1004}
      for (let key in state.hotChatObj) {
        if (obj.userId - 0 === key - 0) {
          state.hotChatObj[key].list.push({
            type: 2,
            message: '对方上线'
          });
          break;
        }
      }
    },
    changeChatUserIndex (state, key) {
      state.hotChatObjIndex = key;
      state.headerConfig.title = state.hotChatObj[state.hotChatObjIndex].userInfo.username;
    },
    saveMessage (state, obj) { // {fromId, toId, type, message}
      if (state.hotChatObj[obj.fromId]) {
        state.hotChatObj[obj.fromId].list.push({
          type: obj.type,
          message: obj.message
        });
      }
    },
    saveMessageToMe (state, obj) {
      state.hotChatObj[state.hotChatObjIndex].list.push(obj);
    },
    saveScrollFunc (state, fn) {
      state.scrollFunc = fn;
    }
  },
  actions: {
    userInfoInit ({ commit, rootState }) {
      commit('setMeInfo', rootState.userInfo);
    },
    connectEvent ({ commit, state }, {fn}) {
      state.httpServer = io.connect('http://10.209.96.67:3003');
      state.httpServer.emit('online', {
        fromId: state.meInfo.userId - 0,
        toId: state.hotChatObjIndex - 0,
        username: state.meInfo.username
      });
      state.httpServer.on('onlined', (obj) => { // {userId}
          state.connect = true; // 变更在线状态
          console.log('已上线');
          commit('onlined', obj);
          if (fn) fn('连接服务器成功');
          if (state.scrollFunc) state.scrollFunc();
      });
      state.httpServer.on('logout', obj => { // {userId: 1004}
        commit('logout', obj);
        if (state.scrollFunc) state.scrollFunc();
      });
      state.httpServer.on('message', obj => { // {fromId, toId, type, message}
        commit('saveMessage', obj);
        if (state.scrollFunc) state.scrollFunc();
      });
    },
    sendMessageEvent ({commit, state}, obj) { // {type, message}
      commit('saveMessageToMe', obj);
      if (state.scrollFunc) state.scrollFunc();
      state.httpServer.emit('message', { // 推送聊天记录到服务器
        fromId: state.meInfo.userId - 0,
        toId: state.hotChatObjIndex - 0,
        message: obj.message
      });
    }
  }
};
