
import Message from '../model/message.js';
import User from '../model/user.js';
import util from '../lib/formDate.js';

function typeToText (type) {
  let arr = {
    'add-friend': '添加好友请求',
    'web-mail': '站内信'
  };
  return arr[type];
}

export const messageBoxListFunc = async (req, res) => {
  try {
    let result = await Message.find({toId: req.headers.userid});
    result = result.filter(item => item.status);
    let arr = [];
    for (let i = 0; i < result.length; i++) {
      let user = await User.findOne({id: result[i].fromId});
      let obj = {
        messageId: result[i].id,
        name: user.username,
        time: util.formatCSTDate(result[i].time, 'yy/MM/dd hh:mm:ss'),
        remark: result[i].remark,
        typeText: typeToText(result[i].type),
        type: result[i].type
      };
      arr.push(obj);
    }
    res.send({code: 200, message: '获取消息盒子数据成功', data: {list: arr}});
  } catch (err) {
    res.send({code: 300, message: '获取消息盒子数据失败', data: err});
  }
};



export const ignoreMessageFunc = async (req, res) => {
  try {
    await Message.update({id: req.body.id}, {status: false}, {multi: false}, (err, docs) => {});
    
    let result = await Message.find({toId: req.headers.userid});
    result = result.filter(item => item.status);
    let arr = [];
    for (let i = 0; i < result.length; i++) {
      let user = await User.findOne({id: result[i].fromId});
      let obj = {
        messageId: result[i].id,
        name: user.username,
        time: util.formatCSTDate(result[i].time, 'yy/MM/dd hh:mm:ss'),
        remark: result[i].remark,
        typeText: typeToText(result[i].type),
        type: result[i].type
      };
      arr.push(obj);
    }

    res.send({code: 200, message: '忽略消息成功', data: {list: arr}});
  } catch (err) {
    res.send({code: 300, message: '忽略消息失败', data: err});
  }
};