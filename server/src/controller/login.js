
import User from '../model/user.js';
import Id from '../model/id.js';
import md5 from 'blueimp-md5';
import formatDate from '../lib/formDate.js';

function passportFunc (password) {
  return md5('circle' + formatDate.formatDate(new Date()) + password);
}

export default async (req, res) => {
  if (req.body.username && req.body.password) {
    let result = await User.findOne({username: req.body.username});
    let passport = passportFunc(req.body.password);
    if (result) {
      if (result.password === req.body.password) {
        User.update({_id: result._id}, {passport: passport}, {multi: false}, () => {});
        res.send({code: 200, message: '登陆成功', data: {passport, userId: result.id}});
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
      res.send({code: 200, message: '账号注册成功', data: {passport, userId: obj.value + 1}});
    }
  } else {
    res.send({code: 300, message: '用户名和密码请输入完整', data: {}});
  }
};