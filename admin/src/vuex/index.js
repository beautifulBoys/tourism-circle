import Vuex from 'vuex';
import Vue from 'vue';
import posting from './posting.js';
import personal from './personal.js';
import permission from './permission.js';
import gallery from './gallery.js';
import admin from './admin.js';
import mostest from './mostest.js';
import newest from './newest.js';
import hotest from './hotest.js';
import posted from './posted.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    posting,
    gallery,
    personal,
    permission,
    admin,
    mostest,
    newest,
    hotest,
    posted
  }
});
