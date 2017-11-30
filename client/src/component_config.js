import Vue from 'vue';
import liHeader from './components/li_header.vue';
import liScreen from './components/li_screen.vue';
import liTab from './components/li_tab.vue';
import webMail from './components/li_webMail.vue';
import userPostItem from './components/li_user_post_item.vue';
import liListEmpty from './components/li_list_empty.vue';
import liUserEmpty from './components/li_user_empty.vue';

import {ToastPlugin} from 'vux';

export default () => {
  Vue.component('li-header', liHeader);
  Vue.component('li-screen', liScreen);
  Vue.component('li-tab', liTab);
  Vue.component('li-web-mail', webMail);
  Vue.component('li-user-post-item', userPostItem);
  Vue.component('li-list-empty', liListEmpty);
  Vue.component('li-user-empty', liUserEmpty);

  Vue.use(ToastPlugin);
};
