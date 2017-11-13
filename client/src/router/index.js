import Vue from 'vue';
import Router from 'vue-router';
import Dynamic from '@/views/dynamic.vue';
import Content from '@/views/content.vue';
import Box from '@/views/box.vue';
import Circle from '@/views/circle.vue';
import Mine from '@/views/mine.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home1',
      component: Dynamic
    },
    {
      path: '/content',
      component: Content
    },
    {
      path: '/',
      component: Box,
      children: [
        {path: '/dynamic', component: Dynamic},
        {path: '/circle', component: Circle},
        {path: '/mine', component: Mine}
      ]
    }
  ]
});
