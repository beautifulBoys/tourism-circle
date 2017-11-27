
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
  userMainInfoFunc
} from '../controller/client_other.js';

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


export default router;
