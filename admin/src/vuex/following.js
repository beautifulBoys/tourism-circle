
import {myFollowingAjax, deleteFollowingAjax} from '../api/ajax_router.js';
export default {
  namespaced: true,
  state: {
    list: [],
    reason: '',
    formData: {
      mailContent: ''
    }
  },
  mutations: {
    changeList (state, list) {
      state.list = list;
    }
  },
  actions: {
    async getDataEvent ({ commit, state }) {
      let result = await myFollowingAjax();
      commit('changeList', result.data.list);
    },
    async deleteFollowEvent ({ commit, state }, {id, success, error}) {
      try {
        let result = await deleteFollowingAjax({id});
        if (result.code === 200) success(result.message);
        else error(result.message);
        commit('changeList', result.data.list);
      } catch (err) {
        error('网络连接错误，请联系管理员');
        console.log(err);
      }
    },
    async addFriendEvent ({ commit, state, dispatch }, obj) {
      dispatch('box/allfriend/sendMessageEvent', obj, { root: true });
    },
    sendWebMailEvent ({ commit, state, dispatch }, obj) {
      dispatch('box/allfriend/sendWebMailEvent', {...obj, content: state.formData.mailContent}, { root: true });
    }
  }
};
