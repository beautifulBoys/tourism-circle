
import {allUserListAjax, addFriendAjax} from '../api/ajax_router.js';

export default {
  namespaced: true,
  state: {
    list: [],
    formData: {
      addFriendRemark: '',
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
      try {
        let result = await allUserListAjax();
        commit('changeList', result.data.list);
      } catch (err) {
        console.log(err);
      }
    },
    async sendMessageEvent ({ commit, state }, {id, success, error}) {
      state.addFriendLoading = true;
      try {
        let result = await addFriendAjax({to: id, remark: state.formData.addFriendRemark});
        console.log(result);
        if (result.code === 200) success();
        else error();
      } catch (err) {
        console.log(err);
        error();
      }
    }
  }
};
