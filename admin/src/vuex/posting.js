
import cityData from './data/city.json';
import {postingAjax, getGalleryAjax} from '../api/ajax_router.js';
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
    imgList: [],
    cityData: cityData.china,
    tagList: [],
    postImgList: []
  },
  getters: {
  },
  mutations: {
    changeList (state, list) {
      state.imgList = list;
    },
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
    clearHtmlData (state) {
      state.formValue = {
        title: '',
        city: [],
        spot: '',
        time: '',
        content: '',
        tag: ''
      };
      state.tagList = [];
      state.postImgList = [];
    }
  },
  actions: {
    async getHtmlDataEvent ({ commit }) {
      try {
        let result = await getGalleryAjax();
        commit('changeList', result.data.list);
      } catch (err) {
        console.log('这里有可能出错了，检查下： ', err);
      }
    },
    async postEvent ({ commit, state }, obj) {
      if (
        !state.formValue.title ||
        state.formValue.city.length === 0 ||
        !state.formValue.spot ||
        !state.formValue.time ||
        !state.formValue.content ||
        state.postImgList.length === 0 ||
        state.tagList.length === 0
      ) {
        obj.error('请将所有信息填写完整');
        return;
      };
      try {
        let result = await postingAjax({
          ...state.formValue,
          tagList: state.tagList,
          urls: state.postImgList
        });
        if (result.code === 200) {
          obj.success('分享成功 ^_^');
          commit('clearHtmlData');
        } else obj.error('提交分享失败，请联系管理员');
      } catch (err) {
        obj.error('提交分享失败，请联系管理员');
      }
    }
  }
};
