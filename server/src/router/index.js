
import formidable from 'formidable';
import util from 'util';
import Image from '../model/image.js';
import Id from '../model/id.js';
import User from '../model/user.js';

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
  myPostedFunc
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


export default (app) => {
  app.post('/login', loginFunc);
  app.post('/posting', postingFunc);
  app.get('/post', postFunc);

  app.post('/gallery', galleryFunc);
  app.post('/gallery-delete', galleryDeleteFunc);
  app.post('/updateUserInfo', userInfoUpdateFunc);
  app.post('/getUserInfo', getUserInfoFunc);
  app.post('/allUser', getAllUserFunc);
  app.post('/addFriend', addFriendFunc);
  app.post('/sendWebMail', sendWebMailFunc);
  app.post('/messageBoxList', messageBoxListFunc);
  app.post('/ignoreMessage', ignoreMessageFunc);
  app.post('/friendHandle', friendHandleFunc);
  app.post('/webMailSend', webMailSendFunc);
  app.post('/star', starFunc);
  app.post('/pinglun', pinglunFunc);
  app.post('/myFriend', myFriendFunc);
  app.post('/deleteFriend', deleteFriendFunc);
  app.post('/toFollow', toFollowFunc);
  app.post('/myFollowing', myFollowingFunc);
  app.post('/deleteFollowing', deleteFollowingFunc);
  app.post('/follows', followsFunc);
  app.post('/myPosted', myPostedFunc);
  app.post('/myStar', myStarFunc);
  app.post('/myComments', myCommentsFunc);
  
  

  app.post('/test', async (req, res) => {
    let result = await User.find({id: 10302});
    console.log(result);
    res.send({code: 200, message: '我是post test 接口的返回', data: {}});
  });

  app.post('/upload', (req, res) => {
    var form = new formidable.IncomingForm();
    var src = path.join(__dirname, '../../upload/');
    form.uploadDir = src;

    form.parse(req, (err, fields, files) => {
      console.log(files);
      for (item in files) {
        (function(){
            var oldname = files[item].path;
            var newname = src + (Date.parse(new Date()) / 1000) + '.' + files[item].name.split('.')[1];
            fs.rename(oldname, newname, (err) => {});
        })(item);
      }
      res.writeHead(200, {'content-type': 'text/plain'});
      res.end('');
    });

  });
}
