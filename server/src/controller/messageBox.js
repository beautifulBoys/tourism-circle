
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
    let result = await Message.find({toId: req.headers.userid});
    result = result.filter(item => item.status);
    let arr = [];
    for (let i = 0; i < result.length; i++) {
      let user = await User.findOne({id: result[i].fromId});
      let obj = {
        messageId: result[i].id,
        fromId: result[i].fromId,
        toId: result[i].toId,
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

export const addFriendFunc = async (req, res) => {
  let fromId = req.headers.userid - 0;
  let toId = req.body.to - 0;
  let remark = req.body.remark;
  if (fromId === toId) {
    res.send({code: 300, message: '不能添加自己为好友', data: {}});
    return;
  }
  // 判断是否已经是好友
  let friend = await User.findOne({id: fromId});
  if (friend.friendList.indexOf(toId) !== -1) {
    res.send({code: 300, message: '你们已经是好友', data: {}});
    return;
  }
  // 判断是否已经发送过请求了
  friend = await Message.findOne({fromId: fromId, toId: toId, status: true, type: 'add-friend'});
  if (friend) {
    res.send({code: 300, message: '您已经对该用户发送过好友请求，请等待回复', data: {}});
    return;
  }

  try {
    let obj = await Id.findOne({type: 'messageId'});
    if (obj) Id.update({_id: obj._id}, {value: obj.value + 1}, {multi: false}, () => {});
    else Id.create({type: 'messageId'});
    await Message.create({
      id: obj.value + 1,
      type: 'add-friend',
      fromId: fromId,
      toId: toId,
      remark: remark
    });
    res.send({code: 200, message: '添加好友请求发送成功', data: {}});
  } catch (err) {
    console.log(err);
    res.send({code: 300, message: '添加好友请求发送失败', data: err});
  }
};


export const friendHandleFunc = async (req, res) => {
  let meId = req.headers.userid;
  let messageId = req.body.messageId - 0;
  let fromId = req.body.fromId - 0;
  let toId = req.body.toId - 0;
  let type;
  await Message.update({id: messageId}, {status: false}, {multi: false}, (err) => {});

  if (req.body.type === 'agree') {
    try {
      let user_from = await User.findOne({id: fromId});
      let newFrindList_from = user_from.friendList.concat([]);
      newFrindList_from.push(toId);
      console.log('newFrindList_from: ', newFrindList_from);
      await User.update({id: fromId}, {friendList: newFrindList_from}, {multi: false}, (err) => {
        if (err) console.log(1, err);
      });
      
      let user_to = await User.findOne({id: toId});
      let newFrindList_to = user_to.friendList.concat([]);
      newFrindList_to.push(fromId);

      console.log('newFrindList_to: ', newFrindList_to);
      await User.update({id: toId}, {friendList: newFrindList_to}, {multi: false}, (err) => {
        if (err) console.log(2, err);
      });
      let result = await Message.find({toId: meId});
      let list = [];
      for (let i = 0; i < result.length; i++) {
        if (result[i].status) list.push(result[i]);
      }
      res.send({code: 200, message: '已添加好友', data: list});
    } catch (err) {
      console.log(err);
      res.send({code: 300, message: '添加好友失败', data: err});
    }
  } else {
    res.send({code: 200, message: '已拒绝', data: {}});
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