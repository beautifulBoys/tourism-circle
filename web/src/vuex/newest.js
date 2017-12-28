
// import data from './data/mostest.json';
import {getPostAjax} from '../api/ajax_router.js';
export default {
  namespaced: true,
  state: {
    list: [],
    pageConfig: {
      page: 0,
      num: 10
    },
    loadmoreButtonShow: true,
    loadmoreButtonStatus: false
  },
  mutations: {
    changeList (state, list) {
      list.map(item => {
        state.list.push(item);
      });
    },
    changePage (state, num) {
      state.pageConfig.page = num;
    },
    changeLoadmoreButtonShow (state, status) {
      state.loadmoreButtonShow = status;
    },
    changeLoadmoreButtonStatus (state, status) {
      state.loadmoreButtonStatus = status;
    }
  },
  actions: {
    async getDataEvent ({ commit, state }, {cbb}) {
      try {
        commit('changeLoadmoreButtonStatus', true);
        let result = await getPostAjax({type: 'newest', ...state.pageConfig});
        commit('changeLoadmoreButtonStatus', false);
        if (result.code === 200) {
          commit('changeList', result.data.list);
          if (result.data.list.length < state.pageConfig.num) {
            commit('changeLoadmoreButtonShow', false);
          } else {
            commit('changePage', state.pageConfig.page + 1);
          }
        } else {
          cbb(result.message);
        }
      } catch (err) {
        cbb('发生未知错误');
      }
    }
  }
};
