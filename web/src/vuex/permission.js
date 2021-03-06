
export default {
  namespaced: true,
  state: {
    formValue: {
      friend: true,
      show: true,
      mail: true,
      follow: true,
      comment: true,
      star: true
    },
    tagList: [],
    postImgList: [],
    postStatus: false
  },
  getters: {
  },
  mutations: {
    addTagEvent (state, {cb}) {
      if (state.formValue.tag.length > 8) {
        cb();
        return;
      }
      state.tagList.push({
        name: state.formValue.tag,
        type: 'primary'
      });
      state.formValue.tag = '';
    },
    closeEvent (state, tag) {
      state.tagList = state.tagList.filter((item) => {
        return item !== tag;
      });
    },
    addPostImgEvent (state, {list}) {
      state.postImgList = list;
    },
    postBtnChange (state, {status}) {
      state.postStatus = status;
    }
  },
  actions: {
    postEvent ({ commit, state }) {
      // ajax
      console.log(state.formValue, state.tagList, state.postImgList);
      commit('postBtnChange', {status: true});
      setTimeout(() => {
        commit('postBtnChange', {status: false});
      }, 2000);
    }
  }
};
