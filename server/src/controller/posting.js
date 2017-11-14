
import Post from '../model/post.js';
import Id from '../model/id.js';


export default async (req, res) => {
  res.send({code: 300, message: '用户名和密码请输入完整', data: {}});
};