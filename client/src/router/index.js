import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home.vue';
import Content from '@/views/content.vue';
import Box from '@/views/box.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home1',
      component: Home
    },
    {
      path: '/content',
      component: Content
    },
    {
      path: '/',
      component: Box,
      children: [
        {path: '/home', component: Home}
      ]
    }
  ]
});
