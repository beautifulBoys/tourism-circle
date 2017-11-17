
import {allUserListAjax, addFriendAjax, sendWebMailAjax} from '../api/ajax_router.js';

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
    async sendWebMailEvent ({ commit, state }, {id, success, error}) {
      try {
        let result = await sendWebMailAjax({to: id, remark: state.formData.mailContent});
        console.log(result);
        if (result.code === 200) success(result.message);
        else error(result.message);
      } catch (err) {
        console.log(err);
        error('发送站内信失败');
      }
    },
    async sendMessageEvent ({ commit, state }, {id, success, error}) {
      try {
        let result = await addFriendAjax({to: id, remark: state.formData.addFriendRemark});
        console.log(result);
        if (result.code === 200) success(result.message);
        else error(result.message);
      } catch (err) {
        console.log(err);
        error('添加好友失败');
      }
    }
  }
};
