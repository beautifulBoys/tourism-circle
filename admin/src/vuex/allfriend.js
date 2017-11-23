
import {allUserListAjax, addFriendAjax, sendWebMailAjax, followAjax} from '../api/ajax_router.js';

export default {
  namespaced: true,
  state: {
    list: [],
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
      try {
        let result = await allUserListAjax();
        commit('changeList', result.data.list);
      } catch (err) {
        console.log(err);
      }
    },
    async sendWebMailEvent ({ commit, state }, {id, content, success, error}) {
      try {
        if (!content) content = state.formData.mailContent;
        let result = await sendWebMailAjax({to: id, remark: content});
        console.log(result);
        if (result.code === 200) success(result.message);
        else error(result.message);
      } catch (err) {
        console.log(err);
        error('发送站内信失败');
      }
    },
    async sendMessageEvent ({ commit, state }, {id, value, success, error}) {
      try {
        let result = await addFriendAjax({to: id, remark: value});
        console.log(result);
        if (result.code === 200) success(result.message);
        else error(result.message);
      } catch (err) {
        console.log(err);
        error('添加好友失败');
      }
    },
    async followEvent ({ commit, state }, {id, success, error}) {
      try {
        let result = await followAjax({id});
        console.log(result);
        if (result.code === 200) success(result.message);
        else error(result.message);
      } catch (err) {
        console.log(err);
        error('关注失败或出错，请联系管理员');
      }
    }

  }
};
