
import {followsAjax} from '../api/ajax_router.js';
export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    changeList (state, list) {
      let arr = [];
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
    }
  },
  actions: {
    async getDataEvent ({ commit, state }) {
      let result = await followsAjax();
      if (result.code === 200) {
        commit('changeList', result.data.list);
      } else {
        console.log(result);
      }
    }
  }
};
