// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex/index.js';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import ajax from './api/ajax_router.js';

Vue.use(ElementUI, { size: 'small' });
Vue.config.productionTip = false;
Vue.prototype.ajax = ajax;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
