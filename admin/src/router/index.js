import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home.vue';
import Posting from '@/views/posting.vue';
import Posted from '@/views/posted.vue';
import Circles from '@/views/circles.vue';
import Login from '@/views/login.vue';
import Box from '@/views/box.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/main',
      component: Box,
      children: [
        {
          path: '/posting',
          component: Posting
        },
        {
          path: '/home',
          component: Home
        },
        {
          path: '/1',
          component: Home
        },
        {
          path: '/posted',
          name: 'posted',
          component: Posted
        },
        {
          path: '/circles',
          name: 'circles',
          component: Circles
        }
      ]
    }
  ]
});
