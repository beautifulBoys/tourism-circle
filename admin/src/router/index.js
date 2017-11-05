import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home.vue';
import Posting from '@/views/posting.vue';
import Posted from '@/views/posted.vue';
import Circles from '@/views/circles.vue';
import Login from '@/views/login.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/posting',
      name: 'posting',
      component: Posting
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
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});
