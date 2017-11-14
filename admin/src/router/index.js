import Vue from 'vue';
import Router from 'vue-router';
import Box from '@/views/box.vue';
import Login from '@/views/login.vue';

import Newest from '@/views/newest.vue';
import Hotest from '@/views/hotest.vue';
import Mostest from '@/views/mostest.vue';
import Allfriend from '@/views/allfriend.vue';

import Friend from '@/views/friend.vue';
import Following from '@/views/following.vue';
import Followers from '@/views/followers.vue';

import Posting from '@/views/posting.vue';
import Posted from '@/views/posted.vue';
import Likes from '@/views/likes.vue';
import Comments from '@/views/comments.vue';
import Space from '@/views/space.vue';
import Gallery from '@/views/gallery.vue';

import Friends from '@/views/friends.vue';

import Personal from '@/views/personal.vue';
import Permission from '@/views/permission.vue';
import Admin from '@/views/admin.vue';

import About from '@/views/about.vue';
import Contact from '@/views/contact.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Box,
      redirect: '/newest',
      children: [
        { path: '/newest', component: Newest },
        { path: '/hotest', component: Hotest },
        { path: '/mostest', component: Mostest },
        { path: '/allfriend', component: Allfriend },

        {path: 'friend', component: Friend},
        {path: 'following', component: Following},
        {path: 'followers', component: Followers},

        { path: 'posting', component: Posting },
        { path: 'posted', component: Posted },
        { path: 'likes', component: Likes },
        { path: 'comments', component: Comments },
        { path: 'space', component: Space },
        { path: 'gallery', component: Gallery },

        {path: 'friends', component: Friends},
        {path: '3-2', component: {}},

        { path: 'personal', component: Personal },
        { path: 'permission', component: Permission },
        { path: 'admin', component: Admin },

        {path: 'about', component: About},
        {path: 'contact', component: Contact}
      ]
    }
  ]
});
