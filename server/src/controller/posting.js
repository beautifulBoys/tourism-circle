
import Post from '../model/post.js';
import Id from '../model/id.js';
import User from '../model/user.js';


export const postingFunc = async (req, res) => {
  let obj = await Id.findOne({type: 'postId'});
  if (obj) Id.update({_id: obj._id}, {value: obj.value + 1}, {multi: false}, () => {});
  else Id.create({type: 'postId'});
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
  } catch (err) {
    res.send({code: 300, message: '分享失败', data: err});
  }
  
  res.send({code: 200, message: '分享成功', data: {}});
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
  let type = req.query.type ? req.query.type : 'newest';
  let arr = await Post.find({}).sort({postTime: -1});
  let list = [];
  for (let i = 0; i < arr.length; i++) {
    let user = await User.findOne({id: arr[i].userId});
    let obj = {
      id: arr[i].id,
      postTime: arr[i].postTime,
      commentList: arr[i].commentList,
      starList: arr[i].starList,
      tagList: arr[i].tagList,
      rate: arr[i].rate,
      urls: arr[i].urls,
      content: arr[i].content,
      time: arr[i].time,
      city: arr[i].city,
      spot: arr[i].spot,
      title: arr[i].title,
      avatar: user.avatar
    };
    list.push(obj);
  }
  res.send({code: 200, message: '获取数据成功', data: {list: list}});
};