
import Message from '../model/message.js';
import Id from '../model/id.js';

export const addFriendFunc = async (req, res) => {
  let fromId = req.headers.userid - 0;
  let toId = req.body.to - 0;
  let remark = req.body.remark;
  if (fromId === toId) {
    res.send({code: 300, message: '不能添加自己为好友', data: {}});
    return;
  }
  console.log(fromId, toId, remark);
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
export const galleryDeleteFunc = async (req, res) => {
  
};

