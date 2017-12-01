import Vue from 'vue';
import liHeader from './components/li_header.vue';
import liScreen from './components/li_screen.vue';
import liTab from './components/li_tab.vue';
import LiWebMail from './components/li_webMail.vue';
import liUserPostItem from './components/li_user_post_item.vue';
import liListEmpty from './components/li_list_empty.vue';
import liUserEmpty from './components/li_user_empty.vue';
import liImgBox from './components/li_img_box.vue';
import liEditor from './components/li_editor.vue';

import { ToastPlugin, DatetimePlugin, LoadingPlugin } from 'vux';

export default () => {
  Vue.component('li-header', liHeader);
  Vue.component('li-screen', liScreen);
  Vue.component('li-tab', liTab);
  Vue.component('li-web-mail', LiWebMail);
  Vue.component('li-user-post-item', liUserPostItem);
  Vue.component('li-list-empty', liListEmpty);
  Vue.component('li-user-empty', liUserEmpty);
  Vue.component('li-img-box', liImgBox);
  Vue.component('li-editor', liEditor);

  Vue.use(ToastPlugin);
  Vue.use(DatetimePlugin);
  Vue.use(LoadingPlugin);
};
