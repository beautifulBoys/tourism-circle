import Vue from 'vue';
import liHeader from './components/li_header.vue';
import {ToastPlugin} from 'vux';

export default () => {
  Vue.component('li-header', liHeader);
  Vue.use(ToastPlugin);
};
