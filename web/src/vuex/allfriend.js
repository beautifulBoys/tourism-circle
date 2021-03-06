
import {allUserListAjax, addFriendAjax, sendWebMailAjax, followAjax} from '../api/ajax_router.js';

export default {
  namespaced: true,
  state: {
    list: [],
    formData: {
      mailContent: ''
    },
    pageConfig: {
      page: 0,
      num: 10,
      total: 0
    }
  },
  mutations: {
    changeList (state, data) {
      state.pageConfig.total = data.total;
      let arr = [];
      let list = data.list;
      for (let i = 0; i < list.length; i++) {
        let item = {
          address: list[i].address || '未设置',
          email: list[i].email || '未设置',
          id: list[i].id,
          username: list[i].username,
          desc: list[i].desc || '未设置',
          postNum: list[i].postNum,
          avatar: list[i].avatar
        };
        if (list[i].sex === 1) item.sex = '女孩';
        else if (list[i].sex === 2) item.sex = '男孩';
        else item.sex = '未设置';
        arr.push(item);
      }
      state.list = arr;
    },
    changePage (state, n) {
      state.pageConfig.page = n;
    }
  },
  actions: {
    async getDataEvent ({ commit, state }, {cbb}) {
      try {
        let result = await allUserListAjax(state.pageConfig);
        if (result.code === 200) {
          commit('changeList', result.data);
        } else {
          cbb(result.message);
        }
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
