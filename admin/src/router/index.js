import Vue from 'vue';
import Router from 'vue-router';
import Box from '@/views/box.vue';
import Login from '@/views/login.vue';

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
const Api = () => import('@/views/api.vue');
const Data = () => import('@/views/data.vue');

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
        {path: 'api', component: Api},
        {path: 'data', component: Data},

        { path: 'personal', component: Personal },
        { path: 'permission', component: Permission },
        { path: 'admin', component: Admin },

        {path: 'about', component: About},
        {path: 'contact', component: Contact}
      ]
    }
  ]
});
