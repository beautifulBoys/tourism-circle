
import User from '../model/user.js';
import Star from '../model/star.js';
import Comment from '../model/comment.js';
import Post from '../model/post.js';

export const myStarFunc = async (req, res) => {
  let userId = req.headers.userid - 0;
  let pageConfig = {
    num: req.body.num - 0, // 每页数量
    page: req.body.page - 0 // 当前页数
  };
  let start = pageConfig.page * pageConfig.num;
  let end = start + pageConfig.num;
  let arr = [];


  try {

    let {list} = await Star.findOne({id: userId});
    if (!list) {
      res.send({code: 300, message: '你还没有喜欢过别人的分享', data: {}});
      return;
    }
    list = list.slice(start, end);
    for (let i = 0; i < list.length; i++) {
      let post = await Post.findOne({id: list[i] - 0});
      let isStared = (post.starList.indexOf(userId) === -1 ? false : true);
      let starList = [];
      for (let j = 0; j < post.starList.length; j++) {
        let user = await User.findOne({id: post.starList[j] - 0});
        starList.push(user);
      }
      let commentList = [];
      for (let h = 0; h < post.commentList.length; h++) {
        let user = await User.findOne({id: post.commentList[h].userId - 0});
        
        commentList.push({
          comment: post.commentList[h].comment,
          user: {
            url: user.avatar,
            name: user.username
          }
        });
      }
      let {avatar} = await User.findOne({id: post.userId});
      let obj = {
        id: post.id,
        userId: post.userId - 0,
        postTime: post.postTime,
        commentList,
        starList,
        tagList: post.tagList,
        rate: post.rate,
        urls: post.urls,
        content: post.content,
        time: post.time,
        city: post.city,
        spot: post.spot,
        title: post.title,
        avatar,
        isStared
      };
      arr.push(obj);
    }
    res.send({code: 200, message: '获取我的喜欢成功', data: {list: arr}});
  } catch (err) {
    res.send({code: 300, message: '获取我的喜欢失败，请联系管理员', data: err});
  }
  
};

export const myCommentsFunc = async (req, res) => {
  let userId = req.headers.userid - 0;
  let pageConfig = {
    num: req.body.num - 0, // 每页数量
    page: req.body.page - 0 // 当前页数
  };
  let start = pageConfig.page * pageConfig.num;
  let end = start + pageConfig.num;
  let arr = [];
  try {
    let {list} = await Comment.findOne({id: userId});
    if (!list) {
      res.send({code: 300, message: '你还没有评论过别人的分享', data: {}});
      return;
    }
    list = list.slice(start, end);
    for (let i = 0; i < list.length; i++) {
      let post = await Post.findOne({id: list[i] - 0});
      let isStared = (post.starList.indexOf(userId) === -1 ? false : true);
      let starList = [];
      for (let j = 0; j < post.starList.length; j++) {
        let user = await User.findOne({id: post.starList[j] - 0});
        starList.push(user);
      }
      let commentList = [];
      for (let h = 0; h < post.commentList.length; h++) {
        let user = await User.findOne({id: post.commentList[h].userId - 0});
        
        commentList.push({
          comment: post.commentList[h].comment,
          user: {
            url: user.avatar,
            name: user.username
          }
        });
      }
      let {avatar} = await User.findOne({id: post.userId});
      let obj = {
        id: post.id,
        userId: post.userId - 0,
        postTime: post.postTime,
        commentList,
        starList,
        tagList: post.tagList,
        rate: post.rate,
        urls: post.urls,
        content: post.content,
        time: post.time,
        city: post.city,
        spot: post.spot,
        title: post.title,
        avatar,
        isStared
      };
      arr.push(obj);
    }
    res.send({code: 200, message: '获取我评论的数据成功', data: {list: arr}});
  } catch (err) {
    res.send({code: 300, message: '获取我评论的数据失败，请联系管理员', data: err});
  }
  
};

