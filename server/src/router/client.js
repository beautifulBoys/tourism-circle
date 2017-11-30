
import express from 'express';
import {
  loginFunc,
  getAllUserFunc
} from '../controller/user.js';

import {
  postFunc,
  myPostedFunc
} from '../controller/posting.js';

import { 
  myFriendFunc
} from '../controller/friend.js';

import {
  myStarFunc,
  myCommentsFunc
} from '../controller/myStar_myComment.js';

import {
  rankingFunc
} from '../controller/ranking.js';

import {
  toFollowFunc,
  myFollowingFunc,
  deleteFollowingFunc,
  followsFunc
} from '../controller/follow.js';

import {
  userMainInfoFunc,
  mineFunc
} from '../controller/client_other.js';

import {
  webMailSendFunc, 
  messageBoxListFunc, 
  ignoreMessageFunc,
  sendWebMailFunc
} from '../controller/message.js';

var router = express.Router();

router.post('/login', loginFunc);
router.get('/post', postFunc);
router.post('/myFriend', myFriendFunc);
router.post('/myPosted', myPostedFunc);
router.post('/myStar', myStarFunc);
router.post('/myComments', myCommentsFunc);
router.post('/ranking', rankingFunc);
router.post('/allUser', getAllUserFunc);
router.post('/userMainInfo', userMainInfoFunc);
router.post('/mine', mineFunc);
router.post('/follows', followsFunc);
router.post('/myFollowing', myFollowingFunc);
router.post('/sendWebMail', sendWebMailFunc);
router.post('/toFollow', toFollowFunc);
router.post('/deleteFollowing', deleteFollowingFunc);


export default router;
