
import addressData from './data/city.json';
import {updateUserInfoAjax, getUserInfoAjax} from '../api/ajax_router.js';
export default {
  namespaced: true,
  state: {
    formValue: {
      username: '',
      email: '',
      address: [],
      desc: '',
      avatar: '',
      sex: '男孩'
    },
    addressData: addressData.china,
    postStatus: false
  },
  mutations: {
    postBtnChange (state, status) {
      state.postStatus = status;
    },
    getDataEvent (state, data) {
      state.formValue.avatar = data;
    },
    userInfo (state, data) {
      if (data) state.formValue = data;
    },
    clearHtmlData (state) {
      state.formValue = {
        username: '',
        email: '',
        address: [],
        desc: '',
        avatar: '',
        sex: '男孩'
      };
    }
  },
  actions: {
    async getUserInfoEvent ({ commit, rootState }) {
      try {
        let result = await getUserInfoAjax({userId: rootState.box.userInfo.userId});
        commit('userInfo', result.data);
        console.log(result.data);
      } catch (err) {
        console.log(err);
      }
    },
    async postEvent ({ commit, state }) {
      // ajax
      let data = {...state.formValue};
      data.sex = (state.formValue.sex === '男孩' ? 2 : 1);
      console.log(data);
      commit('postBtnChange', true);
      try {
        let result = await updateUserInfoAjax(data);
        commit('postBtnChange', false);
        commit('clearHtmlData');
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
