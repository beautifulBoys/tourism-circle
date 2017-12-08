
import User from '../model/user.js';
import Message from '../model/message.js';
import Friend from '../model/friend.js';
import Id from '../model/id.js';

export const addFriendFunc = async (req, res) => {
  let fromId = req.headers.userid - 0;
  let toId = req.body.to - 0;
  let remark = req.body.remark;
  if (fromId === toId) {
    res.send({code: 300, message: '不能添加自己为好友', data: {}});
    return;
  }
  // 判断是否已经是好友
  let friend = await Friend.findOne({userId: fromId});
  if (friend.list.indexOf(toId) !== -1) {
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
    if (obj) await Id.update({_id: obj._id}, {value: obj.value + 1}, {multi: false}, () => {});
    else await Id.create({type: 'messageId'});
    obj = await Id.findOne({type: 'messageId'});
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


export const deleteFriendFunc = async (req, res) => {
  let fromId = req.headers.userid - 0;
  let toId = req.body.id - 0;
  console.log(fromId, toId);
  try {
    let fromObj = await Friend.findOne({userId: fromId});
    let friendList = fromObj.list.concat([]);
    let n = friendList.indexOf(toId);
    if (n !== -1) friendList.splice(n, 1);
    Friend.update({userId: fromId}, {list: friendList}, {multi: false}, (err) => {});
    
    let toObj = await Friend.findOne({userId: toId});
    friendList = toObj.list.concat([]);
    n = friendList.indexOf(fromId);
    if (n !== -1) friendList.splice(n, 1);
    Friend.update({userId: toId}, {list: friendList}, {multi: false}, (err) => {});

    let list = [];
    let fromobj = await Friend.findOne({userId: fromId});

    for (let i = 0; i < fromobj.list.length; i++) {
      let friend = await User.findOne({id: fromobj.list[i] - 0});
      
      let item = {
        address: friend.address.length > 0 ? friend.address.join('-') : '未设置',
        email: friend.email || '未设置',
        id: friend.id,
        username: friend.username,
        desc: friend.desc || '未设置',
        postNum: friend.postNum
      };
      if (friend.sex === 1) item.sex = '女孩';
      else if (friend.sex === 2) item.sex = '男孩';
      else item.sex = '未设置';
      list.push(item);
    }
    res.send({code: 200, message: '解除好友关系成功', data: {list}});
  } catch (err) {
    res.send({code: 300, message: '解除好友关系失败', data: err});
  }
  
};



export const friendHandleFunc = async (req, res) => { // 处理好友请求
  let meId = req.headers.userid;
  let messageId = req.body.messageId - 0;
  let fromId = req.body.fromId - 0;
  let toId = req.body.toId - 0;
  let type;
  await Message.update({id: messageId}, {status: false}, {multi: false}, (err) => {});

  if (req.body.type === 'agree') {
    try {
      let friendFromObj = await Friend.findOne({userId: fromId});
      let newFrindList_from = friendFromObj.list.concat([]);
      newFrindList_from.push(toId);
      await Friend.update({userId: fromId}, {list: newFrindList_from}, {multi: false}, (err) => {
        if (err) console.log(1, err);
      });
      
      let friendToObj = await Friend.findOne({userId: toId});
      let newFrindList_to = friendToObj.list.concat([]);
      newFrindList_to.push(fromId);
      await Friend.update({userId: toId}, {list: newFrindList_to}, {multi: false}, (err) => {
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


export const myFriendFunc = async (req, res) => {
  let userId = req.headers.userid;
  let list = [];
  try {
    let user = await Friend.findOne({userId: userId});
    for (let i = 0; i < user.list.length; i++) {
      let friend = await User.findOne({id: user.list[i] - 0});
      
      let item = {
        address: friend.address.length > 0 ? friend.address.join('-') : '',
        email: friend.email,
        id: friend.id,
        username: friend.username,
        desc: friend.desc,
        postNum: friend.postNum,
        avatar: friend.avatar,
        sex: friend.sex
      };
      list.push(item);
    }
   
    res.send({code: 200, message: '获取用户列表成功', data: {list: list}});
  } catch (err) {
    res.send({code: 300, message: '获取用户列表失败', data: err});
  }
};