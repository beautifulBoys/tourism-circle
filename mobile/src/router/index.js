import Vue from 'vue';
import Router from 'vue-router';
import firstBox from '@/views/box1.vue'; // 第一级架构
import secondBox from '@/views/box2.vue'; // 第二级架构
// import Dynamic from '@/views/dynamic.vue';
// import Content from '@/views/content.vue';
// import Circle from '@/views/circle.vue';
// import Ranking from '@/views/ranking.vue';
// import Posted from '@/views/posted.vue';
// import Comment from '@/views/comment.vue';
// import Api from '@/views/api.vue';
// import Likes from '@/views/likes.vue';
// import AllFriend from '@/views/allfriend.vue';
// import Friend from '@/views/friend.vue';
// import Mine from '@/views/mine.vue';
// import UserMain from '@/views/user_main.vue';
// import Chat from '@/views/chat.vue';
// import Contact from '@/views/contact.vue';
// import websitChat from '@/views/websit_chat.vue';
// import Follow from '@/views/follow.vue';
// import Following from '@/views/following.vue';
// import Login from '@/views/login.vue';
// import Post from '@/views/post.vue';

const Dynamic = () => import('@/views/dynamic.vue');
const Content = () => import('@/views/content.vue');
const Ranking = () => import('@/views/ranking.vue');
const Posted = () => import('@/views/posted.vue');
const Comment = () => import('@/views/comment.vue');
const Api = () => import('@/views/api.vue');
const Data = () => import('@/views/data.vue');
const Likes = () => import('@/views/likes.vue');
const AllFriend = () => import('@/views/allfriend.vue');
const Friend = () => import('@/views/friend.vue');
const Mine = () => import('@/views/mine.vue');
const UserMain = () => import('@/views/user_main.vue');
const Chat = () => import('@/views/chat.vue');
const Contact = () => import('@/views/contact.vue');
const websitChat = () => import('@/views/websit_chat.vue');
const Follow = () => import('@/views/follow.vue');
const Following = () => import('@/views/following.vue');
const Login = () => import('@/views/login.vue');
const Post = () => import('@/views/post.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home1',
      component: Dynamic
    },
    {
      path: '/content/:id',
      component: Content
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/user/:id',
      component: UserMain
    },
    {
      path: '/chat',
      component: Chat
    },
    {
      path: '/websit_chat',
      component: websitChat
    },
    {
      path: '/main',
      component: secondBox,
      children: [
        {path: '/ranking', component: Ranking},
        {path: '/posted', component: Posted},
        {path: '/comment', component: Comment},
        {path: '/api', component: Api},
        {path: '/data', component: Data},
        {path: '/likes', component: Likes},
        {path: '/allfriend', component: AllFriend},
        {path: '/friend', component: Friend},
        {path: '/follow', component: Follow},
        {path: '/following', component: Following},
        {path: '/post', component: Post}
      ]
    },
    {
      path: '/',
      component: firstBox,
      redirect: '/dynamic',
      children: [
        {path: '/dynamic', component: Dynamic},
        {path: '/mine', component: Mine},
        {path: '/contact', component: Contact}
      ]
    }
  ]
});
