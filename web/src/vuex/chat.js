
import io from 'socket.io-client';
import config from '../config/index.js';
import data from './data/chat.json';

export default {
  namespaced: true,
  state: {
    httpServer: null,
    connect: false,
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
      noReadMessageNum: 0,
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
        noReadMessageNum: 0,
        list: [
          {
            type: 1,
            message: '你好，我是机器人 “菲菲”，你想和我聊什么呀？(*╹▽╹*)'
          }
        ]
      }
    },
    remind: false, // 新消息闪烁动画
    chatShow: false,
    noReadUserNum: 0,
    connectLoading: false
  },
  mutations: {
    setMeInfo (state, obj) {
      state.meInfo.userId = obj.userId - 0;
      state.meInfo.username = obj.username;
      state.meInfo.avatar = obj.avatar;
    },
    changeList (state, list) {
      state.list = list;
    },
    changeChatShow (state, n) {
      state.chatShow = n;
    },
    saveScrollFunc (state, fn) {
      state.scrollFunc = fn;
    },
    saveMessageToMe (state, obj) {
      state.hotChatObj[state.hotChatObjIndex].list.push(obj);
    },
    changeRemind (state, status) {
      state.remind = status;
    },
    changeConnectLoading (state, status) {
      state.connectLoading = status;
    },
    changeHotChatObjIndex (state, key) {
      state.hotChatObjIndex = key - 0;
      state.hotChatObj[state.hotChatObjIndex].noReadMessageNum = 0;
    },
    saveMessage (state, obj) { // {fromId, toId, type, message}
      state.hotChatObj[obj.fromId].list.push({
        type: obj.type,
        message: obj.message
      });
      // 在列表中，但是不是当前聊天窗口
      if (state.hotChatObjIndex - 0 !== obj.fromId - 0) {
        state.hotChatObj[obj.fromId].noReadMessageNum++;
      }
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
    changeFriendList (state, list) {
      for (let i = 0; i < list.length; i++) {
        state.hotTemplate = {
          userInfo: {
            username: list[i].username,
            avatar: list[i].avatar,
            userId: list[i].id - 0
          },
          noReadMessageNum: 0,
          list: []
        };
        if (!state.hotChatObj[list[i].id]) state.hotChatObj[list[i].id] = state.hotTemplate;
      }
    }
  },
  actions: {
    getDataEvent ({ commit, state }) {
      setTimeout(() => {
        commit('changeList', data.list);
      }, 2000);
    },
    sendEvent ({ commit, state }) {
      console.log('已发送');
    },
    connectEvent ({ commit, state }, {fn}) {
      state.httpServer = io.connect(`${config.server_ip}:${config.chat_port}`);
      state.httpServer.emit('online', {
        fromId: state.meInfo.userId - 0,
        username: state.meInfo.username
      });
      state.httpServer.on('onlined', (obj) => { // {userId}
          state.connect = true; // 变更在线状态
          console.log('已上线');
          if (fn) fn('连接服务器成功');
          // if (state.scrollFunc) state.scrollFunc();
      });
      state.httpServer.on('logout', obj => { // {userId: 1004}
        commit('logout', obj);
        if (state.scrollFunc) state.scrollFunc();
      });
      state.httpServer.on('message', obj => { // {fromId, toId, type, message}
        if (!state.chatShow) commit('changeRemind', true); // 聊天窗口未打开的情况下，闪烁图标提醒。
        if (state.hotChatObj[obj.fromId]) { // 是否为自己的好友发来的消息，其实这个没有意义，防备恶意篡改。
          commit('saveMessage', obj);
        } else {
          console.log('出错了，接收到不在列表里面的用户信息。看下服务器日志');
        }
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
