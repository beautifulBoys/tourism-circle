
import {myFriendAjax, deleteFriendAjax} from '../api/ajax_router.js';
export default {
  namespaced: true,
  state: {
    list: [],
    reason: '',
    mailContent: ''
  },
  mutations: {
    changeList (state, list) {
      state.list = list;
    }
  },
  actions: {
    async getDataEvent ({ commit, state }) {
      let result = await myFriendAjax();
      commit('changeList', result.data.list);
    },
    async deleteFriendEvent ({ commit, state }, {success, error, id}) {
      let result = await deleteFriendAjax({id});
      if (result.code === 200) {
        success(result.message);
        commit('changeList', result.data.list);
      } else {
        error(result.message);
      }
    }
  }
};
