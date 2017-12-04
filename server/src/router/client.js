
import express from 'express';
import Api from '../model/api.js';
import {
  loginFunc,
  getAllUserFunc
} from '../controller/user.js';

import {
  postFunc,
  myPostedFunc,
  postingFunc,
  starFunc, 
  pinglunFunc
} from '../controller/posting.js';

import {
  galleryFunc
} from '../controller/gallery.js';

import { 
  myFriendFunc,
  addFriendFunc
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
  mineFunc,
  postInfoFunc,
  authenticationFunc,
  apiFunc
} from '../controller/client_other.js';

import {
  webMailSendFunc, 
  messageBoxListFunc, 
  ignoreMessageFunc,
  sendWebMailFunc
} from '../controller/message.js';

var router = express.Router();

router.use(async (req, res, next) => {
  let path = req.path;
  let result = await Api.findOne({path});
  if (result) await Api.update({path}, {$inc: {num: 172}}, {multi: false}, () => {});
  else {
    await Api.create({path}, (err, docs) => {
      if (err) console.log('create user 出错了', err);
    });
  }
  authenticationFunc(req, res, next);
});

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
router.post('/posting', postingFunc);
router.post('/gallery', galleryFunc);
router.post('/postInfo', postInfoFunc);
router.post('/pinglun', pinglunFunc);
router.post('/star', starFunc);
router.post('/api', apiFunc);
router.post('/addFriend', addFriendFunc);


export default router;
