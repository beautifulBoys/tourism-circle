
import data from './data/gallery.json';
import cityData from './data/city.json';
import {postingAjax} from '../api/ajax_router';
export default {
  namespaced: true,
  state: {
    formValue: {
      title: '',
      city: [],
      spot: '',
      time: '',
      content: '',
      tag: ''
    },
    imgList: data.list,
    cityData: cityData.china,
    tagList: [],
    postImgList: []
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
    }
  },
  actions: {
    async postEvent ({ commit, state }, obj) {
      if (
        !state.formValue.title ||
        state.formValue.city.length === 0 ||
        !state.formValue.spot ||
        !state.formValue.time ||
        !state.formValue.content ||
        state.postImgList.length === 0 ||
        state.tagList.length === 0
      ) return;
      // ajax
      try {
        let result = await postingAjax({
          ...state.formValue,
          tagList: state.tagList,
          urls: state.postImgList
        });
        obj.success();
        console.log(result);
      } catch (err) {
        obj.error();
      }
    }
  }
};
