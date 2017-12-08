import User from '../model/user.js';
import Post from '../model/post.js';
import Friend from '../model/friend.js';
import Following from '../model/following.js';
import Follow from '../model/follow.js';
import util from '../lib/formDate.js';

export const userMainInfoFunc = async (req, res) => {
  let userId = req.headers.userid - 0;
  let toId = req.body.id - 0;
  try {
    let user = await User.findOne({id: toId});
    let friend = await Friend.findOne({id: userId});
    let postList = await Post.find({userId: toId});
    let arr = [];
    for (let i = 0; i < postList.length; i++) {
      arr.push({
        title: postList[i].title,
        postTime: util.formatCSTDate(postList[i].postTime),
        avatar: user.avatar,
        urls: postList[i].urls
      });
    }
    let isFriend = friend.list.indexOf(toId);
    let following = await Following.findOne({id: userId});
    let isFollowing = following.list.indexOf(toId);
    

    let result = {
      userInfo: {
        username: user.username,
        userId: user.userId,
        avatar: user.avatar,
        desc: user.desc
      },
      isFriend: (isFriend !== -1),
      isFollowing: (isFollowing !== -1),
      postList: arr
    };

    res.send({code: 200, message: '获取用户主页数据成功', data: result});
  } catch (err) {
    res.send({code: 300, message: '获取用户主页数据失败', data: err});
  }
};

export const mineFunc = async (req, res) => {
  let userId = req.headers.userid - 0;
  try {
    let user = await User.findOne({id: userId});
    let friend = await Friend.findOne({id: userId});
    let follow = await Follow.findOne({id: userId});
    let following = await Following.findOne({id: userId});

    let data = {
      username: user.username,
      userId: user.userId,
      avatar: user.avatar,
      desc: user.desc,
      friendNum: friend.list.length,
      followNum: follow.list.length,
      followingNum: following.list.length
    };

    res.send({code: 200, message: '获取个人主页数据成功', data});
  } catch (err) {
    res.send({code: 300, message: '获取个人主页数据失败', data: err});
  }
};

export const postInfoFunc = async (req, res) => {
  let postId = req.body.id - 0;
  let userId = req.headers.userid - 0;
  try {
    let post = await Post.findOne({id: postId});
    let user = await User.findOne({id: post.userId});
    let starList = [];
    for (let i = 0; i < post.starList.length; i++) {
      let starUser = await User.findOne({id: post.starList[i] - 0});
      starList.push({
        avatar: starUser.avatar
      });
    }
    
    let commentList = [];
    for (let i = 0; i < post.commentList.length; i++) {
      let commentUser = await User.findOne({id: post.commentList[i].userId - 0});
      commentList.push({
        userInfo: {
          avatar: commentUser.avatar,
          username: commentUser.username,
          id: commentUser.id
        },
        comment: post.commentList[i].comment
      });
    }
    let isStared = (post.starList.indexOf(userId) !== -1);
    let data = {
      userInfo: {
        avatar: user.avatar,
        username: user.username,
        id: user.id
      },
      title: post.title,
      postTime: util.formatCSTDate(post.postTime),
      content: post.content,
      starList: starList,
      commentList: commentList,
      isStared,
      urls: post.urls
    };

    res.send({code: 200, message: '获取分享详情数据成功', data});
  } catch (err) {
    res.send({code: 300, message: '获取分享详情数据失败', data: err});
  }
};

// 统一身份验证
export const authenticationFunc = async (req, res, next) => {
  if (req.path === '/login') {
    next();
    return;
  }
  let passport = req.headers.passport;
  let userId = req.headers.userid - 0;
  try {
    let result = await User.findOne({id: userId});
    if (result && result.passport && passport === result.passport) {
      next();
    } else {
      res.send({code: 400, message: '身份验证失败', data: {}});
      return;
    }
  } catch (err) {
    res.send({code: 400, message: '此账号验证异常，请重新登录', data: {}});
  }
};
