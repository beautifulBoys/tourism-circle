
import data from './data/chat_room.json';
export default {
  namespaced: true,
  state: {
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
    changeList (state, list) {
      state.list = list;
    },
    changeConnectStatus (state, status) {
      state.connect = status;
    },
    messageListEvent (state) {
      state.messageBoxShow = true;
    }
  },
  actions: {
    connectServer ({ commit, state }) {
      setTimeout(() => {
        commit('changeConnectStatus', true);
        commit('changeList', data.list);
      }, 1000);
    },
    sendEvent ({ commit, state }) {
      console.log(state.formData.value);
    }
  }
};
