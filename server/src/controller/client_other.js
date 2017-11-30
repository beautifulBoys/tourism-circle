import User from '../model/user.js';
import Post from '../model/post.js';
import Friend from '../model/friend.js';
import Following from '../model/following.js';
import Follow from '../model/follow.js';
import util from '../lib/formDate.js';

export const userMainInfoFunc = async (req, res) => {
  let userId = req.headers.userid - 0;
  let toId = req.body.id - 0;
  try {
    let user = await User.findOne({id: toId});
    let friend = await Friend.findOne({id: userId});
    let postList = await Post.find({userId: toId});
    let arr = [];
    for (let i = 0; i < postList.length; i++) {
      arr.push({
        title: postList[i].title,
        postTime: util.formatCSTDate(postList[i].postTime),
        avatar: user.avatar,
        urls: postList[i].urls
      });
    }
    let isFriend = friend.list.indexOf(toId);
    let following = await Following.findOne({id: userId});
    let isFollowing = following.list.indexOf(toId);
    

    let result = {
      userInfo: {
        username: user.username,
        userId: user.userId,
        avatar: user.avatar,
        desc: user.desc
      },
      isFriend: (isFriend !== -1),
      isFollowing: (isFollowing !== -1),
      postList: arr
    };

    res.send({code: 200, message: '获取用户主页数据成功', data: result});
  } catch (err) {
    res.send({code: 300, message: '获取用户主页数据失败', data: err});
  }
};

export const mineFunc = async (req, res) => {
  let userId = req.headers.userid - 0;
  try {
    let user = await User.findOne({id: userId});
    let friend = await Friend.findOne({id: userId});
    let follow = await Follow.findOne({id: userId});
    let following = await Following.findOne({id: userId});

    let data = {
      username: user.username,
      userId: user.userId,
      avatar: user.avatar,
      desc: user.desc,
      friendNum: friend.list.length,
      followNum: follow.list.length,
      followingNum: following.list.length
    };

    res.send({code: 200, message: '获取个人主页数据成功', data});
  } catch (err) {
    res.send({code: 300, message: '获取个人主页数据失败', data: err});
  }
};