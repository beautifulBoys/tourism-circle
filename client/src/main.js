// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import FastClick from 'fastclick';
import router from './router';
import store from './vuex/index.js';
import componentConfig from './component_config.js';

FastClick.attach(document.body);
Vue.config.productionTip = false;
componentConfig();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
