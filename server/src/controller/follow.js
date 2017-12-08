import Following from '../model/following.js';
import User from '../model/user.js';
import Follow from '../model/follow.js';

export const toFollowFunc = async (req, res) => {
  let userId = req.headers.userid - 0;
  let toId = req.body.id - 0;
  if (userId === toId) {
    res.send({code: 300, message: '不能关注自己', data: {}});
    return;
  }
  try {
    let {list} = await Following.findOne({id: userId});
    if (list.indexOf(toId) !== -1) {
      res.send({code: 300, message: '你已经关注了他（她）', data: {}});
      return;
    }
    // 更新关注用户
    list = [...list, toId];
    await Following.update({id: userId}, {list}, {multi: false}, (err) => {});

    // 更新被关注用户
    let toObj = await Follow.findOne({id: toId});
    let list1 = [...toObj.list, userId];
    console.log(toObj.list, list1);
    await Follow.update({id: toId}, {list: list1}, {multi: false}, (err) => {});

    res.send({code: 200, message: '关注成功', data: {}});
  } catch (err) {
    res.send({code: 300, message: '关注失败', data: err});
  }
};

export const myFollowingFunc = async (req, res) => {
  let userId = req.headers.userid - 0;
  let arr = [];
  try {
    let {list} = await Following.findOne({id: userId});
    for (let i = 0; i < list.length; i++) {
      let user = await User.findOne({id: list[i] - 0});
      let item = {
        address: user.address.length > 0 ? user.address.join('-') : '',
        email: user.email,
        id: user.id,
        username: user.username,
        desc: user.desc,
        postNum: user.postNum,
        avatar: user.avatar
      };
      arr.push(item);
    }
    res.send({code: 200, message: '获取关注列表成功', data: {list: arr}});
  } catch (err) {
    res.send({code: 300, message: '获取关注列表失败', data: err});
  }
};

export const deleteFollowingFunc = async (req, res) => {
  let userId = req.headers.userid - 0;
  let deleteId = req.body.id - 0;
  let arr = [];
  try {
    let {list} = await Following.findOne({id: userId});
    list = [...list].filter(item => (item - 0 !== deleteId));
    await Following.update({id: userId}, {list}, {multi: false}, (err) => {});
    // 去除粉丝列表的
    let obj = await Follow.findOne({id: deleteId});
    let list1 = [...obj.list].filter(item => (item - 0 !== userId));
    await Follow.update({id: deleteId}, {list: list1}, {multi: false}, (err) => {});

    for (let i = 0; i < list.length; i++) {
      let user = await User.findOne({id: list[i] - 0});
      let item = {
        address: user.address.length > 0 ? user.address.join('-') : '未设置',
        email: user.email || '未设置',
        id: user.id,
        username: user.username,
        desc: user.desc || '未设置',
        postNum: user.postNum
      };
      if (user.sex === 1) item.sex = '女孩';
      else if (user.sex === 2) item.sex = '男孩';
      else item.sex = '未设置';
      arr.push(item);
    }
    res.send({code: 200, message: '取消关注成功', data: {list: arr}});
  } catch (err) {
    res.send({code: 300, message: '取消关注失败', data: err});
  }
};



export const followsFunc = async (req, res) => {
  let userId = req.headers.userid - 0;
  let arr = [];
  try {
    let {list} = await Follow.findOne({id: userId});
    for (let i = 0; i < list.length; i++) {
      let user = await User.findOne({id: list[i] - 0});
      let item = {
        address: user.address.length > 0 ? user.address.join('-') : '',
        email: user.email,
        id: user.id,
        username: user.username,
        desc: user.desc,
        postNum: user.postNum,
        avatar: user.avatar,
        sex: user.sex
      };
      arr.push(item);
    }
    res.send({code: 200, message: '获取粉丝列表成功', data: {list: arr}});
  } catch (err) {
    res.send({code: 300, message: '获取粉丝列表失败', data: err});
  }
};