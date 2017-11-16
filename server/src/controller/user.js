
import User from '../model/user.js';
import Id from '../model/id.js';
import md5 from 'blueimp-md5';
import formatDate from '../lib/formDate.js';

function passportFunc (password) {
  return md5('circle' + formatDate.formatDate(new Date()) + password);
}

export const loginFunc = async (req, res) => {
  if (req.body.username && req.body.password) {
    let result = await User.findOne({username: req.body.username});
    let passport = passportFunc(req.body.password);
    let username = req.body.username;
    if (result) {
      if (result.password === req.body.password) {
        User.update({_id: result._id}, {passport: passport}, {multi: false}, () => {});
        res.send({code: 200, message: '你好：' + username + '，欢迎回来', data: {passport, userId: result.id, username}});
      } else {
        res.send({code: 300, message: '用户名或密码输入错误', data: {}});
      }
    } else {
      let obj = await Id.findOne({type: 'userId'});
      if (obj) Id.update({_id: obj._id}, {value: obj.value + 1}, {multi: false}, () => {});
      else Id.create({type: 'userId'});
      User.create({
        id: obj.value + 1,
        username: req.body.username,
        password: req.body.password,
        passport: passport
      });
      res.send({code: 200, message: '你好：' + username + '，已自动为您注册账号', data: {passport, userId: obj.value + 1, username}});
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
  try {
    let result = await User.find({});
    let arr = [];
    for (let i = 0; i < result.length; i++) {
      if (!result[i].status) continue;
      let item = {
        address: result[i].address.length > 0 ? result[i].address.join('-') : '未设置',
        email: result[i].email || '未设置',
        id: result[i].id,
        username: result[i].username,
        desc: result[i].desc || '未设置',
        postNum: result[i].postNum
      };
      if (result[i].sex === 1) item.sex = '女孩';
      else if (result[i].sex === 2) item.sex = '男孩';
      else item.sex = '未设置';
      arr.push(item);
    }
    res.send({code: 200, message: '获取用户列表成功', data: {list: arr}});
  } catch (err) {
    res.send({code: 300, message: '获取用户列表失败', data: err});
  }
};