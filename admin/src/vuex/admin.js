
export default {
  namespaced: true,
  state: {
    search: {
      input: '',
      select: {
        value: '1',
        data: [
          {label: '用户名', value: '1'},
          {label: '用户ID', value: '2'}
        ]
      }
    }
  },
  getters: {
  },
  mutations: {
    addTagEvent (state, {cb}) {
      if (state.formValue_personal.tag.length > 8) {
        cb();
        return;
      }
      state.tagList.push({
        name: state.formValue_personal.tag,
        type: 'primary'
      });
      state.formValue_personal.tag = '';
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
      console.log(state.formValue_personal, state.tagList, state.postImgList);
      commit('postBtnChange', {status: true});
      setTimeout(() => {
        commit('postBtnChange', {status: false});
      }, 2000);
    }
  }
};
