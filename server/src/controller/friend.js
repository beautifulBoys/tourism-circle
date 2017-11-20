
import User from '../model/user.js';
import Id from '../model/id.js';


export const deleteFriendFunc = async (req, res) => {
  let fromId = req.headers.userid - 0;
  let toId = req.body.id - 0;
  console.log(fromId, toId);
  try {
    let fromObj = await User.findOne({id: fromId});
    let friendList = fromObj.friendList.concat([]);
    let n = friendList.indexOf(toId);
    if (n !== -1) friendList.splice(n, 1);
    User.update({id: fromId}, {friendList}, {multi: false}, (err) => {});
    
    let toObj = await User.findOne({id: toId});
    friendList = toObj.friendList.concat([]);
    n = friendList.indexOf(fromId);
    if (n !== -1) friendList.splice(n, 1);
    User.update({id: toId}, {friendList}, {multi: false}, (err) => {});

    let list = [];
    let fromList = await User.findOne({id: fromId});

    for (let i = 0; i < fromList.friendList.length; i++) {
      let friend = await User.findOne({id: fromList.friendList[i] - 0});
      
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
