
import User from '../model/user.js';
import Follow from '../model/follow.js';
import Following from '../model/following.js';
import Friend from '../model/friend.js';


function postUserFunc (list) {
  list = list.sort((b, a) => {
    return a.postNum - b.postNum;
  });
  let arr = [];
  let xunHuanNun = (list.length > 6 ? 6 : list.length);
  for (let i = 0; i < xunHuanNun; i++) {
    arr.push({
      id: list[i].id,
      username: list[i].username,
      num: list[i].postNum
    });
  }
  return arr;
}
function FindUser (id) {
  return new Promise(function (resolve, reject) {
    User.findOne({id}, (err, docs) => {
      if (err) reject(err);
      else resolve(docs);
    });
  });
}
async function FollowsFunc (list) {
  list = list.sort((b, a) => {
    return a.list.length - b.list.length;
  });
  let arr = [];
  let xunHuanNun = (list.length > 6 ? 6 : list.length);
  for (let i = 0; i < xunHuanNun; i++) {
    let user = await FindUser(list[i].id - 0);
    arr.push({
      id: user.id,
      username: user.username,
      num: list[i].list.length
    });
  }
  return arr;
}

export const rankingFunc = async (req, res) => {
  try {
    // 分享排行榜
    let postList = await User.find({});
    postList = postUserFunc(postList);
    // 粉丝排行榜
    let followsList = await Follow.find({});
    followsList = await FollowsFunc(followsList);
    // 关注排行榜
    let followingList = await Following.find({});
    followingList = await FollowsFunc(followingList);
    // 好友排行榜
    let friendList = await Friend.find({});
    friendList = await FollowsFunc(friendList);

    res.send({code: 200, message: '获取排行榜信息成功', data: {
      friendList,
      followingList, 
      followsList, 
      postList
    }});
  } catch (err) {
    res.send({code: 200, message: '获取排行榜信息失败', data: {}});
  }
  
};