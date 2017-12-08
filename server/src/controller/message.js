
import Message from '../model/message.js';
import User from '../model/user.js';
import Id from '../model/id.js';
import util from '../lib/formDate.js';

function typeToText (type) {
  let arr = {
    'add-friend': '好友请求',
    'web-mail': '站内信'
  };
  return arr[type];
}

export const messageBoxListFunc = async (req, res) => {
  try {
    let result = await Message.find({toId: req.headers.userid, status: true});
    result = result.filter(item => item.status);
    // res.send({code: 200, message: '获取消息盒子数据成功', data: {list: result}});
    let arr = [];
    for (let i = 0; i < result.length; i++) {
      let user = await User.findOne({id: result[i].fromId});
      let obj = {
        messageId: result[i].id,
        fromId: result[i].fromId,
        toId: result[i].toId,
        name: user.username,
        time: util.formatCSTDate(result[i].time, 'MM/dd hh:mm'),
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
  let messageId = req.body.id - 0;
  let meId = req.headers.userid - 0;
  try {
    await Message.update({id: messageId}, {status: false}, {multi: false}, (err, docs) => {
      if (err) {
        console.log(err);
        res.send({code: 300, message: '发生未知错误，忽略消息失败', data: {err, docs}});
        return;
      }
      console.log(docs);
    });

    res.send({code: 200, message: '忽略消息成功', data: {}});
  } catch (err) {
    res.send({code: 300, message: '忽略消息失败，请联系管理员', data: err});
  }
};

export const sendWebMailFunc = async (req, res) => {
  let fromId = req.headers.userid - 0;
  let toId = req.body.to - 0;
  let remark = req.body.remark;
  if (fromId === toId) {
    res.send({code: 300, message: '不能给自己发送站内信', data: {}});
    return;
  }
  try {
    let obj = await Id.findOne({type: 'messageId'});
    if (obj) Id.update({_id: obj._id}, {value: obj.value + 1}, {multi: false}, () => {});
    else Id.create({type: 'messageId'});
    await Message.create({
      id: obj.value + 1,
      type: 'web-mail',
      fromId: fromId,
      toId: toId,
      remark: remark
    });
    res.send({code: 200, message: '站内信发送成功', data: {}});
  } catch (err) {
    console.log(err);
    res.send({code: 300, message: '站内信发送失败', data: err});
  }
};





export const webMailSendFunc = async (req, res) => {
  let messageId = req.body.messageId - 0;
  let remark = req.body.remark;
  let fromId = req.body.fromId - 0;
  let toId = req.body.toId - 0;
  console.log(messageId, remark, fromId, toId);  
  try {
    await Message.update({id: messageId}, {fromId: toId, toId: fromId, remark: remark}, {multi: false}, (err) => {
      if (err) console.log(err);
    });
    res.send({code: 200, message: '站内信发送成功', data: {}});
  } catch (err) {
    console.log(err);
    res.send({code: 300, message: '站内信发送失败', data: err});
  }
};