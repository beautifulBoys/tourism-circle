import Vue from 'vue';
import Router from 'vue-router';
import Box from '@/views/box.vue';
import Login from '@/views/login.vue';

/*
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

import Ranking from '@/views/ranking.vue';

import Personal from '@/views/personal.vue';
import Permission from '@/views/permission.vue';
import Admin from '@/views/admin.vue';

import About from '@/views/about.vue';
import Contact from '@/views/contact.vue';
*/

const Newest = () => import('@/views/newest.vue');
const Hotest = () => import('@/views/hotest.vue');
const Mostest = () => import('@/views/mostest.vue');
const Allfriend = () => import('@/views/allfriend.vue');

const Friend = () => import('@/views/friend.vue');
const Following = () => import('@/views/following.vue');
const Followers = () => import('@/views/followers.vue');

const Posting = () => import('@/views/posting.vue');
const Posted = () => import('@/views/posted.vue');
const Likes = () => import('@/views/likes.vue');
const Comments = () => import('@/views/comments.vue');
const Space = () => import('@/views/space.vue');
const Gallery = () => import('@/views/gallery.vue');

const Ranking = () => import('@/views/ranking.vue');

const Personal = () => import('@/views/personal.vue');
const Permission = () => import('@/views/permission.vue');
const Admin = () => import('@/views/admin.vue');

const About = () => import('@/views/about.vue');
const Contact = () => import('@/views/contact.vue');

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

        {path: 'ranking', component: Ranking},
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
