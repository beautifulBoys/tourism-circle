import ajax from './ajax.js';
// 登陆
export const loginAjax = data => ajax.post('/login', data);
// 获取最新，最热，最多评论列表
export const getPostAjax = type => ajax.get('/post', type);
// 我的圈友列表
export const myFriendAjax = data => ajax.post('/myFriend', data);
// 我分享的
export const myPostedAjax = data => ajax.post('/myPosted', data);
// 我评论的
export const myCommentAjax = data => ajax.post('/myComments', data);
// 我喜欢的
export const myStarAjax = data => ajax.post('/myStar', data);
// 排行榜
export const rankingAjax = data => ajax.post('/ranking', data);
// 所有圈友
export const allUserListAjax = data => ajax.post('/allUser', data);
// 用户个人主页数据
export const userMainPageInfoAjax = data => ajax.post('/userMainInfo', data);
// 我的主页数据
export const mineAjax = data => ajax.post('/mine', data);
// 我的粉丝数据
export const followsAjax = data => ajax.post('/follows', data);
// 我的关注数据
export const myFollowingAjax = data => ajax.post('/myFollowing', data);
// 发送站内信
export const sendWebMailAjax = data => ajax.post('/sendWebMail', data);
// 去关注
export const toFollowAjax = data => ajax.post('/toFollow', data);
// 解除关注
export const deleteFollowingAjax = data => ajax.post('/deleteFollowing', data);
