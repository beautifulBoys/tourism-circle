
import Api from '../model/api.js';
export const apiFunc = async (req, res, next) => {
  try {
    let apis = await Api.find({});
    let info = {};
    for (let i = 0; i < apis.length; i++) {
      info[apis[i].path] = apis[i].num;
    }
    res.send({code: 200, message: '获取数据成功', data: info});
  } catch (err) {
    res.send({code: 300, message: '获取数据失败', data: {}});
  }
};