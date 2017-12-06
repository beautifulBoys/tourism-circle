
import {china} from '../data/city.js';
import User from '../model/user.js';

export const getCityDataFunc = async (req, res) => {
  res.send({code: 200, message: '获取城市数据成功', data: china});
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
