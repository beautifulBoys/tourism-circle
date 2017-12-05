
import {myFriendAjax, deleteFriendAjax} from '../api/ajax_router.js';
export default {
  namespaced: true,
  state: {
    list: [],
    reason: '',
    mailContent: ''
  },
  mutations: {
    changeList (state, data) {
      state.list = data.list;
    },
    changePage (state, n) {
      state.pageConfig.page = n;
    }
  },
  actions: {
    async getDataEvent ({ commit, state }, {cbb}) {
      try {
        let result = await myFriendAjax(state.pageConfig);
        if (result.code === 200) {
          commit('changeList', result.data);
        } else {
          cbb(result.message);
        }
      } catch (err) {
        console.log(err);
      }
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
