
import Post from '../model/post.js';
import Id from '../model/id.js';
import User from '../model/user.js';
import Star from '../model/star.js';
import Comment from '../model/comment.js';
import util from '../lib/formDate.js';


export const postingFunc = async (req, res) => {
  let userId = req.headers.userid;
  let obj = await Id.findOne({type: 'postId'});
  if (obj) await Id.update({_id: obj._id}, {value: obj.value + 1}, {multi: false}, () => {});
  else await Id.create({type: 'postId'});
  obj = await Id.findOne({type: 'postId'});
  try {
    await Post.create({
      title: req.body.title,
      spot: req.body.spot,
      city: req.body.city,
      time: req.body.time,
      content: req.body.content,
      urls: req.body.urls,
      rate: req.body.rate,
      tagList: req.body.tagList,
      starList: [],
      commentList: [],
      userId: req.headers.userid,
      id: obj.value + 1
    });
    await User.update({id: userId}, {$inc: {postNum: 1}}, {multi: false}, () => {});
    res.send({code: 200, message: '分享成功', data: {}});
  } catch (err) {
    res.send({code: 300, message: '分享失败', data: err});
  }
  
};

function sort (type, list) {
  let result;
  if (type === 'newest') {
    result = list;
  } else if (type === 'hotest') {
    result = list.sort((b, a) => {
      return a.starList.length - b.starList.length;
    });
  } else if (type === 'mostest') {
    result = list.sort((b, a) => {
      return a.commentList.length - b.commentList.length;
    });
  } else console.log('出错了，请检查');
  return result;
}

async function changeList (arr) {
  let list = [];
  for (let i = 0; i < arr.length; i++) {
    let user = await User.findOne({id: arr[i].userId});
    let obj = {...arr[i], avatar: user.avatar};
    list.push(obj);
  }
  return list;
}

export const postFunc = async (req, res) => {
  let userId = req.headers.userid - 0;
  let pageConfig = {
    num: req.query.num - 0, // 每页数量
    page: req.query.page - 0 // 当前页数
  };
  let start = pageConfig.page * pageConfig.num;
  let end = start + pageConfig.num;
  console.log(pageConfig);
  let type = req.query.type ? req.query.type : 'newest';
  let sortString = 0;
  // let arr = await Post.find({status: 0}).sort({postTime: -1});
  let arr = [];
  if (type === 'newest') {
    arr = await Post.find({status: 0})
    .skip(start)
    .limit(pageConfig.num)
    .sort({'_id': -1});
  } else {
    let list_a = await Post.find({});
    if (type === 'mostest') {
      list_a = list_a.sort((b, a) => (a.commentList.length - b.commentList.length));
      arr = list_a.slice(start, end);
    } else if (type === 'hotest') {
      list_a = list_a.sort((b, a) => (a.starList.length - b.starList.length));
      arr = list_a.slice(start, end);
    }
  }

  let list = [];
  for (let i = 0; i < arr.length; i++) {
    let user = await User.findOne({id: arr[i].userId});
    let isStared = (arr[i].starList.indexOf(userId) === -1 ? false : true);
    let starList = [];
    for (let j = 0; j < arr[i].starList.length; j++) {
      let userStar = await User.findOne({id: arr[i].starList[j] - 0});
      starList.push(userStar);
    }
    let commentList = [];
    for (let h = 0; h < arr[i].commentList.length; h++) {
      let user = await User.findOne({id: arr[i].commentList[h].userId});
      
      commentList.push({
        comment: arr[i].commentList[h].comment,
        user: {
          url: user.avatar,
          name: user.username
        }
      });
    }
    let obj = {
      id: arr[i].id,
      userId: arr[i].userId - 0,
      userInfo: {
        username: user.username,
        desc: user.desc,
        avatar: user.avatar
      },
      postTime: util.formatCSTDate(arr[i].postTime),
      commentList,
      starList,
      tagList: arr[i].tagList,
      rate: arr[i].rate,
      urls: arr[i].urls,
      content: arr[i].content,
      time: arr[i].time,
      city: arr[i].city,
      spot: arr[i].spot,
      title: arr[i].title,
      avatar: user.avatar,
      isStared
    };
    list.push(obj);
  }
  res.send({code: 200, message: '获取数据成功', data: {list}});
};



export const starFunc = async (req, res) => {
  let userId = req.headers.userid - 0;
  let postId = req.body.id - 0;

  let {starList} = await Post.findOne({id: postId});
  starList = [...starList];

  let starIndex = starList.indexOf(userId);
  let status = null;
  let statusText = null;
  if (starIndex === -1) {
    starList.push(userId);
    status = 'star';
    statusText = '喜欢成功';
    let {list} = await Star.findOne({id: userId});
    list = [...list, postId];
    await Star.update({id: userId}, {list}, {multi: false}, (err, docs) => {
      if (err) console.log('喜欢分享出错了', err);
    });
  } else {
    starList.splice(starIndex, 1);
    status = 'unstar';
    statusText = '取消喜欢成功';
    let {list} = await Star.findOne({id: userId});
    list = list.filter(item => (item - 0 !== postId));

    await Star.update({id: userId}, {list}, {multi: false}, (err, docs) => {
      if (err) console.log('喜欢分享出错了', err);
    });
  }
  try {
    await Post.update({id: req.body.id}, {starList}, {multi: false}, () => {});
    let newstarlist = [];
    for (let i = 0; i < starList.length; i++) {
      let user = await User.findOne({id: starList[i] - 0});
      newstarlist.push({
        avatar: user.avatar
      });
    }
    res.send({code: 200, message: statusText, data: {
      status,
      list: newstarlist
    }});
  } catch (err) {
    res.send({code: 300, message: '操作失败', data: err});
  }
  
};


export const pinglunFunc = async (req, res) => {
  let userId = req.headers.userid - 0;
  let postId = req.body.id - 0;
  let value = req.body.value;

  let comment = {
    comment: {
      time: new Date(),
      starNum: 0,
      content: value
    },
    userId: userId
  };

  let post = await Post.findOne({id: postId});
  let commentList = post.commentList.concat([]);
  commentList.push(comment);

  let user = await User.findOne({id: userId});
  let newComment = {
    comment: {
      content: value
    },
    user: {
      url: user.avatar,
      name: user.username
    },
    userInfo: {
      avatar: user.avatar,
      username: user.username
    }
  };
  
  let {list} = await Comment.findOne({id: userId});
  if (list.indexOf(postId) === -1) {
    list = [...list, postId];
    await Comment.update({id: userId}, {list}, {multi: false}, () => {});
  }
  try {
    await Post.update({id: postId}, {commentList}, {multi: false}, () => {});
    await Comment.update({id: userId}, {commentList}, {multi: false}, () => {});
    res.send({code: 200, message: '评论成功', data: newComment});
  } catch (err) {
    res.send({code: 300, message: '评论失败，请联系管理员', data: err});
  }
  
};
export const myPostedFunc = async (req, res) => {
  let userId = req.headers.userid - 0;
  let pageConfig = {
    num: req.body.num - 0, // 每页数量
    page: req.body.page - 0 // 当前页数
  };
  let start = pageConfig.page * pageConfig.num;
  let end = start + pageConfig.num;
  let list = [];
  
  try {

    let arr = await Post.find({userId});
    arr = arr.slice(start, end);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].status === 2) continue; // 逻辑删除的不做显示
      let user = await User.findOne({id: arr[i].userId});
      let isStared = (arr[i].starList.indexOf(userId) === -1 ? false : true);
      let starList = [];
      for (let j = 0; j < arr[i].starList.length; j++) {
        let user = await User.findOne({id: arr[i].starList[j] - 0});
        starList.push(user);
      }
      let commentList = [];
      for (let h = 0; h < arr[i].commentList.length; h++) {
        let user = await User.findOne({id: arr[i].commentList[h].userId});
        
        commentList.push({
          comment: arr[i].commentList[h].comment,
          user: {
            url: user.avatar,
            name: user.username
          }
        });
      }
      let obj = {
        id: arr[i].id,
        userId: arr[i].userId - 0,
        postTime: util.formatCSTDate(arr[i].postTime),
        commentList,
        starList,
        tagList: arr[i].tagList,
        rate: arr[i].rate,
        urls: arr[i].urls,
        content: arr[i].content,
        time: arr[i].time,
        city: arr[i].city,
        spot: arr[i].spot,
        title: arr[i].title,
        avatar: user.avatar,
        isStared,
        status: arr[i].status
      };
      list.push(obj);
    }
    res.send({code: 200, message: '获取我的分享成功', data: {list}});
  } catch (err) {
    res.send({code: 300, message: '获取我的分享失败，请联系管理员', data: err});
  }
  
};



export const changeMinePostStatusFunc = async (req, res) => {
  let userId = req.headers.userid - 0;
  let postId = req.body.id - 0;
  let status = req.body.status;
  let list = [];
  let statusObj = {
    hide: {num: 1, text: '隐藏'},
    delete: {num: 2, text: '删除'}
  };
  status = statusObj[status];
  try {
    await Post.update({id: postId}, {status: status.num}, {multi: false}, () => {});
    let arr = await Post.find({userId});

    for (let i = 0; i < arr.length; i++) {
      let user = await User.findOne({id: arr[i].userId});
      let isStared = (arr[i].starList.indexOf(userId) === -1 ? false : true);
      let starList = [];
      for (let j = 0; j < arr[i].starList.length; j++) {
        let user = await User.findOne({id: arr[i].starList[j] - 0});
        starList.push(user);
      }
      let commentList = [];
      for (let h = 0; h < arr[i].commentList.length; h++) {
        let user = await User.findOne({id: arr[i].commentList[h].userId});
        
        commentList.push({
          comment: arr[i].commentList[h].comment,
          user: {
            url: user.avatar,
            name: user.username
          }
        });
      }
      let obj = {
        id: arr[i].id,
        userId: arr[i].userId - 0,
        postTime: arr[i].postTime,
        commentList,
        starList,
        tagList: arr[i].tagList,
        rate: arr[i].rate,
        urls: arr[i].urls,
        content: arr[i].content,
        time: arr[i].time,
        city: arr[i].city,
        spot: arr[i].spot,
        title: arr[i].title,
        avatar: user.avatar,
        isStared,
        status: arr[i].status
      };
      list.push(obj);
    }

    res.send({code: 200, message: status.text + '我的分享成功', data: {list}});
  } catch (err) {
    res.send({code: 300, message: status.text + '我的分享失败，请联系管理员', data: err});
  }
  
};
