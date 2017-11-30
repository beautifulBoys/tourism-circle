import express from 'express';

import formidable from 'formidable';
import util from 'util';
import Image from '../model/image.js';
import Id from '../model/id.js';
import User from '../model/user.js';
import cityData from '../json/city.json';

import {
  loginFunc, 
  userInfoUpdateFunc, 
  getUserInfoFunc,
  getAllUserFunc
} from '../controller/user.js';

import {
  postingFunc, 
  postFunc, 
  starFunc, 
  pinglunFunc,
  myPostedFunc,
  changeMinePostStatusFunc
} from '../controller/posting.js';

import {
  galleryFunc, 
  galleryDeleteFunc
} from '../controller/gallery.js';
import {
  webMailSendFunc, 
  messageBoxListFunc, 
  ignoreMessageFunc,
  sendWebMailFunc
} from '../controller/message.js';

import {
  deleteFriendFunc, 
  addFriendFunc,  
  myFriendFunc, 
  friendHandleFunc
} from '../controller/friend.js';
import {
  toFollowFunc,
  myFollowingFunc,
  deleteFollowingFunc,
  followsFunc
} from '../controller/follow.js';

import {
  myStarFunc,
  myCommentsFunc
} from '../controller/myStar_myComment.js';

import {
  rankingFunc
} from '../controller/ranking.js';

import {
  getCityDataFunc
} from '../controller/admin_other.js';
const router = express.Router();

router.post('/login', loginFunc);
router.post('/posting', postingFunc);
router.get('/post', postFunc);

router.post('/gallery', galleryFunc);
router.post('/gallery-delete', galleryDeleteFunc);
router.post('/updateUserInfo', userInfoUpdateFunc);
router.post('/getUserInfo', getUserInfoFunc);
router.post('/allUser', getAllUserFunc);
router.post('/addFriend', addFriendFunc);
router.post('/sendWebMail', sendWebMailFunc);
router.post('/messageBoxList', messageBoxListFunc);
router.post('/ignoreMessage', ignoreMessageFunc);
router.post('/friendHandle', friendHandleFunc);
router.post('/webMailSend', webMailSendFunc);
router.post('/star', starFunc);
router.post('/pinglun', pinglunFunc);
router.post('/myFriend', myFriendFunc);
router.post('/deleteFriend', deleteFriendFunc);
router.post('/toFollow', toFollowFunc);
router.post('/myFollowing', myFollowingFunc);
router.post('/deleteFollowing', deleteFollowingFunc);
router.post('/follows', followsFunc);
router.post('/myPosted', myPostedFunc);
router.post('/myStar', myStarFunc);
router.post('/myComments', myCommentsFunc);
router.post('/changeMinePostStatus', changeMinePostStatusFunc);
router.post('/ranking', rankingFunc);
router.post('/getCityData', getCityDataFunc);



export default router;