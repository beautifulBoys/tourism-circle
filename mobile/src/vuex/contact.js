import {myFriendAjax} from '../api/ajax_router.js';
export default {
  namespaced: true,
  state: {
    list: [
      {
        username: '机器人',
        avatar: 'https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/tourism-circle/robot.png',
        id: 100,
        noReadNum: 0
      }
    ]
  },
  getters: {
    allNoRead (state) {
      let n = 0;
      for (let i = 0; i < state.list.length; i++) {
        // n += state.list[i].noReadNum;
        if (state.list[i].noReadNum) n++;
      }
      return n;
    }
  },
  mutations: {
    changeList (state, list) {
      for (let i = 0; i < list.length; i++) {
        state.list.push({
          avatar: list[i].avatar,
          id: list[i].id - 0,
          username: list[i].username,
          noReadNum: 0
        });
      }
    },
    getUserInfo (state, {id, cbb}) {
      for (let i = 0; i < state.list.length; i++) {
        if (id - 0 === state.list[i].id) cbb(state.list[i]);
      }
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
      if (state.list.length > 1) return;
      let result = await myFriendAjax();
      if (result.code === 200) {
        commit('changeList', result.data.list);
      } else {
        error(result.message);
      }
    }
  }
};
