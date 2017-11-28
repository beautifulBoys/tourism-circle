import Vue from 'vue';
import liHeader from './components/li_header.vue';
import liScreen from './components/li_screen.vue';
import liTab from './components/li_tab.vue';
import {ToastPlugin} from 'vux';

export default () => {
  Vue.component('li-header', liHeader);
  Vue.component('li-screen', liScreen);
  Vue.component('li-tab', liTab);
  Vue.use(ToastPlugin);
};
