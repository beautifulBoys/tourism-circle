
import User from '../model/user.js';
import Following from '../model/following.js';
import Follow from '../model/follow.js';
import Friend from '../model/friend.js';
import Star from '../model/star.js';
import Comment from '../model/comment.js';
import Id from '../model/id.js';
import md5 from 'blueimp-md5';
import formatDate from '../lib/formDate.js';

function passportFunc (password) {
  return md5('circle' + formatDate.formatDate(new Date()) + password);
}

export const loginFunc = async (req, res) => {
  if (req.body.username && req.body.password) {
    try {
      let result = await User.findOne({username: req.body.username});
      let passport = passportFunc(req.body.password);
      let username = req.body.username;
      if (result) {
        if (result.password === req.body.password) {
          await User.update({_id: result._id}, {passport: passport}, {multi: false}, () => {});
          res.send({code: 200, message: '你好：' + username + '，欢迎回来', data: {passport, userId: result.id, username}});
        } else {
          res.send({code: 300, message: '用户名或密码输入错误', data: {}});
        }
      } else {
        let obj = await Id.findOne({type: 'userId'});
        let userId = obj.value + 1;
        // 创建 user 表
        await User.create({
          id: userId,
          username: req.body.username,
          password: req.body.password,
          passport: passport
        }, (err, docs) => {
          if (err) console.log('create user 出错了', err);
        });

        // 同步创建 following 表
        await Following.create({
          id: userId,
          userId: userId
        }, (err, docs) => {
          if (err) console.log('create following 出错了', err);
        });
        // 同步创建 follow 表
        await Follow.create({
          id: userId,
          userId: userId
        }, (err, docs) => {
          if (err) console.log('create follow 出错了', err);
        });
        // 同步创建 friend 表
        await Friend.create({
          id: userId,
          userId: userId
        }, (err, docs) => {
          if (err) console.log('create friend 出错了', err);
        });
        // 同步创建 star 表
        await Star.create({
          id: userId,
          userId: userId
        }, (err, docs) => {
          if (err) console.log('create star 出错了', err);
        });
        // 同步创建 comment 表
        await Comment.create({
          id: userId,
          userId: userId
        }, (err, docs) => {
          if (err) console.log('create comment 出错了', err);
        });


        res.send({code: 200, message: '你好：' + username + '，已自动为您注册账号', data: {
          passport,
          userId: obj.value + 1,
          username
        }});
      }
    } catch (err) {
      res.send({code: 300, message: '登录故障，请联系管理员', data: {}});
    }

  } else {
    res.send({code: 300, message: '用户名和密码请输入完整', data: {}});
  }
};

export const getUserInfoFunc = async (req, res) => {
  try {
    let data = await User.findOne({id: req.body.userId});
    let obj = {};
    if (data) {
      obj.username = data.username;
      obj.userId = data.id;
      obj.email = data.email;
      obj.address = data.address;
      obj.desc = data.desc;
      obj.avatar = data.avatar;
      obj.sex = (data.sex === 1 ? '女孩' : '男孩');
    }
    res.send({code: 200, message: '获取用户信息成功', data: obj});
  } catch (err) {
    console.log(err);
    res.send({code: 200, message: '获取用户信息失败', data: err});
  }

};
export const userInfoUpdateFunc = async (req, res) => {
  try {
    await User.update({id: req.headers.userid}, {...req.body}, {multi: false}, () => {});
    res.send({code: 200, message: '修改用户信息成功', data: {}});
  } catch (err) {
    res.send({code: 300, message: '修改用户信息失败', data: err});
  }
};

export const getAllUserFunc = async (req, res) => {
  let pageConfig = {
    num: req.body.num - 0, // 每页数量
    page: req.body.page - 0 // 当前页数
  };
  let start = pageConfig.page * pageConfig.num;
  let end = start + pageConfig.num;
  try {
    let result = await User.find({});
    let total = result.length;
    result = result.slice(start, end);
    let arr = [];
    for (let i = 0; i < result.length; i++) {
      if (!result[i].status) continue;
      let item = {
        address: result[i].address.length > 0 ? result[i].address.join('-') : '',
        email: result[i].email,
        id: result[i].id,
        username: result[i].username,
        desc: result[i].desc,
        postNum: result[i].postNum,
        avatar: result[i].avatar,
        sex: result[i].sex
      };
      arr.push(item);
    }
    res.send({code: 200, message: '获取用户列表成功', data: {list: arr, total}});
  } catch (err) {
    res.send({code: 300, message: '获取用户列表失败', data: err});
  }
};
