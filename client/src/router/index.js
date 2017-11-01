import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home.vue';
import Content from '@/views/content.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/content',
      name: 'Content',
      component: Content
    }
  ]
});
