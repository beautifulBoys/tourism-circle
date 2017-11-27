
export default {
  namespaced: true,
  state: {
    headerConfig: {
      left: '返回',
      title: '',
      right: '设置'
    },
    meInfo: {
      username: '',
      avatar: 'https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/tourism-circle/avatar.png',
      userId: 0
    },
    hotChatObjIndex: '1005',
    hotChatObj: {
      '1005': {
        userInfo: {
          username: '对方1005',
          avatar: 'https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/tourism-circle/avatar.png',
          userId: 1005
        },
        list: [
          {
            type: 0, // 本人
            message: '哈哈哈，我是李鑫（本人）'
          },
          {
            type: 1, // 对方
            message: '哈哈哈，我是对方'
          }
        ]
      },
      '1006': {
        userInfo: {
          username: '对方1006',
          avatar: 'https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/tourism-circle/avatar.png',
          userId: 1006
        },
        list: [
          {
            type: 0, // 本人
            message: '哈哈哈，我是第二个人（本人）'
          },
          {
            type: 1, // 对方
            message: '哈哈哈，我是对方'
          }
        ]
      }
    },
    hotChatList: [
      {
        userInfo: {
          username: '',
          avatar: '',
          userId: 0
        },
        list: [
          {
            type: 0,
            userInfo: {},
            messageInfo: {}
          }
        ]
      }
    ],
    hotChatIndex: -1
  },
  mutations: {
    addUserToHotChatList (state, obj) {
      state.hotChatList.push({userInfo: {...obj}, list: []});
      state.hotChatIndex = state.hotChatList[state.hotChatList.length - 1];
    },
    changeList (state, list) {
      state.list = list;
    }
  },
  actions: {
    getDataEvent ({ commit, state }) {
    }
  }
};
