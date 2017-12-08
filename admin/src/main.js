// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex/index.js';

import projectConfig from './config.js';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import echarts from 'echarts';
Vue.prototype.echarts = echarts;
Vue.use(ElementUI);
Vue.config.productionTip = false;

projectConfig();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
