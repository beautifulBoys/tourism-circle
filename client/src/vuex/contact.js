import {myFriendAjax} from '../api/ajax_router.js';
export default {
  namespaced: true,
  state: {
    list: []
  },
  getters: {
    allNoRead (state) {
      let n = 0;
      for (let i = 0; i < state.list.length; i++) {
        n += state.list[i].noReadNum;
      }
      return n;
    }
  },
  mutations: {
    changeList (state, list) {
      let arr = [];
      for (let i = 0; i < list.length; i++) {
        arr.push({
          avatar: list[i].avatar,
          id: list[i].id,
          username: list[i].username,
          noReadNum: 0
        });
      }
      state.list = arr;
    },
    noReadSetting (state, obj) {
      console.log(obj.fromId);
      for (let i = 0; i < state.list.length; i++) {
        if (obj.fromId === state.list[i].id) {
          state.list[i].noReadNum++;
          break;
        }
      }
    },
    noReadEmpty (state, item) {
      for (let i = 0; i < state.list.length; i++) {
        if (item.id === state.list[i].id) {
          state.list[i].noReadNum = 0;
          break;
        }
      }
    }
  },
  actions: {
    async getDataEvent ({ commit, state }, {error}) {
      if (state.list.length > 0) return;
      let result = await myFriendAjax();
      if (result.code === 200) {
        commit('changeList', result.data.list);
      } else {
        error(result.message);
      }
    }
  }
};
