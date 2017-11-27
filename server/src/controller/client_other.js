import User from '../model/user.js';
import Post from '../model/post.js';
import Friend from '../model/friend.js';
import util from '../lib/formDate.js';

export const userMainInfoFunc = async (req, res) => {
  let userId = req.headers.userid - 0;
  let toId = req.body.id - 0;
  try {
    let user = await User.findOne({id: toId});
    let {list} = await Friend.findOne({id: userId});
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
    let isFriend = list.indexOf(toId);
    let result = {
      userInfo: {
        username: user.username,
        userId: user.userId,
        avatar: user.avatar,
        desc: user.desc
      },
      isFriend: (isFriend !== -1),
      postList: arr
    };

    res.send({code: 200, message: '获取用户主页数据成功', data: result});
  } catch (err) {
    res.send({code: 300, message: '获取用户主页数据失败', data: err});
  }
};