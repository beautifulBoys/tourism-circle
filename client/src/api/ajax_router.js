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

export const userMainPageInfoAjax = data => ajax.post('/userMainInfo', data);
