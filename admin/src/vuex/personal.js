
import data from './data/gallery.json';
import cityData from './data/city.json';
export default {
  namespaced: true,
  state: {
    formValue_personal: {
      title: '',
      city: [],
      sex: '男孩',
      time: '',
      content: '',
      tag: ''
    },
    imgList: data.list,
    cityData: cityData.china,
    tagList: [],
    postImgList: [],
    postStatus: false
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
