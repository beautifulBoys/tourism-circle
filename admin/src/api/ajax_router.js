import {ajax1, ajax2} from './ajax';

export const login = data => ajax1.post('/login', data);
export const postingAjax = data => ajax1.post('/posting', data);

export const getGalleryAjax = data => ajax1.post('/gallery', data);
export const deleteGalleryAjax = data => ajax1.post('/gallery-delete', data);

export const getPostAjax = type => ajax1.get('/post', type);

export const updateUserInfoAjax = data => ajax1.post('/updateUserInfo', data);
export const getUserInfoAjax = data => ajax1.post('/getUserInfo', data);

export const allUserListAjax = data => ajax1.post('/allUser', data);

export const addFriendAjax = data => ajax1.post('/addFriend', data);
export const sendWebMailAjax = data => ajax1.post('/sendWebMail', data);
export const friendHandleAjax = data => ajax1.post('/friendHandle', data);
export const webMailSendAjax = data => ajax1.post('/webMailSend', data);

export const messageBoxListAjax = data => ajax1.post('/messageBoxList', data);
export const ignoreMessageAjax = data => ajax1.post('/ignoreMessage', data);

export const starAjax = data => ajax1.post('/star', data);
export const pinglunAjax = data => ajax1.post('/pinglun', data);

export const myFriendAjax = data => ajax1.post('/myFriend', data);
export const deleteFriendAjax = data => ajax1.post('/deleteFriend', data);
export const myFollowingAjax = data => ajax1.post('/myFollowing', data);

export const followAjax = data => ajax1.post('/toFollow', data);
export const deleteFollowingAjax = data => ajax1.post('/deleteFollowing', data);
export const followsAjax = data => ajax1.post('/follows', data);

export const myPostedAjax = data => ajax1.post('/myPosted', data);
export const myStarAjax = data => ajax1.post('/myStar', data);

export const myCommentAjax = data => ajax1.post('/myComments', data);
export const imagesAjax = data => ajax1.post('/imageSave', data);

export const changeMinePostStatusAjax = data => ajax1.post('/changeMinePostStatus', data);
export const rankingAjax = data => ajax1.post('/ranking', data);
