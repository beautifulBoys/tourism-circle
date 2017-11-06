import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home.vue';
import Posting from '@/views/posting.vue';
import Login from '@/views/login.vue';
import Box from '@/views/box.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    }, {
      path: '/main',
      component: Box,
      children: [
        {
          path: '/posting',
          component: Posting
        }, {
          path: '/home',
          component: Home
        }, {
          path: '/1',
          component: Home
        }
      ]
    }
  ]
});
