import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home.vue';
import Posting from '@/views/posting.vue';
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
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});
